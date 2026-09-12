/**
 * ============================================================================
 * 報價單管理系統 (Quotation Management System)
 * 純前端 JavaScript 核心模組 - 嚴格無框架原生實作 (HTML / CSS / JS / Bootstrap 5 / Font Awesome)
 * 功能：客戶管理 / 廠商管理 / 產品管理 / 報價單管理 / 交易管理 (規劃中)
 * 特色：
 *  1. 彈窗全員配置 modal-dialog-scrollable 與自訂平滑滾動軸，內容過長順暢瀏覽
 *  2. 報價單完整具備報價人員姓名、聯絡電話及營業住址
 *  3. 付款方式全面支援「先付款後出貨」
 *  4. 客戶與廠商聯絡窗口全面擴充「窗口英文名」欄位
 *  5. 客戶與廠商列表移除登記住址，確保列表清爽無水平滾動跑版
 *  6. 所有功能列表頁比照客戶管理列表格式統一（樣式、操作按鈕群組、卡片結構）
 *  7. 商品圖片支援本地端檔案上傳與 Base64 即時預覽儲存
 *  8. Dashboard 統計卡片全面使用 Font Awesome 專業圖示
 * ============================================================================
 */

// 預設示範資料 (若 localStorage 無資料時自動載入)
const INITIAL_CUSTOMERS = [
  {
    id: "CUST-0001",
    companyName: "聯鼎資訊科技股份有限公司",
    contactPerson: "林志豪",
    contactPersonEn: "David Lin",
    englishName: "Apex InfoTech Corp.",
    department: "資訊技術處",
    jobTitle: "資深架構經理",
    phone: "02-2788-9901",
    email: "ch.lin@apextech.com.tw",
    taxId: "84729103",
    address: "台北市南港區園區街 3 號 8 樓",
    paymentTerms: "月結30天",
    notes: "重點長期合作夥伴，優先處理報價與技術支援。"
  },
  {
    id: "CUST-0002",
    companyName: "宏遠智造自動化有限公司",
    contactPerson: "陳雅婷",
    contactPersonEn: "Tina Chen",
    englishName: "Horizon Automation Ltd.",
    department: "生產研發部",
    jobTitle: "專案協理",
    phone: "03-568-7123",
    email: "yating.chen@horizon-auto.tw",
    taxId: "53928174",
    address: "新竹市科學園區研新一路 12 號",
    paymentTerms: "先付款後出貨",
    notes: "每年固定採購工業控制與感測模組，採用先付款後出貨專案模式。"
  },
  {
    id: "CUST-0003",
    companyName: "創億生醫實業股份有限公司",
    contactPerson: "黃國彰",
    contactPersonEn: "KC Huang",
    englishName: "BioGenesis Corp.",
    department: "採購處",
    jobTitle: "採購副理",
    phone: "04-2359-8822",
    email: "kc.huang@biogenesis.com.tw",
    taxId: "24891045",
    address: "台中市西屯區台灣大道四段 925 號",
    paymentTerms: "月結60天",
    notes: "定期更新企業伺服器與資訊備援硬體。"
  }
];

const INITIAL_VENDORS = [
  {
    id: "VEND-0001",
    companyName: "台灣精工半導體元件股份有限公司",
    contactPerson: "張家榮",
    contactPersonEn: "Eric Chang",
    englishName: "Taiwan Precision Semi Co.",
    department: "業務二部",
    jobTitle: "業務協理",
    phone: "02-8751-2233",
    email: "sales@tw-precision.com.tw",
    taxId: "12345678",
    address: "台北市內湖區行愛路 78 號 5 樓",
    paymentTerms: "月結30天",
    notes: "主要供應工業感測晶片與邊緣運算處理核心。"
  },
  {
    id: "VEND-0002",
    companyName: "聯網雲端通訊設備有限公司",
    contactPerson: "周信宏",
    contactPersonEn: "Simon Chou",
    englishName: "UniNet Telecom Equip.",
    department: "通路經銷部",
    jobTitle: "資深銷售代表",
    phone: "03-667-8899",
    email: "service@uninet.com.tw",
    taxId: "87654321",
    address: "新竹縣竹北市高鐵七路 66 號",
    paymentTerms: "先付款後出貨",
    notes: "提供企業級防火牆、高速交換機與光纖模組。"
  },
  {
    id: "VEND-0003",
    companyName: "研拓強固型工業電腦股份有限公司",
    contactPerson: "廖淑惠",
    contactPersonEn: "Grace Liao",
    englishName: "AdvanRugged IPC Inc.",
    department: "國內事業處",
    jobTitle: "行銷經理",
    phone: "02-2218-5566",
    email: "sh.liao@advanrugged.tw",
    taxId: "23456789",
    address: "新北市新店區寶橋路 235 巷 16 號",
    paymentTerms: "月結45天",
    notes: "伺服器整機與工業觸控平板優良配合原廠。"
  }
];

const INITIAL_PRODUCTS = [
  {
    id: "PROD-0001",
    name: "企業級高效能機架式伺服器 (2U)",
    cost: 85000,
    price: 128000,
    unit: "台",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80",
    brand: "AdvanRugged",
    specification: "雙路 Intel Xeon Silver / 128GB ECC RAM / 4x 1.92TB NVMe SSD / 冗餘白金電源",
    description: "專為企業中大型資料庫運算與虛擬化部署設計，具備高可靠度與熱抽換擴充性。",
    stock: 12,
    supplierId: "VEND-0003"
  },
  {
    id: "PROD-0002",
    name: "AIoT 工業環境智能感測主機",
    cost: 16500,
    price: 25800,
    unit: "組",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80",
    brand: "TW-Precision",
    specification: "支援 Modbus / MQTT / 內建溫濕度、振動、電壓即時監控 / IP67 防水防塵",
    description: "自動化產線關鍵設備預測性維護必備，可無縫串接 SCADA 及雲端監控儀表板。",
    stock: 45,
    supplierId: "VEND-0001"
  },
  {
    id: "PROD-0003",
    name: "新世代次世代安全防護防火牆",
    cost: 48000,
    price: 72000,
    unit: "台",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop&q=80",
    brand: "UniNet",
    specification: "吞吐量 10Gbps / 具備 SSL 深度檢測、IPS 入侵防禦、零信任網路存取 (ZTNA)",
    description: "提供金融級企業外網防護與 VPN 安全隧道，阻擋勒索軟體與異常流量連線。",
    stock: 18,
    supplierId: "VEND-0002"
  },
  {
    id: "PROD-0004",
    name: "15.6吋 工業防眩光電容式觸控平板",
    cost: 19800,
    price: 31500,
    unit: "台",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80",
    brand: "AdvanRugged",
    specification: "全平面鋼化玻璃 / 1000 nits 高亮度陽光可視 / 寬溫工作 -20℃~60℃",
    description: "智慧製造人機介面 (HMI)，支援手套操作與耐酸鹼清潔維護。",
    stock: 26,
    supplierId: "VEND-0003"
  }
];

const INITIAL_QUOTATIONS = [
  {
    id: "QUO-202609-0001",
    customerId: "CUST-0001",
    quoteDate: "2026-09-10",
    validUntil: "2026-10-10",
    salesRep: "王少華",
    salesPhone: "0912-345-678",
    salesAddress: "台北市南港區軟體園區二期 H 棟 9 樓",
    paymentTerms: "月結30天",
    status: "已確認",
    taxRate: 5,
    items: [
      {
        productId: "PROD-0001",
        itemDesc: "雙路 Intel Xeon Silver / 128GB ECC RAM / 4x 1.92TB NVMe SSD",
        unit: "台",
        unitPrice: 128000,
        quantity: 2,
        subtotal: 256000
      },
      {
        productId: "PROD-0003",
        itemDesc: "吞吐量 10Gbps / 具備 SSL 深度檢測、IPS 入侵防禦",
        unit: "台",
        unitPrice: 72000,
        quantity: 1,
        subtotal: 72000
      }
    ],
    subtotal: 328000,
    taxAmount: 16400,
    grandTotal: 344400,
    notes: "1. 報價含原廠三年 5x8 零件保固與現場初次安裝設定服務。\n2. 如需延長 7x24 即時維運合約費用另議。"
  },
  {
    id: "QUO-202609-0002",
    customerId: "CUST-0002",
    quoteDate: "2026-09-12",
    validUntil: "2026-10-12",
    salesRep: "李孟達",
    salesPhone: "0933-888-999",
    salesAddress: "台北市信義區松仁路 100 號 28 樓",
    paymentTerms: "先付款後出貨",
    status: "已送出",
    taxRate: 5,
    items: [
      {
        productId: "PROD-0002",
        itemDesc: "支援 Modbus / MQTT / 內建溫濕度振動即時監控",
        unit: "組",
        unitPrice: 25800,
        quantity: 5,
        subtotal: 129000
      },
      {
        productId: "PROD-0004",
        itemDesc: "全平面鋼化玻璃 / 1000 nits 高亮度陽光可視",
        unit: "台",
        unitPrice: 31500,
        quantity: 2,
        subtotal: 63000
      }
    ],
    subtotal: 192000,
    taxAmount: 9600,
    grandTotal: 201600,
    notes: "採先付款後出貨方式，簽約並收到款項後 5 個工作日內安排出貨並交付現場工程驗收。"
  }
];

// 資料倉儲 (支援 PostgreSQL Cloud SQL 後端 API 同步與 LocalStorage 離線快取)
class DataStore {
  constructor() {
    this.apiAvailable = false;
    this.initStorage();
    this.syncFromPostgreSQL();
  }

