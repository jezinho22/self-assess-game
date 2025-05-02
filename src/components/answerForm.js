"use client";
import AiResponse from "./aiResponse";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

import { useState } from "react";

export default function AnswerForm({ getFeedbackFromAi, previousAnswer }) {
	const [data, setData] = useState(previousAnswer);
	const [answer, setAnswer] = useState();

	async function getTested(formData) {
		const answer = formData.get("answer");
		setData(await getFeedbackFromAi(answer));
	}

	return (
		<>
			<form action={getTested}>
				<input type="text" name="answer" placeholder="Your answer" />
				<button type="submit">Submit</button>
			</form>

			{data && <AiResponse data={data} myAnswer={answer} />}
		</>
	);
}
