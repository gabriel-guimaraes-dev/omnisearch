# 🔍 Omnisearch

> A unified, high-performance web application to search, explore, and bookmark Games and Movies, seamlessly integrating multiple external APIs and functioning as an installable PWA.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 👁️ Live Demo & Preview

**🔗 [Click here to view the Live Demo](https://omnisearch-project.vercel.app/)**
<br>
**📺 [Watch the full Showcase Video on YouTube](https://youtu.be/YICMgIwcV3s)**

![Application Preview](./preview.gif)

## 🚀 About the Project

**Omnisearch** is a modern Single Page Application (SPA) designed to centralize the entertainment discovery experience. The core focus of this project was to implement advanced Front-end architecture, robust global state management, and an exceptional User Experience (UX).

### ✨ Key Features & Technical Solutions

- **Omnichannel Search:** Dynamic, tab-based interface allowing users to seamlessly switch between the Gaming and Cinema ecosystems.
- **Progressive Web App (PWA):** Fully installable on desktop and mobile devices, providing a native-like experience with offline caching capabilities configured via Vite.
- **Global Bookmark Vault:** Implementation of a robust global state management system using React's **Context API** to handle user favorites across different routes.
- **Data Persistence:** Real-time synchronization of the global state with the browser's `localStorage`, ensuring favorites survive page reloads and browser closures.
- **Dynamic Content & Native Video:** Parametrized navigation (`react-router-dom`) rendering rich, context-aware detail pages, including native `<video>` tag integration for game trailers via the RAWG API.
- **SEO & Accessibility (A11y):** Developed a Custom Hook (`useTitle`) to dynamically inject document titles based on the currently viewed game or movie, enhancing indexing and browser tab UX.
- **Responsive Design:** Fluid, Mobile-First layout powered by Tailwind CSS to ensure a pixel-perfect experience across all devices.

## ⚙️ Getting Started

To clone and run this application locally, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer.

```bash
# Clone this repository
$ git clone https://github.com/gabriel-guimaraes-dev/omnisearch.git

# Go into the repository
$ cd omnisearch

# Install dependencies
$ npm install

# Run the app in development mode
$ npm run dev
```

## 🧠 Architecture & Challenges Overcome

Throughout the development lifecycle, I tackled several significant technical challenges:
- **API Data Normalization:** Handling disparate data structures from completely independent sources (Gaming vs. Cinema APIs) and standardizing them into a cohesive UI.
- **React Component Lifecycle:** Successfully debugged and resolved conditional rendering conflicts intersecting with Hook calls and infinite scroll limits.
- **Advanced CSS Grid/Flexbox:** Hardened the UI against layout shifts caused by inconsistent image aspect ratios from external APIs, utilizing properties like `object-fit` and `shrink-0`.

---
Built with 💻 by Gabriel Guimarães Da Silva Gomes - [Let's connect on LinkedIn](https://www.linkedin.com/in/gabriel-guimaraes-fulldev/)