// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear(); // Año actual
const min = max -10

// Generar un objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos); // muestra los automóviles al cargar

    llenarSelect();// Llena las opciones de años en el select
});

// Event listener para los select de búsqueda
marca.addEventListener('change', (e) => {
    let marcaValue = e.target.value;
    datosBusqueda.marca = marcaValue;

   filtrarAuto(); // Función de alto nivel para filtrar la búsqueda
})

year.addEventListener('change', (e) => {
    let yearValue = parseInt(e.target.value);
    datosBusqueda.year = yearValue;
    
   filtrarAuto(); // Función de alto nivel para filtrar la búsqueda
})

minimo.addEventListener('change', (e) => {
    let minimoValue = e.target.value;
    datosBusqueda.minimo = minimoValue;
    
   filtrarAuto(); // Función de alto nivel para filtrar la búsqueda
})

maximo.addEventListener('change', (e) => {
    let maximoValue = e.target.value;
    datosBusqueda.maximo = maximoValue;

   filtrarAuto(); // Función de alto nivel para filtrar la búsqueda
})

puertas.addEventListener('change', (e) => {
    let puertasValue = parseInt(e.target.value);
    datosBusqueda.puertas = puertasValue;

   filtrarAuto(); // Función de alto nivel para filtrar la búsqueda
})

transmision.addEventListener('change', (e) => {
    let transmisionValue = e.target.value;
    datosBusqueda.transmision = transmisionValue;

   filtrarAuto(); // Función de alto nivel para filtrar la búsqueda
})

color.addEventListener('change', (e) => {
    let colorValue = e.target.value;
    datosBusqueda.color = colorValue;

   filtrarAuto(); // Función de alto nivel para filtrar la búsqueda
})

// Funciones
function mostrarAutos(autos) {
    limpiarHTML(); // Elimina el HTML previo
    autos.forEach( auto => { // iteramos el array de Autos
        const autoHTML = document.createElement('P');

        const { marca, modelo, year, puertas, transmision, precio, color } = auto; // Destructuring -Precio ${precio} - Color: ${color}
        autoHTML.textContent = `
            ${marca} ${modelo} - 
            ${year} - 
            ${puertas} Puertas - 
            Transmision: ${transmision} - 
            Precio ${precio} - 
            Color: ${color}
        `;

        resultado.appendChild(autoHTML); // Insertar la info en el html con appendChild
    });
}

// Limpiar HTML de forma rápida para la búsqueda
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

// Genera los años del Select
function llenarSelect() {
    // iteramos los años del año actual hacia atrás 
    for (let i = max; i > min; i--) {
        const opcion = document.createElement('option') // Creamos el option del Select
        opcion.value = i; // Genera el valor del option
        opcion.textContent = i; // Genera el el texto del año
        year.appendChild(opcion) // Agrega las opciones de año al select
    }
}

// Funcion de alto nivel que filtra en base a la búsqueda
function filtrarAuto() {  // Encadenamiento
    const resultado = autos
    .filter( filtrarMarca )
    .filter( filtrarYear )
    .filter( filtrarMinimo )
    .filter( filtrarMaximo )
    .filter( filtrarPuertas )
    .filter( filtrarTransmision )
    .filter( filtrarColor ); 

    console.log(resultado);

    if (resultado != '') {
        mostrarAutos(resultado);
    }
    else {
        noResultado();
    }
    // mostrarAutos(resultado);

}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda; // Destructuring datosBusqueda.marca
    if(marca){ // si hay un valor en la búsqueda filtro los que tienen esa marca
        return auto.marca === marca;
    }
    return auto; // si no retorno todo el listado
}

function filtrarYear(auto) {
    const { year } = datosBusqueda; // Destructuring datosBusqueda.year    
    if(year){ // si hay un valor en la búsqueda filtro los que tienen ese año
        // return auto.year === parseInt(year); // Se puede hacer de esta manera o desde que escuchamos el evento change en el addEventListener
        return auto.year === year;
    }
    return auto; // si no retorno todo el listado
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda; // Destructuring datosBusqueda.minimo    
    if(minimo){ // trae en la búsqueda filtro el valor mínimo
        return auto.precio >= minimo;
    }
    return auto; // si no retorno todo el listado
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda; // Destructuring datosBusqueda.maximo    
    if(maximo){ // si hay un valor en la búsqueda filtro trae el valor máximo
        return auto.precio <= maximo;
    }
    return auto; // si no retorno todo el listado
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda; // Destructuring datosBusqueda.puertas    
    if(puertas){ // si hay un valor en la búsqueda filtro trae los que tienen ese puertas
        return auto.puertas === puertas;
    }
    return auto; // si no retorno todo el listado
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda; // Destructuring datosBusqueda.transmision    
    if(transmision){ // si hay un valor en la búsqueda filtro trae los que tienen ese transmision
        return auto.transmision === transmision;
    }
    return auto; // si no retorno todo el listado
}

function filtrarColor(auto) {
    const { color } = datosBusqueda; // Destructuring datosBusqueda.color    
    if(color){ // si hay un valor en la búsqueda filtro trae los que tienen ese color
        // return auto.puertas === parseInt(puertas); // Se puede hacer de esta manera o desde que escuchamos el evento change en el addEventLis
        return auto.color === color;
    }
    return auto; // si no retorno todo el listado
}

function noResultado() {
    limpiarHTML();

    // Generamos el mensaje de alerta donde no hay resultados
    const alerta = document.createElement('DIV');
    alerta.classList.add('alert', 'error', 'alert-no-resultado');
    alerta.textContent = 'Lo sentimos, no encontramos nada en tu búsqueda. Vuelve a intentarlo.'
    resultado.appendChild(alerta)
}