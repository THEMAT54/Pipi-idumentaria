// Función para mostrar confirmación antes de vaciar el carrito
document.addEventListener("DOMContentLoaded", () => {
    const vaciarBtn = document.getElementById("vaciar-carrito-btn");
    
    if (vaciarBtn) {
        vaciarBtn.addEventListener("click", () => {
            document.getElementById("confirmacion-vaciar").classList.remove("oculto");
        });
    }
});

// Función para confirmar o cancelar la eliminación del carrito
function confirmarVaciarCarrito(confirmado) {
    if (confirmado) {
        vaciarCarrito();
    }
    document.getElementById("confirmacion-vaciar").classList.add("oculto");
}

// Vaciar todo el carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarritoEnPagina();
    actualizarContadorCarrito();
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContadorCarrito();
}

// Vaciar todo el carrito (esto parece repetido, por lo que puedes eliminar la función duplicada si lo deseas)

// Cambiar la cantidad de un producto en el carrito
function cambiarCantidad(index, cambio) {
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Obtener el producto actual  
const producto = carrito[index];  

// Asegurarse de que la cantidad no sea menor que 1  
if (producto.cantidad + cambio <= 0) {  
    // Si la cantidad es 0 o negativa, eliminar el producto del carrito  
    carrito.splice(index, 1);  
} else {  
    // Si la cantidad es válida, actualizarla  
    producto.cantidad += cambio;  
}  

// Guardar los cambios en el localStorage  
localStorage.setItem("carrito", JSON.stringify(carrito));  

// Volver a mostrar el carrito y actualizar el contador  
mostrarCarritoEnPagina();  
actualizarContadorCarrito();

}

// Función para abrir detalles de un producto
function irADetalles(nombre, precio, imagen) {
    window.location.href = `producto.html?nombre=${encodeURIComponent(nombre)}&precio=${encodeURIComponent(precio)}&imagen=${encodeURIComponent(imagen)}`;
}

// Función para abrir la página de compra con la variante seleccionada
function irACompra(nombre, variante, imagen) {

if (!imagen) {  
    imagen = "img/default.jpg"; // Imagen por defecto en caso de error  
}  

sessionStorage.setItem("nombreProducto", nombre);  
sessionStorage.setItem("variacionSeleccionada", variante);  
sessionStorage.setItem("imagenProducto", imagen);  

window.location.href = "compra.html";

}

// Cargar información en producto.html
document.addEventListener("DOMContentLoaded", () => {
if (window.location.pathname.includes("producto.html")) {
const urlParams = new URLSearchParams(window.location.search);

// Obtener el nombre y la imagen desde la URL, asignar valores predeterminados si son null  
    const nombre = urlParams.get("nombre") || "Producto no disponible"; // Asigna un valor predeterminado  
    const imagen = urlParams.get("imagen") || "default.jpg"; // Asigna una imagen por defecto  

    // Verifica si los valores son válidos y no nulos antes de usarlos  
    document.getElementById("product-title").innerText = nombre;  
    document.getElementById("product-description").innerText = descripciones[nombre] || "Descripción no disponible.";  

    const container = document.getElementById("product-container");  

    const nombresVariaciones = {  
        "Remeras oversize": ["mistake🐍", "diseño negro fachero✌️", "Los angeles🫰", "Crow🐦", "look mom🥷"],  
        "Buzos Rústicos": ["28 bancargell🫂", "Money💸", "GTA🥷💯", "Cereza🍒", "Humanity🧔‍♂️", "The astronut🌘"],  
        "Baggys jeans": ["Calavera💀", "Encadenado⛓️", "Cruz claro✌️", "cruz oscuro🫰"],  
        "Bermudas mom baggys": ["Bermuda Mom Azul", "Bermuda Cargo Beige", "Bermuda Negra", "Bermuda Blanca"],  
        "Buzos frizados": ["Buzo Gris", "Buzo Azul", "Buzo Negro", "Buzo Rojo"],  
        "Gorras parchadas": ["Gorra Negra", "Gorra Blanca", "Gorra Azul", "Gorra Roja"],  
        "Shorcitos de basquet": ["Short Lakers", "Short Bulls", "Short Knicks", "Short Celtics"],  
        "Accesorios": ["Reloj Negro", "Reloj Plateado", "Lentes Negros", "Lentes Transparentes"],  
        "Short Malla": ["Malla Azul Estampada", "Malla Roja Estampada", "Malla Negra Lisa", "Malla Verde Lisa"],  
        "Outfits": ["Conjunto Negro", "Conjunto Blanco", "Conjunto Gris", "Conjunto Beige"]  
    };  

    const variaciones = nombresVariaciones[nombre] || ["Variante 1", "Variante 2"];  

    let html = variaciones  
.map((variante, index) => {  
    let imgSrc = `img/${nombre.toLowerCase().replace(/ /g, "-")}-${index + 1}.jpg`;    

    return `  
        <div class="product" onclick="irACompra('${nombre}', '${variante}', '${imgSrc}')">  
            <img src="${imgSrc}" alt="${variante}">  
            <p>${variante}</p>  
        </div>  
    `;  
})  
.join("");  

    container.innerHTML = html;  
}

});

