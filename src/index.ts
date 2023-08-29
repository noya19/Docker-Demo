import fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import app from "./app";

(async () => {
    const server = fastify({
        logger: {
            transport: {
                target: "pino-pretty",
                options: {
                    translateTime: "HH:MM:ss Z",
                    igonre: "pid"
                }
            }
        }
    });

    await server.register(cors, {
        preflight: true
    });

    await server.register(swagger, {
        swagger: {
            host: 'localhost:3000',
            info: { title: "Docker Demo", version: "1.0" },
            schemes: ["http"],
            consumes: ['application/json'],
            produces: ['application/json', 'application/octet-strem', 'text/plain'],
            securityDefinitions: {
                bearerAuth: {
                    type: "apiKey",
                    name: "Authorization",
                    in: "header",
                    description: "Enter Access token like Bearer <token>"
                }
            }
        }
    })

    await server.register(swaggerUI, {
        routePrefix: '/docs'
    })

    server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
        if (err) console.error("Encountered an error while starting the server", err);
        else console.info(`Server is running at port 3000 and listening for connection on ${address}`)
    })

    server.register(app);
})()