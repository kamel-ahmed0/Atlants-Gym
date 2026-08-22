import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Atlants Gym API",
            version: "1.0.0",
            description: "API Documentation for Atlants Gym"
        },
        servers : [{
           url: "https://atlants-gym-production.up.railway.app/"} 
        ]
    },
    apis: ["./src/routes/*.ts"]
}

export const specs = swaggerJSDoc(options);