import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authenticationsRoute } from "./routes/authentications";
import { cors } from "hono/cors";
import { webClientUrl } from "./utils/environment";

const allRoutes = new Hono();

allRoutes.use(
  cors({
    origin: webClientUrl,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Authorization", "Content-Type"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
    maxAge: 600,
  }),
);

allRoutes.route("/authentications", authenticationsRoute);

serve(allRoutes, ({ port }) => {
  console.log(`\tRunning at http://localhost:${port}`);
});
