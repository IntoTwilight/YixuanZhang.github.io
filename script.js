// DOM元素
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollDown = document.querySelector('.scroll-down');

// 移动端导航菜单切换
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 关闭移动端菜单当点击导航链接时
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 平滑滚动到对应部分
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动指示器点击事件
if (scrollDown) {
    scrollDown.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 滚动动画观察器
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            // 为动画元素添加延迟
            const elements = entry.target.querySelectorAll('.info-item, .research-area, .publication-item, .timeline-item, .internship-item, .achievement-category, .skill-category, .contact-item');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('fade-in-up');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// 观察所有需要动画的部分
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// 技能标签点击效果
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        tag.style.transform = 'scale(0.95)';
        setTimeout(() => {
            tag.style.transform = 'scale(1)';
        }, 150);
    });
});







// 打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 当页面加载完成时启动打字机效果
window.addEventListener('load', () => {
    const titleName = document.querySelector('.title-name');
    if (titleName) {
        const originalText = titleName.textContent;
        setTimeout(() => {
            typeWriter(titleName, originalText, 150);
        }, 1000);
    }
});

// 粒子背景效果
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    hero.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 页面加载完成后初始化粒子效果
window.addEventListener('load', () => {
    createParticles();
});

// 课程成绩动画效果
function animateScores() {
    const courseScores = document.querySelectorAll('.course-score');
    
    courseScores.forEach(score => {
        const finalScore = parseInt(score.textContent);
        let currentScore = 0;
        const increment = finalScore / 50; // 动画持续时间控制
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        currentScore += increment;
                        if (currentScore >= finalScore) {
                            currentScore = finalScore;
                            clearInterval(timer);
                        }
                        score.textContent = Math.floor(currentScore);
                    }, 20);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(score);
    });
}

// 初始化分数动画
document.addEventListener('DOMContentLoaded', () => {
    animateScores();
});



// 添加鼠标跟随效果
document.addEventListener('mousemove', (e) => {
    let customCursor = document.querySelector('.custom-cursor');
    if (!customCursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, #3b82f6, #60a5fa);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(newCursor);
        customCursor = newCursor;
    }
    
    customCursor.style.left = e.clientX - 10 + 'px';
    customCursor.style.top = e.clientY - 10 + 'px';
});

// 为链接和按钮添加悬停效果
document.querySelectorAll('a, button, .btn').forEach(element => {
    element.addEventListener('mouseenter', () => {
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) {
            customCursor.style.transform = 'scale(1.5)';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) {
            customCursor.style.transform = 'scale(1)';
        }
    });
});

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // 关闭移动端菜单
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// 添加预加载效果
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 移除加载类
    setTimeout(() => {
        document.querySelectorAll('.loading').forEach(el => {
            el.classList.add('loaded');
        });
    }, 500);
});

// 懒加载图片（如果有的话）
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// 添加主题切换功能（可选）
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// 恢复主题设置
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// 平滑滚动到顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 监听页面滚动，显示/隐藏返回顶部按钮
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const backToTop = document.querySelector('.back-to-top');
    
    if (scrollTop > 300) {
        if (!backToTop) {
            createBackToTopButton();
        }
    } else {
        if (backToTop) {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                if (backToTop.parentNode) {
                    backToTop.parentNode.removeChild(backToTop);
                }
            }, 300);
        }
    }
});

// 创建返回顶部按钮
function createBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
    `;
    
    button.addEventListener('click', scrollToTop);
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
    });
    
    document.body.appendChild(button);
    
    // 添加淡入动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
} 