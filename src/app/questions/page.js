import { db } from "../../utils/utilities.js";
import RadioButton from "@/components/radioButton.js";

export default async function QuestionPage() {
	// console.log("Wass gorn orn in trainun, Neeyul?");
	// set up page to show questions with text boxes to input answers
	// create link to openai api
	const questions = (await db.query(`SELECT * FROM questions`)).rows;
	console.log(questions);

	async function handleSubmit(formData) {
		"use server";
		const answers = {};
		for (const pair of formData.entries()) {
			console.log(pair[0], pair[1]);
			answers[pair[0]] = pair[1];
		}
		console.log(formData.get("question_" + question.id));

		// const scent = formData.get("scent");
		// const colour = formData.get("colour");
		// const price = formData.get("price");

		// await db.query(
		// `INSERT INTO candles (scent, colour, price) VALUES ($1, $2, $3)`,
		// [scent, colour, price]
		// );

		// // revalidate that page to ensure ALL the new candles are shown
		// revalidatePath("/");
		// // redirect tot he page that shows the list of candles
		// redirect("/");
	}

	return (
		<div>
			<h1>Questions</h1>
			<form action={handleSubmit}>
				{questions.map((question) => (
					<RadioButton question={question} />
				))}
				<input type="text" name="answer" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
