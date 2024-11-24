import { getUserRepository } from "../dao/factory.js";
import UserDTO from "../dao/DTOs/user.dto.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UsersRepository = getUserRepository();
const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

const registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  const newUser = await UsersRepository.createUser({
    ...userData,
    password: hashedPassword,
  });
  return newUser;
};

const loginUser = async ({ email, password }) => {
  const user = await UsersRepository.getUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

const getCurrentUser = async (userData) => {
  return new UserDTO(userData);
};

const usersService = {
  registerUser,
  loginUser,
  getCurrentUser,
};

export default usersService;
