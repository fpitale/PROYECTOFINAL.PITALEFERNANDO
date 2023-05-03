 document.addEventListener
                


   
    
 // Productos
 const baseDeDatos = [
     {
       
         id: 1,
         nombre: 'Marguerita',
         precio: 450,
         imagen: 'margarita.jpg', 
         descripcion: 'Todo un clásico entre las recetas más tradicionales que tiene la pizza. Su nombre original en italiano es Margheritta, como un homenaje, dice la leyenda, a la reina de Italia a finales del siglo XIX, Margarita de Saboya.'

     },
     {
         id: 2,
         nombre: 'Cuatro quesos ',
         precio: 500,
         imagen: '4quesos.jpg',
         descripcion: 'La pizza cuatro quesos, en italiano Pizza quattro formaggi es una variante de pizza con cuatro quesos italianos, que generalmente son la mozarela, el gorgonzola, el fontina y el parmesano. Todos estos quesos son fundibles. Se derriten sobre una base de salsa de tomate (rossa), o también hay recetas sin tomate (bianca). Es una de las variantes más icónicas en los menús de pizzerías de Italia y en todo el mundo.'
     },
     {
         id: 3,
         nombre: 'Napolitana ',
         precio: 350,
         imagen: 'napolitana.jpg',
         descripcion: 'Si queremos entender la importancia y el impacto que ha tenido la pizza alrededor del planeta entero, no podemos olvidar la pizza napolitana, declarada por la Unesco como Patrimonio Inmaterial de la Humanidad. '
     },
     {
         id: 4,
         nombre: 'Fugazza ',
         precio: 480,
         imagen: 'fugazza.jpg',
         descripcion: 'No podíamos hablar de pizzas populares por fuera de Italia y no mencionar un representante de América Latina. La fugazza tiene su origen en Argentina, donde tenemos una tradición gastronómica con una conexión especial con Italia. '
     }
 ];


