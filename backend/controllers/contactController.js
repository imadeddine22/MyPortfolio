const Contact = require('../models/Contact');

// @desc    Get all contact messages (admin only)
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit contact message (public)
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. I will get back to you shortly!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact message status (admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContact = async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Contact message updated successfully',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message (admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
