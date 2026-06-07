import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../src/db/prisma";

async function main() {
  console.log("🌱 Iniciant el seeder de la base de dades...");

  await prisma.contactRequest.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 Base de dades netejada.");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin Serveis",
      email: "admin@serveis.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  const editor = await prisma.user.create({
    data: {
      name: "Editor Serveis",
      email: "editor@serveis.com",
      password: hashedPassword,
      role: Role.EDITOR,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Joan Client",
      email: "user@serveis.com",
      password: hashedPassword,
      role: Role.USER,
    },
  });

  console.log("👤 Usuaris de prova creats amb èxit:");
  console.log(` - Admin: admin@serveis.com / password123`);
  console.log(` - Editor: editor@serveis.com / password123`);
  console.log(` - User: user@serveis.com / password123`);

  const services = await prisma.service.createMany({
    data: [
      {
        name: "Desenvolupament Web a Mida",
        description: "Creació de pàgines web corporatives, e-commerce i aplicacions web a mida amb Next.js, React i NodeJS.",
        price: 1500,
        icon: "💻",
      },
      {
        name: "Seguretat i Auditoria IT",
        description: "Anàlisi de vulnerabilitats corporatives, implementació de tallafocs i polítiques actives de seguretat.",
        price: 2500,
        icon: "🛡️",
      },
      {
        name: "Manteniment de Servidors i Núvol",
        description: "Administració de servidors Linux/Windows, migracions cloud (AWS, Azure) i monitoratge 24/7.",
        price: 600,
        icon: "☁️",
      },
      {
        name: "Suport Tècnic Informàtic",
        description: "Assistència remota i presencial de sistemes, resolució d'incidències de hardware i software d'oficina.",
        price: 120,
        icon: "🔧",
      },
    ],
  });

  console.log(`💼 ${services.count} Serveis corporatius creats.`);

  await prisma.blogPost.createMany({
    data: [
      {
        slug: "les-millors-practiques-de-seguretat-it-el-2026",
        title: "Les millors pràctiques de seguretat IT el 2026",
        content: "En aquest article explorem els nous reptes de ciberseguretat als quals s'enfronten les PIMEs i com el treball remot exigeix noves polítiques de Zero Trust. Analitzarem tallafocs, VPNs de nova generació i encriptació avançada de dades.",
        image: "/blog/seguretat.jpg",
        authorId: editor.id,
      },
      {
        slug: "per-que-migrar-la-teva-empresa-al-nuvol",
        title: "Per què migrar la teva empresa al núvol",
        content: "La flexibilitat i la reducció de costos d'infraestructura són clau per a la transformació digital. Analitzem els avantatges de migrar servidors locals a serveis AWS o Azure, garantint còpies de seguretat redundants i escalabilitat immediata.",
        image: "/blog/cloud.jpg",
        authorId: editor.id,
      },
      {
        slug: "frontend-modern-amb-nextjs-16",
        title: "Frontend modern amb Next.js 16",
        content: "Next.js s'ha consolidat com el framework preferit en entorns empresarials pel seu renderitzat en servidor (SSR), optimització d'imatges i l'App Router. En aquest post veiem com millora la velocitat de càrrega i el SEO del vostre negoci.",
        image: "/blog/nextjs.jpg",
        authorId: admin.id,
      },
    ],
  });

  console.log("📝 3 Entrades de blog inicials creats.");
  console.log("✅ Seeding finalitzat correctament.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seeder:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
