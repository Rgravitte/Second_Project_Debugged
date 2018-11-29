const express = require('express');
const router  = express.Router();
const passport = require('passport');
const bcryptjs   = require('bcryptjs');
const session     = require('express-session');
const User = require('../../models/Users');

router.get('/signup', (req, res, next)=>{
  res.render('users/signup-page')
});

router.get('/login', (req, res, nexrt)=>{
  res.render('users/user-login-page');
});

router.post('/users/signup-page', (req, res, next)=>{
const salt = bcryptjs.genSaltSync(10);
const hashPass = bcryptjs.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    password: hashPass,
    interests: req.body.interests,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday
  })
  .then((newUser)=>{
    req.login(newUser, (err)=>{
      if(err){
        next(err)
      }else{
        res.redirect('/user-page')
      }
    })
  })
  .catch((err)=>{
    console.log('09090909090909090909090909090909090909090909090909090', err);
    next(err)
  })
});

router.post('/user-login-page', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then((theUser)=>{
    message = false
    if(theUser === null){
      message = `there is no username: ${req.body.username}`;
      res.render('users/user-login-page', {message})
      return;
    }
    const isPassGood = bcryptjs.compareSync(req.body.password, theUser.password)
    if(isPassGood === false){
      message = `invalid password`;
      res.render('users/user-login-page', {message})
      return;
    }
    req.login(theUser, (err)=>{
      if(err){
        next(err);
      }
      else{
        res.redirect('/user-page');
      }
    })
  })
  .catch(err => {
    next(err);
  })
})

router.get('/user-page', (req, res, next)=>{
  if(!req.user){
    res.redirect('users/user-login-page')
  } else {
    let theUser = req.user;
    theUser.prettyDate = theUser.birthday.toLocaleDateString("en-US");
    res.render('users/user-page');
  }
})

router.get('/delete-page/:id', (req, res, next)=>{
  console.log(req.params, req.query)
  console.log('the ------- user ------- has -------- been -------- deleted')
  User.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.redirect('/');

  })
  .catch((err)=>{
    next(err);
  })
})

router.get('/edit-interests', (req, res, next)=>{
  res.render('users/edit-interests');
 });


router.post('/edit-interests', (req, res, next)=>{
  User.findByIdAndUpdate(req.user.id, {
    interests: req.body.interests
  })

  .then((theUser)=>{
    theUser.save();
    console.log('--------', theUser)
    res.redirect('/user-page')
  })
  
  .catch((err)=>{
    next(err)
  })
})

router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/');
})

module.exports = router;