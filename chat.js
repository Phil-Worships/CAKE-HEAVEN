const API_KEY = 'your-openai-api-key';  // Replace with your OpenAI API key

document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    addMessageToChat('You: ' + userInput);
    document.getElementById('user-input').value = '';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userInput }],
        }),
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;
    addMessageToChat('ChatGPT: ' + botReply);
});

function addMessageToChat(message) {
    const chatWindow = document.getElementById('chat-window');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    chatWindow.appendChild(newMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
