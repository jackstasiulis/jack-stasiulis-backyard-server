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

//  Our user data
const users = [
  {
    id: 1,
    username: 'jackstas',
    email: 'jackstasiulis@gmail.com',
    password: 'backyard23',
    avatar: 'X'
  }
]

// Link users to their posts here >



// <

app.post('/signin', (req, res) => {
  if(req.body.username && req.body.password) {
    // check if user is in array of users
    const foundUser = users.find(
      (user) =>
        user.username === req.body.username && user.password == req.body.password
    );
    if(foundUser) {
      // createJWT token with id, name and avatar
      const jwtToken = jwt.sign(
        { id: foundUser.id, name: foundUser.name, avatar: foundUser.avatar },
        JWT_SECRET
      );
      // send a response with the JWT token
      res.json({
        message: 'Login Successful',
        token: jwtToken,
      });
    } else {
      res.status(401).send('Not a valid user');
    }
  } else{
    res.status(400).send('Please provide and email and password.')
  }
});



// This is the use profile route
// Checks the JWT token and returns the user object
// we use jwt.verify() to check if the token is valid with our middleware function 'checkToken
// if it IS valid, we send back the decoded info: our user object=
app.get('/user-profile', (req, res) => {
  console.log(req.body)
  if(req.body.user) {
    // res.send('hi')
    res.json({ user: req.user });
  }
});


// here we would write the checkToken request for our user posts >


// <




app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});