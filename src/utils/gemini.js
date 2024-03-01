const { GoogleGenerativeAI } = require("@google/generative-ai");

export const geminiResponse = async (message) => {
  const genAI = new GoogleGenerativeAI("ENTER YOUR API KEY HERE");
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    return text;

  } catch (error) {
    console.error("Error with Gemini API");
    console.error(error);
    return null;
  }
};




// async function run() {

// }

// run();
