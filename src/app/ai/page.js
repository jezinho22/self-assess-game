import OpenAI from "openai";
const client = new OpenAI();

export default async function AIPage() {
	const completion = await client.chat.completions.create({
		model: "gpt-4o",
		messages: [
			{
				role: "user",
				content: "Write a one-sentence bedtime story about a unicorn.",
			},
		],
	});

	console.log(completion.choices[0].message.content);

	// const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // call the API
	// const posts = await response.json(); // parse the response as JSON

	return (
		<div>
			<h1>Story</h1>
			<p>{completion.choices[0].message.content}</p>
		</div>
	);
}
