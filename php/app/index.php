<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formulario de Producto</title>
    <link rel="stylesheet" href="./css/styles.css" />
  </head>
  <body>
    <div class="form-container">
      <h2>Formulario de Producto</h2>
      <form id="formulario">
        <div class="form-group">
          <div style="flex: 1">
            <label for="codigo">Código</label>
            <input type="text" id="txtCodigo" name="txtCodigo" class="form-control"/>
          </div>
          <div style="flex: 1">
            <label for="nombre">Nombre</label>
            <input type="text" id="txtNombre" name="txtNombre" class="form-control"/>
          </div>
        </div>

        <div class="form-group">
          <div style="flex: 1">
            <label for="bodega">Bodega</label>
            <select id="bodega" name="bodega" class="form-control">
              <option value="" disabled selected> </option>
            </select>
          </div>
          <div style="flex: 1">
            <label for="sucursal">Sucursal</label>
            <select id="sucursal" name="sucursal" class="form-control">
              <option value="" disabled selected> </option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <div style="flex: 1">
            <label for="moneda">Moneda</label>
            <select id="moneda" name="moneda" class="form-control">
              <option value="" disabled selected> </option>
            </select>
          </div>
          <div style="flex: 1">
            <label for="txtPrecio">Precio</label>
            <input type="text" id="txtPrecio" name="txtPrecio" title="Debe ser un número positivo con hasta dos decimales."
            />
          </div>
        </div>

        <label>Material del Producto</label>
        <div class="checkbox-group">
          <label><input type="checkbox" name="material" value="plastico" /> Plástico</label>
          <label><input type="checkbox" name="material" value="metal" /> Metal</label>
          <label><input type="checkbox" name="material" value="madera" /> Madera</label>
          <label><input type="checkbox" name="material" value="vidrio" /> Vidrio</label>
          <label><input type="checkbox" name="material" value="textil" /> Textil</label>
        </div>

        <label for="txtDescripcion">Descripción</label>
        <textarea id="txtDescripcion" name="txtDescripcion"></textarea>
        <button type="submit" class="btn-submit">Guardar Producto</button>
      </form>
      <!-- Vinculación del archivo JS -->
      <script src="./js/index.js"></script>
    </div>
  </body>
</html>
