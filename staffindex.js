document.querySelector("form").addEventListener("submit", (e) => {
  //on form submission
  e.preventDefault();
  let staffList = JSON.parse(localStorage.getItem("staff-list")); //get the array of staff from local storage and parse it

  let id = document.querySelector("#id").value.trim(); //get the id of the staff trying to log in
  let password = document.querySelector("#password").value.trim(); //get the password of the staff trying to log in
  let errorPara = document.querySelector(".error"); //get the error paragraph

  if (!staffList[id]) {
    //if the staff has not being registered
    errorPara.textContent = "Invalid ID"; //display an error
  } else if (password !== staffList[id]["password"]) {
    //if the password is incorrect
    errorPara.textContent = "Invalid Password"; //display an error
  } else {
    localStorage.setItem("currentStaff", id); //store the staff in local storage as being logged in
    window.location.href = "staffpage.html"; //redirect to the staff homepage
  }
});
