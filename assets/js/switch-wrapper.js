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
        moonParticle();
    }

    toggle.addEventListener('click', function () {
        const isCchecked = input.checked;
        if (isCheked) {
            body.classList.remove('night');
            sunParticle();
        } else {
            body.classList.add('night');
            moonParticle();
        }
    });
});

function sunParticle() {
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 30,
                density: {enable: !0, value_area: 800}
            },
            color: {value: "#ffffff"},
            shape: {
                type: "polygon",
                stroke: {width: 0, color: "#000000"},
                polygon: {nb_sides: 5},
                image: {src: "img/sun.svg", width: 100, height: 100}
            },
            opacity: {value: .5, random: !1, anim: {enable: !1, speed: 1, opacity_min: .1, sync: !1}},
            size: {value: 3, random: !0, anim: {enable: !1, speed: 19.18081918081918, size_min: .1, sync: !1}},
            line_linked: {enable: !0, distance: 150, color: "#ffffff", opacity: .4, width: 1},
            move: {
                enable: !0,
                speed: 4,
                direction: "none",
                random: !0,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {enable: !1, rotateX: 600, rotateY: 1200}
            },
            nb: 80
        },
        interactivity: {
            detect_on: "canvas",
            events: {onhover: {enable: !1, mode: "grab"}, onclick: {enable: !0, mode: "push"}, resize: !0},
            modes: {
                grab: {distance: 400, line_linked: {opacity: 1}},
                bubble: {distance: 400, size: 40, duration: 2, opacity: 8, speed: 3},
                repulse: {distance: 200, duration: .4},
                push: {particles_nb: 4},
                remove: {particles_nb: 2}
            }
        },
        retina_detect: !0
    })
}

function moonParticle() {
    particlesJS("particles-js", {
        "particles": {
            "number": {"value": 100, "density": {"enable": false, "value_area": 800}},
            "color": {"value": "#171c28"},
            "shape": {
                "type": "star",
                "stroke": {"width": 0, "color": "#171c28"},
                "polygon": {"nb_sides": 5},
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {"enable": false, "speed": 1, "opacity_min": 0.1, "sync": false}
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {"enable": false, "speed": 40, "size_min": 0.1, "sync": false}
            },
            "line_linked": {"enable": false, "distance": 150, "color": "#171c28", "opacity": 0.4, "width": 1},
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "bottom",
                "random": false,
                "straight": true,
                "out_mode": "out",
                "bounce": false,
                "attract": {"enable": false, "rotateX": 600, "rotateY": 1200}
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {"enable": false, "mode": "grab"},
                "onclick": {"enable": true, "mode": "repulse"},
                "resize": true
            },
            "modes": {
                "grab": {"distance": 200, "line_linked": {"opacity": 1}},
                "bubble": {"distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3},
                "repulse": {"distance": 200, "duration": 0.4},
                "push": {"particles_nb": 4},
                "remove": {"particles_nb": 2}
            }
        },
        "retina_detect": true
    });
}