// Advanced Quantum Chaos Simulator - Frontend Application
class AdvancedQuantumChaosSimulator {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.simulationData = null;
        this.socket = null;
        this.animationId = null;
        this.entanglementMode = false;
        this.audioEnabled = false;
        this.audioContext = null;
        this.oscillators = [];
        this.particleMeshes = new Map();
        this.fieldVisualizations = [];
        this.entanglementLines = [];
        this.waveFunctionVisualizer = null;
        this.stats = null;
        this.particleTrails = [];
        this.trailsEnabled = false;
        this.quantumStateVisible = true;
        this.experiments = {};
        
        this.init();
    }

    init() {
        this.setupSocket();
        this.setupThreeJS();
        this.setupAdvancedControls();
        this.setupAudio();
        this.setupStats();
        this.hideLoading();
        this.animate();
    }

    setupSocket() {
        this.socket = io();
        
        this.socket.on('simulationUpdate', (data) => {
            this.simulationData = data;
            this.updateStats();
            this.updateParticles();
            this.updateFieldVisualizations();
            this.updateEntanglementLines();
            this.updateWaveFunction();
            this.updateParticleTrails();
            this.updateExperiments();
        });
    }

    setupThreeJS() {
        const canvas = document.getElementById('canvas');
        
        // Scene setup with advanced effects
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000, 1, 100);
        
        // Advanced camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 50);
        
        // Advanced renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Advanced lighting system
        this.setupAdvancedLighting();
        
        // Add advanced psychedelic effects
        this.addAdvancedPsychedelicEffects();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupAdvancedLighting() {
        // Ambient lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0x00ff88, 1);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Point lights for dynamic effects
        for (let i = 0; i < 3; i++) {
            const pointLight = new THREE.PointLight(0x00ffff, 0.5, 50);
            pointLight.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            );
            this.scene.add(pointLight);
        }
        
        // Spot light for dramatic effect
        const spotLight = new THREE.SpotLight(0xff00ff, 0.8, 100, Math.PI / 6, 0.5);
        spotLight.position.set(0, 30, 0);
        spotLight.target.position.set(0, 0, 0);
        this.scene.add(spotLight);
        this.scene.add(spotLight.target);
    }

    addAdvancedPsychedelicEffects() {
        // Advanced grid system
        const gridHelper = new THREE.GridHelper(20, 20, 0x00ff88, 0x00cc66);
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
        
        // Add floating geometric shapes with advanced materials
        this.addAdvancedFloatingShapes();
        
        // Add quantum field visualizations
        this.addQuantumFieldVisualizations();
        
        // Add wave function visualizer
        this.addWaveFunctionVisualizer();
    }

    addAdvancedFloatingShapes() {
        const shapes = [];
        const geometries = [
            new THREE.TetrahedronGeometry(2),
            new THREE.OctahedronGeometry(1.5),
            new THREE.IcosahedronGeometry(1),
            new THREE.DodecahedronGeometry(1.2),
            new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
        ];
        
        for (let i = 0; i < 8; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.8, 0.5),
                transparent: true,
                opacity: 0.6,
                wireframe: true,
                emissive: new THREE.Color().setHSL(Math.random(), 0.8, 0.3),
                emissiveIntensity: 0.2
            });
            
            const shape = new THREE.Mesh(geometry, material);
            shape.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            );
            
            shape.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            this.scene.add(shape);
            shapes.push(shape);
        }
        
        // Animate shapes with complex patterns
        this.animateShapes = (time) => {
            shapes.forEach((shape, index) => {
                shape.rotation.x += 0.01 * (index + 1);
                shape.rotation.y += 0.015 * (index + 1);
                shape.rotation.z += 0.02 * (index + 1);
                
                // Complex floating motion
                shape.position.y += Math.sin(time * 0.001 + index) * 0.02;
                shape.position.x += Math.cos(time * 0.0008 + index * 0.5) * 0.01;
                shape.position.z += Math.sin(time * 0.0012 + index * 0.3) * 0.015;
                
                // Dynamic material changes
                const material = shape.material;
                material.emissiveIntensity = 0.2 + 0.1 * Math.sin(time * 0.002 + index);
                material.opacity = 0.4 + 0.2 * Math.sin(time * 0.001 + index);
            });
        };
    }

    addQuantumFieldVisualizations() {
        // Create field lines for electromagnetic field
        for (let i = 0; i < 20; i++) {
            const geometry = new THREE.BufferGeometry();
            const points = [];
            
            for (let j = 0; j < 50; j++) {
                const t = j / 49;
                const x = (Math.random() - 0.5) * 20;
                const y = (Math.random() - 0.5) * 20;
                const z = (Math.random() - 0.5) * 20;
                points.push(new THREE.Vector3(x, y, z));
            }
            
            geometry.setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.3
            });
            
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
            this.fieldVisualizations.push(line);
        }
    }

    addWaveFunctionVisualizer() {
        // Create a complex wave function visualization
        const geometry = new THREE.SphereGeometry(15, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x8000ff,
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });
        
        this.waveFunctionVisualizer = new THREE.Mesh(geometry, material);
        this.scene.add(this.waveFunctionVisualizer);
    }

    setupAdvancedControls() {
        const chaosSlider = document.getElementById('chaosSlider');
        const dimensionSlider = document.getElementById('dimensionSlider');
        const emFieldSlider = document.getElementById('emFieldSlider');
        const gravFieldSlider = document.getElementById('gravFieldSlider');
        const temperatureSlider = document.getElementById('temperatureSlider');
        const pressureSlider = document.getElementById('pressureSlider');
        
        chaosSlider.addEventListener('input', (e) => {
            const level = parseFloat(e.target.value);
            this.updateChaosLevel(level);
        });
        
        dimensionSlider.addEventListener('input', (e) => {
            const dimension = parseInt(e.target.value);
            this.updateDimension(dimension);
        });
        
        emFieldSlider.addEventListener('input', (e) => {
            const strength = parseFloat(e.target.value);
            this.updateEMField(strength);
        });
        
        gravFieldSlider.addEventListener('input', (e) => {
            const strength = parseFloat(e.target.value);
            this.updateGravField(strength);
        });
        
        temperatureSlider.addEventListener('input', (e) => {
            const temperature = parseFloat(e.target.value);
            this.updateTemperature(temperature);
        });
        
        pressureSlider.addEventListener('input', (e) => {
            const pressure = parseFloat(e.target.value);
            this.updatePressure(pressure);
        });
        
        // Setup simulation mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setSimulationMode(e.target.dataset.mode);
            });
        });
        
        // Setup particle type buttons
        document.querySelectorAll('.particle-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleParticleType(e.target.dataset.type);
            });
        });
    }

    setupAudio() {
        // Initialize audio context for particle sound effects
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            this.audioContext = new (AudioContext || webkitAudioContext)();
        }
    }

    setupStats() {
        // Performance monitoring
        this.stats = new Stats();
        this.stats.dom.style.position = 'absolute';
        this.stats.dom.style.top = '0px';
        this.stats.dom.style.left = '0px';
        document.body.appendChild(this.stats.dom);
    }

    updateChaosLevel(level) {
        fetch('/api/chaos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level })
        });
    }

    updateDimension(dimension) {
        fetch('/api/dimension', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dimension })
        });
    }

    updateEMField(strength) {
        // Update electromagnetic field visualization
        this.fieldVisualizations.forEach((line, index) => {
            const material = line.material;
            material.opacity = 0.1 + 0.2 * strength;
            material.color.setHSL(0.5 + strength * 0.1, 0.8, 0.5);
        });
    }

    updateGravField(strength) {
        // Update gravitational field effects
        if (this.waveFunctionVisualizer) {
            this.waveFunctionVisualizer.material.opacity = 0.05 + 0.1 * strength;
        }
    }

    updateTemperature(temperature) {
        fetch('/api/temperature', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ temperature })
        });
    }

    updatePressure(pressure) {
        fetch('/api/pressure', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pressure })
        });
    }

    setSimulationMode(mode) {
        fetch('/api/simulation-mode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mode })
        });
        
        // Update UI
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    }

    toggleParticleType(type) {
        this.socket.emit('toggleParticleType', type);
        
        // Update UI
        const btn = document.querySelector(`[data-type="${type}"]`);
        btn.classList.toggle('active');
    }

    updateStats() {
        if (!this.simulationData) return;
        
        document.getElementById('particleCount').textContent = this.simulationData.particles.length;
        document.getElementById('chaosLevel').textContent = this.simulationData.chaosLevel.toFixed(2);
        document.getElementById('dimension').textContent = this.simulationData.dimension + 'D';
        document.getElementById('time').textContent = this.simulationData.time.toFixed(2);
        document.getElementById('simulationMode').textContent = this.simulationData.simulationMode;
        document.getElementById('emField').textContent = this.simulationData.fields.electromagnetic.strength.toFixed(1);
        document.getElementById('gravField').textContent = this.simulationData.fields.gravitational.strength.toFixed(2);
        document.getElementById('quantumField').textContent = this.simulationData.fields.quantum.superposition.toFixed(1);
        document.getElementById('temperature').textContent = this.simulationData.temperature;
        document.getElementById('pressure').textContent = this.simulationData.pressure.toFixed(1);
        document.getElementById('totalEnergy').textContent = this.simulationData.quantumState.totalEnergy.toFixed(0);
        document.getElementById('entropy').textContent = this.simulationData.quantumState.entropy.toFixed(2);
        
        const entangledCount = this.simulationData.entanglementGroups.length * 2;
        document.getElementById('entangledCount').textContent = entangledCount;
        
        // Update quantum state panel
        document.getElementById('superpositionCount').textContent = this.simulationData.quantumState.superpositionCount;
        document.getElementById('collapsedCount').textContent = this.simulationData.quantumState.collapsedCount;
        document.getElementById('uncertainty').textContent = this.simulationData.quantumState.uncertainty.toFixed(2);
        document.getElementById('coherence').textContent = this.simulationData.quantumState.coherence.toFixed(2);
    }

    updateParticles() {
        if (!this.simulationData) return;
        
        // Clear existing particles
        this.particles.forEach(particle => {
            this.scene.remove(particle);
        });
        this.particles = [];
        
        // Create new particles with advanced rendering
        this.simulationData.particles.forEach((particleData, index) => {
            const particle = this.createAdvancedParticle(particleData);
            this.scene.add(particle);
            this.particles.push(particle);
            this.particleMeshes.set(particleData.id, particle);
        });
    }

    createAdvancedParticle(particleData) {
        let geometry, material;
        
        // Different geometries for different particle types
        switch (particleData.type) {
            case 'electron':
                geometry = new THREE.SphereGeometry(0.3, 8, 6);
                material = new THREE.MeshPhongMaterial({
                    color: this.getParticleColor(particleData),
                    transparent: true,
                    opacity: 0.9,
                    emissive: this.getParticleColor(particleData),
                    emissiveIntensity: 0.4,
                    shininess: 100
                });
                break;
            case 'photon':
                geometry = new THREE.SphereGeometry(0.2, 6, 4);
                material = new THREE.MeshPhongMaterial({
                    color: 0xffff00,
                    transparent: true,
                    opacity: 0.8,
                    emissive: 0xffff00,
                    emissiveIntensity: 0.6
                });
                break;
            case 'quark':
                geometry = new THREE.TetrahedronGeometry(0.25);
                material = new THREE.MeshPhongMaterial({
                    color: 0xff0000,
                    transparent: true,
                    opacity: 0.8,
                    emissive: 0xff0000,
                    emissiveIntensity: 0.3
                });
                break;
            case 'neutrino':
                geometry = new THREE.SphereGeometry(0.15, 4, 3);
                material = new THREE.MeshPhongMaterial({
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.6,
                    emissive: 0x00ffff,
                    emissiveIntensity: 0.2
                });
                break;
            default:
                geometry = new THREE.SphereGeometry(0.2, 8, 6);
                material = new THREE.MeshPhongMaterial({
                    color: this.getParticleColor(particleData),
                    transparent: true,
                    opacity: 0.8
                });
        }
        
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(
            particleData.position.x,
            particleData.position.y,
            particleData.position.z
        );
        
        // Store particle data for animation
        particle.userData = particleData;
        
        // Add shadow casting
        particle.castShadow = true;
        particle.receiveShadow = true;
        
        return particle;
    }

    getParticleColor(particleData) {
        const energy = particleData.energy / 100;
        const phase = particleData.quantumState.phase;
        const hue = (phase / (Math.PI * 2)) % 1;
        
        if (this.entanglementMode && particleData.entangledWith !== null) {
            return new THREE.Color().setHSL(hue, 1, 0.5 + energy * 0.5);
        } else {
            return new THREE.Color().setHSL(hue, 0.8, 0.3 + energy * 0.7);
        }
    }

    updateFieldVisualizations() {
        if (!this.simulationData) return;
        
        const fields = this.simulationData.fields;
        
        // Update electromagnetic field lines
        this.fieldVisualizations.forEach((line, index) => {
            const material = line.material;
            material.opacity = 0.1 + 0.2 * fields.electromagnetic.strength;
            material.color.setHSL(0.5 + fields.electromagnetic.phase * 0.1, 0.8, 0.5);
        });
    }

    updateEntanglementLines() {
        // Remove old entanglement lines
        this.entanglementLines.forEach(line => {
            this.scene.remove(line);
        });
        this.entanglementLines = [];
        
        if (!this.simulationData) return;
        
        // Create new entanglement lines
        this.simulationData.entanglementGroups.forEach(group => {
            const p1 = this.particleMeshes.get(group.particles[0]);
            const p2 = this.particleMeshes.get(group.particles[1]);
            
            if (p1 && p2) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    p1.position,
                    p2.position
                ]);
                
                const material = new THREE.LineBasicMaterial({
                    color: 0xff00ff,
                    transparent: true,
                    opacity: 0.3 + 0.4 * group.correlation
                });
                
                const line = new THREE.Line(geometry, material);
                this.scene.add(line);
                this.entanglementLines.push(line);
            }
        });
    }

    updateWaveFunction() {
        if (!this.simulationData || !this.waveFunctionVisualizer) return;
        
        const waveFunction = this.simulationData.waveFunction;
        const material = this.waveFunctionVisualizer.material;
        
        material.opacity = 0.05 + 0.1 * waveFunction.amplitude;
        material.color.setHSL(0.8 + waveFunction.phase * 0.1, 0.8, 0.5);
    }

    updateParticleTrails() {
        if (!this.simulationData || !this.trailsEnabled) return;
        
        // Clear old trails
        this.particleTrails.forEach(trail => {
            this.scene.remove(trail);
        });
        this.particleTrails = [];
        
        // Create new trails
        this.simulationData.particleTrails.forEach(trailData => {
            if (trailData.positions.length > 1) {
                const points = trailData.positions.map(pos => 
                    new THREE.Vector3(pos.x, pos.y, pos.z)
                );
                
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({
                    color: 0x00ff88,
                    transparent: true,
                    opacity: 0.3
                });
                
                const trail = new THREE.Line(geometry, material);
                this.scene.add(trail);
                this.particleTrails.push(trail);
            }
        });
    }

    updateExperiments() {
        if (!this.simulationData) return;
        
        this.experiments = this.simulationData.experiments;
        
        // Update experiment UI based on active experiments
        Object.entries(this.experiments).forEach(([name, experiment]) => {
            const btn = document.querySelector(`[onclick*="${name}"]`);
            if (btn) {
                if (experiment.active) {
                    btn.style.background = 'rgba(255, 107, 107, 0.6)';
                    btn.style.color = '#fff';
                } else {
                    btn.style.background = 'rgba(255, 107, 107, 0.2)';
                    btn.style.color = '#ff6b6b';
                }
            }
        });
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        if (this.stats) this.stats.begin();
        
        const time = Date.now();
        
        // Animate particles with advanced physics
        this.animateAdvancedParticles(time);
        
        // Animate floating shapes
        if (this.animateShapes) {
            this.animateShapes(time);
        }
        
        // Animate camera with complex motion
        this.animateAdvancedCamera(time);
        
        // Update field visualizations
        this.updateFieldVisualizations();
        
        this.renderer.render(this.scene, this.camera);
        
        if (this.stats) this.stats.end();
    }

    animateAdvancedParticles(time) {
        this.particles.forEach(particle => {
            if (particle.userData) {
                const data = particle.userData;
                
                // Smooth position interpolation
                const targetX = data.position.x;
                const targetY = data.position.y;
                const targetZ = data.position.z;
                
                particle.position.x += (targetX - particle.position.x) * 0.1;
                particle.position.y += (targetY - particle.position.y) * 0.1;
                particle.position.z += (targetZ - particle.position.z) * 0.1;
                
                // Advanced rotation based on particle type
                switch (data.type) {
                    case 'electron':
                        particle.rotation.x += 0.03;
                        particle.rotation.y += 0.04;
                        break;
                    case 'photon':
                        particle.rotation.x += 0.05;
                        particle.rotation.z += 0.06;
                        break;
                    case 'quark':
                        particle.rotation.x += 0.02;
                        particle.rotation.y += 0.03;
                        particle.rotation.z += 0.04;
                        break;
                    default:
                        particle.rotation.x += 0.02;
                        particle.rotation.y += 0.03;
                }
                
                // Dynamic scaling based on energy and type
                const baseScale = data.type === 'photon' ? 0.8 : 1.0;
                const scale = baseScale + (data.energy / 100) * 0.5;
                particle.scale.setScalar(scale);
                
                // Update material properties
                const material = particle.material;
                const newColor = this.getParticleColor(data);
                material.color.lerp(newColor, 0.1);
                material.emissive.lerp(newColor, 0.1);
                
                // Dynamic opacity based on quantum state
                if (data.quantumState.superposition) {
                    material.opacity = 0.6 + 0.3 * Math.sin(time * 0.01);
                }
            }
        });
    }

    animateAdvancedCamera(time) {
        // Complex camera motion
        const radius = 50;
        const speed = 0.0003;
        
        this.camera.position.x = Math.cos(time * speed) * radius;
        this.camera.position.y = Math.sin(time * speed * 0.7) * 20;
        this.camera.position.z = Math.sin(time * speed) * radius;
        
        this.camera.lookAt(0, 0, 0);
        
        // Add subtle camera shake based on chaos level
        if (this.simulationData) {
            const chaos = this.simulationData.chaosLevel;
            this.camera.position.x += (Math.random() - 0.5) * chaos * 0.5;
            this.camera.position.y += (Math.random() - 0.5) * chaos * 0.5;
            this.camera.position.z += (Math.random() - 0.5) * chaos * 0.5;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }

    showNotification(message, duration = 3000) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    }
}

