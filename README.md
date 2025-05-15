
# Redbubble Store Browser

## Project info

**URL**: https://lovable.dev/projects/6b4680ec-bfcb-439e-b220-5fb0b79bca9a

## About This Project

This application is a web-based browser for Redbubble store products, featuring a Tinder-like swiping interface to discover and save favorite items. The app is designed to showcase products from a specific Redbubble store, allowing users to swipe through products and save their favorites.

### Key Features

- **Product Swiping Interface**: Tinder-style card swiping to browse through products
- **Favorites Collection**: Save liked products to a personal collection
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Technical Implementation

### Architecture

The application follows a React component-based architecture with the following structure:

1. **Pages**:
   - SwipePage: Main product browsing interface with swipeable cards
   - FavoritesPage: Collection of liked products
   - Index: Landing page with navigation to main features

2. **Components**:
   - ProductCard: Swipeable card component displaying product details
   - SwipeControls: UI controls for liking/disliking products
   - ProductGrid: Grid layout for displaying saved products
   - OnboardingModal: First-time user instructions

3. **Context**:
   - LikedProductsContext: Global state management for saved products

4. **Services**:
   - redbubbleService: Handles product data fetching, with support for future scraping API integration

### Data Flow

The application is designed to work with either:
- Mock data (for development and testing)
- A dedicated scraping API (for production use)

The service layer is prepared to connect to an external scraping API by setting the `VITE_SCRAPING_API_URL` environment variable. When this variable is set, the application will attempt to fetch real product data from the specified scraping service.

### Frontend Technologies

- React with TypeScript for type-safe component development
- Tailwind CSS for responsive styling
- shadcn/ui for consistent design components
- React Context API for state management
- Local Storage for persisting user's liked products

## Development Roadmap

1. **Phase 1** ✅ - Initial application setup with mock data and core UI components
2. **Phase 2** ✅ - Implement service layer with API integration capability
3. **Phase 3** (Future) - Connect to a dedicated scraping service or backend proxy
4. **Phase 4** (Future) - Add user authentication and cloud storage for favorites

## How to Run the Project

See setup instructions below for running the project locally.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6b4680ec-bfcb-439e-b220-5fb0b79bca9a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Environment Variables

To use a real scraping API instead of mock data, set the following environment variable:

```
VITE_SCRAPING_API_URL=https://your-scraping-api-endpoint
```

When this variable is set, the application will attempt to fetch real product data from your Redbubble store.

## Deploy with Lovable

To deploy this project, open [Lovable](https://lovable.dev/projects/6b4680ec-bfcb-439e-b220-5fb0b79bca9a) and click on Share -> Publish.

