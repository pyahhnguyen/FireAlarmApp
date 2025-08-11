
# Smart Fire Alarm System

## Project Overview

The Smart Fire Alarm System is an advanced IoT-based solution designed to detect and alert early fire hazards in apartments, helping to minimize loss of life and property. The system uses advanced sensors to collect environmental data, processes it in real-time, and issues immediate alerts when fire hazards are detected.

### Key Features

- **Real-time Fire Detection**: Advanced sensors (gas, heat, infrared, flame) monitor environment continuously
- **Instant Alerts**: Multiple notification methods including push notifications, SMS, and phone calls
- **User-specific Monitoring**: Each user has dedicated IoT topics for personalized device monitoring
- **Real-time Communication**: WebSocket-based real-time updates and alerts
- **Cloud Integration**: AWS IoT Core for device management and data processing
- **Mobile App**: React Native mobile application for remote monitoring

## System Architecture

### System Block Diagram

![System Architecture](/FireAlarmApp/assets/images/firealarm.jpg)

### Components

**Hardware Layer:**
- Fire detection sensors (gas, heat, infrared, flame sensors)
- Data collection and transmission to central processor

**Software Layer:**
- **Real-time Processing**: Analyzes sensor data and triggers alerts
- **Alert System**: Notifies users via WebSocket, HTTPS, Amazon SNS, Gmail, SMS, or calls
- **User Management**: Authentication and user-specific device monitoring

**Cloud Platform:**
- **AWS IoT Core**: Device connectivity and message routing
- **MongoDB**: Data storage and user management
- **Amazon SNS**: Push notification delivery

## Technology Stack

- **Backend**: Node.js with Express.js framework
- **Frontend**: React Native mobile application
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
- **Cloud Platform**: Amazon Web Services (AWS)
- **IoT Platform**: AWS IoT Core
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```

├── FireAlarmApp/          # React Native mobile application
│   ├── screens/           # App screens and components
│   ├── components/        # Reusable UI components
│   ├── navigation/        # Navigation configuration
│   ├── redux/            # State management
│   └── assets/           # Images, fonts, and static files
├── Nodejs_backend/        # Main backend server
│   ├── src/              # Source code
│   │   ├── app.js        # Express app configuration
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── models/       # Database models
│   │   └── middleware/   # Custom middleware
│   └── server.js         # Main server entry point
└── Nodejs_backend/wsserver/  # WebSocket server
    ├── src/
    │   ├── sockets/      # Socket.IO configuration
    │   ├── services/     # WebSocket services
    │   └── controllers/  # WebSocket controllers
    └── app.js           # WebSocket server entry point
```

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Expo CLI** (for mobile app development)
- **AWS Account** (for IoT Core and SNS services)
- **Android Studio** or **Xcode** (for mobile app testing)

## Installation & Setup

### 1. Backend Setup

#### Main Backend Server

```bash
# Navigate to backend directory
cd Nodejs_backend

# Install dependencies
npm install

# Create .env file with your configuration
cp .env.example .env
# Edit .env with your MongoDB URI, AWS credentials, and other settings

# Start the server
npm start
# or
node server.js
```

The main backend server will run on port 3052 (default).

#### WebSocket Server

```bash
# Navigate to WebSocket server directory
cd Nodejs_backend/wsserver

# Install dependencies
npm install

# Create .env file with your configuration
cp .env.example .env
# Edit .env with your MongoDB URI, AWS IoT credentials, and other settings

# Start the WebSocket server
node app.js
```

The WebSocket server will run on port 5000 (default).

### 2. Frontend Setup

```bash
# Navigate to mobile app directory
cd FireAlarmApp

# Install dependencies
npm install

# Start the Expo development server
npm start
# or
expo start
```

This will start the Expo development server and show a QR code for testing on your mobile device.

### 3. Mobile App Testing

#### Using Expo Go App
1. Install Expo Go on your mobile device
2. Scan the QR code displayed in the terminal
3. The app will load on your device

