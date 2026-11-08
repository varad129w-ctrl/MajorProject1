document.getElementById("submitbtn").addEventListener("click", async (e) => {
    e.preventDefault(e);
    const name = document.getElementById("contactname").value;
    const email = document.getElementById("contactemail").value;
    const subject = document.getElementById("contactsubject").value;
    const message = document.getElementById("contactmessage").value;

    const API_BASE = window.location.origin.includes("127.0.0.1:5500") ? "http://localhost:3000" : "";
    const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
    });

    const data = await response.json();
    if (response.ok) {
        alert("We Will Reach You!")
    } else {
        alert(data.message);
    }
})