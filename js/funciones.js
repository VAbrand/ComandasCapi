let total = 0;

document.getElementById('form-comanda').addEventListener('submit', function (e) {
  e.preventDefault();

  const producto = document.getElementById('producto').value;
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const salsa = document.getElementById('salsa').value;
  const extraSalsa = document.getElementById('extra-salsa').checked;

  const lista = document.getElementById('lista-comandas');

  const precioTexto = producto.match(/\$(\d+)/);
  const precio = precioTexto ? parseFloat(precioTexto[1]) : 0;
  let subtotal = precio * cantidad;

  let detalles = `${cantidad} × ${producto}`;
  if (producto.includes('Boneless') && salsa) {
    detalles += ` con salsa ${salsa}`;
  }
  if (extraSalsa) {
    subtotal += 10;
    detalles += ' + salsa extra';
  }

  total += subtotal;

  const item = document.createElement('li');
  item.className = 'list-group-item';
  item.textContent = `${detalles} — $${subtotal.toFixed(2)}`;
  lista.appendChild(item);

  this.reset();
});

function imprimirComandas() {
  const lista = document.getElementById('lista-comandas').innerHTML;
  if (!lista.trim()) {
    alert("No hay comandas para imprimir.");
    return;
  }

  const logoURL = 'img/logocapitan.png';
  const iva = total * 0.16;
  const totalConIVA = total + iva;

  const ventana = window.open('', '', 'width=400,height=600');
  ventana.document.write(`
    <html>
    <head>
      <title>Comanda - El Capi</title>
      <style>
        @media print {
          body {
            width: 80mm;
            margin: 0;
            padding: 5mm;
            font-family: Courier, monospace;
            font-size: 12pt;
            color: black;
            background: white;
          }
        }
        body {
          width: 80mm;
          margin: 0;
          padding: 5mm;
          font-family: Courier, monospace;
          font-size: 12pt;
          color: black;
          background: white;
        }
        img#logo {
          max-width: 60mm;
          margin-bottom: 10px;
          filter: grayscale(100%) contrast(200%);
        }
        hr {
          border: 0;
          border-top: 1px dashed black;
          margin: 10px 0;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          margin-bottom: 5px;
          border-bottom: 1px dotted #000;
          padding-bottom: 3px;
        }
      </style>
    </head>
    <body>
      <img id="logo" src="${logoURL}" alt="Logo El Capi" />
      <hr />
      <h2 style="text-align:center; font-weight: normal; margin-bottom: 15px;">Comanda El Capi</h2>
      <ul>${lista}</ul>
      <hr />
      <p style="text-align:right;">Subtotal: $${total.toFixed(2)}</p>
      <p style="text-align:right;">IVA (16%): $${iva.toFixed(2)}</p>
      <p style="text-align:right; font-weight: bold;">TOTAL: $${totalConIVA.toFixed(2)}</p>
      <hr />
      <p style="text-align:center; font-size: 10pt;">Gracias por su preferencia</p>
    </body>
    </html>
  `);
  ventana.document.close();
  ventana.focus();
  ventana.print();
  ventana.close();

  total = 0;
  document.getElementById('lista-comandas').innerHTML = "";
}

