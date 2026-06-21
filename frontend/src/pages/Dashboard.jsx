import React, { useState } from 'react';
import { SearchIcon, AlertCircleIcon, CheckCircle2Icon, DnaIcon, ActivityIcon, FileTextIcon, ShieldAlertIcon } from 'lucide-react';
import clsx from 'clsx';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';

export default function Dashboard() {
  const [geneName, setGeneName] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('gene');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!geneName.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);
    setLoadingText(`Decoding & Profiling ${geneName.toUpperCase()} Genomic Sequence...`);

    try {
      const startTime = Date.now();

      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gene_name: geneName })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze gene');
      }

      // Enforce minimum 3 second loading animation
      const elapsed = Date.now() - startTime;
      if (elapsed < 3000) {
        await new Promise(resolve => setTimeout(resolve, 3000 - elapsed));
      }

      setResults(data);
      setActiveTab('results');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'gene', label: '1. Genomic Data', icon: <FileTextIcon className="w-4 h-4 mr-2" /> },
    { id: 'pam', label: '2. PAM Targets', icon: <ActivityIcon className="w-4 h-4 mr-2" /> },
    { id: 'grna', label: '3. gRNA Library', icon: <DnaIcon className="w-4 h-4 mr-2" /> },
    { id: 'off_target', label: '4. Specificity', icon: <ShieldAlertIcon className="w-4 h-4 mr-2" /> },
    { id: 'results', label: 'Dashboard', icon: <CheckCircle2Icon className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="w-full animate-fade-in pb-12 relative z-10">
      <div className="saas-card p-6 mb-8 border-t-4 border-t-fuchsia-500">
        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-5 items-end">
          <div className="flex-grow w-full">
            <label className="block text-sm font-bold text-cyan-400 mb-2 uppercase tracking-widest">
              Target Gene Identifier
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-fuchsia-400" />
              </div>
              <input
                type="text"
                value={geneName}
                onChange={(e) => setGeneName(e.target.value)}
                className="block w-full pl-12 pr-4 py-3.5 border border-white/20 rounded-xl leading-5 bg-black/40 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all sm:text-base font-medium shadow-inner"
                placeholder="e.g. TP53, BRCA1, Cas9"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !geneName.trim()}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(217,70,239,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all h-[52px]"
          >
            Execute Pipeline
          </button>
        </form>
        
        {error && (
          <div className="mt-5 p-4 bg-red-900/40 border border-red-500/50 rounded-xl flex items-start text-red-300 text-sm shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <AlertCircleIcon className="h-5 w-5 mr-3 flex-shrink-0 text-red-400" />
            <p className="font-semibold text-base">{error}</p>
          </div>
        )}
      </div>

      {loading && (
        <div className="saas-card p-16 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
          <div className="absolute inset-0 bg-fuchsia-900/10 animate-pulse"></div>
          <div className="dna-container w-32 h-32 mb-10 relative z-10">
             <svg viewBox="0 0 100 100" className="dna-strand w-full h-full text-cyan-400">
               <path d="M20,20 Q50,50 80,20 T20,80 Q50,50 80,80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="opacity-40 drop-shadow-[0_0_5px_currentColor]" />
               <path d="M20,80 Q50,50 80,80 T20,20 Q50,50 80,20" fill="none" stroke="#d946ef" strokeWidth="6" strokeLinecap="round" className="drop-shadow-[0_0_8px_#d946ef]" />
               <line x1="30" y1="35" x2="30" y2="65" stroke="#fcd34d" strokeWidth="5" />
               <line x1="50" y1="50" x2="50" y2="50" stroke="#fcd34d" strokeWidth="5" strokeLinecap="round" />
               <line x1="70" y1="35" x2="70" y2="65" stroke="#fcd34d" strokeWidth="5" />
             </svg>
          </div>
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 mb-3 tracking-widest relative z-10 uppercase text-center">{loadingText}</h2>
          <p className="text-slate-300 text-base font-medium relative z-10">Running advanced Biopython algorithms & heuristics...</p>
          <div className="w-80 h-2 bg-slate-800 rounded-full mt-8 overflow-hidden border border-white/10 relative z-10 shadow-inner">
            <div className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full" style={{ animation: 'progress 3s linear forwards' }}></div>
          </div>
          <style>{`
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}

      {results && !loading && (
        <div className="animate-fade-in">
          {/* Navigation Tabs */}
          <div className="saas-card mb-8 overflow-hidden border-none shadow-none bg-black/20 p-1">
            <nav className="flex flex-wrap gap-2" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-fuchsia-600/90 to-cyan-600/90 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/10 border border-white/5',
                    'flex-1 flex items-center justify-center py-3.5 px-4 text-sm font-bold rounded-xl transition-all whitespace-nowrap outline-none min-w-[150px]'
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content Panels */}
          <div className="saas-card p-6 md:p-8 min-h-[500px]">
            {activeTab === 'gene' && <GeneAnalysisTab results={results} />}
            {activeTab === 'pam' && <PamDetectionTab results={results} />}
            {activeTab === 'grna' && <GrnaDesignTab results={results} />}
            {activeTab === 'off_target' && <OffTargetTab results={results} />}
            {activeTab === 'results' && <ResultsDashboardTab results={results} />}
          </div>
        </div>
      )}
    </div>
  );
}

// -- Subcomponents for Tabs --

function GeneAnalysisTab({ results }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wide">Genomic Sequence Analysis</h2>
          <p className="text-sm text-cyan-400 font-medium mt-1 uppercase tracking-widest">NCBI Reference: {results.gene_name}</p>
        </div>
        <span className="px-4 py-2 bg-fuchsia-500/20 text-fuchsia-300 rounded-xl text-sm font-black border border-fuchsia-500/30 shadow-[0_0_10px_rgba(217,70,239,0.2)]">
          {results.sequence_length.toLocaleString()} bp
        </span>
      </div>
      
      <div className="bg-black/60 rounded-xl p-5 shadow-inner border border-white/5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">FASTA Data View (Partial)</h3>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.8)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
          </div>
        </div>
        <div className="font-mono text-[15px] break-all text-cyan-300 max-h-[400px] overflow-y-auto custom-scrollbar p-3 leading-relaxed tracking-[0.1em] drop-shadow-[0_0_2px_rgba(103,232,249,0.4)]">
          {results.sequence}
        </div>
      </div>
    </div>
  );
}

function PamDetectionTab({ results }) {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <h2 className="text-2xl font-black text-white tracking-wide">PAM Targets (NGG)</h2>
        <p className="text-base text-slate-400 mt-2">
          Identified <strong className="text-fuchsia-400 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]">{results.total_pam_sites}</strong> possible SpCas9 binding sites. Showing top {results.pam_sites.length}.
        </p>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-white/10 shadow-lg bg-black/40">
        <table className="min-w-full divide-y divide-white/5">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-300 uppercase tracking-widest">Locus Position</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-300 uppercase tracking-widest">PAM Sequence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {results.pam_sites.map((site, i) => (
              <tr key={i} className="hover:bg-white/10 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-base text-cyan-100 font-mono">{site.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-3 py-1.5 bg-cyan-900/40 text-cyan-300 border border-cyan-500/30 rounded-lg font-mono font-bold text-sm shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    {site.pam}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GrnaDesignTab({ results }) {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <h2 className="text-2xl font-black text-white tracking-wide">Candidate gRNA Library</h2>
        <p className="text-base text-slate-400 mt-2">20nt target sequences extracted and scored for thermodynamic efficiency using advanced rule sets.</p>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-white/10 shadow-lg bg-black/40">
        <table className="min-w-full divide-y divide-white/5">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-300 uppercase tracking-widest">Rank</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-300 uppercase tracking-widest">Sequence (20nt)</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-300 uppercase tracking-widest">PAM</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-300 uppercase tracking-widest">Efficiency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {results.results.map((grna, i) => (
              <tr key={i} className="hover:bg-white/10 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-fuchsia-400">{(i + 1).toString().padStart(3, '0')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-white font-mono font-medium tracking-wider">{grna.sequence}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-300 font-mono">{grna.pam}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-black text-white w-12">{grna.efficiency_score}</span>
                    <div className="w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-fuchsia-600 to-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.8)]"
                        style={{ width: `${grna.efficiency_score}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OffTargetTab({ results }) {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <h2 className="text-2xl font-black text-white tracking-wide">Specificity Analysis</h2>
        <p className="text-base text-slate-400 mt-2">Off-target predictive modeling based on seed region complexity and GC penalties.</p>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-white/10 shadow-lg bg-black/40">
        <table className="min-w-full divide-y divide-white/5">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-300 uppercase tracking-widest">Target Sequence</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-300 uppercase tracking-widest">Mismatches</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-300 uppercase tracking-widest">Specificity</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-300 uppercase tracking-widest">Risk Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {results.results.map((grna, i) => (
              <tr key={i} className="hover:bg-white/10 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-base text-white font-mono font-medium">{grna.sequence}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-slate-300 font-bold">{grna.off_target_count}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-black text-white w-12">{grna.specificity_score}</span>
                    <div className="w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        style={{ width: `${grna.specificity_score}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={clsx(
                    'px-3 py-1.5 text-xs font-black uppercase tracking-widest rounded-lg border',
                    grna.risk_level === 'Low' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]' :
                    grna.risk_level === 'Medium' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]' :
                    'bg-red-500/20 text-red-300 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                  )}>
                    {grna.risk_level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ResultsDashboardTab({ results }) {
  const topGrna = results.results[0];
  
  const chartData = results.results.map((r, i) => ({
    name: `T${i+1}`,
    Efficiency: r.efficiency_score,
    Specificity: r.specificity_score,
    FinalScore: r.final_score
  })).slice(0, 10);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-fuchsia-600 to-cyan-600 rounded-2xl p-6 text-white shadow-[0_0_30px_rgba(217,70,239,0.4)] relative overflow-hidden border border-white/20">
          <ShieldAlertIcon className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-20" />
          <p className="text-white/80 text-xs font-black uppercase tracking-widest mb-2">Optimal Target</p>
          <p className="text-2xl font-mono font-black mb-4 tracking-widest drop-shadow-md">{topGrna.sequence}</p>
          <div className="flex items-center space-x-8 text-sm font-bold bg-black/20 p-3 rounded-xl backdrop-blur-sm">
            <div className="flex flex-col">
              <span className="text-white/60 text-[10px] uppercase tracking-widest">Final Score</span>
              <span className="text-lg text-amber-300 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]">{topGrna.final_score}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-[10px] uppercase tracking-widest">Risk</span>
              <span className="text-lg">{topGrna.risk_level}</span>
            </div>
          </div>
        </div>
        
        <div className="border border-white/10 rounded-2xl p-6 bg-black/40 backdrop-blur-md shadow-lg">
          <p className="text-fuchsia-400 text-xs font-black uppercase tracking-widest mb-2">Valid PAM Sites</p>
          <p className="text-5xl font-black text-white drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">{results.total_pam_sites.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-3 font-semibold uppercase tracking-wider">Detected sequentially</p>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 bg-black/40 backdrop-blur-md shadow-lg">
          <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-2">Analyzed Guides</p>
          <p className="text-5xl font-black text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">{results.results.length}</p>
          <p className="text-xs text-slate-400 mt-3 font-semibold uppercase tracking-wider">Scored by heuristics</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-white/10 rounded-2xl p-6 bg-black/40 backdrop-blur-md shadow-lg">
          <h3 className="text-sm font-black text-white mb-8 uppercase tracking-widest flex items-center">
            <ActivityIcon className="w-5 h-5 mr-2 text-fuchsia-400" /> Score Breakdown (Top 10)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" opacity={0.05} />
                <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} tickLine={false} axisLine={false} />
                <YAxis tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f8fafc', fontSize: '14px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#f8fafc' }}
                  cursor={{fill: '#ffffff', opacity: 0.05}}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '13px', fontWeight: 'bold', color: '#e2e8f0'}} />
                <Bar dataKey="Efficiency" fill="#d946ef" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="Specificity" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 bg-black/40 backdrop-blur-md shadow-lg">
          <h3 className="text-sm font-black text-white mb-8 uppercase tracking-widest flex items-center">
            <CheckCircle2Icon className="w-5 h-5 mr-2 text-amber-400" /> Final Ranking Matrix
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" opacity={0.05} />
                <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} tickLine={false} axisLine={false} />
                <YAxis tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f8fafc', fontSize: '14px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#f8fafc' }}
                  cursor={{fill: '#ffffff', opacity: 0.05}}
                />
                <Bar dataKey="FinalScore" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#fbbf24' : '#64748b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
