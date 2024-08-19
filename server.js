const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergepdfs } = require('./merge');

const app = express();
const uploads = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templetes/index.html"));
});

app.post('/merge', uploads.array('pdfs', 2), async function (req, res, next) {
    try {
        if (req.files.length !== 2) {
            return res.status(400).send('You must upload exactly 2 PDF files.');
        }

        console.log(req.files);
        await mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
        res.redirect('/static/merged.pdf');
    } catch (error) {
        console.error('Error processing merge request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
