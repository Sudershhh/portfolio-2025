import { Handler } from "@netlify/functions";
import { Resend } from "resend";
// import Email from "../../src/components/Email";

const resend = new Resend(process.env.RESEND_API_KEY);
const toAddress = process.env.RESEND_TO_EMAIL;
const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { from, subject, body } = JSON.parse(event.body || "{}");

    const mailSentResponse = await resend.emails.send({
      from,
      to: toAddress!,
      subject,
      html: `<p>${body}</p>`,
    });

    console.log("After Sending", mailSentResponse);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as Error).message }),
    };
  }
};

export { handler };
