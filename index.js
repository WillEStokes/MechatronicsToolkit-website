const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
// const path = require('path');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
    console.log(path.resolve(__dirname, './index.html'));
    // res.sendFile(path.resolve(__dirname, './index.html'));
});

app.post('/run-code', async (req, res) => {
    const { code } = req.body;
    try {
        const response = await axios.post('https://run.glot.io/languages/cpp/latest', {
            headers: {
                'Authorization': `Token ${process.env.GLOT_API_KEY}`,
                'Content-Type': 'application/json'
            },
            data: {
                files: [
                    {
                        name: 'main.cpp',
                        content: code
                    }
                ]
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
