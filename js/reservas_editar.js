console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        dni:0,
        precio:0,
        checkin:0,
        checkout:0,
        habitacion:"",
        imagen:"",
        url:'http://localhost:5000/reservas/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre = data.nombre;
                    this.dni=data.dni
                    this.precio=data.precio
                    this.checkin=data.checkin
                    this.checkout=data.checkout
                    this.habitacion=data.habitacion
                    this.imagen=data.imagen
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let reserva = {
                nombre:this.nombre,
                precio: this.precio,
                dni: this.dni,
                checkin:this.checkin,
                checkout:this.checkout,
                habitacion:this.habitacion,
                imagen:this.imagen
            }
            var options = {
                body: JSON.stringify(reserva),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./reservas.html";             
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
