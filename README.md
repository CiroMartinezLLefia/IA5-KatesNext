# IA5 - Kates Next HUB Portal

Aquest projecte unifica els tres exercicis de la pràctica **IA5 - Kates Next** en un model **HUB** de tipus monorepo per facilitar el desenvolupament local i simplificar el desplegament a producció.

L'arquitectura consisteix en:
1. **Backend (`/backend`):** API REST d'Express (NodeJS) connectada a MongoDB Atlas que manté el llistat de presentacions de bacallà. Desplegable a **Render**.
2. **Frontend (`/frontend`):** Aplicació unificada de Next.js 16 amb App Router que conté el Portal HUB d'entrada i les pàgines de navegació dels tres exercicis. Desplegable a **Vercel**.

---

## Estructura dels Exercicis

- **HUB (Pàgina principal):** Pàgina de benvinguda a `/` de Next.js que permet anar directament a cadascun dels tres exercicis.
- **Exercici 1 — Web de Cerveses Catalanes (Rutes sota `/exercici1`):** Lloc multipàgina amb Next.js App Router (llistat, cercador per estils, detalls, fitxa de producte) basat en el model S13.
- **Exercici 2 — Client del Bacallà (Rutes sota `/exercici2`):** Client web unificat que consumeix el backend de l'Express. Mostra cerca, filtres de selecció (origen, tipus), targetes de detall (`/exercici2/varietats/[id]`), i formulari d'alta (`/exercici2/nova`) (Grau Superior i Màxim assolits).
- **Exercici 3 — Serveis Informàtics (Rutes sota `/exercici3`):** Web corporativa seguint el fil didàctic de les sessions S12-S15. Utilitza base de dades PostgreSQL (via Prisma), seguretat i autenticació robusta amb Auth.js, backoffice de control basat en rols (`USER`, `EDITOR`, `ADMIN`), i sistema de gestió i càrrega de fitxers locals a `/uploads`.

---

## Requisits previs

- **NodeJS** v20 o posterior.
- **Docker** o una instància activa de **PostgreSQL** (per a l'Exercici 3).
- Un cluster actiu de **MongoDB Atlas** (per a l'Exercici 2 - Grau Màxim).

---

## Primers passos i Instal·lació

### 1. Clonar el repositori i entrar al directori
```bash
cd IA5-KatesNext
```

### 2. Configurar el Backend (`/backend`)
1. Entreu a la carpeta: `cd backend`
2. Copieu l'exemple d'entorn: `cp .env.example .env`
3. Configureu la variable `MONGODB_URI` amb la vostra cadena de connexió de MongoDB Atlas si voleu persistència al núvol. Si es deixa en blanc, el backend farà caiguda segura cap a un **Array en memòria local** (ideal per a proves ràpides).
4. Instal·leu dependències i executeu:
   ```bash
   npm install
   npm run dev
   ```
   L'API estarà disponible a `http://localhost:5000`.

### 3. Configurar el Frontend (`/frontend`)
1. Entreu a la carpeta: `cd ../frontend`
2. Copieu l'exemple d'entorn: `cp .env.example .env`
3. El fitxer `.env` ja conté configurades les rutes de connexió a PostgreSQL local i NextAuth.
4. Per aixecar la base de dades PostgreSQL local de forma ràpida amb Docker:
   ```bash
   docker-compose up -d
   ```
5. Genereu el client de Prisma, executeu les migracions i introduïu les dades inicials (seed):
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
6. Instal·leu dependències i executeu en mode desenvolupament:
   ```bash
   npm install
   npm run dev
   ```
   L'aplicació unificada s'obrirà a `http://localhost:3000`.

---

## Documentació de l'API REST (Exercici 2)

El backend d'Express exposa els següents endpoints sobre el domini del bacallà:

| Mètode | Ruta | Descripció | Exemple de resposta (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/bacalla` | Retorna totes les varietats. Permet paràmetres de cerca `?search=...`, `?origin=...` i `?type=...`. | `[{"id":"1","name":"Bacallà esqueixat","origin":"Catalunya","type":"esqueixat","description":"..."}]` |
| **GET** | `/api/bacalla/:id` | Retorna els detalls d'una varietat per ID. Si no existeix, respon amb un codi `404`. | `{"id":"1","name":"Bacallà fresc","origin":"Islàndia","type":"fresc","description":"..."}` |
| **POST** | `/api/bacalla` | Afegeix una nova varietat al catàleg. Valida el cos de la petició amb Zod. Retorna un codi `201` si és correcte o `400` si els camps són invàlids. | `{"message":"Creat a la BD","data":{"id":"...","name":"...","origin":"...","type":"..."}}` |

---

## Credencials d'Usuaris de Prova (Exercici 3)

Tots els usuaris de prova s'han inicialitzat amb la contrasenya: **`password123`**

- **Administrador:** `admin@serveis.com` (Rol: `ADMIN`) — Pot modificar rols, visualitzar consultes de contacte i fer CRUD del blog.
- **Editor:** `editor@serveis.com` (Rol: `EDITOR`) — Pot afegir, modificar i esborrar entrades de blog. Bloquejat de la gestió d'usuaris.
- **Usuari:** `user@serveis.com` (Rol: `USER`) — Accés només de lectura pública. Bloquejat de les accions de backoffice.

---

## IA i Agent Skills (M0616 S1)

Aquest projecte s'ha desenvolupat d'acord amb les directives d'alineació amb el mòdul **M0616** d'Intel·ligència Artificial i Skills d'Agents:

1. **Entorn utilitzat:**
   - S'ha emprat l'assistent de programació en parella **Antigravity** (dissenyat per Google DeepMind) operant sota el sandbox local.
2. **Skills consultades / utilitzades:**
   - **`vercel-labs/next-skills`:** Per a l'organització d'estructures d'App Router en Next.js 16, configuració de rutes dinàmiques, ús de Server Actions amb `startTransition` i formularis en Client Components.
   - **`vercel-labs/agent-skills/express`:** Patrons de disseny per a encaminament (routing) robust en NodeJS, configuracions CORS dinàmiques i validació estricta d'inputs mitjançant la llibreria `zod`.
   - **`prisma-skills`:** Per a la connexió en calent utilitzant adaptadors de controladors nadius de Postgres (`@prisma/adapter-pg` i `pg`), compatibles amb les darreres directrius de **Prisma 7**.
   - **`nextauth-skills`:** Per a la protecció asíncrona de rutes mitjançant callbacks JWT asincrònics i NextAuth Middleware.