// Cargar información en compra.html
document.addEventListener("DOMContentLoaded", () => {
if (window.location.pathname.includes("compra.html")) {
const nombre = sessionStorage.getItem("nombreProducto");
const variante = sessionStorage.getItem("variacionSeleccionada");
const imagen = sessionStorage.getItem("imagenProducto"); 

    if (!imagen) {  
      
        imagen = "img/default.jpg";  
    }  

    document.getElementById("compra-title").innerText = variante;  
    document.getElementById("compra-imagen").src = imagen;  
    document.getElementById("compra-descripcion").innerText = descripcionesVariantes[variante] || "Descripción no disponible.";  

    // Descripciones específicas de las variantes  
    const descripcionesVariantes = {  
        "Oversize Dragón": "Remera Oversize con diseño de dragón, tela premium y estampado duradero.",  
        "Oversize Maradona": "Remera Oversize con estampado exclusivo de Maradona.",  
        "Oversize Tigre": "Remera Oversize con diseño de tigre, estilo urbano.",  
        "Oversize León": "Remera Oversize con diseño de león, en varios colores.",  
        "Baggy Azul Oscuro": "Jean Baggy en azul oscuro, ideal para un look casual.",  
        "Baggy Celeste Desgastado": "Jean Baggy celeste con efecto desgastado.",  
    };  

    document.getElementById("compra-descripcion").innerText = descripcionesVariantes[variante] || "Descripción no disponible.";  

    // Limpiar los datos en sessionStorage después de usarlo  
    sessionStorage.removeItem("nombreProducto");  
    sessionStorage.removeItem("variacionSeleccionada");  
    sessionStorage.removeItem("imagenProducto");  
}

});

// Descripciones de los productos principales
const descripciones = {
"Remeras oversize": `Compra mínima 2 unidades (a elección)

2x $14.500 cada una Y ENVÍO GRATIS  
  
4x $10.999 cada una  
  
8x $10.500 cada una  
  
12x $9.500 cada una  
  
Talle único abarca M/L/XL/XXL`,  
  
"Buzos Rústicos": `Buzos finitos perfectos para primavera y verano | Envío gratis   

1 x $24000  

4 x $19500 cada uno  

8 x $16999 cada uno  

12 x $14000 cada uno  

Talle único  

76-80cm de largo x 58cm de ancho  

Abarca M/L/XL/XXL`,  

"Baggys jeans": `Jeans baggys Premium con diseño láser  

Talle 44 46 y 48  

Envíos gratis a todo el país  

Combínalo con una remera o buzo! Tela de alta calidad con diferentes lavados.`,

};

// Agregar productos al carrito
function agregarAlCarrito() {
const variante = sessionStorage.getItem("variacionSeleccionada");
const cantidad = document.getElementById("cantidad").value;
const imagen = sessionStorage.getItem("imagenProducto");  

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];  

carrito.push({ nombre: variante, cantidad: parseInt(cantidad), imagen: imagen });  

localStorage.setItem("carrito", JSON.stringify(carrito));  

alert("Producto agregado al carrito.");  
actualizarContadorCarrito();

}

// Mostrar el carrito en cualquier página
function mostrarCarrito() {
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoContainer = document.getElementById("carrito-container");

if (!carritoContainer) return;  

if (carrito.length === 0) {  
    carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";  
    return;  
}  

carritoContainer.innerHTML = "<h3>Carrito de Compras</h3>";  

carrito.forEach((producto, index) => {  
    carritoContainer.innerHTML += `  
        <p>${producto.nombre} - Cantidad: ${producto.cantidad}   
            <button onclick="eliminarDelCarrito(${index})">❌</button>  
        </p>  
    `;  
});  

carritoContainer.innerHTML += `<button onclick="vaciarCarrito()">Vaciar Carrito</button>`;

}

// Actualizar contador del carrito en el icono 🛒
function actualizarContadorCarrito() {
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cartCount = document.querySelector(".cart-count");

if (cartCount) {  
    cartCount.textContent = carrito.length;  
}

}

// Función para enviar carrito por WhatsApp
document.addEventListener("DOMContentLoaded", () => {
    const comprarBtn = document.querySelector(".comprar-btn");

    if (comprarBtn && window.location.pathname.includes("carrito.html")) {
        comprarBtn.addEventListener("click", () => {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            if (carrito.length === 0) {
                alert("El carrito está vacío.");
                return;
            }

            let mensaje = "Hola, quiero comprar los siguientes productos:%0A";
            carrito.forEach(producto => {
                mensaje += `• ${producto.nombre} x${producto.cantidad}%0A`;
            });

            // Número de WhatsApp (modificá si es otro)
            const numero = "5493541515860";
            const url = `https://wa.me/${numero}?text=${mensaje}`;

            window.open(url, "_blank");
        });
    }
});


// Cargar el contador del carrito cuando la página se carga
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

// Mostrar el carrito en carrito.html
document.addEventListener("DOMContentLoaded", () => {
if (window.location.pathname.includes("carrito.html")) {
mostrarCarritoEnPagina();
}
});

function volverAtras() {
window.history.back();
}

function mostrarCarritoEnPagina() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoLista = document.getElementById("carrito-lista");

    if (carrito.length === 0) {  
        carritoLista.innerHTML = "<p>El carrito está vacío.</p>";  
        return;  
    }  

    carritoLista.innerHTML = "";  

    carrito.forEach((producto, index) => {  
        let imagenSrc = producto.imagen ? producto.imagen : "img/default.jpg";  

        carritoLista.innerHTML += `  
            <div class="carrito-item">  
                <img src="${imagenSrc}" class="carrito-img" onclick="irACompra('${producto.nombre}', '${producto.nombre}', '${imagenSrc}')">  
                <p class="carrito-nombre" onclick="irACompra('${producto.nombre}', '${producto.nombre}', '${imagenSrc}')">${producto.nombre}</p>  
                <div class="carrito-cantidad">  
                    <button onclick="cambiarCantidad(${index}, -1)">−</button>  
                    <span id="cantidad-${index}">${producto.cantidad}</span>    
                    <button onclick="cambiarCantidad(${index}, 1)">+</button>  
                </div>  
            </div>  
        `;  
    });  
}
