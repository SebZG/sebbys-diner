import data from "/data.js";

const menuContainer = document.getElementById("menu-container");
const orderSummaryContainer = document.getElementById("order-summary-container");
const paymentModal = document.getElementById("payment-modal");
const paymentForm = document.getElementById("payment-form");

const orderArr = [];
let orderSubmitted = false;
let name = "";

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
    if (orderArr.length && !orderSubmitted) {
        orderSummaryContainer.innerHTML =
            `<h3 class="order-summary-title">Your order</h3>

            <div id="order-items-container" class="order-items-container">
                ${orderArr.map(({ name, price, id }) =>
                `<div id="order-items-wrapper" class="order-items-wrapper">
                        <h3 class="item-name">${name}</h3>
                        <div id="order-btn-price-wrapper" class="order-btn-price-wrapper">
                            <button class="btn-remove" data-remove="${id}">remove</button>
                            <p class="price">$${price}</p>
                        </div>
                    </div>
                `).join("")}
            </div >

            <span class="divider"></span>

            <div id="total-price-wrapper" class="total-price-wrapper">
                <h3 class="total-price">Total Price:</h3>
                <p class="price">$${orderArr.reduce((sum, { price }) => sum + price, 0)}</p>
            </div>

            <button id="btn-checkout" class="btn-checkout">Checkout</button>
        `;

        document.querySelectorAll(".btn-remove").forEach((btn) =>
            btn.addEventListener("click", (e) =>
                handleRemoveClick(e.target.dataset.remove)));

        document.getElementById("btn-checkout").addEventListener("click", () => {
            paymentModal.style.display = "block";
        });

        orderSummaryContainer.style.display = "block";

    } else if (orderArr.length && orderSubmitted) {
        orderSummaryContainer.innerHTML =
            `<div id="thank-you" class="thank-you">
                <p>Thanks ${name}! Your order is on its way!</p>
            </div>
        `
        orderSummaryContainer.style.display = "block";
    }
}

function handleRemoveClick(itemId) {
    const itemIndex = orderArr.findIndex((item) => item.id == itemId);
    if (itemIndex !== -1) {
        orderArr.splice(itemIndex, 1);
        renderOrderItems();
    }
}

paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    orderSubmitted = true;

    const paymentFormData = new FormData(paymentForm);
    name = paymentFormData.get("name");
    const cardNum = paymentFormData.get("card-num");
    const cvv = paymentFormData.get("cvv");

    paymentModal.style.display = "none";

    renderOrderItems();
});