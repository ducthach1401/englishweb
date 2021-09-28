getNameOfUser();
getCategory();

async function getCategory(){
    let category = window.location.href.split('/');
    category = category[category.length - 1];
    const url = API_URL + '/v1/question?category=' +category;
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    let num = 0;
    for (let voca of data.result){
        const element = document.createElement('div');
        element.setAttribute('class', 'col-10 element');
        const english = document.createElement('p');
        english.setAttribute('class', 'english')
        // english.setAttribute('onclick', 'show()');
        const div = document.createElement('div');
        div.setAttribute('class', 'hidden');
        const meaning = document.createElement('p');
        const exampleEnglish = document.createElement('p');
        const exampleVietnamese = document.createElement('p');
        num ++;
        english.innerHTML = num + '. ' + voca.english + ' ' + voca.type + ': ' + '<span>' + voca.vietnamese + '</span>';
        meaning.innerHTML = '<b>Meaning: </b>' + voca.meaning;
        exampleEnglish.innerHTML = '<b>Example English: </b>' + voca.exampleEnglish;
        exampleVietnamese.innerHTML = '<b>Example Vietnamese: </b>' + voca.exampleVietnamese;

        element.appendChild(english);
        div.appendChild(meaning);
        div.appendChild(exampleEnglish);
        div.appendChild(exampleVietnamese);
        element.appendChild(div);
        document.getElementById('vocabulary').appendChild(element);
    }
}

// async function show(){
//     console.log('test');
// }
