const express = require('express');
const router = express.Router();

const { OpenAI } = require('openai');
const openai = new OpenAI();

// prompt trainer
router.post('/', async (req, res) => {
    try {
        const userMessage = req.body.content;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a personal trainer. Only respond as if you were helping someone with their work outs and meal prepping / nutrition. You are very friendly and supportive to the user. Maximum length of your responses is 100 words. Do not bold any of the text in your response." },
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

router.post('/workout-feedback', async (req, res) => {
    try {
        const workouts = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a personal trainer. Provide feedback and suggestions based on the users workout json data. Respond with bullet points. Maximum length of your responses is 20 words or 2 bullet points, whichever comes first. Don't use any formatting symbols in your response. Ignore the weight." },
                {
                    role: "user",
                    content: `Here is my workout data: ${JSON.stringify(workouts)}`,
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

router.post('/meal-feedback', async (req, res) => {
    try {
        const { mealData } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a personal trainer. Provide feedback and suggestions based on the users meal plan json data. Respond with bullet points. Maximum length of your responses is 100 words or 3 bullet points, whichever comes first. Don't use any formatting symbols in your response. Give them a recipe with the ingredients from their ingredient list." },
                {
                    role: "user",
                    content: `Here is my ingredient list: ${JSON.stringify(mealData)}`,
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