  initStorage() {
    if (!localStorage.getItem("apex_customers")) {
      localStorage.setItem("apex_customers", JSON.stringify(INITIAL_CUSTOMERS));
    }
    if (!localStorage.getItem("apex_vendors")) {
      localStorage.setItem("apex_vendors", JSON.stringify(INITIAL_VENDORS));
    }
    if (!localStorage.getItem("apex_products")) {
      localStorage.setItem("apex_products", JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem("apex_quotations")) {
      localStorage.setItem("apex_quotations", JSON.stringify(INITIAL_QUOTATIONS));
    }
  }

  // 與 PostgreSQL 後端 API 進行雙向同步
  async syncFromPostgreSQL() {
    try {
      const healthRes = await fetch("/api/health");
      if (!healthRes.ok) return;
      this.apiAvailable = true;
      this.updateDbStatusBadge(true);

      // 初次嘗試播種種子資料至 Cloud SQL (若資料庫尚無資料)
      await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customers: this.getCustomers(),
          vendors: this.getVendors(),
          products: this.getProducts(),
          quotations: this.getQuotations(),
        }),
      });

      // 從 PostgreSQL 拉取最新資料並快取至 LocalStorage
      const [custRes, vendRes, prodRes, quoRes] = await Promise.all([
        fetch("/api/customers"),
        fetch("/api/vendors"),
        fetch("/api/products"),
        fetch("/api/quotations"),
      ]);

      if (custRes.ok) {
        const custs = await custRes.json();
        if (custs && custs.length > 0) this.saveCustomersLocally(custs);
      }
      if (vendRes.ok) {
        const vends = await vendRes.json();
        if (vends && vends.length > 0) this.saveVendorsLocally(vends);
      }
      if (prodRes.ok) {
        const prods = await prodRes.json();
        if (prods && prods.length > 0) this.saveProductsLocally(prods);
      }
      if (quoRes.ok) {
        const quos = await quoRes.json();
        if (quos && quos.length > 0) this.saveQuotationsLocally(quos);
      }

      // 觸發 UI 重新渲染
      if (typeof populateDropdowns === "function") populateDropdowns();
      if (typeof updateDashboardStats === "function") updateDashboardStats();
      if (typeof renderCustomerList === "function") renderCustomerList();
      if (typeof renderVendorList === "function") renderVendorList();
      if (typeof renderProductList === "function") renderProductList();
      if (typeof renderQuotationList === "function") renderQuotationList();
    } catch (err) {
      console.log("PostgreSQL API 處於本機離線或單機靜態模式，採用 LocalStorage 離線快取儲存。");
      this.apiAvailable = false;
      this.updateDbStatusBadge(false);
    }
  }

  updateDbStatusBadge(isOnline) {
    const badge = document.getElementById("dbStatusBadge");
    if (badge) {
      if (isOnline) {
        badge.className = "badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 d-inline-flex align-items-center gap-2 py-2 px-3";
        badge.innerHTML = '<span class="status-indicator-dot"></span><span id="dbStatusText" class="fw-semibold">雲端資料庫已連線 (即時同步)</span>';
      } else {
        badge.className = "badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 d-inline-flex align-items-center gap-2 py-2 px-3";
        badge.innerHTML = '<span class="status-indicator-dot"></span><span id="dbStatusText" class="fw-semibold">本地安全快取 (運作正常)</span>';
      }
    }
  }

  resetDefaultData() {
    localStorage.setItem("apex_customers", JSON.stringify(INITIAL_CUSTOMERS));
    localStorage.setItem("apex_vendors", JSON.stringify(INITIAL_VENDORS));
    localStorage.setItem("apex_products", JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem("apex_quotations", JSON.stringify(INITIAL_QUOTATIONS));
    this.syncFromPostgreSQL();
  }

  getCustomers() {
    try {
      return JSON.parse(localStorage.getItem("apex_customers")) || [];
    } catch (e) {
      return [];
    }
  }
  saveCustomersLocally(data) {
    localStorage.setItem("apex_customers", JSON.stringify(data));
  }
  saveCustomers(data) {
    this.saveCustomersLocally(data);
    // 異步同步至 PostgreSQL
    if (this.apiAvailable && Array.isArray(data)) {
      data.forEach(cust => {
        fetch("/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cust),
        }).catch(e => console.error("Sync customer to PG failed:", e));
      });
    }
  }

  getVendors() {
    try {
      return JSON.parse(localStorage.getItem("apex_vendors")) || [];
    } catch (e) {
      return [];
    }
  }
  saveVendorsLocally(data) {
    localStorage.setItem("apex_vendors", JSON.stringify(data));
  }
  saveVendors(data) {
    this.saveVendorsLocally(data);
    if (this.apiAvailable && Array.isArray(data)) {
      data.forEach(vend => {
        fetch("/api/vendors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vend),
        }).catch(e => console.error("Sync vendor to PG failed:", e));
      });
    }
  }

  getProducts() {
    try {
      return JSON.parse(localStorage.getItem("apex_products")) || [];
    } catch (e) {
      return [];
    }
  }
  saveProductsLocally(data) {
    localStorage.setItem("apex_products", JSON.stringify(data));
  }
  saveProducts(data) {
    this.saveProductsLocally(data);
    if (this.apiAvailable && Array.isArray(data)) {
      data.forEach(prod => {
        fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prod),
        }).catch(e => console.error("Sync product to PG failed:", e));
      });
    }
  }

  getQuotations() {
    try {
      return JSON.parse(localStorage.getItem("apex_quotations")) || [];
    } catch (e) {
      return [];
    }
  }
  saveQuotationsLocally(data) {
    localStorage.setItem("apex_quotations", JSON.stringify(data));
  }
  saveQuotations(data) {
    this.saveQuotationsLocally(data);
    if (this.apiAvailable && Array.isArray(data)) {
      data.forEach(quo => {
        fetch("/api/quotations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quo),
        }).catch(e => console.error("Sync quotation to PG failed:", e));
      });
    }
  }

  async deleteCustomer(id) {
    const list = this.getCustomers().filter(c => c.id !== id);
    this.saveCustomersLocally(list);
    if (this.apiAvailable) {
      fetch(`/api/customers/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(e => console.error(e));
    }
  }

  async deleteVendor(id) {
    const list = this.getVendors().filter(v => v.id !== id);
    this.saveVendorsLocally(list);
    if (this.apiAvailable) {
      fetch(`/api/vendors/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(e => console.error(e));
    }
  }

  async deleteProduct(id) {
    const list = this.getProducts().filter(p => p.id !== id);
    this.saveProductsLocally(list);
    if (this.apiAvailable) {
      fetch(`/api/products/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(e => console.error(e));
    }
  }

  async deleteQuotation(id) {
    const list = this.getQuotations().filter(q => q.id !== id);
    this.saveQuotationsLocally(list);
    if (this.apiAvailable) {
      fetch(`/api/quotations/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(e => console.error(e));
    }
  }

  generateId(type) {
    const pad = (num, size) => {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    };

    if (type === "customer") {
      const list = this.getCustomers();
      return "CUST-" + pad(list.length + 1, 4);
    } else if (type === "vendor") {
      const list = this.getVendors();
      return "VEND-" + pad(list.length + 1, 4);
    } else if (type === "product") {
      const list = this.getProducts();
      return "PROD-" + pad(list.length + 1, 4);
    } else if (type === "quotation") {
      const now = new Date();
      const ym = now.getFullYear() + pad(now.getMonth() + 1, 2);
      const list = this.getQuotations();
      return `QUO-${ym}-${pad(list.length + 1, 4)}`;
    }
    return "ID-" + Date.now();
  }
}

const store = new DataStore();

// 全域提示 Toast 顯示函式
function showToast(message, type = "success") {
  const toastEl = document.getElementById("actionToast");
  const msgEl = document.getElementById("toastMessage");
  if (!toastEl || !msgEl) return;

  toastEl.classList.remove("bg-success", "bg-danger", "bg-warning", "bg-primary", "text-white", "text-dark");

  if (type === "success") {
    toastEl.classList.add("bg-success", "text-white");
  } else if (type === "danger") {
    toastEl.classList.add("bg-danger", "text-white");
  } else if (type === "warning") {
    toastEl.classList.add("bg-warning", "text-dark");
  } else {
    toastEl.classList.add("bg-primary", "text-white");
  }

  msgEl.textContent = message;
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}

// 格式化千分位貨幣
function formatMoney(amount) {
  const num = Number(amount) || 0;
  return "NT$ " + num.toLocaleString("zh-TW");
}

// ============================================================================
// 1. 客戶管理模組 (Customer Management)
// ============================================================================
let editingCustomerId = null;

function renderCustomerList(keyword = "") {
  const listContainer = document.getElementById("customerTableBody");
  const mobileContainer = document.getElementById("customerMobileCards");
  const emptyState = document.getElementById("customerEmptyState");
  if (!listContainer) return;

  const customers = store.getCustomers();
  const filtered = customers.filter(c => {
    const target = `${c.id} ${c.companyName} ${c.englishName || ''} ${c.contactPerson} ${c.contactPersonEn || ''} ${c.taxId} ${c.phone}`.toLowerCase();
    return target.includes(keyword.toLowerCase().trim());
  });

  document.getElementById("customerCountBadge").textContent = `${filtered.length} 筆`;

  if (filtered.length === 0) {
    listContainer.innerHTML = "";
    if (mobileContainer) mobileContainer.innerHTML = "";
    if (emptyState) emptyState.classList.remove("d-none");
    return;
  }
  if (emptyState) emptyState.classList.add("d-none");

  let tableHtml = "";
  let mobileHtml = "";

  filtered.forEach(c => {
    const contactDisplay = c.contactPersonEn 
      ? `${escapeHtml(c.contactPerson)} <small class="text-muted">(${escapeHtml(c.contactPersonEn)})</small>` 
      : escapeHtml(c.contactPerson);

    tableHtml += `
      <tr>
        <td><span class="badge-code">${c.id}</span></td>
        <td>
          <div class="fw-semibold text-dark">${escapeHtml(c.companyName)}</div>
          <small class="text-muted">${escapeHtml(c.englishName || "-")}</small>
        </td>
        <td>
          <div>${contactDisplay}</div>
          <small class="text-muted">${escapeHtml(c.jobTitle || "-")}</small>
        </td>
        <td>
          <div><i class="fa-solid fa-phone me-1 text-muted"></i>${escapeHtml(c.phone)}</div>
          <small class="text-muted"><i class="fa-solid fa-envelope me-1"></i>${escapeHtml(c.email)}</small>
        </td>
        <td><code>${escapeHtml(c.taxId)}</code></td>
        <td><span class="badge ${c.paymentTerms === '先付款後出貨' ? 'bg-primary' : 'bg-secondary'}">${escapeHtml(c.paymentTerms)}</span></td>
        <td class="text-end">
          <div class="btn-group btn-group-sm" role="group">
            <button class="btn btn-outline-primary" onclick="viewCustomerDetail('${c.id}')" title="檢視詳細資料">
              <i class="fa-solid fa-eye me-1"></i>明細
            </button>
            <button class="btn btn-outline-secondary" onclick="openCustomerModal('${c.id}')" title="編輯資料">
              <i class="fa-solid fa-pen-to-square me-1"></i>編輯
            </button>
            <button class="btn btn-outline-danger" onclick="deleteCustomer('${c.id}')" title="刪除客戶">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;

    mobileHtml += `
      <div class="card mb-3 border shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge-code">${c.id}</span>
            <span class="badge ${c.paymentTerms === '先付款後出貨' ? 'bg-primary' : 'bg-secondary'}">${escapeHtml(c.paymentTerms)}</span>
          </div>
          <h6 class="fw-bold text-dark mb-1">${escapeHtml(c.companyName)}</h6>
          <div class="small text-muted mb-2">${escapeHtml(c.englishName || "")}</div>
          <div class="small mb-1">
            <i class="fa-solid fa-user text-muted me-1"></i>窗口：${contactDisplay} (${escapeHtml(c.jobTitle || "無職稱")})
          </div>
          <div class="small mb-2">
            <i class="fa-solid fa-phone text-muted me-1"></i>電話：${escapeHtml(c.phone)}
          </div>
          <div class="d-flex justify-content-end gap-1 pt-2 border-top">
            <button class="btn btn-sm btn-outline-primary" onclick="viewCustomerDetail('${c.id}')"><i class="fa-solid fa-eye me-1"></i>明細</button>
            <button class="btn btn-sm btn-outline-secondary" onclick="openCustomerModal('${c.id}')"><i class="fa-solid fa-pen-to-square me-1"></i>編輯</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteCustomer('${c.id}')"><i class="fa-solid fa-trash-can me-1"></i>刪除</button>
          </div>
        </div>
      </div>
    `;
  });

  listContainer.innerHTML = tableHtml;
  if (mobileContainer) mobileContainer.innerHTML = mobileHtml;
}

function openCustomerModal(id = null) {
  editingCustomerId = id;
  const form = document.getElementById("customerForm");
  form.classList.remove("was-validated");
  form.reset();

  const titleEl = document.getElementById("customerModalTitle");
  const idInput = document.getElementById("customerIdInput");

  if (id) {
    titleEl.innerHTML = '<i class="fa-solid fa-pen-to-square me-2 text-primary"></i>編輯客戶資料';
    const customer = store.getCustomers().find(c => c.id === id);
    if (customer) {
      idInput.value = customer.id;
      document.getElementById("custCompanyName").value = customer.companyName || "";
      document.getElementById("custEnglishName").value = customer.englishName || "";
      document.getElementById("custContactPerson").value = customer.contactPerson || "";
      document.getElementById("custContactPersonEn").value = customer.contactPersonEn || "";
      document.getElementById("custDepartment").value = customer.department || "";
      document.getElementById("custJobTitle").value = customer.jobTitle || "";
      document.getElementById("custPhone").value = customer.phone || "";
      document.getElementById("custEmail").value = customer.email || "";
      document.getElementById("custTaxId").value = customer.taxId || "";
      document.getElementById("custAddress").value = customer.address || "";
      document.getElementById("custPaymentTerms").value = customer.paymentTerms || "月結30天";
      document.getElementById("custNotes").value = customer.notes || "";
    }
  } else {
    titleEl.innerHTML = '<i class="fa-solid fa-user-plus me-2 text-primary"></i>新增客戶';
    idInput.value = store.generateId("customer");
  }

  const modal = new bootstrap.Modal(document.getElementById("customerModal"));
  modal.show();
}

function saveCustomer() {
  const form = document.getElementById("customerForm");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    showToast("請檢視並填寫所有標註 (*) 之必填欄位，並確保格式正確！", "warning");
    return;
  }

  const taxId = document.getElementById("custTaxId").value.trim();
  if (!/^\d{8}$/.test(taxId)) {
    document.getElementById("custTaxId").classList.add("is-invalid");
    showToast("統一編號格式錯誤！請輸入 8 碼數字。", "danger");
    return;
  } else {
    document.getElementById("custTaxId").classList.remove("is-invalid");
  }

  const customers = store.getCustomers();
  const customerData = {
    id: document.getElementById("customerIdInput").value,
    companyName: document.getElementById("custCompanyName").value.trim(),
    englishName: document.getElementById("custEnglishName").value.trim(),
    contactPerson: document.getElementById("custContactPerson").value.trim(),
    contactPersonEn: document.getElementById("custContactPersonEn").value.trim(),
    department: document.getElementById("custDepartment").value.trim(),
    jobTitle: document.getElementById("custJobTitle").value.trim(),
    phone: document.getElementById("custPhone").value.trim(),
    email: document.getElementById("custEmail").value.trim(),
    taxId: taxId,
    address: document.getElementById("custAddress").value.trim(),
    paymentTerms: document.getElementById("custPaymentTerms").value.trim(),
    notes: document.getElementById("custNotes").value.trim()
  };

  if (editingCustomerId) {
    const idx = customers.findIndex(c => c.id === editingCustomerId);
    if (idx !== -1) {
      customers[idx] = customerData;
      store.saveCustomers(customers);
      showToast(`客戶資料 [${customerData.companyName}] 已成功更新！`, "success");
    }
  } else {
    customers.push(customerData);
    store.saveCustomers(customers);
    showToast(`新客戶 [${customerData.companyName}] 已成功建檔！`, "success");
  }

  bootstrap.Modal.getInstance(document.getElementById("customerModal")).hide();
  renderCustomerList();
  updateDashboardStats();
  populateDropdowns();
}

function deleteCustomer(id) {
  const customer = store.getCustomers().find(c => c.id === id);
  if (!customer) return;

  const quotes = store.getQuotations().filter(q => q.customerId === id);
  let warningExtra = "";
  if (quotes.length > 0) {
    warningExtra = `\n\n⚠️ 注意：此客戶目前關聯了 ${quotes.length} 張報價單，刪除客戶將保留既有報價單之歷史快照。`;
  }

  if (confirm(`確定要刪除客戶「${customer.companyName} (${customer.id})」嗎？此操作無法復原。${warningExtra}`)) {
    store.deleteCustomer(id);
    showToast(`客戶 [${customer.companyName}] 已刪除。`, "danger");
    renderCustomerList();
    updateDashboardStats();
    populateDropdowns();
  }
}

function viewCustomerDetail(id) {
  const customer = store.getCustomers().find(c => c.id === id);
  if (!customer) return;

  const content = document.getElementById("customerDetailContent");
  const relatedQuotes = store.getQuotations().filter(q => q.customerId === id);

  let quotesHtml = "";
  if (relatedQuotes.length === 0) {
    quotesHtml = '<div class="text-muted small">尚無關聯報價單</div>';
  } else {
    quotesHtml = `
      <div class="list-group list-group-flush border rounded">
        ${relatedQuotes.map(q => `
          <div class="list-group-item d-flex justify-content-between align-items-center py-2">
            <div>
              <span class="badge-code me-2">${q.id}</span>
              <span class="text-muted small">${q.quoteDate}</span>
            </div>
            <div>
              <span class="fw-bold text-primary me-3">${formatMoney(q.grandTotal)}</span>
              <button class="btn btn-sm btn-outline-primary" onclick="viewQuotationDetail('${q.id}')">檢視報價單</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  content.innerHTML = `
    <div class="row g-3">
      <div class="col-md-6">
        <label class="text-muted small">客戶代碼</label>
        <div class="fw-bold"><span class="badge-code">${customer.id}</span></div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">統一編號</label>
        <div class="fw-bold"><code>${escapeHtml(customer.taxId)}</code></div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">公司名稱</label>
        <h5 class="fw-bold text-primary mb-1">${escapeHtml(customer.companyName)}</h5>
        <div class="text-muted small">${escapeHtml(customer.englishName || "未提供英文名稱")}</div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">聯絡窗口</label>
        <div class="fw-bold">
          ${escapeHtml(customer.contactPerson)} 
          ${customer.contactPersonEn ? `<span class="text-muted">(${escapeHtml(customer.contactPersonEn)})</span>` : ''}
          <span class="badge bg-secondary ms-1">${escapeHtml(customer.jobTitle || "無職稱")}</span>
        </div>
        <div class="text-muted small">${escapeHtml(customer.department || "未指定部門")}</div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">電話</label>
        <div><i class="fa-solid fa-phone text-muted me-1"></i>${escapeHtml(customer.phone)}</div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">電子郵件</label>
        <div><i class="fa-solid fa-envelope text-muted me-1"></i><a href="mailto:${escapeHtml(customer.email)}">${escapeHtml(customer.email)}</a></div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">付款條件</label>
        <div><span class="badge ${customer.paymentTerms === '先付款後出貨' ? 'bg-primary' : 'bg-secondary'}">${escapeHtml(customer.paymentTerms)}</span></div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">登記通訊住址</label>
        <div><i class="fa-solid fa-location-dot text-muted me-1"></i>${escapeHtml(customer.address)}</div>
      </div>
      <div class="col-12">
        <label class="text-muted small">備註記錄</label>
        <div class="p-2 bg-light rounded border small">${escapeHtml(customer.notes || "無特別備註")}</div>
      </div>
      <div class="col-12">
        <label class="text-muted small fw-bold mb-1">歷史關聯報價單 (${relatedQuotes.length} 筆)</label>
        ${quotesHtml}
      </div>
    </div>
  `;

  new bootstrap.Modal(document.getElementById("customerDetailModal")).show();
}

// ============================================================================
// 2. 廠商管理模組 (Vendor Management)
// ============================================================================
let editingVendorId = null;

function renderVendorList(keyword = "") {
  const listContainer = document.getElementById("vendorTableBody");
  const mobileContainer = document.getElementById("vendorMobileCards");
  const emptyState = document.getElementById("vendorEmptyState");
  if (!listContainer) return;

  const vendors = store.getVendors();
  const filtered = vendors.filter(v => {
    const target = `${v.id} ${v.companyName} ${v.englishName || ''} ${v.contactPerson} ${v.contactPersonEn || ''} ${v.taxId} ${v.phone}`.toLowerCase();
    return target.includes(keyword.toLowerCase().trim());
  });

  document.getElementById("vendorCountBadge").textContent = `${filtered.length} 筆`;

  if (filtered.length === 0) {
    listContainer.innerHTML = "";
    if (mobileContainer) mobileContainer.innerHTML = "";
    if (emptyState) emptyState.classList.remove("d-none");
    return;
  }
  if (emptyState) emptyState.classList.add("d-none");

  let tableHtml = "";
  let mobileHtml = "";

  filtered.forEach(v => {
    const contactDisplay = v.contactPersonEn 
      ? `${escapeHtml(v.contactPerson)} <small class="text-muted">(${escapeHtml(v.contactPersonEn)})</small>` 
      : escapeHtml(v.contactPerson);

    // 比照客戶管理列表格式：無登記住址、統一代碼、名稱、窗口、按鈕群組
    tableHtml += `
      <tr>
        <td><span class="badge-code">${v.id}</span></td>
        <td>
          <div class="fw-semibold text-dark">${escapeHtml(v.companyName)}</div>
          <small class="text-muted">${escapeHtml(v.englishName || "-")}</small>
        </td>
        <td>
          <div>${contactDisplay}</div>
          <small class="text-muted">${escapeHtml(v.jobTitle || "-")}</small>
        </td>
        <td>
          <div><i class="fa-solid fa-phone me-1 text-muted"></i>${escapeHtml(v.phone)}</div>
          <small class="text-muted"><i class="fa-solid fa-envelope me-1"></i>${escapeHtml(v.email)}</small>
        </td>
        <td><code>${escapeHtml(v.taxId)}</code></td>
        <td><span class="badge ${v.paymentTerms === '先付款後出貨' ? 'bg-primary' : 'bg-secondary'}">${escapeHtml(v.paymentTerms)}</span></td>
        <td class="text-end">
          <div class="btn-group btn-group-sm" role="group">
            <button class="btn btn-outline-primary" onclick="viewVendorDetail('${v.id}')" title="檢視詳細資料">
              <i class="fa-solid fa-eye me-1"></i>明細
            </button>
            <button class="btn btn-outline-secondary" onclick="openVendorModal('${v.id}')" title="編輯資料">
              <i class="fa-solid fa-pen-to-square me-1"></i>編輯
            </button>
            <button class="btn btn-outline-danger" onclick="deleteVendor('${v.id}')" title="刪除廠商">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;

    mobileHtml += `
      <div class="card mb-3 border shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge-code">${v.id}</span>
            <span class="badge ${v.paymentTerms === '先付款後出貨' ? 'bg-primary' : 'bg-secondary'}">${escapeHtml(v.paymentTerms)}</span>
          </div>
          <h6 class="fw-bold text-dark mb-1">${escapeHtml(v.companyName)}</h6>
          <div class="small text-muted mb-2">${escapeHtml(v.englishName || "")}</div>
          <div class="small mb-1">
            <i class="fa-solid fa-user text-muted me-1"></i>窗口：${contactDisplay} (${escapeHtml(v.jobTitle || "無職稱")})
          </div>
          <div class="small mb-2">
            <i class="fa-solid fa-phone text-muted me-1"></i>電話：${escapeHtml(v.phone)}
          </div>
          <div class="d-flex justify-content-end gap-1 pt-2 border-top">
            <button class="btn btn-sm btn-outline-primary" onclick="viewVendorDetail('${v.id}')"><i class="fa-solid fa-eye me-1"></i>明細</button>
            <button class="btn btn-sm btn-outline-secondary" onclick="openVendorModal('${v.id}')"><i class="fa-solid fa-pen-to-square me-1"></i>編輯</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteVendor('${v.id}')"><i class="fa-solid fa-trash-can me-1"></i>刪除</button>
          </div>
        </div>
      </div>
    `;
  });

  listContainer.innerHTML = tableHtml;
  if (mobileContainer) mobileContainer.innerHTML = mobileHtml;
}

function openVendorModal(id = null) {
  editingVendorId = id;
  const form = document.getElementById("vendorForm");
  form.classList.remove("was-validated");
  form.reset();

  const titleEl = document.getElementById("vendorModalTitle");
  const idInput = document.getElementById("vendorIdInput");

  if (id) {
    titleEl.innerHTML = '<i class="fa-solid fa-pen-to-square me-2 text-primary"></i>編輯廠商資料';
    const vendor = store.getVendors().find(v => v.id === id);
    if (vendor) {
      idInput.value = vendor.id;
      document.getElementById("vendCompanyName").value = vendor.companyName || "";
      document.getElementById("vendEnglishName").value = vendor.englishName || "";
      document.getElementById("vendContactPerson").value = vendor.contactPerson || "";
      document.getElementById("vendContactPersonEn").value = vendor.contactPersonEn || "";
      document.getElementById("vendDepartment").value = vendor.department || "";
      document.getElementById("vendJobTitle").value = vendor.jobTitle || "";
      document.getElementById("vendPhone").value = vendor.phone || "";
      document.getElementById("vendEmail").value = vendor.email || "";
      document.getElementById("vendTaxId").value = vendor.taxId || "";
      document.getElementById("vendAddress").value = vendor.address || "";
      document.getElementById("vendPaymentTerms").value = vendor.paymentTerms || "月結30天";
      document.getElementById("vendNotes").value = vendor.notes || "";
    }
  } else {
    titleEl.innerHTML = '<i class="fa-solid fa-plus me-2 text-primary"></i>新增廠商';
    idInput.value = store.generateId("vendor");
  }

  new bootstrap.Modal(document.getElementById("vendorModal")).show();
}

function saveVendor() {
  const form = document.getElementById("vendorForm");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    showToast("請檢視並填寫所有標註 (*) 之必填欄位！", "warning");
    return;
  }

  const taxId = document.getElementById("vendTaxId").value.trim();
  if (!/^\d{8}$/.test(taxId)) {
    document.getElementById("vendTaxId").classList.add("is-invalid");
    showToast("統一編號格式錯誤！請輸入 8 碼數字。", "danger");
    return;
  } else {
    document.getElementById("vendTaxId").classList.remove("is-invalid");
  }

  const vendors = store.getVendors();
  const vendorData = {
    id: document.getElementById("vendorIdInput").value,
    companyName: document.getElementById("vendCompanyName").value.trim(),
    englishName: document.getElementById("vendEnglishName").value.trim(),
    contactPerson: document.getElementById("vendContactPerson").value.trim(),
    contactPersonEn: document.getElementById("vendContactPersonEn").value.trim(),
    department: document.getElementById("vendDepartment").value.trim(),
    jobTitle: document.getElementById("vendJobTitle").value.trim(),
    phone: document.getElementById("vendPhone").value.trim(),
    email: document.getElementById("vendEmail").value.trim(),
    taxId: taxId,
    address: document.getElementById("vendAddress").value.trim(),
    paymentTerms: document.getElementById("vendPaymentTerms").value.trim(),
    notes: document.getElementById("vendNotes").value.trim()
  };

  if (editingVendorId) {
    const idx = vendors.findIndex(v => v.id === editingVendorId);
    if (idx !== -1) {
      vendors[idx] = vendorData;
      store.saveVendors(vendors);
      showToast(`廠商資料 [${vendorData.companyName}] 已成功更新！`, "success");
    }
  } else {
    vendors.push(vendorData);
    store.saveVendors(vendors);
    showToast(`新廠商 [${vendorData.companyName}] 已成功建檔！`, "success");
  }

  bootstrap.Modal.getInstance(document.getElementById("vendorModal")).hide();
  renderVendorList();
  updateDashboardStats();
  populateDropdowns();
}

function deleteVendor(id) {
  const vendor = store.getVendors().find(v => v.id === id);
  if (!vendor) return;

  const products = store.getProducts().filter(p => p.supplierId === id);
  let warningExtra = "";
  if (products.length > 0) {
    warningExtra = `\n\n⚠️ 注意：此廠商旗下有 ${products.length} 項供應產品，刪除廠商將解除其產品之供應商綁定。`;
  }

  if (confirm(`確定要刪除廠商「${vendor.companyName} (${vendor.id})」嗎？此操作無法復原。${warningExtra}`)) {
    store.deleteVendor(id);
    showToast(`廠商 [${vendor.companyName}] 已刪除。`, "danger");
    renderVendorList();
    updateDashboardStats();
    populateDropdowns();
  }
}

function viewVendorDetail(id) {
  const vendor = store.getVendors().find(v => v.id === id);
  if (!vendor) return;

  const suppliedProducts = store.getProducts().filter(p => p.supplierId === id);
  let prodHtml = "";
  if (suppliedProducts.length === 0) {
    prodHtml = '<div class="text-muted small">尚無供應產品</div>';
  } else {
    prodHtml = `
      <div class="list-group list-group-flush border rounded">
        ${suppliedProducts.map(p => `
          <div class="list-group-item d-flex justify-content-between align-items-center py-2">
            <div>
              <span class="badge-code me-2">${p.id}</span>
              <span class="fw-bold">${escapeHtml(p.name)}</span>
            </div>
            <div>
              <span class="text-muted small me-3">成本: ${formatMoney(p.cost)}</span>
              <button class="btn btn-sm btn-outline-primary" onclick="viewProductDetail('${p.id}')">產品明細</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  const content = document.getElementById("vendorDetailContent");
  content.innerHTML = `
    <div class="row g-3">
      <div class="col-md-6">
        <label class="text-muted small">廠商代碼</label>
        <div class="fw-bold"><span class="badge-code">${vendor.id}</span></div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">統一編號</label>
        <div class="fw-bold"><code>${escapeHtml(vendor.taxId)}</code></div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">公司名稱</label>
        <h5 class="fw-bold text-primary mb-1">${escapeHtml(vendor.companyName)}</h5>
        <div class="text-muted small">${escapeHtml(vendor.englishName || "未提供英文名稱")}</div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">聯絡窗口</label>
        <div class="fw-bold">
          ${escapeHtml(vendor.contactPerson)}
          ${vendor.contactPersonEn ? `<span class="text-muted">(${escapeHtml(vendor.contactPersonEn)})</span>` : ''}
          <span class="badge bg-secondary ms-1">${escapeHtml(vendor.jobTitle || "無職稱")}</span>
        </div>
        <div class="text-muted small">${escapeHtml(vendor.department || "未指定部門")}</div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">電話</label>
        <div><i class="fa-solid fa-phone text-muted me-1"></i>${escapeHtml(vendor.phone)}</div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">電子郵件</label>
        <div><i class="fa-solid fa-envelope text-muted me-1"></i><a href="mailto:${escapeHtml(vendor.email)}">${escapeHtml(vendor.email)}</a></div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">付款條件</label>
        <div><span class="badge ${vendor.paymentTerms === '先付款後出貨' ? 'bg-primary' : 'bg-secondary'}">${escapeHtml(vendor.paymentTerms)}</span></div>
      </div>
      <div class="col-md-6">
        <label class="text-muted small">登記通訊住址</label>
        <div><i class="fa-solid fa-location-dot text-muted me-1"></i>${escapeHtml(vendor.address)}</div>
      </div>
      <div class="col-12">
        <label class="text-muted small">備註</label>
        <div class="p-2 bg-light rounded border small">${escapeHtml(vendor.notes || "無特別備註")}</div>
      </div>
      <div class="col-12">
        <label class="text-muted small fw-bold mb-1">供應產品品項 (${suppliedProducts.length} 項)</label>
        ${prodHtml}
      </div>
    </div>
  `;

  new bootstrap.Modal(document.getElementById("vendorDetailModal")).show();
}

// ============================================================================
// 3. 產品管理模組 (Product Management)
// ============================================================================
let editingProductId = null;

// 處理商品圖片本地端上傳
function handleProductImageUpload(event) {
  const fileInput = event.target;
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showToast("請選取圖片檔案 (jpg, png, webp 等)！", "warning");
    fileInput.value = "";
    return;
  }

  // 檔案大小限制 5MB
  if (file.size > 5 * 1024 * 1024) {
    showToast("圖片檔案過大，請選擇小於 5MB 之圖檔！", "warning");
    fileInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64Data = e.target.result;
    document.getElementById("prodImageDataUrl").value = base64Data;
    
    // 更新即時預覽
    const previewBox = document.getElementById("prodImagePreviewBox");
    const previewImg = document.getElementById("prodImagePreviewImg");
    const fileNameEl = document.getElementById("prodImageFileName");
    
    previewImg.src = base64Data;
    fileNameEl.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
    previewBox.classList.remove("d-none");
    showToast("圖片上傳載入完成！", "success");
  };
  reader.readAsDataURL(file);
}

// 清除商品圖片
function clearProductImage() {
  document.getElementById("prodImageFileInput").value = "";
  document.getElementById("prodImageDataUrl").value = "";
  const previewBox = document.getElementById("prodImagePreviewBox");
  const previewImg = document.getElementById("prodImagePreviewImg");
  previewImg.src = "";
  previewBox.classList.add("d-none");
}

function renderProductList(keyword = "", supplierFilter = "") {
  const listContainer = document.getElementById("productTableBody");
  const mobileContainer = document.getElementById("productMobileCards");
  const emptyState = document.getElementById("productEmptyState");
  if (!listContainer) return;

  const products = store.getProducts();
  const vendors = store.getVendors();
  const vendorMap = new Map(vendors.map(v => [v.id, v.companyName]));

  const filtered = products.filter(p => {
    const sName = vendorMap.get(p.supplierId) || "";
    const target = `${p.id} ${p.name} ${p.brand || ''} ${p.specification || ''} ${sName}`.toLowerCase();
    const matchKeyword = target.includes(keyword.toLowerCase().trim());
    const matchSupplier = !supplierFilter || p.supplierId === supplierFilter;
    return matchKeyword && matchSupplier;
  });

  document.getElementById("productCountBadge").textContent = `${filtered.length} 筆`;

  if (filtered.length === 0) {
    listContainer.innerHTML = "";
    if (mobileContainer) mobileContainer.innerHTML = "";
    if (emptyState) emptyState.classList.remove("d-none");
    return;
  }
  if (emptyState) emptyState.classList.add("d-none");

  let tableHtml = "";
  let mobileHtml = "";

  filtered.forEach(p => {
    const sName = vendorMap.get(p.supplierId) || "未指定供應商";
    const thumbSrc = p.imageUrl ? p.imageUrl : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='%23e2e8f0'%3E%3Crect width='48' height='48'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='10' fill='%2394a3b8'%3E無圖%3C/text%3E%3C/svg%3E";

    // 比照客戶管理列表格式對齊
    tableHtml += `
      <tr>
        <td><span class="badge-code">${p.id}</span></td>
        <td>
          <img src="${thumbSrc}" alt="${escapeHtml(p.name)}" class="product-thumbnail" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'48\\' height=\\'48\\' fill=\\'%23e2e8f0\\'%3E%3Crect width=\\'48\\' height=\\'48\\'/ %3E%3C/svg%3E'">
        </td>
        <td>
          <div class="fw-semibold text-dark">${escapeHtml(p.name)}</div>
          <small class="text-muted">${escapeHtml(p.specification || "-")}</small>
        </td>
        <td>
          <div>${escapeHtml(sName)}</div>
          <small class="text-muted">廠牌: ${escapeHtml(p.brand || "未填")}</small>
        </td>
        <td class="text-muted">${formatMoney(p.cost)}</td>
        <td class="fw-semibold text-primary">${formatMoney(p.price)}</td>
        <td><span class="badge bg-secondary-subtle text-secondary border">${p.stock || 0} ${escapeHtml(p.unit || "")}</span></td>
        <td class="text-end">
          <div class="btn-group btn-group-sm" role="group">
            <button class="btn btn-outline-primary" onclick="viewProductDetail('${p.id}')" title="檢視產品">
              <i class="fa-solid fa-eye me-1"></i>明細
            </button>
            <button class="btn btn-outline-secondary" onclick="openProductModal('${p.id}')" title="編輯產品">
              <i class="fa-solid fa-pen-to-square me-1"></i>編輯
            </button>
            <button class="btn btn-outline-danger" onclick="deleteProduct('${p.id}')" title="刪除產品">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;

    mobileHtml += `
      <div class="card mb-3 border shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge-code">${p.id}</span>
            <span class="badge bg-secondary-subtle text-secondary border">庫存: ${p.stock || 0} ${escapeHtml(p.unit || "")}</span>
          </div>
          <div class="d-flex gap-3 align-items-center mb-2">
            <img src="${thumbSrc}" alt="${escapeHtml(p.name)}" class="product-thumbnail flex-shrink-0">
            <div>
              <h6 class="fw-bold text-dark mb-0">${escapeHtml(p.name)}</h6>
              <small class="text-muted">供應商: ${escapeHtml(sName)}</small>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-2">
            <div class="small text-muted">成本: ${formatMoney(p.cost)}</div>
            <div class="fw-bold text-primary">售價: ${formatMoney(p.price)}</div>
          </div>
          <div class="d-flex justify-content-end gap-1 pt-2 border-top">
            <button class="btn btn-sm btn-outline-primary" onclick="viewProductDetail('${p.id}')"><i class="fa-solid fa-eye me-1"></i>明細</button>
            <button class="btn btn-sm btn-outline-secondary" onclick="openProductModal('${p.id}')"><i class="fa-solid fa-pen-to-square me-1"></i>編輯</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct('${p.id}')"><i class="fa-solid fa-trash-can me-1"></i>刪除</button>
          </div>
        </div>
      </div>
    `;
  });

  listContainer.innerHTML = tableHtml;
  if (mobileContainer) mobileContainer.innerHTML = mobileHtml;
}

function openProductModal(id = null) {
  editingProductId = id;
  const form = document.getElementById("productForm");
  form.classList.remove("was-validated");
  form.reset();
  clearProductImage();

  // 填裝供應商下拉選單 (來自廠商管理)
  const supplierSelect = document.getElementById("prodSupplier");
  const vendors = store.getVendors();
  supplierSelect.innerHTML = '<option value="">-- 請選擇供應商 (來自廠商管理) --</option>' + 
    vendors.map(v => `<option value="${v.id}">${escapeHtml(v.companyName)} (${v.id})</option>`).join("");

  const titleEl = document.getElementById("productModalTitle");
  const idInput = document.getElementById("productIdInput");

  if (id) {
    titleEl.innerHTML = '<i class="fa-solid fa-pen-to-square me-2 text-primary"></i>編輯產品資料';
    const product = store.getProducts().find(p => p.id === id);
    if (product) {
      idInput.value = product.id;
      document.getElementById("prodName").value = product.name || "";
      document.getElementById("prodCost").value = product.cost !== undefined ? product.cost : "";
      document.getElementById("prodPrice").value = product.price !== undefined ? product.price : "";
      document.getElementById("prodUnit").value = product.unit || "台";
      document.getElementById("prodBrand").value = product.brand || "";
      document.getElementById("prodSpec").value = product.specification || "";
      document.getElementById("prodDesc").value = product.description || "";
      document.getElementById("prodStock").value = product.stock !== undefined ? product.stock : "0";
      document.getElementById("prodSupplier").value = product.supplierId || "";

      // 帶入既有圖片預覽
      if (product.imageUrl) {
        document.getElementById("prodImageDataUrl").value = product.imageUrl;
        const previewBox = document.getElementById("prodImagePreviewBox");
        const previewImg = document.getElementById("prodImagePreviewImg");
        const fileNameEl = document.getElementById("prodImageFileName");
        previewImg.src = product.imageUrl;
        fileNameEl.textContent = "已儲存之產品圖片";
        previewBox.classList.remove("d-none");
      }
    }
  } else {
    titleEl.innerHTML = '<i class="fa-solid fa-box-open me-2 text-primary"></i>新增產品';
    idInput.value = store.generateId("product");
  }

  new bootstrap.Modal(document.getElementById("productModal")).show();
}

function saveProduct() {
  const form = document.getElementById("productForm");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    showToast("請檢視並填寫所有標註 (*) 之必填欄位 (產品名稱、成本必填)！", "warning");
    return;
  }

  const cost = parseFloat(document.getElementById("prodCost").value);
  if (isNaN(cost) || cost < 0) {
    document.getElementById("prodCost").classList.add("is-invalid");
    showToast("產品成本必須為有效數值且大於等於 0！", "danger");
    return;
  } else {
    document.getElementById("prodCost").classList.remove("is-invalid");
  }

  const priceVal = document.getElementById("prodPrice").value.trim();
  const price = priceVal !== "" ? parseFloat(priceVal) : 0;
  const stockVal = document.getElementById("prodStock").value.trim();
  const stock = stockVal !== "" ? parseInt(stockVal, 10) : 0;

  const products = store.getProducts();
  const productData = {
    id: document.getElementById("productIdInput").value,
    name: document.getElementById("prodName").value.trim(),
    cost: cost,
    price: price,
    unit: document.getElementById("prodUnit").value.trim() || "個",
    imageUrl: document.getElementById("prodImageDataUrl").value.trim(),
    brand: document.getElementById("prodBrand").value.trim(),
    specification: document.getElementById("prodSpec").value.trim(),
    description: document.getElementById("prodDesc").value.trim(),
    stock: stock,
    supplierId: document.getElementById("prodSupplier").value
  };

  if (editingProductId) {
    const idx = products.findIndex(p => p.id === editingProductId);
    if (idx !== -1) {
      products[idx] = productData;
      store.saveProducts(products);
      showToast(`產品 [${productData.name}] 已成功更新！`, "success");
    }
  } else {
    products.push(productData);
    store.saveProducts(products);
    showToast(`新產品 [${productData.name}] 已成功建檔！`, "success");
  }

  bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
  renderProductList();
  updateDashboardStats();
  populateDropdowns();
}

function deleteProduct(id) {
  const product = store.getProducts().find(p => p.id === id);
  if (!product) return;

  const quotations = store.getQuotations();
  const usedCount = quotations.filter(q => q.items && q.items.some(it => it.productId === id)).length;
  let warningExtra = "";
  if (usedCount > 0) {
    warningExtra = `\n\n⚠️ 提醒：有 ${usedCount} 張現有報價單已包含此產品，刪除將保留報價單之快照歷史資料。`;
  }

  if (confirm(`確定要刪除產品「${product.name} (${product.id})」嗎？${warningExtra}`)) {
    store.deleteProduct(id);
    showToast(`產品 [${product.name}] 已刪除。`, "danger");
    renderProductList();
    updateDashboardStats();
    populateDropdowns();
  }
}

function viewProductDetail(id) {
  const product = store.getProducts().find(p => p.id === id);
  if (!product) return;

  const vendor = store.getVendors().find(v => v.id === product.supplierId);
  const supplierName = vendor ? `${vendor.companyName} (${vendor.id})` : "尚未指定供應商";

  const grossProfit = (product.price || 0) - (product.cost || 0);
  const marginRate = product.price > 0 ? ((grossProfit / product.price) * 100).toFixed(1) : "0.0";

  const content = document.getElementById("productDetailContent");
  content.innerHTML = `
    <div class="row g-3">
      <div class="col-md-5 text-center">
        ${product.imageUrl 
          ? `<img src="${product.imageUrl}" alt="${escapeHtml(product.name)}" class="product-thumbnail-lg mb-2 shadow-sm" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'200\\' fill=\\'%23f1f5f9\\'%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-size=\\'16\\' fill=\\'%2394a3b8\\'%3E無預覽圖片%3C/text%3E%3C/svg%3E'">` 
          : '<div class="p-5 bg-light rounded text-muted border"><i class="fa-solid fa-box-open fa-3x mb-2"></i><br>尚未上傳圖片</div>'}
        <div class="mt-2">
          <span class="badge bg-secondary me-1">廠牌: ${escapeHtml(product.brand || "未填")}</span>
          <span class="badge bg-info text-dark">庫存: ${product.stock || 0} ${escapeHtml(product.unit || "")}</span>
        </div>
      </div>
      <div class="col-md-7">
        <div class="mb-1"><span class="badge-code">${product.id}</span></div>
        <h4 class="fw-bold text-dark mb-2">${escapeHtml(product.name)}</h4>
        
        <div class="card bg-light border-0 p-3 mb-3">
          <div class="row text-center">
            <div class="col-4 border-end">
              <div class="small text-muted">進貨成本</div>
              <div class="fw-bold text-secondary">${formatMoney(product.cost)}</div>
            </div>
            <div class="col-4 border-end">
              <div class="small text-muted">建議售價</div>
              <div class="fw-bold text-primary">${formatMoney(product.price)}</div>
            </div>
            <div class="col-4">
              <div class="small text-muted">預估毛利率</div>
              <div class="fw-bold ${grossProfit >= 0 ? 'text-success' : 'text-danger'}">${marginRate}%</div>
            </div>
          </div>
        </div>

        <div class="mb-2">
          <label class="text-muted small fw-bold">供應商資訊</label>
          <div><i class="fa-solid fa-building me-1 text-muted"></i>${escapeHtml(supplierName)}</div>
        </div>

        <div class="mb-2">
          <label class="text-muted small fw-bold">規格說明</label>
          <div class="small p-2 bg-light rounded border">${escapeHtml(product.specification || "無特殊規格說明")}</div>
        </div>

        <div class="mb-2">
          <label class="text-muted small fw-bold">詳細產品介紹</label>
          <div class="small text-secondary">${escapeHtml(product.description || "暫無詳細說明")}</div>
        </div>
      </div>
    </div>
  `;

  new bootstrap.Modal(document.getElementById("productDetailModal")).show();
}

// ============================================================================
// 4. 報價單管理模組 (Quotation Management)
// ============================================================================
let editingQuotationId = null;

function renderQuotationList(keyword = "", statusFilter = "") {
  const listContainer = document.getElementById("quotationTableBody");
  const mobileContainer = document.getElementById("quotationMobileCards");
  const emptyState = document.getElementById("quotationEmptyState");
  if (!listContainer) return;

  const quotations = store.getQuotations();
  const customers = store.getCustomers();
  const customerMap = new Map(customers.map(c => [c.id, c.companyName]));

  const filtered = quotations.filter(q => {
    const custName = customerMap.get(q.customerId) || "";
    const searchTarget = `${q.id} ${custName} ${q.salesRep} ${q.salesPhone} ${q.salesAddress || ''}`.toLowerCase();
    const matchKeyword = searchTarget.includes(keyword.toLowerCase().trim());
    const matchStatus = !statusFilter || q.status === statusFilter;
    return matchKeyword && matchStatus;
  });

  document.getElementById("quotationCountBadge").textContent = `${filtered.length} 筆`;

  if (filtered.length === 0) {
    listContainer.innerHTML = "";
    if (mobileContainer) mobileContainer.innerHTML = "";
    if (emptyState) emptyState.classList.remove("d-none");
    return;
  }
  if (emptyState) emptyState.classList.add("d-none");

  let tableHtml = "";
  let mobileHtml = "";

  filtered.forEach(q => {
    const customerName = customerMap.get(q.customerId) || "未指定客戶";
    let statusBadgeClass = "bg-secondary";
    if (q.status === "已確認") statusBadgeClass = "bg-success";
    else if (q.status === "已送出") statusBadgeClass = "bg-primary";
    else if (q.status === "草稿") statusBadgeClass = "bg-warning text-dark";

    // 比照客戶管理列表格式對齊
    tableHtml += `
      <tr>
        <td><span class="badge-code">${q.id}</span></td>
        <td>
          <div class="fw-semibold text-dark">${escapeHtml(customerName)}</div>
          <small class="text-muted">付款：${escapeHtml(q.paymentTerms || "未載明")}</small>
        </td>
        <td>
          <div>${q.quoteDate}</div>
          <small class="text-muted">有效至: ${q.validUntil || "未填"}</small>
        </td>
        <td>
          <div>${escapeHtml(q.salesRep)}</div>
          <small class="text-muted"><i class="fa-solid fa-phone me-1"></i>${escapeHtml(q.salesPhone)}</small>
        </td>
        <td><span class="badge ${statusBadgeClass}">${escapeHtml(q.status)}</span></td>
        <td class="fw-bold text-primary fs-6">${formatMoney(q.grandTotal)}</td>
        <td class="text-end">
          <div class="btn-group btn-group-sm" role="group">
            <button class="btn btn-outline-success" onclick="previewQuotation('${q.id}')" title="正式預覽與列印">
              <i class="fa-solid fa-print me-1"></i>列印
            </button>
            <button class="btn btn-outline-primary" onclick="viewQuotationDetail('${q.id}')" title="查看明細">
              <i class="fa-solid fa-eye me-1"></i>明細
            </button>
            <button class="btn btn-outline-secondary" onclick="openQuotationModal('${q.id}')" title="編輯報價單">
              <i class="fa-solid fa-pen-to-square me-1"></i>編輯
            </button>
            <button class="btn btn-outline-danger" onclick="deleteQuotation('${q.id}')" title="刪除報價單">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;

    mobileHtml += `
      <div class="card mb-3 border shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge-code">${q.id}</span>
            <span class="badge ${statusBadgeClass}">${escapeHtml(q.status)}</span>
          </div>
          <h6 class="fw-bold text-dark mb-1">${escapeHtml(customerName)}</h6>
          <div class="small text-muted mb-1">業務代表：${escapeHtml(q.salesRep)} (${escapeHtml(q.salesPhone)})</div>
          <div class="small text-muted mb-2">付款條件：${escapeHtml(q.paymentTerms || "未載明")}</div>
          <div class="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-2">
            <div class="small text-muted">報價日期：${q.quoteDate}</div>
            <div class="fw-bold text-primary fs-6">${formatMoney(q.grandTotal)}</div>
          </div>
          <div class="d-flex justify-content-end gap-1 pt-2 border-top">
            <button class="btn btn-sm btn-outline-success" onclick="previewQuotation('${q.id}')"><i class="fa-solid fa-print me-1"></i>列印</button>
            <button class="btn btn-sm btn-outline-primary" onclick="viewQuotationDetail('${q.id}')"><i class="fa-solid fa-eye me-1"></i>明細</button>
            <button class="btn btn-sm btn-outline-secondary" onclick="openQuotationModal('${q.id}')"><i class="fa-solid fa-pen-to-square me-1"></i>編輯</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteQuotation('${q.id}')"><i class="fa-solid fa-trash-can me-1"></i>刪除</button>
          </div>
        </div>
      </div>
    `;
  });

  listContainer.innerHTML = tableHtml;
  if (mobileContainer) mobileContainer.innerHTML = mobileHtml;
}

// 報價單項目動態行管理
function addQuotationItemRow(item = null) {
  const container = document.getElementById("quotationItemsContainer");
  const products = store.getProducts();

  const rowId = "item_row_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
  const rowDiv = document.createElement("div");
  rowDiv.className = "quotation-item-row shadow-sm";
  rowDiv.id = rowId;

  const productOptions = products.map(p => `
    <option value="${p.id}" ${item && item.productId === p.id ? "selected" : ""}>
      ${escapeHtml(p.name)} (${p.id}) - 售價: NT$ ${Number(p.price || 0).toLocaleString()}
    </option>
  `).join("");

  rowDiv.innerHTML = `
    <div class="row g-2 align-items-center">
      <div class="col-md-4 col-12">
        <label class="small text-muted fw-bold d-md-none">選擇產品*</label>
        <select class="form-select form-select-sm quote-product-select" required onchange="onQuotationProductChange('${rowId}')">
          <option value="">-- 請選擇產品 (來自產品管理) --</option>
          ${productOptions}
        </select>
        <div class="invalid-feedback">請選擇報價產品</div>
      </div>
      <div class="col-md-3 col-12">
        <label class="small text-muted fw-bold d-md-none">規格/說明</label>
        <input type="text" class="form-control form-select-sm quote-item-desc" placeholder="規格/說明" value="${item ? escapeHtml(item.itemDesc || '') : ''}">
      </div>
      <div class="col-md-1 col-4">
        <label class="small text-muted fw-bold d-md-none">單位</label>
        <input type="text" class="form-control form-select-sm text-center quote-item-unit" placeholder="單位" value="${item ? escapeHtml(item.unit || '個') : '個'}">
      </div>
      <div class="col-md-2 col-4">
        <label class="small text-muted fw-bold d-md-none">單價*</label>
        <div class="input-group input-group-sm">
          <span class="input-group-text">$</span>
          <input type="number" class="form-control form-select-sm quote-item-price" min="0" required placeholder="單價" value="${item ? item.unitPrice : 0}" oninput="calculateQuotationTotals()">
        </div>
      </div>
      <div class="col-md-1 col-4">
        <label class="small text-muted fw-bold d-md-none">數量*</label>
        <input type="number" class="form-control form-select-sm text-center quote-item-qty" min="1" required placeholder="數量" value="${item ? item.quantity : 1}" oninput="calculateQuotationTotals()">
      </div>
      <div class="col-md-1 col-12 text-end d-flex justify-content-between justify-content-md-end align-items-center pt-2 pt-md-0">
        <div class="d-md-none small fw-bold text-primary quote-item-subtotal-mobile">
          複價: ${formatMoney(item ? item.subtotal : 0)}
        </div>
        <button type="button" class="btn btn-sm btn-outline-danger border-0" onclick="removeQuotationItemRow('${rowId}')" title="刪除此列">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
    <div class="d-none d-md-flex justify-content-end mt-1 text-muted small">
      <span class="quote-item-subtotal-desktop">複價: <strong>${formatMoney(item ? item.subtotal : 0)}</strong></span>
    </div>
  `;

  container.appendChild(rowDiv);
  calculateQuotationTotals();
}

function removeQuotationItemRow(rowId) {
  const container = document.getElementById("quotationItemsContainer");
  if (container.children.length <= 1) {
    showToast("報價單至少必須保留一筆產品項目！", "warning");
    return;
  }
  const row = document.getElementById(rowId);
  if (row) {
    row.remove();
    calculateQuotationTotals();
  }
}

function onQuotationProductChange(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;

  const select = row.querySelector(".quote-product-select");
  const productId = select.value;
  const product = store.getProducts().find(p => p.id === productId);

  if (product) {
    row.querySelector(".quote-item-desc").value = product.specification || product.description || "";
    row.querySelector(".quote-item-unit").value = product.unit || "個";
    row.querySelector(".quote-item-price").value = product.price || 0;
  }
  calculateQuotationTotals();
}

function calculateQuotationTotals() {
  const container = document.getElementById("quotationItemsContainer");
  const rows = container.getElementsByClassName("quotation-item-row");

  let subtotal = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const price = parseFloat(row.querySelector(".quote-item-price").value) || 0;
    const qty = parseFloat(row.querySelector(".quote-item-qty").value) || 0;
    const lineSubtotal = Math.round(price * qty);
    subtotal += lineSubtotal;

    const desktopSubtotal = row.querySelector(".quote-item-subtotal-desktop");
    const mobileSubtotal = row.querySelector(".quote-item-subtotal-mobile");
    if (desktopSubtotal) desktopSubtotal.innerHTML = `複價: <strong>${formatMoney(lineSubtotal)}</strong>`;
    if (mobileSubtotal) mobileSubtotal.innerHTML = `複價: ${formatMoney(lineSubtotal)}`;
  }

  const taxRate = parseFloat(document.getElementById("quoteTaxRate").value) || 0;
  const taxAmount = Math.round(subtotal * (taxRate / 100));
  const grandTotal = subtotal + taxAmount;

  document.getElementById("quoteSummarySubtotal").textContent = formatMoney(subtotal);
  document.getElementById("quoteSummaryTax").textContent = formatMoney(taxAmount);
  document.getElementById("quoteSummaryGrandTotal").textContent = formatMoney(grandTotal);
}

function onQuotationCustomerSelectChange() {
  const customerId = document.getElementById("quoteCustomerSelect").value;
  const customer = store.getCustomers().find(c => c.id === customerId);

  const previewBox = document.getElementById("quoteCustomerAutoInfo");
  if (customer) {
    previewBox.classList.remove("d-none");
    previewBox.innerHTML = `
      <div class="row g-2 small">
        <div class="col-sm-4"><strong>統編：</strong><code>${escapeHtml(customer.taxId)}</code></div>
        <div class="col-sm-4"><strong>窗口：</strong>${escapeHtml(customer.contactPerson)}${customer.contactPersonEn ? ` (${escapeHtml(customer.contactPersonEn)})` : ''}</div>
        <div class="col-sm-4"><strong>電話：</strong>${escapeHtml(customer.phone)}</div>
        <div class="col-12"><strong>客戶地址：</strong>${escapeHtml(customer.address)}</div>
      </div>
    `;
    if (customer.paymentTerms) {
      document.getElementById("quotePaymentTerms").value = customer.paymentTerms;
    }
  } else {
    previewBox.classList.add("d-none");
    previewBox.innerHTML = "";
  }
}

function openQuotationModal(id = null) {
  editingQuotationId = id;
  const form = document.getElementById("quotationForm");
  form.classList.remove("was-validated");
  form.reset();

  const customerSelect = document.getElementById("quoteCustomerSelect");
  const customers = store.getCustomers();
  customerSelect.innerHTML = '<option value="">-- 請選擇客戶 (來自客戶管理) --</option>' + 
    customers.map(c => `<option value="${c.id}">${escapeHtml(c.companyName)} (${c.id})</option>`).join("");

  const itemsContainer = document.getElementById("quotationItemsContainer");
  itemsContainer.innerHTML = "";

  const titleEl = document.getElementById("quotationModalTitle");
  const idInput = document.getElementById("quotationIdInput");

  if (id) {
    titleEl.innerHTML = '<i class="fa-solid fa-pen-to-square me-2 text-primary"></i>編輯報價單';
    const quote = store.getQuotations().find(q => q.id === id);
    if (quote) {
      idInput.value = quote.id;
      customerSelect.value = quote.customerId || "";
      onQuotationCustomerSelectChange();

      document.getElementById("quoteDate").value = quote.quoteDate || "";
      document.getElementById("quoteValidUntil").value = quote.validUntil || "";
      document.getElementById("quoteSalesRep").value = quote.salesRep || "";
      document.getElementById("quoteSalesPhone").value = quote.salesPhone || "";
      document.getElementById("quoteSalesAddress").value = quote.salesAddress || "台北市南港區軟體園區二期 H 棟 9 樓";
      document.getElementById("quotePaymentTerms").value = quote.paymentTerms || "月結30天";
      document.getElementById("quoteStatus").value = quote.status || "草稿";
      document.getElementById("quoteTaxRate").value = quote.taxRate !== undefined ? quote.taxRate : "5";
      document.getElementById("quoteNotes").value = quote.notes || "";

      if (quote.items && quote.items.length > 0) {
        quote.items.forEach(it => addQuotationItemRow(it));
      } else {
        addQuotationItemRow();
      }
    }
  } else {
    titleEl.innerHTML = '<i class="fa-solid fa-file-circle-plus me-2 text-primary"></i>新增報價單';
    idInput.value = store.generateId("quotation");

    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + 30);
    document.getElementById("quoteDate").value = now.toISOString().slice(0, 10);
    document.getElementById("quoteValidUntil").value = future.toISOString().slice(0, 10);
    document.getElementById("quoteSalesRep").value = "業務部專員";
    document.getElementById("quoteSalesPhone").value = "02-2788-9900";
    document.getElementById("quoteSalesAddress").value = "台北市南港區軟體園區二期 H 棟 9 樓";
    document.getElementById("quotePaymentTerms").value = "月結30天";
    document.getElementById("quoteStatus").value = "草稿";
    document.getElementById("quoteTaxRate").value = "5";
    document.getElementById("quoteNotes").value = "1. 本報價單所載價格均為新台幣，自報價日起 30 日內有效。\n2. 驗收完成後開立統一發票，並依照約定付款條件支付款項。\n3. 保固期內提供原廠硬體故障檢修與技術諮詢。";

    addQuotationItemRow();
  }

  calculateQuotationTotals();
  new bootstrap.Modal(document.getElementById("quotationModal")).show();
}

