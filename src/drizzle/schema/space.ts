import { relations } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { SpaceUserTable } from "./spaceUser";

export const SpaceTable = pgTable("spaces", {
  id,
  name: text("name").notNull(),
  uniqueId: text("unique_id").notNull(),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt,
  updatedAt,
});

export const SpaceRelationships = relations(SpaceTable, ({ many }) => ({
  spaceUsers: many(SpaceUserTable),
}));
