import { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const toAddress = process.env.RESEND_TO_EMAIL;

const handler: Handler = async (event) => {
  // Add CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    if (!toAddress) {
      throw new Error("RESEND_TO_EMAIL is not configured");
    }

    const { from, subject, body } = JSON.parse(event.body || "{}");

    const mailSentResponse = await resend.emails.send({
      from: `Contact Form <onboarding@resend.dev>`,
      replyTo: from,
      to: toAddress,
      subject,
      html: `<p>${body}</p>`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: mailSentResponse.data?.id }),
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: (error as Error).message || "Internal server error",
      }),
    };
  }
};

export { handler };
