const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());

app.use(express.json());


app.get('/api/countries', async (req, res) => {
     try {
         const response = await axios.get('https://countriesnow.space/api/v0.1/countries/population');
         res.json(response.data);
     } catch (error) {
         console.error('Error fetching countries:', error.message);
         res.status(500).send('Error fetching countries');
     }
});

app.get('/api/countries/population', async (req, res) => {
     try {
         const response = await axios.get('https://countriesnow.space/api/v0.1/countries/population');
         res.json(response.data);
     } catch (error) {
         console.error('Error fetching country populations:', error.message);
         res.status(500).send('Error fetching country populations');
     }
});

app.get('/api/countries/flags', async (req, res) => {
     try {
         const response = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');
         res.json(response.data);
     } catch (error) {
         console.error('Error fetching flag images:', error.message);
         res.status(500).send('Error fetching flag images');
     }
});

app.get('/api/countries/:code', async (req, res) => {
    const countryCode = req.params.code.toUpperCase();

    if (!countryCode) {
        return res.status(400).send('Country code is required');
    }

    try {
        const response = await axios.get(`${process.env.BASE_URL}/CountryInfo/${countryCode}`);
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching country details:', error.message);
        if (error.response) {
            
            return res.status(error.response.status).send(error.response.data);
        }
        
        res.status(500).send('Error fetching country details');
    }
});

app.listen(PORT, () => {
     console.log(`Backend server running on http://localhost:${PORT}`);
});