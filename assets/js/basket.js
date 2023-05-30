const BASE_URL_BASKET = "http://localhost:8080/basket";

let row = document.querySelector(".card-row");
let menu = document.querySelector(".menu");
let close = document.querySelector(".close");
let burgerMenu = document.querySelector("#burger-menu");

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
                    </div>
                  </div>
                </div>
          `;
  });
}
async function getData() {
  let res = await axios(BASE_URL_BASKET);
  createCard(res.data);
}
getData();

async function deleteFunc(id) {
  await axios.delete(`${BASE_URL_BASKET}/${id}`);
}

menu.addEventListener("click", function () {
  burgerMenu.style.display = "block";
});
close.addEventListener("click", function () {
  burgerMenu.style.display = "none";
});
