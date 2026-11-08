const params = new URLSearchParams(window.location.search); //! very important this is for finding queries from url and getting ID
const id = params.get("id"); //this will get id from params
const APIBASE = `http://localhost:3000/api/destinations/${id}`


document.getElementById("destinationsLogged")
async function carddetails() {
  try {
    let apidata = await fetch(APIBASE);
    let dest = await apidata.json(); // single object, not an array therefore also no need of foreach loop!
    console.log(dest.Destination);
    let placesresponse = await fetch(`http://localhost:3000/api/places/${dest.Destination}`);
    let data = await placesresponse.json();
    console.log(data);
    let card = document.getElementById("detail-container");

    card.innerHTML = `<section class="detail-top">
      <img src="${dest.CoverImg}" alt="${dest.Destination}" class="detail-img">
      <div class="detail-info">
        <p class="card-region">${dest.Region}</p>
        <h1>${dest.Destination}</h1>
        <p class="detail-description">${dest.description}</p>
        <div class="detail-meta">
          <div class="meta-item">
            <span class="meta-label">Best time to visit</span>
            <span class="meta-value">${dest.bestTimeToVisit}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Weather</span>
            <span class="meta-value">${dest.AvgwhetherCondition}</span>
          </div>
        </div>
        <div class="detail-tags">
          ${dest.Tags.map(tag => `<span class="tag-pill">${tag}</span>`).join("")}
        </div>
      </div>
    </section>
    
    <!-- Places API -->
    <!-- Popular Places -->
<section class="detail-below">
  <h2>Popular Places</h2>

  <div id="popular-places">
    ${data.spots.map(spot => `
      <p class="placeholder-text">
        <a 
          href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot + ', ' + dest.Destination + ', India')}"
          target="_blank"
          class="place-link"
        >
          ${spot}
        </a>
      </p>
    `).join("")}
  </div>
</section>
    <!-- Local Food -->
    <section class="detail-below">
      <h2>Local Food</h2>
      <p class="placeholder-text" id="local-food">${data.food}</p>
    </section>
    <!-- Budget -->
    <section class="detail-below">
      <h2>Budget</h2>
      <p class="placeholder-text" id="destination-budget">${data.budget}</p>
    </section> 
    <!-- Travel -->
    <section class="detail-below">
      <h2>How To Reach</h2>
      <p class="placeholder-text" id="travel-information">${data.travel}</p>
    </section> 
    <!-- Activities -->
    <section class="detail-below">
      <h2>Things To Do</h2>
      <p class="placeholder-text" id="activities">${data.activities}</p>
    </section>`;

  } catch (err) {
    console.error("Detail fetch error:", err); // log the REAL error instead of hiding it
    alert("There is a problem fetching details, sorry!");
  }
}

carddetails();