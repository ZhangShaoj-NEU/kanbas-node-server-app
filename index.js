import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import session from "express-session";

// Import Routes and Modules
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/router.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/router.js";
import AssignmentRoutes from "./Kanbas/Assignments/router.js";
import EnrollmentsRoutes from "./Kanbas/Enrollments/router.js";

// Database Connection
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);

// App Initialization
const app = express();

// CORS Configuration
const corsOptions = {
  credentials: true,
  origin: process.env.NETLIFY_URL || "http://localhost:3000",
};
app.use(cors(corsOptions));

// Session Configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
  cookie: process.env.NODE_ENV !== "development" ? {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  } : {
    sameSite: 'lax',
    secure: false,
  },
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  app.set("trust proxy", 1);
}
app.use(session(sessionOptions));

// Middleware
app.use(express.json());

// Attach Routes and Modules
const attachRoutes = (app) => {
  Lab5(app);
  Hello(app);
  UserRoutes(app);
  CourseRoutes(app);
  ModuleRoutes(app);
  AssignmentRoutes(app);
  EnrollmentsRoutes(app);
};
attachRoutes(app);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT);
