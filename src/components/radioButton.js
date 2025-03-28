export default function RadioButton({ question }) {
	return (
		<div key={"question_" + question.id}>
			{/* <p>{question.question}</p> */}
			<label>Little or no understanding</label>
			<input
				type="radio"
				name={"question_" + question.id}
				value="Little to no understanding"
			/>
			<label>Some understanding</label>
			<input
				type="radio"
				name={"question_" + question.id}
				value="Some understanding"
			/>
			<label>Some understanding</label>
			<input
				type="radio"
				name={"question_" + question.id}
				value="Good understanding"
			/>
		</div>
	);
}
