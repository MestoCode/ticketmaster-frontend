# 🎫 Ticketmaster Event Booking System

A modern, responsive web application for browsing and booking tickets to live events. Built as a university project to demonstrate proficiency in modern web development technologies.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.18-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Author](#author)

## 🎯 About

This is a university project developed for a Web Development course. The application provides users with a seamless experience to discover, browse, and book tickets for concerts, festivals, and live events worldwide. The project integrates with the Ticketmaster Discovery API to fetch real-time event data.

**Academic Purpose:** This project showcases modern web development practices including React hooks, component-based architecture, API integration, responsive design, and state management.

## ✨ Features

- 🏠 **Hero Landing Page** - Eye-catching full-screen hero section with call-to-action
- 🎭 **Event Discovery** - Browse live events fetched from Ticketmaster API
- 📄 **Pagination** - Navigate through events with simple pagination controls (20 events per page)
- 🎟️ **Event Booking** - Interactive booking flow with detailed ticket information
- 🔐 **User Authentication** - Clean login system for user access
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🎨 **Modern UI/UX** - Beautiful interface with Tailwind CSS and smooth animations
- 🔄 **Real-time Data** - Live event information from Ticketmaster
- 💳 **Ticket Management** - View booked tickets with QR codes and event details

## 🛠️ Technologies Used

### Frontend Framework
- **React** (v19.2.0) - Component-based UI library
- **React Router DOM** (v6.x) - Client-side routing and navigation
- **React Hooks** - useState, useEffect, useNavigate, useLocation

### Styling
- **Tailwind CSS** (v3.4.18) - Utility-first CSS framework
- Custom color palette and responsive design
- Gradient effects and animations

### HTTP Client
- **Axios** - Promise-based HTTP client for API requests

### API
- **Ticketmaster Discovery API** - Real-time event data

### Development Tools
- **Create React App** - Project bootstrapping
- **npm** - Package management
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/MestoCode/ticketmaster-frontend.git
cd ticketmaster-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
REACT_APP_TICKETMASTER_API_KEY=your_api_key_here
```

4. **Start the development server**
```bash
npm start
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_TICKETMASTER_API_KEY=your_ticketmaster_api_key
```

**Getting a Ticketmaster API Key:**
1. Visit [Ticketmaster Developer Portal](https://developer.ticketmaster.com/)
2. Create an account or sign in
3. Create a new app
4. Copy your Consumer Key (API Key)

## 🚀 Usage

### Browse Events
- Visit the homepage to see featured events
- Click "Explore Events" to view all available events
- Use pagination controls to navigate through events

### Book Tickets
- Click "Book Now" on any event card
- View detailed ticket information including:
  - Event details (date, venue, location)
  - Price range
  - QR code confirmation
  - Ticket limits and additional info

### Navigation
- **Home** - Featured events and hero section
- **Events** - Complete list of all events with pagination
- **My Tickets** - View your booked tickets
- **About** - Project information and tech stack
- **Login** - User authentication

## 🔌 API Integration

This project uses the **Ticketmaster Discovery API** to fetch event data.

### API Endpoints Used:
```
GET https://app.ticketmaster.com/discovery/v2/events
```

### Parameters:
- `apikey` - Your API key
- `locale` - Event locale (*)
- `size` - Number of events per page (15-20)
- `page` - Page number for pagination

### Data Retrieved:
- Event name, ID, and URL
- Event images (16:9 ratio)
- Venue and location information
- Event dates
- Price ranges
- Ticket limits and restrictions

## 📁 Project Structure

```
mesto/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── assets/
│   │   ├── avatar_male.jpg
│   │   ├── fake-qr.jpg
│   │   ├── homepage-main.jpg
│   │   └── logo-tickets.png
│   ├── components/
│   │   ├── Card.js
│   │   ├── Navbar.js
│   │   └── Spinner.js
│   ├── pages/
│   │   ├── About.js
│   │   ├── Events.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── MyTickets.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .env
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Color Palette

```javascript
{
  primary: '#050910',          // Dark background
  app_bg: '#080c17',           // App background
  primary_important: '#19b2ff', // Bright blue (CTAs)
  primary_golden: '#ffb314',    // Golden (pricing)
  primary_hint: '#06e1ff',      // Cyan (accents)
}
```

## 📸 Screenshots

### Home Page
Full-screen hero section with featured events and responsive card layout.

### Events Page
Paginated event listing with filtering options.

### My Tickets
Detailed ticket view with QR code and event information.

### About Page
Project information and technology stack showcase.

## 🎓 Academic Information

**Course:** Web Development  
**Institution:** Lebanese International University (LIU)  
**Student:** Abed Mesto  
**Email:** 11930489@students.liu.edu.lb  
**Project Type:** University Assignment  

### Learning Objectives Achieved:
- ✅ React component architecture and hooks
- ✅ RESTful API integration
- ✅ Responsive web design with Tailwind CSS
- ✅ Client-side routing with React Router
- ✅ State management in React
- ✅ Modern UI/UX principles
- ✅ Git version control
- ✅ Environment variable configuration

## 📝 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation!**

## 🤝 Contributing

This is an academic project and is not open for contributions. However, feel free to fork and modify for your own learning purposes.

## 📄 License

This project is created for educational purposes. All event data is provided by Ticketmaster's public API.

## 👤 Author

**Abed Mesto**
- GitHub: [@MestoCode](https://github.com/MestoCode)
- Email: 11930489@students.liu.edu.lb
- University: Lebanese International University

## 🙏 Acknowledgments

- **Ticketmaster** for providing the Discovery API
- **Create React App** for the initial project setup
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing library

## 📞 Support

For questions or issues related to this project, please contact:
- Email: 11930489@students.liu.edu.lb

---

**Note:** This is an educational project developed for learning purposes. It is not affiliated with or endorsed by Ticketmaster.

Made with ❤️ by Abed Mesto | 2024
