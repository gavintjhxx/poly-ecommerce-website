// In this page, getCategories() is used to list all categories
// by the NAME using a dropdown menu
function getCategories() {
    try {
        // Get all categories to list down in a dropdown menu
        const reqCategories = new XMLHttpRequest();
        reqCategories.open("GET", "http://localhost:8080/categories");
        reqCategories.send();
        reqCategories.onload = () => {
            const categories = JSON.parse(reqCategories.response);
            html = "";
            index = 0; // start at -1 so it becomes index 1 on first increment
            for (let category of categories) {
                index += 1; // assign the option value to index, which is the category id
                const categoryName = category.name;
                html += `<option value="${index}">${categoryName}</option>`;
            };
            
            categoryDropdownMenu = document.getElementById("form-category");
            categoryDropdownMenu.innerHTML = html;
        };
    } catch (err) {
        alert(`Something went wrong. (GET /categories)\n${err}`);
    }
}

function insertProduct() {
    // use trycatch to catch any error than occurs along the way
    try {
        // Form fields
        const product = {
            name: document.getElementById('form-name').value,
            picture: document.getElementById('form-image').value,
            description: document.getElementById('form-description').value,
            price: parseInt(document.getElementById('form-price').value),
            category_id: parseInt(document.getElementById('form-category').value)
        };
        
        const req = new XMLHttpRequest();
        req.open("POST", "http://localhost:8080/products");
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(product));
        req.onload = () => {
            // res is nothing when the product is successfully inserted.
            const res = JSON.parse(req.response);
            // hence, prompt an error when res is NOT nothing/empty/null/undefined
            res ? alert("Product inserted successfully.") : alert(`Something went wrong.\n${res}`);
        }
    } catch (err) {
        alert(`Something went wrong. (POST /products)\n${err}`);
    }
}