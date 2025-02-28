# LitElement Window Management Demo

This project demonstrates advanced window management and inter-window communication using LitElement and TypeScript. It showcases how to handle multiple browser windows/tabs with controlled opening and closing mechanisms.

## Features

### Main Page (`my-element`)
- Automated tab opening system with a 30-second timer
- Centralized window management
- Real-time window status tracking
- Secure inter-window communication using postMessage
- Visual feedback for all operations

### Secondary Page (`second-page`)
- Unique window identification system
- Controlled closure mechanism
- Secure communication with the main window

## Technical Implementation

### Window Management
- Each window has a unique UUID
- Window references are stored in the main page
- Maximum of 2 windows can be opened
- Automatic window opening with 30-second intervals

### Inter-Window Communication
The project implements a secure postMessage system with the following message types:

1. From Secondary to Main:
   - `WINDOW_READY`: Notifies when a new window is initialized
   - `WINDOW_CLOSED`: Signals when a window is about to close

2. From Main to Secondary:
   - `CLOSE_WINDOW`: Commands a specific window to close

### Security Features
- Origin verification for all messages
- Secure window reference handling
- Controlled window lifecycle

## Project Structure

```
src/
├── my-element.ts      # Main page component
├── second-page.ts     # Secondary window component
└── index.ts          # Component exports

index.html           # Main page template
second.html         # Secondary page template
```

## Components

### MyElement (Main Page)
```typescript
interface OpenWindow {
  id: string;
  title: string;
  window: Window;
}
```

Key features:
- Window reference tracking
- Timer management
- Window status display
- Centralized closing control

### SecondPage
Key features:
- Unique ID display
- Message handling
- Controlled closure system

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Technical Requirements
- Node.js
- TypeScript
- LitElement
- Vite

## Browser Support
This project uses modern browser features including:
- Window API
- postMessage API
- UUID generation
- Modern JavaScript features

## Development Notes

### State Management
The main page maintains the state of all open windows including:
- Window count
- Timer status
- Window references
- Window IDs

### Event Handling
The project implements a robust event handling system:
- Message listeners are properly cleaned up
- Window references are managed securely
- Timer cleanup on component destruction

## Security Considerations
- All postMessage communications verify origin
- Window references are managed carefully
- No sensitive data is passed between windows

## Best Practices Implemented
- TypeScript interfaces for type safety
- Proper event listener cleanup
- Secure inter-window communication
- Component lifecycle management
- Clean and maintainable code structure

## License
ISC 