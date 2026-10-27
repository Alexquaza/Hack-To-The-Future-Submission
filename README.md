# Cove — DM Groups

Hackathon product: **folders for direct messages**, not only for servers.

Cove is a local demo of a chat app where you can group DMs the same way people already group servers — Work, Class, Family, Hackathon, and so on — without creating another community.

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer (this project was built with Node 24)
- npm (comes with Node)

## Run it (dev)

From this folder:

```bash
npm install
npm run dev
```

Open **http://localhost:5173/**

## Build and see the demo

Production build (output goes to `dist/`):

```bash
npm run build
npm run demo
```

Then open:

- **http://localhost:4173/**
- On another device on the same Wi-Fi, use the Network URL printed in the terminal

`npm run demo` and `npm run preview` both serve the production build on port 4173.

## What to try

1. Open **Friends** — DM groups appear on the main page and in the left list.
2. Click **New DM group** to create a named stack (this is a folder, not a server).
3. Drag a conversation onto a group, or right-click a DM → **Move to group**.
4. Open a thread and send a message.
5. Rename or delete a group. Placements persist in the browser (`localStorage`).

The left rail is for communities/servers. Groups live with DMs.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Live development server |
| `npm run build` | Typecheck and production build into `dist/` |
| `npm run demo` | Serve the production build locally |
| `npm run preview` | Same as `demo` |
