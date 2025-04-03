import OpenAI from "openai";

import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

import AnswerForm from "@/components/answerForm";

const client = new OpenAI();

export default async function AIPage() {
	const successCriterion = "I can give three examples of variable types";
	const myAnswer = "Array, string, object, number, boolean";

	async function getTested(formData) {
		"use server";
		const answer = formData.get("answer");
		console.log(answer);
	}

	function getFeedbackFromAi(answer) {
		const aiResponse = z.object({
			mark: z.number(),
			feedback: z.string(),
			mdn_link: z.string(),
			mdn_description: z.string(),
			w3schools_link: z.string(),
			w3schools_description: z.string(),
			youtube_link: z.string(),
			youtube_description: z.string(),
		});

		const prompt = `I am a software development student on a skills bootcamp, learning html, css and javascript. 
					I am comparing myself against a success criterion. 
					Give me a grade and feedback for my response.
					The criterion is:"""${successCriterion}""". My answer is:"""${myAnswer}.`;
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

		const data = {
			mark: 9,
			feedback:
				"Great job! You correctly identified different types of variables in programming: array, string, object, number, and boolean. Listing more than the required three examples shows a good understanding. However, remember that 'array' is a special type of object in JavaScript, so the main primitive types are number, string, and boolean. Your response demonstrates strong comprehension, though a brief mention of what each represents could further enhance it.",
			mdn_link:
				"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
			mdn_description:
				"MDN Web Docs: JavaScript Data Types and Data Structures",
			w3schools_link: "https://www.w3schools.com/js/js_datatypes.asp",
			w3schools_description: "W3Schools: JavaScript Data Types",
			youtube_link: "https://www.youtube.com/watch?v=vEROU2XtPR8",
			youtube_description: "JavaScript Data Types Explained by freeCodeCamp",
		};

		return data;
	}

	const data = getFeedbackFromAi();

	function myGrade(mark) {
		if (mark < 5) {
			return "Little or no understanding";
		} else if (mark < 8) {
			return "Some understanding";
		} else if (mark >= 8) {
			return "Good understanding";
		}
	}

	return (
		<div>
			<h1 className="text-2xl">Success criterion: {successCriterion}</h1>
			<form action={getTested}>
				<AnswerForm />
			</form>
			<h3>My answer: {myAnswer}</h3>
			<p>Grade: {myGrade(data.mark)}</p>
			<p>Mark: {data.mark} out of 10</p>
			<p>Feedback: {data.feedback}</p>
			<h3 className="text-xl text-[#3f1046]">Useful links:</h3>
			<ul>
				<li>
					<a className="text-[#9528a5]" target="_blank" href={data.mdn_link}>
						{data.mdn_description}
					</a>
				</li>
				<li>
					<a
						className="text-[#9528a5]"
						target="_blank"
						href={data.w3schools_link}
					>
						{data.w3schools_description}
					</a>
				</li>
				<li>
					<a
						className="text-[#9528a5]"
						target="_blank"
						href={data.youtube_link}
					>
						{data.youtube_description}
					</a>
				</li>
			</ul>
		</div>
	);
}
