// Validacion de formulario

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    precio: /^\d{7,14}$/,
    dni: /^\d{7,14}$/,
    checkin: /^\d{7,14}$/,
    checkout: /^\d{7,14}$/,
    habitacion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    // apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	// email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	// telefono: /^\d{7,14}$/,
}

const campos = {
	nombre: false,
    precio: false,
    dni: false,
    checkin: false,
    checkout: false,
    habitacion: false,
    // apellido: false,
	// email: false,
	// telefono: false,
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
        case "precio":
			validarCampo(expresiones.precio, e.target, 'precio');
		break;
        case "dni":
			validarCampo(expresiones.dni, e.target, 'dni');
		break;
        case "checkin":
			validarCampo(expresiones.checkin, e.target, 'checkin');
		break;
        case "checkout":
			validarCampo(expresiones.checkout, e.target, 'checkout');
		break;
        case "habitacion":
			validarCampo(expresiones.habitacion, e.target, 'habitacion');
		break;
        // case "apellido":
		// 	validarCampo(expresiones.apellido, e.target, 'apellido');
		// break;
		// case "email":
		// 	validarCampo(expresiones.email, e.target, 'email');
		// break;
		// case "telefono":
		// 	validarCampo(expresiones.telefono, e.target, 'telefono');
		// break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.precio && campos.dni && campos.checkin && campos.checkout && campos.habitacion && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});