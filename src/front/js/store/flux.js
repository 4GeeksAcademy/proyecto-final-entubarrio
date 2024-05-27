const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			tiendas: [],
			productos: [],
			tienda: [],
			productosSeleccionados:[],
			productosTienda:[],
			categoriasProductos:[],categoriasTiendas:[],
			producto:[],
			tipo_usuario:"",
			productosFavoritos:[],
			tiendasFavoritas:[]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			login: async (email, password, tipo_usuario, navigate) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password,
							tipo_usuario: tipo_usuario
						})
					})
					console.log(response);
					if (!response.ok) {
						const errorData = await response.json()
						console.log(errorData);
						throw new Error(errorData.msg)
					}
					let data = await response.json()
					console.log(data);
					if (data) {
						localStorage.setItem("token", data.access_token);
						localStorage.setItem("tipo_usuario", tipo_usuario);

						// Verificar si vendedor tiene una tienda
						if (tipo_usuario === "vendedor" && data.vendedor.tiendas) {
							setStore({ tipo_usuario: tipo_usuario })
							navigate("/vendedor") // Navigate a perfil vendedor
						} else if (tipo_usuario === "vendedor") {
							// Es Vendedor pero no tiene tienda - navigate a pagina crear tienda
							navigate("/creartienda")
						} else {
							// si es usuario Particular - navigate a home por ahora)
							navigate("/")
						}
					} else {
						console.log(data);
						return false;
					}
				} catch (error) {
					console.log(error.message);
					return error.message;
				}
			},

			createUser: async (email, password, tipo_usuario, navigate) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password,
							tipo_usuario: tipo_usuario
						})
					})
					if (!response.ok) {
						const errorData = await response.json()
						console.log(errorData);
						throw new Error(errorData.msg)
					}
					let data = await response.json()
					if (data) {
						console.log(data);
						navigate("/login")
						return true;
					} else {
						console.log(data);
						return false
					}
				} catch (error) {
					console.log(error.message);
					return error.message;
				}

			},

			logout: () => {
				localStorage.removeItem("token")
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			//LINEAS RESERVADAS ALVARO
			getAllVendedores: async () => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/vendedores", {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						},
					})
					let data = await response.json()
					if (response.status === 200) {
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						setStore({ vendedores: data.result })
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			getTiendas: async () => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/tiendas", {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						},
					})
					let data = await response.json()
					if (response.status === 200) {
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						setStore({ tiendas: data.result })
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			getProductos: async () => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/productos", {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						},
					})
					let data = await response.json()
					if (response.status === 200) {
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						setStore({ productos: data.results })
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			crearNuevoProducto: async (nombreProducto, descripcionProducto, categoriaProducto, precio, urlImagenProducto, token) => {
				try {
					console.log("Datos del producto a enviar:", {
						nombre_producto: nombreProducto,
						descripcion_producto: descripcionProducto,
						categoria_producto: categoriaProducto,
						precio: precio,
						url_imagen_producto: urlImagenProducto
					});

					const response = await fetch(process.env.BACKEND_URL + "/api/producto", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({
							nombre_producto: nombreProducto,
							descripcion_producto: descripcionProducto,
							categoria_producto: categoriaProducto,
							precio: precio,
							url_imagen_producto: urlImagenProducto
						})
					});

					const data = await response.json();
					if (response.status === 200) {
						console.log(data.msg);
						setStore({ productos: data.results });
						console.log("Producto creado:", data.results);
						window.location.reload();
						return true;
					// } else {
					// 	console.log("Mensaje de error:", data.msg);
					// 	return false;
					}
				} catch (error) {
					console.error("Error al crear el producto:", error);
					return false;
				}
			},

			getTienda: async (id) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/tienda/" + id, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						},
					})
					let data = await response.json()
					if (response.status === 200) {
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						setStore({ tienda: data })
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			getProductosTienda: async (id) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/productos/" + id, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						},
					})
					let data = await response.json()
					if (response.status === 200) {
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						setStore({ productosTienda: data.productos })
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			todosMisFavoritos: () => {
				getStore().productosFavoritos;





				

			},

			getProducto: async (id) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/producto/" + id, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						},
					})
					let data = await response.json()
					if (response.status === 200) {
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						setStore({ producto: data })
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},


			crearTienda: async (nombre_tienda, descripcion_tienda, categoria_tienda, direccion_tienda, url_imagen_tienda, navigate) => {
				let token = localStorage.getItem("token")
				if (!token) {
					console.error("Falta el token de autenticación");
					return false;
				}
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/tienda", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': "Bearer " + token
						},
						body: JSON.stringify({
							nombre_tienda: nombre_tienda,
							descripcion_tienda: descripcion_tienda,
							categoria_tienda: categoria_tienda,
							direccion_tienda: direccion_tienda,
							url_imagen_tienda: url_imagen_tienda
						})
					});

					const data = await response.json();
					if (!response.ok) {
						throw new Error (data.error)
					}
						console.log(data);
						setStore({ tiendas: data.result })
						navigate("/vendedor")
						console.log("Tienda creada:", data.msg);
						return data.msg;
				} catch (error) {
					console.error("Error desconocido:", error);
					throw error;
				}
			},

			borrarProducto: async (id, token) => {
				console.log("Funciona");
				try {
					// console.log("Datos del producto a borrar:", {
					// 	nombre_producto: nombreProducto,
					// 	descripcion_producto: descripcionProducto,
					// 	categoria_producto: categoriaProducto,
					// 	precio: precio,
					// 	url_imagen_producto: urlImagenProducto
					// });

					const response = await fetch(process.env.BACKEND_URL + "/api/producto/"+id, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						
					});

					const data = await response.json();
					if (response.status === 200) {
						console.log(data.msg);
						setStore({ productos: data.results });
						console.log("Producto borrado:", data.results);
						return true;
					// } else {
					// 	console.log("Mensaje de error:", data.msg);
					// 	return false;
					}
				} catch (error) {
					console.error("Error al borrar el producto:", error);
					return false;
				}
			},

			getCategoriasProductos: async () => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/categorias-productos", {
						method: "GET",
						headers:{
							"Content-Type":"application/json" 
						},
					})
					let data = await response.json()
					if (response.status === 200){
						setStore({categoriasProductos:data.results})
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			editarProducto: async (nombreProducto, descripcionProducto, categoriaProducto, precio, urlImagenProducto, token, id) => {
				try {
					console.log("Datos del producto a editar:", {
						nombre_producto: nombreProducto,
						descripcion_producto: descripcionProducto,
						categoria_producto: categoriaProducto,
						precio: parseInt(precio),
						url_imagen_producto: urlImagenProducto
					});
			
					const response = await fetch(process.env.BACKEND_URL + "/api/producto/"+id, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({
							nombre_producto: nombreProducto,
							descripcion_producto: descripcionProducto,
							categoria_producto: categoriaProducto,
							precio: parseInt(precio),
							url_imagen_producto: urlImagenProducto,
						})
					});
			
					const data = await response.json();
					if (response.status === 200) {
						console.log(data.msg);
						setStore({ productos: data.results });
						return true
					} 
				} catch (error) {
					console.error("Error al editar el producto:", error);
					return false;
				}
			},

			getTiendaVendedor: async (token) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/tienda", {
						method: "GET",
						headers:{
							"Content-Type":"application/json",
							'Authorization': `Bearer ${token}`
						},
					})
					let data = await response.json()
					if (response.status === 200){
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						setStore({tienda:data})
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			getProductosVendedor: async (token) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/productos-vendedor", {
						method: "GET",
						headers:{
							"Content-Type":"application/json",
							'Authorization': `Bearer ${token}`
						},
					})
					let data = await response.json()
					if (response.status === 200){
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						setStore({productosTienda:data.productos})
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			verProducto: (producto) => {
				setStore({producto:producto})
			},
			getCategoriasTiendas: async () => {
                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/categorias-tiendas", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    let data = await response.json();
                    if (response.status === 200) {
                        setStore({ categoriasTiendas: data.results });
                    } else {
                        console.log(data);
                        console.log("No funciona");
                    }
                } catch (error) {
                    console.error("Error fetching categorias tiendas:", error);
                }
            },
			
			verTienda: (tienda) => {
                setStore({tienda:tienda})
            },


            editarTienda: async (nombre_tienda, descripcion_tienda, categoria_tienda, direccion_tienda, url_imagen_tienda, token) => {
                try {
                    console.log("Datos del producto a editar:");
           
                    const response = await fetch(process.env.BACKEND_URL + "/api/tienda/"+nombre_tienda, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            nombre_tienda: nombre_tienda,
                            descripcion_tienda: descripcion_tienda,
                            categoria_tienda: categoria_tienda,
                            direccion_tienda: direccion_tienda,
                            url_imagen_tienda: url_imagen_tienda,
                        })
                    });
           
                    const data = await response.json();
                    if (response.status === 200) {
                        console.log(data.msg);
                        setStore({ tiendas: data.results });
                        return true
                    }
                } catch (error) {
                    console.error("Error al editar el producto:", error);
                    return false;
                }
            },

			deleteTienda: async (nombre_tienda,token) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/tienda/"+nombre_tienda, {
						method: "DELETE",
						headers:{
							"Content-Type":"application/json",
							'Authorization': `Bearer ${token}`
						},
					})
					let data = await response.json()
					if (response.status === 200){
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						return response.json
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			getCategoriasProductosTienda: async (id) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/categorias-productos-tienda/"+id, {
						method: "GET",
						headers:{
							"Content-Type":"application/json"
						},
					})
					let data = await response.json()
					if (response.status === 200){
						setStore({categoriasProductos:data.results})
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			añadirProductoFavorito: async (producto_id) => {
				let token = localStorage.getItem("token")
				console.log("funciona" + producto_id);
				if (!token) {
					console.error("Falta el token de autenticación");
					return false;
				}
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/productos-favoritos/" + producto_id, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': "Bearer " + token
						},
						body: JSON.stringify({
							producto_id: producto_id           
							// particular_id: particular_id         
						})
					});
					if (!response.ok) {
						throw new Error (data.error)
					}

					const data = await response.json();
					console.log(data);
					setStore({ productosFavoritos: data.productos })
					console.log("Favorito añadido:", data.msg);
					// window.location.reload();
					return data.msg;
				} catch (error) {
					console.error("Error desconocido:", error);
					// throw error;
				}
			},

			getProductosFavoritos: async () => {
				let token = localStorage.getItem("token")
				if (!token) {
					console.error("Falta el token de autenticación");
					return false;
				}
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/productos-favoritos", {
						method: "GET",
						headers:{
							"Content-Type":"application/json",
							'Authorization': `Bearer ${token}`
						},
					})
					let data = await response.json()
					if (response.status === 200){
						setStore({productosFavoritos:data.productos});
						return true;
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			borrarProductoFavorito: async (producto_id) => {
				let token = localStorage.getItem("token")
				if (!token) {
					console.error("Falta el token de autenticación");
					return false;
				}
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/productos-favoritos/" + producto_id, {
						method: "DELETE",
						headers:{
							"Content-Type":"application/json",
							'Authorization': `Bearer ${token}`
						},
					})
					let data = await response.json()
					if (response.status === 200){
						window.location.reload();
						return true;
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			añadirTiendaFavorita: async (tienda_id) => {
				let token = localStorage.getItem("token")
				if (!token) {
					console.error("Falta el token de autenticación");
					return false;
				}
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/tiendas-favoritas/" + tienda_id, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': "Bearer " + token
						},
						body: JSON.stringify({
							tienda_id: tienda_id     
						})
					});

					
					if (!response.ok) {
						throw new Error (data.error)
					}
					const data = await response.json();
					console.log(data);
					setStore({ tiendasFavoritas: data.tiendas })
					console.log("Favorita añadida:", data.msg);
					// window.location.reload();
					return data.msg;
				} catch (error) {
					console.error("Error desconocido:", error);
					throw error;
				}
			},

			getTiendasFavoritas: async () => {
				let token = localStorage.getItem("token")
				if (!token) {
					console.error("Falta el token de autenticación");
					return false;
				}
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/tiendas-favoritas", {
						method: "GET",
						headers:{
							"Content-Type":"application/json",
							'Authorization': `Bearer ${token}`
						},
					})
					let data = await response.json()
					if (response.status === 200){
						setStore({tiendasFavoritas: data.tiendas});
						return true;
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},

			borrarTiendaFavorita: async (tienda_id) => {
				let token = localStorage.getItem("token")
				if (!token) {
					console.error("Falta el token de autenticación");
					return false;
				}
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/tiendas-favoritas/" + tienda_id, {
						method: "DELETE",
						headers:{
							"Content-Type":"application/json",
							'Authorization': `Bearer ${token}`
						},
					})
					if (!response.ok) {
						throw new Error (data.error)
					}
					const data = await response.json();
					if (response.status === 200){
						window.location.reload();
						return true;
					} else {
						console.log(data);
						return console.log("No funciona");
					}
				} catch (error) {
					return false;
				}
			},
			eliminarProductosTiendaVendedor: async (tienda_id, vendedor_id) => {
				let token = localStorage.getItem("token")
				try {
				  const response = await fetch(`/productos/${tienda_id}/vendedor/${vendedor_id}`, {
					method: 'DELETE',
					headers: {
						"Content-Type":"application/json",
					  	'Authorization': "Bearer " + token // Suponiendo que se almacena el token JWT en localStorage
					},
				  });
			  
				  const data = await response.json();
			  
				  if (response.status === 200) {
					// Mensaje de éxito
					console.log('Productos de la tienda eliminados con éxito');
					// Actualizar la interfaz para reflejar la eliminación de los productos
				  } else {
					// Mensaje de error
					console.error(`Error al eliminar productos: ${data.msg}`);
				  }
				} catch (error) {
				  console.error('Error inesperado al eliminar productos:', error);
				}
			  }
		},
	};
};

export default getState;