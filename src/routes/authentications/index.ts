import { betterAuthClient } from "../../integrations/better-auth";
import { createUnsecureRoute } from "../middlewares/session-middleware";

export const authenticationsRoute = createUnsecureRoute();

authenticationsRoute.use((context) => {
  return betterAuthClient.handler(context.req.raw);
});
