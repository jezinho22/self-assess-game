import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

import AnswerForm from "@/components/answerForm";
import QuestionList from "@/components/QuestionList";

import { db } from "@/utils/utilities";

import OpenAI from "openai";
const client = new OpenAI();

export default async function SingleQuestionPage({ params }) {
	const slug = await params;
	const { userId } = await auth();

	const question_data = await db.query(
		`SELECT questions.id, questions.question, level.level 
		FROM questions JOIN level
		ON questions.level_id = level.id
		WHERE questions.id=${slug.id}`
	);
	const question = question_data.rows[0];

	const previous_answer_data = await db.query(
		`SELECT  questions.id, 
            questions.question,
	        level.level,
	        answers.answer,
	        answers.points,
			answers.feedback,
	        answers.mdn_description,
	        answers.mdn_link,
	        answers.w3schools_description,
	        answers.w3schools_link,
	        answers.youtube_description,
	        answers.youtube_link
	FROM questions JOIN answers
	ON questions.id = answers.question_id
	JOIN level
	ON questions.level_id = level.id
	WHERE questions.id='${slug.id}' AND answers.clerkid = '${userId}'`
	);

	const previousAnswer = previous_answer_data.rows[0];
	// console.log("Previous answer: ", previousAnswer);

	// on answer form
	// display previous answer
	// write new record previous answer exists

	// look at filtering to get highest scoring answer for each question
	// then there would be a record of all answers
	// and no need to update
	// watch out for empty fields

	// working out how to store ai response which uses state to prompt a render
	// but needs server action
	async function handleAnswer(data, answer) {
		"use server";

		console.log("Handling answer & data: ", question);
		console.log("Handling answer & data: ", data);

		const { userId } = await auth();

		// console.log("Saving to record of ", userId);
		// allow improving of marks if they already exist

		await db.query(`INSERT INTO answers (question_id, clerkid, answer, feedback, points,
											mdn_link, mdn_description, w3schools_link,
											w3schools_description,  youtube_link, youtube_description)
						VALUES (${question.id},'${userId}','${answer}','${data.feedback}',
											'${data.mark}','${data.mdn_link}','${data.mdn_description}',
											'${data.w3schools_link}','${data.w3schools_description}',
											'${data.youtube_link}','${data.youtube_description}')`);
	}

	// passed down to client component
	// but brings answer back here
	async function getFeedbackFromAi(answer) {
		"use server";

		// const aiResponse = z.object({
		// 	mark: z.number(),
		// 	feedback: z.string(),
		// 	mdn_link: z.string(),
		// 	mdn_description: z.string(),
		// 	w3schools_link: z.string(),
		// 	w3schools_description: z.string(),
		// 	youtube_link: z.string(),
		// 	youtube_description: z.string(),
		// });

		// const prompt = `I am a software development student on a skills bootcamp, learning html, css and javascript.
		// 			I am comparing myself against a success criterion.
		// 			Give me a grade and feedback for my response.
		// 			The criterion is:"""${successCriterion}""". My answer is:"""${myAnswer}.`;
		// const completion = await client.chat.completions.create({
		// 	model: "gpt-4o",
		// 	messages: [
		// 		{
		// 			role: "system",
		// 			content: `You are a software development bootcamp instructor giving a grade and very brief but helpful feedback.
		// 				You also consider the success criterion and give relevant links to the MDN website and the W3Schools website if available,
		// 				and to a highly rated youtube video.
		// 				For the grade you give a mark in the range 0 to 4 for little or no understanding,
		// 				a mark in the range 5 to 7 for some understanding,
		// 				a mark in the range 8 to 9 for good understanding,
		// 				a mark of 10 for a comprehensive and faultless answer.`,
		// 		},
		// 		{
		// 			role: "user",
		// 			content: prompt,
		// 		},
		// 	],
		// 	response_format: zodResponseFormat(aiResponse, "feedback"),
		// });
		// const data = JSON.parse(completion.choices[0].message.content);

		// console.log(data);

		// add answer to ai response
		// get page to redirect with answer and feedback on submit
		// plus inidcation of whether this is better than previous answer

		const data = {
			myAnswer: answer,
			mark: 8,
			feedback: `Great job! You correctly identified different types of variables in programming: array, string, object, number, and boolean. Listing more than the required three examples shows a good understanding. However, remember that "array" is a special type of object in JavaScript, so the main primitive types are number, string, and boolean. Your response demonstrates strong comprehension, though a brief mention of what each represents could further enhance it.`,
			mdn_link:
				"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
			mdn_description:
				"MDN Web Docs: JavaScript Data Types and Data Structures",
			w3schools_link: "https://www.w3schools.com/js/js_datatypes.asp",
			w3schools_description: "W3Schools: JavaScript Data Types",
			youtube_link: "https://www.youtube.com/watch?v=vEROU2XtPR8",
			youtube_description: "JavaScript Data Types Explained by freeCodeCamp",
		};
		//
		// console.log("AI response: ", data);
		handleAnswer(data, answer);
		return data;
	}

	// align data coming from database with data coming from ai eg marks vs points

	return (
		<div>
			<h1 className="text-2xl">Success criterion: {question.question}</h1>
			<h2 className="text-xl">Level: {question.level}</h2>
			<AnswerForm
				getFeedbackFromAi={getFeedbackFromAi}
				previousAnswer={previousAnswer}
			/>
		</div>
	);
}
