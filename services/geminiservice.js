const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

async function generateStudyNotes(topic, content) {
    try {
        const prompt = `You are a study assistant. Based on the topic "${topic}" and the following content, write clear, organized study notes using headings and bullet points.\n\nContent:\n${content}`;

        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': process.env.GEMINI_API_KEY
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const notes = data.candidates[0].content.parts[0].text;
        return notes;
    } catch (error) {
        console.log('Error generating study notes:', error);
        throw error;
    }
}

module.exports = { generateStudyNotes };