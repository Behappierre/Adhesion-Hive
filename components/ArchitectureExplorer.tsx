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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Sidebar Selection */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-4 overflow-y-auto max-h-[600px]">
        <h2 className="text-xl font-semibold text-white mb-4">Topology Patterns</h2>
        
        <button
          onClick={() => { setActiveScenario(SEQUENTIAL_SCENARIO); setIsPlaying(false); setSimulationStep(-1); }}
          className={`w-full p-4 rounded-lg border text-left transition-all ${
            activeScenario.id === 'sequential' 
            ? 'bg-blue-900/20 border-blue-500 text-blue-100' 
            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold">Sequential Chain</span>
            <span className="text-xs bg-slate-900 px-2 py-1 rounded">Basic</span>
          </div>
          <p className="text-sm opacity-80">Linear data flow with cumulative context. Fragile to error propagation.</p>
        </button>

        <button
          onClick={() => { setActiveScenario(HIERARCHICAL_SCENARIO); setIsPlaying(false); setSimulationStep(-1); }}
          className={`w-full p-4 rounded-lg border text-left transition-all ${
            activeScenario.id === 'hierarchical' 
            ? 'bg-blue-900/20 border-blue-500 text-blue-100' 
            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold">Hierarchical Supervisor</span>
            <span className="text-xs bg-slate-900 px-2 py-1 rounded">Hub & Spoke</span>
          </div>
          <p className="text-sm opacity-80">Central orchestrator manages delegation. Reduces P2P complexity but creates a bottleneck.</p>
        </button>

        <button
          onClick={() => { setActiveScenario(RAIL_HIVE_SCENARIO); setIsPlaying(false); setSimulationStep(-1); }}
          className={`w-full p-4 rounded-lg border text-left transition-all ${
            activeScenario.id === 'rail_hive' 
            ? 'bg-emerald-900/20 border-emerald-500 text-emerald-100' 
            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold flex items-center gap-2">
              <Icon name="Train" size={16} />
              Adhesion War Room
            </span>
            <span className="text-xs bg-emerald-900/50 px-2 py-1 rounded text-emerald-200">MAS Demo</span>
          </div>
          <p className="text-sm opacity-80">Station Overrun Incident. 5 Agents negotiate a solution in real-time.</p>
        </button>
      </div>

      {/* Visualizer */}
      <div className="lg:col-span-2 flex flex-col space-y-4">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex-grow flex flex-col">
          <div className="mb-4 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                {activeScenario.title}
              </h3>
              <p className="text-slate-400 mt-1">{activeScenario.description}</p>
            </div>
            {activeScenario.steps && (
              <button 
                onClick={handlePlay}
                disabled={isPlaying}
                className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${
                  isPlaying 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                <Icon name={isPlaying ? "Loader2" : "Play"} className={isPlaying ? "animate-spin" : ""} size={18} />
                {isPlaying ? "Simulating..." : "Run Simulation"}
              </button>
            )}
          </div>
          
          <GraphCanvas nodes={activeScenario.nodes} edges={activeScenario.edges} activeNodeId={activeNodeId} />
          
          {/* Simulation Log / Insights */}
          <div className={`mt-4 p-4 rounded-lg border text-sm font-mono min-h-[120px] transition-colors duration-500 ${isPlaying ? styles.bg : 'bg-slate-950'} ${isPlaying ? styles.border : 'border-slate-800'}`}>
            {isPlaying && currentStepDescription ? (
               <div className="animate-pulse-fast">
                 <h4 className={`${styles.text} font-bold mb-2 uppercase text-xs tracking-wider flex items-center gap-2`}>
                    <span className={`w-2 h-2 rounded-full ${styles.indicator}`}></span>
                    Live Agent Log
                 </h4>
                 <p className="text-white text-lg leading-relaxed">{currentStepDescription}</p>
               </div>
            ) : (
              <>
                <h4 className="text-slate-200 font-bold mb-2 uppercase text-xs tracking-wider">Architectural Insights</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  {activeScenario.id === 'sequential' && (
                    <>
                      <li><span className="text-blue-400">Context Handoff:</span> Edges carry the full history.</li>
                      <li><span className="text-emerald-400">Shared State:</span> The parallel track maintains truth.</li>
                    </>
                  )}
                  {activeScenario.id === 'hierarchical' && (
                    <>
                      <li><span className="text-amber-400">Supervisor Bottleneck:</span> Central node handles all token traffic.</li>
                      <li><span className="text-slate-300">Separation of Concerns:</span> Workers do not communicate directly.</li>
                    </>
                  )}
                  {activeScenario.id === 'rail_hive' && (
                    <>
                      <li><span className="text-emerald-400">Conflict Resolution:</span> Observe the Doctor (Green) vs Strategist (Purple) negotiation loop.</li>
                      <li><span className="text-red-400">Safety Gates:</span> The Guardian (Red) must validate the Strategist's proposal before execution.</li>
                      <li><span className="text-blue-400">Human-in-the-loop:</span> The system proposes, the human approves.</li>
                    </>
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureExplorer;