function loadProducts() {
    // Get all categories first so 
    // we can use the product category id to find the category name
    try {
        const reqCategories = new XMLHttpRequest();
        reqCategories.open("GET", "http://localhost:8080/categories");
        reqCategories.send();
        reqCategories.onload = () => {
            const categories = JSON.parse(reqCategories.response);
    
            // Get all products
            const reqProducts = new XMLHttpRequest();
            reqProducts.open("GET", "http://localhost:8080/products");
            reqProducts.send();
            // response
            reqProducts.onload = () => {
                const products = JSON.parse(reqProducts.response);
                html = "";
    
                /* 
                • Product Name
                • Product Image
                • Description
                • Category
                • Price
                • ID (auto increment)
                */
                for (let product of products) {
                    const productCategoryName = categories.find(c => c.id == product.category_id).name;
                    html += `<div class="product-container">`;
                        html += `<img class="product-image" src="${product.picture}" alt="product image" />`;
                        html += `<p class="product-name">${product.name}</p>`;
                        html += `<p class="product-price">$${product.price}</p>`;
                        html += `<p class="product-description">${product.description}</p>`;
                        html += `<div class="product-category">${productCategoryName}</div>`;
                    html += `</div>`;
                };
            
                productsContainer = document.getElementById("body-container");
                productsContainer.innerHTML = html;
            }
        }
    } catch (err) {
        alert(`Something went wrong. (GET /categories OR /products)\n${err}`);
    }
}