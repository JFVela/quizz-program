// backend/server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json()); // Para parsear JSON en el body

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quizz-program',
});

// Endpoint de prueba
app.get('/', (req, res) => {
  return res.json("From Backend side");
});

// Endpoint para obtener usuarios
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(result);
  });
});

// Endpoint para registrar un usuario
app.post('/register', (req, res) => {
  const { email, username, password, pais, token } = req.body;

  // Validar que se reciban los datos requeridos
  if (!email || !username || !password || !pais) {
    return res.status(400).json({ error: 'Faltan datos requeridos.' });
  }
  
  // Validar el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Formato de email inválido.' });
  }
  
  // Hashear la contraseña
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Query para insertar el usuario en la base de datos
    const sql = `
      INSERT INTO usuarios (
        email, username, password_hash, pais, puntaje_total, tiempo_segundos, verificado, token_verificacion
      ) VALUES (?, ?, ?, ?, 0, 0, 0, ?)
    `;
    db.query(sql, [email, username, hash, pais, token], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ success: "Registro exitoso. Revisa tu correo para confirmar tu cuenta." });
    });
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
