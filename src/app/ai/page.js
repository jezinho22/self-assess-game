import OpenAI from "openai";

import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

import { getFeedbackFromAi } from "@/utils/utilities";

import AnswerForm from "@/components/answerForm";
import AiResponse from "@/components/aiResponse";
import { useState } from "react";

const client = new OpenAI();

export default async function AIPage() {
	const successCriterion = "I can give three examples of variable types";
	const myAnswer = "Array, string, object, number, boolean";

	async function getTested(formData) {
		"use server";
		const answer = formData.get("answer");
		console.log(answer);
		getFeedbackFromAi(answer, setData, data);
	}

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
			{data && <AiResponse data={data} myAnswer={myAnswer} />}
		</div>
	);
}
