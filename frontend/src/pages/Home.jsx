import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, DnaIcon, ShieldCheckIcon, ActivityIcon, DatabaseIcon, SparklesIcon } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] animate-fade-in relative">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[128px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-[128px] pointer-events-none -z-10"></div>
      
      <div className="text-center max-w-5xl mx-auto space-y-10 mt-8 relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <SparklesIcon className="w-4 h-4 mr-1 text-fuchsia-400" />
          Next-Gen Genomic Analysis Engine
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 drop-shadow-sm leading-tight pb-2">
          CRISPR <br/> GenePrecision
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
          Unleash the power of highly accurate bioinformatics algorithms. Dynamically scan sequences for SpCas9 PAM sites, compute exact thermodynamic efficiency, and predict off-target cleavage risks.
        </p>

        <div className="flex justify-center pt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-fuchsia-600 to-cyan-600 overflow-hidden shadow-[0_0_40px_rgba(217,70,239,0.5)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            Start Pipeline
            <ArrowRightIcon className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left">
          <FeatureCard 
            icon={<DnaIcon className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
            title="Real-Time Processing"
            desc="Fetch direct mRNA sequences from the NCBI Entrez database for massive, up-to-date genomic targets instantly."
          />
          <FeatureCard 
            icon={<ActivityIcon className="w-8 h-8 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]" />}
            title="Advanced Heuristics"
            desc="Calculate exact thermodynamic guide efficiency based on GC composition, poly-T penalties, and seed region motifs."
          />
          <FeatureCard 
            icon={<ShieldCheckIcon className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />}
            title="Specificity Prediction"
            desc="Simulated mismatch alignment profiling across thousands of base pairs to compute highly accurate off-target risk probabilities."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="saas-card p-8 flex flex-col items-start group">
      <div className="bg-white/5 p-4 rounded-xl mb-6 border border-white/10 group-hover:bg-white/10 transition-colors shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{title}</h3>
      <p className="text-base text-slate-300 leading-relaxed">{desc}</p>
    </div>
  );
}
