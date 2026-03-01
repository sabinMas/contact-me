import express from 'express';
const app = express();
const PORT = 3007;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const contacts = [];  // in-memory database

// Home = Resume
app.get('/', (req, res) => {
  res.render('resume');
});

// Contact form
app.get('/contact', (req, res) => {
  res.render('home');
});

// Confirmation route for contact form submission
app.post('/submit-contact', (req, res) => {
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

  contacts.push(contact);
  res.render('confirmation', { contact });
});

// Admin
app.get('/admin', (req, res) => {
  res.render('admin', { contacts });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
