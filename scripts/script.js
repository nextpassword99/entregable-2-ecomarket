document.addEventListener("DOMContentLoaded", function () {
  const todosProductos = document.querySelectorAll("._producto");
  const carritoContador = document.querySelector("#carrito");
  const modal = document.querySelector("#modal_carrito");

  let productosComprar = [];

  carritoContador.addEventListener("click", function () {
    if (productosComprar.length > 0) {
      modal.classList.toggle("d-flex");
      renderProductosComprados(); 
    }
  });

  todosProductos.forEach((producto) => {
    producto.querySelector("button").addEventListener("click", () => {
      const nombreProducto = producto.querySelector("h5").textContent.trim();
      const buttonComprado = producto.querySelector("button");
      const imagen = producto.querySelector("img").src;
      if (!productosComprar.map((p) => p.nombre).includes(nombreProducto)) {
        agregarAlCarrito(nombreProducto, imagen);
        buttonComprado.textContent = "Quitar del carrito";
        buttonComprado.classList.add("btn-danger");
      } else {
        quitarDelCarrito(nombreProducto);
        buttonComprado.textContent = "Agregar al carrito";
        buttonComprado.classList.remove("btn-danger");
      }
      incrementarContador();
    });
  });

  function incrementarContador() {
    carritoContador.textContent = productosComprar.length;
  }

  function agregarAlCarrito(nombreProducto, imagen) {
    productosComprar.push({
      nombre: nombreProducto,
      imagen: imagen,
    });
    console.log(productosComprar);
    // console.log("click");
  }

  function quitarDelCarrito(nombreProducto) {
    for (let index = 0; index < productosComprar.length; index++) {
      if (productosComprar[index].nombre === nombreProducto) {
        console.log("quitar");

        productosComprar.splice(index, 1);
      }
    }
  }

  function renderProductosComprados() {
    modal.querySelector("ul").innerHTML = "";

    for (let i = 0; i < productosComprar.length; i++) {
      const li = document.createElement("li");
      const div = document.createElement("div");
      const img = document.createElement("img");

      li.style = "display: flex; gap: 2rem; margin-bottom: 1rem;";

      img.src = productosComprar[i].imagen;
      img.style = "max-width: 8rem;";
      div.style = "box-shadow: 2px 2px 16px 0px #00000029; border-radius: 10px; overflow: hidden";
      div.appendChild(img);
      li.appendChild(div);

      // Parte 2
      const div2 = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = productosComprar[i].nombre;
      span.style = "font-size: 20px; font-weight: 700;";

      const input = document.createElement("input");
      input.type = "number";
      input.min = 1;
      input.value = 1;
      input.style = "width: 5rem";
      input.classList.add("form-control");
      div2.appendChild(span);
      div2.appendChild(input);
      li.appendChild(div2);

      modal.querySelector("ul").appendChild(li);
    }
  }
});
