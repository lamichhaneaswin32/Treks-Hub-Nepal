 
    const select = document.getElementById("regionSelect");
    const regionCards = document.querySelectorAll(".region-card");

    select.addEventListener("change", () => {
      const selected = select.value;
      regionCards.forEach(card => {
        const match = card.dataset.region;
        card.style.display = selected === "all" || selected === match ? "block" : "none";
      });
    });
function resizeIframe(iframe) {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + '1000px';
        }
        // ========== SECTION INTERACTIONS ==========
document.getElementById('planBtn').addEventListener('click', () => {
  window.location.href = 
    'mailto:bookings@trekhubnepal.com'
    + '?subject=Planning%20My%20Adventure'
    + '&body=Hi%20Trek%20Hub%20Nepal,%0A%0AI’d%20like%20to%20plan%20my%20next%20trip…';
});

// const tourBtn = document.getElementById('tourBtn');
// const modal   = document.getElementById('tourModal');
// const close   = document.getElementById('closeModal');

// tourBtn.addEventListener('click', () => modal.classList.add('active'));
// close.addEventListener('click', () => modal.classList.remove('active'));
// window.addEventListener('click', e => {
//   if (e.target === modal) modal.classList.remove('active');
// });
document.addEventListener('DOMContentLoaded', () => {
      const counters = document.querySelectorAll('.counter');

      counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;
        // number of steps; lower = faster animation
        const steps = 100;
        const increment = target / steps;
        const duration = 20; // ms between increments

        const update = () => {
          count += increment;
          if (count < target) {
            counter.innerText = Math.floor(count);
            setTimeout(update, duration);
          } else {
            counter.innerText = target;
          }
        };

        update();
      });
    });

  // Tab switching
  document.querySelectorAll('.tab-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-buttons button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.region-content').forEach(rc => rc.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.region).classList.add('active');
    });
  });

  // Sliders
  document.querySelectorAll('.slider').forEach(slider => {
    const slides = slider.querySelector('.slides');
    const imgs   = slides.querySelectorAll('img');
    let idx = 0, max = imgs.length;

    // show slide at index
    const show = () => {
      slides.style.transform = `translateX(-${idx * 100}%)`;
    };

    slider.querySelector('.next').addEventListener('click', () => {
      idx = (idx + 1) % max;
      show();
    });
    slider.querySelector('.prev').addEventListener('click', () => {
      idx = (idx - 1 + max) % max;
      show();
    });
  });

   const tourBtn= document.getElementById('tourBtn');
    const modal     = document.getElementById('tourModal');
    const closeBtn  = document.getElementById('closeModal');
    const tourVideo = document.getElementById('tourVideo');

    // Open modal & (optionally) autoplay
    tourBtn.addEventListener('click', () => {
      modal.classList.add('active');
      // tourVideo.play(); // Uncomment to auto-play
    });

    // Close function: hide modal + pause + reset
    function closeTour() {
      modal.classList.remove('active');
      tourVideo.pause();
      tourVideo.currentTime = 0;
    }

    // Close on "×"
    closeBtn.addEventListener('click', closeTour);

    // Close on clicking outside content
    modal.addEventListener('click', e => {
      if (e.target === modal) closeTour();
    });

