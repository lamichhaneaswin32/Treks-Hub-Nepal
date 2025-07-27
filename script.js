document.getElementById("trekBookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;
    const groupSize = document.getElementById("groupSize").value;

    if (!name || !email || !date || !groupSize) {
        alert("Please fill in all required fields.");
        return;
    }

    // Simulate booking process
    alert(`Thank you ${name}! Your booking for ${groupSize} person(s) starting on ${date} has been received.`);
    this.reset();
});
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4000);
});
//slider functionality for everest
// document.addEventListener("DOMContentLoaded", () => {
//   const slides = document.querySelectorAll(".slider-slide");
//   let current = 0;

//   function changeSlide() {
//     slides[current].classList.remove("active");
//     current = (current + 1) % slides.length;
//     slides[current].classList.add("active");
//   }

//   setInterval(changeSlide, 4000); // Change every 4 seconds
// });
