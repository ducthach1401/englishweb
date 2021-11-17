getNameOfUser();
getQuiz();

async function getQuiz() {
    window.localStorage.clear();
    let quiz = window.location.href.split('/');
    quiz = quiz[quiz.length - 1];
    const url = API_URL + '/v1/question/test';
    const payload = {
        category: quiz
    }
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let data = await response.json();

    let num = 0;
    if (data.success){
        for (let question of data.result){
            window.localStorage.setItem(question.question, JSON.stringify(question.true));
            num ++;
            const element = document.createElement('div');
            element.setAttribute('class', 'col-10 element');
            const english = document.createElement('p');
            english.setAttribute('class', 'english')
            const div = document.createElement('div');
            div.setAttribute('class', 'answer');
            english.innerHTML = num + '. ' + question.question;
            element.appendChild(english);

            for (let i = 0; i <= 3; i++){
                const answer = document.createElement('input');
                answer.setAttribute('type', 'radio');
                answer.setAttribute('name', num);
                answer.setAttribute('value', question.answers[i]);
                answer.setAttribute('class', 'radio');
                const label = document.createElement('label');
                label.innerText = question.answers[i];
                div.appendChild(answer);
                div.appendChild(label);
            }
            element.appendChild(div);
            document.getElementById('quiz').appendChild(element);
        }
        // const submit = document.createElement('input');
        // submit.innerHTML = 'Submit';

        // const cancel = document.createElement('input');
        // cancel.innerHTML = 'Cancel';

        // document.getElementById('quiz').append(submit);
        // document.getElementById('quiz').append(cancel);
    }
}