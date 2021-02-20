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

		potAllCorrectAnswer.push(allData.correct_answer);

		allData.incorrect_answers.forEach((inCorrectAn) =>
			potAn.push(inCorrectAn)
		);

		let QNASection = document.getElementById("QNASection");
		let divQuiz = document.createElement("div");
        divQuiz.className = "Quiz";
        
        let pot = [];

		for (var a = [0, 1, 2, 3], i = a.length; i--; ) {
			let dekhi = Math.floor(Math.random() * (i + 1));
			var random = a.splice(dekhi, 1);
			pot.push(random[0]);
		} 
 

		divQuiz.innerHTML = `<div class="Question"><li>${potQn}</li></div>
            

             <div class="Answers">
        
              <ol class="AnswersList">
				
               <li> <button  onclick=selectAns(event.target)>${potAn[pot[0]]}</button></li>
               <li> <button  onclick=selectAns(event.target)>${potAn[pot[1]]}</button></li>
               <li> <button  onclick=selectAns(event.target)>${potAn[pot[2]]}</button></li>
               <li> <button  onclick=selectAns(event.target)>${potAn[pot[3]]}</button></li>
               
 
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
