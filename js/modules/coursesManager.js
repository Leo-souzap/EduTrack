// Função para carregar o conteúdo do navbar
function loadNavbar() {
    fetch('../../components/navbar.html')
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

function showAddCourseModal() {
    document.getElementById('course-id').value = '';
    document.getElementById('course-name').value = '';
    document.getElementById('course-description').value = '';
    document.getElementById('courseModalLabel').textContent = 'Adicionar Curso';
    var myModal = new bootstrap.Modal(document.getElementById('courseModal'));
    myModal.show();
}

function showEditCourseModal(id, name, description) {
    document.getElementById('course-id').value = id;
    document.getElementById('course-name').value = name;
    document.getElementById('course-description').value = description;
    document.getElementById('courseModalLabel').textContent = 'Editar Curso';
    var myModal = new bootstrap.Modal(document.getElementById('courseModal'));
    myModal.show();
}

document.getElementById('course-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('course-id').value;
    const name = document.getElementById('course-name').value;
    const description = document.getElementById('course-description').value;
    if (id) {
        updateCourse(id, name, description);
    } else {
        addCourse(name, description);
    }
    var myModal = bootstrap.Modal.getInstance(document.getElementById('courseModal'));
    myModal.hide();
});

function addCourse(name, description) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const id = getNextCourseId(); // Obter o próximo ID disponível
    courses.push({ id, name, description });
    localStorage.setItem('courses', JSON.stringify(courses));
    updateNextCourseId(); // Atualizar o próximo ID
    loadCourses();
}

function updateCourse(id, name, description) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses = courses.map(course => 
        course.id === parseInt(id) ? { id: parseInt(id), name, description } : course
    );
    localStorage.setItem('courses', JSON.stringify(courses));
    loadCourses();
}

function deleteCourse(id) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses = courses.filter(course => course.id !== parseInt(id)); // Filtra o curso com o ID correto
    localStorage.setItem('courses', JSON.stringify(courses));
    loadCourses();
}

// Função para obter o próximo ID de curso disponível
function getNextCourseId() {
    let nextId = localStorage.getItem('nextCourseId');
    if (!nextId) {
        nextId = 1; // Começa com 1 se não houver IDs armazenados
    } else {
        nextId = parseInt(nextId, 10); // Converte o ID armazenado para um número
    }
    return nextId;
}

// Função para atualizar o próximo ID de curso disponível
function updateNextCourseId() {
    let nextId = getNextCourseId();
    nextId += 1; // Incrementa o ID
    localStorage.setItem('nextCourseId', nextId); // Armazena o próximo ID
}

function loadCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';
    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${course.description}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="showEditCourseModal(${course.id}, '${course.name}', '${course.description}')">Editar</button>
                <button class="btn btn-danger btn-sm ms-2" onclick="deleteCourse(${course.id})">Excluir</button>
            </td>
        `;
        courseList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
    loadCourses();
});
