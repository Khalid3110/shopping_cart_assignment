const api_key =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
const sectionCenter = document.querySelector(".section-container");
const allbtns = document.querySelectorAll(".filter-btn");
const badge = document.querySelector(".badge");

window.addEventListener("load", async () => {
  let res = await fetch(api_key);
  let data = await res.json();
  //   console.log(data.categories[0].category_products);

  setProductData(data.categories[0].category_products);
  setCategoryButton(data);
});

let setProductData = (data) => {
  let displayMenu = data.map(function (item) {
    // console.log(item);

    return `<div class="single-card">
    ${
      item.badge_text == null
        ? `<div class="badge hide"></div>`
        : `<div class="badge">${item.badge_text}</div>`
    }
        <img
          class="product-img"
          src=${item.image}
          alt="Product Image"
        />
        <div class="product-desc">
          <div class="product-title">
            <div class="name">${item.title}</div>
            <div class="vendor">&#x2022;${item.vendor}</div>
          </div>
          <div class="product-price">
            <div class="offer-price">Rs ${item.price}</div>
            <div class="actual-price">${item.compare_at_price}</div>
            <div class="off">${calculateOff(
              item.compare_at_price,
              item.price
            )}% Off</div>
          </div>
          <button class="cart">Add to Cart</button>
        </div>
      </div>`;
  });
  displayMenu = displayMenu.join("");
  //   console.log(displayMenu);

  sectionCenter.innerHTML = displayMenu;
};

let calculateOff = (basePrice, offerPrice) => {
  return Math.floor(((basePrice - offerPrice) / basePrice) * 100);
};

let setCategoryButton = (data) => {
  allbtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let currentCategory = e.target.dataset.id;
      allbtns.forEach((btn) => {
        btn.classList.remove("background");
      });
      if (currentCategory === "Men") {
        setProductData(data.categories[0].category_products);
        btn.classList.add("background");
      } else if (currentCategory === "Women") {
        setProductData(data.categories[1].category_products);
        btn.classList.add("background");
      } else {
        setProductData(data.categories[2].category_products);
        btn.classList.add("background");
      }
    });
  });
};
