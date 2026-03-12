const loginForm = document.querySelector("#login");
const demoData = new FormData();

demoData.append("username", "admin");
demoData.append("password", "admin123");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const loginData = new FormData(loginForm);

  if (
    JSON.stringify([...loginData.entries()]) ===
    JSON.stringify([...demoData.entries()])
  ) {
    window.location.assign("./issues.html");
  } else {
    alert("Invalid username or password! Please use demo credentials.");
  }
});
