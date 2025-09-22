# Pet Business Admin Dashboard

A React + Vite admin dashboard for managing pet-related businesses, bookings, users, categories, subscriptions, and more. The app uses Redux Toolkit Query for data fetching, Ant Design for UI tables and components, TailwindCSS for styling, and React Router for navigation.

## Tech Stack
- React (Vite)
- Redux Toolkit Query (RTK Query)
- React Router DOM
- Ant Design
- TailwindCSS + PostCSS
- ESLint

## Project Structure
Key files and directories:
- `src/` – application source code
  - `config/envConfig.js` – base URLs for API, images, and WebSocket
  - `redux/api/baseApi.js` – RTK Query base API with baseUrl and auth header
  - `redux/api/*.js` – feature APIs (e.g., booking management)
  - `routes/Router.jsx` – app routes
  - `page/` – page-level components
    - `BookingManagement/BookingManagement.jsx`
    - `BookingManagement/BookingTable.jsx`
    - `sellerManagement/SellerManagement.jsx`
    - `CategoryManagement/CategoryManagement.jsx`
  - `shared/` – shared components (e.g., `PageHeading`)
- `vite.config.js` – Vite configuration
- `tailwind.config.js` – Tailwind configuration
- `postcss.config.js` – PostCSS configuration
- `eslint.config.js` – ESLint configuration

## License
This project is proprietary to its owner. If you need to apply an open-source license, add one here (e.g., MIT) and update this section accordingly.
