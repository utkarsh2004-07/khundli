export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyAAe3kCdkfdiVFQeSMbxOwYqHMRp05Z9Dg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 8000
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Gemini API Error:', errorData)
      throw new Error('AI API failed')
    }

    const data = await response.json()
    const analysis = data.candidates[0].content.parts[0].text

    return Response.json({ analysis })
  } catch (error) {
    console.error('AI API Error:', error)
    return Response.json({ error: 'AI analysis failed' }, { status: 500 })
  }
}