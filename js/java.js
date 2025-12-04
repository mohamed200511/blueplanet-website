async function test() {
    var fn = document.getElementById('fn').value;
    var ln = document.getElementById('ln').value;
    var mobile = document.getElementById('mobile').value;
    var email = document.getElementById('email').value;

    if (fn.length < 3) {
        document.getElementById("error").innerHTML = "First Name Should Be At Least 3 Characters";
        return false;
    }
    if (ln.length < 3) {
        document.getElementById("error").innerHTML = "Last Name Should Be At Least 3 Characters";
        return false;
    }
    if (mobile.length != 8 || isNaN(Number(mobile))) {
        document.getElementById("error").innerHTML = "Mobile Number Must Contain Exactly 8 Digits";
        return false;
    }

    const data = { firstName: fn, lastName: ln, mobile, email };

    const res = await fetch("/.netlify/functions/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
        alert("Saved to database! Welcome " + fn);
        localStorage.setItem("firstName", fn);
    } else {
        alert("Error: " + result.error);
    }

    return false; 
}


function display() {
    var name = localStorage.getItem('firstName');
    document.getElementById("dname").innerHTML = name;
}

