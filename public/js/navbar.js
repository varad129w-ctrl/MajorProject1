const token = localStorage.getItem("token");
const userString = localStorage.getItem("user");

const navAuth = document.getElementById("nav-auth");

if (token && userString) {
  const user = JSON.parse(userString);
  navAuth.innerHTML = `
    <span><a href= "home.html" >${user.name}</a></span>
    <a href="#" id="logoutbtn">Log Out</a>
  `;
  document.getElementById("logoutbtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "destinations.html";
  });
}else {
  navAuth.innerHTML = `
    <a href="signup.html">Log in</a>
    <a href="signup.html" class="btn-signup">Sign up</a>
  `;
}