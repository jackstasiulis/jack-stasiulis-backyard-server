const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const cors = require('cors')

const showRoutes = require('./routes/showRoute.js')


app.use(cors());
// basic home route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Backyard API');
// });
app.use('/shows', showRoutes);


app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});