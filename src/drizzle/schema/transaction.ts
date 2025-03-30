import { relations } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { SpaceTable } from "./space";
import { UserTable } from "./user";
import { AccountTable } from "./account";
import { CategoryTable } from "./category";

export const transactionTypes = [
  "debit",
  "credit",
  "withdraw",
  "deposit",
  "cash-received",
] as const;
export type TransactionType = (typeof transactionTypes)[number];
export const transactionTypeEnum = pgEnum("transaction_type", transactionTypes);

// TODO : add categoryId
export const TransactionTable = pgTable("transactions", {
  id,
  date: timestamp("date", { withTimezone: true }).notNull(),
  amount: doublePrecision("amount").notNull().default(0.0),
  description: text("description").notNull(),
  transactionType: transactionTypeEnum().notNull().default("debit"),
  isAnExpense: boolean("is_an_expense").notNull().default(true),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  spaceId: uuid("space_id")
    .notNull()
    .references(() => SpaceTable.id, { onDelete: "set null" }),
  categoryId: uuid("category_id").references(() => CategoryTable.id, {
    onDelete: "set null",
  }),
  fromAccountId: uuid("from_account")
    .notNull()
    .references(() => AccountTable.id, { onDelete: "cascade" }),
  toAccountId: uuid("to_account").references(() => AccountTable.id, {
    onDelete: "set null",
  }),
  createdAt,
  updatedAt,
});

export const TransactionRelationships = relations(
  TransactionTable,
  ({ one }) => ({
    space: one(SpaceTable, {
      fields: [TransactionTable.spaceId],
      references: [SpaceTable.id],
    }),
    user: one(UserTable, {
      fields: [TransactionTable.userId],
      references: [UserTable.id],
    }),
    category: one(CategoryTable, {
      fields: [TransactionTable.categoryId],
      references: [CategoryTable.id],
    }),
    fromAccount: one(AccountTable, {
      fields: [TransactionTable.fromAccountId],
      references: [AccountTable.id],
    }),
    toAccount: one(AccountTable, {
      fields: [TransactionTable.toAccountId],
      references: [AccountTable.id],
    }),
  })
);
