let studentPara = document.querySelector(".matric");

let currentStudent = localStorage.getItem("currentStudent");

studentPara.textContent = `${currentStudent}`;

let table = document.querySelector("table");

let allStudentsData = localStorage.getItem("students_data");
allStudentsData = JSON.parse(allStudentsData);

let currentStudentData = allStudentsData[currentStudent];

for (let i in currentStudentData) {
  let row = document.createElement("tr");
  row.innerHTML = `<td>${i}</td>
        <td class="${currentStudentData[i] ? "success" : "error"}" >${
    currentStudentData[i] ? "Approved" : "Not Approved"
  }</td>`;
  table.appendChild(row);
}

//the code is intuitive. My hands are weak A.F.
