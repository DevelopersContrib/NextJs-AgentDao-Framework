# NextJS AgentDao Framework - Project Index

## Overview
This is a Next.js 14.2.2 template framework designed for VNOC and AgentDAO domains. It provides a complete web application structure with dynamic theming, API integration, and multi-domain support.

## Project Structure

### Core Configuration
- **Framework**: Next.js 14.2.2 with App Router
- **Styling**: Tailwind CSS with custom prefix `tw-`
- **State Management**: Zustand
- **UI Components**: React Bootstrap + Custom Components
- **Icons**: FontAwesome + Lucide React
- **Animations**: Framer Motion + React TSParticles

### Key Dependencies
```json
{
  "next": "14.2.2",
  "react": "18.2.0",
  "tailwindcss": "3.3.2",
  "zustand": "^5.0.3",
  "axios": "^1.4.0",
  "framer-motion": "^12.0.6",
  "lucide-react": "^0.474.0",
  "react-tsparticles": "^2.12.2"
}
```

## Directory Structure

### `/app` - Next.js App Router
```
app/
├── layout.jsx              # Root layout with metadata generation
├── page.jsx                # Homepage
├── about/page.jsx          # About page
├── buy/                    # Domain purchase flow
│   ├── layout.jsx
│   └── page.jsx
├── partner/                # Partnership flow
│   ├── layout.jsx
│   └── page.jsx
├── contact/page.jsx        # Contact page
├── referral/page.jsx       # Referral system
├── terms/page.jsx          # Terms of service
├── privacy/page.jsx        # Privacy policy
├── cookie/page.jsx         # Cookie policy
├── developer/page.jsx      # Developer resources
├── invest/page.jsx         # Investment page
├── staffing/page.jsx       # Staffing page
├── apps/page.jsx           # Apps showcase
└── api/                    # API routes
    ├── domain/route.js     # Domain detection
    ├── adao-fetcher/route.js # ADAO API proxy
    ├── leads/route.js      # Lead capture
    ├── buy/route.js        # Purchase processing
    └── partner/route.js    # Partnership processing
```

### `/components` - React Components
```
components/
├── Header.jsx              # Main navigation header
├── Footer.jsx              # Site footer
├── Logo.jsx                # Logo component
├── Navigation.jsx          # Navigation menu
├── Hero/index.jsx          # Hero section
├── Features/index.jsx      # Features showcase
├── Revenue/index.jsx       # Revenue section
├── Cta/index.jsx           # Call-to-action
├── AgentSection.jsx        # Featured agents display
├── TokenSalePopup.jsx      # FOMO popup notifications
├── AnimatedBackground.jsx  # Background animations
├── LoadingState.jsx        # Loading indicators
├── ErrorBlock.jsx          # Error handling
├── ScriptLoader.jsx        # Script management
├── Buy/                    # Purchase flow components
│   ├── Container.jsx
│   ├── Form.jsx
│   └── Thanku.jsx
├── Partner/                # Partnership components
│   ├── Container.jsx
│   ├── Form.jsx
│   ├── Step1.jsx
│   ├── Step2.jsx
│   ├── Step3.jsx
│   └── Thanku.jsx
└── ScriptWidget/           # Referral scripts
    └── ReferralScript.jsx
```

### `/lib` - Utility Libraries
```
lib/
├── data.jsx                # Data fetching utilities
├── getEnvVar.js            # Environment variable management
├── models/
│   └── routes.js           # API route definitions
├── hooks/                  # Custom React hooks
│   ├── useADAOFetcher.js   # ADAO API integration
│   ├── userAgentFetcher.js # Agent data fetching
│   ├── useReferralFetcher.js # Referral system
│   └── useThemeFetcher.js  # Theme management
└── store/                  # Zustand stores
    ├── useAgentStore.js    # Agent state management
    ├── useReferralStore.js # Referral state
    └── useThemeStore.js    # Theme state
```

## Key Features

### 1. Multi-Domain Support
- Dynamic domain detection via middleware
- Domain-specific theming and configuration
- Automatic www redirect (production only)
- Domain-based API calls

