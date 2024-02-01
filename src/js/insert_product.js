function getCategories() {
    // Get all categories to list down in a dropdown menu
    const reqCategories = new XMLHttpRequest();
    reqCategories.open("GET", "http://localhost:8080/categories");
    reqCategories.send();
    reqCategories.onload = () => {
        const categories = JSON.parse(reqCategories.response);
        html = "";
        index = 0; // start at -1 so it becomes index 1 on first increment
        for (let category of categories) {
            index += 1;
            const categoryName = category.name;
            html += `<option value="${index}">${categoryName}</option>`;
        };
        
        categoryDropdownMenu = document.getElementById("form-category");
        categoryDropdownMenu.innerHTML = html;
    };
}

function insertProduct() {
    // Form fields
    const product = {
        name: document.getElementById('form-name').value,
        picture: document.getElementById('form-image').value,
        description: document.getElementById('form-description').value,
        price: parseInt(document.getElementById('form-price').value),
        category_id: parseInt(document.getElementById('form-category').value)
    };

    alert("Inserted product");

    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/products");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(product));
}