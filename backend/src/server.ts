import "dotenv/config";
import express from "express";
import cors from "cors";

import usersRoutes from "./controller/users.routes.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", usersRoutes);

const port = 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
