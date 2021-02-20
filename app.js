/*
Here some short word:
Q/Qn = Question
N = And
A/An = Answer
QnA/QandA/QNA == Question and Answer;
*/







// Qiz API call

fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple")
	.then((response) => response.json())
	.then((data) => {
		potQandA(data.results);
		AnswerTable(data.results);
	});

// Correct Answer data & selected data:
let potAllCorrectAnswer = [];
let selectedAns = [];

// Full Question and Answer section create from this function:
let potQandA = (data) => {
	data.forEach((allData) => {
		let potQn = allData.question;
		let potAn = [allData.correct_answer];

		// send data of all Correct answers in "potAllCorrectAnswer" array:
		potAllCorrectAnswer.push(allData.correct_answer);

        // Send Data of inCorrect answers to "PotAn" array:
		allData.incorrect_answers.forEach((inCorrectAn) =>
			potAn.push(inCorrectAn)
		);

		// Create a random number for call random answer :
		let potNumber = [];

		for (
			var NumberArray = [0, 1, 2, 3], i = NumberArray.length;
			i--;

		) {
			let oneNumber = Math.floor(Math.random() * (i + 1));
			var random = a.splice(oneNumber, 1);
			potNumber.push(random[0]);
		}



		// Create data for QandA section of HTML file:
		let QNASection = document.getElementById("QNASection");
		let divQuiz = document.createElement("div");
		divQuiz.className = "Quiz";

		divQuiz.innerHTML = `<div class="Question"><li>${potQn}</li></div>
            

             <div class="Answers">
        
              <ol class="AnswersList">
				
               <li> <button  onclick=selectAns(event.target)>${
				potAn[potNumber[0]]
			}</button></li>
               <li> <button  onclick=selectAns(event.target)>${
				potAn[potNumber[1]]
			}</button></li>
               <li> <button  onclick=selectAns(event.target)>${
				potAn[potNumber[2]]
			}</button></li>
               <li> <button  onclick=selectAns(event.target)>${
				potAn[potNumber[3]]
			}</button></li>
               
 
                </ol>
               </div>`;

		QNASection.appendChild(divQuiz);
	});
};

// Select Answers:
let selectAns = (data) => {
	let Answer = data.innerText;
	data.classList.toggle("added");
	let indexSelectedAnswer = selectedAns.indexOf(Answer);

	if (indexSelectedAnswer === -1) {
		selectedAns.push(Answer);
	} else {
		selectedAns.splice(indexSelectedAnswer, 1);
	}
};

// Result section by click result button:
document.getElementById("result-btn").addEventListener("click", () => {
	// Some Display Off:
	document.getElementById("QNASection").style.display = "none";
	document.getElementById("result-section").style.display = "block";
	document.getElementById("header-text").style.display = "none";
	document.getElementById("result-btn-div").style.display = "none";

	//
	let wrongCount = 0;
	let rightCount = 0;

	//
	selectedAns.forEach((element) => {
		if (potAllCorrectAnswer.indexOf(element) == -1) {
			wrongCount = wrongCount + 1;
		} else {
			rightCount = rightCount + 1;
		}
	});

	// marks:
	document.getElementById("rightAnswer").innerText = rightCount;
	document.getElementById("wrongAnswer").innerText = wrongCount;

	document.getElementById("AnswerTable").style.display = "block";

	document
		.getElementById("next-btn")
		.addEventListener("click", () => window.location.reload());
});

// Answer sheet:

let AnswerTable = (data) => {
	data.forEach((allData) => {
		let potQn = allData.question;
		let potAn = allData.correct_answer;

		let AnswerTable = document.getElementById("AnswerTable");
		let divAnswerTable = document.createElement("div");
		divAnswerTable.className = "Quiz";

		divAnswerTable.innerHTML = `<div class="Question"><li>${potQn}</li></div>
            

             <div class="Answers">
        
               
				<div class="AnswersList">
                <li>  ${potAn} </li>
                
                </div>
               
 
               
               
               </div>`;

		AnswerTable.appendChild(divAnswerTable);
	});
};
