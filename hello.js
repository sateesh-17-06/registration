const form = document.getElementById("regForm");
const tableBody = document.querySelector("#entriesTable tbody");


window.onload = () => {
  const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
  savedEntries.forEach(entry => addEntryToTable(entry));
};


function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  document.querySelectorAll(".error").forEach(el => el.innerText = "");

  let valid = true;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("terms").checked;

  
  if (!name) {
    document.getElementById("nameError").innerText = "Name is required.";
    valid = false;
  }

  
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email || !emailPattern.test(email)) {
    document.getElementById("emailError").innerText = "Enter a valid email.";
    valid = false;
  }

  
  if (!password) {
    document.getElementById("passError").innerText = "Password is required.";
    valid = false;
  }

  
  const age = calculateAge(dob);
  if (!dob || age < 18 || age > 55) {
    document.getElementById("dobError").innerText = "Age must be between 18 and 55.";
    valid = false;
  }


  if (!terms) {
    document.getElementById("termsError").innerText = "You must accept terms.";
    valid = false;
  }

  if (valid) {
    const entry = { name, email, password, dob, terms };
    
    
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));

    
    addEntryToTable(entry);

    
    form.reset();
  }
});


function addEntryToTable(entry) {
  const row = tableBody.insertRow();
  row.insertCell(0).innerText = entry.name;
  row.insertCell(1).innerText = entry.email;
  row.insertCell(2).innerText = entry.password;
  row.insertCell(3).innerText = entry.dob;
  row.insertCell(4).innerText = entry.terms ? "Yes" : "No";
}