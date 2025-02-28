# LitElement Window Management Demo

This project demonstrates advanced window management and inter-window communication using LitElement and TypeScript. It showcases how to handle multiple browser windows/tabs with controlled opening and closing mechanisms.

## Features

### Main Page (`my-element`)

- Automated tab opening system with a 30-second timer
- Centralized window management
- Real-time window status tracking
- Secure inter-window communication using postMessage
- Visual feedback for all operations
- Modular styling with CSS-in-JS

### Secondary Page (`second-page`)

- Unique window identification system
- Controlled closure mechanism
- Secure communication with the main window
- Modular styling with CSS-in-JS

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
├── styles/           # Component styles
│   ├── my-element.styles.ts
│   └── second-page.styles.ts
└── index.ts          # Component exports

test/
├── my-element.test.ts    # Tests for main component
└── second-page.test.ts   # Tests for secondary component

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
- Modular styling system

### SecondPage

Key features:

- Unique ID display
- Message handling
- Controlled closure system
- Modular styling system

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

4. Run tests:

```bash
npm test
```

5. Run tests in watch mode:

```bash
npm run test:watch
```

## Technical Requirements

- Node.js
- TypeScript
- LitElement
- Vite
- @web/test-runner
- Chai
- Sinon

## Testing Infrastructure

### Test Setup

The project uses a comprehensive testing setup:

- @web/test-runner for running tests in real browsers
- Chai for assertions
- Sinon for mocks and stubs
- TypeScript support with esbuild
- Continuous Integration with GitHub Actions

### Continuous Integration

Tests are automatically run on:

- Every push to main branch
- Every pull request
- Multiple Node.js versions (16.x, 18.x, 20.x)
- Ubuntu latest environment

Test artifacts are stored for 30 days and can be accessed through GitHub Actions.

### Test Coverage

The test suite covers:

- Component rendering and initialization
- User interactions (clicks, events)
- State management
- Window communication
- Event handling
- Resource cleanup
- Edge cases and error scenarios

### Test Conventions

- One test file per component
- Async/await pattern for component updates
- Proper cleanup in teardown
- Comprehensive mocking of window APIs
- Isolated component testing

## Browser Support

This project uses modern browser features including:

- Window API
- postMessage API
- UUID generation
- Modern JavaScript features
- Shadow DOM
- Custom Elements

## Development Notes

### State Management

The main page maintains the state of all open windows including:

- Window count
- Timer status
- Window references
- Window IDs

### Styling System

- Modular CSS-in-JS approach
- Styles separated into dedicated files
- Easy theme customization
- Scoped styles per component

### Event Handling

The project implements a robust event handling system:

- Message listeners are properly cleaned up
- Window references are managed securely
- Timer cleanup on component destruction
- Proper async event testing

## Security Considerations

- All postMessage communications verify origin
- Window references are managed carefully
- No sensitive data is passed between windows
- Test coverage for security features

## Best Practices Implemented

- TypeScript interfaces for type safety
- Proper event listener cleanup
- Secure inter-window communication
- Component lifecycle management
- Clean and maintainable code structure
- Comprehensive test coverage
- Modular styling system
- Proper test isolation

## License

MIT
