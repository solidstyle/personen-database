<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Project: Personen Database Website

Dit is een Next.js project met TypeScript, Tailwind CSS, en Prisma voor database functionaliteit.

## Project Structuur
- **Frontend**: Next.js met React components, Tailwind CSS voor styling
- **Backend**: Next.js API routes voor CRUD operaties
- **Database**: SQLite met Prisma ORM voor lokale ontwikkeling
- **Deployment**: Geconfigureerd voor Vercel deployment

## Database Schema
- **Person model**: id, name, age, createdAt, updatedAt
- Gebruik Prisma voor alle database operaties

## Coding Guidelines
- Gebruik TypeScript voor type safety
- Gebruik 'use client' directive voor client-side components
- Implementeer proper error handling in API routes
- Gebruik Nederlandse teksten in de UI
- Volg React best practices voor state management
- Gebruik Tailwind CSS voor consistent styling

## API Endpoints
- GET/POST `/api/persons` - Haal alle personen op / Voeg nieuwe persoon toe
- DELETE `/api/persons/[id]` - Verwijder specifieke persoon

## Features
- Hoofdpagina: Formulier om personen toe te voegen + lijst van alle personen
- Admin pagina: Overzicht met statistieken en mogelijkheid om personen te verwijderen
- Responsive design met dark mode support
