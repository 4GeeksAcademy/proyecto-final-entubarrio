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
			productos: []
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
























//LINEAS RESERVADAS ADRIAN




























































































































		},
	};
};		

export default getState;