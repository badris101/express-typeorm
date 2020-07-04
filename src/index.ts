import "reflect-metadata";
import * as express from "express";
import { Application } from "express";
import authRouter from "./routes/authRoute";
import keysRouter from "./routes/keysRouter";
import { createConnection } from "typeorm";
import * as cors from "cors";
import "dotenv/config";

// Create Connection with TypeOrm
createConnection()
  .then((connection) => {
    const app: Application = express();
    app.use(express.json());
    app.use(cors());

    // Server Port
    const port = 8000;

    // Routes
    app.use("/api/user", authRouter);
    app.use("/api/keys", keysRouter);

    // Listening Server
    app.listen(port, () => {
      console.log(`Server running in port ${port}`);
    });
  })
  .catch((error) => console.log(error));
