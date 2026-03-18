import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3007;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// valid options for the "how we met" dropdown
const VALID_MEET_OPTIONS = [
  'LinkedIn',
  'GitHub',
  'Job Fair',
  'Referral',
  'School',
  'Other'
];

// valid email formats
const VALID_EMAIL_FORMATS = ['HTML', 'Text'];

// Create database connection pool
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

// Home = Resume
app.get('/', (req, res) => {
  res.render('resume');
});

// Contact form
app.get('/contact', (req, res) => {
  res.render('home', { errors: [], formData: {}, meetOptions: VALID_MEET_OPTIONS });
});

// Portfolio page
app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

// Confirmation route for contact form submission
app.post('/submit-contact', async (req, res) => {
  const formData = {
    fname:        req.body.fname,
    lname:        req.body.lname,
    email:        req.body.email,
    jobTitle:     req.body['job-title'],
    company:      req.body.company,
    linkedin:     req.body.linkedin,
    meet:         req.body.meet,
    message:      req.body.message,
    mailingList:  req.body['mailing-list'] === 'on',
    emailFormat:  req.body['email-format']
  };

  // server-side validation
  let errors = [];

  // first and last name required (trim before checking)
  if (!formData.fname || !formData.fname.trim()) {
    errors.push('First name is required.');
  }
  if (!formData.lname || !formData.lname.trim()) {
    errors.push('Last name is required.');
  }

  // email required and basic format check
  if (!formData.email || !formData.email.trim()) {
    errors.push('Email is required.');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.push('Please enter a valid email address.');
    }
  }

  // how we met must be in the valid options list
  if (!formData.meet || !VALID_MEET_OPTIONS.includes(formData.meet)) {
    errors.push('"How we met" is required and must be a valid option.');
  }

  // if mailing list is checked, email format must be HTML or Text
  if (formData.mailingList) {
    if (!formData.emailFormat || !VALID_EMAIL_FORMATS.includes(formData.emailFormat)) {
      errors.push('Please select an email format (HTML or Text) when joining the mailing list.');
    }
  }

  // if errors, re-render form with errors and previous values
  if (errors.length > 0) {
    return res.render('home', { errors, formData, meetOptions: VALID_MEET_OPTIONS });
  }

  // build contact object for DB
  const contact = {
    fname:        formData.fname.trim(),
    lname:        formData.lname.trim(),
    email:        formData.email.trim(),
    jobTitle:     formData.jobTitle,
    company:      formData.company,
    linkedin:     formData.linkedin,
    meet:         formData.meet,
    message:      formData.message,
    mailingList:  formData.mailingList,
    emailFormat:  formData.emailFormat,
    timestamp:    new Date()
  };

  try {
    // Insert into database using prepared statement
    const [result] = await pool.query(
      `INSERT INTO contacts (fname, lname, email, company, linkedin, message) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [contact.fname, contact.lname, contact.email, contact.company, contact.linkedin, contact.message]
    );

    contact.id = result.insertId;
    res.render('confirmation', { contact });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Error saving contact');
  }
});

// Admin
app.get('/admin', async (req, res) => {
  try {
    const [contacts] = await pool.query(
      'SELECT * FROM contacts ORDER BY timestamp DESC'
    );
    res.render('admin', { contacts });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Error retrieving contacts');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});