import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/users-with-stats", async (_req, res) => {
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

export default router;
