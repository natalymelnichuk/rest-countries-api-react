
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

## Local Development Setup

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Clone the Repository
   git clone [https://github.com/natalymelnichuk/rest-countries-api-react.git]
   cd rest-countries-api-react

## Key Features & User Capabilities

### 1. Global Country Explorer & Filtering
- **Real-Time Search:** Instantaneously search for countries by name across the global dataset.
- **Region Filtering:** Filter nations dynamically by geographic region (Africa, Americas, Asia, Europe, Oceania).
- **Overview Cards:** Clean, scannable cards displaying country flags, population figures, regions, and capital cities.

<!-- SCREENSHOT: Главная страница приложения (Desktop) — сетка карточек стран с открытым поиском или выбранным фильтром по региону -->

### 2. Detailed Country Profiles & Border Navigation
- **Comprehensive Country Insights:** View native names, subregions, capital cities, currencies, spoken languages, and top-level domains.
- **Interactive Border Links:** Clickable neighboring country badges allow seamless exploration across bordering nations without returning to the main list.

<!-- SCREENSHOT: Страница детальной информации о стране (Desktop) — с флагом, характеристиками, кнопками граничащих стран и картой -->
<img width="950" height="809" alt="Screenshot 2026-11-20 at 3 27 18 PM" src="https://github.com/user-attachments/assets/463797e2-9a6c-4459-8189-bd1a0013e1d9" />


### 3. Interactive Leaflet Map Integration
- **Dynamic Viewport Centering:** Automatically centers the map on the selected nation using a prioritized coordinate-resolution hierarchy (capital city coordinates first, falling back to country-level coordinates).
- **Custom Map Markers:** Renders reliable, properly bundled location pins across both local development and production builds.

<!-- SCREENSHOT: Крупный план интерактивной карты Leaflet с маркером столицы/страны -->

### 4. Resilient API Layer & Offline Fallback
- **Fault-Tolerant Data Fetching:** Automatically switches to a bundled local JSON dataset if the external REST Countries API encounters rate limits (`HTTP 429`), strict CORS policies, or network downtime—ensuring uninterrupted functionality.

### 5. Fully Responsive Mobile-First Design
- **Cross-Device Compatibility:** Adaptive layouts, responsive grids, and touch-friendly navigation optimized for mobile phones, tablets, and desktop screens.

<!-- SCREENSHOT: Мобильная версия (Mobile View) — главная страница или страница страны с картой на узком экране -->
