function loadProducts() {
    // use trycatch to catch any error than occurs along the way
    try {
        const reqCategories = new XMLHttpRequest();
        // We GET the categories first so we can access the
        // category name via category id from the list of products
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
                    // Compare the category list we obtained earlier
                    // with the category id for each product in the list of products
                    // to get the category name
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