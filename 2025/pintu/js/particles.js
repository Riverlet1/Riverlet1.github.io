// js/particles.js
class ParticleCanvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // 初始化粒子
        for(let i = 0; i < 80; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.5 + 0.3
            });
        }

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            
            if(particle.x < 0 || particle.x > this.canvas.width) particle.dx *= -1;
            if(particle.y < 0 || particle.y > this.canvas.height) particle.dy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255,255,255,${particle.alpha})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 初始化粒子系统
const canvas = document.getElementById('particle-canvas');
new ParticleCanvas(canvas);