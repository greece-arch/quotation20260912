import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  getAllCustomers,
  upsertCustomer,
  deleteCustomerById,
  getAllVendors,
  upsertVendor,
  deleteVendorById,
  getAllProducts,
  upsertProduct,
  deleteProductById,
  getAllQuotations,
  upsertQuotation,
  deleteQuotationById,
  seedInitialDataIfEmpty,
} from './src/db/operations.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API 狀態檢查
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: 'postgresql', timestamp: new Date().toISOString() });
  });

  // ===================== 客戶 API =====================
  app.get('/api/customers', async (req, res) => {
    try {
      const data = await getAllCustomers();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message || '查詢客戶失敗' });
    }
  });

  app.post('/api/customers', async (req, res) => {
    try {
      const result = await upsertCustomer(req.body);
      res.json(result[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message || '儲存客戶失敗' });
    }
  });

  app.delete('/api/customers/:id', async (req, res) => {
    try {
      await deleteCustomerById(req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message || '刪除客戶失敗' });
    }
  });

  // ===================== 廠商 API =====================
  app.get('/api/vendors', async (req, res) => {
    try {
      const data = await getAllVendors();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message || '查詢廠商失敗' });
    }
  });

  app.post('/api/vendors', async (req, res) => {
    try {
      const result = await upsertVendor(req.body);
      res.json(result[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message || '儲存廠商失敗' });
    }
  });

  app.delete('/api/vendors/:id', async (req, res) => {
    try {
      await deleteVendorById(req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message || '刪除廠商失敗' });
    }
  });

  // ===================== 產品 API =====================
  app.get('/api/products', async (req, res) => {
    try {
      const data = await getAllProducts();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message || '查詢產品失敗' });
    }
  });

  app.post('/api/products', async (req, res) => {
    try {
      const result = await upsertProduct(req.body);
      res.json(result[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message || '儲存產品失敗' });
    }
  });

  app.delete('/api/products/:id', async (req, res) => {
    try {
      await deleteProductById(req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message || '刪除產品失敗' });
    }
  });

  // ===================== 報價單 API =====================
  app.get('/api/quotations', async (req, res) => {
    try {
      const data = await getAllQuotations();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message || '查詢報價單失敗' });
    }
  });

  app.post('/api/quotations', async (req, res) => {
    try {
      const result = await upsertQuotation(req.body);
      res.json(result[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message || '儲存報價單失敗' });
    }
  });

  app.delete('/api/quotations/:id', async (req, res) => {
    try {
      await deleteQuotationById(req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message || '刪除報價單失敗' });
    }
  });

  // 初始示範資料填充
  app.post('/api/seed', async (req, res) => {
    try {
      await seedInitialDataIfEmpty(req.body);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message || '填充初始資料失敗' });
    }
  });

  // Vite 中介軟體 (開發階段使用 Vite middleware 支援 HMR 與靜態資源)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express + Vite server running on http://localhost:${PORT}`);
  });
}

startServer();
