'''
Controller for handling user-related operations.
'''
const userService = require('../services/userService');
exports.registerUser = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const token = await userService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
// Additional user-related controller methods...