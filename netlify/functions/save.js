import { Client } from '@neondatabase/serverless';

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const { firstName, lastName, mobile, email } = JSON.parse(event.body);

  const client = new Client(process.env.NEON_DB_URL);
  await client.connect();

  try {
    await client.query(
      "INSERT INTO registrations (first_name, last_name, mobile, email) VALUES ($1,$2,$3,$4)",
      [firstName, lastName, mobile, email]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Saved successfully" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    await client.end();
  }
}
