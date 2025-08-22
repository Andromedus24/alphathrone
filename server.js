const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const math = require('mathjs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Advanced quantum simulation state
let simulationState = {
  particles: [],
  fields: {
    electromagnetic: { strength: 1.0, frequency: 0.1, phase: 0 },
    gravitational: { strength: 0.5, curvature: 0.2 },
    quantum: { entanglement: 0.3, superposition: 0.7 },
    strong: { strength: 0.8, gluonField: 0.6 },
    weak: { strength: 0.4, wBosonField: 0.3 }
  },
  time: 0,
  chaosLevel: 0.5,
  dimension: 3,
  temperature: 300, // Kelvin
  pressure: 1.0, // atm
  magneticField: { x: 0, y: 0, z: 1 },
  particleTypes: ['electron', 'photon', 'quark', 'neutrino', 'gluon', 'wBoson', 'zBoson', 'higgs'],
  activeTypes: ['electron', 'photon'],
  simulationMode: 'quantum', // quantum, classical, relativistic
  entanglementGroups: [],
  waveFunction: { amplitude: 1.0, phase: 0, collapse: false },
  experiments: {
    doubleSlit: { active: false, slits: [], interference: [] },
    bellTest: { active: false, measurements: [], correlation: 0 },
    quantumTunneling: { active: false, barrier: null, tunneled: [] },
    particleCollision: { active: false, collisions: [], energy: 0 },
    quantumTeleportation: { active: false, teleported: [], fidelity: 0 },
    schrodingerCat: { active: false, catState: 'alive', probability: 0.5 },
    quantumEraser: { active: false, whichPath: [], interference: [], erased: [] },
    delayedChoice: { active: false, choice: null, measurement: [], delayed: [] },
    quantumZeno: { active: false, measurements: [], frozen: [], zenoTime: 0 },
    quantumWalk: { active: false, walkers: [], steps: 0, distribution: [] }
  },
  particleTrails: [],
  quantumState: {
    superpositionCount: 0,
    collapsedCount: 0,
    uncertainty: 0,
    coherence: 0,
    totalEnergy: 0,
    entropy: 0
  },
  advancedPhysics: {
    relativisticEffects: true,
    quantumTunneling: true,
    particleDecay: true,
    fieldInteractions: true,
    entanglement: true,
    waveFunctionCollapse: true,
    spinOrbitCoupling: true,
    quantumSpinNetworks: true,
    gluonFieldEffects: true,
    higgsMechanism: true
  },
  spinNetworks: [],
  quantumGates: [],
  spacetimeCurvature: { x: 0, y: 0, z: 0, t: 0 },
  quantumComputing: {
    qubits: [],
    quantumCircuits: [],
    algorithms: ['Grover', 'Shor', 'Deutsch-Jozsa', 'Quantum Fourier Transform'],
    activeAlgorithm: null,
    quantumMemory: [],
    entanglementPairs: []
  },
  quantumTeleportation: {
    stations: [],
    teleportedParticles: [],
    fidelity: 0.95,
    quantumChannels: []
  },
  quantumCryptography: {
    keyPairs: [],
    encryptedMessages: [],
    quantumKeyDistribution: false,
    eavesdropping: false
  },
  multiverse: {
    universes: [],
    activeUniverse: 0,
    parallelWorlds: [],
    quantumBranches: []
  },
  // NEW: Advanced Quantum Field Theory
  quantumFields: {
    scalar: { phi: 0, mass: 125, coupling: 0.1, vacuum: 246 },
    vector: { A: { x: 0, y: 0, z: 0 }, mass: 0, charge: 1 },
    spinor: { psi: { up: 0, down: 0 }, mass: 0.511, spin: 0.5 },
    tensor: { g: { xx: 1, yy: 1, zz: 1, tt: -1 }, curvature: 0 }
  },
  // NEW: Relativistic Quantum Mechanics
  relativisticPhysics: {
    lorentzFactor: 1.0,
    timeDilation: 1.0,
    lengthContraction: 1.0,
    relativisticMomentum: 0,
    relativisticEnergy: 0,
    restMass: 0.511, // electron mass in MeV
    velocity: { x: 0, y: 0, z: 0 },
    gamma: 1.0
  },
  // NEW: Advanced Particle Interactions
  particleInteractions: {
    electromagnetic: { coulomb: true, magnetic: true, radiative: true },
    strong: { gluonExchange: true, colorConfinement: true, asymptoticFreedom: true },
    weak: { betaDecay: true, neutrinoScattering: true, parityViolation: true },
    gravitational: { spacetime: true, tidal: true, gravitationalWaves: true }
  },
  // NEW: Quantum Field Fluctuations
  fieldFluctuations: {
    vacuumEnergy: 0,
    zeroPointMotion: 0,
    quantumJitter: 0,
    spontaneousEmission: 0,
    casimirEffect: 0
  },
  // NEW: Advanced Entanglement System
  advancedEntanglement: {
    bellStates: ['|Φ+⟩', '|Φ-⟩', '|Ψ+⟩', '|Ψ-⟩'],
    activeBellState: 0,
    entanglementMeasures: { concurrence: 0, negativity: 0, vonNeumann: 0 },
    multipartiteEntanglement: [],
    clusterStates: [],
    graphStates: []
  },
  // NEW: Quantum Error Correction
  quantumErrorCorrection: {
    codes: ['Shor', 'Steane', 'Surface', 'Color'],
    activeCode: 'Shor',
    errorRates: { bitFlip: 0.01, phaseFlip: 0.01, depolarization: 0.02 },
    correctionThreshold: 0.01,
    logicalQubits: [],
    syndromeMeasurements: []
  },
  // NEW: Advanced Wave Function System
  advancedWaveFunction: {
    basisStates: [],
    superpositionCoefficients: [],
    phaseSpace: { position: [], momentum: [] },
    uncertaintyPrinciple: { deltaX: 0, deltaP: 0, product: 0 },
    wavePacket: { width: 1.0, center: 0, momentum: 0 },
    tunnelingProbability: 0,
    reflectionCoefficient: 0
  }
};

// NEW: Advanced Quantum Physics Engine Functions
class AdvancedQuantumEngine {
  constructor() {
    this.hbar = 1.054571817e-34; // Reduced Planck constant
    this.c = 299792458; // Speed of light
    this.G = 6.67430e-11; // Gravitational constant
    this.e = 1.602176634e-19; // Elementary charge
    this.me = 9.1093837015e-31; // Electron mass
    this.mp = 1.67262192369e-27; // Proton mass
    this.alpha = 0.0072973525693; // Fine structure constant
  }

  // NEW: Relativistic Quantum Mechanics Calculations
  calculateLorentzFactor(velocity) {
    const v = Math.sqrt(velocity.x**2 + velocity.y**2 + velocity.z**2);
    return 1 / Math.sqrt(1 - (v/this.c)**2);
  }

  calculateRelativisticEnergy(mass, velocity) {
    const gamma = this.calculateLorentzFactor(velocity);
    return gamma * mass * this.c**2;
  }

  calculateRelativisticMomentum(mass, velocity) {
    const gamma = this.calculateLorentzFactor(velocity);
    return gamma * mass * velocity;
  }

  // NEW: Advanced Quantum Field Theory
  calculateFieldStrength(field, position, time) {
    const { phi, mass, coupling, vacuum } = field;
    const k = Math.sqrt(mass**2 + coupling**2 * vacuum**2);
    return phi * Math.exp(-k * time) * Math.cos(k * position);
  }

  calculateVacuumEnergy(field) {
    return 0.5 * field.mass**2 * field.vacuum**2;
  }

  // NEW: Quantum Tunneling with Advanced Physics
  calculateTunnelingProbability(barrierHeight, barrierWidth, particleEnergy, particleMass) {
    if (particleEnergy >= barrierHeight) return 1;
    
    const k1 = Math.sqrt(2 * particleMass * particleEnergy) / this.hbar;
    const k2 = Math.sqrt(2 * particleMass * (barrierHeight - particleEnergy)) / this.hbar;
    
    const transmission = 1 / (1 + (k1**2 + k2**2)**2 / (4 * k1**2 * k2**2) * Math.sinh(k2 * barrierWidth)**2);
    return Math.max(0, Math.min(1, transmission));
  }

  // NEW: Advanced Entanglement Measures
  calculateConcurrence(densityMatrix) {
    // Simplified concurrence calculation for 2-qubit systems
    const eigenvalues = this.calculateEigenvalues(densityMatrix);
    const sortedEigenvalues = eigenvalues.sort((a, b) => b - a);
    return Math.max(0, sortedEigenvalues[0] - sortedEigenvalues[1] - sortedEigenvalues[2] - sortedEigenvalues[3]);
  }

  calculateEigenvalues(matrix) {
    // Simplified eigenvalue calculation
    const trace = matrix[0][0] + matrix[1][1] + matrix[2][2] + matrix[3][3];
    const determinant = this.calculateDeterminant(matrix);
    return [trace/2 + Math.sqrt(trace**2/4 - determinant), trace/2 - Math.sqrt(trace**2/4 - determinant)];
  }

  calculateDeterminant(matrix) {
    return matrix[0][0] * matrix[1][1] * matrix[2][2] * matrix[3][3];
  }

  // NEW: Quantum Error Correction
  applyErrorCorrection(qubit, errorRates) {
    const random = Math.random();
    if (random < errorRates.bitFlip) {
      qubit.state = this.applyPauliX(qubit.state);
    }
    if (random < errorRates.phaseFlip) {
      qubit.state = this.applyPauliZ(qubit.state);
    }
    return qubit;
  }

  applyPauliX(state) {
    return { up: state.down, down: state.up };
  }

  applyPauliZ(state) {
    return { up: state.up, down: -state.down };
  }

  // NEW: Advanced Wave Function Evolution
  evolveWaveFunction(waveFunction, time, hamiltonian) {
    const { amplitude, phase } = waveFunction;
    const energy = hamiltonian.energy;
    const newPhase = phase - energy * time / this.hbar;
    return { amplitude, phase: newPhase, collapse: false };
  }

  calculateUncertainty(position, momentum) {
    const deltaX = Math.sqrt(position.variance);
    const deltaP = Math.sqrt(momentum.variance);
    return { deltaX, deltaP, product: deltaX * deltaP };
  }

  // NEW: Advanced Particle Creation and Annihilation
  createParticlePair(particleType, energy, position) {
    const particle1 = this.createParticle(particleType, energy/2, position);
    const particle2 = this.createParticle(particleType, energy/2, position);
    
    // Entangle the particles
    particle1.entangledWith = particle2.id;
    particle2.entangledWith = particle1.id;
    
    return [particle1, particle2];
  }

  createParticle(type, energy, position) {
    const mass = this.getParticleMass(type);
    const velocity = this.calculateVelocityFromEnergy(energy, mass);
    
    return {
      id: Date.now() + Math.random(),
      type: type,
      mass: mass,
      energy: energy,
      position: position,
      velocity: velocity,
      spin: this.getParticleSpin(type),
      charge: this.getParticleCharge(type),
      lifetime: this.getParticleLifetime(type),
      entangledWith: null,
      quantumState: 'superposition'
    };
  }

  getParticleMass(type) {
    const masses = {
      electron: this.me,
      photon: 0,
      quark: this.mp / 3,
      neutrino: 0.0000000001 * this.me,
      gluon: 0,
      wBoson: 80.4e9 * this.e / this.c**2,
      zBoson: 91.2e9 * this.e / this.c**2,
      higgs: 125e9 * this.e / this.c**2
    };
    return masses[type] || this.me;
  }

  getParticleSpin(type) {
    const spins = {
      electron: 0.5,
      photon: 1,
      quark: 0.5,
      neutrino: 0.5,
      gluon: 1,
      wBoson: 1,
      zBoson: 1,
      higgs: 0
    };
    return spins[type] || 0.5;
  }

  getParticleCharge(type) {
    const charges = {
      electron: -this.e,
      photon: 0,
      quark: 2/3 * this.e,
      neutrino: 0,
      gluon: 0,
      wBoson: this.e,
      zBoson: 0,
      higgs: 0
    };
    return charges[type] || 0;
  }

  getParticleLifetime(type) {
    const lifetimes = {
      electron: Infinity,
      photon: Infinity,
      quark: 1e-12,
      neutrino: Infinity,
      gluon: 1e-24,
      wBoson: 3e-25,
      zBoson: 3e-25,
      higgs: 1.6e-22
    };
    return lifetimes[type] || Infinity;
  }

  calculateVelocityFromEnergy(energy, mass) {
    if (mass === 0) return { x: this.c, y: 0, z: 0 };
    const gamma = energy / (mass * this.c**2);
    const v = this.c * Math.sqrt(1 - 1/gamma**2);
    return { x: v, y: 0, z: 0 };
  }

  // NEW: Advanced Field Interactions
  calculateFieldInteraction(particle, fields) {
    let force = { x: 0, y: 0, z: 0 };
    
    // Electromagnetic force
    if (particle.charge !== 0 && fields.electromagnetic.strength > 0) {
      const emForce = this.calculateElectromagneticForce(particle, fields.electromagnetic);
      force = this.addVectors(force, emForce);
    }
    
    // Gravitational force
    if (fields.gravitational.strength > 0) {
      const gravForce = this.calculateGravitationalForce(particle, fields.gravitational);
      force = this.addVectors(force, gravForce);
    }
    
    // Strong force
    if (fields.strong.strength > 0) {
      const strongForce = this.calculateStrongForce(particle, fields.strong);
      force = this.addVectors(force, strongForce);
    }
    
    return force;
  }

  calculateElectromagneticForce(particle, field) {
    const { strength, frequency, phase } = field;
    const fieldVector = {
      x: strength * Math.cos(frequency * simulationState.time + phase),
      y: strength * Math.sin(frequency * simulationState.time + phase),
      z: 0
    };
    
    return {
      x: particle.charge * fieldVector.x,
      y: particle.charge * fieldVector.y,
      z: particle.charge * fieldVector.z
    };
  }

  calculateGravitationalForce(particle, field) {
    const { strength, curvature } = field;
    const gravitationalField = {
      x: -strength * curvature * particle.position.x,
      y: -strength * curvature * particle.position.y,
      z: -strength * curvature * particle.position.z
    };
    
    return {
      x: particle.mass * gravitationalField.x,
      y: particle.mass * gravitationalField.y,
      z: particle.mass * gravitationalField.z
    };
  }

  calculateStrongForce(particle, field) {
    const { strength, gluonField } = field;
    const distance = Math.sqrt(particle.position.x**2 + particle.position.y**2 + particle.position.z**2);
    const strongField = strength * gluonField / (1 + distance);
    
    return {
      x: -strongField * particle.position.x / distance,
      y: -strongField * particle.position.y / distance,
      z: -strongField * particle.position.z / distance
    };
  }

  addVectors(v1, v2) {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y,
      z: v1.z + v2.z
    };
  }
}

