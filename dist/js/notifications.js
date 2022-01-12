const cookiesNotif = document.querySelector('.cookies'),
    cookiesClose = document.querySelector('.cookies__button');

let pos = -100;

setTimeout(() => {
    requestAnimationFrame(cookiesSlideUp)
}, 3500);

cookiesClose.addEventListener('click', () => {
    cancelAnimationFrame(cookiesSlideUp);
    requestAnimationFrame(cookiesSlideDown);
})


function cookiesSlideUp() {
    pos+=5;
    cookiesNotif.style.bottom = pos + 'px';

    if (pos < 0) {
        requestAnimationFrame(cookiesSlideUp);
    }
}

function cookiesSlideDown() {
    pos-=5;
    cookiesNotif.style.bottom = pos + 'px';
    if (pos > -100) {
        requestAnimationFrame(cookiesSlideDown);
    }
}
