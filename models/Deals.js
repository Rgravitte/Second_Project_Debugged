const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interestsSchema = new Schema({
  interest: String,
})


const Interests = mongoose.model("Interests", companySchema);


module.exports = Interests;