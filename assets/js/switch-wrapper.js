$(function () {
    const d = new Date();
    const hours = d.getHours();
    const night = hours >= 19 || hours <= 7;
    const body = document.querySelector('body');
    const toggle = document.getElementById('toggle');
    const input = document.getElementById('switch');

    if (night) {
        input.checked = true;
        body.classList.add('night');
    }

    toggle.addEventListener('click', function () {
        const isChecked = input.checked;
        if (isChecked) {
            body.classList.remove('night');
        } else {
            body.classList.add('night');
        }
    });
});