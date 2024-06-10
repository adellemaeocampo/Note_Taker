const express = require('express');
const path = require('path');
const notes = require('./routes/notes');


//defining port varible
const PORT = process.env.PORT || 3001;

//defining app varible
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', notes);

app.use(express.static('public'));


// GET Route for homepage
app.get('/', (req, res) => {
const filePath = path.join(__dirname, "/public/index.html");
res.sendFile(filePath, (err) => {
    if (err) {
        console.error(`Error sending file: ${filePath}`, err);
        res.status(500).send('Internal Server Error');
    }
});
});

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
