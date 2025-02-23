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

// Función para verificar si el correo ya está registrado
function isEmailRegistered(email, callback) {
  const sql = 'SELECT COUNT(*) AS count FROM usuarios WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].count > 0);
  });
}

// Función para verificar si el nombre de usuario ya existe
function isUsernameRegistered(username, callback) {
  const sql = 'SELECT COUNT(*) AS count FROM usuarios WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].count > 0);
  });
}

// Función para validar que el nombre de usuario tenga entre 8 y 15 caracteres
function isUsernameValid(username) {
  return username.length >= 8 && username.length <= 15;
}

// Función para validar que la contraseña tenga entre 10 y 20 caracteres
function isPasswordValid(password) {
  return password.length >= 10 && password.length <= 20;
}

// Endpoint para obtener usuarios
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(result);
  });
});

// Endpoint para registrar un usuario con validaciones en orden
app.post('/register', (req, res) => {
  const { email, username, password, pais, token } = req.body;

  // Validar que se reciban todos los datos requeridos
  if (!email || !username || !password || !pais) {
    return res.status(400).json({ error: 'Faltan datos requeridos.' });
  }

  // Validar formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Formato de email inválido.' });
  }

  // Verificar si el correo ya está registrado
  isEmailRegistered(email, (err, emailExists) => {
    if (err) return res.status(500).json({ error: err.message });
    if (emailExists) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Validar la longitud del nombre de usuario
    if (!isUsernameValid(username)) {
      return res.status(400).json({ error: 'El nombre de usuario debe tener entre 8 y 15 caracteres.' });
    }

    // Verificar si el nombre de usuario ya existe
    isUsernameRegistered(username, (err, usernameExists) => {
      if (err) return res.status(500).json({ error: err.message });
      if (usernameExists) {
        return res.status(400).json({ error: 'El nombre de usuario ya existe.' });
      }

      // Validar longitud de la contraseña
      if (!isPasswordValid(password)) {
        return res.status(400).json({ error: 'La contraseña debe tener entre 10 y 20 caracteres.' });
      }

      // Hashear la contraseña y proceder con el registro
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err.message });

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
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
