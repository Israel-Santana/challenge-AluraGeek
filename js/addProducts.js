// Función para agregar productos
function addProducts() {
  // Obtener el formulario
  let form = document.querySelector('form');
  
  // Obtener los campos del formulario
  let nameProductForm = form.querySelector('#nameProductForm'); // Campo de nombre del producto
  let priceProductForm = form.querySelector('#priceProductForm'); // Campo de precio del producto
  let imgProductForm = form.querySelector('#imgProductForm'); // Campo de imagen del producto
  let btnSend = form.querySelector('#btnSend'); // Botón de enviar
  let btnClean = form.querySelector('#btnClean'); // Botón de limpiar

  // Evento para el campo de precio: limitar a 13 caracteres
  priceProductForm.addEventListener('input', function () {
    // Obtener el valor actual del campo de precio
    let price = this.value;
    
    // Verificar si el valor del precio tiene más de 5 caracteres
    if (price.length > 5) {
      // Limitar el valor a 13 caracteres
      this.value = price.slice(0, 13);
    }
  });

  // Evento para el botón de enviar
  btnSend.addEventListener('click', function (event) {
    // Prevenir el comportamiento de presentación de formulario predeterminado
    event.preventDefault(); 
    
    // Obtener los valores de los campos del formulario
    let name = nameProductForm.value; // Nombre del producto
    let price = parseFloat(priceProductForm.value); // Precio del producto
    let img = imgProductForm.value; // Imagen del producto

    // Verificar que todos los campos estén completos
    if (name.trim() === '' || isNaN(price) || img.trim() === '') {
      // Mostrar alerta si algún campo está vacío
      alert('Por favor completa todos los campos');
      return;
    }

    // Crear un nuevo objeto de producto
    let nuevoProducto = {
      name: name, // Nombre del producto
      price: price, // Precio del producto
      img: img // Imagen del producto
    };

    // Opciones para la solicitud fetch
    let options = {
      method: 'POST', // Método de solicitud
      headers: {
        'Content-Type': 'application/json' // Tipo de contenido
      },
      body: JSON.stringify(nuevoProducto) // Cuerpo de la solicitud
    };

    // Realizar la solicitud POST a la API
    fetch("http://localhost:3000/products", options)
      .then(response => {
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          // Mostrar error si la respuesta no es exitosa
          throw new Error("La solicitud no fue exitosa");
        }
        // Devolver la respuesta en formato JSON
        return response.json();
      })
      .then(data => {
        // Mostrar el producto agregado con un alerta
        alert("Producto anadido exitosamente");        
      })
      .catch(error => {
        // Mostrar el error en la consola
        console.error("Error al realizar la solicitud:", error);
      });
  });

  // Evento para el botón de limpiar
  btnClean.addEventListener('click', function (event) {
    // Prevenir el comportamiento de presentación de formulario predeterminado
    event.preventDefault()
    
    // Limpiar los valores de los campos del formulario
    nameProductForm.value = ''; // Limpiar el campo de nombre
    priceProductForm.value = ''; // Limpiar el campo de precio
    imgProductForm.value = ''; // Limpiar el campo de imagen
  });
}

addProducts();

export { addProducts };
