function getCategories() {
    try {
        // Get all categories to list down in a dropdown menu
        const reqCategories = new XMLHttpRequest();
        reqCategories.open("GET", "http://localhost:8080/categories");
        reqCategories.send();
        reqCategories.onload = () => {
            const categories = JSON.parse(reqCategories.response);
            html = "";
            index = 0;
            for (let category of categories) {
                index += 1;
                const categoryName = category.name;
                html += `<option value="${index}">${categoryName}</option>`;
            };
            
            categoryDropdownMenu = document.getElementById("form-category");
            categoryDropdownMenu.innerHTML = html;
        };
    } catch (err) {
        alert(`Something went wrong. (GET /categories)\n${err.message}`);
    }
}

function updateProduct() {
    const productId = document.getElementById('form-product-id').value;
    // Form fields
    const product = {
        name: document.getElementById('form-name').value,
        imageUrl: document.getElementById('form-image').value,
        description: document.getElementById('form-description').value,
        category: document.getElementById('form-category').value,
        price: document.getElementById('form-price').value
    };

    try {
        const req = new XMLHttpRequest();
        req.open("PUT", `http://localhost:8080/products/${productId}`);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(product));
        alert(`PUT ${product.name} ${product.imageUrl} ${product.description} ${product.category} $${product.price}`);
    } catch (err) {
        alert(`Something went wrong. (PUT /products/${productId})\n${err.message}`);
    }
}