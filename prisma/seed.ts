import 'dotenv/config';
import { PrismaClient } from '../lib/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { membersData } from './membersData';
import { hash } from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seedMembers() {
  await Promise.all(
    membersData.map(async (member) =>
      prisma.user.create({
        data: {
          email: member.email,
          emailVerified: new Date(),
          name: member.name,
          passwordHash: await hash('password', 10),
          image: member.image,
          profileComplete: true,
          member: {
            create: {
              dateOfBirth: new Date(member.dateOfBirth),
              gender: member.gender,
              name: member.name,
              created: new Date(member.created),
              updated: member.lastActive ? new Date(member.lastActive) : new Date(),
              description: member.description,
              city: member.city,
              country: member.country,
              image: member.image,
              photos: {
                create: {
                  url: member.image,
                  isApproved: true,
                },
              },
            },
          },
        },
      })
    )
  );
}

async function seedAdmin() {
  await prisma.user.create({
    data: {
      email: 'admin@test.com',
      emailVerified: new Date(),
      name: 'Admin',
      passwordHash: await hash('password', 10),
      role: 'ADMIN',
    },
  });
}

async function main() {
  if (process.env.RUN_SEED === 'true' || process.env.NODE_ENV === 'development') {
    console.log('Seeding members...');
    await seedMembers();
    console.log('Seeding admin...');
    await seedAdmin();
    console.log('Seeding complete!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });