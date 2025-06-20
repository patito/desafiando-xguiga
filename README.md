# 🧑‍💻 AI Challenge: Build a Simple Full Stack Web Application

You are tasked with creating a complete full-stack web application from scratch. This is a test of your ability to make architectural decisions, write functional code, and provide clear documentation.

---

## 🎯 Core Requirements

### Application Functionality
Create a web application that allows users to submit contact information through a form.

**Frontend Requirements:**
- A form with at least **3 input fields**: `name`, `email`, and `message`
- Form validation on the client side
- Submit button that sends data to the backend
- Display success/error messages based on backend response
- Clean, responsive design (mobile-friendly)

**Backend Requirements:**
- RESTful API with a `POST /submit` endpoint (or equivalent)
- Server-side validation of all form fields
- Proper HTTP status codes (200, 400, 500, etc.)
- Error handling for invalid data
- JSON response format

**Data Storage:**
- Store submitted data (can be in-memory, file, or database - your choice)
- Optional: Add a `GET /submissions` endpoint to retrieve stored data

---

## 🧠 AI Decision Points

You must choose and **justify your decisions** for:

### 1. Technology Stack
- **Frontend**: Framework/library (React, Vue, vanilla JS, etc.)
- **Backend**: Runtime/framework (Node.js, Python Flask, Go, etc.)
- **Data Storage**: Method (JSON file, SQLite, PostgreSQL, in-memory, etc.)

### 2. Architecture Decisions
- **Project structure**: Folder organization and file naming
- **Communication**: How frontend talks to backend (fetch, axios, etc.)
- **Validation**: Client-side and server-side validation approaches
- **Error handling**: Strategy for managing errors gracefully

### 3. Development Workflow
- **Package management**: npm, yarn, pip, etc.
- **Build process**: Any compilation or bundling steps
- **Development server**: How to run in development mode

---

## 📋 Deliverables

### 1. Complete Source Code
Provide all necessary files with:
- Clear file structure
- Well-commented code
- Consistent naming conventions

### 2. README.md Documentation
Must include:
- **Technology choices and justifications** (Why did you choose this stack?)
- **Prerequisites** (Node.js version, Python version, etc.)
- **Installation instructions** (step-by-step setup)
- **Running the application** (how to start frontend and backend)
- **Testing instructions** (how to verify everything works)
- **API documentation** (endpoints, request/response formats)

### 3. Example Usage
- Provide sample requests/responses
- Include screenshots or descriptions of the UI
- Explain the complete user flow

---

## 🎨 Evaluation Criteria

Your solution will be assessed on:

1. **Functionality**: Does it work as specified?
2. **Code Quality**: Clean, readable, well-structured code
3. **Decision Justification**: Clear reasoning for tech choices
4. **Documentation**: Comprehensive and accurate setup instructions
5. **User Experience**: Intuitive interface and helpful error messages
6. **Best Practices**: Following conventions for chosen technologies

---

## 🚀 Bonus Points

Consider adding any of these optional features:
- Input sanitization and security considerations
- Loading states during form submission
- Form reset functionality after successful submission
- Basic styling with CSS/styling framework
- Docker configuration for easy deployment
- Basic tests (unit or integration)

---

## 📁 Expected Project Structure

```
project-name/
├── README.md
├── frontend/
│   ├── (your frontend files)
│   └── ...
├── backend/
│   ├── (your backend files)
│   └── ...
└── (any other configuration files)
```

**Note**: You can modify this structure based on your chosen technology stack, but explain your reasoning in the README.

---

## ⚡ Quick Start Requirement

After following your README instructions, a developer should be able to:
1. Clone/copy your code
2. Run the installation commands
3. Start both frontend and backend
4. Open the application in a browser
5. Successfully submit the form and see the response

**Time limit for setup**: Maximum 5 minutes from README to working application.

---

*Good luck! Show us your problem-solving skills, technical decision-making, and ability to create a complete, functional web application.*