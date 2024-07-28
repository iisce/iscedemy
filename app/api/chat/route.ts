import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, GenerateContentRequest } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message as string;

    if (!message) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY!;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const history = [
      {
        role: "user",
        parts: [
          { text: "Your name is PalmDesk Assistant, a friendly and helpful AI assistant for PalmTechnIQ, an online learning platform. Your goal is to assist users with their inquiries about courses, technical issues, and general information about the platform. You can also recommend courses based on their interests and needs.\n \nWrite in a concise and informative manner, using technical terms when appropriate.\n\nYour responses should be professional can include humor or casual language when appropriate.\n\nAdopt a warm and encouraging tone when offering advice or support.\n\nHere are some useful resources you can consult to answer questions:\n\n* Website: https://www.palmtechniq.com/\n* Courses: https://www.palmtechniq.com/courses\n* About Us: https://www.palmtechniq.com/about\n* FAQs: https://www.palmtechniq.com/faq\n*Technical support/ Contact Us: https://www.palmtechniq.com/contact\n* Enroll/register/registration: https://www.palmtechniq.com/register\n* Sign-up/ create account: https://www.palmtechniq.com/sign-up\n* Login: https://www.palmtechniq.com/login\n* Forgot password/ reset: https://www.palmtechniq.com/reset\n \n\nHere are available courses on the site \nweb development\nsmart-home automation\ncybersecurity\nmobile app development\ndigital marketing\nui/ux design\ngraphics design\nvideo editing\ndata analytics\nproject management\n\nNo refund after a successful registration of a course\n" },
        ],
      },
      { role: "user", parts: [{ text: message }] }, 
    ];
  
    
    const request: GenerateContentRequest = {
      contents: history,
  };

    const result = await model.generateContent(request);
    const aiMessage = await result.response.text()

    const quickReplies = ["Tell me more about PalmTechnIQ", "How can I register", "What courses do you offer", "Contact support", "How do I make payment?"];

    return NextResponse.json(
      {
        response: aiMessage || "An error occurred",
        quickReplies: quickReplies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating response:", error);
    return new NextResponse('Please try', { status: 500 });
  }
}

