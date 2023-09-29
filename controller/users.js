const { User } = require('../models/usersModels');

module.exports = {
  getUsers: async (req, resp, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
    const users = await User.find();
    return resp.json(users); 
   },
};

