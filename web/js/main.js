(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('is-show');
        } else {
            $('.back-to-top').removeClass('is-show');
        }
    });

    // --- Swiperの初期化 ---
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        loop: true,
        breakpoints: {
            // レスポンシブ設定
            320: { slidesPerView: 1 },
            599.98: { slidesPerView: 2 },
            880.98: { slidesPerView: 3 }
        }
    });

    // --- AOSの初期化 ---
    AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-sine',
    });

    // レスポンシブ スクロール時のメニュー
    document.addEventListener('DOMContentLoaded', () => {

        const header = document.getElementById('rp-scroll-header');
        const drawer = document.getElementById('rp-drawer-menu');
        const overlay = document.getElementById('menu-overlay');
        const closeBtn = document.getElementById('menu-close');
        const navLinks = document.querySelectorAll('.nav-link, .fl-nav-link');

        window.addEventListener('scroll', () => {
            const y = window.scrollY;

            // 【PC/スマホ切り分け】
            if (window.innerWidth >= 1400) {
                if (header) {
                    header.classList.remove('show');
                    header.classList.add('d-none');
                }
                return;
            }

            // スマホ用ボタン表示
            if (header) {
                if (y === 0) {
                    header.classList.remove('show');
                    header.classList.add('d-none');
                } else {
                    header.classList.remove('d-none');
                    header.classList.add('show');
                }
            }
        });

        const toggleMenu = () => {
            if (drawer && overlay) {
                drawer.classList.toggle('is-on');
                overlay.classList.toggle('is-on');

                document.body.classList.toggle('is-drawer-open');
            }
        };

        document.querySelectorAll('.menu-trigger').forEach(btn => {
            btn.addEventListener('click', toggleMenu);
        });

        if (overlay) overlay.addEventListener('click', toggleMenu);
        if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (drawer && drawer.classList.contains('is-on')) {
                    toggleMenu();
                }
            });
        });
    });


    // Scrollspy (width > 1400px) Start
    const mainSections = document.querySelectorAll("#home, section");
    const mainNavLinks = document.querySelectorAll(".nav-link");
    const mobileNavLinks = document.querySelectorAll(".fl-nav-link");

    const options = {
        root: null,
        rootMargin: "-45% 0px -54% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");

                mobileNavLinks.forEach((link) => link.classList.remove("is-active"));
                mainNavLinks.forEach((link) => link.classList.remove("is-active"));

                const targetMain = document.querySelector(`.nav-link[href="#${id}"]`);
                const targetMobile = document.querySelector(`.fl-nav-link[href="#${id}"]`);

                if (targetMain) targetMain.classList.add("is-active");
                if (targetMobile) targetMobile.classList.add("is-active");
            }
        });
    }, options);

    mainSections.forEach((section) => {
        observer.observe(section);
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY === 0) {
            mainNavLinks.forEach((link) => link.classList.remove("is-active"));
            mobileNavLinks.forEach((link) => link.classList.remove("is-active"));

            const homeMain = document.querySelector(`.nav-link[href="#home"]`);
            const homeMobile = document.querySelector(`.fl-nav-link[href="#home"]`);

            if (homeMain) homeMain.classList.add("is-active");
            if (homeMobile) homeMobile.classList.add("is-active");
        }
    });
    // Scrollspy (width >= 1400px) End

    // Accordion Mune Start
    document.querySelectorAll('details').forEach((el) => {
        const summary = el.querySelector('summary');
        const content = el.querySelector('.faq-answer');

        summary.addEventListener('click', (e) => {
            e.preventDefault();

            if (el.dataset.animating === 'true') return;

            if (el.open) {
                // close
                el.dataset.animating = 'true';
                const closingAnim = content.animate([
                    { height: `${content.offsetHeight}px`, opacity: 1 },
                    { height: '0px', opacity: 0 }
                ], { duration: 400, easing: 'ease-out', fill: 'forwards' });

                closingAnim.onfinish = () => {
                    el.open = false;
                    el.dataset.animating = 'false';
                };

            } else {
                document.querySelectorAll('.faq-item[open]').forEach((openEl) => {
                    if (openEl !== el) {
                        const openContent = openEl.querySelector('.faq-answer');
                        const otherClosingAnim = openContent.animate([
                            { height: `${openContent.offsetHeight}px`, opacity: 1 },
                            { height: '0px', opacity: 0 }
                        ], { duration: 400, easing: 'ease-out', fill: 'forwards' });

                        otherClosingAnim.onfinish = () => {
                            openEl.open = false;
                        };
                    }
                });

                // open
                el.dataset.animating = 'true';
                el.open = true;

                const targetHeight = content.scrollHeight;
                const openingAnim = content.animate([
                    { height: '0px', opacity: 0 },
                    { height: `${targetHeight}px`, opacity: 1 }
                ], { duration: 400, easing: 'ease-out', fill: 'forwards' });

                openingAnim.onfinish = () => {
                    el.dataset.animating = 'false';
                    content.style.height = 'auto';
                };
            }
        });
    });// Accordion Mune End

})(jQuery);

