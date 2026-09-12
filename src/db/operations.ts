import { db } from '../db/index.ts';
import { customers, vendors, products, quotations, users } from '../db/schema.ts';
import { desc, eq } from 'drizzle-orm';

// 客戶操作
export async function getAllCustomers() {
  try {
    return await db.select().from(customers).orderBy(desc(customers.createdAt));
  } catch (error) {
    console.error('Failed to get customers:', error);
    throw new Error('無法取得客戶清單', { cause: error });
  }
}

export async function upsertCustomer(data: typeof customers.$inferInsert) {
  try {
    return await db
      .insert(customers)
      .values(data)
      .onConflictDoUpdate({
        target: customers.id,
        set: {
          companyName: data.companyName,
          englishName: data.englishName,
          contactPerson: data.contactPerson,
          contactPersonEn: data.contactPersonEn,
          department: data.department,
          jobTitle: data.jobTitle,
          phone: data.phone,
          email: data.email,
          taxId: data.taxId,
          address: data.address,
          paymentTerms: data.paymentTerms,
          notes: data.notes,
          updatedAt: new Date(),
        },
      })
      .returning();
  } catch (error) {
    console.error('Failed to upsert customer:', error);
    throw new Error('儲存客戶資料失敗', { cause: error });
  }
}

export async function deleteCustomerById(id: string) {
  try {
    return await db.delete(customers).where(eq(customers.id, id)).returning();
  } catch (error) {
    console.error('Failed to delete customer:', error);
    throw new Error('刪除客戶失敗', { cause: error });
  }
}

// 廠商操作
export async function getAllVendors() {
  try {
    return await db.select().from(vendors).orderBy(desc(vendors.createdAt));
  } catch (error) {
    console.error('Failed to get vendors:', error);
    throw new Error('無法取得廠商清單', { cause: error });
  }
}

export async function upsertVendor(data: typeof vendors.$inferInsert) {
  try {
    return await db
      .insert(vendors)
      .values(data)
      .onConflictDoUpdate({
        target: vendors.id,
        set: {
          companyName: data.companyName,
          englishName: data.englishName,
          contactPerson: data.contactPerson,
          contactPersonEn: data.contactPersonEn,
          department: data.department,
          jobTitle: data.jobTitle,
          phone: data.phone,
          email: data.email,
          taxId: data.taxId,
          address: data.address,
          paymentTerms: data.paymentTerms,
          notes: data.notes,
          updatedAt: new Date(),
        },
      })
      .returning();
  } catch (error) {
    console.error('Failed to upsert vendor:', error);
    throw new Error('儲存廠商資料失敗', { cause: error });
  }
}

export async function deleteVendorById(id: string) {
  try {
    return await db.delete(vendors).where(eq(vendors.id, id)).returning();
  } catch (error) {
    console.error('Failed to delete vendor:', error);
    throw new Error('刪除廠商失敗', { cause: error });
  }
}

// 產品操作
export async function getAllProducts() {
  try {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  } catch (error) {
    console.error('Failed to get products:', error);
    throw new Error('無法取得產品清單', { cause: error });
  }
}

export async function upsertProduct(data: typeof products.$inferInsert) {
  try {
    return await db
      .insert(products)
      .values(data)
      .onConflictDoUpdate({
        target: products.id,
        set: {
          name: data.name,
          cost: data.cost,
          price: data.price,
          unit: data.unit,
          imageUrl: data.imageUrl,
          brand: data.brand,
          specification: data.specification,
          description: data.description,
          stock: data.stock,
          supplierId: data.supplierId,
          updatedAt: new Date(),
        },
      })
      .returning();
  } catch (error) {
    console.error('Failed to upsert product:', error);
    throw new Error('儲存產品資料失敗', { cause: error });
  }
}

export async function deleteProductById(id: string) {
  try {
    return await db.delete(products).where(eq(products.id, id)).returning();
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw new Error('刪除產品失敗', { cause: error });
  }
}

// 報價單操作
export async function getAllQuotations() {
  try {
    return await db.select().from(quotations).orderBy(desc(quotations.createdAt));
  } catch (error) {
    console.error('Failed to get quotations:', error);
    throw new Error('無法取得報價單清單', { cause: error });
  }
}

export async function upsertQuotation(data: typeof quotations.$inferInsert) {
  try {
    return await db
      .insert(quotations)
      .values(data)
      .onConflictDoUpdate({
        target: quotations.id,
        set: {
          customerId: data.customerId,
          quoteDate: data.quoteDate,
          validUntil: data.validUntil,
          salesRep: data.salesRep,
          salesPhone: data.salesPhone,
          salesAddress: data.salesAddress,
          paymentTerms: data.paymentTerms,
          status: data.status,
          taxRate: data.taxRate,
          items: data.items,
          subtotal: data.subtotal,
          taxAmount: data.taxAmount,
          grandTotal: data.grandTotal,
          notes: data.notes,
          updatedAt: new Date(),
        },
      })
      .returning();
  } catch (error) {
    console.error('Failed to upsert quotation:', error);
    throw new Error('儲存報價單失敗', { cause: error });
  }
}

export async function deleteQuotationById(id: string) {
  try {
    return await db.delete(quotations).where(eq(quotations.id, id)).returning();
  } catch (error) {
    console.error('Failed to delete quotation:', error);
    throw new Error('刪除報價單失敗', { cause: error });
  }
}

// 批次初始化初始資料 (若資料庫為空)
export async function seedInitialDataIfEmpty(initialData: {
  customers: Array<typeof customers.$inferInsert>;
  vendors: Array<typeof vendors.$inferInsert>;
  products: Array<typeof products.$inferInsert>;
  quotations: Array<typeof quotations.$inferInsert>;
}) {
  try {
    const existingCust = await db.select().from(customers).limit(1);
    if (existingCust.length === 0) {
      if (initialData.customers.length > 0) {
        await db.insert(customers).values(initialData.customers).onConflictDoNothing();
      }
      if (initialData.vendors.length > 0) {
        await db.insert(vendors).values(initialData.vendors).onConflictDoNothing();
      }
      if (initialData.products.length > 0) {
        await db.insert(products).values(initialData.products).onConflictDoNothing();
      }
      if (initialData.quotations.length > 0) {
        await db.insert(quotations).values(initialData.quotations).onConflictDoNothing();
      }
      console.log('Seeded initial data into Cloud SQL PostgreSQL database.');
    }
  } catch (err) {
    console.error('Error seeding initial data:', err);
  }
}
