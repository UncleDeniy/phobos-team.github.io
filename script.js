document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    function closeMobileMenu() {
        if (!nav || !burger) return;
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                link.style.animation = link.style.animation
                    ? ''
                    : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });

            burger.classList.toggle('toggle');
        });
    }

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');

            header.classList.toggle('active');
            content.classList.toggle('active');
            content.style.maxHeight = content.classList.contains('active')
                ? content.scrollHeight + "px"
                : null;

            if (icon) {
                icon.style.transform = content.classList.contains('active')
                    ? 'rotate(180deg)'
                    : '';
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            if (nav && nav.classList.contains('nav-active')) {
                closeMobileMenu();
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section-title, .rank-card, .uniform-card, .contact-card, .gallery-item').forEach(el => {
        el.style.cssText = 'opacity:0; transform:translateY(30px); transition:opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    initGalleryFilters();

    const style = document.createElement('style');
    style.textContent = '.animate-in{opacity:1!important; transform:translateY(0)!important}';
    document.head.appendChild(style);

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (!navLink) return;

            const sectionTop = section.offsetTop - 100;
            const isActive = scrollY > sectionTop && scrollY <= sectionTop + section.offsetHeight;
            navLink.classList.toggle('active', isActive);
        });
    });

    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        initLightbox();
    }
});

function initGalleryFilters() {
    const filters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!filters.length || !galleryItems.length) return;

    filters.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                const shouldShow = filter === 'all' || item.dataset.year === filter;
                item.classList.toggle('is-hidden', !shouldShow);
            });
        });
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!galleryItems.length) return;

    let currentIndex = 0;

    const getVisibleItems = () =>
        Array.from(galleryItems).filter(item => !item.classList.contains('is-hidden'));

    galleryItems.forEach((item, index) => {
        const openCurrentItem = () => {
            currentIndex = index;
            openLightbox(item);
        };

        item.addEventListener('click', openCurrentItem);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCurrentItem();
            }
        });
    });

    function getItemData(item) {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        const title = caption?.querySelector('h4')?.textContent?.trim() || img?.alt || 'ФОТО';
        const description = caption?.querySelector('p')?.textContent?.trim() || img?.alt || '';
        return { img, title, description };
    }

    function openLightbox(item) {
        const { img, title, description } = getItemData(item);
        if (!img) return;

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.querySelector('h3').textContent = title;
        lightboxCaption.querySelector('p').textContent = description;
        updateCounter(item);

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateCounter(currentItem = galleryItems[currentIndex]) {
        const visibleItems = getVisibleItems();
        const visibleIndex = visibleItems.indexOf(currentItem);
        lightboxCounter.textContent = `${visibleIndex + 1} / ${visibleItems.length}`;
    }

    function updateLightbox() {
        const item = galleryItems[currentIndex];
        if (!item || item.classList.contains('is-hidden')) return;

        const { img, title, description } = getItemData(item);
        if (!img) return;

        lightboxImage.style.opacity = '0';

        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.querySelector('h3').textContent = title;
            lightboxCaption.querySelector('p').textContent = description;
            updateCounter(item);
            lightboxImage.style.opacity = '1';
        }, 200);
    }

    function syncCurrentIndex(nextItem) {
        const nextIndex = Array.from(galleryItems).indexOf(nextItem);
        if (nextIndex >= 0) currentIndex = nextIndex;
    }

    function showPrev() {
        const visibleItems = getVisibleItems();
        const currentItem = galleryItems[currentIndex];
        const visibleIndex = visibleItems.indexOf(currentItem);
        const nextItem = visibleItems[(visibleIndex - 1 + visibleItems.length) % visibleItems.length];
        syncCurrentIndex(nextItem);
        updateLightbox();
    }

    function showNext() {
        const visibleItems = getVisibleItems();
        const currentItem = galleryItems[currentIndex];
        const visibleIndex = visibleItems.indexOf(currentItem);
        const nextItem = visibleItems[(visibleIndex + 1) % visibleItems.length];
        syncCurrentIndex(nextItem);
        updateLightbox();
    }

    lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev')?.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    lightbox.querySelector('.lightbox-next')?.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') showPrev();
        else if (e.key === 'ArrowRight') showNext();
    });

    let touchStartX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    lightbox.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (diff < -50) showNext();
        else if (diff > 50) showPrev();
    });

    lightboxImage.style.transition = 'opacity 0.2s';
}


// Анимация кнопки при наведении
document.querySelectorAll('.btn-join-professional').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Плавный скролл к анкете (если форма на той же странице)
document.querySelectorAll('a[href^="#form"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});