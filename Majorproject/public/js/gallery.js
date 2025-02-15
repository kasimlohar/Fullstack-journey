document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.activitySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        
        // Remove lazy loading
        preloadImages: true,
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
});
