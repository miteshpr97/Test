const express = require('express');
const Customer = require('../models/customer');

const router = express.Router();

// POST: Create a new customer
router.post('/', async (req, res) => {
  try {
    const customerData = req.body;
    const newCustomer = await Customer.create(customerData);
    console.log('Customer data inserted:', newCustomer);
    res.status(201).json({ message: 'Customer data inserted successfully' });
  } catch (err) {
    console.error('MongoDB insert error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET: Retrieve customer data
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find(); // Retrieve all customers
    res.status(200).json(customers);
  } catch (err) {
    console.error('MongoDB fetch error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// GET: Retrieve details of a single customer
router.get('/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await Customer.findById(customerId);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    console.error('MongoDB fetch error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.put('/:id', async (req, res) => {
  const customerId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updatedData, { new: true });
    if (updatedCustomer) {
      res.status(200).json(updatedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    console.error('MongoDB update error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// DELETE: Delete a single customer
router.delete('/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    if (deletedCustomer) {
      res.status(200).json({ message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    console.error('MongoDB delete error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add other route handlers for PUT, DELETE, etc.

module.exports = router;
