const BASE_URL = "http://localhost:8080/advantages";
const BASE_URL_BASKET = "http://localhost:8080/basket";

let row = document.querySelector(".card-row");
let searchInput = document.querySelector(".search");
let sortBtn = document.querySelector(".sort");
let load = document.querySelector(".load-more");
let menu=document.querySelector(".menu")
let close=document.querySelector(".close")
let burgerMenu=document.querySelector("#burger-menu")

menu.addEventListener("click",function(){
  burgerMenu.style.display="block"
})
close.addEventListener("click",function(){
  burgerMenu.style.display="none"
})

let dataArr = [];
let copyArr = [];
let sortedArr = [];

let max = 3;
let sorted = false;

function createCard(arr) {
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                  <div class="img-title">
                    <img src="${element.img}" alt="" />
                    <p>${element.title}</p>
                  </div>
                  <p>${element.content}
                  </p>
                  <p class="price">Price: ${element.price}$</p>
                  <div class="buttons">
                    <a href="#" onclick=deleteFunc(${element.id})><i class="fa-solid fa-trash"></i></a>
                    <a href="form.html?id=${element.id}"><i class="fa-solid fa-pen"></i></a>
                    <a href="#" onclick=basketFunc(${element.id})><i class="fa-solid fa-basket-shopping"></i></a>
                    <a href="details.html?id=${element.id}"><i class="fa-solid fa-info"></i></a>
                  </div>
                </div>
              </div>
        `;
  });
}

async function getData() {
  let res = await axios(BASE_URL);
  dataArr = res.data;
  copyArr = searchInput.value || copyArr.length ? copyArr : res.data;
  createCard(sliceArr(copyArr));
}
getData();

function sliceArr(arr) {
  return arr.slice(0, max);
}

load.addEventListener("click", function () {
  max = max + 3;
  if (max >= dataArr.length) {
    load.style.display = "none";
  }
  if (!sorted) {
    createCard(sliceArr(copyArr));
  } else {
    createCard(sliceArr(sortedArr));
  }
});

searchInput.addEventListener("input", function (e) {
  load.style.display = "block";
  copyArr = sortedArr.length ? sortedArr : dataArr;
  copyArr = copyArr.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  createCard(sliceArr(copyArr));
});

sortBtn.addEventListener("click", function () {
  sorted = true;
  if (sortBtn.innerHTML == "Sort") {
    sortedArr = copyArr.toSorted((a, b) => a.price - b.price);
    sortBtn.innerHTML = "Ascending";
  } else if (sortBtn.innerHTML == "Ascending") {
    sortedArr = copyArr.toSorted((a, b) => b.price - a.price);
    sortBtn.innerHTML = "Descending";
  } else {
    sortedArr = copyArr;
    sortBtn.innerHTML = "Sort";
  }
  createCard(sliceArr(sortedArr));
});

async function deleteFunc(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  await axios.delete(`${BASE_URL_BASKET}/${id}`);
}

async function basketFunc(id) {
  let obj = dataArr.filter((item) => item.id == id)[0];
  await axios.post(BASE_URL_BASKET, obj);
}