// Initialize the advanced quantum engine
const quantumEngine = new AdvancedQuantumEngine();

// Advanced particle generation with multiple types
function generateParticles() {
  simulationState.particles = [];
  simulationState.entanglementGroups = [];
  simulationState.particleTrails = [];
  simulationState.spinNetworks = [];
  simulationState.quantumGates = [];
  
  const particleCounts = {
    electron: 35,
    photon: 25,
    quark: 20,
    neutrino: 10,
    gluon: 15,
    wBoson: 8,
    zBoson: 8,
    higgs: 5
  };
  
  let particleId = 0;
  
  Object.entries(particleCounts).forEach(([type, count]) => {
    for (let i = 0; i < count; i++) {
      const particle = createParticle(type, particleId++);
      simulationState.particles.push(particle);
      
      // Initialize particle trail
      simulationState.particleTrails.push({
        particleId: particle.id,
        positions: [],
        maxTrailLength: 50
      });
    }
  });
  
  // Create entanglement groups
  createEntanglementGroups();
  
  // Initialize quantum gates
  initializeQuantumGates();
  
  // Initialize quantum state
  updateQuantumState();
}

function initializeQuantumGates() {
  // Create quantum gates for advanced operations
  const gateTypes = ['H', 'X', 'Y', 'Z', 'CNOT', 'SWAP'];
  
  for (let i = 0; i < 3; i++) {
    simulationState.quantumGates.push({
      id: i,
      type: gateTypes[Math.floor(Math.random() * gateTypes.length)],
      position: {
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30,
        z: (Math.random() - 0.5) * 30
      },
      active: false,
      targetParticles: []
    });
  }
}

function createParticle(type, id) {
  const baseProperties = {
    electron: { mass: 9.1093837015e-31, charge: -1.602176634e-19, spin: 0.5, color: 'lepton' },
    photon: { mass: 0, charge: 0, spin: 1, color: 'boson' },
    quark: { mass: 3.0e-30, charge: 0.333e-19, spin: 0.5, color: 'quark' },
    neutrino: { mass: 2.2e-36, charge: 0, spin: 0.5, color: 'lepton' },
    gluon: { mass: 0, charge: 0, spin: 1, color: 'gluon' },
    wBoson: { mass: 1.4e-25, charge: 1.602176634e-19, spin: 1, color: 'boson' },
    zBoson: { mass: 1.6e-25, charge: 0, spin: 1, color: 'boson' },
    higgs: { mass: 2.2e-25, charge: 0, spin: 0, color: 'scalar' }
  };
  
  const props = baseProperties[type];
  
  return {
    id,
    type,
    position: {
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20
    },
    velocity: {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2
    },
    quantumState: {
      phase: Math.random() * Math.PI * 2,
      amplitude: Math.random(),
      spin: Math.random() * Math.PI * 2,
      superposition: Math.random() > 0.5,
      spinDirection: { x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 }
    },
    energy: Math.random() * 100,
    mass: props.mass,
    charge: props.charge,
    spin: props.spin,
    color: props.color,
    entangledWith: null,
    waveFunction: {
      real: Math.random() * 2 - 1,
      imaginary: Math.random() * 2 - 1
    },
    lifetime: Math.random() * 1000,
    decayProducts: [],
    interactionHistory: [],
    trail: [],
    experimentData: {},
    spinNetworkNode: null,
    quantumGate: null,
    fieldCoupling: Math.random(),
    gluonCharge: type === 'gluon' ? Math.floor(Math.random() * 8) : null
  };
}

function createEntanglementGroups() {
  const groups = [];
  const particles = simulationState.particles.filter(p => p.type === 'electron');
  
  for (let i = 0; i < Math.floor(particles.length / 2); i++) {
    const p1 = particles[i * 2];
    const p2 = particles[i * 2 + 1];
    
    if (p1 && p2) {
      p1.entangledWith = p2.id;
      p2.entangledWith = p1.id;
      
      groups.push({
        id: i,
        particles: [p1.id, p2.id],
        correlation: Math.random(),
        type: 'bell-state'
      });
    }
  }
  
  simulationState.entanglementGroups = groups;
}

// Advanced quantum chaos simulation update
function updateSimulation() {
  simulationState.time += 0.016;
  
  // Update quantum fields
  updateQuantumFields();
  
  // Update all particles with advanced physics
  simulationState.particles.forEach(particle => {
    updateParticlePhysics(particle);
    applyQuantumEffects(particle);
    handleParticleInteractions(particle);
    updateWaveFunction(particle);
    updateParticleTrail(particle);
  });
  
  // Handle particle decay and creation
  handleParticleDecay();
  
  // Update experiments
  updateExperiments();
  
  // Update quantum state
  updateQuantumState();
  
  // Emit updated state to all clients
  io.emit('simulationUpdate', simulationState);
}

function updateQuantumFields() {
  const time = simulationState.time;
  
  // Electromagnetic field oscillation
  simulationState.fields.electromagnetic.phase += 0.1;
  simulationState.fields.electromagnetic.strength = 1.0 + 0.3 * Math.sin(time * 0.5);
  
  // Gravitational field curvature
  simulationState.fields.gravitational.curvature = 0.2 + 0.1 * Math.sin(time * 0.3);
  
  // Quantum field fluctuations
  simulationState.fields.quantum.entanglement = 0.3 + 0.2 * Math.sin(time * 0.7);
  simulationState.fields.quantum.superposition = 0.7 + 0.2 * Math.cos(time * 0.4);
  
  // Strong nuclear force field
  simulationState.fields.strong.strength = 0.8 + 0.2 * Math.sin(time * 0.6);
  simulationState.fields.strong.gluonField = 0.6 + 0.3 * Math.cos(time * 0.8);
  
  // Weak nuclear force field
  simulationState.fields.weak.strength = 0.4 + 0.1 * Math.sin(time * 0.9);
  simulationState.fields.weak.wBosonField = 0.3 + 0.2 * Math.cos(time * 0.7);
  
  // Update spacetime curvature
  updateSpacetimeCurvature(time);
  
  // Update quantum spin networks
  updateQuantumSpinNetworks(time);
}

