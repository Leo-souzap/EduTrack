let students = [];

function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

function loadFromLocalStorage() {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        students = JSON.parse(storedStudents);
    }
}

function renderStudentList() {
    const studentList = document.getElementById("student-list");
    studentList.innerHTML = ""; // Limpa a lista antes de renderizar novamente

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>
                <button class="btn btn-warning btn-sm me-2" onclick="editStudent(${student.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Excluir</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

function addStudent() {
    const name = prompt("Digite o nome do aluno:");
    const age = prompt("Digite a idade do aluno:");
    const course = prompt("Digite o curso do aluno:");

    if (name && age && course) {
        const newStudent = {
            id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
            name,
            age: parseInt(age),
            course
        };
        students.push(newStudent);
        saveToLocalStorage(); //
        renderStudentList();
    } else {
        alert("Todos os campos são obrigatórios!");
    }
}

function editStudent(id) {
    const student = students.find((student) => student.id === id);
    if (student) {
        const newName = prompt("Edite o nome do aluno:", student.name);
        const newAge = prompt("Edite a idade do aluno:", student.age);
        const newCourse = prompt("Edite o curso do aluno:", student.course);

        if (newName && newAge && newCourse) {
            student.name = newName;
            student.age = parseInt(newAge);
            student.course = newCourse;
            saveToLocalStorage();
            renderStudentList();
        } else {
            alert("Todos os campos são obrigatórios!");
        }
    }
}

function deleteStudent(id) {
    students = students.filter((student) => student.id !== id);
    saveToLocalStorage(); 
    renderStudentList();
}

// Inicializa a lista de alunos ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage(); // Carrega a lista de alunos do localStorage
    renderStudentList();
});
