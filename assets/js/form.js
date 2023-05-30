const BASE_URL = "http://localhost:8080/advantages";

let form = document.querySelector("form");
let addEdit = document.querySelector(".add-edit");
let title = document.querySelector("#title");
let content = document.querySelector("#content");
let price = document.querySelector("#price");
let img = document.querySelector("#img");
let addBtn = document.querySelector("#add");
let menu = document.querySelector(".menu");
let close = document.querySelector(".close");
let burgerMenu = document.querySelector("#burger-menu");

let id = new URLSearchParams(window.location.search).get("id");

if (id) {
  addEdit.innerHTML = "Edit Advantages";
  addBtn.innerHTML = "edit";
  async function getData() {
    let res = await axios(`${BASE_URL}/${id}`);
    let data = res.data;
    title.value = data.title;
    content.value = data.content;
    price.value = data.price;
  }
  getData();
}

form.addEventListener("submit", async function () {
  let obj = {
    img: `./assets/image/${img.value.split("\\")[2]}`,
    title: title.value,
    content: content.value,
    price: price.value,
  };
  if (id) {
    await axios.patch(`${BASE_URL}/${id}`, obj);
  } else {
    await axios.post(BASE_URL, obj);
  }
  window.location="index.html"
});

menu.addEventListener("click", function () {
  burgerMenu.style.display = "block";
});
close.addEventListener("click", function () {
  burgerMenu.style.display = "none";
});
