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

    // Back to top button
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 300) {
    //         $('.back-to-top').fadeIn('slow');
    //     } else {
    //         $('.back-to-top').fadeOut('slow');
    //     }
    // });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeInOutExpo');
        return false;
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

})(jQuery);

