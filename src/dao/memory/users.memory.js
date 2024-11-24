export default class UsersMemory {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  // Get all users
  async getUsers() {
    return this.users;
  }

  // Create new user
  async createUser(userData) {
    const user = { id: this.nextId++, ...userData };
    this.users.push(user);
    return user;
  }

  // Get user by id
  async getUserById(id) {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  // Update user
  async updateUser(id, userData) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      this.users[index] = { ...this.users[index], ...userData };
      return this.users[index];
    } else {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
  }

  // Delete user
  async deleteUser(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      const deletedUser = this.users.splice(index, 1)[0];
      return deletedUser;
    } else {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }
}
