document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/libros')
        .then(response => response.json())
        .then(data => {
            const tablaLibros = document.getElementById('tabla-libros').getElementsByTagName('tbody')[0];
            data.forEach(libro => {
                const fila = tablaLibros.insertRow();
                fila.insertCell(0).textContent = libro.IdLibros;
                fila.insertCell(1).textContent = libro.nombre_libro;
                fila.insertCell(2).textContent = libro.idAutor;
                fila.insertCell(3).textContent = libro.IdEditorial;
            });
        })
        .catch(error => console.error('Error al obtener los libros:', error));
});


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.querySelector('[name="uname"]').value;
    let password = document.querySelector('[name="psw"]').value;

    fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login successful');
            } else {
                alert('Login failed');
            }
        })
        .catch(error => console.error('Error:', error));
});