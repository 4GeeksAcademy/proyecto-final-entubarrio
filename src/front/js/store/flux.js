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
			categoriasProductosTienda:[],
			producto:[]

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

		/* getTiendaById: async (tiendaId) => {
			try {
				const response = await fetch(`${process.env.BACKEND_URL}/api/tienda/${tiendaId}`);
				if (response.ok) {
					const data = await response.json();
					// Actualiza el estado con los datos de la tienda obtenida
					// Asumiendo que la respuesta contiene una propiedad 'tienda'
					setStore({ tienda: data.tienda });
					return true;
				} else {
					console.error("Error al obtener la tienda:", response.statusText);
					return false;
				}
			} catch (error) {
				console.error("Error al procesar la solicitud:", error);
				return false;
			}
		}
 */


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

			seleccionCategoriaProductosTienda: () => {
				// let productosTienda = getStore().productos.filter_by(tienda_id=id)
				// setStore({productosTienda:productosTienda})
				const categoriasProductos = getStore().productosTienda.filter(function(v,i,self){
					return i == self.indexOf(v);
				});
				console.log(categoriasProductos);
				setStore({categoriasProductosTienda:categoriasProductos})
			},

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


















//LINEAS RESERVADAS ADRIAN





















































































		},
	};
};		

export default getState;