// 🌌 Advanced Quantum Chaos Simulator - Enhanced Visualization System 🔮

// Global variables
let scene, camera, renderer, controls;
let particles = [];
let fields = [];
let geometricShapes = [];
let particleTrails = [];
let audioContext, audioEnabled = false;
let stats;
let gui;
let clock = new THREE.Clock();

// Advanced rendering settings
const renderSettings = {
  shadows: true,
  antiAliasing: true,
  postProcessing: true,
  bloom: true,
  motionBlur: true,
  depthOfField: true,
  ambientOcclusion: true,
  screenSpaceReflections: true
};

// Particle system settings
const particleSettings = {
  maxParticles: 1000,
  trailLength: 50,
  particleSize: 0.1,
  glowIntensity: 2.0,
  colorScheme: 'quantum', // quantum, rainbow, energy, chaos
  animationSpeed: 1.0
};

// Field visualization settings
const fieldSettings = {
  fieldLines: 100,
  fieldStrength: 1.0,
  fieldAnimation: true,
  fieldColors: true,
  fieldOpacity: 0.6
};

// Initialize the advanced visualization system
function initAdvancedVisualization() {
  // Create scene with advanced settings
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 50, 200);
  
  // Advanced camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 10);
  
  // Advanced renderer with post-processing
  renderer = new THREE.WebGLRenderer({ 
    antialias: renderSettings.antiAliasing,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = renderSettings.shadows;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  
  document.getElementById('canvas').appendChild(renderer.domElement);
  
  // Advanced lighting system
  setupAdvancedLighting();
  
  // Advanced controls
  setupAdvancedControls();
  
  // Initialize particle system
  initAdvancedParticleSystem();
  
  // Initialize field visualization
  initAdvancedFieldVisualization();
  
  // Initialize geometric shapes
  initAdvancedGeometricShapes();
  
  // Initialize post-processing effects
  if (renderSettings.postProcessing) {
    initPostProcessing();
  }
  
  // Initialize audio system
  initAdvancedAudioSystem();
  
  // Initialize GUI controls
  initAdvancedGUI();
  
  // Start animation loop
  animate();
}

// Advanced lighting system with multiple light sources
function setupAdvancedLighting() {
  // Ambient lighting with color temperature
  const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
  ambientLight.color.setHSL(0.6, 0.8, 0.3);
  scene.add(ambientLight);
  
  // Main directional light with shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;
  scene.add(directionalLight);
  
  // Multiple point lights for dynamic effects
  const pointLight1 = new THREE.PointLight(0x00ff88, 2, 20);
  pointLight1.position.set(5, 5, 5);
  pointLight1.castShadow = true;
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0xff0088, 1.5, 15);
  pointLight2.position.set(-5, 3, -5);
  pointLight2.castShadow = true;
  scene.add(pointLight2);
  
  // Spot light for dramatic effects
  const spotLight = new THREE.SpotLight(0x0088ff, 1, 30, Math.PI / 6, 0.5);
  spotLight.position.set(0, 10, 0);
  spotLight.target.position.set(0, 0, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);
  scene.add(spotLight.target);
  
  // Store lights for animation
  window.lights = { directional: directionalLight, point1: pointLight1, point2: pointLight2, spot: spotLight };
}

// Advanced controls with smooth movement
function setupAdvancedControls() {
  // Orbit controls with smooth damping
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 2;
  controls.maxDistance = 50;
  controls.maxPolarAngle = Math.PI;
  
  // Auto-rotation for dynamic viewing
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
}

// Advanced particle system with multiple particle types
function initAdvancedParticleSystem() {
  const particleGeometry = new THREE.SphereGeometry(particleSettings.particleSize, 8, 6);
  
  // Create particle materials for different types
  const particleMaterials = {
    electron: new THREE.MeshPhongMaterial({ 
      color: 0x00ff88, 
      emissive: 0x00ff88, 
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.8
    }),
    photon: new THREE.MeshPhongMaterial({ 
      color: 0xffff00, 
      emissive: 0xffff00, 
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.9
    }),
    quark: new THREE.MeshPhongMaterial({ 
      color: 0xff0088, 
      emissive: 0xff0088, 
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.8
    }),
    neutrino: new THREE.MeshPhongMaterial({ 
      color: 0x0088ff, 
      emissive: 0x0088ff, 
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.6
    })
  };
  
  // Create initial particles
  for (let i = 0; i < 100; i++) {
    const particleType = Object.keys(particleMaterials)[Math.floor(Math.random() * Object.keys(particleMaterials).length)];
    const material = particleMaterials[particleType];
    
    const particle = new THREE.Mesh(particleGeometry, material.clone());
    particle.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );
    particle.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    particle.type = particleType;
    particle.energy = Math.random() * 100;
    particle.entangled = false;
    particle.trail = [];
    
    particles.push(particle);
    scene.add(particle);
  }
}

