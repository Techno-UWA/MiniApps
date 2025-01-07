(Started as a test of the Windsurf IDE: https://codeium.com/windsurf)

# Mini-Apps Hub

A centralized platform for accessing and managing single-purpose mini-applications built with Next.js, TypeScript, and Supabase.

## Features

- 🚀 Server-side rendering with Next.js
- 💎 Type-safe development with TypeScript
- 🎨 Responsive design using Tailwind CSS
- 🔐 Authentication and authorization via Supabase
- 📱 Mobile-first approach
- 🤖 Generative AI integration
- 📊 Analytics and monitoring
- 🔌 Modular mini-apps architecture

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Deployment**: Vercel
- **State Management**: React Context + Supabase Realtime
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Supabase account
- Vercel account (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mini-apps-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables in `.env.local`

4. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
├── src/
│   ├── app/                 # Next.js 13+ App Router
│   ├── components/          # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   ├── types/              # TypeScript type definitions
│   └── mini-apps/          # Individual mini-applications
├── public/                 # Static assets
├── styles/                 # Global styles and Tailwind configurations
└── tests/                 # Test files
```

## Mini-Apps Integration

Each mini-app follows a modular structure:

```
mini-apps/
├── [app-name]/
│   ├── components/     # App-specific components
│   ├── hooks/         # App-specific hooks
│   ├── types/         # App-specific types
│   └── index.tsx      # Main entry point
```

## Development Guidelines

1. Follow the TypeScript strict mode guidelines
2. Use Tailwind CSS for styling
3. Implement responsive design patterns
4. Write unit tests for critical functionality
5. Document new features and API changes

## Deployment

The application is configured for deployment on Vercel:

1. Push your changes to the main branch
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
