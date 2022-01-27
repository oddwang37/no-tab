const slides = document.querySelectorAll('.slide'),
    buttons = document.querySelectorAll('button'),
    prev = document.querySelector('#leftArrow'),
    next = document.querySelector('#rightArrow'),
    sliderWrapper = document.querySelector('.slider-wrapper'),
    sliderInner = document.querySelector('.slider-inner'),
    width = +window.getComputedStyle(sliderWrapper).width.match(/\d+/g)[0],
    navWrapper = document.querySelector('.nav'),
    navItems = document.querySelectorAll('.nav-item');

//       Items Cloning   🤠🤠   ///
const firstSlide = slides[0],
    slidesLength = slides.length,
    lastSlide = slides[slidesLength - 1],
    firstClone = firstSlide.cloneNode(true),
    lastClone = lastSlide.cloneNode(true);

sliderInner.prepend(lastClone);
sliderInner.append(firstClone);


//      Stylization   🎨   //

sliderInner.style.width = 100 * (slides.length + 2) + '%';
sliderInner.style.left = `-${width}px`;
sliderInner.style.display = 'flex';
sliderWrapper.style.overflow = 'hidden';
slides.forEach(slide => {
    slide.style.width = width;
})

//          Positions initialization  🗺️  //
let initialPos = 0;
let finalPos = 0;
let buttonsEnabled = true;

//          Navigation initialization  🧭  //
let currentSlide = 0;
showActiveNav();

//          Slider controls   <---      ---->//

next.addEventListener('click', () => {
    initialPos = finalPos;
    finalPos+=width;
    // Проверка на последний слайд
    if (sliderInner.style.transform == `translateX(-${width * (slidesLength-1)}px)`) {
        disableButtons();
        const nextAnim = setInterval(() => {
            initialPos+=10;
            sliderInner.style.transform = `translateX(-${initialPos}px)`;
            if (initialPos >= finalPos) {
                clearInterval(nextAnim);
                enableButtons();
            // После завершения анимации переключаемся на оригинальный, не клонированный слайд
                sliderInner.style.transform = `translateX(0px)`;
                finalPos = 0;
            }
        }, 10)
        currentSlide = 0;
    } else {
        shiftSlide(initialPos, finalPos);
    }
    showActiveNav(currentSlide);
});


prev.addEventListener('click', () => {
    initialPos = finalPos;
    finalPos-=width;
    // Проверка на первый слайд 
    if ((sliderInner.style.transform == 'translateX(0px)' ||
    window.getComputedStyle(sliderInner).transform == 'none')) {
        disableButtons();
        const prevAnim = setInterval(() => {
            initialPos-=10;
            sliderInner.style.transform = `translateX(${-initialPos}px)`;
            if (initialPos <= finalPos) {
                clearInterval(prevAnim);
                //После завершения анимации переключаемся на оригинальный, не клонированный слайд
                sliderInner.style.transform = `translateX(-${width * (slidesLength - 1)}px)`;
                finalPos = width * (slidesLength - 1);
                enableButtons();
            }
        }, 10)
        currentSlide = slidesLength - 1;
        } else {
            shiftSlide(initialPos, finalPos);
    }
    showActiveNav(currentSlide);
});

//          Moving slides  <------ ------>//
function shiftSlide(first, last) {
    disableButtons();
    let step = 10;
    // Определение направления переключения слайда
    if (first < last) {
        // Определение скорости переключения
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

//              Navigation     🧭     //


let slidesPos = [];
// Определяется соответствие длины отступа и номера слайда
for (let i = 0; i < slidesLength; i++) {
    slidesPos[i] = i * width;
}

navWrapper.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('nav-item')) {
        navItems.forEach((item, i) => {
            if (e.target == item) {
                showActiveNav(i);
                currentSlide = i;
                initialPos = finalPos;
                finalPos = slidesPos[i];
                console.log(initialPos, finalPos);
                shiftSlide(initialPos, finalPos);
            }
        })
    }
})


function hideActiveNav() {
    navItems.forEach(item => {
        item.classList.remove('nav-item__active');
    })
}
function showActiveNav(i = 0) {
    hideActiveNav();
    navItems[i].classList.add('nav-item__active');
}

//                  Buttons      🆗       //
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


