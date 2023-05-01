document.addEventListener("DOMContentLoaded", getCompras);

async function getCompras() {
  let url = "../storage/api.json";
  try {
    let result = await fetch(url);
    let data = await result.json();
    console.log(data.Data);
    showCompras(data.Data);
  } catch (error) {
    console.log(error);
  }
}

export function showCompras(buys) {
  let cont = document.querySelector("#compras");
  let plantilla = "";
  buys.forEach((buy) => {
    let { CoinInfo, RAW } = buy;
    plantilla += `
      <option class="moneda" value="${RAW.USD.PRICE}">${CoinInfo.FullName}</option>
    `;
    cont.innerHTML = plantilla;
  });

  let valorTotal = 0;
  let datos = [];
  let listaVentas = [];

  cont.addEventListener(`input`, showPrice);
  let almac = document.querySelector(".btnSub");
  almac.addEventListener("click", almacenar);

  function showPrice() {
    let pagos = document.querySelector("#pagos");
    valorTotal = parseFloat(cont.value);
    let valor = "";
    valor += `<p>Precio: $${valorTotal}<p>`;
    pagos.innerHTML = valor;
  }
  function almacenar(event) {
    let pregunta = confirm("¿Estás seguro/a de querer comprar?");
    if (pregunta == true) {
      alert("Comprado uwuwuwuw");
      si();
    } else {
      alert("Compra cancelada");
    }
    function si() {
        let cripto = document.getElementById("compras").value;
        let listaDatos = document.getElementById("listaDatos");
        let resultado = document.getElementById("resultado");
      
        if (cripto == "") {
          resultado.innerHTML = "Debes seleccionar una criptomoneda.";
          return;
        }
      
        // Actualizar la lista de datos
        listaDatos.innerHTML += "<li>"  + valorTotal +   "</li>";
      
        // Actualizar el resultado total
        let total = 0;
        let items = listaDatos.querySelectorAll("li");
        for (let i = 0; i < items.length; i++) {
          let itemText = items[i].innerText;
          let itemPrice = parseFloat(itemText.substring(itemText.indexOf(":") ));
          total += itemPrice;
        }
        datos.push(valorTotal)
        console.log(datos)
        resultado.innerHTML = "Total pagado: " + total;
        let totalCompras = datos.reduce((acc, curr) => acc + curr, 0);
        let totalComprasSpan = listaDatos.querySelector("span");
        if (!totalComprasSpan) {
          totalComprasSpan = document.createElement("span");
          listaDatos.appendChild(totalComprasSpan);
        }
        totalComprasSpan.innerHTML = "Total de dinero($) invertido: " + totalCompras;

      }
      
      function restarValor() {
        let cantidad = parseFloat(document.getElementById("resta").value);
        let listaDatos2 = document.getElementById("listaDatos2");
        let resultado = document.getElementById("resultado");
      
        // Validar que la cantidad ingresada sea mayor a cero
        if (cantidad <= 0) {
          resultado.innerHTML = "La cantidad a vender debe ser mayor a cero.";
          return;
        }
      
        // Actualizar la lista de datos
        listaVentas.push(cantidad);
        listaDatos2.innerHTML += "<li>" + cantidad + "</li>";
      
        // Calcular la suma de los valores de listaVentas
        let totalVentas = listaVentas.reduce((acc, curr) => acc + curr, 0);
      
        // Actualizar el resultado total
        let total = parseFloat(resultado.innerText.substring(resultado.innerText.indexOf(":") + 1));
        total -= cantidad;
        resultado.innerHTML = "Total pagado (Descontando ventas): " + total;
      
        // Actualizar el contenido del span con la suma de los valores
        let totalVentasSpan = listaDatos2.querySelector("span");
        if (!totalVentasSpan) {
          totalVentasSpan = document.createElement("span");
          listaDatos2.appendChild(totalVentasSpan);
        }
        totalVentasSpan.innerHTML = " Total de dinero($) ganado por ventas: " + totalVentas;
      }
      
      let restaBtn = document.querySelector("#btn-resta");
      restaBtn.addEventListener("click", restarValor);
      
      
    }

}
