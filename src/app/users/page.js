import { db } from "../../utils/utilities.js";

export default async function TestPage() {
	const posts = (await db.query(`SELECT * FROM users`)).rows;

	console.log(posts);

	return (
		<div>
			<h1>Posts</h1>
			<ul>
				{posts.map((post, index) => (
					<li key={post.id}>{post.username}</li>
				))}
			</ul>
		</div>
	);
}
