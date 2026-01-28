# AI Ticket Triage & Auto-Resolution System - Frontend

A clean, professional React + TypeScript frontend dashboard for an AI-powered ticket triage system.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Router** - Client-side routing

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:5000`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── api/
│   └── tickets.ts          # API service layer
├── components/
│   ├── TicketCard.tsx      # Ticket display card
│   ├── TicketForm.tsx      # Create ticket form
│   ├── PriorityBadge.tsx   # Priority indicator
│   ├── StatusBadge.tsx     # Status indicator
│   └── SLAIndicator.tsx    # SLA warning display
├── pages/
│   ├── Dashboard.tsx       # Main tickets dashboard
│   └── CreateTicket.tsx    # Ticket creation page
├── types/
│   └── ticket.ts           # TypeScript interfaces
├── App.tsx                 # Main app with routing
├── main.tsx                # App entry point
└── index.css               # Global styles
```

## Features

### Dashboard Page (`/`)
- Fetches and displays all tickets from backend API
- Shows ticket statistics (total, open, breached SLA, resolved)
- Displays tickets in a responsive grid layout
- Each ticket card shows:
  - Title and description
  - Status and priority badges (color-coded)
  - Category
  - Confidence score (visual progress bar)
  - Assigned agent
  - SLA due time with breach indicator
  - Creation date
- Real-time refresh capability
- Loading and error states

### Create Ticket Page (`/create`)
- Form to create new tickets
- Input fields:
  - Title (required)
  - Description (required)
  - Created By ID (pre-filled, editable)
- Submits to backend API
- Success notification with auto-redirect
- Form validation and error handling

## API Integration

### Base URL
```
http://localhost:5000/api
```

### Endpoints Used

**GET /tickets**
- Fetches all tickets
- Response: Array of ticket objects

**POST /tickets**
- Creates a new ticket
- Request body:
  ```json
  {
    "title": "string",
    "description": "string",
    "createdById": "string"
  }
  ```

## Styling Guidelines

The UI follows a minimal, professional design:
- Clean white cards with subtle shadows
- Color-coded priority and status badges
- Red highlights for SLA breaches
- Responsive grid layouts
- Professional typography (Inter font)
- Consistent spacing and alignment

## Notes

- No authentication/authorization implemented (as per requirements)
- All data fetched from real API (no mocking)
- Backend must be running for full functionality
- `createdById` is temporarily hardcoded to "user-001" in the form

## Troubleshooting

**CORS Errors:**
Ensure your backend has CORS enabled for `http://localhost:3000`

**Connection Failed:**
Verify the backend is running on `http://localhost:5000`

**Port Already in Use:**
Change the port in `vite.config.ts` if 3000 is occupied

## Production Build

To create a production build:
```bash
npm run build
```

The optimized files will be in the `dist/` directory.

---

Built for final-year engineering project demonstration and technical interviews.
