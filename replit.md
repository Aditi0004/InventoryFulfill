# IDIFOS - Intelligent Distributed Inventory & Fulfillment Optimization System

## Overview

IDIFOS is an enterprise-grade engineering dashboard for distributed warehouse management and real-time fulfillment optimization. The application provides comprehensive monitoring and visualization of warehouse clusters, inventory management, order routing, demand forecasting, and system tracing. Built as a demonstration of production-quality engineering practices, it features real-time data visualization, interactive flow diagrams, and AWS Console-inspired design aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing instead of React Router

**State Management**
- Zustand for global state management with a single store pattern
- Mock data generators simulate real-time distributed system behavior
- Stores manage warehouses, inventory, orders, metrics, logs, and routing optimization data
- State updates triggered by intervals to simulate live data streaming

**UI Component System**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Dark mode as the default theme with AWS Console-inspired color scheme
- Framer Motion for animations and page transitions
- Custom theme system using CSS variables for consistent color palette

**Data Visualization**
- Recharts for time-series graphs and analytics charts (throughput, forecasting)
- React Flow (@xyflow/react) for interactive node-based diagrams (consistent hashing ring, order routing pipelines)
- Custom components for real-time metrics, service health indicators, and log streaming

**Key Design Patterns**
- Component composition with clear separation between UI and logic
- Custom hooks for mobile detection and toast notifications
- Motion variants for consistent animation behavior across pages
- Responsive grid layouts adapting to different screen sizes

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- TypeScript throughout the entire stack
- Separate development and production server configurations

**Development vs Production**
- Development mode uses Vite middleware for HMR and on-demand compilation
- Production mode serves pre-built static assets from the dist folder
- Custom logging middleware tracks API request timing and responses

**API Structure**
- Routes registered through a central `registerRoutes` function
- Storage interface pattern allows swapping between in-memory and database implementations
- Currently uses in-memory storage (MemStorage) for user data
- API routes prefixed with `/api` convention

**Session & State Management**
- Session storage infrastructure in place (connect-pg-simple configured)
- Raw body parsing for webhook support
- JSON and URL-encoded request body parsing

### Data Storage

**Database Configuration**
- Drizzle ORM configured for PostgreSQL via Neon serverless driver
- Schema definition in shared folder for type sharing between client and server
- Migration system configured with drizzle-kit
- Currently minimal schema (users table) with UUID primary keys

**Data Models**
- User model with username/password fields
- Zod schemas for validation (createInsertSchema pattern)
- Type inference from Drizzle schema definitions
- Shared TypeScript types for domain objects (Warehouse, InventoryItem, Order, etc.)

**Mock Data Strategy**
- Comprehensive mock data generators for all dashboard features
- Simulates 6 warehouse locations across US West Coast
- 500+ SKU inventory items across multiple categories
- Real-time order generation with configurable algorithms
- 30-day forecast data and batch job history

### External Dependencies

**Core Libraries**
- React Query (@tanstack/react-query) for server state management and caching
- Date-fns for date manipulation and formatting
- Nanoid for unique identifier generation
- Class-variance-authority (CVA) for variant-based component styling

**Visualization & Interactivity**
- Recharts for statistical charts and graphs
- React Flow for node-based interactive diagrams
- Framer Motion for animations and transitions

**UI Framework**
- Complete Radix UI component collection (accordion, dialog, dropdown, popover, etc.)
- Custom Shadcn/ui components built on Radix primitives
- React Hook Form with Zod resolvers for form validation

**Database & ORM**
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for PostgreSQL connection
- Drizzle-zod for schema-to-Zod validation bridge

**Development Tools**
- Replit-specific plugins for development experience (error overlay, cartographer, dev banner)
- ESBuild for production server bundling
- TSX for TypeScript execution in development

**Styling & Theming**
- Tailwind CSS with PostCSS processing
- Custom font imports (Inter, JetBrains Mono from Google Fonts)
- Tailwind merge and CLSX for conditional class composition