// Global functions for button clicks
function resetSimulation() {
    if (window.simulator && window.simulator.socket) {
        window.simulator.socket.emit('resetSimulation');
        window.simulator.showNotification('🔄 Simulation reset!');
    }
}

function toggleEntanglement() {
    if (window.simulator) {
        window.simulator.entanglementMode = !window.simulator.entanglementMode;
        const button = event.target;
        button.textContent = window.simulator.entanglementMode ? '⚛️ Entangled' : '⚛️ Toggle Entanglement';
        button.style.background = window.simulator.entanglementMode ? 
            'linear-gradient(45deg, #ff6b6b, #ff8e8e)' : 
            'linear-gradient(45deg, #00ff88, #00cc66)';
        
        window.simulator.showNotification(
            window.simulator.entanglementMode ? '🔗 Entanglement mode enabled!' : '🔗 Entanglement mode disabled!'
        );
    }
}

function toggleAudio() {
    if (window.simulator) {
        window.simulator.audioEnabled = !window.simulator.audioEnabled;
        const button = event.target;
        button.textContent = window.simulator.audioEnabled ? '🎵 Audio On' : '🎵 Audio';
        button.classList.toggle('active');
        
        if (window.simulator.audioEnabled && window.simulator.audioContext) {
            window.simulator.audioContext.resume();
        }
        
        window.simulator.showNotification(
            window.simulator.audioEnabled ? '🎵 Audio enabled!' : '🎵 Audio disabled!'
        );
    }
}

