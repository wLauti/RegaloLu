const impuesto = 1.75

const apiUrl = 'https://dolarapi.com/v1/dolares/blue';

let usdv = 0;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    return response.json();
  })
  .then(data => {
    usdv = data.venta;
    const fechaOriginal = data.fechaActualizacion;
    const fechaFormateada = formatearFecha(fechaOriginal); 
    document.getElementById("fecha").textContent = `${fechaFormateada}`;
    console.log('Valor del dólar blue:', usdv);
  })
  .catch(error => {
    console.error('Error al obtener el valor del dólar blue:', error);
  });

const inputdolares = document.getElementById("valor_dolares");
const inputpesos = document.getElementById("valor_pesos");

inputdolares.addEventListener('input', () => {
  let usd = parseFloat(inputdolares.value) || 0; 
  let ars = usd * usdv * impuesto;
  inputpesos.value = ars.toFixed(4);
});

inputpesos.addEventListener('input', () => {
  let ars = parseFloat(inputpesos.value) || 0;
  let usd = ars / (usdv * impuesto);
  inputdolares.value = usd.toFixed(4); 
});

function formatearFecha(fechaISO) {
  const año = fechaISO.slice(0, fechaISO.indexOf('-')); 
  const mes = fechaISO.slice(fechaISO.indexOf('-') + 1, fechaISO.indexOf('-', fechaISO.indexOf('-') + 1));
  const dia = fechaISO.slice(fechaISO.indexOf('T') - 2, fechaISO.indexOf('T')); 
  const hora = fechaISO.slice(fechaISO.indexOf('T') + 1, fechaISO.indexOf(':'));
  const minutos = fechaISO.slice(fechaISO.indexOf(':') + 1, fechaISO.indexOf(':', fechaISO.indexOf(':') + 1)); 

  return `${dia}/${mes}/${año} a las ${hora}:${minutos}`;
}
