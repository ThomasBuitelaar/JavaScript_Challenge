var page = document.getElementById("main");
var index = -1;
results = [];

function onInit(){
    createHomePage();
}

function clearPage(){
    page.innerHTML = "";  
}

function calculateResult(results){		//count all the answers and
    var AnswEens = 0;					//display the outcome in the console
    var AnswNone = 0;					
    var AnswOneens = 0;
    results.forEach(item => {
        if(item.value == "eens"){
            AnswEens++;
        }else if(item.value == "geen van beide"){
            AnswNone++;
        }else if(item.value == "oneens"){
            AnswOneens++;
        }
    });

    console.log("einduitslag: (Eens: " + AnswEens + ") (Geen van beide: " + AnswNone + ") (Oneens :" + AnswOneens + ")");
    console.log(AnswEens + " " + AnswNone + " " + AnswOneens);
}

function createHomePage(){        
    clearPage();

    var elem = element("div", [		//the elements shown on the home screen
        element("h3", text("Klik op start om te beginnen"), [attribute("class", "w3-container")]), 
        element("p", text("Test uw politieke voorkeur aan de hand van " + subjects.length + " stellingen"), [attribute("class", "w3-container")]),
        element("button", text("Start"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next()")])
    ], [attribute("class", "w3-card-4 custom-card")]);


    page.appendChild(elem);             //dus document.getElementById("main").appendChild(elem);
}

function createReviewPage(results){             //guess what...
    page.appendChild(elem);
}

function createReviewPage(results){
    clearPage();
    calculateResult(results);

    var elem = element("div", [
        element("button", text("Terug"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "back()")]),
        element("h4", text("Bekijk je resultaten"), [attribute("class", "w3-container")]),
    ], [attribute("class", "w3-card-4 custom-card")]);

    results.forEach(result => {
        if(result.value == "unanswered"){
            var goToQuestionButton = element("button", [text(result.question)], [attribute("class", "w3-button w3-red w3-hover-blue"), attribute("onclick", "createQuestionPage(" + (result.question - 1) + ")")])
        }
        else{
        }else{
            var goToQuestionButton = element("button", [text(result.question)], [attribute("class", "w3-button w3-green w3-hover-blue"), attribute("onclick", "createQuestionPage(" + (result.question - 1) + ")")])
        }
        
        elem.appendChild(goToQuestionButton);
    });

    results.forEach(result => {
       var resultsText = element("p", text("Vraag " + result.question + ": " + result.value), [attribute("class", "w3-container")]);
       elem.appendChild(resultsText);
    });
    

    page.appendChild(elem);
}

function createQuestionPage(indexn){
    index = indexn;
    clearPage();

    var elem = element("div", [
        element("button", text("Terug"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "back()")]),
        element("h2", text(subjects[indexn].title), [attribute("class", "w3-container")]),
        element("p", text(subjects[indexn].statement), [attribute("class", "w3-container")]),

        element("button", text("Eens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('Eens', "+ indexn +")")]),
        element("button", text("Geen van beide"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('Geen van beide', "+ indexn +")")]),
        element("button", text("Oneens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('Oneens', "+ indexn +")")]),
        element("button", text("Overslaan"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('Unanswered', "+ indexn +")")]),

        element("button", text("Eens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('eens', "+ indexn +")")]),
        element("button", text("Geen van beide"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('geen van beide', "+ indexn +")")]),
        element("button", text("Oneens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('oneens', "+ indexn +")")]),
        element("button", text("Overslaan"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('unanswered', "+ indexn +")")]),

    ], [attribute("class", "w3-card-4 custom-card")])
    var pariesThink = element("div", [], [attribute("class", "parties-div")]);
    var pro = element("div", [element("h1", text("Voor"))], [attribute("class", "w3-card-4 custom-two")]);
    var ambivalent = element("div", [element("h1", text("Geen van beide"))], [attribute("class", "w3-card-4 custom-two")]);
    var contra = element("div", [element("h1", text("Tegen"))], [attribute("class", "w3-card-4 custom-two")]);

    subjects[indexn].parties.forEach(parie => {
        if(parie.position == "pro"){
            pro.appendChild(element("div", [
                element("h4", text(parie.name)),
                element("p", text(parie.explanation))
            ], []))
        }else if(parie.position == "ambivalent"){
            ambivalent.appendChild(element("div", [
                element("h4", text(parie.name)),
                element("p", text(parie.explanation))
            ], []))          
        }else{
            contra.appendChild(element("div", [
                element("h4", text(parie.name)),
                element("p", text(parie.explanation))
            ], []))
        }
    });
    pariesThink.appendChild(pro);
    pariesThink.appendChild(ambivalent);
    pariesThink.appendChild(contra);
    elem.appendChild(pariesThink);
    page.appendChild(elem);
}

function next(value, question){
    var q;
    if(question == undefined){q = 0;}
    else{q = question + 1}
    
    if(value != undefined){
        results[q] = {question: q, value: value};   
    }
    
    if(q < subjects.length){                //kijkt naaar hoeveelheid vragen, en doet er telkens +1 bij var index en word de volgende vraag getoont
        index++;                            //vervolgens, wanneer q niet meer kleiner is dan subjects.length (ofterwijl de hoeveelheid vragen)
        createQuestionPage(index);          //dan wordt de revieuwpage ingeladen.
    }else{
        index++;
        createReviewPage(results);
    }
}

function back(){
    index--;
    if(index == -1){                
        createHomePage();
    }else{
        createQuestionPage(index);        
    }

}

onInit();