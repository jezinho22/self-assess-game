import { db } from "../../utils/utilities.js";
import RadioButton from "@/components/radioButton.js";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function TestPage() {
	const users = (await db.query(`SELECT * FROM users`)).rows;

	// checking user in db
	const { userId } = await auth();
	console.log("The userId is ", userId);

	const { lastName, firstName, fullName, emailAddresses } = await currentUser();

	console.log(emailAddresses[0].emailAddress);
	console.log(lastName, firstName, fullName);

	const clerkIds = users.map((user) => user.clerkid);

	if (userId && !clerkIds.includes(userId)) {
		await db.query(
			`INSERT INTO users (clerkid, fullname) VALUES ('${userId}', '${fullName}')`
		);
	}

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
