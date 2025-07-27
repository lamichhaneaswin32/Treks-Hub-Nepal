document.addEventListener("DOMContentLoaded", () => {
  const overlay   = document.getElementById("overlay");
  const popup     = document.getElementById("popupForm");
  const openBtn   = document.querySelector(".book-now");
  const closeBtns = document.querySelectorAll(".close-btn, #overlay");
  const form      = document.getElementById("bookingForm");
  const dateInput = form.querySelector('input[name="date"]');
  const fields    = form.querySelectorAll("input, select, textarea");

  // 1. Set min date = today
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  // 2. Open popup
  function openForm() {
    overlay.classList.add("active");
    popup.classList.add("active");
  }

  // 3. Close popup
  function closeForm() {
    overlay.classList.remove("active");
    popup.classList.remove("active");
  }

  // 4. Animate labels (floating-label effect)
  fields.forEach(field => {
    field.addEventListener("focus", () => field.parentNode.classList.add("focused"));
    field.addEventListener("blur", () => {
      if (!field.value) field.parentNode.classList.remove("focused");
    });
  });

  // 5. Submit handler
  form.addEventListener("submit", e => {
    e.preventDefault();
    // Gather data (optional)
    const data = new FormData(form);
    // You could send `data` via fetch() here...
    alert(`Thanks, ${data.get("fullName")}! Your booking request has been received.`);
    form.reset();
    // remove all "focused" classes
    fields.forEach(f => f.parentNode.classList.remove("focused"));
    closeForm();
  });

  // 6. Wire up events
  openBtn.addEventListener("click", openForm);
  closeBtns.forEach(btn => btn.addEventListener("click", closeForm));
});
