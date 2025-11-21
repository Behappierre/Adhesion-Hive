import React from 'react';
import { motion } from 'framer-motion';
import { NodeData, EdgeData, NodeType } from '../../types';
import Icon from '../ui/Icon';

interface GraphCanvasProps {
  nodes: NodeData[];
  edges: EdgeData[];
  activeNodeId?: string | null;
}

const getNodeColor = (node: NodeData) => {
  // specific color overrides
  if (node.colorTheme === 'red') return 'bg-red-900/80 border-red-500 text-red-100 shadow-red-900/50';
  if (node.colorTheme === 'purple') return 'bg-purple-900/80 border-purple-500 text-purple-100 shadow-purple-900/50';
  if (node.colorTheme === 'green') return 'bg-emerald-900/80 border-emerald-500 text-emerald-100 shadow-emerald-900/50';
  if (node.colorTheme === 'blue') return 'bg-blue-900/80 border-blue-500 text-blue-100 shadow-blue-900/50';
  if (node.colorTheme === 'amber') return 'bg-amber-900/80 border-amber-500 text-amber-100 shadow-amber-900/50';
  
  // Default type-based styling
  switch (node.type) {
    case NodeType.AGENT: return 'bg-blue-900/50 border-blue-500 text-blue-200';
    case NodeType.TOOL: return 'bg-emerald-900/50 border-emerald-500 text-emerald-200';
    case NodeType.ROUTER: return 'bg-amber-900/50 border-amber-500 text-amber-200';
    case NodeType.STATE: return 'bg-slate-800 border-slate-600 text-slate-400';
    case NodeType.USER: return 'bg-purple-900/50 border-purple-500 text-purple-200';
    default: return 'bg-slate-700 border-slate-500';
  }
};

const GraphCanvas: React.FC<GraphCanvasProps> = ({ nodes, edges, activeNodeId }) => {
  
  // Helper to find node coordinates
  const getNode = (id: string) => nodes.find(n => n.id === id);

  return (
    <div className="relative w-full h-full min-h-[600px] bg-slate-950 rounded-xl overflow-hidden shadow-inner">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
          <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
        </defs>
        {edges.map(edge => {
          const source = getNode(edge.source);
          const target = getNode(edge.target);
          if (!source || !target) return null;

          const x1 = `${source.x}%`;
          const y1 = `${source.y}%`;
          const x2 = `${target.x}%`;
          const y2 = `${target.y}%`;

          const isActive = activeNodeId === edge.source || activeNodeId === edge.target;
          const isFeedback = edge.type === 'feedback';
          
          return (
            <g key={edge.id}>
              <line 
                x1={x1} y1={y1} x2={x2} y2={y2} 
                stroke={isActive ? "#3b82f6" : "#475569"}
                strokeWidth={isActive ? "3" : edge.type === 'state' ? "4" : "2"}
                strokeDasharray={edge.type === 'conditional' || edge.type === 'feedback' ? "5,5" : "0"}
                strokeOpacity={edge.type === 'state' ? 0.3 : 1}
                markerEnd={isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                className="transition-colors duration-500"
              />
              {edge.label && (
                <foreignObject 
                  x={(source.x + target.x) / 2 - 5} 
                  y={(source.y + target.y) / 2 - 3} 
                  width="20" height="10" 
                  className="overflow-visible"
                >
                   <div className="flex justify-center">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border whitespace-nowrap shadow-sm backdrop-blur-md transition-all duration-300 ${isActive ? 'bg-blue-900/80 border-blue-500 text-white scale-110 z-50' : 'bg-slate-900/80 text-slate-400 border-slate-700'}`}>
                      {edge.label}
                    </span>
                   </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map(node => {
        const isActive = activeNodeId === node.id;
        return (
          <motion.div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 w-32 cursor-pointer`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isActive ? 1.2 : 1, opacity: 1, zIndex: isActive ? 50 : 20 }}
          >
            {/* Node Shape */}
            <div className={`
              w-16 h-16 flex items-center justify-center rounded-2xl border-2 shadow-2xl backdrop-blur-md transition-all duration-300
              ${getNodeColor(node)}
              ${isActive ? 'ring-4 ring-opacity-50 scale-110' : ''}
            `}>
              <Icon name={node.icon || 'Circle'} size={32} />
            </div>
            
            {/* Labels */}
            <div className="mt-3 flex flex-col items-center text-center min-w-[140px]">
              <span className={`text-sm font-bold px-3 py-1 rounded-full bg-slate-950/90 border border-slate-800 transition-colors shadow-lg ${isActive ? 'text-white border-blue-500/50' : 'text-slate-300'}`}>
                {node.label}
              </span>
              {node.subLabel && (
                <span className="text-[11px] text-slate-400 mt-1 font-medium bg-slate-900/50 px-1.5 py-0.5 rounded backdrop-blur-sm">{node.subLabel}</span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default GraphCanvas;