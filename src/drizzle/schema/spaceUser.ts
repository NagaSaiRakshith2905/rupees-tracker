import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { SpaceTable } from "./space";
import { UserTable } from "./user";

export const SpaceUserTable = pgTable(
  "space_users",
  {
    spaceId: uuid("space_id")
      .notNull()
      .references(() => SpaceTable.id, { onDelete: "restrict" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.spaceId, t.userId] })]
);

export const SpaceUserRelationships = relations(SpaceUserTable, ({ one }) => ({
  space: one(SpaceTable, {
    fields: [SpaceUserTable.spaceId],
    references: [SpaceTable.id],
  }),
  user: one(UserTable, {
    fields: [SpaceUserTable.userId],
    references: [UserTable.id],
  }),
}));
