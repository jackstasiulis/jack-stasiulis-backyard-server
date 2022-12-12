const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const cors = require('cors')

const showRoutes = require('./routes/showRoute.js')


app.use(cors());
app.use(express.json());
// basic home route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Backyard API');
// });
app.use('/shows', showRoutes);

// check JWT token middleware
function checkToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
// check an verify JWT token
  if (token && jwt.verify(token, JWT_SECRET)) {
    req.user = jwt.decode(token); // this attaches the decoded token to the request object
    next();
  } else {
    next();
  }
}


app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});