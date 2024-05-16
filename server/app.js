const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/query', async (req, res) => {
    const { userInput } = req.body;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Make sure to set this in your environment

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "text-davinci-002", // or your specific model
                prompt: userInput,
                max_tokens: 150
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Failed to fetch OpenAI API:', error);
        res.status(500).send('Failed to communicate with OpenAI API');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