function toggleParticleTrails() {
    if (window.simulator) {
        window.simulator.trailsEnabled = !window.simulator.trailsEnabled;
        const button = event.target;
        button.textContent = window.simulator.trailsEnabled ? '🌊 Trails On' : '🌊 Trails';
        button.classList.toggle('active');
        
        window.simulator.showNotification(
            window.simulator.trailsEnabled ? '🌊 Particle trails enabled!' : '🌊 Particle trails disabled!'
        );
    }
}

function toggleQuantumState() {
    if (window.simulator) {
        window.simulator.quantumStateVisible = !window.simulator.quantumStateVisible;
        const button = event.target;
        button.textContent = window.simulator.quantumStateVisible ? '🔬 State On' : '🔬 Quantum State';
        button.classList.toggle('active');
        
        const panel = document.querySelector('.quantum-state-panel');
        if (panel) {
            panel.style.display = window.simulator.quantumStateVisible ? 'block' : 'none';
        }
        
        window.simulator.showNotification(
            window.simulator.quantumStateVisible ? '🔬 Quantum state panel visible!' : '🔬 Quantum state panel hidden!'
        );
    }
}

// Quantum Experiment Functions
function runDoubleSlitExperiment() {
    if (window.simulator && window.simulator.socket) {
        const isActive = window.simulator.experiments.doubleSlit?.active;
        window.simulator.socket.emit(isActive ? 'stopExperiment' : 'startExperiment', 'doubleSlit');
        
        window.simulator.showNotification(
            isActive ? '🔬 Double slit experiment stopped!' : '🔬 Double slit experiment started!'
        );
    }
}

