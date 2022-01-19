const slides = document.querySelectorAll('.slide'),
    buttons = document.querySelectorAll('button'),
    prev = document.querySelector('#leftArrow'),
    next = document.querySelector('#rightArrow'),
    sliderWrapper = document.querySelector('.slider-wrapper'),
    sliderInner = document.querySelector('.slider-inner'),
    width = +window.getComputedStyle(sliderWrapper).width.match(/\d+/g)[0],
    navWrapper = document.querySelector('.nav'),
    navItems = document.querySelectorAll('.nav-item');

const firstSlide = slides[0],
    slidesLength = slides.length,
    lastSlide = slides[slidesLength - 1],
    firstClone = firstSlide.cloneNode(true),
    lastClone = lastSlide.cloneNode(true);

sliderInner.prepend(lastClone);
sliderInner.append(firstClone);

showActiveNav();

let currentSlide = 0;
let buttonsEnabled = true;

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
        disableButtons();
        const nextAnim = setInterval(() => {
            firstPos+=10;
            sliderInner.style.transform = `translateX(-${firstPos}px)`;
            if (firstPos >= lastPos) {
                clearInterval(nextAnim);
                enableButtons();
                sliderInner.style.transform = `translateX(0px)`;
                lastPos = 0;
            }
        }, 10)
        currentSlide = 0;
    } else {
        shiftSlide(firstPos, lastPos);
    }
    showActiveNav(currentSlide);
});


prev.addEventListener('click', () => {
    firstPos = lastPos;
    lastPos-=width;
    if (sliderInner.style.transform == 'translateX(0px)' ||
    window.getComputedStyle(sliderInner).transform == 'none') {
        disableButtons();
        const prevAnim = setInterval(() => {
            firstPos-=10;
            sliderInner.style.transform = `translateX(${-firstPos}px)`;
            if (firstPos <= lastPos) {
                clearInterval(prevAnim);
                sliderInner.style.transform = `translateX(-${width * (slidesLength - 1)}px)`;
                lastPos = width * (slidesLength - 1);
                enableButtons();
            }
        }, 10)
        currentSlide = slidesLength - 1;
        } else {
            shiftSlide(firstPos, lastPos);
    }
    showActiveNav(currentSlide);
});

let slidesPos = [];

for (let i = 0; i < slidesLength; i++) {
    slidesPos[i] = i * width;
}

navWrapper.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('nav-item')) {
        navItems.forEach((item, i) => {
            if (e.target == item) {
                showActiveNav(i);
                currentSlide = i;
                firstPos = lastPos;
                lastPos = slidesPos[i];
                console.log(firstPos, lastPos);
                shiftSlide(firstPos, lastPos);
            }
        })
    }
})

function enableButtons() {
    buttons.forEach(item => {
        item.disabled = false;
    })
}

function disableButtons() {
    buttons.forEach(item => {
        item.disabled = true;
    })
}


function hideActiveNav() {
    navItems.forEach(item => {
        item.classList.remove('nav-item__active');
    })
}
function showActiveNav(i = 0) {
    hideActiveNav();
    navItems[i].classList.add('nav-item__active');
}

function shiftSlide(first, last) {
    disableButtons();
    let step = 10;
    if (first < last) {
        if (last - first > 1200) {step = 30} else
        if (last - first > 600) {step = 20};
        const forwardAnim = setInterval(() => {
            first+=step;
            sliderInner.style.transform = `translateX(-${first}px)`;
            if (first >= last) {
                clearInterval(forwardAnim);
                enableButtons();
            }
        }, 10)
        currentSlide++;
    } else if (first > last) {
        if (first - last > 1200) {step = 30} else
        if (first - last > 600) {step = 20};
        const backwardAnim = setInterval(() => {
            first-=step;
            sliderInner.style.transform = `translateX(${-first}px)`;
            if (first <= last) {
                clearInterval(backwardAnim);
                enableButtons();
            }
        }, 10)
        currentSlide--;
    }
}