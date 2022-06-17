var express = require('express');
var router = express.Router();
var fs = require("fs");


router.post('/Register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;


  // Check if username and password are not empty
  if(username === '' || password === ''){
    res.send({
      success: false,
      message: 'Username and Password are required'
    });

    return;
  }

  // Check if user file exists or not if not then create the file
  if(!fs.existsSync('data/user.json')){
    fs.writeFileSync('data/user.json', '[]');
  }


  // Check if username already exists
  if(fs.existsSync('data/user.json')){
    let userData = JSON.parse(fs.readFileSync('data/user.json'));
    let userExists = userData.find(user => user.username === username);
    if(userExists){
      res.send({
        success: false,
        message: 'Username already exists'
      });

      return;
    }

  }

  try{
     storeUser(username, password);
    res.send({
      success: true,
      message: 'User created successfully'
    });
    
  }catch(error){
    res.send({
      success: false,
      message: 'Error Adding User'
    });
  }
  
});

// Function to Store Username and Password in a JSON file
 function storeUser(username, password) {
  
  let user = {
    username: username,
    password: password
  }

  // Check if user json file already exists or not
  if(fs.existsSync('data/user.json')){
    // If file exists, then read the file and append the new user to the existing file
    let data = fs.readFileSync('data/user.json', 'utf8');
    let users = JSON.parse(data);
    users.push(user);
    fs.writeFileSync('data/user.json', JSON.stringify(users));
 
  }else{
    // If file does not exist, then create the file
    fs.writeFileSync('data/user.json', JSON.stringify([user]));

  }

}


// Login

router.post('/Login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  // Check if username and password match
  if(username === '' || password === ''){
    res.send({
      success: false,
      message: 'Username and Password are required'
    });
  }

  // Check if user file exists or not if not then create the file
  if(!fs.existsSync('data/user.json')){
    fs.writeFileSync('data/user.json', '[]');
  }

  // Check if username already exists
  if(fs.existsSync('data/user.json')){
    let userData = JSON.parse(fs.readFileSync('data/user.json'));
    let userExists = userData.find(user => user.username === username);
    if(userExists){
      if(userExists.password === password){
        res.send({
          success: true,
          message: 'Login Successful'
        });
      }else{
        res.send({
          success: false,
          message: 'Password is incorrect'
        });
      }
    }else{
      res.send({
        success: false,
        message: 'Username does not exists'
      });
    }
  }
});

module.exports = router;
