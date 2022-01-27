document.addEventListener('DOMContentLoaded', () => {
    const mission = document.querySelector('.mission'),
    missionPhone = document.querySelector('.mission__screen'),
    missionText = document.querySelectorAll('.mission-text');



    if (screen.width > 768) {
        window.addEventListener('scroll', animationTrigger);
    }

    mission.style.overflow = 'hidden';


    function animationTrigger() {
        let windowTop = window.innerHeight + window.scrollY;
        let scrollOffset = mission.offsetTop + mission.offsetHeight / 2;
        if (windowTop >= scrollOffset) {
            missionAnimation();
            window.removeEventListener('scroll', animationTrigger);
            }
        }

    function missionAnimation() {
        let posPhoneLeft = -8,
            posPhoneTop = 0,
            posTextX = 0,
            deg = 90;

        const toRight = setInterval(phoneToRight, 15);
        const rotate = setInterval(phoneRotate, 15),
            toBottom = setInterval(phoneToBottom, 15),
            textRight = setInterval(textToRight, 10);
        


        function phoneToRight() {
            posPhoneLeft++;
            missionPhone.style.left = `${posPhoneLeft}%`;
            if (posPhoneLeft >= 50) {
                clearTimeout(toRight);
            }
        }

        function phoneRotate() {
            deg--;
            missionPhone.style.transform = `rotateZ(${deg}deg) translateX(-50%)`;
            if (deg <= 0) {
                clearInterval(rotate);
            }
        }

        function phoneToBottom() {
            posPhoneTop+=10;
            missionPhone.style.top = `${posPhoneTop}px`;
            if (posPhoneTop >= 200 && screen.width <= 1370) {
                clearInterval(toBottom);
            } else if (posPhoneTop >=120 && screen.width <= 996) {
                clearInterval(toBottom)
            } else if (posPhoneTop >= 350) {
                        clearInterval(toBottom);
                    }
            
        }

        function textToRight() {
            posTextX+=5;
            missionText.forEach(item => {
                item.style.transform = `translateX(${posTextX}px)`;
                item.classList.add('fadeOut');
            })
            if (posTextX > 800) {
                clearInterval(textRight);
            }
        }

    }
});

