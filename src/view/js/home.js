getCategory();
getNameOfUser();

async function getCategory(){
    const url = API_URL + '/v1/category/all';
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    for (let i of data.result){
        const element_col = document.createElement('div');
        element_col.setAttribute('class', 'col-3');
        const element = document.createElement('div');
        element.setAttribute('class', 'card');
        element.setAttribute('id', 'album')
        element.setAttribute('onclick', 'clickCategory(this.innerText)')
        const temp = document.createElement('div');
        temp.setAttribute('class', 'card-body text-center');
        const text = document.createElement('p');
        text.setAttribute('class', 'card-text h5');
        text.innerText = i;
        temp.appendChild(text);
        element.appendChild(temp);
        element_col.appendChild(element);
        document.getElementById('vocabulary').appendChild(element_col);
    }
}

async function clickCategory(name){
    console.log(name);
    document.getElementById('vocabulary').innerHTML = '';
    const url = API_URL + '/v1/question?category=' + name.replace('&', '%26');
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    console.log(data);
    for (let voca of data.result){
        const element = document.createElement('div');
        const english = document.createElement('p');
        const vietnamese = document.createElement('p');
        const meaning = document.createElement('p');
        const exampleEnglish = document.createElement('p');
        const exampleVietnamese = document.createElement('p');
    
        english.innerText = voca.english + ' ' + voca.type;
        vietnamese.innerText = voca.vietnamese;
        meaning.innerText = voca.meaning;
        exampleEnglish.innerText = voca.exampleEnglish;
        exampleVietnamese.innerText = voca.exampleVietnamese;

        element.appendChild(english);
        element.appendChild(vietnamese);
        element.appendChild(meaning);
        element.appendChild(exampleEnglish);
        element.appendChild(exampleVietnamese);
        document.getElementById('vocabulary').appendChild(element);
    }
}