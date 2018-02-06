var nr = 0;
var title = document.getElementById('subject')
var text = document.getElementById('statement');
var agree = document.getElementById('agree');
var disagree = document.getElementById('disagree');
var ambivalent = document.getElementById('ambivalent');
var skip = document.getElementById('skip');
var back = document.getElementById('back');
var result = document.getElementById('result');
var opinion = document.getElementById('opinion');


console.log(subjects[nr]);

text.innerHTML = subjects[nr].title;