// Advanced field visualization with dynamic field lines
function initAdvancedFieldVisualization() {
  // Electromagnetic field lines
  const emFieldGeometry = new THREE.BufferGeometry();
  const emFieldPositions = [];
  const emFieldColors = [];
  
  for (let i = 0; i < fieldSettings.fieldLines; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    
    // Create field line segments
    for (let j = 0; j < 10; j++) {
      const t = j / 10;
      const fieldX = x + Math.sin(t * Math.PI * 2) * 2;
      const fieldY = y + Math.cos(t * Math.PI * 2) * 2;
      const fieldZ = z + t * 4 - 2;
      
      emFieldPositions.push(fieldX, fieldY, fieldZ);
      
      // Color based on field strength
      const strength = Math.sin(t * Math.PI * 2 + Date.now() * 0.001);
      const color = new THREE.Color();
      color.setHSL(0.6 + strength * 0.2, 0.8, 0.5 + strength * 0.3);
      emFieldColors.push(color.r, color.g, color.b);
    }
  }
  
  emFieldGeometry.setAttribute('position', new THREE.Float32BufferAttribute(emFieldPositions, 3));
  emFieldGeometry.setAttribute('color', new THREE.Float32BufferAttribute(emFieldColors, 3));
  
  const emFieldMaterial = new THREE.LineBasicMaterial({ 
    vertexColors: true,
    transparent: true,
    opacity: fieldSettings.fieldOpacity
  });
  
  const emFieldLines = new THREE.LineSegments(emFieldGeometry, emFieldMaterial);
  fields.push(emFieldLines);
  scene.add(emFieldLines);
  
  // Gravitational field visualization
  const gravFieldGeometry = new THREE.SphereGeometry(15, 32, 16);
  const gravFieldMaterial = new THREE.MeshBasicMaterial({
    color: 0x8800ff,
    transparent: true,
    opacity: 0.1,
    wireframe: true
  });
  
  const gravField = new THREE.Mesh(gravFieldGeometry, gravFieldMaterial);
  fields.push(gravField);
  scene.add(gravField);
}

// Advanced geometric shapes with complex animations
function initAdvancedGeometricShapes() {
  // Tetrahedron
  const tetrahedronGeometry = new THREE.TetrahedronGeometry(2, 0);
  const tetrahedronMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0088,
    transparent: true,
    opacity: 0.7,
    wireframe: true
  });
  const tetrahedron = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
  tetrahedron.position.set(8, 8, 8);
  geometricShapes.push(tetrahedron);
  scene.add(tetrahedron);
  
  // Octahedron
  const octahedronGeometry = new THREE.OctahedronGeometry(1.5, 0);
  const octahedronMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.7,
    wireframe: true
  });
  const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
  octahedron.position.set(-8, 6, -8);
  geometricShapes.push(octahedron);
  scene.add(octahedron);
  
  // Icosahedron
  const icosahedronGeometry = new THREE.IcosahedronGeometry(2, 0);
  const icosahedronMaterial = new THREE.MeshPhongMaterial({
    color: 0x0088ff,
    transparent: true,
    opacity: 0.7,
    wireframe: true
  });
  const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
  icosahedron.position.set(0, -8, 0);
  geometricShapes.push(icosahedron);
  scene.add(icosahedron);
  
  // Dodecahedron
  const dodecahedronGeometry = new THREE.DodecahedronGeometry(1.8, 0);
  const dodecahedronMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.7,
    wireframe: true
  });
  const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
  dodecahedron.position.set(-6, -6, 6);
  geometricShapes.push(dodecahedron);
  scene.add(dodecahedron);
  
  // Torus knot
  const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const torusKnotMaterial = new THREE.MeshPhongMaterial({
    color: 0xff8800,
    transparent: true,
    opacity: 0.6,
    wireframe: true
  });
  const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
  torusKnot.position.set(6, -6, -6);
  geometricShapes.push(torusKnot);
  scene.add(torusKnot);
}

// Post-processing effects for enhanced visual quality
function initPostProcessing() {
  // Bloom effect
  const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, 0.4, 0.85
  );
  
  // Motion blur
  const motionBlurPass = new THREE.ShaderPass(THREE.MotionBlurShader);
  motionBlurPass.uniforms.velocityFactor.value = 0.5;
  
  // Depth of field
  const depthOfFieldPass = new THREE.ShaderPass(THREE.DepthOfFieldShader);
  depthOfFieldPass.uniforms.focusDistance.value = 0.5;
  depthOfFieldPass.uniforms.focalLength.value = 0.024;
  depthOfFieldPass.uniforms.bokehScale.value = 2.0;
  
  // Store post-processing passes
  window.postProcessingPasses = [bloomPass, motionBlurPass, depthOfFieldPass];
}

