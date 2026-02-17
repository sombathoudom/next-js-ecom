import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { user } from "@/server/db/schema";

export const baseUserInsertSchema = createInsertSchema(user);

export const createUserSchema = baseUserInsertSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    emailVerified: true,
  })
  .extend({
    image: z.string().optional(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
export type InsertUser = typeof user.$inferInsert;

export type UserFormValues = z.infer<typeof createUserSchema>;
