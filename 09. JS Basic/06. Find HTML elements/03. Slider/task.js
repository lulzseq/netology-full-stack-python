const sliders = Array.from(document.querySelectorAll('.slider__item'));
const slidersDot = Array.from(document.querySelectorAll('.slider__dot'));
const slidePrev = document.getElementsByClassName('slider__arrow_prev')[0];
const slideNext = document.getElementsByClassName('slider__arrow_next')[0];


function deactivateActiveSlide() {
    const activeSlide = sliders.findIndex(slide => slide.className.includes('slider__item_active'));

    if (activeSlide != -1) {
        sliders[activeSlide].className = 'slider__item';
        slidersDot[activeSlide].className = 'slider__dot';
    }

    return activeSlide;
}

function nextSlide(searchDirection) {
    const activeSlide = deactivateActiveSlide();

    if (activeSlide != -1) {
        let nextActiveSlide;

        if (searchDirection) {
            nextActiveSlide = (activeSlide == (sliders.length-1)) ? 0 : (activeSlide + 1);
        } else {
            nextActiveSlide = (activeSlide == 0) ? (sliders.length - 1) : (activeSlide - 1);
        }

        sliders[nextActiveSlide].className = 'slider__item slider__item_active';
        slidersDot[nextActiveSlide].className = 'slider__dot slider__dot_active';
    }
}

slidePrev.onclick = () => {
    nextSlide(0);
}

slideNext.onclick = () => {
    nextSlide(1);
}

for (let dot of slidersDot) {
    dot.onclick = () => {
        deactivateActiveSlide();
        sliders[slidersDot.indexOf(dot)].className = 'slider__item slider__item_active';
        dot.className = 'slider__dot slider__dot_active';
}
}