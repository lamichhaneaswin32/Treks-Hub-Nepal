// Tabs Switch Logic
const showLogin = document.getElementById("showLogin");
const showSignup = document.getElementById("showSignup");
const loginSection = document.getElementById("loginSection");
const signupSection = document.getElementById("signupSection");

showLogin.addEventListener("click", () => {
  signupSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
  showSignup.classList.remove("active");
  showLogin.classList.add("active");
});

showSignup.addEventListener("click", () => {
  loginSection.classList.add("hidden");
  signupSection.classList.remove("hidden");
  showLogin.classList.remove("active");
  showSignup.classList.add("active");
});

// LOGIN VALIDATION + AUTHENTICATION
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = e.target[0].value.trim();
  const password = e.target[1].value.trim();

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!password || password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  const storedUserJSON = localStorage.getItem(email);

  if (!storedUserJSON) {
    alert("No user found with this email.");
    return;
  }

  const storedUser = JSON.parse(storedUserJSON);

  if (storedUser.password !== password) {
    alert("Incorrect password.");
    return;
  }

//   alert(`Welcome back, ${storedUser.firstName}!`);
 sessionStorage.setItem("currentUser", email);
 window.location.href = "dashboard.html";
});

//SIGN-UP VALIDATION + STORAGE
document.getElementById("signupForm").addEventListener("submit", e => {
  e.preventDefault();

  const firstName = e.target[0].value.trim();
  const lastName = e.target[1].value.trim();
  const email = e.target[2].value.trim();
  const phone = e.target[3].value.trim();
  const location = e.target[4].value.trim();
  const experience = e.target[5].value;
  const password = e.target[6].value.trim();
  const confirmPassword = e.target[7].value.trim();

  const phoneRegex = /^\+977\d{10}$/; // Nepal phone format

  if (!firstName || !lastName) {
    alert("Please enter your full name.");
    return;
  }

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email.");
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert("Phone number must match +977XXXXXXXXX format.");
    return;
  }

  if (!location) {
    alert("Please enter your location.");
    return;
  }

  if (!experience) {
    alert("Please select your trekking experience.");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }


  if (localStorage.getItem(email)) {
    alert("An account with this email already exists.");
    return;
  }


  const newUser = {
    firstName,
    lastName,
    email,
    phone,
    location,
    experience,
    password
  };

  localStorage.setItem(email, JSON.stringify(newUser));

  alert("Account created! Welcome to Trek Hub Nepal.");


  showLogin.click();
});
