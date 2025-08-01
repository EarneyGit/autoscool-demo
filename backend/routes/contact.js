const express = require('express');
const router = express.Router();

// Get all contact messages
router.get('/', async (req, res) => {
  try {
    // TODO: Implement database query
    res.json({
      success: true,
      data: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+41 79 123 4567',
          subject: 'Course Inquiry',
          message: 'I would like to know more about your driving courses.',
          date: '2024-01-15T10:30:00Z',
          status: 'new',
          replied: false
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+41 79 234 5678',
          subject: 'Booking Question',
          message: 'Can I reschedule my driving lesson?',
          date: '2024-01-14T14:20:00Z',
          status: 'replied',
          replied: true
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get contact message by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Implement database query
    res.json({
      success: true,
      data: {
        id: parseInt(id),
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Course Inquiry',
        message: 'I would like to know more about your driving courses.',
        date: '2024-01-15T10:30:00Z'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Submit new contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }
    
    // TODO: Implement database creation and email notification
    const contactData = {
      id: Date.now(),
      name,
      email,
      phone: phone || null,
      subject: subject || 'General Inquiry',
      message,
      date: new Date().toISOString(),
      status: 'new',
      replied: false
    };
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!',
      data: contactData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update contact message status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['new', 'in-progress', 'replied', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    // TODO: Implement database update
    res.json({
      success: true,
      message: 'Contact message status updated successfully',
      data: { id: parseInt(id), status }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reply to contact message
router.post('/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    
    if (!reply) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }
    
    // TODO: Implement email sending and database update
    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: {
        id: parseInt(id),
        reply,
        repliedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete contact message
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Implement database deletion
    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;