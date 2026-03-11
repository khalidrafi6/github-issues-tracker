const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const loginData = new FormData(loginForm);

  const demoData = new FormData();

  demoData.append("username", "admin");
  demoData.append("password", "admin123");

  if (JSON.stringify(loginData) === JSON.stringify(demoData)) {
    window.location.assign("./issues.html");
  } else {
    alert("Invalid username or password! Please use demo credentials.");
  }
});
