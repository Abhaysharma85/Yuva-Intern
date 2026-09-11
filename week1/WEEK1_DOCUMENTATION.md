# Week 1 – React Project Setup

## 1. Project Setup

I created my React project using Next.js.


   using this command --> npx create-next-app@latest


The project is named `week1` and uses Next.js, React and TypeScript.

## 2. Project Structure

I created the following folders and components:

```text
app/
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── Card.tsx
│   └── Footer.tsx
├── pages/
└── styles/
```

I divided the website into small components so they can be easily reused.

## 3. Component Structure

```text
Home
├── Navbar
├── HeroSection
├── Card
├── Card
└── Footer
```

The Card component is reused twice.

## 4. Tools Used

- Next.js – for the React project
- TypeScript – for writing safer code
- ESLint – for checking code
- Prettier – for formatting code
- Git/GitHub – for saving and tracking the project

## 5. ESLint & Prettier

ESLint was already configured by Next.js.

I tested it using:

```bash
npm run lint
```

It ran without errors.

I also installed Prettier and added a `.prettierrc` file.

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2
}
```

I tested it using:

```bash
npm run format
```

## 6. Build Test

I tested the project using:

```bash
npm run build
```

The build completed successfully.

The project is using Next.js 16.3.4 with Turbopack.

## 7. GitHub

The project was connected to GitHub and the changes were committed and pushed successfully.

## 8. Future Plans

In the next weeks, I plan to add more pages, improve the design, make the website responsive, and add more functionality.