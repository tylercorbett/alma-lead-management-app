# Alma Lead Management App

A modern web application for managing immigration law leads, built with Next.js 14 and TypeScript.

## Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/alma-lead-management-app.git
cd alma-lead-management-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Features

- 📝 Lead submission form with validation
- 🔒 Protected leads dashboard
- 📊 Lead management with sorting and filtering
- 🎨 Modern, responsive UI with styled-components
- 🔄 Real-time status updates
- 📱 Mobile-friendly design

## Authentication

To access the leads dashboard, use these credentials:

- **URL**: `/leads`
- **Email**: `test@test.com`
- **Password**: `tylerstest`



## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Setup

The application uses Next.js 14 and requires:

- Node.js 18.17 or later
- npm 9.6.7 or later

## Development Notes

- The application currently uses in-memory storage for leads (resets on server restart)
- File uploads in the form are UI-only and not processed
- Authentication is mock-based for demonstration purposes


