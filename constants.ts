import { ArchitectureScenario, NodeType, EdgeData, NodeData } from './types';

// Section 2.1: Sequential Orchestration
export const SEQUENTIAL_SCENARIO: ArchitectureScenario = {
  id: 'sequential',
  title: 'Sequential Orchestration',
  description: 'The industrial assembly line. Data flows linearly with cumulative context.',
  nodes: [
    { id: 'user', type: NodeType.USER, label: 'User', x: 10, y: 50, icon: 'User' },
    { id: 'researcher', type: NodeType.AGENT, label: 'Researcher', subLabel: 'Gathers Facts', x: 30, y: 50, icon: 'Search' },
    { id: 'drafter', type: NodeType.AGENT, label: 'Drafter', subLabel: 'Composes Text', x: 50, y: 50, icon: 'PenTool' },
    { id: 'reviewer', type: NodeType.AGENT, label: 'Reviewer', subLabel: 'QA Check', x: 70, y: 50, icon: 'CheckCircle' },
    { id: 'state', type: NodeType.STATE, label: 'Shared Context Window', x: 50, y: 80, icon: 'Database' }
  ],
  edges: [
    { id: 'e1', source: 'user', target: 'researcher', label: 'Task' },
    { id: 'e2', source: 'researcher', target: 'drafter', label: 'Facts' },
    { id: 'e3', source: 'drafter', target: 'reviewer', label: 'Draft' },
    { id: 'e4', source: 'researcher', target: 'state', type: 'state', animated: true },
    { id: 'e5', source: 'drafter', target: 'state', type: 'state', animated: true },
    { id: 'e6', source: 'reviewer', target: 'state', type: 'state', animated: true },
  ]
};

// Section 2.2: Hierarchical Supervisor
export const HIERARCHICAL_SCENARIO: ArchitectureScenario = {
  id: 'hierarchical',
  title: 'Hierarchical Supervisor',
  description: 'Hub-and-spoke topology. A central router manages specialized workers.',
  nodes: [
    { id: 'supervisor', type: NodeType.ROUTER, label: 'Supervisor', subLabel: 'Orchestrator', x: 50, y: 20, icon: 'GitMerge' },
    { id: 'worker1', type: NodeType.AGENT, label: 'Coder', subLabel: 'Python', x: 20, y: 60, icon: 'Code' },
    { id: 'worker2', type: NodeType.AGENT, label: 'Tester', subLabel: 'PyTest', x: 50, y: 60, icon: 'TestTube' },
    { id: 'worker3', type: NodeType.AGENT, label: 'Documenter', subLabel: 'Markdown', x: 80, y: 60, icon: 'FileText' },
  ],
  edges: [
    { id: 'e1', source: 'supervisor', target: 'worker1', label: 'Delegate', type: 'default' },
    { id: 'e2', source: 'supervisor', target: 'worker2', label: 'Delegate', type: 'default' },
    { id: 'e3', source: 'supervisor', target: 'worker3', label: 'Delegate', type: 'default' },
    { id: 'e4', source: 'worker1', target: 'supervisor', label: 'Report', type: 'feedback' },
    { id: 'e5', source: 'worker2', target: 'supervisor', label: 'Report', type: 'feedback' },
    { id: 'e6', source: 'worker3', target: 'supervisor', label: 'Report', type: 'feedback' },
  ]
};

