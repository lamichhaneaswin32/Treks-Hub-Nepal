function Booking() {
      document.getElementById("overlay").style.display = "block";
      document.getElementById("popupForm").style.display = "block";
    }

    function closeForm() {
      document.getElementById("overlay").style.display = "none";
      document.getElementById("popupForm").style.display = "none";
    }

    document.getElementById("bookingForm").addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Thank you for your booking!");
      closeForm();
    });
     document.addEventListener('DOMContentLoaded', () => {
      const searchInput = document.getElementById('search-input');
      const filterButtons = document.querySelectorAll('.filter-btn');
      const guides = Array.from(document.querySelectorAll('.guide'));
      let currentFilter = 'all';

      function applyFilters() {
        const term = searchInput.value.trim().toLowerCase();

        guides.forEach(guide => {
          const {
            name,
            category,
            region,
            languages,
            specialties,
            availability,
            rating
          } = guide.dataset;

          const text = [name, category, region, languages, specialties, availability]
            .join(' ')
            .toLowerCase();

          let visible = text.includes(term);

          if (currentFilter === 'top-rated') {
            visible = visible && parseFloat(rating) >= 9.0;
          } else if (currentFilter !== 'all') {
            visible = visible && category === currentFilter;
          }

          guide.style.display = visible ? 'block' : 'none';
        });
      }

      searchInput.addEventListener('input', applyFilters);

      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentFilter = btn.dataset.filter;

          if (currentFilter === 'random') {
            guides.forEach(g => (g.style.display = 'none'));
            const idx = Math.floor(Math.random() * guides.length);
            guides[idx].style.display = 'block';
          } else {
            applyFilters();

            if (currentFilter === 'top-rated') {
              const visibleGuides = guides
                .filter(g => g.style.display !== 'none')
                .sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating))
                .slice(0, 3);

              guides.forEach(g => (g.style.display = 'none'));
              visibleGuides.forEach(g => (g.style.display = 'block'));
            }
          }
        });
      });

      applyFilters();
    });
    document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".stat-card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
    });
  });
});
