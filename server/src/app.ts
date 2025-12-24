import cors from "cors";
import type { Express } from "express";
import express from "express";
import HttpError from "./utils/HttpError.js";
import { visitsRouter } from "./visits/visits-routes.js";

const app: Express = express();

// Environment-based CORS configuration
const allowedOrigins =
    process.env.NODE_ENV === "production" ?
        process.env.CLIENT_URL ?
            [process.env.CLIENT_URL]
        :   []
    :   ["http://localhost:5173"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (!allowedOrigins.includes(origin)) {
                const msg =
                    "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }

            return callback(null, true);
        },
    }),
);

app.use(express.json());
app.use("/api", visitsRouter);

app.use(HttpError.errorHandler);

export default app;