function updateSpacetimeCurvature(time) {
  const chaos = simulationState.chaosLevel;
  const fields = simulationState.fields;
  
  // Calculate spacetime curvature based on energy-momentum tensor
  simulationState.spacetimeCurvature.x = Math.sin(time * 0.2) * chaos * fields.gravitational.curvature;
  simulationState.spacetimeCurvature.y = Math.cos(time * 0.3) * chaos * fields.gravitational.curvature;
  simulationState.spacetimeCurvature.z = Math.sin(time * 0.4) * chaos * fields.gravitational.curvature;
  simulationState.spacetimeCurvature.t = time * 0.01 * chaos;
}

function updateQuantumSpinNetworks(time) {
  // Create and update quantum spin networks
  if (simulationState.spinNetworks.length < 5) {
    simulationState.spinNetworks.push({
      id: Date.now() + Math.random(),
      nodes: [],
      edges: [],
      spin: Math.random() * Math.PI * 2,
      energy: Math.random() * 100,
      time: time
    });
  }
  
  // Update existing spin networks
  simulationState.spinNetworks.forEach(network => {
    network.spin += 0.01 * time;
    network.energy = Math.abs(Math.sin(network.spin)) * 100;
  });
}

function updateParticlePhysics(particle) {
  const chaos = simulationState.chaosLevel;
  const time = simulationState.time;
  const fields = simulationState.fields;
  const temperature = simulationState.temperature;
  const pressure = simulationState.pressure;
  
  // Temperature effects on particle motion
  const thermalVelocity = Math.sqrt(3 * 1.380649e-23 * temperature / particle.mass) * 1000;
  
  // Pressure effects on particle confinement
  const pressureFactor = 1 / (1 + pressure);
  
  // Advanced quantum tunneling with field effects
  if (Math.random() < 0.001 * chaos * fields.quantum.superposition) {
    const tunnelDistance = 5 + Math.random() * 10;
    const angle = Math.random() * Math.PI * 2;
    
    particle.position.x += Math.cos(angle) * tunnelDistance;
    particle.position.y += Math.sin(angle) * tunnelDistance;
    particle.position.z += (Math.random() - 0.5) * tunnelDistance;
  }
  
  // Electromagnetic field effects
  const emStrength = fields.electromagnetic.strength;
  particle.velocity.x += Math.sin(time * emStrength) * 0.1 * chaos;
  particle.velocity.y += Math.cos(time * emStrength) * 0.1 * chaos;
  particle.velocity.z += Math.sin(time * emStrength * 0.5) * 0.1 * chaos;
  
  // Gravitational effects
  const gravStrength = fields.gravitational.curvature;
  particle.velocity.y -= gravStrength * 0.01;
  
  // Thermal motion
  particle.velocity.x += (Math.random() - 0.5) * thermalVelocity * 0.001;
  particle.velocity.y += (Math.random() - 0.5) * thermalVelocity * 0.001;
  particle.velocity.z += (Math.random() - 0.5) * thermalVelocity * 0.001;
  
  // Pressure confinement
  particle.velocity.x *= pressureFactor;
  particle.velocity.y *= pressureFactor;
  particle.velocity.z *= pressureFactor;
  
  // Update position with relativistic corrections
  const velocity = Math.sqrt(
    particle.velocity.x ** 2 + 
    particle.velocity.y ** 2 + 
    particle.velocity.z ** 2
  );
  
  const gamma = 1 / Math.sqrt(1 - (velocity / 3e8) ** 2);
  
  particle.position.x += particle.velocity.x * 0.016 * gamma;
  particle.position.y += particle.velocity.y * 0.016 * gamma;
  particle.position.z += particle.velocity.z * 0.016 * gamma;
  
  // Boundary wrapping with field effects
  particle.position.x = ((particle.position.x + 10) % 20) - 10;
  particle.position.y = ((particle.position.y + 10) % 20) - 10;
  particle.position.z = ((particle.position.z + 10) % 20) - 10;
  
  // Update quantum state
  particle.quantumState.phase += 0.1 * chaos;
  particle.energy = Math.abs(Math.sin(particle.quantumState.phase)) * 100;
  
  // Spin precession
  particle.quantumState.spin += 0.05 * chaos;
}

function applyQuantumEffects(particle) {
  const fields = simulationState.fields;
  
  // Quantum superposition collapse
  if (particle.quantumState.superposition && Math.random() < 0.001) {
    particle.quantumState.superposition = false;
    particle.quantumState.phase = Math.random() * Math.PI * 2;
  }
  
  // Entanglement effects
  if (particle.entangledWith !== null) {
    const partner = simulationState.particles.find(p => p.id === particle.entangledWith);
    if (partner) {
      // Correlated behavior
      const correlation = simulationState.entanglementGroups.find(g => 
        g.particles.includes(particle.id)
      )?.correlation || 0.5;
      
      partner.velocity.x += (particle.velocity.x - partner.velocity.x) * correlation * 0.01;
      partner.velocity.y += (particle.velocity.y - partner.velocity.y) * correlation * 0.01;
      partner.velocity.z += (particle.velocity.z - partner.velocity.z) * correlation * 0.01;
    }
  }
}

function handleParticleInteractions(particle) {
  // Find nearby particles for interactions
  const nearbyParticles = simulationState.particles.filter(p => {
    if (p.id === particle.id) return false;
    
    const distance = Math.sqrt(
      (p.position.x - particle.position.x) ** 2 +
      (p.position.y - particle.position.y) ** 2 +
      (p.position.z - particle.position.z) ** 2
    );
    
    return distance < 2;
  });
  
  // Handle electromagnetic interactions
  nearbyParticles.forEach(other => {
    if (particle.charge !== 0 && other.charge !== 0) {
      const distance = Math.sqrt(
        (other.position.x - particle.position.x) ** 2 +
        (other.position.y - particle.position.y) ** 2 +
        (other.position.z - particle.position.z) ** 2
      );
      
      if (distance > 0.1) {
        const force = (particle.charge * other.charge) / (distance ** 2) * 0.001;
        const direction = {
          x: (other.position.x - particle.position.x) / distance,
          y: (other.position.y - particle.position.y) / distance,
          z: (other.position.z - particle.position.z) / distance
        };
        
        particle.velocity.x += direction.x * force;
        particle.velocity.y += direction.y * force;
        particle.velocity.z += direction.z * force;
      }
    }
  });
  
  // Handle strong force interactions (gluon exchange)
  if (particle.color === 'quark' || particle.color === 'gluon') {
    handleStrongForceInteractions(particle, nearbyParticles);
  }
  
  // Handle weak force interactions
  if (particle.type === 'wBoson' || particle.type === 'zBoson') {
    handleWeakForceInteractions(particle, nearbyParticles);
  }
  
  // Handle Higgs field interactions
  if (particle.type === 'higgs') {
    handleHiggsFieldInteractions(particle, nearbyParticles);
  }
}

function handleStrongForceInteractions(particle, nearbyParticles) {
  const strongField = simulationState.fields.strong;
  const gluonField = strongField.gluonField;
  
  nearbyParticles.forEach(other => {
    if (other.color === 'quark' || other.color === 'gluon') {
      const distance = Math.sqrt(
        (other.position.x - particle.position.x) ** 2 +
        (other.position.y - particle.position.y) ** 2 +
        (other.position.z - particle.position.z) ** 2
      );
      
      if (distance < 1.5) {
        // Strong force is attractive at short distances
        const strongForce = gluonField * 0.002 / (distance ** 2);
        const direction = {
          x: (other.position.x - particle.position.x) / distance,
          y: (other.position.y - particle.position.y) / distance,
          z: (other.position.z - particle.position.z) / distance
        };
        
        particle.velocity.x -= direction.x * strongForce;
        particle.velocity.y -= direction.y * strongForce;
        particle.velocity.z -= direction.z * strongForce;
      }
    }
  });
}

function handleWeakForceInteractions(particle, nearbyParticles) {
  const weakField = simulationState.fields.weak;
  
  nearbyParticles.forEach(other => {
    if (other.type === 'electron' || other.type === 'neutrino') {
      const distance = Math.sqrt(
        (other.position.x - particle.position.x) ** 2 +
        (other.position.y - particle.position.y) ** 2 +
        (other.position.z - particle.position.z) ** 2
      );
      
      if (distance < 1.0) {
        // Weak force causes particle transformations
        if (Math.random() < 0.001 * weakField.strength) {
          // Simulate weak decay
          particle.energy *= 0.9;
          other.energy *= 0.9;
        }
      }
    }
  });
}

function handleHiggsFieldInteractions(particle, nearbyParticles) {
  // Higgs field gives mass to particles
  nearbyParticles.forEach(other => {
    if (other.type !== 'higgs' && other.type !== 'photon' && other.type !== 'gluon') {
      const distance = Math.sqrt(
        (other.position.x - particle.position.x) ** 2 +
        (other.position.y - particle.position.y) ** 2 +
        (other.position.z - particle.position.z) ** 2
      );
      
      if (distance < 2.0) {
        // Higgs field effect on mass
        const higgsEffect = 1.0 + 0.1 * Math.sin(simulationState.time * 0.1);
        other.mass *= higgsEffect;
      }
    }
  });
}

function updateWaveFunction(particle) {
  const time = simulationState.time;
  const chaos = simulationState.chaosLevel;
  
  // Schrödinger equation evolution
  const hbar = 1.054571817e-34;
  const energy = particle.energy;
  
  particle.waveFunction.real = Math.cos(energy * time / hbar) * particle.quantumState.amplitude;
  particle.waveFunction.imaginary = Math.sin(energy * time / hbar) * particle.quantumState.amplitude;
  
  // Add chaos to wave function
  particle.waveFunction.real += (Math.random() - 0.5) * 0.1 * chaos;
  particle.waveFunction.imaginary += (Math.random() - 0.5) * 0.1 * chaos;
}

function updateParticleTrail(particle) {
  const trail = simulationState.particleTrails.find(t => t.particleId === particle.id);
  if (trail) {
    trail.positions.push({
      x: particle.position.x,
      y: particle.position.y,
      z: particle.position.z,
      time: simulationState.time
    });
    
    // Limit trail length
    if (trail.positions.length > trail.maxTrailLength) {
      trail.positions.shift();
    }
  }
}

function handleParticleDecay() {
  simulationState.particles.forEach((particle, index) => {
    if (particle.lifetime > 0) {
      particle.lifetime -= 0.016;
      
      if (particle.lifetime <= 0 && particle.type !== 'photon') {
        // Particle decay
        const decayProducts = createDecayProducts(particle);
        simulationState.particles.splice(index, 1);
        
        // Add decay products
        decayProducts.forEach(product => {
          simulationState.particles.push(product);
        });
      }
    }
  });
}

