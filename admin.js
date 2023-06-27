let allStudents = localStorage.getItem("all_students") || "[]"; //gets all the registered students from local storage
allStudents = JSON.parse(allStudents); //parses it to JSON

let allStudentsData = localStorage.getItem("students_data") || "{}"; //gets the approval status of all the registered students from local storage
allStudentsData = JSON.parse(allStudentsData); //parses it to JSON

let defaults = {
  crc: false,
  hostel: false,
  library: false,
  healthCentre: false,
  farm: false,
  physicsLab: false,
  chemistryLab: false,
  meeWorkshop: false,
}; //the default approval status for students

let errorPara = document.querySelector(".error"); //get the error paragraph
let successPara = document.querySelector(".success"); //get the success paragraph

document.querySelector("form").addEventListener("submit", (e) => {
  //on form submission
  e.preventDefault(); //prevent default

  let matricNumber = document.querySelector("input").value.toLowerCase().trim(); //get the matric number of student to be registered

  if (!/^([a-z]{3})(\/\d{2})(\/\d{4})$/.test(matricNumber)) {
    //if the matric number is invalid
    errorPara.textContent = "Invalid Matric Number"; //display an error message
    successPara.textContent = ""; //remove any previous success message
  } else {
    //if the matric number is valid
    if (allStudents.includes(matricNumber)) {
      //if the student has already being registered
      errorPara.textContent = "Student already registered"; //display an error message
      successPara.textContent = ""; //remove any previous success message
    } else {
      allStudents.push(matricNumber); //add the student's matric number to the array of all students

      allStudentsData[matricNumber] = defaults; //initialize the student's approval status to the defaults

      localStorage.setItem("all_students", JSON.stringify(allStudents)); //store the students array in local storage

      localStorage.setItem("students_data", JSON.stringify(allStudentsData)); //store the students approval status in local storage

      errorPara.textContent = ""; //remove any previous error

      successPara.textContent = "Student Successfully registered"; //show success message
    }
  }
});
