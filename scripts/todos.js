
"use strict"

window.onload = function () {
    addOptToSelect();
    hideUpdateBtn();
    hideTable();
    document.getElementById("userSelect").onchange = displayUserTasks;
    document.getElementById("updateBtn").onclick = updateToDos;
}

function addOptToSelect() {
    let defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.textContent = "Please select a user";
    document.getElementById("userSelect").appendChild(defaultOpt);

    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(data => {
            for (let x of data) {
                let opt = document.createElement("option");
                opt.value = x.id;
                opt.textContent = x.name;
                document.getElementById("userSelect").appendChild(opt);
            }
        });
}

function displayUserTasks() {
    const divforResults = document.getElementById("divforResults");
    const table = document.getElementById("table");
    let id = document.getElementById("userSelect").value;

    hideUpdateBtn();
    document.getElementById("msgDiv").innerHTML = "";
    divforResults.innerHTML = "";

    if (id == "") {
        hideUpdateBtn();
        hideTable();
        divforResults.innerHTML = "";
    }
    else {
        fetch(`http://localhost:8083/api/todos/byuser/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.length < 1) {
                    hideUpdateBtn();
                    hideTable();
                    document.getElementById("msgDiv").innerHTML = "It seems like you don't have any task check back later or <span><a href='new_todo.html'>add a task</a></span>."
                }
                else {
                    showUpdateBtn();
                    showTable();
                    for (let i = 0; i < data.length; i++) {
                        let row = divforResults.insertRow();
                        let c1 = row.insertCell(0);
                        let c2 = row.insertCell(1);
                        let c3 = row.insertCell(2);
                        let c4 = row.insertCell(3);
                        let c5 = row.insertCell(4);
                        c1.innerHTML = data[i].category;

                        let a = document.createElement("a");
                        a.href = `http://127.0.0.1:5500/todo_details.html?courseid=${data[i].id}`;
                        a.textContent = data[i].description;
                        c2.appendChild(a);

                        c3.innerHTML = data[i].deadline;
                        c4.innerHTML = data[i].priority;
                        // c5.innerHTML = data[i].completed;
                        if (data[i].completed == true) {
                            c5.innerHTML = `<span>&#x2713;</span>`;
                        }
                        else if (data[i].completed == false) {
                            c5.innerHTML = `<input type="checkbox" id="completed_${data[i].id}" class="completedcheckbox">`;
                        }
                    }
                }
            });
    }
}

function updateToDos() {
    let id = document.getElementById("userSelect").value;
    let checks = document.querySelectorAll("input[type='checkbox']:checked");

    let update = {
        // userid: '5',
        // category: 'Errand',
        // description: 'Pick up Ian & Siddalee from airport',
        // deadline: '2023-03-06',
        // priority: 'High',
        completed: true
    }

    for (let i = 0; i < checks.length; i++) {
        let todoID = checks[i].id.slice(10);

        fetch(`http://localhost:8083/api/todos/${todoID}`, {
            method: "PUT",
            body: JSON.stringify(update),
            headers: {
                "Content-type":
                    "application/json; charset=UTF-8"
            }
        })
        .then(result => {
             displayUserTasks();
        });
    }
}

function updateSingleTodo(element) {

}

function hideTable() {
    document.getElementById("table").style.display = "none";
}
function showTable() {
    document.getElementById("table").style.display = "block";
}
function hideUpdateBtn() {
    document.getElementById("updateBtn").style.display = "none";
}
function showUpdateBtn() {
    document.getElementById("updateBtn").style.display = "block";
}