function onInit()
{
    console.log("var index: "+index);
    createHomePage();
    parties.forEach(partie => {
        points.push({n: partie.name, p: 0});
    });
}

function clearPage()
{
    page.innerHTML = "";  
}

function calculateResult(results)
{		                                 //count all the answers and
    var AnswEens = 0;					//display the outcome in the console
    var AnswNone = 0;					
    var AnswOneens = 0;
    results.forEach(item =>
    {
        if(item.value == "Eens")
            {
            AnswEens++;
            }
        else if
        (item.value == "Geen")
            {
            AnswNone++; 
            }
        else if
        (item.value == "Oneens")
        {
            AnswOneens++;
        }
    });
    console.log("einduitslag: (Eens: " + AnswEens + ") (Geen van beide: " + AnswNone + ") (Oneens :" + AnswOneens + ")");
    console.log(AnswEens + " " + AnswNone + " " + AnswOneens);
    
    parties.forEach(item=>
    {
        console.log(parties[0].points)
    });
    
}


function createHomePage()
{        

    clearPage();

    var elem = element("div", [
        element("h3", text("Klik op start om te beginnen"), [attribute("class", "w3-container")]), 
        element("p", text("Test uw politieke voorkeur aan de hand van " + subjects.length + " stellingen"), [attribute("class", "w3-container")]),
        element("button", text("Start"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next()")]),
    ], [attribute("class", "w3-card-4 custom-card")]);

    page.appendChild(elem);
}

function createReviewPage(results)
{   
    clearPage();
    calculateResult(results);

    var elem = element("div", 
        [
        element("button", text("Terug"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "back()")]),
        element("h4", text("Bekijk je resultaten"), [attribute("class", "w3-container")]),
        ]
        , [attribute("class", "w3-card-4 custom-card")]);

    results.forEach(result =>
    {
        if(result.value == "Unanswered")

        { 
            var goToQuestionButton = element("button", [text(result.question)], [attribute("class", "w3-button w3-red w3-hover-blue"), attribute("onclick", "createQuestionPage(" + (result.question - 1) + ")")])
        }
        else
        {
            var goToQuestionButton = element("button", [text(result.question)], [attribute("class", "w3-button w3-green w3-hover-blue"), attribute("onclick", "createQuestionPage(" + (result.question - 1) + ")")])
        }
        
        elem.appendChild(goToQuestionButton);
    });

    results.forEach(result =>
    {
       var resultsText = element("p", text("vraag: " + result.question + ", resultaat: " + result.value), [attribute("class", "w3-container")]);
       elem.appendChild(resultsText);
    });

    points.forEach(point =>
    {
        var count = element("p", text(point.n +" met "+ point.p + " punten"), [attribute("class", "w3-container")]);
        page.appendChild(count);
    });

    page.appendChild(elem);
}

function createQuestionPage(indexn)
{
    index = indexn;
    clearPage();

    var elem = element("div", [
        element("button", text("Terug"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "back()")]),
        element("h2", text(subjects[indexn].title), [attribute("class", "w3-container")]),
        element("p", text(subjects[indexn].statement), [attribute("class", "w3-container")]),

        element("button", text("Eens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('Eens', "+ indexn +")")]),
        element("button", text("Geen van beide"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('Geen', "+ indexn +")")]),
        element("button", text("Oneens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('Oneens', "+ indexn +")")]),
        element("button", text("Overslaan"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('Unanswered', "+ indexn +")")]),

    ], [attribute("class", "w3-card-4 custom-card")])
    var pariesThink = element("div", [], [attribute("class", "parties-div")]);
    var pro = element("div", [element("h1", text("Voor"))], [attribute("class", "w3-card-4 custom-two")]);
    var ambivalent = element("div", [element("h1", text("Geen van beide"))], [attribute("class", "w3-card-4 custom-two")]);
    var contra = element("div", [element("h1", text("Tegen"))], [attribute("class", "w3-card-4 custom-two")]);

    subjects[indexn].parties.forEach(parie =>
    {
        if(parie.position == "pro")
        {
            pro.appendChild(element("div", [
                element("h4", text(parie.name)),
                element("p", text(parie.explanation))
            ], []))
        }
        else if(parie.position == "ambivalent")
        {
            ambivalent.appendChild(element("div", [
                element("h4", text(parie.name)),
                element("p", text(parie.explanation))
            ], []))          
        }
        else
        {
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


function next(value, question)
{
    console.log("var index: "+index);
    if(question == undefined)
        {
            index = 0;
        }
    else
        {
            index = question + 1;
            if(index < subjects.length)
            {
             if(value == "Eens")
            {
                subjects[index].parties.forEach(par =>
                {
                    if(par.position == "pro")
                    {
                        points.forEach(point =>
                        {
                            if(point.n == par.name)
                            {
                                point.p++;
                            }
                        });
                    }
                });
            }
            if(value == "Oneens")
            {
                subjects[index].parties.forEach(par =>
                {
                    if(par.position == "contra")
                    {
                        points.forEach(point =>
                        {
                            if(point.n == par.name)
                            {
                                point.p++;
                            }
                        });
                    }
                });
            }
            if(value == "Geen")
            {
                subjects[index].parties.forEach(par =>
                {
                    if(par.position == "ambivalent")
                    {
                        points.forEach(point =>
                        {
                            if(point.n == par.name)
                            {
                                point.p++;
                            }
                        });
                    }
                });
            }
        }
    }



    if(value != undefined)
    {
        results[index] = {question: index, value: value};   
    }

    if(index < subjects.length)
    {
        createQuestionPage(index);
    
    }
    else
    {
        createReviewPage(results);
    }
}

function back()
{
    index--;
    if(index == -1)
    {                
        createHomePage();
    }
    else
    {
        createQuestionPage(index);        
    }
}

onInit();