function createDecayProducts(particle) {
  const products = [];
  
  if (particle.type === 'quark') {
    // Quark decays into lighter particles
    products.push(createParticle('electron', Date.now() + Math.random()));
    products.push(createParticle('neutrino', Date.now() + Math.random() + 1));
  } else if (particle.type === 'neutrino') {
    // Neutrino oscillation
    products.push(createParticle('photon', Date.now() + Math.random()));
  }
  
  return products;
}

function updateExperiments() {
  const experiments = simulationState.experiments;
  
  // Double slit experiment
  if (experiments.doubleSlit.active) {
    updateDoubleSlitExperiment();
  }
  
  // Bell test experiment
  if (experiments.bellTest.active) {
    updateBellTestExperiment();
  }
  
  // Quantum tunneling experiment
  if (experiments.quantumTunneling.active) {
    updateQuantumTunnelingExperiment();
  }
  
  // Particle collision experiment
  if (experiments.particleCollision.active) {
    updateParticleCollisionExperiment();
  }
  
  // Quantum teleportation experiment
  if (experiments.quantumTeleportation.active) {
    updateQuantumTeleportationExperiment();
  }
  
  // Schrödinger's cat experiment
  if (experiments.schrodingerCat.active) {
    updateSchrodingerCatExperiment();
  }
  
  // Quantum eraser experiment
  if (experiments.quantumEraser.active) {
    updateQuantumEraserExperiment();
  }
  
  // Delayed choice experiment
  if (experiments.delayedChoice.active) {
    updateDelayedChoiceExperiment();
  }
  
  // Quantum Zeno effect experiment
  if (experiments.quantumZeno.active) {
    updateQuantumZenoExperiment();
  }
  
  // Quantum walk experiment
  if (experiments.quantumWalk.active) {
    updateQuantumWalkExperiment();
  }
}

function updateDoubleSlitExperiment() {
  const experiment = simulationState.experiments.doubleSlit;
  
  // Create interference pattern
  simulationState.particles.forEach(particle => {
    if (particle.type === 'photon') {
      const x = particle.position.x;
      const interference = Math.sin(x * 2) * Math.cos(x * 3);
      particle.position.y += interference * 0.01;
    }
  });
}

function updateBellTestExperiment() {
  const experiment = simulationState.experiments.bellTest;
  
  // Measure entanglement correlation
  let totalCorrelation = 0;
  simulationState.entanglementGroups.forEach(group => {
    totalCorrelation += group.correlation;
  });
  
  experiment.correlation = totalCorrelation / simulationState.entanglementGroups.length;
}

function updateQuantumTunnelingExperiment() {
  const experiment = simulationState.experiments.quantumTunneling;
  
  // Increase tunneling probability
  simulationState.particles.forEach(particle => {
    if (Math.random() < 0.01) {
      const tunnelDistance = 10 + Math.random() * 20;
      particle.position.x += (Math.random() - 0.5) * tunnelDistance;
      particle.position.y += (Math.random() - 0.5) * tunnelDistance;
      particle.position.z += (Math.random() - 0.5) * tunnelDistance;
    }
  });
}

function updateParticleCollisionExperiment() {
  const experiment = simulationState.experiments.particleCollision;
  
  // Simulate high-energy collisions
  let totalEnergy = 0;
  simulationState.particles.forEach(particle => {
    totalEnergy += particle.energy;
  });
  
  experiment.energy = totalEnergy;
}

function updateQuantumTeleportationExperiment() {
  const experiment = simulationState.experiments.quantumTeleportation;
  
  // Simulate quantum teleportation
  if (Math.random() < 0.001) {
    const particle = simulationState.particles[Math.floor(Math.random() * simulationState.particles.length)];
    if (particle) {
      particle.position.x = (Math.random() - 0.5) * 40;
      particle.position.y = (Math.random() - 0.5) * 40;
      particle.position.z = (Math.random() - 0.5) * 40;
      
      experiment.teleported.push(particle.id);
      experiment.fidelity = 0.95 + Math.random() * 0.05;
    }
  }
}

function updateSchrodingerCatExperiment() {
  const experiment = simulationState.experiments.schrodingerCat;
  
  // Update cat state probability
  experiment.probability = 0.5 + 0.3 * Math.sin(simulationState.time * 0.1);
  
  if (Math.random() < 0.001) {
    experiment.catState = Math.random() < experiment.probability ? 'alive' : 'dead';
  }
}

function updateQuantumEraserExperiment() {
  const experiment = simulationState.experiments.quantumEraser;
  
  // Simulate quantum eraser
  if (Math.random() < 0.001) {
    const particle = simulationState.particles[Math.floor(Math.random() * simulationState.particles.length)];
    if (particle) {
      // Simulate which path the particle took
      const whichPath = Math.random() < 0.5 ? 'A' : 'B';
      experiment.whichPath.push(whichPath);
      
      // Simulate interference pattern
      const interference = Math.sin(particle.position.x * 2) * Math.cos(particle.position.y * 3);
      particle.position.z += interference * 0.01;
      
      // Simulate wave function collapse
      particle.quantumState.superposition = false;
      particle.quantumState.phase = Math.random() * Math.PI * 2;
      particle.waveFunction.real = Math.cos(particle.quantumState.phase) * particle.quantumState.amplitude;
      particle.waveFunction.imaginary = Math.sin(particle.quantumState.phase) * particle.quantumState.amplitude;
      
      experiment.erased.push(particle.id);
    }
  }
}

function updateDelayedChoiceExperiment() {
  const experiment = simulationState.experiments.delayedChoice;
  
  // Simulate delayed choice
  if (Math.random() < 0.001) {
    const particle = simulationState.particles[Math.floor(Math.random() * simulationState.particles.length)];
    if (particle) {
      // Simulate which path the particle took
      const whichPath = Math.random() < 0.5 ? 'A' : 'B';
      experiment.choice = whichPath;
      
      // Simulate measurement
      if (whichPath === 'A') {
        particle.position.x = (Math.random() - 0.5) * 10;
        particle.position.y = (Math.random() - 0.5) * 10;
        particle.position.z = (Math.random() - 0.5) * 10;
      } else {
        particle.position.x = (Math.random() - 0.5) * 10;
        particle.position.y = (Math.random() - 0.5) * 10;
        particle.position.z = (Math.random() - 0.5) * 10;
      }
      
      experiment.measurement.push(particle.id);
      experiment.delayed.push(particle.id);
    }
  }
}

function updateQuantumZenoExperiment() {
  const experiment = simulationState.experiments.quantumZeno;
  
  // Simulate quantum Zeno effect
  if (Math.random() < 0.001) {
    const particle = simulationState.particles[Math.floor(Math.random() * simulationState.particles.length)];
    if (particle) {
      // Simulate freezing of particle
      particle.quantumState.superposition = false;
      particle.quantumState.phase = Math.random() * Math.PI * 2;
      particle.waveFunction.real = Math.cos(particle.quantumState.phase) * particle.quantumState.amplitude;
      particle.waveFunction.imaginary = Math.sin(particle.quantumState.phase) * particle.quantumState.amplitude;
      
      experiment.frozen.push(particle.id);
      experiment.zenoTime += 0.016; // Increment time
    }
  }
}

function updateQuantumWalkExperiment() {
  const experiment = simulationState.experiments.quantumWalk;
  
  // Simulate quantum walk
  if (Math.random() < 0.001) {
    const particle = simulationState.particles[Math.floor(Math.random() * simulationState.particles.length)];
    if (particle) {
      // Simulate step in a random direction
      const stepSize = 0.1 + Math.random() * 0.5;
      const angle = Math.random() * Math.PI * 2;
      
      particle.position.x += Math.cos(angle) * stepSize;
      particle.position.y += Math.sin(angle) * stepSize;
      particle.position.z += (Math.random() - 0.5) * stepSize;
      
      experiment.walkers.push(particle.id);
      experiment.steps++;
      
      // Simulate wave function collapse
      particle.quantumState.superposition = false;
      particle.quantumState.phase = Math.random() * Math.PI * 2;
      particle.waveFunction.real = Math.cos(particle.quantumState.phase) * particle.quantumState.amplitude;
      particle.waveFunction.imaginary = Math.sin(particle.quantumState.phase) * particle.quantumState.amplitude;
    }
  }
}

function updateQuantumState() {
  const quantumState = simulationState.quantumState;
  
  // Count particles in superposition
  quantumState.superpositionCount = simulationState.particles.filter(p => 
    p.quantumState.superposition
  ).length;
  
  // Count collapsed particles
  quantumState.collapsedCount = simulationState.particles.length - quantumState.superpositionCount;
  
  // Calculate total energy
  quantumState.totalEnergy = simulationState.particles.reduce((total, p) => total + p.energy, 0);
  
  // Calculate entropy (simplified)
  quantumState.entropy = Math.log(simulationState.particles.length) * simulationState.chaosLevel;
  
  // Calculate uncertainty
  quantumState.uncertainty = simulationState.chaosLevel * 0.5;
  
  // Calculate coherence
  quantumState.coherence = 1 - simulationState.chaosLevel;
}

