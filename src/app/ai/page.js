import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

import AnswerForm from "@/components/answerForm";

import OpenAI from "openai";
const client = new OpenAI();

export default async function AIPage() {
	const successCriterion = "I can give three examples of variable types";
	const myAnswer = "Array, string, object, number, boolean";

	return (
		<div>
			<h1 className="text-2xl">Success criterion: {successCriterion}</h1>
			<AnswerForm successCriterion={successCriterion} />
		</div>
	);
}
