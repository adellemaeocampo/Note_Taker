const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');

const dbPath = './db/db.json';

notes.get('/notes', (req, res) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
        if(err){
            console.error(err);
            return res.status(500).json({error: 'Failed to read data'});
        }

        const notesData = JSON.parse(data);
        res.json(notesData);
    });

});



notes.post('/notes', (req, res) => { 
    fs.readFile(dbPath, (err, data) => {
        if (err) {
          console.error('Error reading db.json:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        let db = JSON.parse(data);
  
        
        const newNote = {
          title: req.body.title, 
          text: req.body.text, 
          id: uuid(), 
        };
  
        db.push(newNote);
  
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
          if (err) {
            console.error('Error writing db.json:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          res.json(newNote);
        });
      });
});



notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile(dbPath, (err, data) => {
      if (err) {
        console.error('Error reading db.json:', err);
        return res.status(500).json({ error: 'Server Error' });
      }

      let db = JSON.parse(data);
      const index = db.findIndex(note => note.id === noteId);

      if (index === -1) {
        return res.status(404).json({ error: 'Note not found' });
      }
      
      db.splice(index, 1);

      fs.writeFile(dbPath, JSON.stringify(db), (err) => {
        if (err) {
          console.error('Error writing db.json:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'Note deleted' });
      });
    });
  });




module.exports = notes;


