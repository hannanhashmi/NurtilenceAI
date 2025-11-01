export async function analyzeFoodImage(base64Image: string, prompt: string) {
  const response = await fetch("/.netlify/functions/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Image, prompt }),
  });

  if (!response.ok) {
    throw new Error("Server error: " + response.statusText);
  }

  const data = await response.json();
  return data.result;
}
