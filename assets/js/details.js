const BASE_URL = "http://localhost:8080/advantages";

let id = new URLSearchParams(window.location.search).get("id");

let card = document.querySelector(".card");

let menu = document.querySelector(".menu");
let close = document.querySelector(".close");
let burgerMenu = document.querySelector("#burger-menu");

async function getData() {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = res.data;
  card.innerHTML = "";
  card.innerHTML += `
  <div class="row card-row">
            <div class="col-6">
              <img src="${data.img}" alt="" />
            </div>
            <div class="col-6 text">
              <h2><span>Title: </span>${data.title}</h2>
              <h3><span>Content: </span>${data.content}</h3>
              <h3><span>Price: </span>${data.price}</h3>
              <h4><span>Id: </span>${data.id}</h4>
            </div>
          </div>
  `;
}
getData()

menu.addEventListener("click", function () {
    burgerMenu.style.display = "block";
  });
  close.addEventListener("click", function () {
    burgerMenu.style.display = "none";
  });