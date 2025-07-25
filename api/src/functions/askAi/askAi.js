export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { prompt } = JSON.parse(event.body)

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: 'You are a helpful coding assistant.' },
          { role: 'user', content: prompt },
        ],
      }),
    })

    const data = await response.json()
    const aiMessage = data.choices?.[0]?.message?.content || 'No response received.'

    return {
      statusCode: 200,
      body: JSON.stringify({ output: aiMessage }),
    }
  } catch (err) {
    console.error('AI Function Error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
}
