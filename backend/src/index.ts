import express from 'express';

// Routing
const app = express();

app.get('/', (req, res) => {
    res.send('Hellllllo World!');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})