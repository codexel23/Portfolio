import fetch from 'node-fetch'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  if (!process.env.GROQ_API_KEY) {
    console.error('Missing GROQ_API_KEY')
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing GROQ_API_KEY in env' }),
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

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API error:', response.status, errorText)
      throw new Error(`Groq API error: ${response.status}`)
    }


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
      body: JSON.stringify({ error: err.message || 'Internal Server Error' }),
    }
  }
}
