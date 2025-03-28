import { db } from "../../utils/utilities.js";
import RadioButton from "@/components/radioButton.js";

export default async function TestPage() {
	const users = (await db.query(`SELECT * FROM users`)).rows;

	// console.log(posts);

	return (
		<div>
			<h1>Posts</h1>
			<ul>
				{users.map((user) => (
					<li key={"user_" + user.id}>{user.username}</li>
				))}
			</ul>
		</div>
	);
}