let carrito = [];
            const divisa = '$';
            const DOMitems = document.querySelector('#items')
            const DOMcarrito = document.querySelector('#carrito')
            const DOMtotal = document.querySelector('#total')
            const DOMbotonVaciar = document.querySelector('#boton-vaciar')
            const miLocalStorage = window.localStorage

          
            function renderizarProductos() {
                fetch('https://jsonplaceholder.typicode.com/comments')
                    .then(response => response.json())
                    .then(comments => 
                        baseDeDatos.forEach((info, index) => {
                            // Usamos el índice de la pizza para seleccionar un comentario de la lista
                            const comentario = comments[index].body;
                            // Aquí podemos crear los nodos HTML de la pizza, y usar el comentario en alguna parte
                            // Estructura
                            const miNodo = document.createElement('div');
                            miNodo.classList.add('card', 'col-sm-4');
                            // Body
                            const miNodoCardBody = document.createElement('div');
                            miNodoCardBody.classList.add('card-body');
                            // Titulo
                            const miNodoTitle = document.createElement('h5');
                            miNodoTitle.classList.add('card-title');
                            miNodoTitle.textContent = info.nombre;
                            //descripcion del producto 
                            const miNodoDescripcion = document.createElement('p');
                            miNodoDescripcion.classList.add('card-description');
                            miNodoDescripcion.textContent = comentario; // Usamos el comentario aquí
                            // Imagen
                            const miNodoImagen = document.createElement('img');
                            miNodoImagen.classList.add('img-fluid');
                            miNodoImagen.setAttribute('src', info.imagen);
                            // Precio
                            const miNodoPrecio = document.createElement('p');
                            miNodoPrecio.classList.add('card-text');
                            miNodoPrecio.textContent = `${info.precio}${divisa}`;
                            // Boton 
                            const miNodoBoton = document.createElement('button');
                            miNodoBoton.classList.add('btn', 'btn-primary');
                            miNodoBoton.textContent = '+';
                            miNodoBoton.setAttribute('marcador', info.id);
                            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
                            // Insertamos
                            miNodoCardBody.appendChild(miNodoTitle)
                            miNodoCardBody.appendChild(miNodoDescripcion)
                            miNodoCardBody.appendChild(miNodoImagen)
                            miNodoCardBody.appendChild(miNodoPrecio)
                            miNodoCardBody.appendChild(miNodoBoton)
                            miNodo.appendChild(miNodoCardBody)
                            DOMitems.appendChild(miNodo);
                        })
                    )
            }
            



            /*
            Evento para añadir un producto al carrito de la compra
            */
            const anyadirProductoAlCarrito = (evento) => {
                // Anyadimos el Nodo a nuestro carrito
                carrito.push(evento.target.getAttribute('marcador'))
                // Actualizamos el carrito 
                renderizarCarrito()
                // Actualizamos el LocalStorage
                guardarCarritoEnLocalStorage()
                    }

          
            /**
            * Dibuja todos los productos guardados en el carrito
            */
            function renderizarCarrito() {
                // Vaciamos todo el html
                DOMcarrito.textContent = ''
                // Quitamos los duplicados
                const carritoSinDuplicados = [...new Set(carrito)]
                // Generamos los Nodos a partir de carrito
                carritoSinDuplicados.forEach((item) => {
                    // Obtenemos el item que necesitamos de la variable base de datos
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                        // ¿Coincide las id? Solo puede existir un caso
                        return itemBaseDatos.id === parseInt(item)
                    })
                    // Cuenta el número de veces que se repite el producto
                    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                        // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                        return itemId === item ? total += 1 : total
                    }, 0)
                    // Creamos el nodo del item del carrito
                    const miNodo = document.createElement('li')
                    miNodo.classList.add('list-group-item', 'text-right', 'mx-2')
                    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`
                    // Boton de borrar
                    const miBoton = document.createElement('button')
                    miBoton.classList.add('btn', 'btn-danger', 'mx-5')
                    miBoton.textContent = 'X'
                    miBoton.style.marginLeft = '1rem'
                    miBoton.dataset.item = item
                    miBoton.addEventListener('click', borrarItemCarrito)
                    // Mezclamos nodos
                    miNodo.appendChild(miBoton)
                    DOMcarrito.appendChild(miNodo)
                })
                // Renderizamos el precio total en el HTML
                DOMtotal.textContent = calcularTotal()
            }
             //boton de comprar
             const Comprar = document.getElementById("comprar")
             comprar.addEventListener("click", alerta)
             function alerta(){
                Swal.fire({
                    title: 'Quieres terminar su pedido?',
                    text: "Se desea finalizar su compra, click en ok",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ok!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire(
                        'Finalizar!',
                        'Compra realizada!',
                        'success'
                      )
                    }
                  })
             }


             /* Evento para borrar un elemento del carrito
            */

             function borrarItemCarrito(evento) {
                // Obtenemos el producto ID que hay en el boton pulsado
                const id = evento.target.dataset.item
                // Borramos todos los productos
                carrito = carrito.filter((carritoId) => {
                  return carritoId !== id
                })
                // volvemos a renderizar
                renderizarCarrito()
                // Actualizamos el LocalStorage
                guardarCarritoEnLocalStorage()
              }
              

            /**
             * Calcula el precio total teniendo en cuenta los productos repetidos
             */
            function calcularTotal() {
                // Recorremos el array del carrito 
                return carrito.reduce((total, item) => {
                    // De cada elemento obtenemos su precio
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                        return itemBaseDatos.id === parseInt(item)
                    })
                    // Los sumamos al total
                    return total + miItem[0].precio
                }, 0).toFixed(2)
            }

            /**
            * Varia el carrito y vuelve a dibujarlo
            */
            function vaciarCarrito() {
                // Limpiamos los productos guardados
                carrito = []
                // Renderizamos los cambios
                renderizarCarrito()
                // Borra LocalStorage
                localStorage.clear()

            }

            function guardarCarritoEnLocalStorage () {
                miLocalStorage.setItem('carrito', JSON.stringify(carrito))
            }

            function cargarCarritoDeLocalStorage () {
                // Existe un carrito previo guardado en LocalStorage
                if (miLocalStorage.getItem('carrito') !== null) {
                    // Carga la información
                    carrito = JSON.parse(miLocalStorage.getItem('carrito'))
                }
            }

            // Eventos
            DOMbotonVaciar.addEventListener('click', vaciarCarrito)

            // Inicio
            cargarCarritoDeLocalStorage()
            renderizarProductos()
            renderizarCarrito()
                  