process.on("message", (cantidad) => {
    console.log(`Start calculo, PID: ${process.pid}`);
    const datos = {};

    for (let i = 0; i < cantidad; i += 1) {
        const numero = Math.floor(Math.random() * 1000) + 1;
        if (datos[numero]) {
            datos[numero] += 1;
        } else {
            datos[numero] = 1;
        }
    }
    process.send(datos);
});