#### Using Emulator/Simulator
```bash
# For Android
npm run android

# For iOS
npm run ios
```

## Environment Configuration

### Backend (.env)
```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# AWS IoT
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_IOT_ENDPOINT=your_iot_endpoint

# JWT
JWT_SECRET=your_jwt_secret

# SNS (for push notifications)
SNS_ENDPOINT_ARN=your_sns_endpoint_arn

# SQS (for alert processing)
SQS_URL=your_sqs_queue_url

# Server Ports
PORT=3052
WS_PORT=5000
```

### Frontend (.env)
```env
# Backend API URL
API_BASE_URL=http://localhost:3052/v1/api

# WebSocket URL
WS_URL=http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /v1/api/access/signup` - User registration
- `POST /v1/api/access/login` - User login
- `POST /v1/api/access/logout` - User logout

### Sensors
- `GET /v1/api/sensors/user/recentAlert` - Get recent alerts for user
- `GET /v1/api/sensors/user/alertsNumber` - Get alert count for user

### Users
- `GET /v1/api/user/profile` - Get user profile
- `PUT /v1/api/user/profile` - Update user profile

## Real-time Features

### WebSocket Events
- `connection` - User connects to WebSocket
- `message` - Real-time sensor data and alerts
- `subscribed` - Confirmation of topic subscription
- `disconnect` - User disconnects

### Alert System
The system automatically:
1. Monitors sensor data from AWS IoT topics
2. Compares values against predefined thresholds
3. Triggers alerts when thresholds are exceeded
4. Sends notifications via multiple channels
5. Updates the mobile app in real-time

## IoT Device Testing & Simulation

### AWS IoT Device Simulator
The [AWS IoT Device Simulator](https://github.com/aws-solutions/iot-device-simulator) provides a comprehensive web interface for IoT device management and data visualization (Note: This repository was archived on January 30, 2025, but the documentation remains available for reference).


### Device Management Interface
The device creation and management interface allows users to configure their IoT sensors:

![Device Management](/project_image/create-device.jpg)

**Device Management Features:**
- **Device Registration**: Add new sensors to the monitoring system
- **Sensor Configuration**: Set device types, locations, and threshold values
- **User Association**: Link devices to specific user accounts
- **Real-time Monitoring**: Track device status and sensor readings
- **Alert Configuration**: Customize notification preferences per device

### Device Data Simulation
When using the AWS IoT Device Simulator or custom test scripts, simulated device data flows through the system as follows:

![Device Data Flow](/project_image/device-data.jpg)

**Simulation Data Flow:**
1. **Simulator Interface**: Create virtual devices through the web interface
2. **Data Generation**: Simulator generates realistic sensor data (smoke, heat, gas, flame levels)
3. **Topic Publishing**: Data is published to user-specific AWS IoT topics (e.g., `topic/{userId}/sensor`)
4. **Backend Processing**: Your WebSocket server receives and processes the simulated data
5. **Threshold Checking**: System compares simulated values against predefined thresholds
6. **Alert Triggering**: When simulated values exceed thresholds, alerts are triggered
7. **Real-time Updates**: Mobile app receives real-time updates with simulated sensor data

**Simulated Data Format:**
```json
{
  "device_type": "smoke",
  "value": 2500,
  "device_name": "Simulated Smoke Sensor",
  "location": "Kitchen",
  "userId": "user123",
  "_id_": "sim_device_001",
  "model_code": "SMK-2024",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Simulation Scenarios:**
- **Normal Operation**: Simulate normal sensor readings below threshold values
- **Alert Conditions**: Simulate values above thresholds to test alert systems
- **Edge Cases**: Test boundary conditions and sensor failures
- **Multiple Devices**: Simulate multiple sensors for the same user
- **Real-time Updates**: Continuous data streaming to test real-time features



## License

This project is licensed under the ISC License.

## Support


