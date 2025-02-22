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