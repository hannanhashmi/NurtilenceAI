import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { image, prompt } = JSON.parse(event.body);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inline_data: { mime_type: "image/jpeg", data: image } }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini API Response:", data);
    return {
      statusCode: 200,
      body: JSON.stringify({ result: data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
