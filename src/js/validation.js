"use strict"

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.feed-form');

    form.addEventListener('submit', (e) => {
        let errors = 0;
        e.preventDefault();
        const formRequire = document.querySelectorAll('.req');
        formRequire.forEach((input) => {
            removeErrorClass(input)
            if (input.id === 'input-email') {
                if (!emailCheck(input)) {
                        addErrorClass(input);
                        errors++;
                    }
            } else if (input.value === '') {
                addErrorClass(input);
                errors++;
            }
        })
    });

    function emailCheck(input) {
        return input.value.indexOf('@') > 0 &&
            input.value.indexOf('.') > 0
    }

    function removeErrorClass(input) {
        input.classList.remove('input_error');
    }

    function addErrorClass(input) {
        input.classList.add('input_error');
    }
});

