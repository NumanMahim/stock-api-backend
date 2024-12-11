const express = require('express');
const axios = require('axios');
const app = express();
const port = 1122;  // Set the port to 1111

// Your Finnhub API key (replace this with your actual API key)
const API_KEY = 'ctcdkc1r01qjor98brs0ctcdkc1r01qjor98brsg';  // Replace with your actual API key

// Home route
app.get('/', (req, res) => {
    res.send('Hello, Stock API!');
});

// Stock API route
app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // API call to Finnhub to fetch stock data
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
        
        // Send the stock data as JSON response
        res.json(response.data);
    } catch (error) {
        // Log detailed error message
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        
        // Send a detailed error message to the client
        res.status(500).json({ message: 'Error fetching stock data', error: error.response ? error.response.data : error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
