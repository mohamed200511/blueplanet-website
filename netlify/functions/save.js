import { Client } from '@neondatabase/serverless';

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { firstName, lastName, mobile, email } = JSON.parse(event.body);

    const client = new Client(process.env.TEST_URL_ME);
    await client.connect();

    await client.query(
      "INSERT INTO registrations (first_name, last_name, mobile, email) VALUES ($1,$2,$3,$4)",
      [firstName, lastName, mobile, email]
    );

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Saved successfully" })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
