/*----readme----*/
/*la idea de esta app es tener una boblioteca de los juegos que tiene el usuario para 
tener una mejor organizacion y saber que juegos estan disponibles con backend se puede agreagar un registro
y una base de datos para que cada usurio se pueda logear por ahora funciona con local storage.
Incluyo una pagina extra donde hago uso de una api para saber qeu juegos gratis 
hay al dia en las distintas plataformas.
Al final de la pagina hay unas lineas comentadas que serviran para llenar rapidamente los datos */



/**---------------esta es la clase del objeto juego------------- **/
class Juego {
    constructor(nombre, plataforma, art) {
        this.nombre = nombre;
        this.plataforma = plataforma;
        this.art = art;
    }    
}    


/* leyendo localstorage */
let juegos = JSON.parse(localStorage.getItem("arrayJuegos")) || [] 
let tempdb = JSON.stringify(juegos);
localStorage.setItem("arrayJuegos", tempdb);

juegosparseout = localStorage.getItem("arrayJuegos");
juegos = JSON.parse(juegosparseout); //parseo y asigno el local storage al array


const containerjuegos = document.querySelector(".container-juegos");

document.addEventListener('DOMContentLoaded', () => {
    menu_juegos();
})

//---------------------------------slideshow--------------------------------------------------

const slideshow = document.querySelector("#slideshow");

const carrusel = ["foto1", "foto2", "foto3", "foto4", "foto5", "foto6", "foto7", "foto8"];

for (let i = 0; i < carrusel.length; i +=1) {
    let image = new Image();
    image.src = "img/" + carrusel[i] + ".jpg"
    slideshow.appendChild(image);

}

slideshow.childNodes[0].setAttribute("class", "current");

let x=0; 

setInterval(function(){
    slideshow.childNodes[x % carrusel.length].setAttribute("class", "")
    slideshow.childNodes[(x+1) % carrusel.length].setAttribute("class", "current")

    x += 1;
}, 2500)


/*------------aqui las funciones----------------------------------------------------- */ 

/*------funcion que genera el menu con las cards------------ */
function menu_juegos(){
    clear_document();
    juegos.forEach(juego => {
        const divjuego = document.createElement("div");
        divjuego.classList.add("card");

        const imgjuego = document.createElement("img");
        imgjuego.src = juego.art;
        imgjuego.classList.add("imagen-juego");

        const nombrejuego = document.createElement("h4");
        nombrejuego.textContent = juego.nombre;

        const plataformajuego = document.createElement("h5");
        plataformajuego.textContent = juego.plataforma;

        const btnEliminar = document.createElement("button");//boton eliminar juego dentro de la card
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.textContent = "eliminar";
        btnEliminar.onclick = () => {
            id = juegos.indexOf(juego);
            eliminar_juego(id);
        }
        divjuego.appendChild(nombrejuego);
        divjuego.appendChild(imgjuego);
        divjuego.appendChild(plataformajuego);
        divjuego.appendChild(btnEliminar);
    
        containerjuegos.appendChild(divjuego);
    })
}
//funcion quue limpia el dom
function clear_document(){
    containerjuegos.innerHTML = ""; //esta funcion limpia el dom
}

//funcion para agregar juegos
function agreagar_juego(nombre_juego, plataforma, url_imagen) {
    juegos.push(new Juego(nombre_juego, plataforma, url_imagen ));
    guardarcambios();
    menu_juegos();
}

//funcion para eliminar juego, esta con swet alert para que se vea mejor
function eliminar_juego(posicion) {
    const id = posicion + 1 
    Swal.fire({
        title: "se eliminará este juego, estás seguro? \nposición: " + id,
        text: "no podrás deshacer esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borralo!'
      }).then((result) => {
        if (result.isConfirmed) {
            juegos.splice(posicion, 1)
            guardarcambios();
            menu_juegos();
            Swal.fire(
                "eliminado",
                'el juego ha sido borrado de la lista.',
                'success'
          )
        }
      })  
}
//funcion que guarda los cambios en el localstorage
function guardarcambios() {
    const juegosJSON = JSON.stringify(juegos);
    localStorage.setItem("arrayJuegos", juegosJSON);

}
//funcion de buscar

function capturar(){
    let nombre_juego_buscar=document.getElementById("autocomplete").value;
    indice_busqueda = titulos.indexOf(nombre_juego_buscar)
    if (indice_busqueda === -1) {
        alert("Juego no encontrado")
    } else {
        
        Swal.fire("el juego se encuentra en la posiscion " + (indice_busqueda + 1))
        
    }
}


/* guardando la lista de juegos en localstorage */

function guardarcambios() {   
    const juegosJSON = JSON.stringify(juegos);
    localStorage.setItem("arrayJuegos", juegosJSON);

    titulos = [];  
    juegos.forEach(juego => {
        titulos.push(juego.nombre) 
    });  
}


/* ----------------------AQUI LO QUE HACEN LOS BOTONES ---------------------------------- */


