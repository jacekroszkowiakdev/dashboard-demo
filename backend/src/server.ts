import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/users-with-stats", async (_req, res) => {
    const users = await prisma.user.findMany({
        include: {
            posts: true,
        },
    });

    const result = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        registered: user.createdAt.toISOString().split("T")[0],
        postCount: user.posts.length,
        totalViews: user.posts.reduce((sum, post) => sum + post.views, 0),
        isActive: user.age < 65,
    }));

    res.json(result);
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
