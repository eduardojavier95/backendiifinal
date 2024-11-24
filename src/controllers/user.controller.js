import usersService from "../services/users.service.js";

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;
    const result = await usersService.registerUser({
      first_name,
      last_name,
      email,
      password,
      age,
    });
    res.status(201).send({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await usersService.loginUser({ email, password });
    res.cookie("authToken", token, { httpOnly: true });
    res
      .status(200)
      .send({ status: "success", message: "Login successful", token });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userDTO = await usersService.getCurrentUser(req.user);
    res.status(200).send({ status: "success", payload: userDTO });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};
