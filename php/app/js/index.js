// Validacion de formulario Código
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const bodegaSelect = document.getElementById("bodega");
  const sucursalSelect = document.getElementById("sucursal");
  const monedaSelect = document.getElementById("moneda");

  // Cargar bodegas dinámicamente desde el archivo PHP
  fetch("../product/cargar_bodegas.php")
    .then((response) => response.json()) // Parseamos la respuesta como JSON
    .then((bodegas) => {
      // Limpiamos las opciones previas del select
      bodegaSelect.innerHTML = '<option value="" disabled selected></option>';

      // Agregamos las bodegas al select
      bodegas.forEach((bodega) => {
        const option = document.createElement("option");
        option.value = bodega.id; // Usamos el ID de la bodega como valor
        option.textContent = bodega.nombre; // El nombre de la bodega como texto visible
        bodegaSelect.appendChild(option); // Añadimos la opción al select
      });
    })
    .catch((error) => {
      console.error("Error al cargar las bodegas:", error);
    });

  // Cargar dinámicamente las sucursales al seleccionar una bodega
  bodegaSelect.addEventListener("change", function () {
    const bodegaId = bodegaSelect.value;

    if (bodegaId) {
      fetch(`../product/cargar_sucursales.php?bodega_id=${bodegaId}`)
        .then((response) => response.json())
        .then((sucursales) => {
          // Limpiar el select de sucursales
          sucursalSelect.innerHTML =
            '<option value="" disabled selected></option>';

          // Insertar nuevas sucursales
          sucursales.forEach((sucursal) => {
            const option = document.createElement("option");
            option.value = sucursal.id;
            option.textContent = sucursal.nombre;
            sucursalSelect.appendChild(option);
          });
        })
        .catch((error) => {
          console.error("Error al cargar las sucursales:", error);
        });
    } else {
      // Si no hay bodega seleccionada, limpiar sucursales
      sucursalSelect.innerHTML = '<option value="" disabled selected></option>';
    }
  });

  // Cargar monedas dinámicamente desde el archivo PHP
  fetch("../product/cargar_monedas.php")
    .then((response) => response.json()) // Parseamos la respuesta como JSON
    .then((monedas) => {
      // Limpiamos las opciones previas del select
      monedaSelect.innerHTML = '<option value="" disabled selected></option>';

      // Agregamos las monedas al select
      monedas.forEach((moneda) => {
        const option = document.createElement("option");
        option.value = moneda.id; // Usamos el ID de la moneda como valor
        option.textContent = moneda.nombre; // El nombre de la moneda como texto visible
        monedaSelect.appendChild(option); // Añadimos la opción al select
      });
    })
    .catch((error) => {
      console.error("Error al cargar las monedas:", error);
    });

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Detenemos el envío del formulario para validarlo completamente primero

    // Obtener valores
    const codigo = document.getElementById("txtCodigo").value.trim();
    const nombre = document.getElementById("txtNombre").value.trim();
    const bodega = document.getElementById("bodega").value;
    const sucursal = document.getElementById("sucursal").value;
    const moneda = document.getElementById("moneda").value;
    const precio = document.getElementById("txtPrecio").value.trim();
    const regexPrecio = /^\d+(\.\d{1,2})?$/;
    const materialesSeleccionados = document.querySelectorAll(
      'input[name="material"]:checked'
    );
    const descripcion = document.getElementById("txtDescripcion").value.trim();

    // VALIDACIÓN: Código del Producto
    const regexFormato = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,15}$/;

    // Validación: obligatorio
    if (codigo === "") {
      alert("El código del producto no puede estar en blanco.");
      document.getElementById("txtCodigo").focus();
      return;
    }

    // Validación: longitud
    if (codigo.length < 5 || codigo.length > 15) {
      alert("El código del producto debe tener entre 5 y 15 caracteres.");
      document.getElementById("txtCodigo").focus();
      return;
    }

    // Validación: formato (letras y números, solo alfanumérico)
    if (!regexFormato.test(codigo)) {
      alert("El código del producto debe contener letras y números.");
      document.getElementById("txtCodigo").focus();
      return;
    }

    // VALIDACIÓN: Unicidad del código (realizamos una consulta al servidor)
    fetch(`../product/validar_codigo.php?codigo=${encodeURIComponent(codigo)}`)
      .then((response) => response.json()) // Recibimos la respuesta en formato JSON
      .then((data) => {
        if (data.exists) {
          alert("El código del producto ya está registrado.");
          document.getElementById("txtCodigo").focus();
          return; // Detenemos el flujo si el código ya existe
        }

        // Si el código es único, proceder con las siguientes validaciones
        realizarValidacionesSiguientes();
      })
      .catch((error) => {
        console.error("Error al verificar el código:", error);
        alert("Hubo un error al verificar el código. Intente nuevamente.");
      });

    // Función para realizar las siguientes validaciones si el código es único
    function realizarValidacionesSiguientes() {
      // === Validación Nombre del Producto ===
      if (nombre === "") {
        alert("El nombre del producto no puede estar en blanco.");
        document.getElementById("txtNombre").focus();
        return;
      }

      if (nombre.length < 2 || nombre.length > 50) {
        alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
        document.getElementById("txtNombre").focus();
        return;
      }

      // === Validación bodega ===
      if (bodega == "") {
        alert("Debe seleccionar una bodega.");
        document.getElementById("bodega").focus();
        return;
      }

      // === Validación sucursal ===
      if (sucursal == "") {
        alert("Debe seleccionar una sucursal.");
        document.getElementById("sucursal").focus();
        return;
      }

      // === Validación moneda ===
      if (moneda == "") {
        alert("Debe seleccionar una moneda.");
        document.getElementById("moneda").focus();
        return;
      }

      // === Validación Precio ===
      if (precio === "") {
        alert("El precio del producto no puede estar en blanco.");
        document.getElementById("txtPrecio").focus();
        return;
      }

      if (!regexPrecio.test(precio)) {
        alert(
          "El precio del producto debe ser un número positivo con hasta dos decimales."
        );
        document.getElementById("txtPrecio").focus();
        return;
      }

      // VALIDACIÓN: Materiales (mínimo 2 seleccionados)
      if (materialesSeleccionados.length < 2) {
        alert("Debe seleccionar al menos 2 materiales.");
        return;
      }

      // === Validación Descripción ===
      if (descripcion === "") {
        alert("La descripción del producto no puede estar en blanco.");
        document.getElementById("txtDescripcion").focus();
        return;
      }

      if (descripcion.length < 10 || descripcion.length > 1000) {
        alert(
          "La descripción del producto debe tener entre 10 y 1000 caracteres."
        );
        document.getElementById("txtDescripcion").focus();
        return;
      }

      const data = {
        codigo: document.getElementById("txtCodigo").value.trim(),
        nombre: document.getElementById("txtNombre").value.trim(),
        precio: document.getElementById("txtPrecio").value.trim(),
        descripcion: document.getElementById("txtDescripcion").value.trim(),
        bodega_id: document.getElementById("bodega").value,
        sucursal_id: document.getElementById("sucursal").value,
        moneda_id: document.getElementById("moneda").value,
      };

      fetch("../product/insert_producto.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            alert("Producto guardado con éxito. ID: " + response.id);
            form.reset();
          } else {
            console.log(response);

            alert("Error: " + response.message);
          }
        })
        .catch((err) => {
          console.error("Error en la solicitud:", err);
          alert("Ocurrió un error al guardar el producto.");
        });
    }
  });
});