### 2. Dynamic Theming System
- Server-side theme fetching from API
- Client-side theme state management
- Dynamic logo and branding
- Customizable color schemes

### 3. API Integration
- **CONTRIB API**: Domain configuration and data
- **ADAO API**: Agent and token data
- **Lead Management**: Email capture and processing
- **Purchase Flow**: Domain and token purchasing

### 4. AgentDAO Integration
- Featured agents display
- Token value calculations
- Purchase flow integration
- Real-time agent data

### 5. Analytics & Tracking
- Google Analytics integration
- Google AdSense support
- Matomo analytics
- Custom event tracking

### 6. SEO & Metadata
- Dynamic meta tags per domain
- Open Graph support
- Twitter Card integration
- Sitemap generation
- Robots.txt handling

## API Routes

### `/api/domain`
- **Method**: GET
- **Purpose**: Returns current domain
- **Response**: `{ domain: string }`

### `/api/adao-fetcher`
- **Methods**: GET, POST, PUT, DELETE
- **Purpose**: Proxy for ADAO API calls
- **Features**: Error handling, timeout management

### `/api/leads`
- **Method**: POST
- **Purpose**: Capture email leads
- **Integration**: CONTRIB forms API

### `/api/buy`
- **Method**: POST
- **Purpose**: Process domain/token purchases
- **Features**: User validation, email notifications

### `/api/partner`
- **Method**: POST
- **Purpose**: Handle partnership applications
- **Features**: Multi-step form processing

## Environment Variables

### Required Variables
```env
API_KEY=your_api_key
API_URL=your_api_url
API_KEY_ADAO=your_adao_api_key
API_URL_ADAO=your_adao_api_url
NEXT_PUBLIC_VERCEL_URL=your_domain
CONTRIB_API1=your_contrib_api_url
```

## Styling System

### Tailwind Configuration
- Custom prefix: `tw-`
- Content paths: `./pages/**/*`, `./components/**/*`, `./app/**/*`
- Custom color schemes
- Responsive design utilities

### CSS Architecture
- `globals.css`: Global styles and Tailwind imports
- `custom.css`: Custom component styles
- Bootstrap integration for additional components

## State Management

### Zustand Stores
1. **useThemeStore**: Theme and branding data
2. **useAgentStore**: Agent listings and data
3. **useReferralStore**: Referral system state

### Custom Hooks
1. **useFetchTheme**: Server-side theme fetching
2. **useADAOFetcher**: ADAO API integration
3. **useFetchAgent**: Agent data management
4. **useReferralFetcher**: Referral system integration

## Deployment Considerations

### Next.js Configuration
- React Strict Mode enabled
- Custom headers for caching
- Image domain whitelist
- Environment variable exposure

### Middleware
- Automatic www redirect (production)
- Domain-based routing
- Request processing

### Performance
- Static generation where possible
- Image optimization
- Caching strategies
- Code splitting

## Development Workflow

### Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint checking
```

### Key Development Files
- `next.config.js`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `middleware.ts`: Request middleware
- `jsconfig.json`: JavaScript configuration

## Integration Points

### External Services
1. **CONTRIB Network**: Lead management and forms
2. **AgentDAO**: Agent marketplace and tokens
3. **VNOC**: Domain management and branding
4. **Google Services**: Analytics and AdSense
5. **Matomo**: Alternative analytics

### Third-Party APIs
- Domain configuration API
- Agent marketplace API
- Lead capture API
- Email notification system
- Payment processing (via CONTRIB)

## Security Features

- Environment variable validation
- API key management
- CORS handling
- Input validation
- Error boundary implementation

## Customization Points

### Domain-Specific Customization
- Logo and branding via API
- Color schemes and themes
- Content and messaging
- Feature toggles

### Component Customization
- Modular component structure
- Props-based configuration
- Theme-aware styling
- Responsive design patterns

---

This framework provides a complete foundation for building domain-specific applications within the AgentDAO ecosystem, with full integration capabilities and customizable theming.
