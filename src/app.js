
// Import the necessary modules
const express = require('express');
const expressStatic = express.static;
const bodyParser = require('body-parser');
const validator = require('validator');
const nodemailer = require('nodemailer');
const multer = require('multer');
const { successmsg, signup, sign_in } = require('./htmlfiles.js');
const sqlite3 = require('sqlite3').verbose();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const chokidar = require('chokidar');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const bcrypt = require('bcrypt');
const {OAuth2} = google.auth;
const path = require('path');
const mime = require('mime');
require('dotenv').config();
const session = require('express-session');
const crypto = require('crypto');
const cors = require('cors')

app.use(cors(
  {
      origin: ["https://feetbook-dql9.vercel.app/"],
      methods: ["POST", "GET"],
      credentials: true
  }
));
// Create an Express application
const app = express();

// Start the server
const join = require('path').join;
const hostname = '127.0.0.1';
const port = process.env.PORT || 6600 || 5500;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(__dirname));

app.get('/signup', (req, res) => {
    res.sendFile(join(__dirname, '../public/signup.html'));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


//
//Create session secret
const sessionSecret = crypto.randomBytes(64).toString('hex');

//console.log(sessionSecret);

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token1.json';

const mydb = __dirname + '/../database/mydb.db';
// Open a database handle
var db = new sqlite3.Database(mydb, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the mydb database.');
});

//db.configure('busyTimeout', 300000);


// Multer configuration
const uploadPath = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Define a route to handle form submissions
app.post('/sign-up', upload.single('myfile'),async (req, res) => {
    
  const time = new Date().toLocaleString();
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds); // 10 is the number of salt rounds

  
  
  let createTableSql = `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, Time TEXT, Firstnames TEXT, Lastnames TEXT, Emails TEXT, Usernames TEXT, Passwords Text UNIQUE)`;

  db.run(createTableSql, function(err) {
    if (err) {
      return console.error(err.message);
    }
     // Validate the email address
    if (validator.isEmail(email)) {
        console.log(`Received a valid email: ${email}`);
        
    } else {
        // If the email is not valid, send an error message
        console.log(`Received an invalid email: ${email}`);
        return res.status(400).send('Invalid email address');
    }
    console.log("Users table created");
    let checkDataSql = `SELECT * FROM users WHERE Usernames = ? OR Emails = ?`;
    let data = [username, email];
    
    db.get(checkDataSql, data, async function(err, row) {
      if (err) {
        return console.error(err.message);
      }
    
      // If row is not undefined, it means the username or email already exists in the database
      if (row) {
        console.log('Data already exists');
        // Here you can send a response to the client to let them know that the data already exists
        return res.send(signup(firstname,lastname));
      } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await sendConfirmationEmail(email, firstname, lastname, username, req);
        let insertDataSql = `INSERT OR IGNORE INTO users (Time, Firstnames, Lastnames, Emails, Usernames, Passwords) VALUES (?, ?,?,?,?,?)`;
        let data = [time, firstname, lastname, email, username, hashedPassword];

        db.run(insertDataSql, data, function(err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Row(s) inserted: ${this.lastID} - ${time} - ${firstname} - ${lastname} - ${email} - ${username} - ${hashedPassword}`);
          exportToCsv();
        });
        // If row is undefined, it means the username or email does not exist in the database, so you can insert the new data
        return res.send(successmsg(email,firstname,lastname,username));
      }
    });
  });


   
});

/*app.get('/redirect-to-signin', (req, res) => {
  res.redirect('/signin');
});*/

app.get('/signin', (req, res) => {
  res.sendFile(join(__dirname, '../public/signin.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(join(__dirname, '../public/home.html'));
});

app.get('/', (req, res) => {
  res.redirect('/home');//This should be for the homepage
});

app.post('/signin', async (req, res) => {
  //console.log(req.body)
  const { usernameOrEmail, password } = req.body;

  // Check if the password is provided
  if (!password) {
    console.log(password)
    return res.status(400).json({ error: 'Password is required' });
  }

  // Check if the username or email exists in the database
  const query = `
  SELECT * FROM users
  WHERE LOWER(Usernames) = LOWER(?) OR LOWER(Emails) = LOWER(?);
  `;

  db.get(query, [usernameOrEmail, usernameOrEmail], async (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or email' });
    }

    // Check if the password and user.Passwords are not null or undefined
    if (!password || !user.Passwords) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Compare the provided password with the hashed password from the database
    try {
      const passwordMatch = await bcrypt.compare(password, user.Passwords);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

       // Successful sign-in
       sendSignInEmail(user.Emails)
       .then(() => {
         res.json({ message: 'Sign-in successful' });
       })
       .catch(err => {
         console.error('Error sending sign-in email:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
       });
   } catch (err) {
     console.error('Bcrypt error:', err);
     return res.status(500).json({ error: 'Internal Server Error' });
   }
 });
});

async function sendSignInEmail(email) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // replace with your SMTP host
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: `noreply.noow@gmail.com`, // replace with your email
      pass: `kare oaow pgxf qlct` // replace with your password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Noow App" noreply@ayocodex.site', // sender address
    to: email, // list of receivers
    subject: 'Sign-in successful', // Subject line
    text: 'You have successfully signed in to Noow App.', // plain text body
    html: `<b>You have successfully signed in to Noow App.</b>
    <img src="cid:unique@kreata.ee" alt="Company Logo" width="100" height="100">
    <p>I hope you enjoy your time on our app</p>`, // html body
    attachments: [
      {
        filename: `Company-Logo.png`,
        path: 'FeetBook/public/images/congrats.png', // Replace with your file path
        cid: 'unique@kreata.ee' //same cid value as in the html img src
      },
    ]
  });

  console.log('Message sent: %s', info.messageId);
}

const mydbcsv = __dirname + '/../database/mydb.csv';
function exportToCsv() {
  let data = [];
  let csvWriter = createCsvWriter({
    path: mydbcsv,
    header: [
      {id: 'Time', title: 'TIME'},
      {id: 'Firstnames', title: 'FIRSTNAMES'},
      {id: 'Lastnames', title: 'LASTNAMES'},
      {id: 'Emails', title: 'EMAILS'},
      {id: 'Usernames', title: 'USERNAMES'},
      {id: 'Passwords', title: 'PASSWORDS'},
      // add more column headers as needed
    ]
  });



db.serialize(() => {
  db.each(`SELECT * FROM users`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    data.push(row);
  }, () => { // callback function when all rows have been retrieved
    csvWriter
      .writeRecords(data)
      .then(() => console.log('The CSV file was written successfully'));
  });
});
}

// Watch the SQLite database file for changes
chokidar.watch(mydb).on('change', exportToCsv);

// Function to send confirmation email
async function sendConfirmationEmail(email, firstname, lastname, username, req) {
  const file = req.file;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: `noreply.noow@gmail.com`, // replace with your Gmail email
      pass: `qulm ifwi edgd erne` // replace with your Gmail password or an app-specific password
    }
  });

  const mailOptions = {
    from: '"Noow App" noreply@ayocodex.site', // replace with your Gmail email
    to: email,
    subject: 'Account Creation Confirmation',
    text: `Dear ${firstname} ${lastname},\n\nThank you for creating an account with us. Your username is ${username}.\n\nBest Regards,\nYour Company`,
    html: `<h1>Welcome, ${firstname} ${lastname}!</h1>
    <h2>Thank you for creating an account with us.</h2>
    <p>Your username is ${username}.</p>
    <img src="cid:unique@kreata.ee" alt="Company Logo" width="100" height="100">
    <p>We're excited to have you on board.</p>`,
    attachments: [
        {
          filename: `Company-Logo.png`,
          path: 'FeetBook/public/images/congrats.png', // Replace with your file path
          cid: 'unique@kreata.ee' //same cid value as in the html img src
        },
        /*{
          filename: file.originalname,
          path: file.path,
        }*/
      ]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}