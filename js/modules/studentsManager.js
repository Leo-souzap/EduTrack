// Função para carregar o conteúdo do navbar
function loadNavbar() {
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        });
}

function loadFooter() {
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
}

// Função para obter o próximo ID disponível
function getNextId() {
    let nextId = localStorage.getItem('nextId');
    if (!nextId) {
        nextId = 1; // Começa com 1 se não houver IDs armazenados
    } else {
        nextId = parseInt(nextId, 10); // Converte o ID armazenado para um número
    }
    return nextId;
}

// Função para atualizar o próximo ID disponível
function updateNextId() {
    let nextId = getNextId();
    nextId += 1; // Incrementa o ID
    localStorage.setItem('nextId', nextId); // Armazena o próximo ID
}

function showAddStudentModal() {
    document.getElementById('student-id').value = '';
    document.getElementById('student-name').value = '';
    document.getElementById('student-age').value = '';
    document.getElementById('student-course').value = '';
    document.getElementById('studentModalLabel').textContent = 'Adicionar Aluno';
    var myModal = new bootstrap.Modal(document.getElementById('studentModal'));
    myModal.show();
}

function showEditStudentModal(id, name, age, course) {
    document.getElementById('student-id').value = id;
    document.getElementById('student-name').value = name;
    document.getElementById('student-age').value = age;
    document.getElementById('student-course').value = course;
    document.getElementById('studentModalLabel').textContent = 'Editar Aluno';
    var myModal = new bootstrap.Modal(document.getElementById('studentModal'));
    myModal.show();
}

document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('student-id').value;
    const name = document.getElementById('student-name').value;
    const age = document.getElementById('student-age').value;
    const course = document.getElementById('student-course').value;
    if (id) {
        updateStudent(id, name, age, course);
    } else {
        addStudent(name, age, course);
    }
    var myModal = bootstrap.Modal.getInstance(document.getElementById('studentModal'));
    myModal.hide();
});

function addStudent(name, age, course) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const id = getNextId(); // Obter o próximo ID disponível
    students.push({ id, name, age, course });
    localStorage.setItem('students', JSON.stringify(students));
    updateNextId(); // Atualizar o próximo ID
    loadStudents();
}

function updateStudent(id, name, age, course) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.map(student => 
        student.id === parseInt(id) ? { id: parseInt(id), name, age, course } : student
    );
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

function deleteStudent(id) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.id !== parseInt(id)); // Filtra o aluno com o ID correto
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="showEditStudentModal(${student.id}, '${student.name}', ${student.age}, '${student.course}')">Editar</button>
                <button class="btn btn-danger btn-sm ms-2" onclick="deleteStudent(${student.id})">Excluir</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
    loadStudents();
});
