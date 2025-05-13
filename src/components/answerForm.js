"use client";
import AiResponse from "./aiResponse";

import { useState } from "react";

export default function AnswerForm({ getFeedbackFromAi, previousAnswer }) {
	const [data, setData] = useState({});
	const [answer, setAnswer] = useState();

	// console.log("Previous answer @ answerform: ", previousAnswer);

	async function getTested(formData) {
		console.log("Get tested!!!!!!");
		const newAnswer = await formData.get("answer");
		setData(await getFeedbackFromAi(newAnswer));
		console.log(data);
	}

	return (
		<>
			<div>
				{previousAnswer && (
					<>
						<p>Previous answer</p>
						<AiResponse
							data={previousAnswer}
							myAnswer={previousAnswer.answer}
						/>
					</>
				)}
			</div>
			<form action={getTested}>
				<input type="text" name="answer" placeholder="Your answer" />
				<button type="submit">Submit</button>
			</form>
			{data.myAnswer && console.log("Data received: ", data)}
			{/* {data.myAnswer && <AiResponse data={data} myAnswer={data.myAnswer} />} */}
		</>
	);
}
