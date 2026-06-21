from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, get_db_connection
import services

app = Flask(__name__)
CORS(app)

# Initialize database on startup
init_db()

@app.route('/api/analyze', methods=['POST'])
def analyze_gene():
    data = request.json
    gene_name = data.get('gene_name')
    
    if not gene_name:
        return jsonify({"error": "Gene name is required"}), 400
        
    print(f"Fetching sequence for {gene_name}...")
    sequence, error = services.fetch_gene_sequence(gene_name)
    
    if error:
        return jsonify({"error": error}), 500
        
    # Limit sequence length for performance (e.g., first 5000 chars) if it's too long
    # We'll just take the first 5000 bases to keep the response fast and payload small
    sequence = sequence[:5000]
        
    print(f"Detecting PAM sites...")
    pam_sites = services.detect_pam_sites(sequence)
    
    print(f"Designing gRNAs...")
    grnas = services.design_grnas(sequence, pam_sites, limit=150)
    
    print(f"Running off-target analysis and ranking...")
    results = []
    for g in grnas:
        off_target_data = services.simulate_off_target_analysis(g['sequence'])
        final_score = services.calculate_final_score(g['efficiency_score'], off_target_data['specificity_score'])
        
        result_item = {
            **g,
            **off_target_data,
            "final_score": final_score
        }
        results.append(result_item)
        
    # Sort by final score
    results.sort(key=lambda x: x['final_score'], reverse=True)
    
    # Save to database
    try:
        conn = get_db_connection()
        c = conn.cursor()
        
        # Check if gene exists, else insert
        c.execute("SELECT id FROM genes WHERE name = ?", (gene_name.upper(),))
        row = c.fetchone()
        if row:
            gene_id = row['id']
        else:
            c.execute("INSERT INTO genes (name, sequence, length) VALUES (?, ?, ?)", 
                      (gene_name.upper(), sequence, len(sequence)))
            gene_id = c.lastrowid
            
        # Delete old guides for this gene to avoid duplicates on re-analysis
        c.execute("DELETE FROM guides WHERE gene_id = ?", (gene_id,))
        
        for r in results:
            c.execute("""
                INSERT INTO guides (gene_id, sequence, pam, position, efficiency_score) 
                VALUES (?, ?, ?, ?, ?)
            """, (gene_id, r['sequence'], r['pam'], r['position'], r['efficiency_score']))
            guide_id = c.lastrowid
            
            c.execute("""
                INSERT INTO off_targets (guide_id, off_target_count, specificity_score, risk_level)
                VALUES (?, ?, ?, ?)
            """, (guide_id, r['off_target_count'], r['specificity_score'], r['risk_level']))
            
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Database error: {e}")
        # Continue even if DB fails
        
    return jsonify({
        "gene_name": gene_name.upper(),
        "sequence_length": len(sequence),
        "sequence": sequence,
        "total_pam_sites": len(pam_sites),
        "pam_sites": pam_sites[:100], # limit to 100 in response
        "results": results
    })

@app.route('/api/history', methods=['GET'])
def get_history():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("SELECT name, length FROM genes ORDER BY id DESC LIMIT 10")
    genes = [dict(row) for row in c.fetchall()]
    conn.close()
    return jsonify(genes)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