// NEW: Real-time Multiplayer Support System
class MultiplayerManager {
  constructor(io) {
    this.io = io;
    this.rooms = new Map();
    this.users = new Map();
    this.collaborativeExperiments = new Map();
    this.simulationSync = new Map();
    this.chatHistory = new Map();
    this.userPermissions = new Map();
    
    this.setupSocketHandlers();
    this.setupRoomManagement();
    this.setupCollaborativeFeatures();
  }

  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);
      
      // User authentication and room joining
      socket.on('joinRoom', (data) => this.handleJoinRoom(socket, data));
      socket.on('leaveRoom', (data) => this.handleLeaveRoom(socket, data));
      socket.on('updateUserProfile', (data) => this.handleUpdateProfile(socket, data));
      
      // Real-time simulation synchronization
      socket.on('simulationUpdate', (data) => this.handleSimulationUpdate(socket, data));
      socket.on('particleInteraction', (data) => this.handleParticleInteraction(socket, data));
      socket.on('fieldModification', (data) => this.handleFieldModification(socket, data));
      
      // Collaborative experiments
      socket.on('startCollaborativeExperiment', (data) => this.handleStartExperiment(socket, data));
      socket.on('experimentUpdate', (data) => this.handleExperimentUpdate(socket, data));
      socket.on('experimentResult', (data) => this.handleExperimentResult(socket, data));
      
      // Real-time communication
      socket.on('chatMessage', (data) => this.handleChatMessage(socket, data));
      socket.on('voiceChat', (data) => this.handleVoiceChat(socket, data));
      socket.on('screenShare', (data) => this.handleScreenShare(socket, data));
      
      // User interactions
      socket.on('userAction', (data) => this.handleUserAction(socket, data));
      socket.on('requestPermission', (data) => this.handlePermissionRequest(socket, data));
      socket.on('grantPermission', (data) => this.handlePermissionGrant(socket, data));
      
      // Disconnection handling
      socket.on('disconnect', () => this.handleDisconnect(socket));
    });
  }

  handleJoinRoom(socket, data) {
    const { roomId, username, avatar, permissions } = data;
    
    // Create room if it doesn't exist
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        id: roomId,
        name: `Quantum Lab ${roomId}`,
        users: new Set(),
        experiments: new Map(),
        simulationState: { ...simulationState },
        settings: {
          maxUsers: 20,
          allowExperiments: true,
          requireApproval: false,
          privacyLevel: 'public'
        },
        createdAt: Date.now(),
        lastActivity: Date.now()
      });
    }
    
    const room = this.rooms.get(roomId);
    
    // Check room capacity
    if (room.users.size >= room.settings.maxUsers) {
      socket.emit('roomError', { message: 'Room is full' });
      return;
    }
    
    // Add user to room
    const user = {
      id: socket.id,
      username: username || `User_${socket.id.slice(0, 6)}`,
      avatar: avatar || 'default',
      permissions: permissions || ['view', 'chat'],
      joinTime: Date.now(),
      lastActivity: Date.now(),
      isOnline: true,
      currentExperiment: null,
      contributionScore: 0
    };
    
    room.users.add(socket.id);
    this.users.set(socket.id, { ...user, roomId });
    this.userPermissions.set(socket.id, user.permissions);
    
    // Join socket room
    socket.join(roomId);
    
    // Notify room of new user
    this.io.to(roomId).emit('userJoined', {
      user: { id: socket.id, username: user.username, avatar: user.avatar },
      roomInfo: {
        userCount: room.users.size,
        experimentCount: room.experiments.size
      }
    });
    
    // Send room state to new user
    socket.emit('roomJoined', {
      room: room,
      users: Array.from(room.users).map(id => this.users.get(id)),
      experiments: Array.from(room.experiments.values()),
      simulationState: room.simulationState
    });
    
    console.log(`User ${user.username} joined room ${roomId}`);
  }

  handleLeaveRoom(socket, data) {
    const userId = socket.id;
    const user = this.users.get(userId);
    
    if (!user) return;
    
    const roomId = user.roomId;
    const room = this.rooms.get(roomId);
    
    if (room) {
      room.users.delete(userId);
      room.lastActivity = Date.now();
      
      // Remove user from room
      socket.leave(roomId);
      
      // Notify room of user departure
      this.io.to(roomId).emit('userLeft', {
        userId: userId,
        username: user.username,
        roomInfo: {
          userCount: room.users.size,
          experimentCount: room.experiments.size
        }
      });
      
      // Clean up empty rooms
      if (room.users.size === 0) {
        this.rooms.delete(roomId);
        console.log(`Room ${roomId} deleted (empty)`);
      }
      
      console.log(`User ${user.username} left room ${roomId}`);
    }
    
    // Clean up user data
    this.users.delete(userId);
    this.userPermissions.delete(userId);
  }

  handleSimulationUpdate(socket, data) {
    const { roomId, simulationData, timestamp } = data;
    const user = this.users.get(socket.id);
    
    if (!user || user.roomId !== roomId) return;
    
    const room = this.rooms.get(roomId);
    if (!room) return;
    
    // Update room simulation state
    room.simulationState = { ...room.simulationState, ...simulationData };
    room.lastActivity = Date.now();
    
    // Broadcast to other users in room
    socket.to(roomId).emit('simulationUpdated', {
      userId: socket.id,
      username: user.username,
      simulationData: simulationData,
      timestamp: timestamp
    });
    
    // Update global simulation state if user has permission
    if (this.hasPermission(socket.id, 'modify_simulation')) {
      Object.assign(simulationState, simulationData);
    }
  }

  handleParticleInteraction(socket, data) {
    const { roomId, particleId, interactionType, parameters } = data;
    const user = this.users.get(socket.id);
    
    if (!user || user.roomId !== roomId) return;
    
    const room = this.rooms.get(roomId);
    if (!room) return;
    
    // Process particle interaction
    const result = this.processParticleInteraction(particleId, interactionType, parameters);
    
    // Broadcast interaction to room
    this.io.to(roomId).emit('particleInteractionResult', {
      userId: socket.id,
      username: user.username,
      particleId: particleId,
      interactionType: interactionType,
      result: result,
      timestamp: Date.now()
    });
    
    // Update user contribution score
    this.updateUserContribution(socket.id, 1);
  }

  processParticleInteraction(particleId, interactionType, parameters) {
    // Advanced particle interaction processing
    switch (interactionType) {
      case 'measurement':
        return this.processQuantumMeasurement(particleId, parameters);
      case 'entanglement':
        return this.processEntanglement(particleId, parameters);
      case 'tunneling':
        return this.processTunneling(particleId, parameters);
      case 'decay':
        return this.processParticleDecay(particleId, parameters);
      case 'collision':
        return this.processParticleCollision(particleId, parameters);
      default:
        return { success: false, error: 'Unknown interaction type' };
    }
  }

  processQuantumMeasurement(particleId, parameters) {
    const { measurementType, basis } = parameters;
    
    // Simulate quantum measurement
    const measurementResult = {
      type: measurementType,
      basis: basis,
      result: Math.random() > 0.5 ? 'up' : 'down',
      uncertainty: Math.random() * 0.1,
      timestamp: Date.now()
    };
    
    return {
      success: true,
      measurement: measurementResult,
      particleState: 'collapsed'
    };
  }

  processEntanglement(particleId, parameters) {
    const { targetParticleId, entanglementType } = parameters;
    
    // Create entanglement between particles
    const entanglement = {
      type: entanglementType,
      particles: [particleId, targetParticleId],
      strength: Math.random(),
      correlation: Math.random() * 2 - 1,
      timestamp: Date.now()
    };
    
    return {
      success: true,
      entanglement: entanglement,
      message: 'Particles successfully entangled'
    };
  }

  processTunneling(particleId, parameters) {
    const { barrierHeight, barrierWidth } = parameters;
    
    // Calculate tunneling probability
    const probability = quantumEngine.calculateTunnelingProbability(
      barrierHeight, barrierWidth, 100, 0.511
    );
    
    const tunneled = Math.random() < probability;
    
    return {
      success: true,
      tunneled: tunneled,
      probability: probability,
      barrierInfo: { height: barrierHeight, width: barrierWidth }
    };
  }

  processParticleDecay(particleId, parameters) {
    const { decayMode, lifetime } = parameters;
    
    // Simulate particle decay
    const decayProducts = this.generateDecayProducts(decayMode);
    const decayTime = -lifetime * Math.log(Math.random());
    
    return {
      success: true,
      decayed: true,
      decayProducts: decayProducts,
      decayTime: decayTime,
      mode: decayMode
    };
  }

  processParticleCollision(particleId, parameters) {
    const { targetParticleId, collisionEnergy } = parameters;
    
    // Simulate particle collision
    const collisionResult = this.simulateCollision(particleId, targetParticleId, collisionEnergy);
    
    return {
      success: true,
      collision: collisionResult,
      energyConserved: true,
      momentumConserved: true
    };
  }

  generateDecayProducts(decayMode) {
    const decayModes = {
      'beta_minus': ['electron', 'antineutrino'],
      'beta_plus': ['positron', 'neutrino'],
      'alpha': ['helium_nucleus'],
      'gamma': ['photon']
    };
    
    return decayModes[decayMode] || ['unknown_particle'];
  }

  simulateCollision(particle1Id, particle2Id, energy) {
    // Simplified collision simulation
    return {
      products: ['new_particle_1', 'new_particle_2'],
      energy: energy * 0.8, // Energy loss
      momentum: { x: 0, y: 0, z: 0 },
      collisionType: 'elastic'
    };
  }

  handleStartExperiment(socket, data) {
    const { roomId, experimentType, parameters, collaborators } = data;
    const user = this.users.get(socket.id);
    
    if (!user || user.roomId !== roomId) return;
    
    const room = this.rooms.get(roomId);
    if (!room) return;
    
    // Create collaborative experiment
    const experimentId = `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const experiment = {
      id: experimentId,
      type: experimentType,
      creator: socket.id,
      collaborators: collaborators || [socket.id],
      parameters: parameters,
      status: 'running',
      startTime: Date.now(),
      results: [],
      data: [],
      participants: new Set([socket.id, ...collaborators])
    };
    
    room.experiments.set(experimentId, experiment);
    this.collaborativeExperiments.set(experimentId, experiment);
    
    // Notify room of new experiment
    this.io.to(roomId).emit('experimentStarted', {
      experiment: experiment,
      creator: user.username
    });
    
    // Update user's current experiment
    user.currentExperiment = experimentId;
    
    console.log(`Collaborative experiment ${experimentType} started in room ${roomId}`);
  }

  handleExperimentUpdate(socket, data) {
    const { experimentId, updateType, data: experimentData } = data;
    const user = this.users.get(socket.id);
    
    if (!user) return;
    
    const experiment = this.collaborativeExperiments.get(experimentId);
    if (!experiment || !experiment.participants.has(socket.id)) return;
    
    // Update experiment data
    experiment.data.push({
      userId: socket.id,
      username: user.username,
      updateType: updateType,
      data: experimentData,
      timestamp: Date.now()
    });
    
    // Broadcast update to all participants
    experiment.participants.forEach(participantId => {
      this.io.to(participantId).emit('experimentUpdated', {
        experimentId: experimentId,
        update: {
          userId: socket.id,
          username: user.username,
          updateType: updateType,
          data: experimentData,
          timestamp: Date.now()
        }
      });
    });
  }

  handleExperimentResult(socket, data) {
    const { experimentId, results, analysis } = data;
    const user = this.users.get(socket.id);
    
    if (!user) return;
    
    const experiment = this.collaborativeExperiments.get(experimentId);
    if (!experiment || !experiment.participants.has(socket.id)) return;
    
    // Finalize experiment
    experiment.status = 'completed';
    experiment.results = results;
    experiment.analysis = analysis;
    experiment.endTime = Date.now();
    experiment.duration = experiment.endTime - experiment.startTime;
    
    // Calculate participant contributions
    const participantContributions = {};
    experiment.participants.forEach(participantId => {
      const participant = this.users.get(participantId);
      if (participant) {
        participant.contributionScore += 10;
        participantContributions[participantId] = participant.contributionScore;
      }
    });
    
    // Broadcast completion to all participants
    experiment.participants.forEach(participantId => {
      this.io.to(participantId).emit('experimentCompleted', {
        experimentId: experimentId,
        results: results,
        analysis: analysis,
        contributions: participantContributions,
        duration: experiment.duration
      });
    });
    
    // Update user's current experiment
    user.currentExperiment = null;
    
    console.log(`Collaborative experiment ${experimentId} completed`);
  }

  handleChatMessage(socket, data) {
    const { roomId, message, messageType } = data;
    const user = this.users.get(socket.id);
    
    if (!user || user.roomId !== roomId) return;
    
    const room = this.rooms.get(roomId);
    if (!room) return;
    
    const chatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: socket.id,
      username: user.username,
      avatar: user.avatar,
      message: message,
      type: messageType || 'text',
      timestamp: Date.now(),
      roomId: roomId
    };
    
    // Store in chat history
    if (!this.chatHistory.has(roomId)) {
      this.chatHistory.set(roomId, []);
    }
    this.chatHistory.get(roomId).push(chatMessage);
    
    // Limit chat history
    if (this.chatHistory.get(roomId).length > 100) {
      this.chatHistory.get(roomId).shift();
    }
    
    // Broadcast to room
    this.io.to(roomId).emit('chatMessage', chatMessage);
    
    // Update user activity
    user.lastActivity = Date.now();
  }

  handleVoiceChat(socket, data) {
    const { roomId, audioData, audioType } = data;
    const user = this.users.get(socket.id);
    
    if (!user || user.roomId !== roomId) return;
    
    // Broadcast voice data to other users in room
    socket.to(roomId).emit('voiceChat', {
      userId: socket.id,
      username: user.username,
      audioData: audioData,
      audioType: audioType,
      timestamp: Date.now()
    });
  }

  handleScreenShare(socket, data) {
    const { roomId, screenData, screenType } = data;
    const user = this.users.get(socket.id);
    
    if (!user || user.roomId !== roomId) return;
    
    // Broadcast screen share to other users in room
    socket.to(roomId).emit('screenShare', {
      userId: socket.id,
      username: user.username,
      screenData: screenData,
      screenType: screenType,
      timestamp: Date.now()
    });
  }

  handleUserAction(socket, data) {
    const { roomId, actionType, actionData } = data;
    const user = this.users.get(socket.id);
    
    if (!user || user.roomId !== roomId) return;
    
    // Process user action
    const actionResult = this.processUserAction(actionType, actionData, user);
    
    // Broadcast action to room
    this.io.to(roomId).emit('userAction', {
      userId: socket.id,
      username: user.username,
      actionType: actionType,
      actionData: actionData,
      result: actionResult,
      timestamp: Date.now()
    });
    
    // Update user contribution score
    this.updateUserContribution(socket.id, 2);
  }

  processUserAction(actionType, actionData, user) {
    switch (actionType) {
      case 'particle_creation':
        return this.processParticleCreation(actionData, user);
      case 'field_modification':
        return this.processFieldModification(actionData, user);
      case 'experiment_suggestion':
        return this.processExperimentSuggestion(actionData, user);
      case 'parameter_adjustment':
        return this.processParameterAdjustment(actionData, user);
      default:
        return { success: false, error: 'Unknown action type' };
    }
  }

  processParticleCreation(actionData, user) {
    const { particleType, position, energy } = actionData;
    
    // Create new particle using quantum engine
    const particle = quantumEngine.createParticle(particleType, energy, position);
    
    return {
      success: true,
      particle: particle,
      message: `${user.username} created a ${particleType} particle`
    };
  }

  processFieldModification(actionData, user) {
    const { fieldType, modification, parameters } = actionData;
    
    // Modify quantum fields
    if (simulationState.fields[fieldType]) {
      Object.assign(simulationState.fields[fieldType], modification);
      
      return {
        success: true,
        fieldType: fieldType,
        modification: modification,
        message: `${user.username} modified ${fieldType} field`
      };
    }
    
    return {
      success: false,
      error: 'Field type not found'
    };
  }

  processExperimentSuggestion(actionData, user) {
    const { experimentType, description, parameters } = actionData;
    
    return {
      success: true,
      suggestion: {
        type: experimentType,
        description: description,
        parameters: parameters,
        suggestedBy: user.username,
        timestamp: Date.now()
      },
      message: `${user.username} suggested a new experiment`
    };
  }

  processParameterAdjustment(actionData, user) {
    const { parameter, value, reason } = actionData;
    
    // Adjust simulation parameters
    if (simulationState[parameter] !== undefined) {
      const oldValue = simulationState[parameter];
      simulationState[parameter] = value;
      
      return {
        success: true,
        parameter: parameter,
        oldValue: oldValue,
        newValue: value,
        reason: reason,
        message: `${user.username} adjusted ${parameter} from ${oldValue} to ${value}`
      };
    }
    
    return {
      success: false,
      error: 'Parameter not found'
    };
  }

  handlePermissionRequest(socket, data) {
    const { roomId, permissionType, targetUserId } = data;
    const user = this.users.get(socket.id);
    
    if (!user || user.roomId !== roomId) return;
    
    // Send permission request to target user
    this.io.to(targetUserId).emit('permissionRequest', {
      requesterId: socket.id,
      requesterName: user.username,
      permissionType: permissionType,
      roomId: roomId,
      timestamp: Date.now()
    });
  }

  handlePermissionGrant(socket, data) {
    const { requesterId, permissionType, granted } = data;
    const user = this.users.get(socket.id);
    
    if (!user) return;
    
    if (granted) {
      // Grant permission to requester
      const requester = this.users.get(requesterId);
      if (requester) {
        requester.permissions.push(permissionType);
        this.userPermissions.set(requesterId, requester.permissions);
      }
    }
    
    // Notify requester of decision
    this.io.to(requesterId).emit('permissionResponse', {
      granterId: socket.id,
      granterName: user.username,
      permissionType: permissionType,
      granted: granted,
      timestamp: Date.now()
    });
  }

  handleDisconnect(socket) {
    const userId = socket.id;
    const user = this.users.get(userId);
    
    if (user) {
      // Handle user leaving room
      this.handleLeaveRoom(socket, {});
      
      console.log(`User ${user.username} disconnected`);
    }
  }

  hasPermission(userId, permission) {
    const userPerms = this.userPermissions.get(userId);
    return userPerms && userPerms.includes(permission);
  }

  updateUserContribution(userId, points) {
    const user = this.users.get(userId);
    if (user) {
      user.contributionScore += points;
      user.lastActivity = Date.now();
    }
  }

  setupRoomManagement() {
    // Clean up inactive rooms every 5 minutes
    setInterval(() => {
      const now = Date.now();
      const inactiveThreshold = 30 * 60 * 1000; // 30 minutes
      
      for (const [roomId, room] of this.rooms.entries()) {
        if (now - room.lastActivity > inactiveThreshold) {
          // Archive room data before deletion
          this.archiveRoom(room);
          this.rooms.delete(roomId);
          console.log(`Room ${roomId} archived due to inactivity`);
        }
      }
    }, 5 * 60 * 1000);
  }

  setupCollaborativeFeatures() {
    // Synchronize simulation state across all rooms every second
    setInterval(() => {
      for (const [roomId, room] of this.rooms.entries()) {
        if (room.users.size > 0) {
          this.io.to(roomId).emit('simulationSync', {
            state: room.simulationState,
            timestamp: Date.now()
          });
        }
      }
    }, 1000);
  }

  archiveRoom(room) {
    // Archive room data for future reference
    const archive = {
      roomId: room.id,
      name: room.name,
      users: Array.from(room.users),
      experiments: Array.from(room.experiments.values()),
      simulationState: room.simulationState,
      createdAt: room.createdAt,
      lastActivity: room.lastActivity,
      archivedAt: Date.now()
    };
    
    // Store archive (could be saved to database)
    console.log(`Room archived:`, archive);
  }

  // Public methods for external access
  getRoomInfo(roomId) {
    return this.rooms.get(roomId);
  }

  getUserInfo(userId) {
    return this.users.get(userId);
  }

  getActiveRooms() {
    return Array.from(this.rooms.values());
  }

  getActiveUsers() {
    return Array.from(this.users.values());
  }

  getCollaborativeExperiments() {
    return Array.from(this.collaborativeExperiments.values());
  }
}

// Initialize multiplayer manager
const multiplayerManager = new MultiplayerManager(io);

// NEW: Advanced Experiment Framework
class AdvancedExperimentFramework {
  constructor() {
    this.experiments = new Map();
    this.experimentTemplates = new Map();
    this.dataCollectors = new Map();
    this.analysisEngines = new Map();
    this.resultsDatabase = new Map();
    
    this.initializeExperimentTemplates();
    this.initializeDataCollectors();
    this.initializeAnalysisEngines();
  }

  initializeExperimentTemplates() {
    // Quantum Entanglement Experiments
    this.experimentTemplates.set('bell_test', {
      name: 'Bell Test Experiment',
      description: 'Test quantum non-locality with entangled particles',
      parameters: {
        particleCount: { min: 2, max: 100, default: 10 },
        measurementBases: { min: 2, max: 8, default: 4 },
        correlationThreshold: { min: 0.1, max: 1.0, default: 0.7 }
      },
      setup: this.setupBellTest.bind(this),
      run: this.runBellTest.bind(this),
      analyze: this.analyzeBellTest.bind(this)
    });

    // Quantum Tunneling Experiments
    this.experimentTemplates.set('tunneling_spectroscopy', {
      name: 'Quantum Tunneling Spectroscopy',
      description: 'Study tunneling probability vs barrier properties',
      parameters: {
        barrierHeights: { min: 10, max: 1000, default: 100 },
        barrierWidths: { min: 0.1, max: 10, default: 1.0 },
        particleEnergies: { min: 1, max: 500, default: 50 }
      },
      setup: this.setupTunnelingSpectroscopy.bind(this),
      run: this.runTunnelingSpectroscopy.bind(this),
      analyze: this.analyzeTunnelingSpectroscopy.bind(this)
    });

    // Particle Collision Experiments
    this.experimentTemplates.set('collision_analysis', {
      name: 'High-Energy Particle Collision Analysis',
      description: 'Study particle interactions and decay products',
      parameters: {
        collisionEnergy: { min: 100, max: 10000, default: 1000 },
        particleTypes: { options: ['electron', 'photon', 'quark'], default: ['electron'] },
        detectorResolution: { min: 0.01, max: 1.0, default: 0.1 }
      },
      setup: this.setupCollisionAnalysis.bind(this),
      run: this.runCollisionAnalysis.bind(this),
      analyze: this.analyzeCollisionAnalysis.bind(this)
    });

    // Quantum Computing Experiments
    this.experimentTemplates.set('quantum_algorithm', {
      name: 'Quantum Algorithm Implementation',
      description: 'Implement and test quantum algorithms',
      parameters: {
        algorithm: { options: ['Grover', 'Shor', 'Deutsch-Jozsa'], default: 'Grover' },
        qubitCount: { min: 2, max: 10, default: 4 },
        iterationCount: { min: 10, max: 1000, default: 100 }
      },
      setup: this.setupQuantumAlgorithm.bind(this),
      run: this.runQuantumAlgorithm.bind(this),
      analyze: this.analyzeQuantumAlgorithm.bind(this)
    });

    // Wave Function Evolution Experiments
    this.experimentTemplates.set('wave_evolution', {
      name: 'Wave Function Evolution Study',
      description: 'Study quantum wave function dynamics',
      parameters: {
        initialState: { options: ['gaussian', 'square', 'exponential'], default: 'gaussian' },
        potentialType: { options: ['harmonic', 'square', 'coulomb'], default: 'harmonic' },
        evolutionTime: { min: 0.1, max: 10.0, default: 2.0 }
      },
      setup: this.setupWaveEvolution.bind(this),
      run: this.runWaveEvolution.bind(this),
      analyze: this.analyzeWaveEvolution.bind(this)
    });
  }

  initializeDataCollectors() {
    // Particle Data Collector
    this.dataCollectors.set('particle', {
      collect: (particles, timestamp) => ({
        count: particles.length,
        types: particles.map(p => p.type),
        positions: particles.map(p => p.position),
        velocities: particles.map(p => p.velocity),
        energies: particles.map(p => p.energy),
        timestamp: timestamp
      }),
      aggregate: (dataPoints) => {
        const aggregated = {
          totalParticles: dataPoints.reduce((sum, dp) => sum + dp.count, 0),
          averageEnergy: dataPoints.reduce((sum, dp) => sum + dp.energies.reduce((s, e) => s + e, 0), 0) / dataPoints.reduce((sum, dp) => sum + dp.count, 0),
          typeDistribution: {},
          positionVariance: this.calculatePositionVariance(dataPoints),
          velocityDistribution: this.calculateVelocityDistribution(dataPoints)
        };
        
        // Calculate type distribution
        dataPoints.forEach(dp => {
          dp.types.forEach(type => {
            aggregated.typeDistribution[type] = (aggregated.typeDistribution[type] || 0) + 1;
          });
        });
        
        return aggregated;
      }
    });

    // Field Data Collector
    this.dataCollectors.set('field', {
      collect: (fields, timestamp) => ({
        electromagnetic: {
          strength: fields.electromagnetic.strength,
          frequency: fields.electromagnetic.frequency,
          phase: fields.electromagnetic.phase
        },
        gravitational: {
          strength: fields.gravitational.strength,
          curvature: fields.gravitational.curvature
        },
        quantum: {
          entanglement: fields.quantum.entanglement,
          superposition: fields.quantum.superposition
        },
        timestamp: timestamp
      }),
      aggregate: (dataPoints) => {
        return {
          averageEMStrength: dataPoints.reduce((sum, dp) => sum + dp.electromagnetic.strength, 0) / dataPoints.length,
          averageGravStrength: dataPoints.reduce((sum, dp) => sum + dp.gravitational.strength, 0) / dataPoints.length,
          averageQuantumEntanglement: dataPoints.reduce((sum, dp) => sum + dp.quantum.entanglement, 0) / dataPoints.length,
          fieldCorrelations: this.calculateFieldCorrelations(dataPoints)
        };
      }
    });

    // Quantum State Data Collector
    this.dataCollectors.set('quantum_state', {
      collect: (quantumState, timestamp) => ({
        superpositionCount: quantumState.superpositionCount,
        collapsedCount: quantumState.collapsedCount,
        uncertainty: quantumState.uncertainty,
        coherence: quantumState.coherence,
        totalEnergy: quantumState.totalEnergy,
        entropy: quantumState.entropy,
        timestamp: timestamp
      }),
      aggregate: (dataPoints) => {
        return {
          averageUncertainty: dataPoints.reduce((sum, dp) => sum + dp.uncertainty, 0) / dataPoints.length,
          averageCoherence: dataPoints.reduce((sum, dp) => sum + dp.coherence, 0) / dataPoints.length,
          energyConservation: this.checkEnergyConservation(dataPoints),
          entropyEvolution: this.calculateEntropyEvolution(dataPoints)
        };
      }
    });
  }

  initializeAnalysisEngines() {
    // Statistical Analysis Engine
    this.analysisEngines.set('statistical', {
      analyze: (data) => {
        const values = Array.isArray(data) ? data : Object.values(data);
        const n = values.length;
        
        if (n === 0) return { error: 'No data to analyze' };
        
        const sum = values.reduce((s, v) => s + v, 0);
        const mean = sum / n;
        const variance = values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / n;
        const stdDev = Math.sqrt(variance);
        
        const sorted = values.sort((a, b) => a - b);
        const median = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
        
        return {
          count: n,
          mean: mean,
          median: median,
          variance: variance,
          standardDeviation: stdDev,
          min: sorted[0],
          max: sorted[n - 1],
          range: sorted[n - 1] - sorted[0]
        };
      }
    });

    // Quantum Analysis Engine
    this.analysisEngines.set('quantum', {
      analyze: (data) => {
        if (data.type === 'entanglement') {
          return this.analyzeEntanglementData(data);
        } else if (data.type === 'tunneling') {
          return this.analyzeTunnelingData(data);
        } else if (data.type === 'collision') {
          return this.analyzeCollisionData(data);
        }
        return { error: 'Unknown quantum data type' };
      }
    });

    // Machine Learning Analysis Engine
    this.analysisEngines.set('machine_learning', {
      analyze: (data) => {
        // Simple pattern recognition and prediction
        return this.performMLAnalysis(data);
      }
    });
  }

  // Experiment Setup Methods
  setupBellTest(parameters) {
    const { particleCount, measurementBases, correlationThreshold } = parameters;
    
    // Create entangled particle pairs
    const particles = [];
    for (let i = 0; i < particleCount; i += 2) {
      const particle1 = quantumEngine.createParticle('electron', 100, { x: 0, y: 0, z: 0 });
      const particle2 = quantumEngine.createParticle('electron', 100, { x: 0, y: 0, z: 0 });
      
      // Entangle particles
      particle1.entangledWith = particle2.id;
      particle2.entangledWith = particle1.id;
      
      particles.push(particle1, particle2);
    }
    
    // Setup measurement apparatus
    const measurementApparatus = {
      bases: this.generateMeasurementBases(measurementBases),
      detectors: particles.map(() => ({ state: 'ready', measurement: null })),
      correlationThreshold: correlationThreshold
    };
    
    return {
      particles: particles,
      apparatus: measurementApparatus,
      parameters: parameters,
      status: 'ready'
    };
  }

  setupTunnelingSpectroscopy(parameters) {
    const { barrierHeights, barrierWidths, particleEnergies } = parameters;
    
    // Create potential barriers
    const barriers = [];
    for (let i = 0; i < barrierHeights.length; i++) {
      barriers.push({
        height: barrierHeights[i],
        width: barrierWidths[i],
        position: { x: 5, y: 0, z: 0 },
        particles: []
      });
    }
    
    // Create particles with different energies
    const particles = particleEnergies.map(energy => 
      quantumEngine.createParticle('electron', energy, { x: -5, y: 0, z: 0 })
    );
    
    return {
      barriers: barriers,
      particles: particles,
      parameters: parameters,
      status: 'ready'
    };
  }

  // Experiment Execution Methods
  runBellTest(experiment) {
    const { particles, apparatus } = experiment;
    const results = [];
    
    // Run measurements on entangled pairs
    for (let i = 0; i < particles.length; i += 2) {
      const particle1 = particles[i];
      const particle2 = particles[i + 1];
      
      // Measure in random bases
      const basis1 = apparatus.bases[Math.floor(Math.random() * apparatus.bases.length)];
      const basis2 = apparatus.bases[Math.floor(Math.random() * apparatus.bases.length)];
      
      const measurement1 = this.performMeasurement(particle1, basis1);
      const measurement2 = this.performMeasurement(particle2, basis2);
      
      // Calculate correlation
      const correlation = this.calculateCorrelation(measurement1, measurement2, basis1, basis2);
      
      results.push({
        pair: [particle1.id, particle2.id],
        measurements: [measurement1, measurement2],
        correlation: correlation,
        bases: [basis1, basis2]
      });
    }
    
    return {
      results: results,
      totalCorrelation: results.reduce((sum, r) => sum + r.correlation, 0) / results.length,
      violationDetected: Math.abs(results.reduce((sum, r) => sum + r.correlation, 0) / results.length) > apparatus.correlationThreshold
    };
  }

  runTunnelingSpectroscopy(experiment) {
    const { barriers, particles } = experiment;
    const results = [];
    
    // Test each particle against each barrier
    particles.forEach(particle => {
      barriers.forEach(barrier => {
        const probability = quantumEngine.calculateTunnelingProbability(
          barrier.height, barrier.width, particle.energy, particle.mass
        );
        
        const tunneled = Math.random() < probability;
        
        results.push({
          particleId: particle.id,
          barrierHeight: barrier.height,
          barrierWidth: barrier.width,
          particleEnergy: particle.energy,
          tunnelingProbability: probability,
          tunneled: tunneled
        });
      });
    });
    
    return {
      results: results,
      averageProbability: results.reduce((sum, r) => sum + r.tunnelingProbability, 0) / results.length,
      totalTunneled: results.filter(r => r.tunneled).length
    };
  }

  // Analysis Methods
  analyzeBellTest(data) {
    const correlations = data.results.map(r => r.correlation);
    const statisticalAnalysis = this.analysisEngines.get('statistical').analyze(correlations);
    
    // Check for Bell inequality violation
    const bellViolation = Math.abs(statisticalAnalysis.mean) > 2;
    
    return {
      statistical: statisticalAnalysis,
      bellViolation: bellViolation,
      quantumNonLocality: bellViolation,
      confidence: this.calculateConfidence(data.results.length, statisticalAnalysis.standardDeviation),
      interpretation: bellViolation ? 
        'Strong evidence for quantum non-locality' : 
        'Results consistent with local hidden variable theories'
    };
  }

  analyzeTunnelingSpectroscopy(data) {
    const probabilities = data.results.map(r => r.tunnelingProbability);
    const statisticalAnalysis = this.analysisEngines.get('statistical').analyze(probabilities);
    
    // Analyze tunneling behavior
    const tunnelingBehavior = this.analyzeTunnelingBehavior(data.results);
    
    return {
      statistical: statisticalAnalysis,
      tunnelingBehavior: tunnelingBehavior,
      barrierEffectiveness: this.calculateBarrierEffectiveness(data.results),
      energyDependence: this.analyzeEnergyDependence(data.results),
      interpretation: 'Analysis of quantum tunneling probability vs barrier properties'
    };
  }

  // Utility Methods
  generateMeasurementBases(count) {
    const bases = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI) / count;
      bases.push({
        name: `Basis_${i}`,
        angle: angle,
        vector: { x: Math.cos(angle), y: Math.sin(angle), z: 0 }
      });
    }
    return bases;
  }

  performMeasurement(particle, basis) {
    // Simulate quantum measurement
    const random = Math.random();
    const result = random > 0.5 ? 'up' : 'down';
    
    // Collapse particle state
    particle.quantumState = 'collapsed';
    
    return {
      result: result,
      basis: basis,
      uncertainty: Math.random() * 0.1,
      timestamp: Date.now()
    };
  }

  calculateCorrelation(measurement1, measurement2, basis1, basis2) {
    // Calculate correlation between measurements
    const angleDiff = Math.abs(basis1.angle - basis2.angle);
    const expectedCorrelation = Math.cos(2 * angleDiff);
    
    const actualCorrelation = (measurement1.result === measurement2.result ? 1 : -1);
    
    return actualCorrelation * expectedCorrelation;
  }

  calculatePositionVariance(dataPoints) {
    // Calculate spatial variance of particles
    const allPositions = dataPoints.flatMap(dp => dp.positions);
    const centerX = allPositions.reduce((sum, p) => sum + p.x, 0) / allPositions.length;
    const centerY = allPositions.reduce((sum, p) => sum + p.y, 0) / allPositions.length;
    const centerZ = allPositions.reduce((sum, p) => sum + p.z, 0) / allPositions.length;
    
    return {
      center: { x: centerX, y: centerY, z: centerZ },
      variance: allPositions.reduce((sum, p) => 
        sum + Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2) + Math.pow(p.z - centerZ, 2), 0
      ) / allPositions.length
    };
  }

  calculateVelocityDistribution(dataPoints) {
    const allVelocities = dataPoints.flatMap(dp => dp.velocities);
    const speeds = allVelocities.map(v => Math.sqrt(v.x**2 + v.y**2 + v.z**2));
    
    return {
      averageSpeed: speeds.reduce((sum, s) => sum + s, 0) / speeds.length,
      maxSpeed: Math.max(...speeds),
      minSpeed: Math.min(...speeds),
      distribution: this.createHistogram(speeds, 10)
    };
  }

  createHistogram(data, bins) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binSize = (max - min) / bins;
    
    const histogram = new Array(bins).fill(0);
    data.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binSize), bins - 1);
      histogram[binIndex]++;
    });
    
    return {
      histogram: histogram,
      binEdges: Array.from({length: bins + 1}, (_, i) => min + i * binSize)
    };
  }

  calculateConfidence(sampleSize, standardDeviation) {
    // Calculate confidence interval (95%)
    const standardError = standardDeviation / Math.sqrt(sampleSize);
    const confidenceInterval = 1.96 * standardError; // 95% confidence
    
    return {
      lower: -confidenceInterval,
      upper: confidenceInterval,
      level: 0.95,
      standardError: standardError
    };
  }

  // Public API
  createExperiment(type, parameters) {
    const template = this.experimentTemplates.get(type);
    if (!template) {
      throw new Error(`Unknown experiment type: ${type}`);
    }
    
    const experimentId = `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const experiment = {
      id: experimentId,
      type: type,
      template: template,
      parameters: parameters,
      setup: template.setup(parameters),
      status: 'created',
      createdAt: Date.now(),
      results: null,
      analysis: null
    };
    
    this.experiments.set(experimentId, experiment);
    return experiment;
  }

  runExperiment(experimentId) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) {
      throw new Error(`Experiment not found: ${experimentId}`);
    }
    
    experiment.status = 'running';
    experiment.results = experiment.template.run(experiment.setup);
    experiment.status = 'completed';
    experiment.completedAt = Date.now();
    
    return experiment;
  }

  analyzeExperiment(experimentId) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment || !experiment.results) {
      throw new Error(`Cannot analyze experiment: ${experimentId}`);
    }
    
    experiment.analysis = experiment.template.analyze(experiment.results);
    return experiment.analysis;
  }

  getExperiment(experimentId) {
    return this.experiments.get(experimentId);
  }

  getAllExperiments() {
    return Array.from(this.experiments.values());
  }

  deleteExperiment(experimentId) {
    return this.experiments.delete(experimentId);
  }
}

