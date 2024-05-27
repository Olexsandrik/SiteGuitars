async function fetchDataFromMultipleFiles() {
    const [mainImagesResponse] = await Promise.all([
        fetch('./api/info-slides.json')
    ]);

    const mainImagesData = await mainImagesResponse.json();
    return { mainImagesData };
}

const { mainImagesData } = await fetchDataFromMultipleFiles();

const slidesFirst = mainImagesData.map(image => 
    `<div class="slide"><img src="${image.imageSrc}" alt="${image.altText}"></div>`
);

let currentSlideIdx = 0;
const slideContainer = document.querySelector('.products-carousel__slides');
const indicators = document.querySelectorAll('.indicator');

function renderSlide() {
    

        slideContainer.innerHTML = slidesFirst[currentSlideIdx];
            
        const secondSlideIdx = currentSlideIdx + 1 >= slidesFirst.length ? 0 : currentSlideIdx + 1;
        slideContainer.classList.add("slide");
        slideContainer.innerHTML += slidesFirst[secondSlideIdx];
    
        const thirdSlideIdx = secondSlideIdx + 1 >= slidesFirst.length ? 0 : secondSlideIdx + 1;
        slideContainer.innerHTML += slidesFirst[thirdSlideIdx];
     
    indicators.forEach((indicator, index) => {
        indicator.checked = index === currentSlideIdx;
    });

}

function nextSlide() {
    const slides = window.matchMedia('(min-width:768px)').matches ? slidesFirst : slidesSecond;
    currentSlideIdx = (currentSlideIdx + 1) % slides.length;
    renderSlide();
}

function prevSlide() {
    const slides = window.matchMedia('(min-width:768px)').matches ? slidesFirst : slidesSecond;
    currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
    renderSlide();
}

function goToSlide(index) {
    currentSlideIdx = index;
    renderSlide();
}

indicators.forEach(indicator => {
    indicator.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.getAttribute('data-slide'), 10) - 1; 
        goToSlide(slideIndex);
    });
});

const btnPrev = document.querySelector('.product-carousel__btn-prev');
const btnNext = document.querySelector('.product-carousel__btn-next');

btnPrev.addEventListener('click', prevSlide);
btnNext.addEventListener('click', nextSlide);

window.addEventListener('resize', renderSlide);

renderSlide();
