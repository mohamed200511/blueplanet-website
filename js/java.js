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
    if (mobile.length != 8) {
        document.getElementById("error").innerHTML = "Mobile Number Must Contain Exactly 8 Digits";
        return false;
    }

    const response = await fetch("/.netlify/functions/saveUser", {
        method: "POST",
        body: JSON.stringify({ fn, ln, mobile, email })
    });

    if (response.ok) {
        localStorage.setItem('firstName', fn);
        alert('Data saved to database! Welcome ' + fn);
        return true;
    } else {
        document.getElementById("error").innerHTML = "Database error";
        return false;
    }
}


function display() {
    var name = localStorage.getItem('firstName');
    document.getElementById("dname").innerHTML = name;
}