// Initialize the advanced experiment framework
const experimentFramework = new AdvancedExperimentFramework();

// Enhanced API routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/simulation', (req, res) => {
  res.json(simulationState);
});

app.post('/api/chaos', (req, res) => {
  const { level } = req.body;
  if (level >= 0 && level <= 1) {
    simulationState.chaosLevel = level;
    res.json({ success: true, chaosLevel: simulationState.chaosLevel });
  } else {
    res.status(400).json({ error: 'Chaos level must be between 0 and 1' });
  }
});

app.post('/api/dimension', (req, res) => {
  const { dimension } = req.body;
  if (dimension >= 2 && dimension <= 4) {
    simulationState.dimension = dimension;
    res.json({ success: true, dimension: simulationState.dimension });
  } else {
    res.status(400).json({ error: 'Dimension must be between 2 and 4' });
  }
});

app.post('/api/simulation-mode', (req, res) => {
  const { mode } = req.body;
  if (['quantum', 'classical', 'relativistic'].includes(mode)) {
    simulationState.simulationMode = mode;
    res.json({ success: true, mode: simulationState.simulationMode });
  } else {
    res.status(400).json({ error: 'Invalid simulation mode' });
  }
});

app.post('/api/particle-types', (req, res) => {
  const { types } = req.body;
  if (Array.isArray(types) && types.every(t => simulationState.particleTypes.includes(t))) {
    simulationState.activeTypes = types;
    generateParticles(); // Regenerate with new types
    res.json({ success: true, activeTypes: simulationState.activeTypes });
  } else {
    res.status(400).json({ error: 'Invalid particle types' });
  }
});

