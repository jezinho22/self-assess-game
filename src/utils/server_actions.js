"use server";
import { db } from "./utilities";

export async function storeAnswer() {
	const questions = await db.query(`SELECT * FROM questions`).rows;
	return questions;
}
