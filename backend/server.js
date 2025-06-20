const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'submissions.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

function loadSubmissions() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading submissions:', error);
  }
  return [];
}

function saveSubmissions(submissions) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error('Error saving submissions:', error);
    throw error;
  }
}

function validateSubmission(data) {
  const errors = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }
  
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Email must be a valid email address');
    }
  }
  
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('Message is required and must be a non-empty string');
  }
  
  return errors;
}

app.post('/submit', (req, res) => {
  try {
    const validationErrors = validateSubmission(req.body);
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    const submission = {
      id: Date.now(),
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      message: req.body.message.trim(),
      timestamp: new Date().toISOString()
    };
    
    const submissions = loadSubmissions();
    submissions.push(submission);
    saveSubmissions(submissions);
    
    res.status(200).json({
      success: true,
      message: 'Form submitted successfully!',
      id: submission.id
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/submissions', (req, res) => {
  try {
    const submissions = loadSubmissions();
    res.status(200).json({
      success: true,
      data: submissions,
      count: submissions.length
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});