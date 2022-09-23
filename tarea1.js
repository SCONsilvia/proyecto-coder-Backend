class Usuario {
    nombre;
    apellido;
    libros;
    mascotas;

    constructor(nombre,apellido,libros=[], mascotas=[]) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombre){
        this.mascotas.push(nombre);
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre, autor){
        const nuevoLibro = {nombre:nombre,autor:autor};
        this.libros.push(nuevoLibro);
    }
    getBookNames(){
        const nombresDeLibros = this.libros.map((elemento) => {return elemento.nombre})
        return nombresDeLibros
    }
}

const usuario = new Usuario("Carlos","Garcias",[{nombre: "El señor de las moscas", autor:"William Golding"}], ["Luigi", "Romero"]);
console.log(usuario.getFullName());
usuario.addMascota("Rocky");
console.log(usuario.countMascotas());
usuario.addBook("El señor de los anillos", "J. R. R. Tolkien");
console.log(usuario.getBookNames());
