# Voltage Controller System

A web-based IoT application for monitoring and controlling voltage stabilizers and related devices. This React application provides real-time data visualization, device management, and user authentication.

## Features

- **User Authentication**: Secure login, registration, and password reset functionality
- **Device Management**: Add, view, and manage multiple devices
- **Real-time Monitoring**: View voltage, current, power, energy, temperature, and humidity readings
- **Interactive Dashboard**: Charts and gauges to visualize device data
- **Responsive Design**: Works on mobile and desktop devices

## Project Structure

```
src/
├── assets/ - Images and static resources
├── components/
│   ├── auth/ - Authentication related components
│   ├── dashboard/ - Device dashboard components
│   ├── devices/ - Device listing and management
│   └── layout/ - Page layout components
├── config/ - Firebase configuration
├── contexts/ - React context providers
├── hooks/ - Custom React hooks
├── pages/ - Main application pages
│   ├── auth/ - Login and registration pages
│   ├── dashboard/ - Device monitoring pages
│   ├── Home.tsx - Main device listing page
|   ├── Settings.tsx - Settings page
|   └── NotFound.tsx - NotFound page
├── services/ - API services for auth and devices
└── types/ - TypeScript type definitions
```

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: Type safety for components and data
- **Firebase**: Authentication and real-time database
- **Recharts**: Data visualization
- **React Router**: Navigation
- **Tailwind CSS**: Styling

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Authentication Flow

The application uses Firebase Authentication with the following flow:
1. Users can register with email/password
2. Login with existing credentials
3. Reset password via email link
4. Protected routes ensure authenticated access

## Device Management

Devices are identified by MAC address and have the following structure:
- Basic information (name, type, firmware version)
- Current readings (voltage, current, power, etc.)
- Status information (online/offline, last seen)
- Configuration settings (target voltage, tolerance)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.