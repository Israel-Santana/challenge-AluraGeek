// Función para eliminar un producto
function deleteProduct(productId) {
  // Enviar una solicitud DELETE al servidor para eliminar el producto
  fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' })
    .then(response => response.ok ? removeProductFromDOM(productId) : Promise.reject(response.status))
    .catch(error => console.error("Error:", error));
}

// Función para eliminar un producto del DOM
function removeProductFromDOM(productId) {
  // Obtener el elemento del producto en el DOM
  document.getElementById(productId).remove();
  //cuando se elimine un producto se muestra un mensaje
  alert("Producto eliminado exitosamente");  
}

export { deleteProduct };
