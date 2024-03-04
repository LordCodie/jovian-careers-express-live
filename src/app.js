require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const express = require('express');
const path = require('path');
const JOBS = require('./jobs');
const mustacheExpress = require('mustache-express');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.get('/', (req, res) => {
    // res.send('Hello World!');
    // res.sendFile(path.join(__dirname, 'pages/index.html'));
    res.render('index', { jobs: JOBS });
});

app.get('/jobs/:id', (req, res) => {
    const id = req.params.id;
    const matchedJob = JOBS.find(job => job.id.toString() === id);
    res.render('job', { job: matchedJob });
}) 

app.post('/job/:id/apply', (req, res) => {
    res.send('Got the application');
})

const transporter = nodemailer.createTransport({
    host: 'mail.gmx.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});