// Advanced audio system with Web Audio API
function initAdvancedAudioSystem() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create audio nodes
    const masterGain = audioContext.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(audioContext.destination);
    
    // Create oscillators for different particle types
    const particleOscillators = {};
    const particleTypes = ['electron', 'photon', 'quark', 'neutrino'];
    
    particleTypes.forEach(type => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(masterGain);
      
      particleOscillators[type] = { oscillator, gainNode };
    });
    
    window.audioSystem = { context: audioContext, masterGain, particleOscillators };
    
  } catch (error) {
    console.log('Web Audio API not supported');
  }
}

// Advanced GUI with dat.GUI
function initAdvancedGUI() {
  gui = new dat.GUI();
  
  // Rendering settings
  const renderFolder = gui.addFolder('Rendering');
  renderFolder.add(renderSettings, 'shadows').onChange(value => {
    renderer.shadowMap.enabled = value;
  });
  renderFolder.add(renderSettings, 'antiAliasing').onChange(value => {
    renderer.antialias = value;
  });
  renderFolder.add(renderSettings, 'postProcessing').onChange(value => {
    if (value) {
      initPostProcessing();
    }
  });
  
  // Particle settings
  const particleFolder = gui.addFolder('Particles');
  particleFolder.add(particleSettings, 'maxParticles', 100, 2000).onChange(value => {
    updateParticleCount(value);
  });
  particleFolder.add(particleSettings, 'trailLength', 10, 100);
  particleFolder.add(particleSettings, 'particleSize', 0.05, 0.5);
  particleFolder.add(particleSettings, 'glowIntensity', 0.5, 5.0);
  particleFolder.add(particleSettings, 'colorScheme', ['quantum', 'rainbow', 'energy', 'chaos']);
  particleFolder.add(particleSettings, 'animationSpeed', 0.1, 3.0);
  
  // Field settings
  const fieldFolder = gui.addFolder('Fields');
  fieldFolder.add(fieldSettings, 'fieldLines', 50, 200);
  fieldFolder.add(fieldSettings, 'fieldStrength', 0.1, 3.0);
  fieldFolder.add(fieldSettings, 'fieldAnimation');
  fieldFolder.add(fieldSettings, 'fieldColors');
  fieldFolder.add(fieldSettings, 'fieldOpacity', 0.1, 1.0);
  
  // Audio settings
  const audioFolder = gui.addFolder('Audio');
  audioFolder.add({ enabled: audioEnabled }, 'enabled').onChange(value => {
    toggleAudio(value);
  });
  
  gui.open();
}

// Update particle count dynamically
function updateParticleCount(count) {
  while (particles.length < count) {
    addRandomParticle();
  }
  while (particles.length > count) {
    const particle = particles.pop();
    scene.remove(particle);
  }
}

// Add random particle
function addRandomParticle() {
  const particleTypes = ['electron', 'photon', 'quark', 'neutrino'];
  const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
  
  const geometry = new THREE.SphereGeometry(particleSettings.particleSize, 8, 6);
  const material = new THREE.MeshPhongMaterial({
    color: getParticleColor(type),
    emissive: getParticleColor(type),
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.8
  });
  
  const particle = new THREE.Mesh(geometry, material);
  particle.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20
  );
  particle.velocity = new THREE.Vector3(
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2
  );
  particle.type = type;
  particle.energy = Math.random() * 100;
  particle.entangled = false;
  particle.trail = [];
  
  particles.push(particle);
  scene.add(particle);
}

// Get particle color based on type and color scheme
function getParticleColor(type) {
  const colors = {
    electron: 0x00ff88,
    photon: 0xffff00,
    quark: 0xff0088,
    neutrino: 0x0088ff
  };
  
  const baseColor = colors[type] || 0xffffff;
  
  switch (particleSettings.colorScheme) {
    case 'rainbow':
      return new THREE.Color().setHSL(Math.random(), 0.8, 0.5);
    case 'energy':
      return new THREE.Color().setHSL(0.6, 0.8, 0.5);
    case 'chaos':
      return new THREE.Color().setHSL(Math.random() * 0.3, 0.9, 0.6);
    default:
      return new THREE.Color(baseColor);
  }
}

// Toggle audio system
function toggleAudio(enabled) {
  audioEnabled = enabled;
  if (window.audioSystem && window.audioSystem.context) {
    if (enabled && window.audioSystem.context.state === 'suspended') {
      window.audioSystem.context.resume();
    }
  }
}

