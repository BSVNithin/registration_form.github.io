const dob = document.getElementById("dob");
let userform=document.getElementById('form');
dob.addEventListener("change",
function validateDob(){
    let d=dob.value.split('-');
    let y=d[0];
    let m=d[1];
    let date=d[2];
    let birthdate = new Date(y, m, date);
    let today_date = new Date();
    let currentYear= today_date.getFullYear();
    let birth=birthdate.getFullYear();
    let age = currentYear - birth;
    let monthDif = today_date.getMonth() - birthdate.getMonth();
    if ((today_date.getDate() < birthdate.getDate()) || monthDif<0)age--;
    if (age<18 || age>55) {
    dob.setCustomValidity("Your age isn't between 18 and 55.");
    dob.reportValidity();
    }
    else dob.setCustomValidity("");
    });
    let email=document.getElementById("email");
    email.addEventListener('input',function validate(){
    if(email.validity.typeMismatch){
        email.setCustomValidity("Invalid email");
        email.reportValidity();
        }
        else email.setCustomValidity('');
});
const retrive=()=>{
    let entries=localStorage.getItem("entry");
    if(entries){
        entries=JSON.parse(entries);
    }
    else{
        entries=[];
    }
    return entries;
}
let userEntries=retrive();
const display=()=>{
    let entries=retrive();
    const tableEntries=entries.map((entry)=>{
    const name=`<td>${entry.name}</td>`;
    const email=`<td>${entry.email}</td>`;
    const password=`<td>${entry.password}</td>`;
    const dob=`<td >${entry.dob}</td>`;
    const accept=`<td>${entry.acceptedTandC}</td>`;
    const r=`<tr>${name} ${email} ${password} ${dob} ${accept}</tr>`;
    return r;
    }).join("\n");
    const table=`<table border="2">
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Dob</th>
    <th>Accepted Terms?</th>
    </tr>
    ${tableEntries}</table>`;
    let det=document.getElementById("entry");
    det.innerHTML=table;
}
userform.addEventListener("submit",function saveForm(e){
     e.preventDefault();
     const name=document.getElementById("name").value;
     const email=document.getElementById("email").value;
     const password=document.getElementById("password").value;
     const dob=document.getElementById("dob").value;
     const acceptedTandC=document.getElementById("TermsAccepted").checked;
     const userentry={
        name,
        email,
        password,
        dob,
        acceptedTandC
     };
     userEntries.push(userentry);
     localStorage.setItem("entry",JSON.stringify(userEntries));
     display();
});
display();