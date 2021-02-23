//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulos = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso apretando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarrito.addEventListener('click', () => {
        articulos = []; //reseteamos el arreglo

        limpiarHTML(); //Eliminamos todo el HTML
    });
}


//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo articulos por el id
        articulos = articulos.filter(curso => curso.id !== cursoId);

        carritoHTML(); // Iteramos sobre el carrito y mostramos el HTML
    }
}

//Leer el contenido del HTML al que le dimos click y extrae la info del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src, 
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisar si el elemento ya existe
    const existe = articulos.some(curso => curso.id === infoCurso.id);
    if(existe) {
        //Actualizamos cantidad
        const cursos = articulos.map(curso => {
            if( curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no son duplicados
            }
        });
        articulos = [...cursos];
    } else {
        //Agregar elementos al carrito
        articulos = [...articulos, infoCurso];
    }

    

    carritoHTML();
}

//Mostrar el carrito en el html 
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el html
    articulos.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src= "${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href:"#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;
        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Eliminar los cursos del tbody
function limpiarHTML() {
    //Forma lenta de eliminar html
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}