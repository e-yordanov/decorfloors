'use strict';

/* ═══════════════════════════════════════
   THEME MANAGER
   Reads OS preference; persists choice.
═══════════════════════════════════════ */
class ThemeManager {
    constructor() {
        this.key     = 'df-theme';
        this.current = localStorage.getItem(this.key) ||
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.btns    = document.querySelectorAll('[data-theme-toggle]');
        this.apply(this.current);
        this.btns.forEach(btn => btn.addEventListener('click', () => this.toggle()));

        // Respond to OS preference changes when no manual preference is saved
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem(this.key)) this.apply(e.matches ? 'dark' : 'light');
        });
    }

    toggle() {
        this.current = this.current === 'dark' ? 'light' : 'dark';
        this.apply(this.current);
        localStorage.setItem(this.key, this.current);
    }

    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.btns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
}

/* ═══════════════════════════════════════
   LANGUAGE MANAGER
   Default: Bulgarian.
═══════════════════════════════════════ */
class LanguageManager {
    constructor() {
        this.key     = 'df-lang';
        this.current = localStorage.getItem(this.key) || 'bg';
        this.btns    = document.querySelectorAll('[data-lang-btn]');

        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang-btn');
                if (lang !== this.current) this.setLanguage(lang);
            });
        });

        this.setLanguage(this.current);
    }

    setLanguage(lang) {
        if (!translations[lang]) return;
        this.current = lang;
        localStorage.setItem(this.key, lang);
        document.documentElement.lang = lang === 'bg' ? 'bg' : 'en';

        this.btns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
        });

        this.applyStaticTranslations(lang);
        this.renderTrustBar(lang);
        this.renderServices(lang);
        this.renderGallery(lang);
        this.renderAdvantages(lang);
        this.renderAbout(lang);
        this.renderContact(lang);
        this.renderFooter(lang);

        if (window.typedInstance) window.typedInstance.setStrings(translations[lang].hero.typed);
    }

    resolve(obj, path) {
        return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
    }

    applyStaticTranslations(lang) {
        const t = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const val = this.resolve(t, el.getAttribute('data-i18n'));
            if (val !== undefined) el.textContent = val;
        });
    }

    renderTrustBar(lang) {
        const el = document.getElementById('trust-bar');
        if (!el) return;
        el.innerHTML = translations[lang].trustBar.map(item => `
            <div class="trust-item">
                <i class="${item.icon}"></i>
                <span>${item.text}</span>
            </div>
        `).join('');
    }

    renderServices(lang) {
        const { items } = translations[lang].services;
        const el = document.getElementById('services-grid');
        if (!el) return;
        el.innerHTML = items.map((s, i) => `
            <div class="service-card" data-color="${s.color}"
                 data-aos="fade-up" data-aos-delay="${i * 80}">
                <div class="service-card-head">
                    <div class="service-icon"><i class="${s.icon}"></i></div>
                    <div class="service-title">${s.title}</div>
                </div>
                <p class="service-desc">${s.desc}</p>
            </div>
        `).join('');
        if (window.AOS) AOS.refresh();
    }

    renderGallery(lang) {
        const t = translations[lang].gallery;

        // Filters
        const filtersEl = document.getElementById('gallery-filters');
        if (filtersEl) {
            filtersEl.innerHTML = Object.entries(t.filters).map(([key, label]) => `
                <button class="gallery-filter-btn ${key === 'all' ? 'active' : ''}"
                        data-filter="${key === 'all' ? '*' : key}">
                    ${label}
                </button>
            `).join('');

            filtersEl.querySelectorAll('.gallery-filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    filtersEl.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const filter = btn.dataset.filter;
                    document.querySelectorAll('.gallery-item').forEach(item => {
                        if (filter === '*' || item.dataset.category === filter) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                });
            });
        }

        // Grid
        const gridEl = document.getElementById('gallery-grid');
        if (!gridEl) return;
        gridEl.innerHTML = GALLERY_ITEMS.map((item, i) => `
            <div class="gallery-item" data-category="${item.category}"
                 data-aos="zoom-in" data-aos-delay="${(i % 4) * 60}">
                <button class="gallery-item-btn"
                        data-index="${i}"
                        aria-label="${t.catLabels[item.category] || item.category}">
                    <img src="${item.src}"
                         alt="${t.catLabels[item.category] || item.category}"
                         loading="lazy">
                    <div class="gallery-item-overlay">
                        <span class="gallery-item-label">${t.catLabels[item.category] || item.category}</span>
                        <i class="fas fa-expand-alt"></i>
                    </div>
                </button>
            </div>
        `).join('');

        // Bind lightbox open per item
        gridEl.querySelectorAll('.gallery-item-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.galleryLightbox) window.galleryLightbox.open(parseInt(btn.dataset.index, 10));
            });
        });

        if (window.AOS) AOS.refresh();
    }

    renderAdvantages(lang) {
        const t = translations[lang].advantages;
        const el = document.getElementById('advantages-content');
        if (!el) return;

        const renderList = (group) => group.items.map(item => `
            <li class="advantage-item">${item}</li>
        `).join('');

        el.innerHTML = `
            <div class="advantages-grid">
                <div class="advantage-card" data-aos="fade-right">
                    <div class="advantage-card-head">
                        <div class="advantage-icon"><i class="${t.stamped.icon}"></i></div>
                        <div class="advantage-title">${t.stamped.title}</div>
                    </div>
                    <ul class="advantage-list">${renderList(t.stamped)}</ul>
                </div>
                <div class="advantage-card" data-aos="fade-left">
                    <div class="advantage-card-head">
                        <div class="advantage-icon"><i class="${t.polished.icon}"></i></div>
                        <div class="advantage-title">${t.polished.title}</div>
                    </div>
                    <ul class="advantage-list">${renderList(t.polished)}</ul>
                </div>
            </div>
            <div class="advantages-cta" data-aos="fade-up">
                <p class="advantages-ad-text">${t.adText}</p>
                <a href="#contact" class="btn btn-primary">
                    <i class="fas fa-phone"></i> ${t.cta}
                </a>
            </div>
        `;
        if (window.AOS) AOS.refresh();
    }

    renderAbout(lang) {
        const t = translations[lang].about;
        const el = document.getElementById('about-content');
        if (!el) return;

        el.innerHTML = `
            <div class="about-grid">
                <div class="about-text-wrap" data-aos="fade-right">
                    <span class="about-section-label">${t.sectionLabel}</span>
                    <h2 class="about-title">${t.sectionTitle}</h2>
                    <p class="about-subtitle">${t.sectionSubtitle}</p>
                    <div class="about-text">
                        <p>${t.p1}</p>
                        <p>${t.p2}</p>
                    </div>
                </div>
                <div class="about-cards" data-aos="fade-left">
                    ${t.cards.map(card => `
                        <div class="about-info-card">
                            <div class="about-info-icon"><i class="${card.icon}"></i></div>
                            <div>
                                <div class="about-info-title">${card.title}</div>
                                <div class="about-info-text">${card.text}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        if (window.AOS) AOS.refresh();
    }

    renderContact(lang) {
        const t = translations[lang].contact;
        const el = document.getElementById('contact-inner');
        if (!el) return;

        el.innerHTML = `
            <p class="contact-desc">${t.description}</p>
            <div class="contact-actions">
                <a href="tel:${t.phone}" class="contact-btn contact-btn-phone">
                    <i class="fas fa-phone"></i>
                    <span>${t.phoneLabel} &nbsp;<span class="btn-phone-num">${t.phoneDisplay}</span></span>
                </a>
                <span class="contact-divider">${lang === 'bg' ? 'или' : 'or'}</span>
                <a href="mailto:${t.email}" class="contact-btn contact-btn-email">
                    <i class="fas fa-envelope"></i>
                    <span>${t.emailLabel} &mdash; ${t.email}</span>
                </a>
            </div>
            <div class="contact-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${t.locationLabel}</span>
            </div>
        `;
    }

    renderFooter(lang) {
        const t = translations[lang];
        const copyEl = document.getElementById('footer-copy');
        if (copyEl) {
            copyEl.textContent = `© ${new Date().getFullYear()} ${t.footer.brand}. ${t.footer.copy}`;
        }

        const linksEl = document.getElementById('footer-links');
        if (linksEl) {
            linksEl.innerHTML = `
                <a href="#home"       class="footer-link" data-i18n="nav.home">${t.nav.home}</a>
                <a href="#services"   class="footer-link" data-i18n="nav.services">${t.nav.services}</a>
                <a href="#gallery"    class="footer-link" data-i18n="nav.gallery">${t.nav.gallery}</a>
                <a href="#advantages" class="footer-link" data-i18n="nav.advantages">${t.nav.advantages}</a>
                <a href="#contact"    class="footer-link" data-i18n="nav.contact">${t.nav.contact}</a>
            `;
        }
    }
}

