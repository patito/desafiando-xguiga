# 🚀 Contact Form - Full Stack Web Application

A complete full-stack web application built for the AI Challenge that allows users to submit contact information through a clean, responsive form interface.

## 🎯 Features

- **Frontend**: Responsive contact form with real-time validation
- **Backend**: RESTful API with robust validation and error handling
- **Data Storage**: Persistent JSON file storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Feedback**: Success/error messages with loading states
- **Admin View**: View all submissions through a modal interface

## 🛠️ Technology Stack & Justifications

### Backend: Node.js + Express
**Why chosen:**
- **Rapid Development**: Quick setup and deployment
- **JSON Native**: Built-in JSON parsing and handling
- **REST API Friendly**: Express provides excellent routing capabilities
- **Single Language**: JavaScript across the entire stack
- **Lightweight**: Minimal dependencies for maximum performance

### Frontend: Vanilla HTML/CSS/JavaScript
**Why chosen:**
- **No Build Process**: Immediate browser compatibility
- **Performance**: Minimal overhead, fast loading
- **Simplicity**: Easy to understand and maintain
- **Modern Standards**: Uses latest web APIs and ES6+ features
- **Responsive**: Mobile-first CSS design

### Data Storage: JSON File
**Why chosen:**
- **Simplicity**: No database setup required
- **Persistence**: Data survives server restarts
- **Portability**: Easy to backup and transfer
- **Debugging**: Human-readable format
- **Perfect Scale**: Ideal for this application's requirements

## 📋 Prerequisites

- **Node.js**: Version 14.0.0 or higher
- **npm**: Comes with Node.js installation

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd desafiando-xguiga
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎮 Usage Instructions

### Submitting a Contact Form

1. **Fill out the form:**
   - **Name**: Enter your full name (minimum 2 characters)
   - **Email**: Enter a valid email address
   - **Message**: Enter your message (minimum 10 characters)

2. **Submit the form:**
   - Click "Send Message"
   - Wait for the success/error message
   - Form will reset automatically on successful submission

3. **View submissions:**
   - Click "View All Submissions" to see all submitted forms
   - Modal will display all submissions with timestamps

## 🔌 API Documentation

### POST /submit
Submits a new contact form entry.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test message!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Form submitted successfully!",
  "id": 1634567890123
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required and must be a non-empty string",
    "Email must be a valid email address"
  ]
}
```

**Server Error Response (500):**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### GET /submissions
Retrieves all submitted contact forms.

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1634567890123,
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello, this is a test message!",
      "timestamp": "2023-10-18T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

## 🧪 Testing Instructions

### Manual Testing

1. **Start the application** following the installation steps
2. **Test form validation:**
   - Try submitting empty form (should show validation errors)
   - Try invalid email format (should show email error)
   - Try short name/message (should show length errors)

3. **Test successful submission:**
   - Fill form with valid data
   - Submit and verify success message
   - Check that form resets after submission

4. **Test submissions view:**
   - Click "View All Submissions"
   - Verify modal opens with submitted data
   - Test modal closing (X button, escape key, outside click)

5. **Test responsiveness:**
   - Test on different screen sizes
   - Verify mobile-friendly design

### API Testing with curl

```bash
# Test successful submission
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"This is a test message"}'

# Test validation error
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"invalid-email","message":""}'

# Get all submissions
curl http://localhost:3000/submissions
```

## 📁 Project Structure

```
desafiando-xguiga/
├── README.md                    # Original challenge requirements
├── PROJECT_README.md           # This documentation
├── backend/
│   ├── package.json            # Backend dependencies
│   ├── server.js              # Main server file
│   └── submissions.json       # Data storage (created automatically)
└── frontend/
    ├── index.html             # Main HTML file
    ├── styles.css             # All CSS styles
    └── script.js              # Frontend JavaScript
```

## 🎨 Design Decisions

### Architecture
- **Separation of Concerns**: Clear separation between frontend and backend
- **RESTful Design**: Standard HTTP methods and status codes
- **Error Handling**: Comprehensive error handling on both client and server
- **Validation**: Dual validation (client-side for UX, server-side for security)

### Security Considerations
- **Input Sanitization**: HTML escaping for displayed content
- **Validation**: Server-side validation prevents malicious data
- **CORS**: Enabled for cross-origin requests
- **Error Messages**: Informative but not revealing sensitive information

### User Experience
- **Loading States**: Visual feedback during form submission
- **Responsive Design**: Works on all device sizes
- **Accessibility**: Proper labels, keyboard navigation, and ARIA attributes
- **Progressive Enhancement**: Works with JavaScript disabled (basic form submission)

## 🔧 Development Commands

```bash
# Start the server
npm start

# Start with automatic restart (if nodemon is installed globally)
npx nodemon server.js
```

## 🚀 Deployment Notes

For production deployment:
1. Set environment variables for production
2. Use process manager like PM2
3. Set up reverse proxy with Nginx
4. Enable HTTPS
5. Configure proper logging

## 🤝 Contributing

This project was built as part of an AI Challenge. The implementation demonstrates:
- Clean, maintainable code structure
- Comprehensive error handling
- Responsive design principles
- RESTful API design
- Modern JavaScript practices

---

**Built with ❤️ for the AI Challenge**