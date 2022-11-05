const socket = io.connect();

const formulario = document.getElementById("formulario")
const titulo = document.getElementById("titulo");
const precio = document.getElementById("precio");
const thumbnail = document.getElementById("img");

function ocultarErrores(){
    const errores = document.getElementById("errorcito");

    if (errores){
        errores.hidden="hidden"
        const tabla = document.getElementById("tabla");
        tabla.hidden = ""
    }

}


formulario.addEventListener("submit", (ev)=>{
    ev.preventDefault();

    const datos = {
        title : titulo.value,
        price : precio.value,
        thumbnail : thumbnail.value,
    }
    
    socket.emit("envioDeDatosDeUnNuevoProducto", datos);

    titulo.value = "";
    precio.value = "";
    thumbnail.value = "";
    ocultarErrores();


})

socket.on("agregarNuevoProductoYQueSeVeaParaTodosLosUsuario",(datos)=>{
    ocultarErrores();
    mostrarNuevoProducto(datos.title,datos.thumbnail,datos.price);
})

const mostrarNuevoProducto = (titulo,img,precio) => {
    const tabla = document.getElementById("tabla");
    const nuevoTr = document.createElement("tr");

    nuevoTr.innerHTML = `
    <td><p class="tabla__title">${titulo}</p></td>
    <td><img class="tabla__img" src=${img}/></td>
    <td><p class="tabla__price">${precio}$</p></td>`;

    tabla.appendChild(nuevoTr);
}





const chat = document.getElementById("chat-form");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");

const seccion = document.getElementById("sectionMensaje");  
seccion.scrollTop = seccion.scrollHeight;

chat.addEventListener("submit", (ev)=>{
    ev.preventDefault();

    const datos = {
        email : email.value,
        mensaje : mensaje.value.trim(),
    }

    if (datos.mensaje!=""){
        socket.emit("envioDeDatosDelChat", datos);  
        mensaje.value = "";
    }
    

})

socket.on("agregarNuevoChat",(datos)=>{
    const clase = "unMensaje"
    mostrarNuevoChat(datos, clase);
})

function mostrarNuevoChat({email, mensaje, fecha}, clase){
    const seccion = document.getElementById("sectionMensaje");
    
    const nuevoDiv = document.createElement("div");
    nuevoDiv.className = clase;
    
    nuevoDiv.innerHTML = `
    <div class="datosDelMensaje">
        <p class="chatEmail">${email}</p>
        <p class="chatHora">${fecha}</p>
    </div>
    <div class="datosDelMensaje">
        <pre class="chatMensaje">${mensaje}</pre>
    </div>`;

    seccion.appendChild(nuevoDiv);
    seccion.scrollTop = seccion.scrollHeight;
}

socket.on("agregarNuevoChatUser",(datos)=>{
    const clase = "unMensaje2"
    mostrarNuevoChat(datos, clase);
});

let presionado=false;

mensaje.addEventListener("keydown", function(e){
    if(e.code === "ControlLeft"){
        presionado=true
    }
})

mensaje.addEventListener("keyup", function(e){
    if(e.code === "ControlLeft"){
        presionado=false;
    }
    if(!presionado && (e.code === "Enter" || e.code === "NumpadEnter") && mensaje.value.trim()!= ""){
        document.getElementById("buttonSubmit").click();
    }
    if (presionado && (e.code === "Enter" || e.code === "NumpadEnter")){
        mensaje.value=mensaje.value+"\n";
    }
    
})
