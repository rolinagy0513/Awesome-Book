# About the .env.example file

  The .env is used for storing enviromental values that you dont want to share with others for example: api-key, endpoint-url

# How does it work

  1. Rename the file:
      .Rename as simply .env so github will ignore it

  2. Change the placeholder:
    .Replace the placeholder values (your_api_key_here) with your actual API key.
    .Update the URL's for the following operations:
      - VITE_BOOK_API_URL_AUTH: The base URL for authorization operations.
      - VITE_BOOK_API_URL_BOOK: The base URL for book-related operations.

# Notes
  1. Keep the .env file secure
  2. Use a .env.example file to help developers in the future

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
