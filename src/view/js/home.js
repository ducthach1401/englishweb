async function getCategory() {
  const url = API_URL + "/v1/category/all";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  for (let i of data.result) {
    const element_col = document.createElement("div");
    element_col.setAttribute("class", "col-3");
    const element = document.createElement("div");
    element.setAttribute("class", "card");
    element.setAttribute("id", "album");
    element.setAttribute("onclick", "clickCategory(this.innerText)");
    const temp = document.createElement("div");
    temp.setAttribute("class", "card-body text-center");
    const text = document.createElement("p");
    text.setAttribute("class", "card-text h5");
    text.innerText = i;
    temp.appendChild(text);
    element.appendChild(temp);
    element_col.appendChild(element);
    document.getElementById("vocabulary").appendChild(element_col);
  }
}

async function clickCategory(name) {
  document.getElementById("vocabulary").innerHTML = "";
  window.location.href = "/vocabulary/" + name.replace("&", "%26");
}
