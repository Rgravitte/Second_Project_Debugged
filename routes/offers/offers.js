const express = require('express');
const router  = express.Router();
const User = require('../../models/Users');
const Offer = require('../../models/Offers');

router.get('/offers-page', (req, res, next)=>{
 
  Offer.find()
  .then((response)=>{
    
    
    console.log('===========&&&&&&&&&&&============&&&&&&&&&&===========', response)
    const equalInterests = response.filter((offer)=>{
      for(let i = 0; i < req.user.interests.length; i++){
        if(offer.industry === req.user.interests[i]){
          return response + offer;
        }
      }
    })
    res.render('offers/offers-page', {offer: equalInterests})

  })
  .then(()=>{
    // if the deals accepted === fals then i want to delete the deals
    //if the deals accepted === true then i want to add the deals to the user page
  })
})

router.post('/offers-page', (req, res, next)=>{
Offer.create({
  companyName: String,
  industry: String,
  // user: Object.Types
})
.then(()=>{
  res.redirect('/offers-page')
  console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=', Offer);
//   res.redirect('/users/user-page')
})
.catch((err)=>{
  console.log('09090909090909090909090909090909090909090909090909090', err);
  next(err)
})
})




module.exports = router;