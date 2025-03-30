import { relations } from "drizzle-orm";
import {
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { SpaceTable } from "./space";
import { UserTable } from "./user";
import { AccountTransactionTable } from "./accountTransaction";

export const accountTypes = [
  "salary",
  "savings",
  "credit-card",
  "cash",
] as const;
export type AccountType = (typeof accountTypes)[number];
export const accountTypeEnum = pgEnum("account_type", accountTypes);

export const AccountTable = pgTable("accounts", {
  id,
  name: text("name").notNull(),
  accountType: accountTypeEnum().notNull().default("savings"),
  amount: doublePrecision("amount").notNull().default(0.0),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  spaceId: uuid("space_id")
    .notNull()
    .references(() => SpaceTable.id, { onDelete: "set null" }),
  createdAt,
  updatedAt,
});

export const AccouuntRelationships = relations(
  AccountTable,
  ({ one, many }) => ({
    space: one(SpaceTable, {
      fields: [AccountTable.spaceId],
      references: [SpaceTable.id],
    }),
    user: one(UserTable, {
      fields: [AccountTable.userId],
      references: [UserTable.id],
    }),
    accountTransactions: many(AccountTransactionTable),
  })
);
