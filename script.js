document.addEventListener("DOMContentLoaded", function() {
    let items = document.querySelectorAll('.slider .list .item');
    let prevBtn = document.getElementById('prev');
    let nextBtn = document.getElementById('next');
    let lastPosition = items.length - 1;
    let firstPosition = 0;
    let active = 0;

    // Retrieve the last active slide index from localStorage
    const lastActiveSlideIndex = localStorage.getItem("activeSlideIndex");

    // If there's a stored index, use it as active
    if (lastActiveSlideIndex !== null) {
        active = parseInt(lastActiveSlideIndex);
    }

    const setSlider = () => {
        let oldActive = document.querySelector('.slider .list .item.active');
        if (oldActive) oldActive.classList.remove('active');
        items[active].classList.add('active');
        nextBtn.classList.remove('d-none');
        prevBtn.classList.remove('d-none');
        if (active == lastPosition) nextBtn.classList.add('d-none');
        if (active == firstPosition) prevBtn.classList.add('d-none');
        
        // Store the current active slide index in localStorage
        localStorage.setItem("activeSlideIndex", active.toString());
    }

    nextBtn.onclick = () => {
        active = Math.min(active + 1, lastPosition);
        setSlider();
    }

    prevBtn.onclick = () => {
        active = Math.max(active - 1, firstPosition);
        setSlider();
    }

    setSlider();

    // Set diameter
    const setDiameter = () => {
        let slider = document.querySelector('.slider');
        let widthSlider = slider.offsetWidth;
        let heightSlider = slider.offsetHeight;
        let diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));
        document.documentElement.style.setProperty('--diameter', diameter + 'px');
    }

    setDiameter();
    window.addEventListener('resize', () => {
        setDiameter();
    });

    // Add keyboard event listener
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            active = Math.min(active + 1, lastPosition);
            setSlider();
        } else if (event.key === 'ArrowLeft') {
            active = Math.max(active - 1, firstPosition);
            setSlider();
        }
    });
});
