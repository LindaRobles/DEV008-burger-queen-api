const jwt = require('jsonwebtoken');

module.exports = (secret) => (req, res, next) => {
  const { authorization } = req.headers;  
  
  if (!authorization) {
    return next();
  }  

  const [type, token] = authorization.split(' ');  

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }  

  jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) {
      return next(403);
    }

    // Extrae el rol directamente del token JWT si está presente
    const userRole = decodedToken.role || 'usuario_predeterminado'; 

    // TODO: Verificar identidad del usuario usando `decodedToken.uid`
    req.decodedTokenUser = decodedToken.userId; // Guarda el token decodificado en el objeto de solicitud
    req.userRole = userRole;
    console.log("userId", req.decodedTokenUser);
    console.log("userRole", req.userRole);
    next(); // Continua con el siguiente middleware  
  });
};

module.exports.isAuthenticated = (req) => {
  req.isAuthenticated = req.decodedTokenUser !== null;
  console.log("request", req.decodedTokenUser);
  console.log("se está evaluando que esté autenticado", req.isAuthenticated);
  console.log("Lo que retorna isAuthenticated", !!req.isAuthenticated);
  return !!req.isAuthenticated;
};

module.exports.isAdmin = (req) => {
  // TODO: decidir por la información del request si la usuaria es admin
  console.log("userRole", req.userRole);
  return req.userRole === 'admin';
};

module.exports.requireAuth = (req, res, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, res, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
