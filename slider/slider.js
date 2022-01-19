const slides = document.querySelectorAll('.slide'),
    prev = document.querySelector('#leftArrow'),
    next = document.querySelector('#rightArrow'),
    sliderWrapper = document.querySelector('.slider-wrapper'),
    sliderInner = document.querySelector('.slider-inner'),
    width = +window.getComputedStyle(sliderWrapper).width.match(/\d+/g)[0];

const firstSlide = slides[0],
    slidesLength = slides.length,
    lastSlide = slides[slidesLength - 1],
    firstClone = firstSlide.cloneNode(true),
    lastClone = lastSlide.cloneNode(true);

sliderInner.prepend(lastClone);
sliderInner.append(firstClone);

let offset = 0;
let allowAnim = true,
animTime = 0;

sliderInner.style.width = 100 * (slides.length + 2) + '%';
sliderInner.style.left = `-${width}px`;
sliderInner.style.display = 'flex';
sliderWrapper.style.overflow = 'hidden';
let firstPos = 0;
let lastPos = 0;

slides.forEach(slide => {
    slide.style.width = width;
})


next.addEventListener('click', () => {
    firstPos = lastPos;
    lastPos+=width;
    if (sliderInner.style.transform == `translateX(-${width * (slidesLength-1)}px)`) {
        const nextAnim = setInterval(() => {
            firstPos+=10;
            sliderInner.style.transform = `translateX(-${firstPos}px)`;
            if (firstPos >= lastPos) {
                clearInterval(nextAnim);
                sliderInner.style.transform = `translateX(0px)`;
                lastPos = 0;
            }
        }, 10)
    } else {
        const nextAnim = setInterval(() => {
            firstPos+=10;
            sliderInner.style.transform = `translateX(-${firstPos}px)`;
            if (firstPos >= lastPos) {
                clearInterval(nextAnim);
            }
        }, 10)
    }
});


prev.addEventListener('click', () => {
    firstPos = lastPos;
    lastPos-=width;
    if (sliderInner.style.transform == 'translateX(0px)' ||
    window.getComputedStyle(sliderInner).transform == 'none') {
        const prevAnim = setInterval(() => {
            firstPos-=10;
            sliderInner.style.transform = `translateX(${-firstPos}px)`;
            if (firstPos <= lastPos) {
                clearInterval(prevAnim);
                sliderInner.style.transform = `translateX(-${width * (slidesLength - 1)}px)`;
                lastPos = width * (slidesLength - 1);
            }
        }, 10) 
        } else {
            const prevAnim = setInterval(() => {
                firstPos-=10;
                sliderInner.style.transform = `translateX(${-firstPos}px)`;
                if (firstPos <= lastPos) {
                    clearInterval(prevAnim);
                }
            }, 10)
    }
});
