//==============================
// Save Appointment
//==============================

const form=document.getElementById("appointmentForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const appointment={
id:Date.now(),
name:document.getElementById("name").value,
phone:document.getElementById("phone").value,
doctor:document.getElementById("doctor").value,
date:document.getElementById("date").value,
time:document.getElementById("time").value
};

let appointments=JSON.parse(localStorage.getItem("appointments"))||[];

appointments.push(appointment);

localStorage.setItem("appointments",JSON.stringify(appointments));

alert("Appointment Saved Successfully");

form.reset();

});

}



//==============================
// Show Appointment List
//==============================

function loadAppointments(){

const table=document.getElementById("appointmentTable");

if(!table) return;

const appointments=JSON.parse(localStorage.getItem("appointments"))||[];

table.innerHTML="";

appointments.forEach((item,index)=>{

table.innerHTML+=`

<tr>

<td>${item.name}</td>

<td>${item.phone}</td>

<td>${item.doctor}</td>

<td>${item.date}</td>

<td>${item.time}</td>

<td>

<button class="edit" onclick="editAppointment(${index})">Edit</button>

<button class="delete" onclick="deleteAppointment(${index})">Delete</button>

</td>

</tr>

`;

});

}

loadAppointments();



//==============================
// Delete
//==============================

function deleteAppointment(index){

let appointments=JSON.parse(localStorage.getItem("appointments"))||[];

if(confirm("Delete this appointment?")){

appointments.splice(index,1);

localStorage.setItem("appointments",JSON.stringify(appointments));

loadAppointments();

}

}



//==============================
// Edit
//==============================

function editAppointment(index){

let appointments=JSON.parse(localStorage.getItem("appointments"))||[];

let newName=prompt("Patient Name",appointments[index].name);

if(newName==null) return;

appointments[index].name=newName;

localStorage.setItem("appointments",JSON.stringify(appointments));

loadAppointments();

}



//==============================
// Search
//==============================

function searchAppointment(){

let input=document.getElementById("search").value.toLowerCase();

let rows=document.querySelectorAll("#appointmentTable tr");

rows.forEach(function(row){

let text=row.innerText.toLowerCase();

row.style.display=text.includes(input)?"":"none";

});

}