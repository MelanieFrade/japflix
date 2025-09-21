// Traigo las peliculas sin mostrarlas
let peliculas = [];
let URL = "https://japceibal.github.io/japflix_api/movies-data.json";

fetch(URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Hubo un error!");
    }
    return response.json();
  })
  .then((infoPelicula) => {
    peliculas = infoPelicula;
    console.log(peliculas);
  })
  .catch((error) => {
    contenedorProducto.innerHTML = `<div class="alert alert-danger" role="alert">Error al cargar los productos: ${error.message}</div>`;
  });

document.getElementById("btnBuscar").addEventListener("click", () => {
  // tomo el dato ingresado en el buscador
  let input = document.getElementById("inputBuscar").value.toLowerCase();
  // evita que busque vacio
  if (input.trim() === "") return;

  // filtro peliculas según lo ingresado al buscador
  let respuestas = peliculas.filter((pelicula) => {
    return (
      pelicula.title.toLowerCase().includes(input) ||
      pelicula.tagline.toLowerCase().includes(input) ||
      pelicula.overview.toLowerCase().includes(input) ||
      pelicula.genres.some((genero) =>
        genero.name.toLowerCase().includes(input)
      )
    );
  });

  // muestra los resultados obtenidos
  let listaPeliculas = document.getElementById("lista");
  listaPeliculas.innerHTML = "";

  respuestas.forEach((pelicula) => {
    let li = document.createElement("li");
    li.className = "list-group-item";
    
    // MUESTRODATOS EN EL LISTADO
    li.innerHTML = `
      <h5>${pelicula.title}</h5>
      <p><em>${pelicula.tagline}</em></p>
      <p>${"⭐".repeat(Math.round(pelicula.vote_average))}</p>  
    `;

    // MUESTRO DATOS EN LA CARD
    li.addEventListener("click", () => {
      // Inserto los datos de la película en el modal
      // title
      document.getElementById("detalleTitulo").textContent = pelicula.title;
      // overview
      document.getElementById("detalleDescripcion").textContent =
      pelicula.overview;
      /* MOSTRAR LISTADO DE GÉNEROS */
      document.getElementById("detalleGenero").textContent =
      pelicula.genres.map((genero) => genero.name).join(", ");  
      
      // Abro el modal con Bootstrap
      let modal = new bootstrap.Modal(
        document.getElementById("detallePeliculaModal")
      );
      modal.show();
    });

    // MUESTRO DATOS BOTON "MÁS"
    document.getElementById("dd-mas").addEventListener("click",()=>{
      document.getElementById("dd-year").textContent = pelicula.release_date.substring(0,4); /* MOSTRAR SOLO AÑO */
      document.getElementById("dd-runtime").textContent = pelicula.runtime;
      document.getElementById("dd-budget").textContent = pelicula.budget;
      document.getElementById("dd-revenue").textContent = pelicula.revenue;
    })

    listaPeliculas.appendChild(li);
  });
});
