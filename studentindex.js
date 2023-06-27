let studentInput = document.querySelector("input"); //get the input element
let errorPara = document.querySelector(".error"); //get the error paragraph

document.querySelector("#student_form").addEventListener("submit", (e) => {
  //on form submission
  e.preventDefault(); //prevent default
  let stud = localStorage.getItem("all_students"); //get all students from local storage
  stud = JSON.parse(stud) || []; //parse it

  let matricNumber = studentInput.value.toLowerCase().trim(); //gets the matric number and "cleans" it

  if (!/^([a-z]{3})(\/\d{2})(\/\d{4})$/.test(matricNumber)) {
    //if the matric number is invalid
    errorPara.textContent = "Invalid Matric Number"; //display an error
  } else {
    //otherwise
    if (!stud.includes(matricNumber)) {
      //if the student has not being registered
      errorPara.textContent = "Student not found"; //display error
    } else {
      //otherwise
      localStorage.setItem("currentStudent", matricNumber); //store the student as being logged in
      window.location.href = "studentpage.html"; //redirect to the students home page
    }
  }
});
