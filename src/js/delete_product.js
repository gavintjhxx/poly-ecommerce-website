function deleteProduct() {
    const productId = document.getElementById('form-product-id').value;
    // use trycatch to catch any error than occurs along the way
    try {
        const req = new XMLHttpRequest();
        req.open("DELETE", `http://localhost:8080/products/${productId}`);
        req.setRequestHeader("Content-Type", "application/json");
        req.send();
        req.onload = () => {
            // res is the number of rows affected after attempting to delete
            const res = JSON.parse(req.response).affectedRows;
            // if number of rows is 0, then no product was deleted, meaning the ID was incorrect.
            // else, a product was deleted and prompt success.
            res == 0 ? alert("Product not found. Please try again") : alert("Product deleted successfully");
        }
    } catch (err) {
        alert(`Something went wrong. (DELETE /products/${productId})\n${err}`);
    }
}