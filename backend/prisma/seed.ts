import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    for (let i = 0; i < 10; i++) {
        await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                age: faker.number.int({ min: 18, max: 80 }),
                posts: {
                    create: Array.from(
                        { length: faker.number.int({ min: 1, max: 4 }) },
                        () => ({
                            title: faker.lorem.sentence(),
                            content: faker.lorem.paragraph(),
                            views: faker.number.int({ min: 0, max: 1000 }),
                            published: faker.datatype.boolean(),
                        })
                    ),
                },
            },
        });
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
