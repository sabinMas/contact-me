import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3007;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

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
  res.render('home');
});

// Confirmation route for contact form submission
app.post('/submit-contact', async (req, res) => {
  const contact = {
    fname:        req.body.fname,
    lname:        req.body.lname,
    email:        req.body.email,
    jobTitle:     req.body['job-title'],
    company:      req.body.company,
    linkedin:     req.body.linkedin,
    meet:         req.body.meet,
    message:      req.body.message,
    mailingList:  req.body['mailing-list'] === 'on',
    emailFormat:  req.body['email-format'],
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
