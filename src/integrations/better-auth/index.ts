import { betterAuth } from "better-auth";
import { serverUrl } from "../../utils/environment";

export const betterAuthClient = betterAuth({
  baseURL: serverUrl,
  basePath: "/authentications",
  user: {
    modelName: "User",
  },
  account: {
    modelName: "Account",
  },
  session: {
    modelName: "Session",
  },
  verification: {
    modelName: "Verification",
  },
});
