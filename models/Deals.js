const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealSchema = new Schema({
  isAccepted: Boolean,
  deals: {type: Schema.Types.ObjectId, ref: 'Deals'}
})


const Deals = mongoose.model("Deals", companySchema);


module.exports = Deals;