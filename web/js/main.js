"use strict";

// Spinner
const spinner = document.querySelector("#spinner");

if (spinner) {
    setTimeout(() => {
        spinner.classList.remove("show");
    }, 1);
}

// Sticky Navbar & Back To Top
const navbar = document.querySelector(".navbar");
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (navbar) {
        if (window.scrollY > 45) {
            navbar.classList.add("sticky-top", "shadow-sm");
        } else {
            navbar.classList.remove("sticky-top", "shadow-sm");
        }
    }

    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add("is-show");
        } else {
            backToTop.classList.remove("is-show");
        }
    }
});

//　Swiper initialization
const swiperElement = document.querySelector(".mySwiper");

if (swiperElement) {
    new Swiper(swiperElement, {
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
        },
        a11y: {
            enabled: false
        },
    });
}

document.querySelector(".swiper-button-prev")
    ?.setAttribute("aria-label", "前のお客様の声を表示");

document.querySelector(".swiper-button-next")
    ?.setAttribute("aria-label", "次のお客様の声を表示");

document.querySelectorAll(".swiper-pagination-bullet").forEach((bullet, index) => {
    bullet.setAttribute("aria-label", `${index + 1}件目のお客様の声を表示`);
});

//　AOS Initialization
if (typeof AOS !== "undefined") {
    AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-sine',
    });
}

// // Responsive Scroll Menu
document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('rp-scroll-header');
    const drawer = document.getElementById('rp-drawer-menu');
    const overlay = document.getElementById('menu-overlay');
    const humButtons = document.querySelectorAll('.menu-trigger');
    const closeBtn = document.getElementById('menu-close');
    const navLinks = document.querySelectorAll('.nav-link, .fl-nav-link');
    const navbar = document.querySelector('.navbar');

    // ドロワーメニューのinert属性の切り替え
    const updateDrawerInert = () => {
        if (!drawer) return;

        const isOpen = drawer.classList.contains('is-on');
        const isMobile = window.innerWidth < 1640;

        drawer.inert = !isOpen || !isMobile;

    };

    // // Toggle navigation layout at 1640px
    const switchNavbar = () => {
        if (!navbar || !drawer) return;

        const isMobile = window.innerWidth < 1640;

        navbar.classList.toggle('navbar-expand-xxl', !isMobile);
        updateDrawerInert();
    };

    switchNavbar();
    // ※意味聞く
    window.addEventListener('resize', switchNavbar);

    window.addEventListener('scroll', () => {
        const y = window.scrollY;

        // // Desktop / Mobile Behavior Switch
        if (window.innerWidth >= 1640) {
            if (header) {
                header.classList.remove('show');
                header.classList.add('d-none');
            }
            return;
        }

        // // Toggle mobile header visibility on scroll
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

            const isOpen = drawer.classList.contains('is-on');

            updateDrawerInert();

            humButtons.forEach(btn => {
                btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });

            drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
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


// Scrollspy Start
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

// Accordion Menu
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
});

