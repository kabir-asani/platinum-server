import { zValidator } from "@hono/zod-validator";
import { createSecureRoute } from "../middlewares/session-middleware";
import { z } from "zod";
import { prismaClient } from "../../integrations/prisma";
import { HTTPException } from "hono/http-exception";

export const postsRoute = createSecureRoute();

postsRoute.post(
  "",
  zValidator(
    "json",
    z.object({
      text: z.string().min(1, "Only non-empty strings are allowed in text"),
    }),
  ),
  async (context) => {
    const user = context.get("user");
    const { text } = context.req.valid("json");

    const post = await prismaClient.post.create({
      data: {
        text,
        authorId: user.id,
      },
      include: {
        author: true,
      },
    });

    return context.json(post, 201);
  },
);

postsRoute.get("/:postId", async (context) => {
  const { postId } = context.req.param();

  const post = await prismaClient.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    throw new HTTPException(404);
  }

  return context.json(post);
});
