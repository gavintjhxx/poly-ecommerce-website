function deleteProduct() {
    const productId = document.getElementById('form-product-id').value;

    try {
        const req = new XMLHttpRequest();
        req.open("DELETE", `http://localhost:8080/products/${productId}`);
        req.setRequestHeader("Content-Type", "application/json");
        req.send();
        alert(`Product deleted (ID: ${productId})`);
    } catch (err) {
        alert(`Something went wrong. (DELETE /products/${productId})\n${err}`);
    }
}