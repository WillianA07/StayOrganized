
"use strict"

window.onload = function () {
    const urlParams = new URLSearchParams(location.search);

    let id = -1;
    if (urlParams.has("courseid") === true) {
        id = urlParams.get("courseid");
        fetch("http://localhost:8083/api/todos/" + id)
            .then(response => response.json())
            .then(x => {
                displayResults(x);
            });
    }

    document.getElementById("undoneBtn").onclick = markToDoUndone;
    document.getElementById("completeBtn").onclick = markToDoCompleted;
}

function displayResults(x) {
    const table = document.getElementById("table");

    // userid: 2,
    // category: 'Household Task',
    // description: 'Do laundry',
    // deadline: '2022-12-06',
    // priority: 'Medium',
    // completed: false

    document.getElementById('table').innerHTML = `
    <tr>
        <th>User ID</th>
        <td>${x.userid}</td>
    </tr>
    <tr>
        <th>Category</th>
        <td>${x.category}</td>
    </tr>
    <tr>
        <th>Description</th>
        <td>${x.description}</td>
    </tr>
    <tr>
        <th>Deadline</th>
        <td>${x.deadline}</td>
    </tr>
    <tr>
        <th>Priority</th>
        <td>${x.priority}</td>
    </tr>
    <tr>
        <th>Completed</th>
        <td>${x.completed}</td>
    </tr>`;
}

function markToDoUndone() {
    let update = {
        completed: false
    };

    const urlParams = new URLSearchParams(location.search);

    let id = -1;
    if (urlParams.has("courseid") === true) {
        id = urlParams.get("courseid");
        fetch(`http://localhost:8083/api/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify(update),
            headers: {
                "Content-type":
                    "application/json; charset=UTF-8"
            }
        })
    }
}

function markToDoCompleted() {
    let update = {
        completed: true
    };

    const urlParams = new URLSearchParams(location.search);

    let id = -1;
    if (urlParams.has("courseid") === true) {
        id = urlParams.get("courseid");
        fetch(`http://localhost:8083/api/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify(update),
            headers: {
                "Content-type":
                    "application/json; charset=UTF-8"
            }
        })
    }
}