// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 모바일 토글 (현재 HTML 구조에 맞게)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 메뉴 링크 클릭 시 모바일 메뉴 닫기
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // 스크롤 시 활성 링크 표시
    const sections = document.querySelectorAll('.section-card');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // 썸네일 갤러리 기능 (여러 갤러리 지원)
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const fullSrc = this.getAttribute('data-full-src');
                const targetId = this.getAttribute('data-target');
                
                if (fullSrc && targetId) {
                    const mainImage = document.getElementById(targetId);
                    
                    if (mainImage) {
                        // 메인 이미지 변경
                        mainImage.style.opacity = '0.5';
                        
                        setTimeout(() => {
                            mainImage.src = fullSrc;
                            mainImage.style.opacity = '1';
                        }, 150);
                        
                        // 같은 갤러리의 활성 썸네일만 변경
                        const galleryThumbnails = this.parentElement.querySelectorAll('.thumbnail');
                        galleryThumbnails.forEach(thumb => thumb.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });
    }
    
    // 부드러운 스크롤
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
});
