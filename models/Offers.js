const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const offerSchema = new Schema({

  // companyName: String,
  industry: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  isAccepted: Boolean
})

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;