import "dotenv/config";
import express from "express";
import cors from "cors";

import usersRoutes from "./controller/users.routes.ts";

const app = express();

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
});

app.use(cors());
app.use(express.json());

app.use("/api", usersRoutes);

const port = 3003;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
