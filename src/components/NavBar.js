import Link from "next/link";
export default function NavBar() {
	return (
		<nav>
			{/* causes the page to refresh */}
			{/* <a href='/about'>a tag</a> */}
			{/* doesn't cause the page to refresh */}
			<Link className="p-5" href={"/"}>
				Home
			</Link>
			<Link className="p-5" href={"/ai"}>
				Test yourself
			</Link>
			<Link className="p-5" href={"/questions"}>
				Self assess
			</Link>
			<Link className="p-5" href={"/users"}>
				Users
			</Link>
		</nav>
	);
}