// Rail MAS: Adhesion War Room (Detailed Station Overrun)
export const RAIL_HIVE_SCENARIO: ArchitectureScenario = {
  id: 'rail_hive',
  title: 'Adhesion War Room',
  description: 'Station Overrun Incident: High-speed multi-agent negotiation to resolve a critical safety failure.',
  nodes: [
    // Agents
    { id: 'copilot', type: NodeType.AGENT, label: 'Co-Pilot', subLabel: 'Driver Agent', x: 15, y: 30, icon: 'Navigation', colorTheme: 'blue' },
    { id: 'guardian', type: NodeType.AGENT, label: 'Guardian', subLabel: 'Signalling (Safety)', x: 85, y: 30, icon: 'ShieldAlert', colorTheme: 'red' },
    { id: 'strategist', type: NodeType.AGENT, label: 'Strategist', subLabel: 'Control (Logic)', x: 50, y: 50, icon: 'Brain', colorTheme: 'purple' },
    { id: 'doctor', type: NodeType.AGENT, label: 'Doctor', subLabel: 'Maintenance (Asset)', x: 20, y: 80, icon: 'Stethoscope', colorTheme: 'green' },
    { id: 'fixer', type: NodeType.AGENT, label: 'Fixer', subLabel: 'Infrastructure', x: 80, y: 80, icon: 'Hammer', colorTheme: 'amber' },
    
    // External Entities
    { id: 'train_1b24', type: NodeType.TOOL, label: 'Train 1B24', subLabel: 'Telemetry', x: 10, y: 10, icon: 'Train', colorTheme: 'slate' },
    { id: 'human_dash', type: NodeType.USER, label: 'Human Controller', subLabel: 'Approval', x: 50, y: 90, icon: 'UserCheck', colorTheme: 'slate' }
  ],
  edges: [
    // Sequence 1: Detection
    { id: 'e1', source: 'train_1b24', target: 'copilot', label: 'WSP Alert (L5)', type: 'default' },
    { id: 'e2', source: 'copilot', target: 'guardian', label: 'SEVERE SLIP', type: 'default', animated: true },
    
    // Sequence 2: Conflict
    { id: 'e3', source: 'doctor', target: 'strategist', label: 'Block 1B24', type: 'feedback' },
    { id: 'e4', source: 'strategist', target: 'doctor', label: 'Argue Delay', type: 'default' },
    
    // Sequence 3: Solution
    { id: 'e5', source: 'strategist', target: 'guardian', label: 'Validate Route', type: 'conditional' },
    { id: 'e6', source: 'guardian', target: 'strategist', label: 'Safety Confirmed', type: 'feedback' },
    
    // Sequence 4: Fix
    { id: 'e7', source: 'fixer', target: 'train_1b24', label: 'Track Status', type: 'default' },
    
    // End
    { id: 'e8', source: 'strategist', target: 'human_dash', label: 'Final Recommendation', type: 'default', animated: true },
  ],
  steps: [
    { 
      activeNodeId: 'copilot', 
      description: '[CO-PILOT] ⚠️ CRITICAL SLIP DETECTED. Train 1B24. Location: Oakwood Station. Status: Overshot 40m. Action: Alerting Guardian immediately.', 
      duration: 4000 
    },
    { 
      activeNodeId: 'guardian', 
      description: '[GUARDIAN] Alert Received. Threat Analysis: Train 2L12 approaching. Action: Interlocking Override -> Signal OW102 set to RED. Warning 2L12.', 
      duration: 4000 
    },
    { 
      activeNodeId: 'doctor', 
      description: '[DOCTOR] Analyzing Telemetry... Sanders empty. 40mm Wheel Flat detected. Diagnosis: Train cannot exceed 40mph. REJECTING return journey.', 
      duration: 5000 
    },
    { 
      activeNodeId: 'strategist', 
      description: '[STRATEGIST] Conflict: 800 passengers on board. Stopping 1B24 kills the Fast Line. Cost: £85k. Proposal: Run to destination?', 
      duration: 4000 
    },
    { 
      activeNodeId: 'doctor', 
      description: '[DOCTOR] REJECTED. Risk of bearing failure. Counter-proposal: Run Empty Coaching Stock (ECS) to depot at 40mph?', 
      duration: 4000 
    },
    { 
      activeNodeId: 'strategist', 
      description: '[STRATEGIST] Optimizing... Solution Found: Offload at Oakwood. Divert 1B24 to Slow Line. 2L12 makes rescue stop.', 
      duration: 5000 
    },
    { 
      activeNodeId: 'guardian', 
      description: '[GUARDIAN] Validating Route... Path available on Slow Line. Signal OW104 set for crossing. Safety Validation: CONFIRMED.', 
      duration: 3000 
    },
    { 
      activeNodeId: 'fixer', 
      description: '[FIXER] Heatmap Updated: Oakwood is a Black Zone. RHTT \'Jelly\' re-routed. ETA 22 mins. Speed Restriction generated.', 
      duration: 4000 
    },
    { 
      activeNodeId: 'human_dash', 
      description: 'SYSTEM RECOMMENDATION: Terminate 1B24. Move to Slow Line. Rescue with 2L12. [APPROVE] [MODIFY] [REJECT]', 
      duration: 6000 
    }
  ]
};

