const input = document.getElementById("input");
const shortenBtn = document.getElementById("shorten");
const errorDiv = document.getElementById("warning");

shortenBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value === "") {
    errorDiv.innerHTML = "Please add a link";

    input.style.border = "2px solid red";
    input.classList.add("error");
    setTimeout(() => {
      input.style.border = "";
      input.classList.remove("error");
    }, 2000);
  } else {
    shortenBtn.disabled = true;
    shortenBtn.textContent = "Processing...";

    setTimeout(() => {
      let shorteningURL = input.value;

      document.getElementById("output").innerHTML = shorteningURL;

      shortenBtn.disabled = false;
      shortenBtn.textContent = "Shorten it!";
      input.value = "";
      document.querySelector(".drop-box").classList.add("drop-box--show");

      document.getElementById("warning").innerHTML = "";
    }, 2000);
  }
});

let copyBtn = document.getElementById("copy");

copyBtn.addEventListener("click", () => {
  let textToCopy = document.querySelector("#shortened-output a");

  let range = document.createRange();
  range.selectNode(textToCopy);

  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  document.execCommand("copy");

  copyBtn.textContent = "Copied!";
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 2000);
});

input.addEventListener("input", (event) => {
  let url = event.target.value;

  // Regular expression to validate URL format
  let urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  if (!urlPattern.test(url)) {
    errorDiv.textContent = "Invalid URL format";
    input.setCustomValidity("Invalid URL format");
    shortenBtn.disabled = true;
    shortenBtn.textContent = "Invalid URL";
  } else {
    errorDiv.textContent = "";
    input.setCustomValidity("");
    shortenBtn.disabled = false;
    shortenBtn.textContent = "Shorten It!";
  }
});

document.querySelector("form").addEventListener("submit", function (event) {
  if (!input.checkValidity()) {
    event.preventDefault();
    errorDiv.textContent = "Please enter a valid URL";
  }
});

document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".login-area").classList.add("is-visible");
  document.body.style.overflow = "hidden";
});

document.getElementById("close-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".login-area").classList.remove("is-visible");
  document.body.style.overflow = "auto";
});

document.getElementById("sign-up").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".sign-up-area").classList.add("is-visible");
  document.body.style.overflow = "hidden";
});

document.getElementById("close-btn-2").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".sign-up-area").classList.remove("is-visible");
  document.body.style.overflow = "auto";
});

document.getElementById("in-login").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".sign-up-area").classList.remove("is-visible");
  document.querySelector(".login-area").classList.add("is-visible");
});

document.getElementById("in-register").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".sign-up-area").classList.add("is-visible");
  document.querySelector(".login-area").classList.remove("is-visible");
});
const regBtn = document.getElementById("reg-btn");

regBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const username = document.getElementById("reg-username").value;
  const regPassword = document.getElementById("reg-password").value;
  const confirmRegPassword = document.getElementById(
    "confirm-reg-password"
  ).value;

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return false;
  } else if (username == "" || regPassword == "") {
    alert("All fields are required!");
    return false;
  } else if (regPassword != confirmRegPassword) {
    alert("Passwords do not match!");
    return false;
  } else {
    const userData = {
      email: email,
      username: username,
      password: regPassword,
    };
    console.log(userData);
  }
});

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

let hamburgarBtn = document.querySelector(".menu-bar");
hamburgarBtn.addEventListener("click", (e) => {
  e.preventDefault();

  hamburgarBtn.classList.toggle("active");

  if (hamburgarBtn.classList.contains("active")) {
    document.querySelector(".menu-ul").classList.add("nav-out-1");
    document.querySelector("nav .right").classList.add("nav-out-2");
  } else {
    document.querySelector(".menu-ul").classList.remove("nav-out-1");
    document.querySelector("nav .right").classList.remove("nav-out-2");
  }
});

// CLIENT SIDE URL SHORTENER
function shortenUrl() {
  let longUrl = input.value;
  let shortUrl = "shorti.fy/" + generateShortUrl();

  localStorage.setItem(shortUrl, longUrl);

  document.getElementById(
    "shortened-output"
  ).innerHTML = `<p><strong>Short URL:</strong> <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>`;
}

function generateShortUrl() {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortUrl = "";
  do {
    shortUrl = "";
    for (let i = 0; i < 6; i++) {
      shortUrl += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
  } while (localStorage.getItem(shortUrl));
  return shortUrl;
}

let path = window.location.pathname.substring(1);
let longUrl = localStorage.getItem(path);
if (longUrl) {
  window.location.href = longUrl;
} else if (path.startsWith("shorti.fy/")) {
  document.body.innerHTML = "<h1>Shortened URL not found</h1>";
}
