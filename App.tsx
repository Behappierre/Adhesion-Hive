import React from 'react';
import ArchitectureExplorer from './components/ArchitectureExplorer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 h-screen flex flex-col">
        <header className="flex-none mb-6 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/20">
               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Agent<span className="text-blue-500">Vis</span>
            </h1>
          </div>
          <p className="text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed">
            Architecting the Invisible: A comprehensive framework for visualizing Multi-Agent Artificial Intelligence interactions. 
            Featuring the <span className="text-emerald-400 font-medium">Adhesion Hive</span> — a pro-active railway management system.
          </p>
        </header>

        <main className="flex-grow min-h-0 relative">
          <ArchitectureExplorer />
        </main>
      </div>
    </div>
  );
};

export default App;