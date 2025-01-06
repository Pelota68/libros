const express = require('express');
const path = require('path');
const mariadb = require('mariadb'); // Asegúrate de requerir mariadb
const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'libros.html'));
});

// Configurar pool de conexiones a MariaDB
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'libreria_gabo',
    connectionLimit: 5
});

// Probar la conexión a la base de datos
pool.getConnection()
    .then(conn => {
        console.log('Conexión a MariaDB exitosa');
        conn.release(); // Liberar la conexión de vuelta al pool
    })
    .catch(err => {
        console.error('Error al conectar a MariaDB', err);
    });

// Endpoint para obtener los libros
app.get('/libros', (req, res) => {
    pool.query('SELECT * FROM libros')
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.error('Error al ejecutar la consulta', err);
            res.status(500).json({ error: 'Error al obtener los libros' });
        });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});