document.addEventListener("DOMContentLoaded", () => {
  // 1. Ensure user is logged in
  const email = sessionStorage.getItem("currentUser");
  if (!email) {
    window.location.href = "dashboard.html";
    return;
  }

  // 2. Fetch user record from localStorage
  const userJSON = localStorage.getItem(email);
  if (!userJSON) {
    window.location.href = "dashboard.html";
    return;
  }
  const user = JSON.parse(userJSON);

  // 3. DOM references
  const welcomeEl      = document.getElementById("welcomeMessage");
  const profileEl      = document.getElementById("profile");
  const statsEls       = {
    treks:       document.getElementById("statTreks"),
    distance:    document.getElementById("statDistance"),
    peak:        document.getElementById("statPeak"),
    days:        document.getElementById("statDays"),
    countries:   document.getElementById("statCountries"),
    guides:      document.getElementById("statGuides")
  };
  const wrapperEl      = document.querySelector(".wrapper");

  // 4. Personalize greeting based on time of day
  function personalizeGreeting() {
    const hour = new Date().getHours();
    let greeting = "Welcome back";
    if (hour < 12)        greeting = "Good morning";
    else if (hour < 18)   greeting = "Good afternoon";
    else                   greeting = "Good evening";

    welcomeEl.textContent = `${greeting}, ${user.firstName}!`;
  }

  // 5. Show user profile details
  function displayProfile() {
    profileEl.innerHTML = `
      <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Location:</strong> ${user.location}</p>
      <p><strong>Experience:</strong> ${user.experience}</p>
    `;
  }

  // 6. Load and animate stats counters
  function animateCounter(el, target, suffix = "") {
    let count = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = setInterval(() => {
      count += step;
      if (count >= target) {
        el.textContent = `${target}${suffix}`;
        clearInterval(interval);
      } else {
        el.textContent = `${count}${suffix}`;
      }
    }, 16); // ~60fps
  }

  function displayStats() {
    // Replace these with real user‐specific values or API values
    const userStats = {
      treks:     12,
      distance:  342,    // in km
      peak:      6542,   // in m
      days:      92,
      countries: 5,
      guides:    7
    };

    animateCounter(statsEls.treks,     userStats.treks);
    animateCounter(statsEls.distance,  userStats.distance, " km");
    animateCounter(statsEls.peak,      userStats.peak,     " m");
    animateCounter(statsEls.days,      userStats.days);
    animateCounter(statsEls.countries, userStats.countries);
    animateCounter(statsEls.guides,    userStats.guides);
  }

  // 7. Apply experience‐based accent or theme
  function themeByExperience() {
    let accent = "#00796b"; // default
    if (user.experience === "Beginner")    accent = "#558b2f";
    if (user.experience === "Intermediate")accent = "#0288d1";
    if (user.experience === "Expert")      accent = "#6a1b9a";
    wrapperEl.style.borderTop = `8px solid ${accent}`;
  }

  // 8. Kickoff personalization
  personalizeGreeting();
  displayProfile();
  displayStats();
  themeByExperience();

  // 9. Logout handler remains unchanged
  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("currentUser");
    window.location.href = "loginform.html";
  });
});
// 9. Logout handler
// const logoutBtn = document.getElementById("logoutBtn");
// logoutBtn.addEventListener("click", e => {
//   e.preventDefault();                       // prevent any default navigation
//   sessionStorage.removeItem("currentUser"); // clear the stored user
//   window.location.href = "loginform.html";  // redirect to the login page
// });

