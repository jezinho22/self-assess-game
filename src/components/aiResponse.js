"use client";

export default function AiResponse({ data, myAnswer }) {
	function myGrade(points) {
		if (points < 5) {
			return "Little or no understanding";
		} else if (points < 8) {
			return "Some understanding";
		} else if (points >= 8) {
			return "Good understanding";
		} else {
			return "Error: Data not passed";
		}
	}

	return (
		<>
			<h3>My answer: {myAnswer}</h3>
			<p>Grade: {myGrade(data.mark) ? myGrade(data.mark) : ""}</p>
			<p>Marks: {data.mark} out of 10</p>
			<p>Feedback: {data.feedback}</p>
			<h3 className="text-xl text-[#3f1046]">Useful links:</h3>
			<ul>
				<li>
					<a className="text-[#9528a5]" target="_blank" href={data.mdn_link}>
						{data.mdn_description}
					</a>
				</li>
				<li>
					<a
						className="text-[#9528a5]"
						target="_blank"
						href={data.w3schools_link}
					>
						{data.w3schools_description}
					</a>
				</li>
				<li>
					<a
						className="text-[#9528a5]"
						target="_blank"
						href={data.youtube_link}
					>
						{data.youtube_description}
					</a>
				</li>
			</ul>
		</>
	);
}
