# Core Banking System Frontend

A modern, responsive banking application built with React and Electron, featuring a clean UI and comprehensive banking functionalities.

## 🏦 Features

### ✨ User Interface
- **Floating Sidebar Navigation** - Modern, collapsible sidebar with hover effects
- **Clean Dashboard Design** - Professional banking interface with service cards
- **Responsive Layout** - Optimized for desktop banking operations
- **Modern Typography** - Clean, readable fonts and spacing

### 🔐 Authentication
- **User Login System** - Secure user authentication flow
- **Session Management** - Maintains user session throughout the application
- **User Profile Display** - Shows logged-in user information

### 🏪 Banking Services Integration
- **GCB MTO Products** - Money transfer operations
- **Unity Link (OTC)** - Over-the-counter transactions
- **RIA (OTC & Direct to Account)** - International money transfers
- **Western Union (OTC)** - Global money transfer services
- **REMIT on EAGLE PAY** - Digital payment solutions
- **MoneyGram (OTC)** - International money transfer
- **Transfast (OTC & Other Banks)** - Cross-border payments

### 🎨 Design System
- **Tailwind CSS** - Utility-first CSS framework
- **FontAwesome Icons** - Professional iconography
- **Blue Theme** - Banking-appropriate color scheme
- **Card-based Layout** - Modern, clean component design

## 🚀 Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Electron** - Cross-platform desktop application framework
- **Tailwind CSS** - Utility-first CSS framework
- **FontAwesome** - Icon library via react-icons
- **JavaScript (ES6+)** - Modern JavaScript features

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/branded-hustlers/Banking-Frontend.git
   cd Banking-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Run as Electron app**
   ```bash
   npm run electron
   ```

## 🏗️ Project Structure

```
electron-banking-system/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── SideBar.jsx          # Floating sidebar navigation
│   ├── App.js                   # Main application component
│   ├── Home.jsx                 # Landing page
│   ├── Login.jsx                # User authentication
│   ├── MainDashboard.jsx        # Main banking dashboard
│   └── index.js                 # Application entry point
├── package.json
└── README.md
```

## 🎯 Usage

### Getting Started
1. Launch the application
2. Click "Get Started" on the home page
3. Navigate to the Login page
4. Enter your User ID and Password
5. Access the Main Dashboard with full banking functionality

### Navigation
- **Sidebar**: Hover to expand, click items to navigate
- **Search**: Use the search bar to find specific functions
- **Services**: Click on service cards to access different banking operations
- **Logout**: Use the logout button in the sidebar to end your session

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run electron` - Launch Electron app

### Key Components
- **App.js** - Main application routing and state management
- **Sidebar** - Navigation component with floating design
- **MainDashboard** - Primary banking interface
- **Login** - User authentication component

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. Key design elements:
- **Primary Color**: Blue (#3B82F6)
- **Background**: Light blue (#EFF6FF)
- **Cards**: White with subtle shadows
- **Typography**: Clean, modern fonts

### Adding New Services
To add new banking services, update the services array in `MainDashboard.jsx`:

```javascript
const services = [
  {
    name: "Your New Service",
    description: "Service description",
    logo: "🏦",
    color: "from-blue-500 to-blue-600"
  }
];
```

## 📱 Screenshots

- **Home Page**: Clean landing page with call-to-action
- **Login**: Secure authentication interface
- **Dashboard**: Comprehensive banking services overview
- **Sidebar**: Floating navigation with smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Branded Hustlers** - *Development Team*
- GitHub: [@branded-hustlers](https://github.com/branded-hustlers)

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for the utility-first approach
- FontAwesome for professional icons
- Electron for cross-platform capabilities

---

Built with ❤️ by [Branded Hustlers](https://github.com/branded-hustlers)