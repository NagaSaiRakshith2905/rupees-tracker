import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { AccountTable } from "./account";
import { SpaceTable } from "./space";

export const SpaceAccountTable = pgTable(
  "space_accounts",
  {
    spaceId: uuid("space_id")
      .notNull()
      .references(() => SpaceTable.id, { onDelete: "restrict" }),
    accountId: uuid("account_id")
      .notNull()
      .references(() => AccountTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.spaceId, t.accountId] })]
);

export const SpaceAccountRelationships = relations(
  SpaceAccountTable,
  ({ one }) => ({
    space: one(SpaceTable, {
      fields: [SpaceAccountTable.spaceId],
      references: [SpaceTable.id],
    }),
    account: one(AccountTable, {
      fields: [SpaceAccountTable.accountId],
      references: [AccountTable.id],
    }),
  })
);
