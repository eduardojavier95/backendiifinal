import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let UserDao;
let UserRepository;
let ProductDao;
let ProductRepository;

const entorno = (process.env.PERSISTENCE || "MONGO").toUpperCase().trim();
const MONGODB = process.env.MONGODB_URI;

const initializeDaosAndRepositories = async () => {
  console.log(`Initializing DAOs and Repositories for ${entorno}...`);
  switch (entorno) {
    case "MONGO":
      try {
        await mongoose.connect(MONGODB);
        console.log("Connected to MongoDB.");

        // Users
        const { default: UsersMongo } = await import("./mongo/users.mongo.js");
        UserDao = new UsersMongo();

        const { default: UserRepositoryMongo } = await import(
          "../repositories/users/user.repository.mongo.js"
        );
        UserRepository = new UserRepositoryMongo();

        // Products
        const { default: ProductsMongo } = await import(
          "./mongo/products.mongo.js"
        );
        ProductDao = new ProductsMongo();

        const { default: ProductRepositoryMongo } = await import(
          "../repositories/products/product.repository.mongo.js"
        );
        ProductRepository = new ProductRepositoryMongo();
      } catch (error) {
        console.error(
          "Error initializing DAOs and Repositories for MongoDB:",
          error
        );
        throw error;
      }
      break;

    case "MEMORY":
      try {
        // User
        const { default: UsersMemory } = await import(
          "./memory/users.memory.js"
        );
        UserDao = new UsersMemory();

        const { default: UserRepositoryMemory } = await import(
          "../repositories/users/user.repository.memory.js"
        );
        UserRepository = new UserRepositoryMemory();

        // Products
        const { default: ProductsMemory } = await import(
          "./memory/products.memory.js"
        );
        ProductDao = new ProductsMemory();

        const { default: ProductRepositoryMemory } = await import(
          "../repositories/products/product.repository.memory.js"
        );
        ProductRepository = new ProductRepositoryMemory();
      } catch (error) {
        console.error(
          "Error initializing DAOs and Repositories for Memory:",
          error
        );
        throw error;
      }
      break;

    default:
      throw new Error(`Persistence option '${entorno}' is not supported`);
  }
};

const getUsersDao = () => {
  if (!UserDao) {
    throw new Error(
      "User DAO not initialized. Please call initializeDaosAndRepositories() first."
    );
  }
  return UserDao;
};

const getUserRepository = () => {
  if (!UserRepository) {
    throw new Error(
      "User Repository not initialized. Please call initializeDaosAndRepositories() first."
    );
  }
  return UserRepository;
};

const getProductsDao = () => {
  if (!ProductDao) {
    throw new Error(
      "Product DAO not initialized. Please call initializeDaosAndRepositories() first."
    );
  }
  return ProductDao;
};

const getProductRepository = () => {
  if (!ProductRepository) {
    throw new Error(
      "Product Repository not initialized. Please call initializeDaosAndRepositories() first."
    );
  }
  return ProductRepository;
};

export {
  initializeDaosAndRepositories,
  getUsersDao,
  getUserRepository,
  getProductsDao,
  getProductRepository,
};
