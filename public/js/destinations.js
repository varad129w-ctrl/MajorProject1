const API = "http://localhost:3000/api/destinations"

async function CardLoader() {
  try {
    let apidata = await fetch(API);
    let apijson = await apidata.json();
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
CardLoader()