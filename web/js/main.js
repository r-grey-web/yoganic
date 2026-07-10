"use strict";

// スピナー
const spinner = document.querySelector("#spinner");

if (spinner) {
    setTimeout(() => {
        spinner.classList.remove("show");
    }, 1);
}

// 固定ナビバー ＆ トップへ戻るボタン
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

//　Swiper 初期化
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
            clickable: false,
        },
        loop: true,
        breakpoints: {
            // レスポンシブ設定
            320: { slidesPerView: 1 },
            599.98: { slidesPerView: 2 },
            880.98: { slidesPerView: 3 }
        },
        a11y: {
            enabled: true,
            prevSlideMessage: "前のお客様の声を表示",
            nextSlideMessage: "次のお客様の声を表示",
        },
    });
}

//　AOS 初期化
if (typeof AOS !== "undefined") {
    AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-sine',
    });
}

// レスポンシブ　スクロールメニュー
const header = document.getElementById('rp-scroll-header');
const drawer = document.getElementById('rp-drawer-menu');
const overlay = document.getElementById('menu-overlay');
const humButtons = document.querySelectorAll('.menu-trigger');
const closeBtn = document.getElementById('menu-close');
const navLinks = document.querySelectorAll('.nav-link, .fl-nav-link');

// ドロワーメニューのinert属性の切り替え
const updateDrawerInert = () => {
    if (!drawer) return;

    const isOpen = drawer.classList.contains('is-on');
    const isMobile = window.innerWidth < 1640;

    drawer.inert = !isOpen || !isMobile;

};

// 1640pxでナビゲーションのレイアウトを切り替える
const switchNavbar = () => {
    if (!navbar || !drawer) return;

    const isMobile = window.innerWidth < 1640;

    navbar.classList.toggle('navbar-expand-xxl', !isMobile);
    updateDrawerInert();
};

switchNavbar();
window.addEventListener('resize', switchNavbar);

window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // デスクトップ／モバイルのヘッダーの切り替え
    if (window.innerWidth >= 1640) {
        if (header) {
            header.classList.remove('show');
            header.classList.add('d-none');
        }
        return;
    }

    // スクロール時にモバイルヘッダーの表示・非表示を切り替える
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


// スクロールスパイ
const mainSections = document.querySelectorAll("#home, section");
const mainNavLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".fl-nav-link");

const setActiveNav = (id) => {
    mainNavLinks.forEach((link) => {
        link.classList.remove("is-active");
    });

    mobileNavLinks.forEach((link) => {
        link.classList.remove("is-active");
    });

    const targetMain = document.querySelector(`.nav-link[href="#${id}"]`);
    const targetMobile = document.querySelector(`.fl-nav-link[href="#${id}"]`);

    if (targetMain) {
        targetMain.classList.add("is-active");
    }

    if (targetMobile) {
        targetMobile.classList.add("is-active");
    }
};

const options = {
    root: null,
    rootMargin: "-45% 0px -54% 0px",
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        if (id) {
            setActiveNav(id);
        }

    });
}, options);

mainSections.forEach((section) => {
    observer.observe(section);
});

const updateHomeActive = () => {
    if (window.scrollY === 0) {
        setActiveNav("home");
    }
};

updateHomeActive();
window.addEventListener("scroll", updateHomeActive);

// アコーディオン
document.querySelectorAll('details').forEach((el) => {
    const summary = el.querySelector('summary');
    const content = el.querySelector('.faq-answer');

    summary.addEventListener('click', (e) => {
        e.preventDefault();

        if (el.dataset.animating === 'true') return;

        if (el.open) {
            // 閉じる
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

            // 開く
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

