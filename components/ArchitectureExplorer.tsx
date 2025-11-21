import React, { useState } from 'react';
import { SEQUENTIAL_SCENARIO, HIERARCHICAL_SCENARIO, RAIL_HIVE_SCENARIO } from '../constants';
import GraphCanvas from './visualizer/GraphCanvas';
import { ArchitectureScenario } from '../types';
import Icon from './ui/Icon';

const ArchitectureExplorer: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ArchitectureScenario>(SEQUENTIAL_SCENARIO);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1);

  // Simple simulation loop
  React.useEffect(() => {
    let timer: any;
    if (isPlaying && activeScenario.steps) {
      const currentStepIndex = simulationStep < 0 ? 0 : simulationStep;
      
      if (currentStepIndex < activeScenario.steps.length) {
        timer = setTimeout(() => {
          setSimulationStep(currentStepIndex + 1);
        }, activeScenario.steps[currentStepIndex].duration);
      } else {
        setIsPlaying(false);
        setSimulationStep(-1);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, simulationStep, activeScenario]);

  const handlePlay = () => {
    setSimulationStep(0);
    setIsPlaying(true);
  };

  const handleNodeMove = (nodeId: string, x: number, y: number) => {
    setActiveScenario((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) => 
        node.id === nodeId ? { ...node, x, y } : node
      ),
    }));
  };

  const activeNodeId = isPlaying && activeScenario.steps && simulationStep >= 0 && simulationStep < activeScenario.steps.length
    ? activeScenario.steps[simulationStep].activeNodeId
    : null;

  const currentStepDescription = isPlaying && activeScenario.steps && simulationStep >= 0 && simulationStep < activeScenario.steps.length
    ? activeScenario.steps[simulationStep].description
    : null;
  
  // Get active node color theme for the War Room effect
  const activeNode = activeScenario.nodes.find(n => n.id === activeNodeId);
  const activeTheme = activeNode?.colorTheme || 'blue';

  // Dynamic styling based on agent theme
  const getLogStyles = (theme: string) => {
    switch(theme) {
      case 'red': return { border: 'border-red-500/50', text: 'text-red-400', bg: 'bg-red-900/10', indicator: 'bg-red-500' };
      case 'purple': return { border: 'border-purple-500/50', text: 'text-purple-400', bg: 'bg-purple-900/10', indicator: 'bg-purple-500' };
      case 'green': return { border: 'border-emerald-500/50', text: 'text-emerald-400', bg: 'bg-emerald-900/10', indicator: 'bg-emerald-500' };
      case 'amber': return { border: 'border-amber-500/50', text: 'text-amber-400', bg: 'bg-amber-900/10', indicator: 'bg-amber-500' };
      default: return { border: 'border-blue-500/50', text: 'text-blue-400', bg: 'bg-slate-950', indicator: 'bg-blue-500' };
    }
  };
  
  const styles = getLogStyles(activeTheme);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top Navigation / Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        <button
          onClick={() => { setActiveScenario(SEQUENTIAL_SCENARIO); setIsPlaying(false); setSimulationStep(-1); }}
          className={`group p-3 rounded-xl border text-left transition-all hover:shadow-md flex items-center gap-3 ${
            activeScenario.id === 'sequential' 
            ? 'bg-blue-900/20 border-blue-500 text-blue-100 shadow-blue-900/20' 
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeScenario.id === 'sequential' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
            <Icon name="ArrowRight" size={20} />
          </div>
          <div>
            <div className="font-bold text-sm">Sequential Chain</div>
            <div className="text-xs opacity-60">Basic linear flow</div>
          </div>
        </button>

        <button
          onClick={() => { setActiveScenario(HIERARCHICAL_SCENARIO); setIsPlaying(false); setSimulationStep(-1); }}
          className={`group p-3 rounded-xl border text-left transition-all hover:shadow-md flex items-center gap-3 ${
            activeScenario.id === 'hierarchical' 
            ? 'bg-blue-900/20 border-blue-500 text-blue-100 shadow-blue-900/20' 
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeScenario.id === 'hierarchical' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
            <Icon name="GitMerge" size={20} />
          </div>
          <div>
            <div className="font-bold text-sm">Hierarchical</div>
            <div className="text-xs opacity-60">Hub & Spoke Delegation</div>
          </div>
        </button>

        <button
          onClick={() => { setActiveScenario(RAIL_HIVE_SCENARIO); setIsPlaying(false); setSimulationStep(-1); }}
          className={`group p-3 rounded-xl border text-left transition-all hover:shadow-md flex items-center gap-3 ${
            activeScenario.id === 'rail_hive' 
            ? 'bg-emerald-900/20 border-emerald-500 text-emerald-100 shadow-emerald-900/20' 
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeScenario.id === 'rail_hive' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
            <Icon name="Train" size={20} />
          </div>
          <div>
            <div className="font-bold text-sm">Adhesion War Room</div>
            <div className="text-xs opacity-60">Live Multi-Agent Demo</div>
          </div>
        </button>
      </div>

      {/* Main Visualizer Area - Full Width */}
      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-4 md:p-6 flex-grow flex flex-col shadow-2xl">
        {/* Graph Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              {activeScenario.title}
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">{activeScenario.description}</p>
          </div>
          {activeScenario.steps && (
            <button 
              onClick={handlePlay}
              disabled={isPlaying}
              className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                isPlaying 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white hover:shadow-blue-900/30 hover:-translate-y-0.5'
              }`}
            >
              <Icon name={isPlaying ? "Loader2" : "Play"} className={isPlaying ? "animate-spin" : "fill-current"} size={20} />
              {isPlaying ? "Simulating..." : "Run Simulation"}
            </button>
          )}
        </div>
        
        {/* Graph Canvas - Expanded Height */}
        <div className="flex-grow min-h-[500px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative">
           <GraphCanvas 
             nodes={activeScenario.nodes} 
             edges={activeScenario.edges} 
             activeNodeId={activeNodeId}
             onNodeMove={handleNodeMove}
           />
        </div>
        
        {/* Live Log - Below Canvas */}
        <div className={`mt-4 p-4 md:p-6 rounded-xl border text-sm font-mono min-h-[120px] transition-all duration-500 ${isPlaying ? styles.bg : 'bg-slate-950/50'} ${isPlaying ? styles.border : 'border-slate-800'}`}>
          {isPlaying && currentStepDescription ? (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-3">
                   <span className={`relative flex h-3 w-3`}>
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${styles.indicator}`}></span>
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${styles.indicator}`}></span>
                    </span>
                    <h4 className={`${styles.text} font-bold uppercase text-xs tracking-widest`}>
                      Live Agent Log
                    </h4>
                </div>
                <p className="text-white text-base md:text-lg leading-relaxed font-medium">{currentStepDescription}</p>
              </div>
          ) : (
            <div className="h-full flex flex-col justify-center">
              <h4 className="text-slate-500 font-bold mb-2 uppercase text-xs tracking-widest">Architectural Insights</h4>
              <div className="text-slate-400 text-sm flex flex-wrap gap-x-6 gap-y-2">
                {activeScenario.id === 'sequential' && (
                  <>
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Context Handoff</span>
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Shared State</span>
                  </>
                )}
                {activeScenario.id === 'hierarchical' && (
                  <>
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Supervisor Bottleneck</span>
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-500"></span>Delegation Pattern</span>
                  </>
                )}
                {activeScenario.id === 'rail_hive' && (
                  <>
                     <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span>Safety Gates</span>
                     <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500"></span>Logic Conflict</span>
                     <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Asset Constraints</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureExplorer;