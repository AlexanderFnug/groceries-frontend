import API_URL from "../../settings.js";

export async function initAddProduct() {
  document
    .getElementById("addProductForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const productName = document.getElementById("productName").value;
      const productPrice = document.getElementById("productPrice").value;
      const productWeight = document.getElementById("productWeight").value;

      try {
        const response = await fetch(API_URL + "/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: productName,
            price: productPrice,
            weight: productWeight,
          }),
        });
        const data = await response.json();
        console.log("Success:", data);
        await loadProducts(); // Reload the list of products
      } catch (error) {
        console.error("Error:", error);
      }
    });

  async function loadProducts() {
    try {
      const response = await fetch(API_URL+"/products");
      const data = await response.json();
      const list = document.getElementById("productsList");
      list.innerHTML = "";
      data.forEach((product) => {
        const item = document.createElement("li");
        item.textContent = `${product.name} - $${product.price}`;
        list.appendChild(item);
      });
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  // Load products initially
  await loadProducts();
}
