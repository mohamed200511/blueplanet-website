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

     if (data.error) {
        document.getElementById("error").innerHTML = data.error;
        return false;
    }

    alert("Successful Submission, Welcome " + fn);

    localStorage.setItem('firstName', fn);

    return true;
}


function display() {
    var name = localStorage.getItem('firstName');
    document.getElementById("dname").innerHTML = name;
}

