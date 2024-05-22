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
			categoriasProductos:[],
			producto:[],
			vendedores:[]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			login: async (email, password) => {
				try{
				let response = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: 'POST',
					headers:{
						'Content-Type':'application/json'
					},
					body: JSON.stringify({
						email:email,
						password:password
					})
				})

				let data = await response.json()
				if (response.status === 200) {
					localStorage.setItem("token", data.access_token);
					console.log(data);
					return true;
				}else{
					console.log(data);
					return false
				}
				} catch (error) {
					return false;
				}

			},
			createUser: async (email, password) => {
				try{
				let response = await fetch(process.env.BACKEND_URL + "/api/signup", {
					method: 'POST',
					headers:{
						'Content-Type':'application/json'
					},
					body: JSON.stringify({
						email:email,
						password:password
					})
				})

				let data = await response.json()
				if (response.status === 200) {
					localStorage.setItem("token", data.access_token);
					console.log(data);
					return true;
				}else{
					console.log(data);
					return false
				}
				} catch (error) {
					return false;
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
						headers:{
							"Content-Type":"application/json" 
						},
					})
					let data = await response.json()
					if (response.status === 200){
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						setStore({tiendas:data.result})
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
						headers:{
							"Content-Type":"application/json" 
						},
					})
					let data = await response.json()
					if (response.status === 200){
						// Actualiza el estado con los datos de las tiendas
						// Asumiendo que la respuesta contiene una propiedad 'tienda'
						setStore({productos:data.results})
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
							url_imagen_producto: urlImagenProducto,
						})
					});
			
					const data = await response.json();
					if (response.status === 200) {
						console.log(data.msg);
						setStore({ productos: data.results });
						console.log("Producto creado:", data.results);
					} else {
						console.log("Mensaje de error:", data.msg);
						return false;
					}
				} catch (error) {
					console.error("Error al crear el producto:", error);
					return false;
				}
			},
			
			getTienda: async (id) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/tienda/"+id, {
						method: "GET",
						headers:{
							"Content-Type":"application/json" 
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

			getProductosTienda: async (id) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/productos/"+id, {
						method: "GET",
						headers:{
							"Content-Type":"application/json" 
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

			// seleccionCategoriaProductos: () => {
			// 	try {
			// 		let arrayProductos = await getStore().productos
			// 		let categoriasProductos = [...new Set(arrayProductos.map(o => o.categoria_producto))]
			// 		setStore({categoriasProductos:categoriasProductos})
			// 	} catch (error) {
			// 		return false;
			// 	}

			// },

			getProducto: async (id) => {
                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/producto/"+id, {
                        method: "GET",
                        headers:{
                            "Content-Type":"application/json"
                        },
                    })
                    let data = await response.json()
                    if (response.status === 200){
                        // Actualiza el estado con los datos de las tiendas
                        // Asumiendo que la respuesta contiene una propiedad 'tienda'
                        setStore({producto:data})
                    } else {
                        console.log(data);
                        return console.log("No funciona");
                    }
                } catch (error) {
                    return false;
                }
            },



			crearTienda: async (nombre_tienda, descripcion_tienda, categoria_tienda, direccion_tienda, url_imagen_tienda) => {
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
							'Authorization': "Bearer "+token
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
					if (response.status === 200) {
						console.log(data.msg);
						setStore({ tiendas: data.result})
						console.log("Tienda creada:", data.msg);
					} else {
						console.log("Error al crear la tienda:", data.msg);
						return false;
					}
				} catch (error) {
						console.error("Error desconocido:", error);
					  return false;
					}
				  },

			borrarProducto: async (nombreProducto, descripcionProducto, categoriaProducto, precio, urlImagenProducto, token) => {
				try {
					console.log("Datos del producto a borrar:", {
						nombre_producto: nombreProducto,
						descripcion_producto: descripcionProducto,
						categoria_producto: categoriaProducto,
						precio: precio,
						url_imagen_producto: urlImagenProducto
					});

					const response = await fetch(process.env.BACKEND_URL + "/api/producto"+id, {
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
					} else {
						console.log("Mensaje de error:", data.msg);
						return false;
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






































		},
	};
};		

export default getState;