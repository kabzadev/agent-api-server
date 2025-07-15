const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'Agent API is running', timestamp: new Date() });
});

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Simulate different responses based on keywords
    let response = '';
    let data = null;

    if (message.toLowerCase().includes('sharepoint') || message.toLowerCase().includes('document')) {
      // Mock SharePoint response
      response = 'Found 3 documents in SharePoint related to your query';
      data = {
        source: 'sharepoint',
        count: 3,
        items: [
          {
            name: 'Project Plan 2024.docx',
            url: 'https://contoso.sharepoint.com/sites/Projects/Shared%20Documents/Project%20Plan%202024.docx',
            modified: '2024-01-15T10:30:00Z',
            size: '245KB'
          },
          {
            name: 'Budget Analysis.xlsx',
            url: 'https://contoso.sharepoint.com/sites/Finance/Shared%20Documents/Budget%20Analysis.xlsx',
            modified: '2024-01-10T14:22:00Z',
            size: '1.2MB'
          },
          {
            name: 'Meeting Notes.docx',
            url: 'https://contoso.sharepoint.com/sites/Team/Shared%20Documents/Meeting%20Notes.docx',
            modified: '2024-01-20T09:15:00Z',
            size: '89KB'
          }
        ]
      };
    } else if (message.toLowerCase().includes('dataverse') || message.toLowerCase().includes('customer') || message.toLowerCase().includes('contact')) {
      // Mock Dataverse response
      response = 'Retrieved 5 customer records from Dataverse';
      data = {
        source: 'dataverse',
        count: 5,
        items: [
          {
            id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
            name: 'Contoso Ltd',
            email: 'contact@contoso.com',
            status: 'Active',
            accountType: 'Enterprise'
          },
          {
            id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
            name: 'Fabrikam Inc',
            email: 'info@fabrikam.com',
            status: 'Active',
            accountType: 'Premium'
          },
          {
            id: 'c3d4e5f6-a7b8-9012-cdef-345678901234',
            name: 'Adventure Works',
            email: 'sales@adventureworks.com',
            status: 'Active',
            accountType: 'Standard'
          },
          {
            id: 'd4e5f6a7-b8c9-0123-defa-456789012345',
            name: 'Northwind Traders',
            email: 'support@northwind.com',
            status: 'Inactive',
            accountType: 'Premium'
          },
          {
            id: 'e5f6a7b8-c9d0-1234-efab-567890123456',
            name: 'Blue Yonder Airlines',
            email: 'contact@blueyonder.com',
            status: 'Active',
            accountType: 'Enterprise'
          }
        ]
      };
    } else {
      // Default response
      response = `I received your message: "${message}". Try asking about SharePoint documents or Dataverse customers to see sample data.`;
    }

    res.json({ response, data });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Agent API server running on port ${PORT}`);
});