/* ═══════════════════════════════════════
   HERO IMAGE SLIDER
═══════════════════════════════════════ */
class HeroSlider {
    constructor() {
        this.images     = HERO_IMAGES;
        this.current    = 0;
        this.container  = document.getElementById('hero-slides');
        this.indWrapper = document.getElementById('hero-indicators');
        this.interval   = null;
        if (!this.container) return;
        this.init();
    }

    init() {
        this.slides = this.images.map((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
            const img = document.createElement('img');
            img.src = src;
            img.alt = '';
            img.setAttribute('aria-hidden', 'true');
            if (i > 0) img.setAttribute('loading', 'lazy');
            slide.appendChild(img);
            this.container.appendChild(slide);
            return slide;
        });

        if (this.indWrapper) {
            this.dots = this.images.map((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Slide ${i + 1}`);
                dot.addEventListener('click', () => { this.goTo(i); this.resetAutoplay(); });
                this.indWrapper.appendChild(dot);
                return dot;
            });
        }

        this.startAutoplay();
    }

    goTo(index) {
        if (index === this.current) return;
        this.slides[this.current].classList.remove('active');
        if (this.dots) this.dots[this.current].classList.remove('active');

        this.current = index;

        const slide = this.slides[this.current];
        slide.classList.add('active');

        // Restart Ken Burns on the newly active slide's image
        const img = slide.querySelector('img');
        img.style.animation = 'none';
        void img.offsetWidth; // reflow to restart animation
        img.style.animation  = '';

        if (this.dots) this.dots[this.current].classList.add('active');
    }

    next() { this.goTo((this.current + 1) % this.images.length); }

    startAutoplay() {
        this.interval = setInterval(() => this.next(), 6000);
    }

    resetAutoplay() {
        clearInterval(this.interval);
        this.startAutoplay();
    }
}

/* ═══════════════════════════════════════
   TYPED TEXT
═══════════════════════════════════════ */
class TypedText {
    constructor(el) {
        this.el       = el;
        this.strings  = [];
        this.idx      = 0;
        this.charIdx  = 0;
        this.deleting = false;
        this.loop();
    }

    setStrings(arr) {
        this.strings  = arr;
        this.idx      = 0;
        this.charIdx  = 0;
        this.deleting = false;
        this.el.textContent = '';
    }

    loop() {
        if (!this.strings.length) { setTimeout(() => this.loop(), 200); return; }
        const word = this.strings[this.idx % this.strings.length];

        if (!this.deleting) {
            this.charIdx++;
            this.el.textContent = word.slice(0, this.charIdx);
            if (this.charIdx >= word.length) {
                this.deleting = true;
                setTimeout(() => this.loop(), 2000);
                return;
            }
            setTimeout(() => this.loop(), 75);
        } else {
            this.charIdx--;
            this.el.textContent = word.slice(0, this.charIdx);
            if (this.charIdx === 0) {
                this.deleting = false;
                this.idx++;
                setTimeout(() => this.loop(), 380);
                return;
            }
            setTimeout(() => this.loop(), 40);
        }
    }
}

/* ═══════════════════════════════════════
   GALLERY LIGHTBOX
═══════════════════════════════════════ */
class GalleryLightbox {
    constructor() {
        this.overlay   = document.getElementById('gallery-lightbox');
        this.img       = document.getElementById('lightbox-img');
        this.caption   = document.getElementById('lightbox-caption');
        this.closeBtn  = document.getElementById('lightbox-close');
        this.prevBtn   = document.getElementById('lightbox-prev');
        this.nextBtn   = document.getElementById('lightbox-next');
        this.visibleIndices = [];
        this.posInVisible   = 0;
        this.bind();
    }

    bind() {
        if (this.closeBtn) this.closeBtn.addEventListener('click',  () => this.close());
        if (this.prevBtn)  this.prevBtn.addEventListener('click',   () => this.prev());
        if (this.nextBtn)  this.nextBtn.addEventListener('click',   () => this.next());
        if (this.overlay)  this.overlay.addEventListener('click', e => {
            if (e.target === this.overlay) this.close();
        });
        document.addEventListener('keydown', e => {
            if (!this.overlay || !this.overlay.classList.contains('open')) return;
            if (e.key === 'Escape')     this.close();
            if (e.key === 'ArrowLeft')  this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    open(galleryIndex) {
        // Collect currently visible item indices
        const items = document.querySelectorAll('.gallery-item:not(.hidden)');
        this.visibleIndices = [];
        items.forEach(item => {
            const btn = item.querySelector('[data-index]');
            if (btn) this.visibleIndices.push(parseInt(btn.dataset.index, 10));
        });

        this.posInVisible = this.visibleIndices.indexOf(galleryIndex);
        if (this.posInVisible === -1) this.posInVisible = 0;

        this.show();
        if (this.overlay) {
            this.overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    show() {
        const idx  = this.visibleIndices[this.posInVisible];
        const item = GALLERY_ITEMS[idx];
        if (!item || !this.img) return;

        this.img.src = item.src;
        this.img.alt = item.category;

        const lang      = window.langMgr ? window.langMgr.current : 'bg';
        const catLabels = translations[lang].gallery.catLabels;
        if (this.caption) this.caption.textContent = catLabels[item.category] || item.category;
    }

    prev() {
        this.posInVisible = (this.posInVisible - 1 + this.visibleIndices.length) % this.visibleIndices.length;
        this.show();
    }

    next() {
        this.posInVisible = (this.posInVisible + 1) % this.visibleIndices.length;
        this.show();
    }

    close() {
        if (this.overlay) this.overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

/* ═══════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════ */
class Navigation {
    constructor() {
        this.navbar     = document.getElementById('navbar');
        this.hamburger  = document.getElementById('hamburger');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.sections   = document.querySelectorAll('section[id]');
        this.links      = document.querySelectorAll('.nav-link[href^="#"]');
        this.isOpen     = false;

        this.bindScroll();
        this.bindHamburger();
        this.bindLinks();
    }

    bindScroll() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => { this.onScroll(); ticking = false; });
                ticking = true;
            }
        }, { passive: true });
    }

    onScroll() {
        const y = window.scrollY;
        if (this.navbar) this.navbar.classList.toggle('scrolled', y > 60);

        const btt = document.getElementById('back-to-top');
        if (btt) btt.classList.toggle('visible', y > 500);

        let current = '';
        this.sections.forEach(s => {
            if (y >= s.offsetTop - 110) current = s.id;
        });
        this.links.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    }

    bindHamburger() {
        if (!this.hamburger) return;
        this.hamburger.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            this.hamburger.classList.toggle('open', this.isOpen);
            this.mobileMenu.classList.toggle('open', this.isOpen);
            document.body.style.overflow = this.isOpen ? 'hidden' : '';
        });
    }

    bindLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = document.querySelector(a.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                this.closeMobile();
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    closeMobile() {
        this.isOpen = false;
        if (this.hamburger) this.hamburger.classList.remove('open');
        if (this.mobileMenu) this.mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }
}

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

    // Theme (reads OS preference)
    new ThemeManager();

    // Language (renders all content, BG default)
    const langMgr = new LanguageManager();
    window.langMgr = langMgr;

    // Hero slider
    new HeroSlider();

    // Typed text
    const typedEl = document.getElementById('typed-text');
    if (typedEl) {
        const typed = new TypedText(typedEl);
        typed.setStrings(translations[langMgr.current].hero.typed);
        window.typedInstance = typed;
    }

    // Gallery lightbox
    window.galleryLightbox = new GalleryLightbox();

    // Navigation
    new Navigation();

    // AOS
    if (window.AOS) {
        AOS.init({
            duration: 650,
            easing:   'ease-out-cubic',
            once:     true,
            offset:   55,
        });
    }

    // Back to top
    const btt = document.getElementById('back-to-top');
    if (btt) {
        btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Scroll indicator fade
    const scrollInd = document.querySelector('.scroll-indicator');
    if (scrollInd) {
        window.addEventListener('scroll', () => {
            scrollInd.style.opacity = window.scrollY > 80 ? '0' : '1';
        }, { passive: true });
    }
});
