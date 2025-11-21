export enum NodeType {
  AGENT = 'AGENT',
  TOOL = 'TOOL',
  ROUTER = 'ROUTER',
  STATE = 'STATE',
  TERMINATION = 'TERMINATION',
  USER = 'USER'
}

export interface NodeData {
  id: string;
  type: NodeType;
  label: string;
  subLabel?: string;
  x: number; // Grid percentage 0-100
  y: number; // Grid percentage 0-100
  status?: 'idle' | 'active' | 'success' | 'error';
  icon?: string;
  colorTheme?: 'blue' | 'red' | 'purple' | 'green' | 'amber' | 'slate';
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'default' | 'conditional' | 'feedback' | 'state';
  animated?: boolean;
}

export interface ArchitectureScenario {
  id: string;
  title: string;
  description: string;
  nodes: NodeData[];
  edges: EdgeData[];
  steps?: SimulationStep[];
}

export interface SimulationStep {
  activeNodeId: string;
  description: string;
  duration: number;
}

export enum AppTab {
  TAXONOMY = 'taxonomy',
  SEMIOTICS = 'semiotics',
  CASE_STUDY = 'case_study',
  ARCHITECT = 'architect'
}