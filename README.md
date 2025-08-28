# Portfolio Generator React App

A modern React.js application that allows users to create dynamic portfolios with authentication, theme switching, and comprehensive form handling.

## Features

### Authentication System
- **Sign Up**: Create new user accounts with email validation
- **Login**: Secure user authentication 
- **Form Validation**: Complete client-side validation for all inputs
- **Protected Routes**: Dashboard access requires authentication

### Dashboard Features
- **Portfolio Generator**: Comprehensive form to create portfolios
- **Theme Switching**: Light/Dark mode toggle with persistence
- **Dynamic Content Management**: Add/remove projects, education, and skills
- **File Upload**: Profile picture upload with preview
- **Responsive Design**: Mobile-friendly interface

### Portfolio Builder
- **Personal Information**: Name, title, about me, profile picture
- **Contact Information**: Email, LinkedIn, GitHub, personal website
- **Educational Background**: Multiple degrees with dates and percentages
- **Skills Management**: Dynamic skill selection and management
- **Project Showcase**: Multiple projects with descriptions, links, and images

## Technology Stack

- **React 18** - Modern React with Hooks
- **React Router Dom** - Client-side routing
- **CSS3** - Custom styling with CSS variables for theming
- **Local Storage** - Data persistence for authentication and preferences
- **Font Awesome** - Icons for enhanced UI
- **Google Fonts** - Typography (Poppins, Roboto Slab)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd portfolio-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Authentication
1. **Sign Up**: Create a new account by filling out the signup form
2. **Login**: Use your credentials to access the dashboard
3. **Logout**: Use the logout button in the dashboard header

### Creating a Portfolio
1. Click "Create Your Portfolio" button in the dashboard
2. Fill out the comprehensive form with your details:
   - Upload a profile picture
   - Add personal and contact information
   - Include educational qualifications
   - Select relevant skills
   - Add project details
3. Click "Generate Portfolio" to create your portfolio

### Theme Switching
- Use the toggle button in the top navigation to switch between light and dark themes
- Your preference is automatically saved for future sessions

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Project Structure

```
src/
├── components/
│   ├── Auth.js              # Authentication component
│   ├── Dashboard.js         # Main dashboard component
│   └── ProtectedRoute.js    # Route protection component
├── Auth.css                 # Authentication styles
├── Dashboard.css            # Dashboard styles
├── App.js                   # Main app component with routing
├── App.css                  # Global app styles
├── index.js                 # App entry point
└── index.css               # Global CSS with fonts and resets
```

## Key Features Implemented

### Form Validation
- Email format validation
- Password confirmation matching
- Required field validation
- Terms and conditions agreement

### State Management
- React Hooks for local state management
- Persistent authentication state
- Theme preference persistence
- Dynamic form data management

### Routing
- Protected routes for authenticated users
- Automatic redirection based on authentication status
- Clean URL structure

### Responsive Design
- Mobile-first approach
- Flexible layouts using CSS Grid and Flexbox
- Adaptive typography and spacing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contact

Project by Angshuman Paul ♥
- Email: akash297gjjuk@gmail.com
- Tel: 9796312481

© 2025 JOB Sahaytha. All rights reserved.
