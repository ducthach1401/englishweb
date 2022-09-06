getNameOfUser();
getQuiz();
var num = 0;

async function getQuiz() {
  window.localStorage.clear();
  let quiz = window.location.href.split("/");
  quiz = decodeURIComponent(quiz[quiz.length - 1]);
  const url = API_URL + "/v1/question/test";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  num = 0;
  if (data.success) {
    for (let question of data.result) {
      window.localStorage.setItem(
        question.question,
        JSON.stringify(question.true)
      );
      num++;
      const element = document.createElement("div");
      element.setAttribute("class", "col-10 element");
      const english = document.createElement("p");
      english.setAttribute("class", "english");
      english.setAttribute("id", num);
      const div = document.createElement("div");
      div.setAttribute("class", "answer");
      english.innerHTML = num + ". " + question.question;
      element.appendChild(english);

      for (let i = 0; i <= 3; i++) {
        const answer = document.createElement("input");
        answer.setAttribute("type", "radio");
        answer.setAttribute("name", num);
        answer.setAttribute("value", question.answers[i]);
        answer.setAttribute("class", "radio");
        const label = document.createElement("label");
        label.innerText = question.answers[i];
        div.appendChild(answer);
        div.appendChild(label);
      }
      element.appendChild(div);
      document.getElementById("quiz").appendChild(element);
    }
    const div = document.createElement("div");
    div.setAttribute("class", "col-10 submit");

    const submit = document.createElement("button");
    submit.setAttribute("value", "submit");
    submit.setAttribute("class", "btn btn-outline-info btn-lg button");
    submit.setAttribute("onclick", "submit()");
    submit.innerHTML = "Submit";
    div.appendChild(submit);

    // const cancel = document.createElement('button');
    // cancel.setAttribute('value', 'cancel');
    // cancel.setAttribute('class', 'btn btn-outline-secondary button');
    // cancel.setAttribute('onclick', 'cancel()');
    // cancel.innerHTML = 'Cancel';
    // div.appendChild(cancel);

    document.getElementById("quiz").append(div);
  }
}

async function submit() {
  let mark = 0;
  for (let i = 1; i <= num; i++) {
    const answer = document.getElementsByName(i);
    let question = document
      .getElementById(i)
      .innerText.replace(i.toString() + ". ", "")
      .trim();
    let result = window.localStorage.getItem(question);
    result = JSON.parse(result).english;
    for (let j = 0; j < answer.length; j++) {
      let flag = 1;
      if (answer[j].checked) {
        let data = answer[j].value;
        if (data == result) {
          mark++;
          flag = 0;
        } else {
          answer[j].nextSibling.setAttribute(
            "style",
            "color: red; font-weight: bold;"
          );
        }
      }

      if (answer[j].value == result) {
        answer[j].nextSibling.setAttribute(
          "style",
          "color: green; font-weight: bold;"
        );
      }

      answer[j].disabled = true;
      flag = 1;
    }
  }
  Swal.fire({
    title: "Mark: " + mark + "/" + num,
    icon: "success",
  });
}