function saveQuotation() {
  const form = document.getElementById("quotationForm");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    showToast("請確認報價單所有必填欄位 (客戶、報價人員、電話、營業住址等) 皆已填妥！", "warning");
    return;
  }

  const customerId = document.getElementById("quoteCustomerSelect").value;
  if (!customerId) {
    document.getElementById("quoteCustomerSelect").classList.add("is-invalid");
    showToast("請選擇客戶名稱！", "danger");
    return;
  } else {
    document.getElementById("quoteCustomerSelect").classList.remove("is-invalid");
  }

  const container = document.getElementById("quotationItemsContainer");
  const rows = container.getElementsByClassName("quotation-item-row");
  const items = [];

  let hasInvalidItem = false;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const select = row.querySelector(".quote-product-select");
    const pId = select.value;
    const price = parseFloat(row.querySelector(".quote-item-price").value) || 0;
    const qty = parseFloat(row.querySelector(".quote-item-qty").value) || 0;
    const desc = row.querySelector(".quote-item-desc").value.trim();
    const unit = row.querySelector(".quote-item-unit").value.trim() || "個";

    if (!pId) {
      select.classList.add("is-invalid");
      hasInvalidItem = true;
    } else {
      select.classList.remove("is-invalid");
    }

    if (qty <= 0) {
      row.querySelector(".quote-item-qty").classList.add("is-invalid");
      hasInvalidItem = true;
    } else {
      row.querySelector(".quote-item-qty").classList.remove("is-invalid");
    }

    items.push({
      productId: pId,
      itemDesc: desc,
      unit: unit,
      unitPrice: price,
      quantity: qty,
      subtotal: Math.round(price * qty)
    });
  }

  if (items.length === 0 || hasInvalidItem) {
    showToast("報價項目資料不完整！請確認每列皆已選擇產品且數量大於 0。", "danger");
    return;
  }

  const subtotal = items.reduce((sum, it) => sum + it.subtotal, 0);
  const taxRate = parseFloat(document.getElementById("quoteTaxRate").value) || 0;
  const taxAmount = Math.round(subtotal * (taxRate / 100));
  const grandTotal = subtotal + taxAmount;

  const quoteData = {
    id: document.getElementById("quotationIdInput").value,
    customerId: customerId,
    quoteDate: document.getElementById("quoteDate").value,
    validUntil: document.getElementById("quoteValidUntil").value,
    salesRep: document.getElementById("quoteSalesRep").value.trim(),
    salesPhone: document.getElementById("quoteSalesPhone").value.trim(),
    salesAddress: document.getElementById("quoteSalesAddress").value.trim(),
    paymentTerms: document.getElementById("quotePaymentTerms").value.trim(),
    status: document.getElementById("quoteStatus").value,
    taxRate: taxRate,
    items: items,
    subtotal: subtotal,
    taxAmount: taxAmount,
    grandTotal: grandTotal,
    notes: document.getElementById("quoteNotes").value.trim()
  };

  const quotations = store.getQuotations();
  if (editingQuotationId) {
    const idx = quotations.findIndex(q => q.id === editingQuotationId);
    if (idx !== -1) {
      quotations[idx] = quoteData;
      store.saveQuotations(quotations);
      showToast(`報價單 [${quoteData.id}] 已更新！`, "success");
    }
  } else {
    quotations.push(quoteData);
    store.saveQuotations(quotations);
    showToast(`新報價單 [${quoteData.id}] 已建立！`, "success");
  }

  bootstrap.Modal.getInstance(document.getElementById("quotationModal")).hide();
  renderQuotationList();
  updateDashboardStats();
}

