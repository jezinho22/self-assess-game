"use client";
import AiResponse from "./aiResponse";

import { useState } from "react";

export default function AnswerForm({ getFeedbackFromAi, previousAnswer }) {
	const [data, setData] = useState({});
	const [answer, setAnswer] = useState();

	async function getTested(formData) {
		const newAnswer = await formData.get("answer");
		setData(await getFeedbackFromAi(newAnswer));
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
			{data && <AiResponse data={data} myAnswer={data.answer} />}
		</>
	);
}
