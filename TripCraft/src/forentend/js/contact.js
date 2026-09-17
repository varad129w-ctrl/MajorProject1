document.getElementById("submitbtn").addEventListener("click", async (e) => {
    e.preventDefault(e);
    const name = document.getElementById("contactname").value;
    const email = document.getElementById("contactemail").value;
    const subject = document.getElementById("contactsubject").value;
    const message = document.getElementById("contactmessage").value;

    const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
    });

    if (response.ok) {
        alert("We Will Reach You!")
    } else {
        alert(data.message);
    }
})