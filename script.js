/* ================================================
   TEJA NUTAKKI — PORTFOLIO SCRIPTS
   Animations, Interactions & Dynamic Content
   ================================================ */

(function () {
  'use strict';

  // ===========================
  // LOADING SCREEN
  // ===========================
  const loader = document.getElementById('loader');
  const loaderLines = document.getElementById('loader-lines');
  const loaderBar = document.getElementById('loader-bar');

  const bootSequence = [
    { text: '<span class="cmd">$</span> initializing portfolio...', delay: 200 },
    { text: '<span class="path">→</span> loading core modules <span class="success">✓</span>', delay: 400 },
    { text: '<span class="path">→</span> compiling stylesheets <span class="success">✓</span>', delay: 300 },
    { text: '<span class="path">→</span> connecting particle engine <span class="success">✓</span>', delay: 350 },
    { text: '<span class="path">→</span> mounting interactive elements <span class="success">✓</span>', delay: 300 },
    { text: '<span class="path">→</span> calibrating 3D transforms <span class="success">✓</span>', delay: 250 },
    { text: '<span class="path">→</span> warming up animations <span class="success">✓</span>', delay: 300 },
    { text: '', delay: 200 },
    { text: '<span class="success">✓ Portfolio ready!</span> <span class="warn">Welcome aboard.</span>', delay: 400 },
  ];

  let bootIndex = 0;
  let progress = 0;

  function runBootSequence() {
    if (bootIndex < bootSequence.length) {
      const line = bootSequence[bootIndex];
      const div = document.createElement('div');
      div.className = 'loader-line';
      div.innerHTML = line.text;
      loaderLines.appendChild(div);

      progress = Math.round(((bootIndex + 1) / bootSequence.length) * 100);
      loaderBar.style.width = progress + '%';

      bootIndex++;
      setTimeout(runBootSequence, line.delay);
    } else {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initEverything();
      }, 600);
    }
  }

  // Prevent scroll during loading
  document.body.style.overflow = 'hidden';
  setTimeout(runBootSequence, 500);

  // ===========================
  // MAIN INIT
  // ===========================
  function initEverything() {
    initParticles();
    initCustomCursor();
    initScrollProgress();
    initNavbar();
    initTypewriter();
    initGreeting();
    initScrollReveal();
    initTiltCards();
    initMagneticButtons();
    initTextScramble();
    initParallaxBadges();
    initContactForm();
    initTerminal();
    initFooterYear();
    initSmoothScroll();
    initBackToTop();
    initThemeToggle();
  }

  // ===========================
  // PARTICLE BACKGROUND
  // ===========================
  function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 130;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            this.x -= dx * 0.008;
            this.y -= dy * 0.008;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initP() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawConnections();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      initP();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    initP();
    animate();
  }

  // ===========================
  // CUSTOM CURSOR
  // ===========================
  function initCustomCursor() {
    if (window.innerWidth < 768) return;

    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    if (!dot || !outline) return;

    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
    });

    // Smooth follow for outline
    function animateCursor() {
      outlineX += (dotX - outlineX) * 0.15;
      outlineY += (dotY - outlineY) * 0.15;

      dot.style.left = dotX - 4 + 'px';
      dot.style.top = dotY - 4 + 'px';
      outline.style.left = outlineX - 18 + 'px';
      outline.style.top = outlineY - 18 + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .nav-link, .skill-tag, .project-card, .profile-card, .social-link, input, textarea');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        outline.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        outline.classList.remove('hover');
      });
    });

    // Click effect
    document.addEventListener('mousedown', () => dot.classList.add('click'));
    document.addEventListener('mouseup', () => dot.classList.remove('click'));

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, input, textarea').forEach(el => {
      el.style.cursor = 'none';
    });
  }

  // ===========================
  // SCROLL PROGRESS BAR
  // ===========================
  function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // ===========================
  // NAVBAR
  // ===========================
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
      });

      navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveLink() {
      const scrollY = window.scrollY + 100;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
          if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });
  }

  // ===========================
  // TYPEWRITER
  // ===========================
  function initTypewriter() {
    const typewriterEl = document.getElementById('typewriter');
    const titles = [
      'Senior Software Engineer',
      'Java & Spring Boot Expert',
      'Backend Engineering Specialist',
      'Database & Cache Optimizer',
      'Problem Solver'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typewrite() {
      if (!typewriterEl) return;
      const currentTitle = titles[titleIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterEl.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 400;
      }

      setTimeout(typewrite, typeSpeed);
    }

    setTimeout(typewrite, 1200);
  }

  // ===========================
  // DYNAMIC GREETING
  // ===========================
  function initGreeting() {
    const greetingEl = document.getElementById('hero-greeting');
    if (greetingEl) {
      const hour = new Date().getHours();
      let greeting;
      if (hour < 12) greeting = 'Good Morning, I\'m';
      else if (hour < 17) greeting = 'Good Afternoon, I\'m';
      else greeting = 'Good Evening, I\'m';
      greetingEl.textContent = greeting;
    }
  }

  // ===========================
  // STAT COUNTER ANIMATION
  // ===========================
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(updateCounter);
      }
      requestAnimationFrame(updateCounter);
    });
  }

  // ===========================
  // SCROLL REVEAL
  // ===========================
  function initScrollReveal() {
    const revealSelectors = [
      '.about-image-col',
      '.about-text-col',
      '.skill-category',
      '.timeline-item',
      '.project-card',
      '.contact-info',
      '.contact-form-wrapper',
      '.education-card',
      '.profile-card',
      '.section-header'
    ];

    revealSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Stats counter observer
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      statsObserver.observe(heroStats);
    }
  }

  // ===========================
  // 3D TILT CARDS
  // ===========================
  function initTiltCards() {
    if (window.innerWidth < 768) return;

    document.querySelectorAll('.tilt-card').forEach(card => {
      // Add shine layer
      const shine = document.createElement('div');
      shine.className = 'tilt-shine';
      card.style.position = 'relative';
      card.appendChild(shine);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Update shine position
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        card.style.setProperty('--tilt-x', percentX + '%');
        card.style.setProperty('--tilt-y', percentY + '%');
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  // ===========================
  // MAGNETIC BUTTONS
  // ===========================
  function initMagneticButtons() {
    if (window.innerWidth < 768) return;

    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ===========================
  // TEXT SCRAMBLE ON SCROLL
  // ===========================
  function initTextScramble() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    function scrambleText(element) {
      const original = element.textContent;
      const length = original.length;
      let iterations = 0;

      const interval = setInterval(() => {
        element.textContent = original
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iterations >= length) {
          clearInterval(interval);
          element.textContent = original;
        }
        iterations += 1 / 2;
      }, 30);
    }

    const scrambleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrambleText(entry.target);
          scrambleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.scramble-text').forEach(el => {
      scrambleObserver.observe(el);
    });
  }

  // ===========================
  // PARALLAX FLOATING BADGES
  // ===========================
  function initParallaxBadges() {
    const badges = document.querySelectorAll('.floating-badge[data-speed]');
    if (!badges.length) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      badges.forEach(badge => {
        const speed = parseFloat(badge.dataset.speed) || 1;
        const yOffset = -(scrollY * speed * 0.05);
        badge.style.transform = `translateY(${yOffset}px)`;
      });
    }, { passive: true });

    // Also react to mouse on hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        badges.forEach(badge => {
          const speed = parseFloat(badge.dataset.speed) || 1;
          const moveX = x * speed * 20;
          const moveY = y * speed * 20;
          badge.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      });
    }
  }

  // ===========================
  // CONTACT FORM (Formspree)
  // ===========================
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('contact-submit');
      const originalHTML = btn.innerHTML;

      btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
      btn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
          btn.style.background = 'linear-gradient(135deg, #06ffa5, #00d4ff)';
          contactForm.reset();
        } else {
          btn.innerHTML = '<span>Failed to send</span> <i class="fas fa-times"></i>';
          btn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
        }
      } catch (error) {
        btn.innerHTML = '<span>Failed to send</span> <i class="fas fa-times"></i>';
        btn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
      }

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
  }

  // ===========================
  // TERMINAL EASTER EGG
  // ===========================
  function initTerminal() {
    const overlay = document.getElementById('terminal-overlay');
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');
    const closeBtn = document.getElementById('terminal-close');
    if (!overlay || !input || !body) return;

    const commands = {
      help: () => [
        '<span class="cmd">Available commands:</span>',
        '',
        '  <span class="info">about</span>      - Who is Teja?',
        '  <span class="info">skills</span>     - Technical skills',
        '  <span class="info">experience</span> - Work experience',
        '  <span class="info">contact</span>    - Get in touch',
        '  <span class="info">github</span>     - Open GitHub profile',
        '  <span class="info">resume</span>     - Download resume',
        '  <span class="info">joke</span>       - Tell me a dev joke',
        '  <span class="info">clear</span>      - Clear terminal',
        '  <span class="info">exit</span>       - Close terminal',
      ],
      about: () => [
        '<span class="cmd">👋 About Teja Nutakki</span>',
        '',
        '  Senior Software Engineer @ Gainsight',
        '  📍 Hyderabad, India',
        '  🎓 B.Tech CSE — Andhra University',
        '  💼 4+ years building scalable systems',
        '  🏏 Cricket lover, biker, gamer',
      ],
      skills: () => [
        '<span class="cmd">🛠️ Tech Stack</span>',
        '',
        '  <span class="info">Languages:</span>  Java, SQL, JavaScript',
        '  <span class="info">Frameworks:</span> Spring Boot, Hibernate, JPA, Angular',
        '  <span class="info">Databases:</span>  PostgreSQL, MongoDB, MySQL, Redshift',
        '  <span class="info">Tools:</span>      RabbitMQ, Redis, Jenkins, Git',
        '  <span class="info">Testing:</span>    Cucumber, Selenium, Allure',
      ],
      experience: () => [
        '<span class="cmd">💼 Career Journey @ Gainsight</span>',
        '',
        '  <span class="info">2022 - Now</span>  Senior Software Engineer',
        '  <span class="warn">└─</span> CDC efficiency ↑200%, Cache speed ↑70%',
        '  <span class="info">2022</span>        Software Engineer',
        '  <span class="warn">└─</span> Full-stack Java + Spring Boot development',
        '  <span class="info">2021</span>        Associate SDET',
        '  <span class="warn">└─</span> QA automation with Cucumber & Selenium',
      ],
      contact: () => [
        '<span class="cmd">📬 Get in Touch</span>',
        '',
        '  ✉️  tejanuthakki12@gmail.com',
        '  📱  +91 9030552643',
        '  🐙  github.com/alwaysteja',
        '  💼  linkedin.com/in/teja-nutakki-485208a2',
      ],
      github: () => {
        window.open('https://github.com/alwaysteja', '_blank');
        return ['<span class="success">Opening GitHub profile...</span>'];
      },
      resume: () => {
        window.open('Teja_Nutakki_SWE.pdf', '_blank');
        return ['<span class="success">Downloading resume...</span>'];
      },
      joke: () => {
        const jokes = [
          'Why do Java developers wear glasses? Because they can\'t C#.',
          'A SQL query walks into a bar, walks up to two tables and asks... "Can I JOIN you?"',
          'There are only 10 kinds of people: those who understand binary and those who don\'t.',
          'Why do programmers prefer dark mode? Because light attracts bugs.',
          '!false — It\'s funny because it\'s true.',
          'I told my wife she was drawing her eyebrows too high. She looked surprised.',
          'How many programmers does it take to change a light bulb? None. That\'s a hardware problem.',
          'To understand recursion, you must first understand recursion.',
        ];
        return ['', '  😄 ' + jokes[Math.floor(Math.random() * jokes.length)], ''];
      },
      clear: () => {
        body.innerHTML = '';
        return [];
      },
      exit: () => {
        overlay.classList.remove('active');
        return [];
      },
    };

    function addOutput(lines) {
      lines.forEach(line => {
        const div = document.createElement('div');
        div.className = 'terminal-output-line';
        div.innerHTML = line;
        body.appendChild(div);
      });
      body.scrollTop = body.scrollHeight;
    }

    function processCommand(cmd) {
      // Show the entered command
      const cmdDiv = document.createElement('div');
      cmdDiv.className = 'terminal-output-line';
      cmdDiv.innerHTML = `<span class="cmd">$</span> ${cmd}`;
      body.appendChild(cmdDiv);

      const trimmed = cmd.trim().toLowerCase();
      if (commands[trimmed]) {
        const result = commands[trimmed]();
        if (result && result.length) addOutput(result);
      } else if (trimmed) {
        addOutput([`<span class="warn">Command not found:</span> ${cmd}. Type <span class="cmd">help</span> for available commands.`]);
      }

      body.scrollTop = body.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value;
        input.value = '';
        processCommand(cmd);
      }
    });

    // Open with backtick key
    document.addEventListener('keydown', (e) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
        e.preventDefault();
        overlay.classList.toggle('active');
        if (overlay.classList.contains('active')) {
          setTimeout(() => input.focus(), 400);
        }
      }
      if (e.key === 'Escape') {
        overlay.classList.remove('active');
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
      });
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  }

  // ===========================
  // FOOTER YEAR
  // ===========================
  function initFooterYear() {
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
  }

  // ===========================
  // SMOOTH SCROLL
  // ===========================
  function initSmoothScroll() {
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
  }

  // ===========================
  // BACK TO TOP BUTTON
  // ===========================
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===========================
  // THEME TOGGLE (Dark/Light)
  // ===========================
  function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    if (!toggleBtn || !icon) return;

    // Check saved preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }

    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');

      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('portfolio-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('portfolio-theme', 'light');
      }
    });
  }

})();
