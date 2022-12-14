const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const cors = require('cors')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('./knexfile'));
const { v4:uuidv4 } = require('uuid');

const showRoutes = require('./routes/showRoute.js')


app.use(cors());
app.use(express.json());

app.use('/shows', showRoutes);


// check JWT token middleware

// // check an verify JWT token

// Link users to their posts here >



// <

app.post("/signup", (request, response, next) => {
  const users_id = uuidv4();
  bcrypt.hash(request.body.password, 10)
  .then(hashedPassword => {
     return knex("users_data").insert({
        users_id: users_id,
        email: request.body.email,
        username: request.body.username,
        password: hashedPassword,
        avatar: "X"
     })
     .returning(["users_id", "username"])
     .then(users => {
        response.json(users[0])
     })
     .catch(error => next(error))
  })
})


app.post("/signin", (req, res) => {
  knex("users_data")
  .where({username: req.body.username})
  .first()
  .then(user => {
     if(!user){
        res.status(401).json({
           error: "No user by that name"
        })
     }else{

        return bcrypt
        .compare(req.body.password, user.password)
        .then(isAuthenticated => {
           if(!isAuthenticated){
              res.status(401).json({
                 error: "Unauthorized Access!"
              })

           }else{
              return jwt.sign({user}, process.env.JWT_SECRET, (error, token) => {
                 res.status(200).json({token})
              })
           }
        })
     }
  })
})





// app.post('/signin', (req, res) => {
//   if(req.body.username && req.body.password) {
//     // check if user is in array of users
//     const foundUser = users.find(
//       (user) =>
//         user.username === req.body.username && user.password == req.body.password
//     );
//     if(foundUser) {
//       // createJWT token with id, name and avatar
//       const jwtToken = jwt.sign(
//         { id: foundUser.id, name: foundUser.name, avatar: foundUser.avatar },
//         process.env.JWT_SECRET
//       );
//       // send a response with the JWT token
//       res.json({
//         message: 'Login Successful',
//         token: jwtToken,
//       });
//     } else {
//       res.status(401).send('Not a valid user');
//     }
//   } else{
//     res.status(400).send('Please provide and email and password.')
//   }
// });





// This is the verify profile route
// Checks the JWT token and returns the user object
// we use jwt.verify() to check if the token is valid with our middleware function 'checkToken
// if it IS valid, we send back the decoded info: our user object
app.get("/verify", (request, response) => {
  const token = request.headers.authorization.split(" ")[1]
  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
 
     if(error){
        response.status(401).json({
           message: "Unauthorized Access!"
        })
     }else{
        response.status(200).json({
           users_id: decodedToken.user.users_id,
           username: decodedToken.user.username
        })
     }
  })
})


// here we would write the checkToken request for our user posts >


// <




app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});