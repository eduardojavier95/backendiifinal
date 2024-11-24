import UserRepository from "./user.repository.js";
import { getUsersDao } from "../../dao/factory.js";

export default class UserRepositoryMongo extends UserRepository {
  constructor() {
    super();
    this.userDao = getUsersDao();
  }

  async getUsers() {
    return await this.userDao.getUsers();
  }

  async getUserById(id) {
    return await this.userDao.getUserById(id);
  }

  async getUserByEmail(email) {
    return await this.userDao.getUserByEmail(email);
  }

  async createUser(userData) {
    return await this.userDao.createUser(userData);
  }

  async updateUser(id, userData) {
    return await this.userDao.updateUser(id, userData);
  }

  async deleteUser(id) {
    return await this.userDao.deleteUser(id);
  }
}
