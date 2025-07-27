// Slider
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4000);
});

// Booking
const pricePerPerson = 999;
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const count = document.getElementById("count");
const total = document.getElementById("total");

function updateTotal() {
  const travelers = parseInt(count.value);
  total.textContent = `$${travelers * pricePerPerson}`;
}

plus.addEventListener("click", () => {
  count.value = parseInt(count.value) + 1;
  updateTotal();
});

minus.addEventListener("click", () => {
  if (parseInt(count.value) > 1) {
    count.value = parseInt(count.value) - 1;
    updateTotal();
  }
});

updateTotal();

// Animate sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".itinerary, .map, .booking").forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  observer.observe(section);
});
// Weather API
const apiKey = '968a6a829488b7b16225bcae14b69d5a'; // replace with your key
    const city = 'Kathmandu';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherDiv = document.getElementById('weather');
        const temp = data.main.temp;
        const condition = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherDiv.innerHTML = `
          <p><strong>Temperature:</strong> ${temp}°C</p>
          <p><strong>Condition:</strong> ${condition}</p>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${condition}">
        `;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
      });
