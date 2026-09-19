
# REST Countries & Interactive Map SPA

A modern, responsive Single Page Application built with React, TypeScript, and Tailwind CSS that allows users to explore countries worldwide, view detailed information, analyze borders, and inspect locations via an interactive Leaflet map.

## Live Demo
https://natalymelnichuk.github.io/rest-countries-api-react/


## Tech Stack
* **Frontend:** React, TypeScript, Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router (`HashRouter` for seamless GitHub Pages deployment)
* **Maps:** Leaflet & React-Leaflet
* **Data Handling:** Asynchronous API requests with a robust local fallback mechanism

## Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/natalymelnichuk/rest-countries-api-react.git]
   cd rest-countries-api-react

## Project Reflection

* **Development Process & Implementation** 
During the development and finalization of this single-page application, the primary objective was to refactor and polish a modern React application utilizing TypeScript, Tailwind CSS, React Router, and interactive map integration. The project architecture was built around modular services and clean component-driven design. Special attention was paid to robust error handling and API resilience. To counter strict CORS policies and rate limits from public endpoints, a seamless fallback mechanism to local JSON data was implemented, ensuring uninterrupted user experience. Furthermore, an interactive Leaflet map was integrated into the country detail page, featuring a prioritized coordinate-resolution hierarchy (capital coordinates first, followed by country-level coordinates).

### Challenges Faced & Solutions
During the development and production deployment, several key technical challenges were successfully addressed:

1. **Coordinate Priority Hierarchy for Maps:**
   * *Challenge:* Different countries lacked uniform geographic data, sometimes missing top-level coordinates or relying solely on capital city data.
   * *Solution:* Implemented a robust fallback hierarchy to determine map centers seamlessly—first prioritizing capital coordinates, then falling back to country-level coordinates to ensure every map renders accurately.

2. **API Resilience & CORS Fallbacks:**
   * *Challenge:* Public REST endpoints occasionally triggered rate limits (HTTP 429) or strict CORS blocks during intensive queries.
   * *Solution:* Built a resilient data service layer featuring an automatic fallback to local JSON datasets, guaranteeing uninterrupted app functionality.

3. **Leaflet Marker Asset Bundling (Vite):**
   * *Challenge:* Vite's static asset optimization failed to resolve default Leaflet marker image paths (`marker-icon.png`, `marker-shadow.png`), resulting in persistent 404 errors.
   * *Solution:* Explicitly imported the image modules and passed a strongly-typed custom `L.icon` instance directly into the React-Leaflet `<Marker>` component.

4. **SPA Client-Side Routing:**
   * *Challenge:* Standard HTML5 history routing caused 404 errors upon deep-link refreshes on static hosting environments like GitHub Pages.
   * *Solution:* Switched to `HashRouter` to ensure stable and predictable client-side navigation across all nested views.

5. **Environment Configuration & Security:**
   * *Challenge:* Safely managing configuration credentials without exposing sensitive tokens in the public repository.
   * *Solution:* Utilized Vite's built-in `import.meta.env` system alongside `.env` configuration, ensuring sensitive keys remain hidden and out of source control.