const user = JSON.parse(localStorage.getItem("user"));
console.log(localStorage.getItem("user"));
console.log(localStorage.getItem("token"));

const API_BASE = window.location.origin.includes("127.0.0.1:5500") ? "http://localhost:3000" : "";
const API = `${API_BASE}/api/destinations`;

async function CardLoader() {
  try {
    let apidata = await fetch(API);
    let apijson = await apidata.json();
    console.log(apijson);
    let card = document.getElementById("destination-list");
    const destinationarray = apijson.destination; //this is array : of fetched API


    destinationarray.forEach(Element => {
      card.innerHTML += `
      <a href="destination_detail.html?id=${Element._id}" class="card-link">
      <div class="destination-card">
      <img src="${Element.CoverImg}">
      <div class="card-body">
      <p class="card-region">${Element.Region}</p>
      <h3>${Element.Destination}</h3>
      <p class="card-description">${Element.description}</p>
      </div>
      </div>
      </a>
  `
    });
  } catch (err) {
    alert("There is problem in fetching API , SORRY !")
  }
}
async function loginremover() {
  let navauth = document.querySelector(".nav-auth");
  console.log(navauth);
  navauth.innerHTML = `
      <a href="signup.html" class="btn-signup">Log Out</a>
    `
}
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "home.html";
}
document.querySelector(".btn-signup").addEventListener("click" , () => {
  logout();
})
loginremover();
CardLoader();