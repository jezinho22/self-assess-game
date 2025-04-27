export default function RadioButton({ question }) {
	return (
		<div key={"question_" + question.id}>
			<p className="text-[#f7efe3] mt-3">{question.question}</p>
			<label className="text-[#ef233c]">Little or no understanding</label>
			<input
				type="radio"
				name={"question_" + question.id}
				value="Little to no understanding"
			/>
			<label className="text-[#ffc540]">Some understanding</label>
			<input
				type="radio"
				name={"question_" + question.id}
				value="Some understanding"
			/>
			<label className="text-[#2bd872]">Some understanding</label>
			<input
				type="radio"
				name={"question_" + question.id}
				value="Good understanding"
			/>
		</div>
	);
}
