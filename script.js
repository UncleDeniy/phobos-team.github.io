document.addEventListener('DOMContentLoaded', () => {
  
    function initTrailerVideo() {
        const video = document.getElementById('teamVideo');
        if (!video) return;
        video.load();
    }

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    function closeMobileMenu() {
        if (!nav || !burger) return;
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => { link.style.animation = ''; });
    }

    if (burger && nav) {
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
            if (nav && nav.classList.contains('nav-active')) closeMobileMenu();
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

    document.querySelectorAll('.section-title, .rank-card, .uniform-panel, .join-contact-card, .album-card').forEach(el => {
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

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 200;
            const updateCounter = () => {
                const current = +counter.textContent;
                if (current < target) {
                    counter.textContent = Math.ceil(current + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.team-stats-block').forEach(block => statsObserver.observe(block));

    document.querySelectorAll('.btn-join-professional').forEach(btn => {
        btn.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-5px)'; });
        btn.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0)'; });
    });

    // ============================================
    // ГАЛЕРЕЯ
    // ============================================

    const albumsData = {
        1: {
            title: "Барсогория 9",
            year: "2026",
            photos: [
                { src: "img/gallery/bars9/1.jpg", caption: "Барсогория 9" },
                { src: "img/gallery/bars9/2.jpg", caption: "Барсогория 9" },
                { src: "img/gallery/bars9/3.jpg", caption: "Барсогория 9" },
                { src: "img/gallery/bars9/4.jpg", caption: "Барсогория 9" },
                { src: "img/gallery/bars9/5.jpg", caption: "Барсогория 9" },
                { src: "img/gallery/bars9/6.jpg", caption: "Барсогория 9" }
            ]
        },
        2: {
            title: "Открытие сезона 2026",
            year: "2026",
            photos: [
                { src: "img/gallery/Открытие сезона 2026/4.jpg", caption: "Открытие 2026" },
                { src: "img/gallery/Открытие сезона 2026/5.jpg", caption: "Открытие 2026" }
            ]
        },
        3: {
            title: "Рейдовая игра MSRV",
            year: "2026",
            photos: [
                { src: "img/gallery/Рейдовая игра MSRV/2.jpg", caption: "Рейдовая игра MSRV" },
                { src: "img/gallery/Рейдовая игра MSRV/3.jpg", caption: "Рейдовая игра MSRV" }
            ]
        },
        4: {
            title: "Открытие сезона 2025",
            year: "2025",
            photos: [
                { src: "img/gallery/Открытие 2025/01.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/02.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/03.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/04.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/05.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/06.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/07.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/08.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/09.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/10.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/11.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/12.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/13.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/14.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/15.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/16.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/17.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/18.jpg", caption: "Открытие 2025" },
                { src: "img/gallery/Открытие 2025/19.jpg", caption: "Открытие 2025" }
            ]
        },
        5: {
            title: "MSRV Operations 🦅",
            year: "2025",
            photos: [
                { src: "img/gallery/msrvop/1.jpg", caption: "MSRV Operations" },
                { src: "img/gallery/msrvop/2.jpg", caption: "MSRV Operations" },
                { src: "img/gallery/msrvop/3.jpg", caption: "MSRV Operations" },
                { src: "img/gallery/msrvop/4.jpg", caption: "MSRV Operations" },
                { src: "img/gallery/msrvop/5.jpg", caption: "MSRV Operations" }
            ]
        },
        6: {
            title: "MSRV Барсогория 8",
            year: "2025",
            photos: [
                { src: "img/gallery/MSRV Барсогория 8/1.jpg", caption: "MSRV Барсогория 8" },
                { src: "img/gallery/MSRV Барсогория 8/2.jpg", caption: "MSRV Барсогория 8" },
                { src: "img/gallery/MSRV Барсогория 8/3.jpg", caption: "MSRV Барсогория 8" }
            ]

        },
        7: {
            title: "Обитаемый остров 2024 🤙",
            year: "2024",
            photos: [
                { src: "img/gallery/Обитаемый остров 2024/1.jpg", caption: "Обитаемый остров 2024" },
                { src: "img/gallery/Обитаемый остров 2024/2.jpg", caption: "Обитаемый остров 2024" },
                { src: "img/gallery/Обитаемый остров 2024/3.jpg", caption: "Обитаемый остров 2024" },
                { src: "img/gallery/Обитаемый остров 2024/4.jpg", caption: "Обитаемый остров 2024" },
                { src: "img/gallery/Обитаемый остров 2024/5.jpg", caption: "Обитаемый остров 2024" },
                { src: "img/gallery/Обитаемый остров 2024/6.jpg", caption: "Обитаемый остров 2024" }
            ]
        },
        8: {
            title: "Закрытие сезона 2024",
            year: "2024",
            photos: [
                { src: "img/gallery/Закрытие 2024/01.jpg", caption: "Закрытие 2024" },
                { src: "img/gallery/Закрытие 2024/02.jpg", caption: "Закрытие 2024" },
                { src: "img/gallery/Закрытие 2024/03.jpg", caption: "Закрытие 2024" },
                { src: "img/gallery/Закрытие 2024/04.jpg", caption: "Закрытие 2024" },
                { src: "img/gallery/Закрытие 2024/05.jpg", caption: "Закрытие 2024" },
                { src: "img/gallery/Закрытие 2024/06.jpg", caption: "Закрытие 2024" },
                { src: "img/gallery/Закрытие 2024/07.jpg", caption: "Закрытие 2024" },
                { src: "img/gallery/Закрытие 2024/08.jpg", caption: "Закрытие 2024" },
                { src: "img/gallery/Закрытие 2024/09.jpg", caption: "Закрытие 2024" },
                { src: "img/gallery/Закрытие 2024/10.jpg", caption: "Закрытие 2024" },
                { src: "img/gallery/Закрытие 2024/11.jpg", caption: "Закрытие 2024" }
            ]
        },
        9: {
            title: "Закрытие сезона 2023",
            year: "2023",
            photos: [
                { src: "img/gallery/Закрытие сезона 2023/01.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/02.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/03.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/04.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/05.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/06.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/07.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/08.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/09.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/11.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/12.jpg", caption: "Закрытие 2023" },
                { src: "img/gallery/Закрытие сезона 2023/13.jpg", caption: "Закрытие 2023" }
            ]
        },
        10: {
            title: "Первая тренировка 2026",
            year: "2026",
            photos: [
                { src: "img/gallery/2026тренеровка/1.jpg", caption: "Первая тренировка 2026" }
            ]
        },
    };

    let currentLightboxPhotos = [];
    let currentLightboxIndex = 0;

    function openAlbum(albumId) {
        const album = albumsData[albumId];
        if (!album) return;
        
        const modal = document.getElementById('albumModal');
        const title = document.getElementById('modalAlbumTitle');
        const photosContainer = document.getElementById('modalAlbumPhotos');
        if (!modal || !title || !photosContainer) return;
        
        title.textContent = album.title;
        photosContainer.innerHTML = '';
        
        album.photos.forEach((photo, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'album-photo-item';
            
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.caption;
            img.loading = 'lazy';
            
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #1a1a1a;
                color: #444;
                font-family: 'Roboto Mono', monospace;
                font-size: 0.7rem;
                letter-spacing: 1px;
                transition: opacity 0.3s ease;
                z-index: 1;
            `;
            placeholder.textContent = '⏳';
            
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: opacity 0.3s ease;
                opacity: 0;
                position: relative;
                z-index: 2;
            `;
            
            img.onload = function() {
                this.style.opacity = '1';
                placeholder.style.opacity = '0';
                setTimeout(() => {
                    if (placeholder.parentNode) {
                        placeholder.remove();
                    }
                }, 300);
            };
            
            img.onerror = function() {
                placeholder.textContent = '❌';
                placeholder.style.color = '#ff5f56';
                this.style.display = 'none';
            };
            
            photoItem.style.position = 'relative';
            photoItem.style.overflow = 'hidden';
            photoItem.style.background = '#1a1a1a';
            photoItem.appendChild(placeholder);
            photoItem.appendChild(img);
            
            photoItem.addEventListener('click', () => openVkLightbox(album.photos, index));
            photosContainer.appendChild(photoItem);
        });
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeAlbumModal() {
        document.getElementById('albumModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    function openVkLightbox(photos, index) {
        currentLightboxPhotos = photos;
        currentLightboxIndex = index;
        const lightbox = document.getElementById('lightboxVk');
        updateLightboxPhoto();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVkLightbox() {
        document.getElementById('lightboxVk').classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxPhoto() {
        const photo = currentLightboxPhotos[currentLightboxIndex];
        document.getElementById('lightboxVkImage').src = photo.src;
        document.getElementById('lightboxVkImage').alt = photo.caption;
        document.getElementById('lightboxVkCounter').textContent = `${currentLightboxIndex + 1} / ${currentLightboxPhotos.length}`;
        document.getElementById('lightboxVkCaption').textContent = photo.caption;
    }

    function showPrevPhoto() {
        currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxPhotos.length) % currentLightboxPhotos.length;
        updateLightboxPhoto();
    }

    function showNextPhoto() {
        currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxPhotos.length;
        updateLightboxPhoto();
    }

    function initAlbumsGallery() {
        const albumCards = document.querySelectorAll('.album-card');
        const albumModal = document.getElementById('albumModal');
        const modalClose = document.querySelector('.album-modal-close');
        
        albumCards.forEach(card => {
            card.addEventListener('click', () => {
                const albumId = parseInt(card.dataset.albumId);
                openAlbum(albumId);
            });
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', closeAlbumModal);
        }
        
        if (albumModal) {
            albumModal.addEventListener('click', (e) => {
                if (e.target === albumModal) closeAlbumModal();
            });
        }
        
        const lightbox = document.getElementById('lightboxVk');
        const closeBtn = document.querySelector('.lightbox-vk-close');
        const prevBtn = document.querySelector('.lightbox-vk-prev');
        const nextBtn = document.querySelector('.lightbox-vk-next');
        
        if (closeBtn) closeBtn.addEventListener('click', closeVkLightbox);
        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevPhoto(); });
        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextPhoto(); });
        if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeVkLightbox(); });
        
        initAlbumsFilters();
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAlbumModal();
                closeVkLightbox();
            }
        });
    }

    function initAlbumsFilters() {
        const filters = document.querySelectorAll('.gallery-filter');
        const albums = document.querySelectorAll('.album-card');
        
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                const filterValue = filter.dataset.filter;
                
                albums.forEach(album => {
                    if (filterValue === 'all' || album.dataset.year === filterValue) {
                        album.style.display = 'block';
                        setTimeout(() => {
                            album.style.opacity = '1';
                            album.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        album.style.opacity = '0';
                        album.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            album.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ЗАПУСК
    initTrailerVideo();
    initAlbumsGallery();

    function initImageLoading() {
        const images = document.querySelectorAll('.album-main-photo, .album-photo-item img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => img.classList.add('loaded'));
                img.addEventListener('error', () => img.classList.add('loaded'));
            }
        });
    }
    
    setTimeout(initImageLoading, 500);
});