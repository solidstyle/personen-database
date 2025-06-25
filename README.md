# Personen Database Website

Een moderne web applicatie gebouwd met Next.js, TypeScript, en Prisma voor het beheren van een personen database.

## Features

- **Frontend**: Modern React interface met Tailwind CSS
- **Database**: SQLite database met Prisma ORM
- **Admin Panel**: Volledige admin functionaliteit voor beheer
- **Responsive Design**: Werkt op desktop en mobiel
- **Dark Mode**: Automatische dark mode ondersteuning
- **Vercel Ready**: Geoptimaliseerd voor Vercel deployment

## Database Schema

De applicatie gebruikt een simpele `Person` tabel met:
- `id`: Unieke identifier (auto-increment)
- `name`: Naam van de persoon
- `age`: Leeftijd van de persoon
- `createdAt`: Aanmaakdatum
- `updatedAt`: Laatste wijzigingsdatum

## Installatie & Setup

1. **Clone het project en navigeer naar de website folder**
   ```bash
   cd website
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Setup de database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Start de development server**
   ```bash
   npm run dev
   ```

5. **Open de applicatie**
   Open [http://localhost:3000](http://localhost:3000) in je browser

## Gebruik

### Hoofdpagina (/)
- Voeg nieuwe personen toe via het formulier
- Bekijk alle toegevoegde personen in een grid layout
- Navigeer naar het admin panel

### Admin Panel (/admin)
- Bekijk statistieken over de database
- Beheer alle personen in een tabel weergave
- Verwijder personen met bevestiging

## API Endpoints

- `GET /api/persons` - Haal alle personen op
- `POST /api/persons` - Voeg een nieuwe persoon toe
- `DELETE /api/persons/[id]` - Verwijder een specifieke persoon

## Deployment naar Vercel

1. **Push naar GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect met Vercel**
   - Ga naar [vercel.com](https://vercel.com)
   - Connect je GitHub repository
   - Vercel detecteert automatisch de Next.js configuratie

3. **Database voor productie**
   Voor productie gebruik, vervang SQLite door een cloud database (PostgreSQL op Vercel, PlanetScale, etc.)

## Tech Stack

- **Framework**: Next.js 15 met App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (local) / PostgreSQL (production)
- **ORM**: Prisma
- **Deployment**: Vercel

## Project Structuur

```
website/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel pagina
│   │   ├── api/persons/    # API routes
│   │   └── page.tsx        # Hoofdpagina
│   └── lib/
│       └── prisma.ts       # Prisma client configuratie
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migraties
└── README.md
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Database Management Scripts

### 🗄️ **Database Scripts**

```bash
# Database schema naar productie pushen
npm run db:push

# Database schema ophalen van productie
npm run db:pull

# Prisma client opnieuw genereren
npm run db:generate

# Database studio openen (visuele database editor)
npm run db:studio

# Database resetten (VOORZICHTIG!)
npm run db:reset
```

### 🚀 **Deployment Scripts**

```bash
# Snelle productie deployment (database + vercel)
npm run deploy:prod

# Preview deployment (database + vercel preview)
npm run deploy:preview

# Schema updaten en client regenereren
npm run update:schema

# Volledige workflow: schema + git + deploy
npm run full:deploy
```

### 📋 **Workflow Voorbeelden**

**1. Nieuwe database kolom toevoegen:**
```bash
# 1. Pas prisma/schema.prisma aan
# 2. Update database en genereer client
npm run update:schema
# 3. Test lokaal
npm run dev
# 4. Deploy naar productie
npm run deploy:prod
```

**2. Snelle iteratie tijdens ontwikkeling:**
```bash
npm run db:push     # Schema naar database
npm run dev         # Test lokaal
npm run deploy:preview  # Test op Vercel preview
```

**3. Database inspecteren:**
```bash
npm run db:studio   # Opent visuele database editor
```
