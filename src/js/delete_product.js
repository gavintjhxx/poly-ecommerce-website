function deleteProduct() {
    const productId = document.getElementById('form-product-id').value;

    alert(`Product deleted (ID: ${productId})`);
    const req = new XMLHttpRequest();
    req.open("DELETE", `http://localhost:8080/products/${productId}`);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
}