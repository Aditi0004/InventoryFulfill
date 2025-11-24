# IDIFOS - Intelligent Distributed Inventory & Fulfillment Optimization System

A production-quality, enterprise-grade engineering dashboard for distributed warehouse management, real-time order tracking, and system monitoring. Built with React, TypeScript, and modern web technologies.

## 🚀 Features

### 1. System Overview Dashboard
- Real-time system metrics (uptime, SLA, latency, throughput)
- Live order stream with auto-updating ticker
- Throughput visualization with time-series charts
- Service health monitoring with animated heartbeat indicators
- Comprehensive performance analytics

### 2. Warehouse Node & Cluster Manager
- **Consistent Hashing Ring Visualization** using React Flow
- Real-time node health indicators with CPU/RAM usage monitoring
- Interactive warehouse cluster management
- Geolocation mapping of distribution centers
- Simulate rebalance functionality for load distribution

### 3. Inventory Explorer
- **500+ SKU Management** with advanced search and filtering
- Multi-column sorting (name, quantity, utilization)
- Category-based filtering
- Stock utilization progress bars
- Pagination with 25 items per page
- Demand level indicators

### 4. Order Flow & Fulfillment Optimization
- **React Flow Pipeline Diagram** for route visualization
- Algorithm comparison (Dijkstra, A*, Greedy)
- Route cost breakdown and analysis
- Real-time optimization metrics
- Distance and time estimation

### 5. Prediction & Batch Jobs Console
- **30-Day Demand Forecasting** with interactive charts
- Batch job monitoring and history
- Model accuracy trend analysis
- Job status tracking with progress indicators
- Success rate analytics

### 6. Distributed Tracing & System Logs
- **X-Ray Style Call Graph** visualization
- Real-time log streaming with severity color coding
- Service trace analysis with latency breakdowns
- Terminal-style log console
- Auto-scrolling log feed

## 🎨 Design Features

- **AWS-Inspired Dark Theme** - Professional charcoal backgrounds with neon blue/purple accents
- **Animated Particle Background** - Subtle, non-distracting particle system
- **Framer Motion Animations** - Smooth page transitions and micro-interactions
- **Responsive Design** - Fully functional on desktop, tablet, and mobile devices
- **Professional UI Components** - Built with shadcn/ui for consistency
- **Real-time Updates** - Metrics refresh every 3 seconds via Zustand state management
- **Interactive Visualizations** - Recharts and React Flow for data presentation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library
- **React Router (Wouter)** - Client-side routing
- **Recharts** - Chart visualization
- **React Flow** - Node-based diagram editor
- **Lucide React** - Icon library

### Backend
- **Express.js** - Minimal server for development
- **In-Memory Storage** - Mock data generation for frontend-only demo

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

## 🏗️ Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── AnimatedBackground.tsx
│   │   │   ├── AppSidebar.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── OrderTicker.tsx
│   │   │   └── ServiceHeartbeat.tsx
│   │   ├── pages/             # Page components
│   │   │   ├── SystemOverview.tsx
│   │   │   ├── WarehouseManager.tsx
│   │   │   ├── InventoryExplorer.tsx
│   │   │   ├── OrderFlow.tsx
│   │   │   ├── PredictionsConsole.tsx
│   │   │   └── DistributedTracing.tsx
│   │   ├── store/             # Zustand state management
│   │   │   └── useStore.ts
│   │   ├── utils/             # Utility functions
│   │   │   └── mockData.ts    # Mock data generators
│   │   ├── App.tsx            # Main application component
│   │   └── index.css          # Global styles
│   └── index.html
├── shared/
│   └── types.ts               # TypeScript interfaces
├── server/                    # Express backend
└── README.md
```

## 🎯 Key Components

### State Management (Zustand)
- Global store for all application data
- Real-time metric updates every 3 seconds
- Optimistic UI updates for instant feedback
- Efficient re-rendering with selective subscriptions

### Mock Data Generation
- 6 warehouses with realistic coordinates
- 550+ inventory items across multiple categories
- Continuous order stream generation
- Randomized but realistic metrics (SLA: 97-99%, Latency: 40-250ms)
- Dynamic batch job simulation

### Visualization Libraries
- **Recharts**: Line charts, time-series data, forecasting
- **React Flow**: Consistent hashing ring, order pipeline, trace graphs
- Custom progress bars and health indicators

## 📱 Responsive Design

- **Desktop (1440px+)**: Full multi-column layouts, persistent sidebar
- **Tablet (768-1440px)**: 2-column grids, collapsible sidebar
- **Mobile (<768px)**: Single column, hamburger menu, stacked cards

## 🎨 Color Palette

- **Primary (Neon Blue)**: `hsl(221, 83%, 55%)`
- **Secondary (Purple)**: `hsl(271, 70%, 70%)`
- **Background**: `hsl(222, 47%, 5%)`
- **Card**: `hsl(222, 47%, 7%)`
- **Success (Green)**: `rgb(34, 197, 94)`
- **Warning (Amber)**: `rgb(245, 158, 11)`
- **Error (Red)**: `rgb(239, 68, 68)`

## 🚀 Performance Optimizations

- Component-level code splitting
- Memoized filtered/sorted data
- Virtualized scrolling for large datasets
- Debounced search inputs
- Lazy-loaded visualizations
- Optimized re-renders with Zustand selectors

## 📊 Data Flow

1. **Zustand Store** generates initial mock data
2. **setInterval** triggers metric updates every 3 seconds
3. **React components** subscribe to specific store slices
4. **UI updates** reflect changes with smooth animations
5. **User interactions** update store, triggering re-renders

## 🎓 Learning Highlights

This project demonstrates:
- Modern React patterns (hooks, context, state management)
- TypeScript for type-safe development
- Real-time data visualization
- Complex UI/UX with smooth animations
- Responsive design best practices
- Clean architecture and component composition
- Professional-grade dashboard development

## 🔮 Future Enhancements

- WebSocket integration for true real-time streaming
- Data export functionality (CSV, JSON)
- Advanced filtering with saved presets
- User preferences and customization
- Dark/light mode toggle
- Multi-warehouse comparison views
- Alert threshold configuration

## 📄 License

MIT License - Feel free to use this project for learning or portfolio purposes.

## 👨‍💻 Developer

Built as a showcase of production-quality React development practices and modern frontend engineering.

---

**Portfolio-ready SaaS-quality engineering dashboard suitable for Amazon SDE resume review.**
