const express = require('express');
const router = express.Router();

const { OpenAI } = require('openai');
const openai = new OpenAI();

// prompt chatgpt
router.post('/', async (req, res) => {
    try {
        const userMessage = req.body.content;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a personal trainer. Only respond as if you were helping someone with their work outs and meal prepping / nutrition. You are very friendly and supportive to the user. Maximum length of your responses is 100 words." },
                {
                    role: "user",
                    content: userMessage,
                },
            ],
            max_tokens: 150,
            store: true,
            temperature: 0.7,
        });

        return res.status(200).json({ message: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

module.exports = router;