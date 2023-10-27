const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerCode: String,
  customerName: String,
  address: String,
  city: String,
  pin: String,
  phone1: String,
  phone2: String,
  email: String,
  website: String,
  contactPerson: String,
});

module.exports = mongoose.model('Customer', customerSchema);
