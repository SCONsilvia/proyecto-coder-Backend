const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Proyecto Codehouse",
            version: "1.0.0",
            description: "Proyecto Codehouse"
        },
        servers: [
            {
                url: "http://localhost:8080"
            },
        ]
    },
    apis: ["./src/docs/*.yml"]
}

module.exports = info;