// Main animation loop
function animate() {
  requestAnimationFrame(animate);
  
  const deltaTime = clock.getDelta() * particleSettings.animationSpeed;
  
  // Update particles
  updateParticles(deltaTime);
  
  // Update fields
  updateFields(deltaTime);
  
  // Update geometric shapes
  updateGeometricShapes(deltaTime);
  
  // Update lights
  updateLights(deltaTime);
  
  // Update controls
  controls.update();
  
  // Render scene
  renderer.render(scene, camera);
  
  // Update stats
  if (stats) stats.update();
}

// Update particles with advanced physics
function updateParticles(deltaTime) {
  particles.forEach(particle => {
    // Update position
    particle.position.add(particle.velocity.clone().multiplyScalar(deltaTime));
    
    // Boundary checking with bounce
    const bounds = 10;
    ['x', 'y', 'z'].forEach(axis => {
      if (Math.abs(particle.position[axis]) > bounds) {
        particle.position[axis] = Math.sign(particle.position[axis]) * bounds;
        particle.velocity[axis] *= -0.8; // Bounce with energy loss
      }
    });
    
    // Update trail
    if (particle.trail.length > particleSettings.trailLength) {
      particle.trail.shift();
    }
    particle.trail.push(particle.position.clone());
    
    // Update material properties
    const time = Date.now() * 0.001;
    particle.material.emissiveIntensity = 0.3 + 0.2 * Math.sin(time * 2 + particle.position.x);
    
    // Rotate particle
    particle.rotation.x += deltaTime * 2;
    particle.rotation.y += deltaTime * 1.5;
    
    // Update particle size based on energy
    const scale = 0.5 + (particle.energy / 100) * 0.5;
    particle.scale.setScalar(scale);
  });
}

// Update fields with dynamic animations
function updateFields(deltaTime) {
  fields.forEach((field, index) => {
    if (fieldSettings.fieldAnimation) {
      field.rotation.y += deltaTime * 0.5;
      field.rotation.x += deltaTime * 0.3;
    }
    
    // Update field colors
    if (fieldSettings.fieldColors && field.material.vertexColors) {
      const colors = field.geometry.attributes.color.array;
      const time = Date.now() * 0.001;
      
      for (let i = 0; i < colors.length; i += 3) {
        const hue = (0.6 + Math.sin(time + i * 0.1) * 0.2) % 1;
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }
      
      field.geometry.attributes.color.needsUpdate = true;
    }
  });
}

// Update geometric shapes with complex animations
function updateGeometricShapes(deltaTime) {
  geometricShapes.forEach((shape, index) => {
    const time = Date.now() * 0.001;
    
    // Individual rotation patterns
    shape.rotation.x += deltaTime * (1 + index * 0.5);
    shape.rotation.y += deltaTime * (0.8 + index * 0.3);
    shape.rotation.z += deltaTime * (1.2 + index * 0.4);
    
    // Orbital motion
    const radius = 8 + index * 2;
    const speed = 0.5 + index * 0.2;
    shape.position.x = Math.cos(time * speed) * radius;
    shape.position.z = Math.sin(time * speed) * radius;
    
    // Scale animation
    const scale = 1 + 0.2 * Math.sin(time * 2 + index);
    shape.scale.setScalar(scale);
    
    // Material animation
    if (shape.material.opacity !== undefined) {
      shape.material.opacity = 0.5 + 0.3 * Math.sin(time * 1.5 + index);
    }
  });
}

// Update lights with dynamic movement
function updateLights(deltaTime) {
  if (window.lights) {
    const time = Date.now() * 0.001;
    
    // Animate point lights
    window.lights.point1.position.x = 5 + 3 * Math.sin(time);
    window.lights.point1.position.y = 5 + 2 * Math.cos(time * 0.7);
    
    window.lights.point2.position.x = -5 + 2 * Math.sin(time * 0.8);
    window.lights.point2.position.z = -5 + 3 * Math.cos(time * 1.2);
    
    // Animate spot light
    window.lights.spot.target.position.x = 3 * Math.sin(time * 0.5);
    window.lights.spot.target.position.z = 3 * Math.cos(time * 0.5);
    
    // Animate light colors
    window.lights.point1.color.setHSL((time * 0.1) % 1, 0.8, 0.5);
    window.lights.point2.color.setHSL((time * 0.15 + 0.3) % 1, 0.8, 0.5);
  }
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize the system
document.addEventListener('DOMContentLoaded', () => {
  initAdvancedVisualization();
});

// Export functions for external use
window.quantumVisualization = {
  initAdvancedVisualization,
  updateParticleCount,
  toggleAudio,
  getParticleColor,
  addRandomParticle
};
