import "dotenv/config.js";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";

import { initializeDaosAndRepositories } from "./dao/factory.js";

const app = express();
const PORT = process.env.PORT || 3000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const MONGODB = process.env.MONGODB_URI;
const SECRET_KEY = process.env.SECRET_KEY;

// Handlebars Configuration
app.engine("hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", _dirname + "/views");

// Globals Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Start Function
const startServer = async () => {
  try {

    // Session Configuration
    app.use(
      session({
        store: MongoStore.create({ mongoUrl: MONGODB, ttl: 600 }),
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: false,
      })
    );

    // Passport Initializing
    app.use(passport.initialize());
    app.use(passport.session());
    const route = await import("./routes/users.router.js");
    
    // Routes Configurations
    app.use("/", route.default);

    // Server Initializing
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

// Initializing
initializeDaosAndRepositories().then(() => {
  startServer();
});
