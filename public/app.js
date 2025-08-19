// Quantum Chaos Simulator - Frontend Application
class QuantumChaosSimulator {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.simulationData = null;
        this.socket = null;
        this.animationId = null;
        this.entanglementMode = false;
        
        this.init();
    }

    init() {
        this.setupSocket();
        this.setupThreeJS();
        this.setupControls();
        this.hideLoading();
        this.animate();
    }

    setupSocket() {
        this.socket = io();
        
        this.socket.on('simulationUpdate', (data) => {
            this.simulationData = data;
            this.updateStats();
            this.updateParticles();
        });
    }

    setupThreeJS() {
        const canvas = document.getElementById('canvas');
        const container = document.querySelector('.container');
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000, 1, 100);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 50);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00ff88, 1);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);
        
        // Add some psychedelic effects
        this.addPsychedelicEffects();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    addPsychedelicEffects() {
        // Create a grid of lines for visual reference
        const gridHelper = new THREE.GridHelper(20, 20, 0x00ff88, 0x00cc66);
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
        
        // Add some floating geometric shapes
        this.addFloatingShapes();
    }

    addFloatingShapes() {
        const shapes = [];
        const geometries = [
            new THREE.TetrahedronGeometry(2),
            new THREE.OctahedronGeometry(1.5),
            new THREE.IcosahedronGeometry(1)
        ];
        
        for (let i = 0; i < 5; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.8, 0.5),
                transparent: true,
                opacity: 0.6,
                wireframe: true
            });
            
            const shape = new THREE.Mesh(geometry, material);
            shape.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            );
            
            shape.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            this.scene.add(shape);
            shapes.push(shape);
        }
        
        // Animate shapes
        this.animateShapes = (time) => {
            shapes.forEach((shape, index) => {
                shape.rotation.x += 0.01 * (index + 1);
                shape.rotation.y += 0.015 * (index + 1);
                shape.rotation.z += 0.02 * (index + 1);
                
                // Float up and down
                shape.position.y += Math.sin(time * 0.001 + index) * 0.02;
            });
        };
    }

    setupControls() {
        const chaosSlider = document.getElementById('chaosSlider');
        const dimensionSlider = document.getElementById('dimensionSlider');
        
        chaosSlider.addEventListener('input', (e) => {
            const level = parseFloat(e.target.value);
            this.updateChaosLevel(level);
        });
        
        dimensionSlider.addEventListener('input', (e) => {
            const dimension = parseInt(e.target.value);
            this.updateDimension(dimension);
        });
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

    updateStats() {
        if (!this.simulationData) return;
        
        document.getElementById('particleCount').textContent = this.simulationData.particles.length;
        document.getElementById('chaosLevel').textContent = this.simulationData.chaosLevel.toFixed(2);
        document.getElementById('dimension').textContent = this.simulationData.dimension + 'D';
        document.getElementById('time').textContent = this.simulationData.time.toFixed(2);
    }

    updateParticles() {
        if (!this.simulationData) return;
        
        // Clear existing particles
        this.particles.forEach(particle => {
            this.scene.remove(particle);
        });
        this.particles = [];
        
        // Create new particles
        this.simulationData.particles.forEach((particleData, index) => {
            const geometry = new THREE.SphereGeometry(0.2, 8, 6);
            const material = new THREE.MeshPhongMaterial({
                color: this.getParticleColor(particleData),
                transparent: true,
                opacity: 0.8,
                emissive: this.getParticleColor(particleData),
                emissiveIntensity: 0.3
            });
            
            const particle = new THREE.Mesh(geometry, material);
            particle.position.set(
                particleData.position.x,
                particleData.position.y,
                particleData.position.z
            );
            
            // Store particle data for animation
            particle.userData = particleData;
            
            this.scene.add(particle);
            this.particles.push(particle);
        });
    }

    getParticleColor(particleData) {
        const energy = particleData.energy / 100;
        const hue = (particleData.quantumState / (Math.PI * 2)) % 1;
        
        if (this.entanglementMode && particleData.entangledWith !== null) {
            return new THREE.Color().setHSL(hue, 1, 0.5 + energy * 0.5);
        } else {
            return new THREE.Color().setHSL(hue, 0.8, 0.3 + energy * 0.7);
        }
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const time = Date.now();
        
        // Animate particles
        this.particles.forEach(particle => {
            if (particle.userData) {
                // Smooth position interpolation
                const targetX = particle.userData.position.x;
                const targetY = particle.userData.position.y;
                const targetZ = particle.userData.position.z;
                
                particle.position.x += (targetX - particle.position.x) * 0.1;
                particle.position.y += (targetY - particle.position.y) * 0.1;
                particle.position.z += (targetZ - particle.position.z) * 0.1;
                
                // Rotate particles
                particle.rotation.x += 0.02;
                particle.rotation.y += 0.03;
                
                // Scale based on energy
                const scale = 0.5 + (particle.userData.energy / 100) * 0.5;
                particle.scale.setScalar(scale);
                
                // Update material color
                const material = particle.material;
                const newColor = this.getParticleColor(particle.userData);
                material.color.lerp(newColor, 0.1);
                material.emissive.lerp(newColor, 0.1);
            }
        });
        
        // Animate floating shapes
        if (this.animateShapes) {
            this.animateShapes(time);
        }
        
        // Rotate camera slowly
        this.camera.position.x = Math.cos(time * 0.0005) * 50;
        this.camera.position.z = Math.sin(time * 0.0005) * 50;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
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
}

// Global functions for button clicks
function resetSimulation() {
    if (window.simulator && window.simulator.socket) {
        window.simulator.socket.emit('resetSimulation');
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
    }
}

// Initialize the simulator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.simulator = new QuantumChaosSimulator();
});

// Add some keyboard controls
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
    }
});
