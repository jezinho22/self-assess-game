"use client";
import AiResponse from "./aiResponse";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

import { useState } from "react";

export default function AnswerForm({ getFeedbackFromAi, previousAnswer }) {
	const [data, setData] = useState({});
	const [answer, setAnswer] = useState();

	async function getTested(formData) {
		const myAnswer = await formData.get("answer");
		setData(await getFeedbackFromAi(myAnswer));
	}

	return (
		<>
			<div>
				<p>Previous answer</p>
				{previousAnswer && (
					<AiResponse data={previousAnswer} myAnswer={previousAnswer.answer} />
				)}
			</div>
			<form action={getTested}>
				<input type="text" name="answer" placeholder="Your answer" />
				<button type="submit">Submit</button>
			</form>
			{data && <AiResponse data={data} myAnswer={answer} />}
		</>
	);
}
