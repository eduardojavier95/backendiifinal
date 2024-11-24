import User from "./models/user.model.js";

export default class UsersMongo {
  constructor() {}

  /**
   * Obtener todos los usuarios
   * @returns {Promise<Array>} Lista de usuarios
   */
  async getUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  /**
   * Crear un nuevo usuario
   * @param {Object} user Datos del usuario
   * @returns {Promise<Object>} Usuario creado
   */
  async createUser(user) {
    try {
      const newUser = new User(user);
      return await newUser.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Obtener un usuario por su ID
   * @param {String} id ID del usuario
   * @returns {Promise<Object>} Usuario encontrado
   */
  async getUserById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }

  /**
   * Actualizar un usuario
   * @param {String} id ID del usuario
   * @param {Object} user Datos actualizados
   * @returns {Promise<Object>} Usuario actualizado
   */
  async updateUser(id, user) {
    try {
      return await User.findByIdAndUpdate(id, user, { new: true });
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  /**
   * Eliminar un usuario
   * @param {String} id ID del usuario
   * @returns {Promise<Object>} Usuario eliminado
   */
  async deleteUser(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}
