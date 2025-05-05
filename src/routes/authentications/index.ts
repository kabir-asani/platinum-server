import { Hono } from "hono";
import { betterAuthClient } from "../../integrations/better-auth";

export const authenticationsRoute = new Hono();

authenticationsRoute.use((context) => {
  return betterAuthClient.handler(context.req.raw);
});
