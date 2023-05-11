var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    autoplay: {
        delay: 2500,
        disableInteraction: false,
    },
    loop: true,
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});