app.post('/api/temperature', (req, res) => {
  const { temperature } = req.body;
  if (temperature >= 0 && temperature <= 1000) {
    simulationState.temperature = temperature;
    res.json({ success: true, temperature: simulationState.temperature });
  } else {
    res.status(400).json({ error: 'Temperature must be between 0 and 1000K' });
  }
});

app.post('/api/pressure', (req, res) => {
  const { pressure } = req.body;
  if (pressure >= 0 && pressure <= 10) {
    simulationState.pressure = pressure;
    res.json({ success: true, pressure: simulationState.pressure });
  } else {
    res.status(400).json({ error: 'Pressure must be between 0 and 10 atm' });
  }
});

app.post('/api/experiment', (req, res) => {
  const { experiment, action } = req.body;
  if (simulationState.experiments[experiment]) {
    if (action === 'start') {
      simulationState.experiments[experiment].active = true;
    } else if (action === 'stop') {
      simulationState.experiments[experiment].active = false;
    }
    res.json({ success: true, experiment, active: simulationState.experiments[experiment].active });
  } else {
    res.status(400).json({ error: 'Invalid experiment' });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New quantum observer connected:', socket.id);
  
  // Send current simulation state
  socket.emit('simulationUpdate', simulationState);
  
  socket.on('disconnect', () => {
    console.log('Quantum observer disconnected:', socket.id);
  });
  
  socket.on('resetSimulation', () => {
    generateParticles();
    socket.emit('simulationUpdate', simulationState);
  });
  
  socket.on('toggleParticleType', (type) => {
    if (simulationState.activeTypes.includes(type)) {
      simulationState.activeTypes = simulationState.activeTypes.filter(t => t !== type);
    } else {
      simulationState.activeTypes.push(type);
    }
    generateParticles();
    socket.emit('simulationUpdate', simulationState);
  });
  
  socket.on('startExperiment', (experiment) => {
    if (simulationState.experiments[experiment]) {
      simulationState.experiments[experiment].active = true;
      socket.emit('simulationUpdate', simulationState);
    }
  });
  
  socket.on('stopExperiment', (experiment) => {
    if (simulationState.experiments[experiment]) {
      simulationState.experiments[experiment].active = false;
      socket.emit('simulationUpdate', simulationState);
    }
  });
});

// Initialize particles
generateParticles();

// Start simulation loop
setInterval(updateSimulation, 16); // ~60 FPS

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Advanced Quantum Chaos Simulator running on port ${PORT}`);
  console.log(`🌌 Chaos Level: ${simulationState.chaosLevel}`);
  console.log(`🔮 Dimensions: ${simulationState.dimension}D`);
  console.log(`⚛️  Particles: ${simulationState.particles.length}`);
  console.log(`🔬 Simulation Mode: ${simulationState.simulationMode}`);
  console.log(`🌊 Active Particle Types: ${simulationState.activeTypes.join(', ')}`);
  console.log(`⚡ Quantum Fields: ${Object.keys(simulationState.fields).join(', ')}`);
  console.log(`🌡️  Temperature: ${simulationState.temperature}K`);
  console.log(`💨 Pressure: ${simulationState.pressure}atm`);
  console.log(`🧪 Experiments: ${Object.keys(simulationState.experiments).join(', ')}`);
  console.log(`🔴 Strong Force: ${simulationState.fields.strong.strength}`);
  console.log(`🟡 Weak Force: ${simulationState.fields.weak.strength}`);
  console.log(`🕸️  Spin Networks: ${simulationState.spinNetworks.length}`);
  console.log(`⚛️  Quantum Gates: ${simulationState.quantumGates.length}`);
  console.log(`🌌 Spacetime Curvature: (${simulationState.spacetimeCurvature.x.toFixed(3)}, ${simulationState.spacetimeCurvature.y.toFixed(3)}, ${simulationState.spacetimeCurvature.z.toFixed(3)})`);
  console.log(`🚀 ALL ADVANCED FEATURES LOADED AND READY! 🌌⚛️🔬🧪`);
});
