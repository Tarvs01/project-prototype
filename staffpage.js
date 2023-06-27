let currentStaff = localStorage.getItem("currentStaff"); //get the current logged in staff

let allStaff = JSON.parse(localStorage.getItem("staff-list")); //get the object of all staff

let currentDepartment = allStaff[currentStaff]["department"]; //get the department of the current logged in staff

document.querySelector(".staff").textContent = currentDepartment; //set the staff department to the current staff on the homepage

let allDefaulters = JSON.parse(localStorage.getItem("departmentDefaulters")); //get the object of all defaulters from local storage and parse it
let departmentDefaulters = allDefaulters[currentDepartment]; //get the defaulters of the current staff

let defaultersTable = document.querySelector("table"); //get the table to render the defaulters
let noDefaulters = document.querySelector(".no-defaulters"); //get the paragraph to be shown when there is no defaulter

let modal = document.querySelector(".modal-cont"); //get the modal
let modalMessage = document.querySelector(".modal-message"); //get the message paragraph for the modal

//function to render the defaulters
function renderDefaulters() {
  allDefaulters = JSON.parse(localStorage.getItem("departmentDefaulters")); //get all defaulters
  departmentDefaulters = allDefaulters[currentDepartment]; //get the defaulters for the current department

  defaultersTable.innerHTML = ""; //dispose of any other rendered defaulter
  if (departmentDefaulters.length === 0) {
    //if there is no defaulter
    noDefaulters.style.display = "block"; //show the no-defaulters paragraph
  } else {
    //otherwise
    noDefaulters.style.display = "none"; //hide the no-defaulters paragraph
  }
  for (let i of departmentDefaulters) {
    //for each defaulter
    let defaultersRow = document.createElement("tr"); //create a table row
    defaultersRow.innerHTML = `
    <td>${i}</td>
    <td><button onclick="removeDefaulter('${i}')">Remove</button></td>
    `; //render the defaulter

    defaultersTable.appendChild(defaultersRow); //add the row to the table
  }
}

renderDefaulters(); //render the defaulters on site startup

//function to remove a defaulter
function removeDefaulter(student) {
  departmentDefaulters = departmentDefaulters.filter(
    (matric) => matric !== student
  ); //filter out the other defaulters except the student to remove

  allDefaulters[currentDepartment] = departmentDefaulters; //set the defaulters of the current department to the filtered out defaulters
  localStorage.setItem("departmentDefaulters", JSON.stringify(allDefaulters)); //store it in local storage
  renderDefaulters(); //render the current defaulters
}

let form = document.querySelector("form"); //get the form for adding defaulters

form.addEventListener("submit", (e) => {
  //on form submit
  e.preventDefault(); //prevent default
  let matricNumber = document
    .querySelector("input")
    .value.toLocaleLowerCase()
    .trim(); //get the matric number of the defaulter

  let errorPara = document.querySelector(".error"); //get the error paragraph
  let successPara = document.querySelector(".success"); //get the success paragraph

  if (!/^([a-z]{3})(\/\d{2})(\/\d{4})$/.test(matricNumber)) {
    //if the matric number is invalid
    errorPara.textContent = "Invalid Matric Number"; //display an error
  } else {
    //otherwise
    if (departmentDefaulters.includes(matricNumber)) {
      //if the defaulter already exists
      errorPara.textContent = "Defaulter previously added"; //display an error
    } else {
      //otherwise
      departmentDefaulters.push(matricNumber); //add the matric number to the current department defaulters
      errorPara.textContent = ""; //remove any previous error
      successPara.textContent = "Defaulter added"; //display success message
      successPara.style.opacity = "1"; //set opacity to 1. Note to self, why leave this useless line?
      setTimeout(() => {
        successPara.textContent = ""; //hide the success message
      }, 1000); //after 1 second

      allDefaulters[currentDepartment] = departmentDefaulters; //add the department defaulters to the object of all defaulters
      localStorage.setItem(
        "departmentDefaulters",
        JSON.stringify(allDefaulters)
      ); ///store it in local storage
      renderDefaulters(); //render all current department defaulters
    }
  }
});

function approveAll() {
  let studentsData = JSON.parse(localStorage.getItem("students_data")); //get all students approval status
  for (let i in studentsData) {
    //for each student
    if (departmentDefaulters.includes(i)) {
      //if the student is a defaulter of the current department
      studentsData[i][currentDepartment] = false; //set their approval status to false
    } else {
      //otherwise
      studentsData[i][currentDepartment] = true; //set their approval status to true
    }
  }
  modal.style.display = "block"; //display the modal
  modalMessage.textContent = "All faultless students have been approved"; //shows that all concerned students have been approved
  modal.style.borderColor = "green"; //aesthetic
  localStorage.setItem("students_data", JSON.stringify(studentsData)); //store the students approval status in local storage
}

function disapproveAll() {
  let studentsData = JSON.parse(localStorage.getItem("students_data")); //get the approval status of all students
  for (let i in studentsData) {
    //for each student
    studentsData[i][currentDepartment] = false; //set their approval status to false
  }
  modal.style.display = "block"; //display the modal
  modal.style.borderColor = "red"; //aesthetic
  modalMessage.textContent = "All students have been disapproved"; //show that the approval status of all students has being set to false
  localStorage.setItem("students_data", JSON.stringify(studentsData)); //store the approval status in local storage
}

function closeModal() {
  modal.style.display = "none"; //hides the modal
}
