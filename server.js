const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

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

// Quantum simulation state
let simulationState = {
  particles: [],
  time: 0,
  chaosLevel: 0.5,
  quantumEntanglement: false,
  dimension: 3
};

// Generate initial quantum particles
function generateParticles() {
  simulationState.particles = [];
  for (let i = 0; i < 100; i++) {
    simulationState.particles.push({
      id: i,
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
      quantumState: Math.random() * Math.PI * 2,
      energy: Math.random() * 100,
      entangledWith: null
    });
  }
}

// Quantum chaos simulation update
function updateSimulation() {
  simulationState.time += 0.016; // 60 FPS
  
  simulationState.particles.forEach(particle => {
    // Apply quantum chaos equations
    const chaos = simulationState.chaosLevel;
    const time = simulationState.time;
    
    // Quantum tunneling effect
    if (Math.random() < 0.001 * chaos) {
      particle.position.x += (Math.random() - 0.5) * 10;
      particle.position.y += (Math.random() - 0.5) * 10;
      particle.position.z += (Math.random() - 0.5) * 10;
    }
    
    // Chaotic velocity changes
    particle.velocity.x += Math.sin(time * chaos) * 0.1;
    particle.velocity.y += Math.cos(time * chaos) * 0.1;
    particle.velocity.z += Math.sin(time * chaos * 0.5) * 0.1;
    
    // Update position
    particle.position.x += particle.velocity.x * 0.016;
    particle.position.y += particle.velocity.y * 0.016;
    particle.position.z += particle.velocity.z * 0.016;
    
    // Boundary wrapping
    particle.position.x = ((particle.position.x + 10) % 20) - 10;
    particle.position.y = ((particle.position.y + 10) % 20) - 10;
    particle.position.z = ((particle.position.z + 10) % 20) - 10;
    
    // Update quantum state
    particle.quantumState += 0.1 * chaos;
    particle.energy = Math.abs(Math.sin(particle.quantumState)) * 100;
  });
  
  // Emit updated state to all clients
  io.emit('simulationUpdate', simulationState);
}

// Routes
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
});

// Initialize particles
generateParticles();

// Start simulation loop
setInterval(updateSimulation, 16); // ~60 FPS

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Quantum Chaos Simulator running on port ${PORT}`);
  console.log(`🌌 Chaos Level: ${simulationState.chaosLevel}`);
  console.log(`🔮 Dimensions: ${simulationState.dimension}D`);
  console.log(`⚛️  Particles: ${simulationState.particles.length}`);
});
