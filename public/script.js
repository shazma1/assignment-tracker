const api = "/assignments"


// Load assignments when page opens
window.onload = function(){
    loadAssignments()
}


// Add new assignment
async function addAssignment(){

    const title = document.getElementById("title").value
    const subject = document.getElementById("subject").value
    const priority = document.getElementById("priority").value
    const dueDate = document.getElementById("dueDate").value

    if(!title || !subject){
        alert("Please fill all required fields")
        return
    }

    const data = {
        title,
        subject,
        priority,
        dueDate
    }

    await fetch(api,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })

    clearForm()

    loadAssignments()
}


// Load assignments from database
async function loadAssignments(){

    const res = await fetch(api)

    const data = await res.json()

    const table = document.getElementById("assignmentList")

    if(!table) return

    table.innerHTML = ""

    const today = new Date()

    data.forEach(a=>{

        const due = new Date(a.dueDate)

        let rowColor = ""

        if(a.status === "Completed"){
            rowColor = "style='background:#d4edda'"
        }
        else if(due < today){
            rowColor = "style='background:#f8d7da'"
        }

        table.innerHTML += `
        <tr ${rowColor}>
            <td>${a.title}</td>
            <td>${a.subject}</td>
            <td>${a.priority}</td>
            <td>${a.status}</td>
            <td>${a.dueDate}</td>

            <td>

            <button onclick="completeAssignment('${a._id}')">
            Complete
            </button>

            <button onclick="deleteAssignment('${a._id}')">
            Delete
            </button>

            </td>

        </tr>
        `
        loadAnalytics()
    })

}


// Mark assignment completed
async function completeAssignment(id){

    await fetch(api+"/"+id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            status:"Completed"
        })
    })

    loadAssignments()
}


// Delete assignment
async function deleteAssignment(id){

    const confirmDelete = confirm("Are you sure you want to delete?")

    if(!confirmDelete) return

    await fetch(api+"/"+id,{
        method:"DELETE"
    })

    loadAssignments()
}


// Search assignments
function searchAssignments(){

    const text = document.getElementById("search").value.toLowerCase()

    const rows = document.querySelectorAll("#assignmentList tr")

    rows.forEach(row=>{

        if(row.innerText.toLowerCase().includes(text)){
            row.style.display = ""
        }
        else{
            row.style.display = "none"
        }

    })
}


// Clear form after submission
function clearForm(){

    document.getElementById("title").value = ""
    document.getElementById("subject").value = ""
    document.getElementById("priority").value = "Low"
    document.getElementById("dueDate").value = ""

}
async function loadAnalytics(){

const res = await fetch("/assignments")

const data = await res.json()

let total = data.length
let completed = 0
let pending = 0
let overdue = 0

const today = new Date()

data.forEach(a=>{

if(a.status === "Completed"){
completed++
}
else{
pending++
}

if(new Date(a.dueDate) < today && a.status !== "Completed"){
overdue++
}

})

let completionRate = total === 0 ? 0 : ((completed/total)*100).toFixed(1)

document.getElementById("totalAssignments").innerText = total
document.getElementById("completedAssignments").innerText = completed
document.getElementById("pendingAssignments").innerText = pending
document.getElementById("overdueAssignments").innerText = overdue
document.getElementById("completionRate").innerText = completionRate + "%"
}