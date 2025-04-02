import { db } from "../../utils/utilities.js";
import RadioButton from "@/components/radioButton.js";
import { auth } from "@clerk/nextjs/server";

export default async function TestPage() {
	const users = (await db.query(`SELECT * FROM users`)).rows;
	console.log(users);

	// checking user in db
	const { userId } = await auth();
	console.log("The userId is ", userId);

	// if (userId && !users.includes(userId)) {
	// 	await db.query(`INSERT INTO users ()`);
	// }

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