function runBellTest() {
    if (window.simulator && window.simulator.socket) {
        const isActive = window.simulator.experiments.bellTest?.active;
        window.simulator.socket.emit(isActive ? 'stopExperiment' : 'startExperiment', 'bellTest');
        
        window.simulator.showNotification(
            isActive ? '🔔 Bell test stopped!' : '🔔 Bell test started!'
        );
    }
}

function runQuantumTunneling() {
    if (window.simulator && window.simulator.socket) {
        const isActive = window.simulator.experiments.quantumTunneling?.active;
        window.simulator.socket.emit(isActive ? 'stopExperiment' : 'startExperiment', 'quantumTunneling');
        
        window.simulator.showNotification(
            isActive ? '🌊 Quantum tunneling stopped!' : '🌊 Quantum tunneling started!'
        );
    }
}

function runParticleCollision() {
    if (window.simulator && window.simulator.socket) {
        const isActive = window.simulator.experiments.particleCollision?.active;
        window.simulator.socket.emit(isActive ? 'stopExperiment' : 'startExperiment', 'particleCollision');
        
        window.simulator.showNotification(
            isActive ? '💥 Particle collision stopped!' : '💥 Particle collision started!'
        );
    }
}

function runQuantumTeleportation() {
    if (window.simulator && window.simulator.socket) {
        const isActive = window.simulator.experiments.quantumTeleportation?.active;
        window.simulator.socket.emit(isActive ? 'stopExperiment' : 'startExperiment', 'quantumTeleportation');
        
        window.simulator.showNotification(
            isActive ? '🚀 Quantum teleportation stopped!' : '🚀 Quantum teleportation started!'
        );
    }
}

