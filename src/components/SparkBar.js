"use client";
import { useState, useEffect } from "react";

export default function SparkBar({ score }) {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		let x = 0;
		const timer = setInterval(() => {
			// I can set the value of width here
			// but I cannot access the new value!
			if (x < score.total_score) {
				x++;
				setWidth(x);
			} else {
				console.log("All done");
				clearInterval(timer);
			}
		}, 50);
		return () => {
			clearInterval(timer);
		};
	}, [score]);

	return (
		<div className="max-w-[200px]">
			<p>User: {score.username}</p>
			{/* tailwind needs a lot of extra set up to do dynamic width */}
			<div
				style={{
					background: "#0FFF50",
					boxShadow: "0px 0px 5px 1px #0FFF50",
					borderRadius: "0px 20px 20px 0px",
					width: `${width * 5}px`,
				}}
			>
				{width}
			</div>
		</div>
	);
}
