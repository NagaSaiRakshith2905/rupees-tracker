import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { SpaceUserTable } from "./spaceUser";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export const UserTable = pgTable("users", {
  id,
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text("image_url"),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt,
  updatedAt,
});

export const UserRelationships = relations(UserTable, ({ many }) => ({
  userSpaces: many(SpaceUserTable),
}));
