//Blog Categories (if a selectbox)
let blogCategories = {
    elem: document.querySelector('select#blog_categories'),
    init: function () {
        if (this.elem) {
            this.elem.addEventListener('change', function (e) {
                window.location.href = window.location.href.split('?')[0] + '?category=' + e.target.value
            })
        }
    },
}.init()

//Responsive iFrame
$('iframe[src*="youtube"],iframe[src*="vimeo"]').wrap('<div class="responsive-iframe"/>')

//Accordion
document.addEventListener('DOMContentLoaded', function () {
    let accordion = document.querySelectorAll('.accordion-title')

    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener('click', function () {
            let panel = this.nextElementSibling

            if (panel.style.maxHeight) {
                this.classList.remove('open')
                panel.style.maxHeight = null
                panel.setAttribute('aria-hidden', true)
                panel.setAttribute('aria-expanded', false)
            } else {
                this.classList.add('open')
                panel.style.maxHeight = panel.scrollHeight + 'px'
                panel.setAttribute('aria-hidden', false)
                panel.setAttribute('aria-expanded', true)
            }
        })
    }
})

//Statistics Counter
document.addEventListener('DOMContentLoaded', function () {
    const stats = document.querySelectorAll('.statistics-item')
    if (stats) {
        for (let i = 0; i < stats.length; i++) {
            const elem = stats[i].querySelector('.value')

            let v = elem.textContent.replace(',', '')
            const s = +v * 0.8
            const steps = getRange(+v, s, 32)

            elem.textContent = steps[0]
            elem.setAttribute('data-arr', steps)

            let timer = 40
            let index = 0.15 * i + 0.35
            log(0)

            function log(x) {
                if (x < steps.length) {
                    setTimeout(function () {
                        elem.textContent = steps[x].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        x++
                        timer = timer * 1.04 + 0.07 * x + index
                        log(x)
                    }, timer)
                }
            }
        }
    }

    function getRange(upper, lower, steps) {
        const difference = upper - lower
        const increment = difference / (steps - 1)
        return [
            +lower.toFixed(0),
            ...Array(steps - 2)
                .fill('')
                .map((_, index) => +(lower + increment * (index + 1)).toFixed(0)),
            upper,
        ]
    }
})

//Flickity Carousel
$('.carousel .group').flickity({
    cellSelector: '.slide',
    wrapAround: true,
    adaptiveHeight: false,
    cellAlign: 'center',
    prevNextButtons: false,
    pageDots: true,
    imagesLoaded: true,
    autoPlay: 8000,
})

$('.slideshow .container').flickity({
    cellSelector: '.slide',
    wrapAround: true,
    adaptiveHeight: false,
    cellAlign: 'center',
    prevNextButtons: false,
    pageDots: true,
    imagesLoaded: true,
    autoPlay: 5000,
})

$('.impression .images').flickity({
    cellSelector: '.image',
    wrapAround: true,
    adaptiveHeight: false,
    cellAlign: 'center',
    prevNextButtons: false,
    pageDots: true,
    imagesLoaded: true,
    autoPlay: 5000,
    selectedAttraction: 0.01,
    friction: 0.2,
})

//Universal Tables
$('table').wrap("<div class='universal-table'></div>")

//PDO Page loader
document.addEventListener('DOMContentLoaded', function () {
    let pdoElement = document.getElementById('pdopage')
    if (pdoElement) {
        let loadState = document.createElement('div')
        loadState.classList.add('pdo-loader')
        loadState.setAttribute('aria-hidden', true)
        //loadState.textContent = 'Loading';

        pdoElement.appendChild(loadState)

        if (pdoPage) {
            pdoPage.callbacks['before'] = function (config) {
                document.querySelector('.pdo-loader').classList.add('pdo-loading')
            }
            pdoPage.callbacks['after'] = function (config) {
                document.querySelector('.pdo-loader').classList.remove('pdo-loading')
            }
        }
    }
})
