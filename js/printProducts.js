import { deleteProduct } from "./deletProducts.js";

// Función que imprime los productos en la página
function printProducts() {
    // Obtener el elemento HTML que contendrá la lista de productos
    let products = document.getElementById('products');
    // Variable que almacenará el HTML de los productos
    let productHTML = '';

    // Realizar una solicitud GET a la URL para obtener la lista de productos
    fetch("http://localhost:3000/products")
        .then(response => response.json()) // Convertir la respuesta a formato JSON
        .then(data => {
            // Recorrer cada producto en la lista
            data.forEach(element => {
                // Generar el HTML para cada producto
                productHTML += `
                    <div class="cart" id="${element.id}">
                        <img src="${element.img}" alt="img-producto">
                        <p>${element.name}</p>
                        <div class="price">
                            <p>$ ${element.price}</p>
                            <img class="delete-product" data-id="${element.id}" src="../img/btn-borrar.svg" alt="borrar">
                        </div>
                    </div>
                `;
            });
            // Agregar el HTML de los productos al elemento contenedor
            products.innerHTML = productHTML;

            // Agregar un evento de clic a cada botón de eliminar producto
            products.querySelectorAll('.delete-product').forEach(el => {
                el.addEventListener('click', (event) => {
                    // Prevenir el comportamiento por defecto del enlace
                    event.preventDefault(); 
                    // Llamar a la función para eliminar el producto
                    deleteProduct(el.dataset.id);
                });
            });
        })
        .catch(error => console.error("Error:", error)); // Manejar cualquier error que ocurra
}

printProducts();

export { printProducts };
