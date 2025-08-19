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
    quantum: { entanglement: 0.3, superposition: 0.7 }
  },
  time: 0,
  chaosLevel: 0.5,
  dimension: 3,
  temperature: 300, // Kelvin
  pressure: 1.0, // atm
  magneticField: { x: 0, y: 0, z: 1 },
  particleTypes: ['electron', 'photon', 'quark', 'neutrino', 'gluon'],
  activeTypes: ['electron', 'photon'],
  simulationMode: 'quantum', // quantum, classical, relativistic
  entanglementGroups: [],
  waveFunction: { amplitude: 1.0, phase: 0, collapse: false }
};

// Advanced particle generation with multiple types
function generateParticles() {
  simulationState.particles = [];
  simulationState.entanglementGroups = [];
  
  const particleCounts = {
    electron: 40,
    photon: 30,
    quark: 20,
    neutrino: 10
  };
  
  let particleId = 0;
  
  Object.entries(particleCounts).forEach(([type, count]) => {
    for (let i = 0; i < count; i++) {
      const particle = createParticle(type, particleId++);
      simulationState.particles.push(particle);
    }
  });
  
  // Create entanglement groups
  createEntanglementGroups();
}

function createParticle(type, id) {
  const baseProperties = {
    electron: { mass: 9.1093837015e-31, charge: -1.602176634e-19, spin: 0.5 },
    photon: { mass: 0, charge: 0, spin: 1 },
    quark: { mass: 3.0e-30, charge: 0.333e-19, spin: 0.5 },
    neutrino: { mass: 2.2e-36, charge: 0, spin: 0.5 }
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
      superposition: Math.random() > 0.5
    },
    energy: Math.random() * 100,
    mass: props.mass,
    charge: props.charge,
    spin: props.spin,
    entangledWith: null,
    waveFunction: {
      real: Math.random() * 2 - 1,
      imaginary: Math.random() * 2 - 1
    },
    lifetime: Math.random() * 1000,
    decayProducts: [],
    interactionHistory: []
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
  });
  
  // Handle particle decay and creation
  handleParticleDecay();
  
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
}

function updateParticlePhysics(particle) {
  const chaos = simulationState.chaosLevel;
  const time = simulationState.time;
  const fields = simulationState.fields;
  
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
});
