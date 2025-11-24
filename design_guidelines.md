# IDIFOS Design Guidelines
## Amazon SDE-Grade Engineering Dashboard

### Design Approach
**Utility-Focused Design System** - AWS Console-inspired enterprise dashboard with emphasis on data density, real-time updates, and professional visual hierarchy.

---

## Core Visual Identity

### Theme & Color Strategy
- **Base Theme**: Dark mode by default (AWS-inspired charcoal/slate backgrounds)
- **Accent Colors**: Neon blue + purple gradient accents for interactive elements, charts, and status indicators
- **Background Treatment**: Animated gradient or subtle particle effect background (non-distracting)
- **Status Colors**: Green (healthy), amber (warning), red (critical) for system metrics

### Typography System
- **Headings**: Bold, technical sans-serif (e.g., Inter, Geist Sans)
  - H1: 2.5rem (dashboard titles)
  - H2: 2rem (section headers)
  - H3: 1.5rem (card titles)
- **Body Text**: 0.875rem - 1rem (data tables, logs, metrics)
- **Monospace**: Code/log displays, trace IDs, technical identifiers
- **Hierarchy**: Clear contrast between dashboard titles, metric labels, and data values

---

## Layout Architecture

### Global Structure
- **Left Sidebar Navigation** (240px fixed width)
  - IDIFOS logo/branding at top
  - 6 page links with icons (System Overview, Warehouse Manager, Inventory Explorer, Order Flow, Predictions, Tracing)
  - Active state: Neon accent border + background glow
  - Hover: Smooth highlight transition
  
- **Top Navbar** (60px height)
  - Breadcrumb navigation
  - Real-time system status badge (uptime %)
  - User profile/settings icon
  
- **Main Content Area**
  - Padding: Consistent p-6 to p-8
  - Max-width container for readability
  - Grid-based card layouts

### Spacing System
**Tailwind Units**: Consistent use of 2, 4, 6, 8, 12, 16 units
- Card padding: p-6
- Section gaps: gap-6 to gap-8
- Margin between sections: mb-8
- Grid gaps: gap-4 for tight layouts, gap-6 for breathing room

---

## Component Library

### Dashboard Cards
- Dark background with subtle border (border-slate-700/50)
- Rounded corners (rounded-lg)
- Hover: Subtle elevation lift + border color shift to accent
- Header with icon + title + optional action button
- Content area with metrics/charts

### Data Tables
- Zebra striping on hover rows
- Fixed header with sorting indicators
- Pagination controls at bottom
- Search/filter bar above table
- Status badges with color coding

### Charts & Visualizations
- **Recharts Integration**: Line charts (throughput, forecasting), bar charts (latency distribution)
- Neon blue/purple gradient fills
- Grid lines: Subtle dark gray
- Tooltips: Dark with accent border
- Axis labels: Muted gray text

### Live Data Components
- **Order Stream Ticker**: Horizontal auto-scrolling text feed with fixed height
- **Service Heartbeat Dots**: Pulsing animated circles (green = healthy)
- **Real-time Logs**: Terminal-style scrollable container, monospace font, severity color prefixes
- **Metric Cards**: Large numbers with trend indicators (↑↓ arrows)

### Interactive Elements
- **Buttons**: 
  - Primary: Neon blue gradient with hover glow
  - Secondary: Outlined with accent color
  - Danger: Red accent for critical actions
- **Progress Bars**: Stock utilization with gradient fill (green→yellow→red based on threshold)
- **Node Health Indicators**: CPU/RAM usage as horizontal bars with percentage labels

### React Flow Diagrams
- **Hashing Ring**: Circular layout with warehouse nodes
- **Order Pipeline**: Left-to-right flow with decision nodes
- **Trace Graph**: Tree structure with latency annotations
- Dark theme nodes with accent borders
- Animated edges for active data flows

---

## Page-Specific Patterns

### System Overview
- 4-column grid of metric cards (responsive: 2-col tablet, 1-col mobile)
- Full-width throughput chart below
- Order stream ticker pinned to bottom section

### Warehouse Manager
- Split view: React Flow diagram (left 60%) + control panel (right 40%)
- Map component in secondary card
- Node details in expandable sidepanel

### Inventory Explorer
- Search bar + filters in sticky header
- Full-width data table (virtualized for 500+ rows)
- Pagination footer

### Order Flow
- React Flow canvas as main content
- Collapsible side panel for route cost breakdown
- Algorithm selector dropdown

### Predictions Console
- Top row: 3 metric summary cards
- Middle: Full-width forecasting chart
- Bottom: Batch job history table

### Tracing & Logs
- Top: X-Ray call graph visualization
- Bottom: Scrollable log stream (auto-scroll toggle)

---

## Animations & Interactions

### Micro-Interactions (Framer Motion)
- Page transitions: Fade + slide (200ms)
- Card hover: Scale 1.02 + shadow lift
- Button clicks: Scale down momentary
- Live data updates: Subtle highlight pulse

### Auto-Updates
- Metrics refresh: 3-second intervals with smooth number transitions
- Order stream: Continuous scroll
- Logs: Append with fade-in

### Professional Constraints
- **NO** excessive animations or AI-like chatbot aesthetics
- Focus on data clarity over visual flair
- Subtle, purposeful motion only

---

## Responsive Behavior
- **Desktop (1440px+)**: Full multi-column layouts, sidebar always visible
- **Tablet (768-1440px)**: 2-column grids, collapsible sidebar
- **Mobile (<768px)**: Single column, hamburger menu navigation, stacked cards

---

## Accessibility
- High contrast text (white/light gray on dark)
- Focus indicators on all interactive elements
- Keyboard navigation support
- ARIA labels for charts and dynamic content

---

This design creates a professional, enterprise-grade dashboard that feels like an internal Amazon AWS tool—data-dense, performant, and visually cohesive with neon accents that guide attention without overwhelming the technical content.