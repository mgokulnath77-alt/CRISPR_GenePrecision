<div align="center">
  <img src="./frontend/src/assets/hero.png" alt="CRISPR GenePrecision Preview" width="800">
  
  <br/>
  
  <h1>🧬 CRISPR GenePrecision</h1>
  <p><b>Next-Generation Genomic Analysis & gRNA Design Engine</b></p>
</div>

---

## 📖 Overview

**CRISPR GenePrecision** is a high-fidelity, full-stack bioinformatics platform engineered to computationally predict, rank, and analyze highly specific CRISPR-Cas9 guide RNAs (gRNAs). 

Built with a stunning, cyberpunk-inspired "Sci-Fi Biotech" user interface, the application bridges the gap between complex algorithmic biology and beautiful enterprise-grade design.

## ✨ Core Features

- **📡 Real-Time NCBI Integration:** Dynamically fetches up-to-date mRNA sequence data directly from the NCBI Entrez database.
- **🎯 Advanced Scoring Heuristics:** Implements logic inspired by the Doench Rule Set 2. It accurately evaluates thermodynamic guide efficiency based on GC composition limits (40-60%), Poly-T penalties, and critical nucleotide positioning (e.g., Position 20 biases).
- **🛡️ Specificity Prediction:** Simulated mismatch alignment profiling across the sequence to compute highly accurate off-target risk probabilities, with heavy emphasis on the critical "seed region".
- **💻 Immersive UI/UX:** A beautifully crafted frontend featuring interactive 3D DNA loaders, neon glassmorphism, Recharts data visualization, and an enterprise dashboard layout.

## 🛠️ Technology Stack

**Frontend**
* React.js (Vite)
* Tailwind CSS (v3 with Custom Animations & Cyberpunk Palette)
* Recharts (Data Visualization)
* Lucide React (Icons)

**Backend**
* Python 3
* Flask (REST API Architecture)
* Biopython (NCBI Entrez queries and sequence manipulation)
* SQLite (Local database persistence)

---

## 🚀 Installation & Setup

If you want to run this project locally, you will need to start both the Python backend server and the React frontend development server.

### 1. Clone the repository
```bash
git clone https://github.com/mgokulnath77-alt/CRISPR_GenePrecision.git
cd CRISPR_GenePrecision
```

### 2. Start the Backend (Flask API)
Open a terminal and navigate to the `backend` folder:
```bash
cd backend
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install Flask flask-cors biopython

# Run the API
python app.py
```
*The API will start running at `http://localhost:5000`*

### 3. Start the Frontend (React Vite)
Open a **new** terminal and navigate to the `frontend` folder:
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
*The beautiful UI will be served at `http://localhost:5173` (or `5174`). Open that link in your browser!*

---

## 🔬 How it Works

1. Enter a valid Gene Symbol (e.g., `TP53`, `BRCA1`, `Cas9`).
2. The Python backend communicates with the NCBI Entrez database to pull the exact genomic sequence.
3. The platform parses the sequence for valid `NGG` PAM loci.
4. Hundreds of candidate 20-nucleotide targets are extracted and passed through the scoring algorithms.
5. The frontend displays the results across highly-detailed data tables and final ranking matrices.

<div align="center">
  <i>Developed with precision for Bioinformatics Research and Exploration.</i>
</div>
