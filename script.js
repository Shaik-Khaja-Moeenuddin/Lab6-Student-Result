
const resultForm = document.getElementById("resultForm");
const resultsBody = document.getElementById("resultsBody");
const emptyMessage = document.getElementById("emptyMessage");

resultForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNumber").value.trim();

    const marks = [
        Number(document.getElementById("english").value),
        Number(document.getElementById("maths").value),
        Number(document.getElementById("science").value),
        Number(document.getElementById("computer").value),
        Number(document.getElementById("social").value)
    ];

    if (name === "" || roll === "") {
        alert("Please enter the student name and roll number.");
        return;
    }

    if (marks.some(mark =>
        !Number.isFinite(mark) || mark < 0 || mark > 100
    )) {
        alert("Each subject mark must be between 0 and 100.");
        return;
    }

    // Calculate total and percentage
    const total = marks.reduce(function(sum, mark) {
        return sum + mark;
    }, 0);

    const percentage = (total / 500) * 100;

    // A student fails if any subject mark is below 35
    const status = marks.some(mark => mark < 35) ? "FAIL" : "PASS";

    // Calculate grade
    let grade;

    if (status === "FAIL") {
        grade = "F";
    } else if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "E";
    }

    // Add the result to the table
    const row = resultsBody.insertRow();

    const values = [
        name,
        roll,
        ...marks,
        total,
        percentage.toFixed(2) + "%",
        grade,
        status
    ];

    values.forEach(function(value, index) {
        const cell = row.insertCell();
        cell.textContent = value;

        if (index === values.length - 1) {
            cell.className = status === "PASS" ? "pass" : "fail";
        }
    });

    emptyMessage.hidden = true;

    // Clear the form for the next student
    resultForm.reset();
});

// Clear every result from the table
document.getElementById("clearResults").addEventListener("click", function() {
    resultsBody.innerHTML = "";
    emptyMessage.hidden = false;
});
