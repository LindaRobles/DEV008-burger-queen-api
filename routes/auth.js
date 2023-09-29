const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require ('../models/usersModels.js');
const bcrypt = require('bcrypt'); 

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', async (req, resp, next) => {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return next(400);
    }

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw 'Email does not exist';
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw 'Incorrect password';
      }

      console.log('Usuario autenticado:', user);
      console.log('Ingresaste satisfactoriamente');
  
      // TODO: autenticar al usuario y generar un token JWT
      // Generar el token JWT
      const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: '1h' });
  
      // Envía el token como respuesta
      resp.status(200).json({ token: token });
    } catch (error) {
      console.error('Error de autenticación:', error);
      return next(400);
    }

  });

  return nextMain();
};
