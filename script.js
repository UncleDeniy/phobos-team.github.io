document.addEventListener('DOMContentLoaded', () => {


    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    if (burger && nav) {
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
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
            content.style.maxHeight = content.classList.contains('active') ? content.scrollHeight + "px" : null;
            if (icon) icon.style.transform = content.classList.contains('active') ? 'rotate(180deg)' : '';
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
                nav.classList.remove('nav-active');
                document.querySelectorAll('.nav-links li').forEach(link => link.style.animation = '');
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

    document.querySelectorAll('.section-title, .rank-card, .uniform-card, .contact-card').forEach(el => {
        el.style.cssText = 'opacity:0; transform:translateY(30px); transition:opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });


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

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!galleryItems.length) return;

    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(item);
        });
    });

    function openLightbox(item) {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        const title = caption ?.querySelector('h4') ?.textContent ||'';
        const description = caption ?.querySelector('p') ?.textContent ||'';

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.querySelector('h3').textContent = title;
        lightboxCaption.querySelector('p').textContent = description;
        lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const item = galleryItems[currentIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');

        lightboxImage.style.opacity = '0';

        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.querySelector('h3').textContent = caption ?.querySelector('h4') ?.textContent || '';
            lightboxCaption.querySelector('p').textContent = caption ?.querySelector('p') ?.textContent || '';
            lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
            lightboxImage.style.opacity = '1';
        }, 200);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox();
    }

    lightbox.querySelector('.lightbox-close') ?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev') ?.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    lightbox.querySelector('.lightbox-next') ?.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') showPrev();
        else if (e.key === 'ArrowRight') showNext();
    });

    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => touchStartX = e.changedTouches[0].screenX);
    lightbox.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (diff < -50) showNext();
        else if (diff > 50) showPrev();
    });

    lightboxImage.style.transition = 'opacity 0.2s';

}
