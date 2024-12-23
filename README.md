# Web Application for Managing Orders and Products

## Overview
This project is a web application designed to manage and display orders and products. It consists of multiple pages with components that allow users to view, filter, and manage orders and products. The application provides a clean and responsive user interface, real-time updates, and features like product search and language selection.

## Features and Functionalities

### 1. Application Structure
- **Separate Pages**: The application includes dedicated pages for managing orders and products, accessible via navigation links.
- **Navigation Menu**: The `SideBar` component provides route links to the Orders and Products pages.
- **Top Menu**: The `Header` component includes:
    - Company logo and name.
    - A search input field for search products by name.
    - Real-time current date and time.
    - A dropdown for selecting the language (Ukrainian, Russian, English).

### 2. Components
#### Navigation Menu
- Contains route links for navigating between "Orders" and "Products" pages.
- Styled and responsive to fit the overall design.

#### Top Menu
- Displays company logo and name.
- Includes a search input field that acts as a search engine for product names. The field shows a dropdown with matching products as the user types.
- Real-time updates for the current date and time.
- A dropdown for language selection with three available languages: Ukrainian, Russian, and English (default: Russian).

#### Orders Page
- Displays the page title and total number of orders.
- Lists orders with the following details:
    - Order name.
    - Total number of products in the order.
    - Creation date (in two formats).
    - Total order amount (in two currencies).
    - Delete order icon.
- **Functionalities**:
    - **Order Details Panel**: Clicking on an order displays detailed information in a side panel.
    - **Delete Order Button**: Clicking the delete button opens a confirmation popup with "Cancel" and "Delete" options. The "Delete" button removes the order and its associated products.

#### Products Page
- Displays the page title and total number of products.
- Features a dropdown filter to filter products by type.
- Displays product details:
    - Type icon.
    - Product name.
    - Product type.
    - Warranty dates in various formats.
    - Price in different currencies.
    - Associated order name.
    - Date in another format.
- **Functionalities**:
    - **Filter by Product Type**: A dropdown filter allows users to filter products by type.
    - Clicking on a specific product opens the `ProductDetails` page.

#### ProductDetails Page
- Displays detailed information about a specific product:
    - A pie chart showing the price distribution across different currencies.
    - Product name.
    - Product type.
    - Product serial number.
    - Product specifications.
    - Date in a specific format.

### 3. Data Handling
- Orders and products are managed using relationships, with each order containing its associated products.
- The data structure and relationships are modeled based on the provided `app.js` file.

### 4. Design
- All components are styled according to the provided screenshots, ensuring consistency across the application.

### 5. Code Structure
- The application follows a modular structure with reusable components.
- Navigation and routing are implemented using **React Router**.
- State management and real-time updates are handled efficiently.

## How to Run
1. Clone the repository.
2. Install dependencies by running `npm install`.
3. Start the development server with `npm start`.
4. Open the application in your browser at [http://localhost:3000/](http://localhost:3000/).

## Additional Notes
- **ESLint** and **Prettier** are included for streamlined development.
- **SASS** is used for styling.
- **Redux Toolkit** is used for state management.
- **LocalStorage** is utilized for data persistence.
- A backend simulation is provided in the `store/rest` folder.
- **FontAwesome** icons are used throughout the application.
- The codebase is organized for scalability and readability.
- Tests are included to verify the functionality of critical components and features.
- All test task requirements have been fulfilled and demonstrated.
# Inventory