// Section 8: Financial Analysis Swarm (Complex)
export const FINANCIAL_SWARM_SCENARIO: ArchitectureScenario = {
  id: 'financial_swarm',
  title: 'Financial Analysis Swarm',
  description: 'A hybrid hierarchical pattern with parallel execution and shared state.',
  nodes: [
    { id: 'mgr', type: NodeType.ROUTER, label: 'Manager', subLabel: 'Orchestration', x: 50, y: 10, icon: 'Briefcase' },
    { id: 'fund', type: NodeType.AGENT, label: 'Fundamental', subLabel: 'Reads 10Ks', x: 20, y: 40, icon: 'BookOpen' },
    { id: 'tech', type: NodeType.AGENT, label: 'Technical', subLabel: 'Chart Analysis', x: 50, y: 40, icon: 'TrendingUp' },
    { id: 'sent', type: NodeType.AGENT, label: 'Sentiment', subLabel: 'News Scraper', x: 80, y: 40, icon: 'Newspaper' },
    { id: 'state', type: NodeType.STATE, label: 'Shared Financial Context', x: 50, y: 70, icon: 'Database' },
    { id: 'writer', type: NodeType.AGENT, label: 'Writer', subLabel: 'PDF Gen', x: 50, y: 90, icon: 'FileCheck' },
    
    // Tools
    { id: 't_fund', type: NodeType.TOOL, label: 'SEC API', x: 10, y: 30, icon: 'Server' },
    { id: 't_tech', type: NodeType.TOOL, label: 'AlphaVantage', x: 60, y: 30, icon: 'Activity' },
  ],
  edges: [
    { id: 'e1', source: 'mgr', target: 'fund', label: 'Analyze', animated: true },
    { id: 'e2', source: 'mgr', target: 'tech', label: 'Analyze', animated: true },
    { id: 'e3', source: 'mgr', target: 'sent', label: 'Analyze', animated: true },
    
    { id: 'e4', source: 'fund', target: 'state', type: 'state' },
    { id: 'e5', source: 'tech', target: 'state', type: 'state' },
    { id: 'e6', source: 'sent', target: 'state', type: 'state' },
    
    { id: 'e7', source: 'fund', target: 't_fund', type: 'default' },
    { id: 'e8', source: 'tech', target: 't_tech', type: 'default' },
    
    { id: 'e9', source: 'state', target: 'writer', label: 'Aggregated Data', type: 'default' },
    { id: 'e10', source: 'mgr', target: 'writer', label: 'Compile', type: 'default' },
  ],
  steps: [
    { activeNodeId: 'mgr', description: 'Manager receives request for AAPL analysis.', duration: 1000 },
    { activeNodeId: 'fund', description: 'Fundamental Analyst pulling SEC filings...', duration: 2000 },
    { activeNodeId: 'tech', description: 'Technical Analyst checking moving averages...', duration: 2000 },
    { activeNodeId: 'sent', description: 'Sentiment Analyst scanning news headlines...', duration: 2000 },
    { activeNodeId: 'state', description: 'All agents updating Shared Financial Context.', duration: 1000 },
    { activeNodeId: 'writer', description: 'Writer synthesizing report from context.', duration: 2000 },
  ]
};