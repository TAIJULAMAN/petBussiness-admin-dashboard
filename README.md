# Pet Business Admin Dashboard

A React + Vite admin dashboard for managing pet-related businesses, bookings, users, categories, subscriptions, and more. The app uses Redux Toolkit Query for data fetching, Ant Design for UI tables and components, TailwindCSS for styling, and React Router for navigation.

## Tech Stack
- React (Vite)
- Redux Toolkit Query (RTK Query)
- React Router DOM
- Ant Design
- TailwindCSS + PostCSS
- ESLint

## Quick Start

Prerequisites:
- Node.js 18+ (recommended)
- npm 9+

Install dependencies:
```
npm install
```

Start development server:
```
npm run dev
```
This uses Vite; open the printed local URL in your browser.

Build for production:
```
npm run build
```

Preview production build:
```
npm run preview
```

Lint:
```
npm run lint
```

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

## Environment and API
The API base is configured in `src/config/envConfig.js`:
```js
export const imgUrl = "http://10.10.20.52:8001/";
export const url = `${imgUrl}api/`;
export const getBaseUrl = () => url;
```
- Effective REST base URL: `http://10.10.20.52:8001/api/`
- WebSocket base URL is also derived there.

RTK Query is centralized in `src/redux/api/baseApi.js`:
```js
baseQuery: fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
})
```
Ensure your Redux `auth` slice stores `accessToken` when the user signs in.

### Booking Management API
Defined in `src/redux/api/bookingManagementApi.js`:
- `GET dashboard/services-stats` – summary of services and counts
- `GET dashboard/service-bookings/:serviceId` – bookings for a specific service

Usage examples in the UI:
- `BookingManagement.jsx` lists services and links to each service’s bookings.
- `BookingTable.jsx` reads `serviceId` from the route and calls `useGetServiceBookingsQuery(serviceId)` to fetch bookings.

Routes (`src/routes/Router.jsx`):
- `/booking-management` – service list
- `/bookingTable/:serviceId` – bookings for a given service

## Styling
TailwindCSS is configured and used for layout and utility classes. Ant Design is used for complex components like tables, modals, tags, and pagination. See `tailwind.config.js` and `index.html` for Tailwind setup.

## Common Tasks
- Change API base URL: edit `src/config/envConfig.js`
- Add a new API endpoint: create an endpoint under `src/redux/api/*Api.js` via `baseApi.injectEndpoints`
- Add a new route: update `src/routes/Router.jsx`
- Add a new page: create under `src/page/<Feature>/` and register the route

## Conventions
- Keep imports at the top of files.
- Use RTK Query for all data fetching.
- Use `providesTags`/`invalidatesTags` for cache control in APIs.
- Keep UI state (modal, pagination) in component state; derive data via RTK Query.

## Troubleshooting
- 401 Unauthorized: ensure `auth.accessToken` is populated in Redux; `baseApi` attaches `Authorization: Bearer <token>` if available.
- Network errors: confirm backend is reachable at `imgUrl` and that `/api/` prefix matches your server.
- CORS issues: configure your backend to allow the Vite dev server origin.

## License
This project is proprietary to its owner. If you need to apply an open-source license, add one here (e.g., MIT) and update this section accordingly.
