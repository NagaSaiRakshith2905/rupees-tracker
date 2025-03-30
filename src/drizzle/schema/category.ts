import { relations } from "drizzle-orm";
import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { SpaceTable } from "./space";
import { UserTable } from "./user";

export const CategoryTable = pgTable("categories", {
  id,
  name: text("name").notNull(),
  isParent: boolean("is_parent").notNull().default(false),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  spaceId: uuid("space_id")
    .notNull()
    .references(() => SpaceTable.id, { onDelete: "set null" }),
  parentId: uuid("parent_id"),
  createdAt,
  updatedAt,
});

export const CategoryRelationships = relations(
  CategoryTable,
  ({ one, many }) => ({
    space: one(SpaceTable, {
      fields: [CategoryTable.spaceId],
      references: [SpaceTable.id],
    }),
    user: one(UserTable, {
      fields: [CategoryTable.userId],
      references: [UserTable.id],
    }),
    parent: one(CategoryTable, {
      fields: [CategoryTable.parentId],
      references: [CategoryTable.id],
      relationName: "categories",
    }),
    categories: many(CategoryTable, {
      relationName: "categories",
    }),
  })
);
