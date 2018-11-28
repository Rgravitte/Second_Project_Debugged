const express = require('express');
const router  = express.Router();
const passport = require('passport');
const bcrypt   = require('bcryptjs');
const session     = require('express-session');
const User = require('../../models/Users');

router.get('/signup', (req, res, next)=>{

  res.render('users/signup-page')

});

router.get('/login', (req, res, nexrt)=>{
 
  res.render('users/user-login-page');

});

router.post('/users/signup-page', (req, res, next)=>{

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync(req.body.password, salt);

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
  //   console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=', User);
  //   res.redirect('/users/user-page')
  })
  .catch((err)=>{
    console.log('09090909090909090909090909090909090909090909090909090', err);
    next(err)
  })
});

// router.post("/users/user-login-page", passport.authenticate("local", {
//   successRedirect: '/',
//   failureRedirect: '/users/user-login-page',
//   failureFlash: true,
//   passReqToCallback: true

// }));

//post route has to match the action of the form on the hbs page
router.post('/user-login-page', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then((theUser)=>{
    message = false
    if(theUser === null){
      // res.locals.message = `there is no username: ${req.body.username}`;
      message = `there is no username: ${req.body.username}`;
      res.render('users/user-login-page', {message})
      return;
    }
    const isPassGood = bcrypt.compareSync(req.body.password, theUser.password)
    // console.log("---------------- ", isPassGood);
    if(isPassGood === false){
      message = `invalid password`;
      res.render('users/user-login-page', {message})
      return;
    }
    // console.log("================ ", isPassGood);
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
// router.get('/blah-page', (req, res, next)=>{
//   res.render('blah');
// })
// router.post('/users/user-page', (reqm, res, next)=>{
  //do i need this to display secret "User" information? \
// })

router.get('/user-page', (req, res, next)=>{
  if(!req.user){
    res.redirect('users/user-login-page')
  } else {
    res.render('users/user-page');
  }
})






router.get('/edit-interests', (req, res, next)=>{
  res.render('users/edit-interests');
 });


router.post('/edit-interests', (req, res, next)=>{
  // console.log('anythinghjfaeklrhjfgi;laj;', req.user)
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

  

// router.get('/profile', (req, res, next)=>{
//     res.render('profile');
//     })
module.exports = router;