function deleteQuotation(id) {
  const quote = store.getQuotations().find(q => q.id === id);
  if (!quote) return;

  if (confirm(`確定要刪除報價單「${quote.id}」嗎？此操作無法還原。`)) {
    store.deleteQuotation(id);
    showToast(`報價單 [${quote.id}] 已刪除。`, "danger");
    renderQuotationList();
    updateDashboardStats();
  }
}

// 產生報價單正式明細及友善列印檢視 (含報價人員名稱/聯絡電話及住址)
function generatePrintableQuoteHtml(quote) {
  const customer = store.getCustomers().find(c => c.id === quote.customerId) || {
    companyName: "客戶資料已移除",
    contactPerson: "無",
    contactPersonEn: "",
    phone: "無",
    email: "無",
    taxId: "無",
    address: "無"
  };

  const products = store.getProducts();
  const productMap = new Map(products.map(p => [p.id, p.name]));

  let itemsHtml = "";
  (quote.items || []).forEach((it, idx) => {
    const pName = productMap.get(it.productId) || "自訂產品項目";
    itemsHtml += `
      <tr>
        <td class="text-center">${idx + 1}</td>
        <td>
          <div class="fw-bold">${escapeHtml(pName)}</div>
          <div class="text-muted small">${escapeHtml(it.itemDesc || "-")}</div>
        </td>
        <td class="text-center">${escapeHtml(it.unit || "個")}</td>
        <td class="text-end">${Number(it.unitPrice).toLocaleString()}</td>
        <td class="text-center">${it.quantity}</td>
        <td class="text-end fw-bold">${Number(it.subtotal).toLocaleString()}</td>
      </tr>
    `;
  });

  return `
    <div class="printable-quote-paper">
      <!-- 抬頭與 LOGO -->
      <div class="d-flex justify-content-between align-items-start quote-header-line">
        <div class="d-flex align-items-center gap-3">
          <div class="brand-logo-icon" style="width: 48px; height: 48px; font-size: 1.5rem;">
            <i class="fa-solid fa-file-invoice-dollar"></i>
          </div>
          <div>
            <h3 class="fw-bold text-primary mb-0">鼎盛智慧科技股份有限公司</h3>
            <small class="text-muted">APEX SMART TECHNOLOGY CO., LTD. | 統編：80231945</small>
          </div>
        </div>
        <div class="text-end">
          <h2 class="fw-bold text-dark mb-0">正 式 報 價 單</h2>
          <div class="badge-code fs-6 mt-1">${quote.id}</div>
        </div>
      </div>

      <!-- 客戶與報價資訊方塊 (含報價人員名稱、電話及營業住址) -->
      <div class="row g-3 mb-4">
        <div class="col-6">
          <div class="p-3 bg-light rounded border h-100">
            <h6 class="fw-bold text-primary border-bottom pb-1 mb-2">客戶資訊 (TO)</h6>
            <div class="fw-bold text-dark fs-6">${escapeHtml(customer.companyName)}</div>
            <div class="small text-muted mt-1">統一編號：<code>${escapeHtml(customer.taxId)}</code></div>
            <div class="small text-muted">聯絡窗口：${escapeHtml(customer.contactPerson)}${customer.contactPersonEn ? ` (${escapeHtml(customer.contactPersonEn)})` : ''}</div>
            <div class="small text-muted">客戶電話：${escapeHtml(customer.phone)}</div>
            <div class="small text-muted">客戶地址：${escapeHtml(customer.address)}</div>
          </div>
        </div>
        <div class="col-6">
          <div class="p-3 bg-light rounded border h-100">
            <h6 class="fw-bold text-primary border-bottom pb-1 mb-2">報價單位資訊 (FROM)</h6>
            <div class="small text-muted"><strong>報價日期：</strong>${quote.quoteDate}</div>
            <div class="small text-muted"><strong>有效期限：</strong>${quote.validUntil || "自報價日起30天"}</div>
            <div class="small text-muted"><strong>報價人員：</strong><span class="text-dark fw-bold">${escapeHtml(quote.salesRep)}</span></div>
            <div class="small text-muted"><strong>聯絡電話：</strong><span class="text-dark fw-bold">${escapeHtml(quote.salesPhone)}</span></div>
            <div class="small text-muted"><strong>營業住址：</strong>${escapeHtml(quote.salesAddress || "台北市南港區軟體園區二期 H 棟 9 樓")}</div>
            <div class="small text-muted mt-1"><strong>付款條件：</strong><span class="badge ${quote.paymentTerms === '先付款後出貨' ? 'bg-primary' : 'bg-secondary'}">${escapeHtml(quote.paymentTerms || "月結30天")}</span></div>
          </div>
        </div>
      </div>

      <!-- 產品明細表 -->
      <div class="table-responsive mb-4">
        <table class="table table-bordered align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th class="text-center" style="width: 50px;">項次</th>
              <th>產品名稱及規格說明</th>
              <th class="text-center" style="width: 70px;">單位</th>
              <th class="text-end" style="width: 120px;">單價 (NT$)</th>
              <th class="text-center" style="width: 80px;">數量</th>
              <th class="text-end" style="width: 130px;">複價 (NT$)</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>

      <!-- 金額試算總表 -->
      <div class="row justify-content-end mb-4">
        <div class="col-md-5 col-12">
          <table class="table table-sm table-borderless">
            <tr>
              <td class="text-end text-muted">項目小計：</td>
              <td class="text-end fw-bold" style="width: 140px;">${formatMoney(quote.subtotal)}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">營業稅 (5%)：</td>
              <td class="text-end fw-bold">${formatMoney(quote.taxAmount)}</td>
            </tr>
            <tr class="border-top border-dark border-2">
              <td class="text-end fw-bold fs-6 text-primary">總計金額 (含稅)：</td>
              <td class="text-end fw-bold fs-5 text-primary">${formatMoney(quote.grandTotal)}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 條款與簽章 -->
      <div class="mb-4">
        <h6 class="fw-bold text-dark border-bottom pb-1 mb-2">商業條款與備註</h6>
        <div class="small text-muted p-3 bg-light rounded border" style="white-space: pre-line;">
          ${escapeHtml(quote.notes || "無特殊約定條款")}
        </div>
      </div>

      <div class="row g-4 mt-2">
        <div class="col-6">
          <div class="signature-box">
            客戶簽署並蓋公司發票章
          </div>
        </div>
        <div class="col-6">
          <div class="signature-box">
            鼎盛智慧科技 業務代表 / 主管簽署
          </div>
        </div>
      </div>
    </div>
  `;
}

