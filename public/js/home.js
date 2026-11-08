document.getElementById("quickbtn1").addEventListener("click", () => {
    window.location.href = "destination_detail.html?id=6a9cf3a6921e69a617c8e118"
})
document.getElementById("quickbtn2").addEventListener("click", () => {
    window.location.href = "destination_detail.html?id=6a9cf3a6921e69a617c8e119"
})
document.getElementById("quickbtn3").addEventListener("click", () => {
    window.location.href = "destination_detail.html?id=6a9bf6a3921e69a617c8e0e8"
})
document.getElementById("quickbtn4").addEventListener("click", () => {
    window.location.href = "destination_detail.html?id=6a9bf6a3921e69a617c8e0e9"
})
document.getElementById("quickbtn5").addEventListener("click", () => {
    window.location.href = "destination_detail.html?id=6a9bf6a3921e69a617c8e0f0"
})
let searchbar = document.getElementById("searchdropdown");

document.getElementById("searchbar").addEventListener("input", (e) => {
    e.stopPropagation();
    searchbar.classList.add('show');
})
document.body.addEventListener("click", () => {
    searchbar.classList.remove('show');
})

let debounceTimer;
document.getElementById("destination-search").addEventListener("input", (e) => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        const query = e.target.value;
        if (query.length > 2) {
            fetchSuggestions(query);
        }
    }, 300);
});
let list = document.getElementById("searchdropdown");
let containerlist = document.getElementById("searchdropdown").firstElementChild
async function fetchSuggestions(query) {
    const API_BASE = window.location.origin.includes("127.0.0.1:5500") ? "http://localhost:3000" : "";
    let data = await fetch(`${API_BASE}/api/suggestions/${encodeURIComponent(query)}`);
    let apidata = await data.json();
    list.innerHTML = ``;
    if (apidata.length === 0) {
        list.innerHTML = `<div class="lists">No destinations found</div>`;
        return;
    }
    //form here we we add innerhtml directly and this apidata is array with all matching names : !
    apidata.forEach((element) => {
        let div = document.createElement('div')
        div.classList.add("lists");
        div.dataset.id = element._id;
        console.log(div.dataset.id);
        div.innerHTML = element.Destination;
        list.prepend(div);
        list.addEventListener("click", () => {
            window.location.href = `destination_detail.html?id=${div.dataset.id}`;
        })
        document.getElementById("destination-search").addEventListener("keydown", (a) => {
            if (a.key == "Enter") {
                const firstlist = list.firstElementChild
                const id = firstlist.dataset.id;
                window.location.href = `destination_detail.html?id=${id}`;
            }
        })
    });
}