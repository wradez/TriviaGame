var timeRemaining = 20;
var clockRunning = false;
var nextQuestion = false;
var questionOrder = 0;
var correctAnswer;
var questionsCorrect = 0;
var questionsIncorrect = 0;
var questionsUnanswered = 0;
var questions = [
    {
        "question": "How far back does the human history of Colorado extend?",
        "true answer": "1400 years",
        "answer 1": "150 years",
        "answer 2" : "520 years",
        "answer 3" : "780 years"
    },
    {
        "question": "Which Native American tribes inhabitated the land we now call Colorado?",
        "true answer": "All of these",
        "answer 1" : "Apache",
        "answer 2" : "Arapaho",
        "answer 3" : "Pueblo"
    },
    {
        "question": "Which European country was the first to visit the region now known as Colorado?",
        "true answer": "The Spanish",
        "answer 1" : "The British",
        "answer 2" : "The Portuguese",
        "answer 3" : "The French"
    },
    {
        "question": "What was the name of the man who started the Rocky Mountain Gold Rush?",
        "true answer" : "Lewis Ralston",
        "answer 1" : "Pike Anderson",
        "answer 2" : "Harrold Platte",
        "answer 3" : "Kevin Bacon"
    },
    {
        "question": "When did Colorado join the Union and become an official US state?",
        "true answer" : "1876",
        "answer 1" : "1890",
        "answer 2" : "1861",
        "answer 3" : "1865"
    }
];

//on page load to encompass everything
$(document).ready(function() {
    $("#start").on("click", function(){
        $(".jumbotron").addClass("d-none");
        $("#game").removeClass("d-none");
        newQuestion();
        startTimer();
    });

    $("#answers").on("click","#button1", checkAnswer);
    $("#answers").on("click","#button2", checkAnswer);
    $("#answers").on("click","#button3", checkAnswer);
    $("#answers").on("click","#button4", checkAnswer);


    function checkAnswer() {

        var answerChosen = $(this).attr("value");
        var status = $("<h2>")
        status.addClass("text-center");
        if(answerChosen == correctAnswer){
            questionsCorrect++;
            $(".btn-group-vertical").empty();
            status.text("Correct!");
            $(".btn-group-vertical").append(status);
            setTimeout(newQuestion, 5000);
        }else if(answerChosen != correctAnswer){
            questionsIncorrect++;
            $(".btn-group-vertical").empty();
            status.text("Wrong!");
            $(".btn-group-vertical").append(status).append("<h4>The correct answer was: " + correctAnswer + "</h4>");
            setTimeout(newQuestion, 5000);
        }

    }

    function startOver(){
        $(".btn-group-vertical").empty();
        $(".btn-group-vertical").html("Quiz Complete! Check your score below.");
        $(".btn-group-vertical").html("Correct answers: " + questionsCorrect);
        $(".btn-group-vertical").html("Incorrect answers: " + questionsIncorrect);
        $(".btn-group-vertical").html("Unanswered: " + questionsUnanswered);

        questionOrder = 0


    }
    
    function newQuestion(){
        startTimer();
        correctAnswer = questions[questionOrder]["true answer"];

        if(questionOrder === questions.length){
            startOver();
            return;
        }
        
        $("#question").text(questions[questionOrder].question);
        $(".btn-group-vertical").empty();

        for(var i = 1; i != 5; i++){
            var button = $("<button>").addClass("btn btn-primary btn-lg btn-block text-center").attr("id","button" + i).attr("type", "button");
            $(".btn-group-vertical").append(button);
        }

        
        $("#button1").text(questions[questionOrder]["true answer"]).attr("value", questions[questionOrder]["true answer"]);
        $("#button2").text(questions[questionOrder]["answer 1"]).attr("value", questions[questionOrder]["answer 1"]);
        $("#button3").text(questions[questionOrder]["answer 2"]).attr("value", questions[questionOrder]["answer 2"]);
        $("#button4").text(questions[questionOrder]["answer 3"]).attr("value", questions[questionOrder]["answer 3"]);

        questionOrder++;
    }

    function startTimer(){
        
        timeRemaining = 20;

        if(!clockRunning){
            setInterval(count, 1000);    
            clockRunning = true;  
        }
        
    }

    function count(){
        if(questionOrder == questions.length){
            startOver();
        }else if(timeRemaining != 0){
            $("#time").text(timeRemaining);
            timeRemaining--;
        }else{
            questionsUnanswered--;
            newQuestion();
        }
        
    }

});