function viewQuotationDetail(id) {
  const quote = store.getQuotations().find(q => q.id === id);
  if (!quote) return;

  const content = document.getElementById("quotationDetailContent");
  content.innerHTML = generatePrintableQuoteHtml(quote);

  document.getElementById("printQuoteDetailBtn").onclick = function() {
    previewQuotation(id);
  };

  new bootstrap.Modal(document.getElementById("quotationDetailModal")).show();
}

function previewQuotation(id) {
  const quote = store.getQuotations().find(q => q.id === id);
  if (!quote) return;

  const previewModalBody = document.getElementById("quotationPreviewContent");
  previewModalBody.innerHTML = generatePrintableQuoteHtml(quote);

  const previewModal = new bootstrap.Modal(document.getElementById("quotationPreviewModal"));
  previewModal.show();
}

function triggerSystemPrint() {
  window.print();
}

// ============================================================================
// 下拉選單連動與全域統計卡片
// ============================================================================
function populateDropdowns() {
  const filterSupplier = document.getElementById("filterProductSupplier");
  if (filterSupplier) {
    const currentVal = filterSupplier.value;
    const vendors = store.getVendors();
    filterSupplier.innerHTML = '<option value="">所有供應商</option>' + 
      vendors.map(v => `<option value="${v.id}" ${currentVal === v.id ? 'selected' : ''}>${escapeHtml(v.companyName)}</option>`).join("");
  }
}

