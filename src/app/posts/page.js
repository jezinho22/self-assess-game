export default async function PostsPage() {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // call the API
	const posts = await response.json(); // parse the response as JSON

	return (
		<div>
			<h1>Posts</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	);
}
