import { z } from "zod";
import { desc, asc, like, or, count } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { user } from "@/server/db/schema";
import {
  createUserSchema,
  baseUserInsertSchema,
  type InsertUser,
} from "@/app/(admin)/admin/users/_components/user-schema";
const getUsersInput = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.enum(["name", "email", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure
    .input(getUsersInput)
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search, sortBy, sortOrder } = input;
      const offset = (page - 1) * pageSize;

      // Build where condition
      const whereCondition = search
        ? or(like(user.name, `%${search}%`), like(user.email, `%${search}%`))
        : undefined;

      // Build order by
      const orderByClause =
        sortOrder === "desc" ? desc(user[sortBy]) : asc(user[sortBy]);

      // Execute queries in parallel
      const [users, totalCountResult] = await Promise.all([
        ctx.db
          .select()
          .from(user)
          .where(whereCondition)
          .orderBy(orderByClause)
          .limit(pageSize)
          .offset(offset),
        ctx.db.select({ count: count() }).from(user).where(whereCondition),
      ]);

      const total = Number(totalCountResult[0]?.count ?? 0);

      return {
        items: users,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    }),
  createUser: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { password, ...rest } = input;

      const newUser: InsertUser = {
        ...rest,
        image: rest.image ?? null,
      };

      await ctx.db.insert(user).values(newUser);
    }),
});
