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

## Project Structure

```
alma-lead-management-app/
├── app/
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── context/          # React context providers
│   ├── leads/            # Leads dashboard page
│   ├── login/            # Login page
│   └── page.tsx          # Homepage with lead form
├── public/               # Static assets
└── types/               # TypeScript type definitions
```

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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
