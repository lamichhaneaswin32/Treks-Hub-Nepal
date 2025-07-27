 document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  const animationSpeed = 200; // smaller = faster

  // Animate a single counter from 0 → target
  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / animationSpeed;
    let current = 0;

    const update = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  };

  // Use IntersectionObserver to trigger when counters scroll into view
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
});

 const filters   = document.querySelectorAll('.filter');
  const cards     = document.querySelectorAll('.guide-card');
  const searchBox = document.getElementById('searchBox');

  // CATEGORY FILTERING
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      // mark active filter
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      cards.forEach(card => {
        // show if matches or if “all”
        const match = (category === 'all' || card.dataset.category === category);
        card.style.display = match ? 'block' : 'none';
      });

      // clear any search term
      searchBox.value = '';
    });
  });

  // LIVE SEARCH (overrides category filter)
  searchBox.addEventListener('input', e => {
    const term = e.target.value.toLowerCase();

    // reset filters’ active state
    filters.forEach(b => b.classList.remove('active'));

    cards.forEach(card => {
      // match against data-keywords string
      const keywords = card.dataset.keywords.toLowerCase();
      card.style.display = keywords.includes(term) ? 'block' : 'none';
    });
  });