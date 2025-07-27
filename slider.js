document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.image-slider');
  const slidesEl = slider.querySelector('.slides');
  const slides = Array.from(slidesEl.children);
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');
  const dots = Array.from(slider.querySelectorAll('.dot'));
  let currentIndex = 0;
  const total = slides.length;

  // Set .slides width to accommodate all images
  slidesEl.style.width = `${total * 100}%`;
  slides.forEach(slide => {
    slide.style.width = `${100 / total}%`;
  });

  function updateSlider() {
    const percentage = 100 / total;
    slidesEl.style.transform = `translateX(-${currentIndex * percentage}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total;
    updateSlider();
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    updateSlider();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index, 10);
      updateSlider();
    });
  });

  let autoplay = setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    updateSlider();
  }, 5000);

  slider.addEventListener('mouseenter', () => clearInterval(autoplay));
  slider.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      currentIndex = (currentIndex + 1) % total;
      updateSlider();
    }, 5000);
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
});
