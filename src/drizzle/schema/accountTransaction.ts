import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { AccountTable } from "./account";
import { TransactionTable } from "./transaction";

export const AccountTransactionTable = pgTable(
  "account_transactions",
  {
    accountId: uuid("account_id")
      .notNull()
      .references(() => AccountTable.id, { onDelete: "cascade" }),
    transactionId: uuid("transaction_id")
      .notNull()
      .references(() => TransactionTable.id, { onDelete: "restrict" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.accountId, t.transactionId] })]
);

export const AccountTransactionRelationships = relations(
  AccountTransactionTable,
  ({ one }) => ({
    account: one(AccountTable, {
      fields: [AccountTransactionTable.accountId],
      references: [AccountTable.id],
    }),
    transaction: one(TransactionTable, {
      fields: [AccountTransactionTable.transactionId],
      references: [TransactionTable.id],
    }),
  })
);
