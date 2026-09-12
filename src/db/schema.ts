import { pgTable, text, integer, doublePrecision, timestamp, jsonb } from 'drizzle-orm/pg-core';

// 使用者表 (與 Firebase Auth uid 對應)
export const users = pgTable('users', {
  uid: text('uid').primaryKey(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  photoUrl: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 客戶資料表
export const customers = pgTable('customers', {
  id: text('id').primaryKey(), // 例如 CUST-0001
  companyName: text('company_name').notNull(),
  englishName: text('english_name'),
  contactPerson: text('contact_person').notNull(),
  contactPersonEn: text('contact_person_en'),
  department: text('department'),
  jobTitle: text('job_title'),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  taxId: text('tax_id').notNull(),
  address: text('address'),
  paymentTerms: text('payment_terms').notNull().default('月結30天'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 廠商資料表
export const vendors = pgTable('vendors', {
  id: text('id').primaryKey(), // 例如 VEND-0001
  companyName: text('company_name').notNull(),
  englishName: text('english_name'),
  contactPerson: text('contact_person').notNull(),
  contactPersonEn: text('contact_person_en'),
  department: text('department'),
  jobTitle: text('job_title'),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  taxId: text('tax_id').notNull(),
  address: text('address'),
  paymentTerms: text('payment_terms').notNull().default('月結30天'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 產品資料表
export const products = pgTable('products', {
  id: text('id').primaryKey(), // 例如 PROD-0001
  name: text('name').notNull(),
  cost: doublePrecision('cost').notNull().default(0),
  price: doublePrecision('price').notNull().default(0),
  unit: text('unit').notNull().default('個'),
  imageUrl: text('image_url'),
  brand: text('brand'),
  specification: text('specification'),
  description: text('description'),
  stock: integer('stock').notNull().default(0),
  supplierId: text('supplier_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 報價單資料表
export const quotations = pgTable('quotations', {
  id: text('id').primaryKey(), // 例如 QUO-202609-0001
  customerId: text('customer_id').notNull(),
  quoteDate: text('quote_date').notNull(),
  validUntil: text('valid_until'),
  salesRep: text('sales_rep').notNull(),
  salesPhone: text('sales_phone').notNull(),
  salesAddress: text('sales_address'),
  paymentTerms: text('payment_terms').notNull().default('月結30天'),
  status: text('status').notNull().default('草稿'),
  taxRate: doublePrecision('tax_rate').notNull().default(5),
  items: jsonb('items').notNull(), // 包含產品項目陣列
  subtotal: doublePrecision('subtotal').notNull().default(0),
  taxAmount: doublePrecision('tax_amount').notNull().default(0),
  grandTotal: doublePrecision('grand_total').notNull().default(0),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
