// script.js
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.number');

  counters.forEach(counter => {
    const updateCount = () => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const current = parseFloat(counter.innerText);
      const increment = target / 200;

      if (current < target) {
        counter.innerText = (current + increment).toFixed(target % 1 !== 0 ? 1 : 0);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
});
// script.js
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.count');
  const animatedItems = document.querySelectorAll('[data-animate]');

  // Count-up animation
  const animateCount = (el) => {
    const target = +el.getAttribute('data-target');
    const increment = target / 100;
    let current = 0;

    const update = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };
    update();
  };

  // Intersection Observer for scroll-in animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const countEl = entry.target.querySelector('.count');
        if (countEl) animateCount(countEl);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  animatedItems.forEach(item => observer.observe(item));
});
const gearItems = [
      {
        name: "Trekking Poles",
        category: "essential",
        features: "Carbon Fiber | Adjustable Height",
        rating: "4.6 (127 reviews)",
        price: 5,
        oldPrice: 8,
       image: "file:///D:/thn/images/trekkingpoles.jpeg"
      },
      {
        name: "Down Jacket",
        category: "clothing",
        features: "Insulated | Windproof",
        rating: "4.8 (98 reviews)",
        price: 7,
        oldPrice: 10,
        image: "file:///D:/thn/images/downjacket.jpeg"
      },
      {
        name: "Climbing Harness",
        category: "technical",
        features: "Adjustable | Lightweight",
        rating: "4.5 (76 reviews)",
        price: 6,
        oldPrice: 9,
        image: "file:///D:/thn/images/harness.jpeg"
      },
      {
        name: "Sleeping Bag",
        category: "comfort",
        features: "Cold Rated | Compact",
        rating: "4.7 (112 reviews)",
        price: 6,
        oldPrice: 9,
        image: "file:///D:/thn/images/sleepingbag.jpeg"
      },
      {
        name: "Headlamp",
        category: "essential",
        features: "LED | Waterproof",
        rating: "4.5 (234 reviews)",
        price: 3,
        oldPrice: 5,
        image: "file:///D:/thn/images/headlamp.jpeg"
      },
      {
        name: "Rain Cover",
        category: "essential",
        features: "Universal Fit | Waterproof",
        rating: "4.3 (89 reviews)",
        price: 2,
        oldPrice: 4,
        image: "file:///D:/thn/images/raincover.jpeg"
      },
      {
        name: "Thermal Gloves",
        category: "clothing",
        features: "Touchscreen | Insulated",
        rating: "4.6 (67 reviews)",
        price: 4,
        oldPrice: 6,
        image: "file:///D:/thn/images/thermalgloves.jpeg"
      },
      {
        name: "Water Purifier",
        category: "technical",
        features: "UV Sterilizer | Tablets",
        rating: "4.4 (78 reviews)",
        price: 4,
        oldPrice: 6,
        image: "file:///D:/thn/images/purifier.jpeg"
      }
    ];

    const catalog = document.getElementById('catalog');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('[data-category]');

    function renderCatalog(items) {
      catalog.innerHTML = '';
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product';
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h2>${item.name}</h2>
          <div class="rating">⭐ ${item.rating}</div>
          <div class="features">${item.features}</div>
          <div class="price">$${item.price}/day <span class="old-price">$${item.oldPrice}/day</span></div>
          <button onclick="addToCart('${item.name}')">Add to Cart</button>
        `;
        catalog.appendChild(card);
      });
    }

    function addToCart(name) {
      alert(`${name} has been added to your cart.`);
    }

    function filterCatalog(category) {
      const query = searchInput.value.toLowerCase();
      const filtered = gearItems.filter(item => {
        const matchesCategory = category === 'all' || item.category === category;
        const matchesSearch = item.name.toLowerCase().includes(query) || item.features.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      });
      renderCatalog(filtered);
    }

    searchInput.addEventListener('input', () => {
      const activeCategory = document.querySelector('.controls button.active')?.dataset.category || 'all';
      filterCatalog(activeCategory);
    });

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterCatalog(btn.dataset.category);
      });
    });

    // Initial render
    renderCatalog(gearItems);
    function toggleStep(step) {
      step.classList.toggle('active');
    }

