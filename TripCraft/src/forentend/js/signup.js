const container = document.querySelector('.container');

document.getElementById('signintoggle').addEventListener('click', () => {
  container.classList.add('show');
  document.querySelector(".intropage").classList.add("show");
  document.querySelector(".createaccount").classList.add("show");
  document.querySelector(".welcomepage").classList.remove("show");
  document.querySelector(".loginaccount").classList.remove("show");
});

document.getElementById('signuptoggle').addEventListener('click', () => {
  container.classList.remove('show');
  document.querySelector(".welcomepage").classList.add("show");
  document.querySelector(".loginaccount").classList.add("show");
  document.querySelector(".intropage").classList.remove("show");
  document.querySelector(".createaccount").classList.remove("show");
});

document.getElementById("signupform").addEventListener("submit", async (e) => {
  e.preventDefault(e);
  const name = document.getElementById("signupname").value;
  const email = document.getElementById("signupemail").value;
  const password = document.getElementById("signuppassword").value;

  const response = await fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();
  console.log("status:", response.status);
  console.log("ok:", response.ok);
  console.log("data:", data);

  if (response.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "home.html";
  } else {
    alert(data.message);
  }
});
document.getElementById("loginform").addEventListener("submit", async (e) => {
  e.preventDefault(e);
  const email = document.getElementById("loginemail").value;
  const password = document.getElementById("loginpassword").value;

  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "home.html";
  } else {
    alert(data.message);
  }
});