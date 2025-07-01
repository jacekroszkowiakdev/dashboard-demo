import express from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
    "/users-with-stats",
    async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await prisma.user.findMany({
                include: { posts: true },
            });
            const result = users.map((user) => ({
                // ... existing mapping
            }));
            res.json(result);
        } catch (error) {
            console.error("Error fetching users with stats:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

// Users with Post Stats Filtered by View Threshold
router.get(
    "/users-with-high-views",
    async (req: Request, res: Response): Promise<void> => {
        try {
            const minViews = parseInt(req.query.minViews as string) || 0;

            const postStats = await prisma.post.groupBy({
                by: ["authorId"],
                _sum: {
                    views: true,
                },
                _count: {
                    id: true,
                },
                having: {
                    views: {
                        _sum: {
                            gte: minViews,
                        },
                    },
                },
            });

            // Early return if no users meet criteria
            if (postStats.length === 0) {
                res.json([]);
                return;
            }

            const userIds = postStats.map((stat) => stat.authorId);

            const users = await prisma.user.findMany({
                where: {
                    id: {
                        in: userIds,
                    },
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    age: true,
                    createdAt: true,
                },
            });

            const filtered = users
                .map(
                    (user: {
                        id: number;
                        name: string;
                        email: string;
                        age: number;
                        createdAt: Date;
                    }) => {
                        const stats = postStats.find(
                            (stat) => stat.authorId === user.id
                        );

                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            postCount: stats?._count.id || 0, // ✅ Use pre-calculated
                            totalViews: stats?._sum.views || 0, // ✅ Use pre-calculated
                            isActive: user.age < 65,
                            registered: user.createdAt
                                .toISOString()
                                .split("T")[0],
                        };
                    }
                )
                .sort((a, b) => b.totalViews - a.totalViews); // Sort by views descending

            res.json(filtered);
        } catch (error) {
            console.error("Error fetching users with high views:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

export default router;