let buttonAdd = document.getElementById("buttonAdd");
let buttonpercent = document.getElementById("buttonpercent");

buttonAdd.addEventListener("click", function(){
    let nombre_juego = prompt("ingresa el nombre del juego");
    nombre_juego = nombre_juego.toUpperCase();
    
    if (nombre_juego != "") {
        let plataforma = prompt("ingresa la plataforma de tu juego");
        plataforma = plataforma.toUpperCase();
        if (plataforma !="") {
            let url_imagen =prompt("ingresa una URL de la caratula del juego");
            if (url_imagen !="") {
                agreagar_juego(nombre_juego, plataforma, url_imagen);
                guardarcambios();//aqui mando a la funcion que actualiza el localstorage
            } else {
                alert("ingresa una URL para la imagen");
            }          
        } else {
            alert("ingresa una plataforma");
        }      
    } else {
        alert("ingrese un nombre");
    }        
})


buttonpercent.addEventListener("click", function(){
    alert("el porcentaje de juegos de Playstation 4 es: " + Math.round((juegosps4.length / juegos.length)*100) + "%" + "\n" + 
          "el porcentaje de juegos de Nintendo Switch es: " + Math.round((juegosnintendo.length / juegos.length)*100) + "%" + "\n" +
          "el porcentaje de juegos de Steam es: " + Math.round((juegossteam.length / juegos.length)*100) + "%" + "\n" + 
          "el porcentaje de juegos de oculus es: " + Math.round((juegossteam.length / juegos.length)*100) + "%")
})


/*----------------------filtrado de datos por plataforma----------------------------- */
let juegosps4 = juegos.filter(juego => juego.plataforma == "PLAYSTATION 4");
let juegosnintendo = juegos.filter(juego => juego.plataforma == "NINTENDO SWITCH");
let juegossteam = juegos.filter(juego => juego.plataforma == "STEAM");
let juegosoculus = juegos.filter(juego => juego.plataforma == "OCULUS");

/*------------------Awesomplete----------------------------- */

    titulos = [];
    juegos.forEach(juego => {
        titulos.push(juego.nombre) 
    });
    
    var input = document.getElementById("autocomplete");
    new Awesomplete(input, {
        list: titulos
    });




/*---------------relleno el array con push.... dejo esto para hacer mas rapido entradas y que se vea como se llena el local storage------------------*/


// juegos.push(new Juego("SUPER MARIO ODYSSEY", "NINTENDO SWITCH", "https://m.media-amazon.com/images/I/81sS-oqpkLS._AC_SY500_.jpg"));
// juegos.push(new Juego("ANIMAL CROSSING: NEW HORIZONS", "NINTENDO SWITCH", "https://m.media-amazon.com/images/I/71EsARfsklS._AC_SY500_.jpg"));
// juegos.push(new Juego("STARLINK", "NINTENDO SWITCH", "https://cdn.awsli.com.br/800x800/1631/1631815/produto/62201707/a7e4173ea6.jpg"));
// juegos.push(new Juego("MONSTER HUNTER RISE", "NINTENDO SWITCH", "https://m.media-amazon.com/images/I/814mH7g4wdL._AC_SL1500_.jpg"));
// juegos.push(new Juego("SUPER MARIO PARTY", "NINTENDO SWITCH", "https://m.media-amazon.com/images/I/81qGjOM5i9S._AC_SY500_.jpg"));
// juegos.push(new Juego("SUPER MARIO 3D ALLSTARS", "NINTENDO SWITCH", "https://m.media-amazon.com/images/I/71TU0o8tAwS._AC_SL1125_.jpg" ))
// juegos.push(new Juego("FINAL FANTASY VII REMAKE", "PLAYSTATION 4", "https://m.media-amazon.com/images/I/61F14y0nXAS._AC_SL1000_.jpg" ))
// juegos.push(new Juego("GOD OF WAR 4", "PLAYSTATION 4", "https://http2.mlstatic.com/D_NQ_NP_770753-MLM47957258519_102021-O.webp" ))
// juegos.push(new Juego("SPIDERMAN", "PLAYSTATION 4", "https://http2.mlstatic.com/D_NQ_NP_643458-MLA43439934747_092020-O.webp" ))
// juegos.push(new Juego("DON'T STARVE TOGETHER ", "STEAM", "https://images.igdb.com/igdb/image/upload/t_cover_big/co1yg3.jpg" ))
// juegos.push(new Juego("HALF-LIFE ALYX", "OCULUS", "https://www.cnet.com/a/img/resize/f5a9d3cbeab6b92f89fab11ac96877b3e6d4e78f/hub/2019/11/21/19db7c73-c881-4bd4-bf96-8c2174feff67/box-art-flat.png?auto=webp&width=1092" ))
// juegos.push(new Juego("FINAL FANTASY VII REMAKE", "PLAYSTATION 4", "https://m.media-amazon.com/images/I/61F14y0nXAS._AC_SL1000_.jpg" ))



