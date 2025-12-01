const { Client } = require("pg");

exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);

    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();

        await client.query(
            "INSERT INTO users (first_name, last_name, mobile, email) VALUES ($1, $2, $3, $4)",
            [body.fn, body.ln, body.mobile, body.email]
        );

        await client.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Saved successfully" })
        };

    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
};
