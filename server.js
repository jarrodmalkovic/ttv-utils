const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./api/config/DB');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(express.static('./client/build'));

app.use('/api/feedback', require('./api/routes/feedback'));

const PORT = 8080;

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/client/build' });
});

app.listen(PORT, function () {
  console.log('Server is running on the port:', PORT);
});