function runSchrodingerCat() {
    if (window.simulator && window.simulator.socket) {
        const isActive = window.simulator.experiments.schrodingerCat?.active;
        window.simulator.socket.emit(isActive ? 'stopExperiment' : 'startExperiment', 'schrodingerCat');
        
        window.simulator.showNotification(
            isActive ? '🐱 Schrödinger\'s cat experiment stopped!' : '🐱 Schrödinger\'s cat experiment started!'
        );
    }
}

// Initialize the simulator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.simulator = new AdvancedQuantumChaosSimulator();
});

// Add advanced keyboard controls
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case ' ':
            event.preventDefault();
            resetSimulation();
            break;
        case 'e':
        case 'E':
            toggleEntanglement();
            break;
        case 'a':
        case 'A':
            toggleAudio();
            break;
        case 't':
        case 'T':
            toggleParticleTrails();
            break;
        case 'q':
        case 'Q':
            toggleQuantumState();
            break;
        case '1':
            document.getElementById('chaosSlider').value = 0;
            document.getElementById('chaosSlider').dispatchEvent(new Event('input'));
            break;
        case '2':
            document.getElementById('chaosSlider').value = 0.5;
            document.getElementById('chaosSlider').dispatchEvent(new Event('input'));
            break;
        case '3':
            document.getElementById('chaosSlider').value = 1;
            document.getElementById('chaosSlider').dispatchEvent(new Event('input'));
            break;
        case 'q':
            window.simulator.setSimulationMode('quantum');
            break;
        case 'c':
            window.simulator.setSimulationMode('classical');
            break;
        case 'r':
            window.simulator.setSimulationMode('relativistic');
            break;
        case 'd':
            runDoubleSlitExperiment();
            break;
        case 'b':
            runBellTest();
            break;
        case 'u':
            runQuantumTunneling();
            break;
        case 'p':
            runParticleCollision();
            break;
        case 'x':
            runQuantumTeleportation();
            break;
        case 's':
            runSchrodingerCat();
            break;
    }
});
