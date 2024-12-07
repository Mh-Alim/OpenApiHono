import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

const RequestSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({ param: { name: "id", in: "path" }, example: "23434" }),
});

const responseSchema = z
  .object({
    id: z.string().openapi({ example: "345" }),
    name: z.string().openapi({ example: "alim khan" }),
    age: z.number().openapi({ example: 42 }),
  })
  .openapi("User");

const route = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: RequestSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: responseSchema,
        },
      },
      description: "Retrieved the user",
    },
  },
});

const app = new OpenAPIHono();

app.openapi(route, (c: any) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "Lucky Man",
  });
});

// open-api spec will be in this endpojnt
app.doc("/doc", {
  openapi: "3.0.1",
  info: {
    version: "1.0.1",
    title: "Hono api",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));
export default app;
