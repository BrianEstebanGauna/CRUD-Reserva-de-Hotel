const { createApp } = Vue
  createApp({
    data() {
      return {
        reservas:[],
        url:'http://localhost:5000/reservas', 
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"", 
        dni:0,
        precio:0,
        checkin:"",
        checkout:"",
        habitacion:"",
        imagen:"",
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.reservas = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(reserva) {
            const url = this.url+'/' + reserva;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar(){
            let reserva = {
                nombre:this.nombre,
                precio: this.precio,
                dni: this.dni,
                checkin: this.checkin,
                checkout: this.checkout,
                habitacion: this.habitacion,
                imagen:this.imagen
            }
            var options = {
                body:JSON.stringify(reserva),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./reservas.html";  
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