function updateDashboardStats() {
  const customers = store.getCustomers();
  const vendors = store.getVendors();
  const products = store.getProducts();
  const quotations = store.getQuotations();

  const totalQuoteAmount = quotations.reduce((acc, q) => acc + (q.grandTotal || 0), 0);

  const cCount = document.getElementById("statCustomerCount");
  const vCount = document.getElementById("statVendorCount");
  const pCount = document.getElementById("statProductCount");
  const qCount = document.getElementById("statQuotationCount");
  const qAmount = document.getElementById("statQuotationAmount");

  if (cCount) cCount.textContent = customers.length;
  if (vCount) vCount.textContent = vendors.length;
  if (pCount) pCount.textContent = products.length;
  if (qCount) qCount.textContent = quotations.length;
  if (qAmount) qAmount.textContent = formatMoney(totalQuoteAmount);
}

// HTML XSS 防護跳脫
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// 系統初始化與事件監聽
// ============================================================================
document.addEventListener("DOMContentLoaded", function () {
  // 1. 初始化資料與下拉選單
  populateDropdowns();
  updateDashboardStats();

  // 2. 渲染四大模組清單
  renderCustomerList();
  renderVendorList();
  renderProductList();
  renderQuotationList();

  // 3. 搜尋與篩選事件監聽
  const custSearch = document.getElementById("customerSearchInput");
  if (custSearch) {
    custSearch.addEventListener("input", e => renderCustomerList(e.target.value));
  }

  const vendSearch = document.getElementById("vendorSearchInput");
  if (vendSearch) {
    vendSearch.addEventListener("input", e => renderVendorList(e.target.value));
  }

  const prodSearch = document.getElementById("productSearchInput");
  const prodSupplierFilter = document.getElementById("filterProductSupplier");
  if (prodSearch && prodSupplierFilter) {
    prodSearch.addEventListener("input", () => renderProductList(prodSearch.value, prodSupplierFilter.value));
    prodSupplierFilter.addEventListener("change", () => renderProductList(prodSearch.value, prodSupplierFilter.value));
  }

  const quoteSearch = document.getElementById("quotationSearchInput");
  const quoteStatusFilter = document.getElementById("filterQuotationStatus");
  if (quoteSearch && quoteStatusFilter) {
    quoteSearch.addEventListener("input", () => renderQuotationList(quoteSearch.value, quoteStatusFilter.value));
    quoteStatusFilter.addEventListener("change", () => renderQuotationList(quoteSearch.value, quoteStatusFilter.value));
  }

  // 客戶下拉選單連動
  const custSelect = document.getElementById("quoteCustomerSelect");
  if (custSelect) {
    custSelect.addEventListener("change", onQuotationCustomerSelectChange);
  }

  // 稅率連動
  const taxSelect = document.getElementById("quoteTaxRate");
  if (taxSelect) {
    taxSelect.addEventListener("change", calculateQuotationTotals);
  }

  // 重設示範資料功能
  const resetBtn = document.getElementById("resetDemoDataBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function() {
      if (confirm("確定要恢復預設示範資料嗎？這將覆蓋您目前在瀏覽器中的所有新增與變更。")) {
        store.resetDefaultData();
        populateDropdowns();
        updateDashboardStats();
        renderCustomerList();
        renderVendorList();
        renderProductList();
        renderQuotationList();
        showToast("已成功重設為系統預設示範資料！", "success");
      }
    });
  }
});
