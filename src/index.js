let igualPresionado = false;

function agregarNumero(numero) {
  if(igualPresionado){
    limpiarContenido();
    igualPresionado = false;
  }
  let contenedorNumeros = document.getElementById("contenedor");
  if (contenedorNumeros.innerHTML == 0) {
    contenedorNumeros.innerHTML = "";
    contenedorNumeros.innerHTML += numero;
  } else {
    contenedorNumeros.innerHTML += numero;
  }
}

function separarTerminos(ecuacion) {
  let terminos = [];
  separarTerminosPositivos(ecuacion).forEach((termino) => {
    for (let [index, valor] of separarTerminosNegativos(termino).entries()) {
      if (valor) {
        terminos.push({
          termino: valor,
          positivo: index == 0,
          factores: [],
          divisores: [],
        });
      }
    }
  });
  return terminos;
}

function separarTerminosPositivos(ecuacion) {
  return ecuacion.split("+");
}

function separarTerminosNegativos(ecuacion) {
  return ecuacion.split("-");
}

function separarFactores(termino) {
  termino.termino.split("x").forEach((factor) => {
    for (let [index, valor] of factor.split("/").entries()) {
      if (valor) {
        if (index == 0) {
          termino.factores.push(Number(valor));
        } else {
          termino.divisores.push(Number(valor));
        }
      } else {
        throw "SyntaxError";
      }
    }
  });
}

function obtenerResultado(){
  let contenedor = document.getElementById("contenedor");
  let terminos = separarTerminos(String(contenedor.innerHTML));
  let resultado = 0;
  try {
    terminos.forEach((termino) => {
      let resultadoTermino = 0;
      separarFactores(termino);
      resultadoTermino = termino.factores.reduce((p,c)=>p*c) * termino.divisores.reduce((p,c)=>p/c,1);
      if(!termino.positivo){
        resultadoTermino *= -1;
      }
      resultado += resultadoTermino;
    });
    contenedor.innerHTML = resultado;
  } catch (error) {
    contenedor.innerHTML = error;
  } finally{
    igualPresionado = true;
  }
}

function limpiarContenido() {
  contenedor.innerHTML = "0";
}

function borrar() {
  if(igualPresionado){
    limpiarContenido();
    igualPresionado = false; 
  }
  let valores = String(document.getElementById("contenedor").innerHTML);
  let valoresBorrado = valores.substring(0, valores.length - 1);
  contenedor.innerHTML = valoresBorrado ? valoresBorrado : 0;
}
