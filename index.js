import data from "/data.js";

const menuContainer = document.getElementById("menu-container");
const orderItemsContainer = document.getElementById("order-items-container");
const orderSummaryContainer = document.getElementById("order-summary-container");

const orderArr = [];

menuContainer.innerHTML = data.map(({ name, ingredients, price, emoji, id }) =>
    `<div id="menu-item-wrapper" class="menu-item-wrapper">
            <div class="emoji-info-wrapper">
                <span id="item-emoji" class="item-emoji">${emoji}</span>
                <div id="item-info-wrapper" class="item-info-wrapper">
                    <h3 class="item-name">${name}</h3>
                    <p class="item-ingredients">${ingredients}</p>
                    <p class="price">$${price}</p>
                </div>
            </div>
            <button class="btn-add" data-add="${id}">+</button>
        </div>
    `).join("");

document.querySelectorAll(".btn-add").forEach((btn) =>
    btn.addEventListener("click", (e) =>
        handleAddClick(e.target.dataset.add)));

function handleAddClick(itemId) {
    const itemObj = data.find((item) => item.id == itemId);
    orderArr.push(itemObj);
    renderOrderItems();
}

function renderOrderItems() {
    if (orderArr.length) {
        orderItemsContainer.innerHTML = orderArr.map(({ name, price, id }) =>
            `<div id="order-items-wrapper" class="order-items-wrapper">
                <h3 class="item-name">${name}</h3>
                <div id="order-btn-price-wrapper" class="order-btn-price-wrapper">
                    <button class="btn-remove" data-remove="${id}">remove</button>
                    <p class="price">$${price}</p>
                </div>
            </div>
        `).join("");

        document.querySelectorAll(".btn-remove").forEach((btn) =>
            btn.addEventListener("click", (e) =>
                handleRemoveClick(e.target.dataset.remove)));

        document.querySelector("#total-price-wrapper .price").textContent = `
                $${orderArr.reduce((sum, { price }) => sum + price, 0)}
            `;

        orderSummaryContainer.style.display = "block";

    } else {
        orderSummaryContainer.style.display = "none";
    }
}

function handleRemoveClick(itemId) {
    const itemIndex = orderArr.findIndex((item) => item.id == itemId);
    if (itemIndex !== -1) {
        orderArr.splice(itemIndex, 1);
        renderOrderItems();
    }
}