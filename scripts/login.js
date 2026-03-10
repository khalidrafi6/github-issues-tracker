const loginBtn = document.querySelector("#login-btn");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
  if (username.value === "admin" && password.value === "admin123") {
    window.location.assign("./issues.html");
  } else {
    alert("Invalid username or password! Please use default credentials.");
  }
});
