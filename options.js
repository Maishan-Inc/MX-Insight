const SETTINGS_KEYS = ["baseUrl", "apiKey", "model", "enabled", "defaultGeneratorSite", "uiLanguage"];
const HISTORY_KEY = "historyEntries";
const SNAPSHOT_KEY = "latestAnalysisSnapshot";

const DEFAULTS = {
  baseUrl: "",
  apiKey: "",
  model: "",
  enabled: true,
  defaultGeneratorSite: "jimeng",
  uiLanguage: "auto",
};

const LANGUAGES = [
  { value: "auto", labels: { en: "Auto", "zh-CN": "自动", "zh-TW": "自動", ja: "自動" } },
  { value: "en", labels: { en: "English", "zh-CN": "英语", "zh-TW": "英文", ja: "英語" } },
  { value: "zh-CN", labels: { en: "Simplified Chinese", "zh-CN": "简体中文", "zh-TW": "簡體中文", ja: "簡体字中国語" } },
  { value: "zh-TW", labels: { en: "Traditional Chinese", "zh-CN": "繁体中文", "zh-TW": "繁體中文", ja: "繁体字中国語" } },
  { value: "ja", labels: { en: "Japanese", "zh-CN": "日语", "zh-TW": "日文", ja: "日本語" } },
];

const TEXT = {
  en: {
    console: "System settings",
    lead: "Configure image prompt analysis, choose interface language, and review local records.",
    welcomeTitle: "Choose how MX-Insight should connect",
    welcomeCopy: "A local-first setup keeps your API credentials and analysis records in this browser.",
    smvapi: "Log in with an SMVAPI account",
    unavailable: "Not available yet",
    unavailableTip: "暂未开放",
    customApi: "Custom API",
    customApiCopy: "Use an OpenAI-compatible endpoint, Gemini endpoint, or another vision-capable API.",
    openCustomApi: "Configure",
    connection: "Connection",
    account: "Account mode",
    localMode: "Local custom API",
    language: "Language",
    status: "Extension status",
    enabled: "Enabled",
    disabled: "Paused",
    apiSummary: "Custom API",
    apiMissing: "Not configured",
    edit: "Edit",
    test: "Test connection",
    save: "Save settings",
    saving: "Saving...",
    testing: "Testing...",
    baseUrl: "Base URL",
    apiKey: "API Key",
    model: "Model",
    baseUrlPlaceholder: "https://api.openai.com/v1",
    apiKeyPlaceholder: "sk-... / AIza...",
    modelPlaceholder: "gpt-4o-mini / gemini-2.5-flash / qwen-vl-max",
    cancel: "Cancel",
    saved: "Settings saved.",
    connected: "Connection is available.",
    navLocal: "Local data",
    navBackend: "Backend",
    navHistory: "Saved records",
    navHistorySub: "Browse local analyses",
    navApi: "API settings",
    navApiSub: "Endpoint, key and model",
    navPreferences: "Preferences",
    navPreferencesSub: "Language and extension switch",
    navAccount: "Account mode",
    navAccountSub: "SMVAPI login status",
    apiTitle: "Custom API",
    apiCopy: "Manage the endpoint used for image analysis.",
    preferencesTitle: "Preferences",
    preferencesCopy: "Control language and page analysis availability.",
    historyTitle: "Local saved records",
    historyCopy: "Records are stored in chrome.storage.local on this browser.",
    emptyHistory: "No saved records yet.",
    clearHistory: "Clear records",
    delete: "Delete",
    source: "Source",
  },
  "zh-CN": {
    console: "系统设置",
    lead: "配置图片提示词分析、界面语言，并查看本地保存记录。",
    welcomeTitle: "选择 MX-Insight 的连接方式",
    welcomeCopy: "本地优先设置会把接口凭据和分析记录保存在当前浏览器。",
    smvapi: "使用 SMVAPI 账户登录",
    unavailable: "暂未开放",
    unavailableTip: "暂未开放",
    customApi: "自定义接口",
    customApiCopy: "接入兼容接口、图片理解接口，或其他支持图片分析的接口。",
    openCustomApi: "配置",
    connection: "连接",
    account: "账户模式",
    localMode: "本地自定义 API",
    language: "语言",
    status: "插件状态",
    enabled: "开启",
    disabled: "暂停",
    apiSummary: "自定义接口",
    apiMissing: "未配置",
    edit: "编辑",
    test: "测试连接",
    save: "保存设置",
    saving: "保存中...",
    testing: "测试中...",
    baseUrl: "接口地址",
    apiKey: "接口密钥",
    model: "模型名称",
    baseUrlPlaceholder: "请输入接口地址",
    apiKeyPlaceholder: "请输入接口密钥",
    modelPlaceholder: "请输入支持图片分析的模型名称",
    cancel: "取消",
    saved: "设置已保存。",
    connected: "接口已连通。",
    navLocal: "本地数据",
    navBackend: "后台",
    navHistory: "保存记录",
    navHistorySub: "查看本地分析记录",
    navApi: "接口设置",
    navApiSub: "地址、密钥和模型",
    navPreferences: "偏好设置",
    navPreferencesSub: "语言和插件开关",
    navAccount: "账户模式",
    navAccountSub: "SMVAPI 登录状态",
    apiTitle: "自定义接口",
    apiCopy: "管理图片分析使用的接口配置。",
    preferencesTitle: "偏好设置",
    preferencesCopy: "控制界面语言和网页分析开关。",
    historyTitle: "本地保存记录",
    historyCopy: "记录保存在当前浏览器本地存储中。",
    emptyHistory: "还没有保存记录。",
    clearHistory: "清空记录",
    delete: "删除",
    source: "来源",
  },
  "zh-TW": {
    console: "系統設定",
    lead: "設定圖片提示詞分析、介面語言，並查看本地保存記錄。",
    welcomeTitle: "選擇 MX-Insight 的連線方式",
    welcomeCopy: "本地優先設定會把介面憑證和分析記錄保存在目前瀏覽器。",
    smvapi: "使用 SMVAPI 帳戶登入",
    unavailable: "暫未開放",
    unavailableTip: "暫未開放",
    customApi: "自訂介面",
    customApiCopy: "接入相容介面、圖片理解介面，或其他支援圖片分析的介面。",
    openCustomApi: "設定",
    connection: "連線",
    account: "帳戶模式",
    localMode: "本地自訂 API",
    language: "語言",
    status: "插件狀態",
    enabled: "開啟",
    disabled: "暫停",
    apiSummary: "自訂介面",
    apiMissing: "未設定",
    edit: "編輯",
    test: "測試連線",
    save: "保存設定",
    saving: "保存中...",
    testing: "測試中...",
    baseUrl: "介面位址",
    apiKey: "介面密鑰",
    model: "模型名稱",
    baseUrlPlaceholder: "請輸入介面位址",
    apiKeyPlaceholder: "請輸入介面密鑰",
    modelPlaceholder: "請輸入支援圖片分析的模型名稱",
    cancel: "取消",
    saved: "設定已保存。",
    connected: "介面已連通。",
    navLocal: "本地資料",
    navBackend: "後台",
    navHistory: "保存記錄",
    navHistorySub: "查看本地分析記錄",
    navApi: "介面設定",
    navApiSub: "位址、密鑰和模型",
    navPreferences: "偏好設定",
    navPreferencesSub: "語言和插件開關",
    navAccount: "帳戶模式",
    navAccountSub: "SMVAPI 登入狀態",
    apiTitle: "自訂介面",
    apiCopy: "管理圖片分析使用的介面設定。",
    preferencesTitle: "偏好設定",
    preferencesCopy: "控制介面語言和網頁分析開關。",
    historyTitle: "本地保存記錄",
    historyCopy: "記錄保存在目前瀏覽器本地儲存中。",
    emptyHistory: "還沒有保存記錄。",
    clearHistory: "清空記錄",
    delete: "刪除",
    source: "來源",
  },
  ja: {
    console: "システム設定",
    lead: "画像プロンプト分析、表示言語、ローカル保存履歴を管理します。",
    welcomeTitle: "MX-Insight の接続方法を選択",
    welcomeCopy: "ローカル優先の設定では、API 認証情報と分析履歴をこのブラウザに保存します。",
    smvapi: "SMVAPI アカウントでログイン",
    unavailable: "未公開",
    unavailableTip: "暂未开放",
    customApi: "カスタム API",
    customApiCopy: "OpenAI 互換エンドポイント、Gemini、または画像理解対応 API を使用します。",
    openCustomApi: "設定",
    connection: "接続",
    account: "アカウントモード",
    localMode: "ローカルカスタム API",
    language: "言語",
    status: "拡張機能の状態",
    enabled: "有効",
    disabled: "停止",
    apiSummary: "カスタム API",
    apiMissing: "未設定",
    edit: "編集",
    test: "接続テスト",
    save: "設定を保存",
    saving: "保存中...",
    testing: "テスト中...",
    baseUrl: "Base URL",
    apiKey: "API Key",
    model: "Model",
    baseUrlPlaceholder: "https://api.openai.com/v1",
    apiKeyPlaceholder: "sk-... / AIza...",
    modelPlaceholder: "gpt-4o-mini / gemini-2.5-flash / qwen-vl-max",
    cancel: "キャンセル",
    saved: "設定を保存しました。",
    connected: "接続できます。",
    navLocal: "ローカルデータ",
    navBackend: "管理",
    navHistory: "保存履歴",
    navHistorySub: "ローカル分析を確認",
    navApi: "API 設定",
    navApiSub: "URL、キー、モデル",
    navPreferences: "環境設定",
    navPreferencesSub: "言語と拡張機能",
    navAccount: "アカウントモード",
    navAccountSub: "SMVAPI ログイン状態",
    apiTitle: "カスタム API",
    apiCopy: "画像分析に使用する API を管理します。",
    preferencesTitle: "環境設定",
    preferencesCopy: "表示言語とページ分析の有効状態を管理します。",
    historyTitle: "ローカル保存履歴",
    historyCopy: "履歴はこのブラウザの chrome.storage.local に保存されます。",
    emptyHistory: "保存履歴はまだありません。",
    clearHistory: "履歴を消去",
    delete: "削除",
    source: "出典",
  },
};

const root = document.getElementById("root");
let settings = { ...DEFAULTS };
let historyEntries = [];
let welcomeMode = location.hash === "#welcome";
let modalOpen = !welcomeMode && (location.hash === "#base-url" || location.hash === "#custom-api");
let welcomeReady = !welcomeMode;
let activeSection = sectionFromHash();
let message = "";
let messageTone = "";
let saving = false;
let testing = false;

document.body.dataset.page = "options";

function sectionFromHash(hash = location.hash) {
  if (hash === "#api" || hash === "#settings" || hash === "#base-url" || hash === "#custom-api") return "api";
  if (hash === "#preferences") return "preferences";
  if (hash === "#account") return "account";
  return "history";
}

function detectLanguage(value = settings.uiLanguage) {
  if (value && value !== "auto") return TEXT[value] ? value : "en";
  const nav = navigator.language || "en";
  if (/^ja/i.test(nav)) return "ja";
  if (/^(zh-HK|zh-TW|zh-MO)/i.test(nav)) return "zh-TW";
  if (/^zh/i.test(nav)) return "zh-CN";
  return "en";
}

function t(key) {
  const lang = detectLanguage();
  return TEXT[lang][key] || TEXT.en[key] || key;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function promptFor(entry) {
  const analysis = entry?.analysis || {};
  const lang = detectLanguage();
  if (lang === "en") return analysis.en?.prompt || analysis.zh?.prompt || "";
  if (lang === "ja") return analysis.ja?.prompt || analysis.en?.prompt || analysis.zh?.prompt || "";
  if (lang === "zh-TW") return analysis.zhHant?.prompt || analysis.zh_hant?.prompt || analysis.zh?.prompt || "";
  return analysis.zh?.prompt || analysis.en?.prompt || "";
}

function formatDate(timestamp) {
  try {
    return new Intl.DateTimeFormat(detectLanguage(), {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(timestamp));
  } catch {
    return new Date(timestamp).toLocaleString();
  }
}

async function load() {
  const stored = await chrome.storage.local.get([...SETTINGS_KEYS, HISTORY_KEY]);
  settings = {
    ...DEFAULTS,
    ...stored,
    enabled: typeof stored.enabled === "boolean" ? stored.enabled : true,
    uiLanguage: typeof stored.uiLanguage === "string" ? stored.uiLanguage : "auto",
  };
  historyEntries = Array.isArray(stored[HISTORY_KEY]) ? stored[HISTORY_KEY] : [];
  render();
}

async function saveSettingsFromForm(testAfterSave = false) {
  const baseUrl = document.getElementById("base-url")?.value.trim() || "";
  const apiKey = document.getElementById("api-key")?.value.trim() || "";
  const model = document.getElementById("model")?.value.trim() || "";
  const next = { baseUrl, apiKey, model };
  saving = !testAfterSave;
  testing = testAfterSave;
  message = "";
  render();
  try {
    await chrome.storage.local.set(next);
    settings = { ...settings, ...next };
    if (testAfterSave) {
      const response = await chrome.runtime.sendMessage({ type: "TEST_CONNECTION" });
      if (!response?.ok) throw new Error(response?.error || "Connection failed.");
      message = t("connected");
      messageTone = "success";
      modalOpen = false;
      welcomeMode = false;
      if (location.hash) history.replaceState(null, "", "options.html");
    } else {
      message = t("saved");
      messageTone = "success";
      modalOpen = false;
      welcomeMode = false;
      if (location.hash) history.replaceState(null, "", "options.html");
    }
  } catch (error) {
    message = error instanceof Error ? error.message : String(error);
    messageTone = "error";
  } finally {
    saving = false;
    testing = false;
    render();
  }
}

async function setLanguage(value) {
  settings = { ...settings, uiLanguage: value };
  await chrome.storage.local.set({ uiLanguage: value });
  render();
}

async function setEnabled(value) {
  settings = { ...settings, enabled: value };
  await chrome.storage.local.set({ enabled: value });
  render();
}

async function deleteRecord(id) {
  historyEntries = historyEntries.filter((entry) => entry.id !== id);
  await chrome.storage.local.set({ [HISTORY_KEY]: historyEntries });
  render();
}

async function clearHistory() {
  historyEntries = [];
  await chrome.storage.local.set({ [HISTORY_KEY]: [] });
  await chrome.storage.local.remove(SNAPSHOT_KEY);
  render();
}

function renderLanguageOptions() {
  const lang = detectLanguage();
  return LANGUAGES.map((item) => (
    `<option value="${item.value}" ${settings.uiLanguage === item.value ? "selected" : ""}>${escapeHtml(item.labels[lang] || item.labels.en)}</option>`
  )).join("");
}

function renderWelcome() {
  if (!welcomeMode) return "";
  return `
    <section class="welcome-stage${welcomeReady ? " is-ready" : ""}" aria-label="${escapeHtml(t("welcomeTitle"))}">
      <div class="fireworks" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
      <div class="welcome-copy">
        <img src="/icons/icon-128.png" alt="" class="welcome-logo" />
        <h1>${escapeHtml(t("welcomeTitle"))}</h1>
        <p>${escapeHtml(t("welcomeCopy"))}</p>
      </div>
      <div class="choice-grid">
        <button type="button" class="choice-card is-disabled" aria-disabled="true" data-tooltip="${escapeHtml(t("unavailableTip"))}" title="${escapeHtml(t("unavailableTip"))}">
          <span class="choice-kicker">${escapeHtml(t("account"))}</span>
          <strong>${escapeHtml(t("smvapi"))}</strong>
          <small>${escapeHtml(t("unavailable"))}</small>
        </button>
        <button type="button" class="choice-card" id="welcome-custom-api">
          <span class="choice-kicker">${escapeHtml(t("connection"))}</span>
          <strong>${escapeHtml(t("customApi"))}</strong>
          <small>${escapeHtml(t("customApiCopy"))}</small>
        </button>
      </div>
    </section>
  `;
}

function renderHistory() {
  const rows = historyEntries.slice(0, 50).map((entry) => {
    const prompt = promptFor(entry);
    const preview = prompt.length > 260 ? `${prompt.slice(0, 260).trimEnd()}...` : prompt;
    return `
      <article class="record-card">
        <img src="${escapeHtml(entry.imageSrc || "")}" alt="" loading="lazy" />
        <div class="record-body">
          <div class="record-meta">
            <span>${escapeHtml(formatDate(entry.createdAt || Date.now()))}</span>
            <button type="button" class="text-button danger" data-delete-record="${escapeHtml(entry.id)}">${escapeHtml(t("delete"))}</button>
          </div>
          <p>${escapeHtml(preview || "")}</p>
          <a href="${escapeHtml(entry.pageUrl || "#")}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("source"))}</a>
        </div>
      </article>
    `;
  }).join("");

  return `
    <section class="panel-section history-section">
      <div class="section-head">
        <div>
          <p class="eyebrow">${escapeHtml(t("historyTitle"))}</p>
          <h2>${historyEntries.length}</h2>
          <p>${escapeHtml(t("historyCopy"))}</p>
        </div>
        <button type="button" class="secondary-action" id="clear-history" ${historyEntries.length ? "" : "disabled"}>
          ${escapeHtml(t("clearHistory"))}
        </button>
      </div>
      <div class="record-list">
        ${rows || `<p class="empty-state">${escapeHtml(t("emptyHistory"))}</p>`}
      </div>
    </section>
  `;
}

function renderSidebar() {
  return `
    <aside class="side-rail">
      <div class="brand-block">
        <img src="/icons/icon-128.png" alt="" class="brand-logo" />
        <div class="brand-copy">
          <h1>MX-Insight</h1>
          <p>图片提示词分析</p>
        </div>
      </div>
      <nav class="side-nav" aria-label="后台导航">
        <div class="side-nav-group">
          <p class="side-nav-label">${escapeHtml(t("navLocal"))}</p>
          <button type="button" class="side-nav-item${activeSection === "history" ? " is-active" : ""}" data-section="history">
            <span class="side-nav-title">${escapeHtml(t("navHistory"))}</span>
            <span class="side-nav-subtitle">${escapeHtml(t("navHistorySub"))}</span>
          </button>
        </div>
        <div class="side-nav-group">
          <p class="side-nav-label">${escapeHtml(t("navBackend"))}</p>
          <button type="button" class="side-nav-item${activeSection === "api" ? " is-active" : ""}" data-section="api">
            <span class="side-nav-title">${escapeHtml(t("navApi"))}</span>
            <span class="side-nav-subtitle">${escapeHtml(t("navApiSub"))}</span>
          </button>
          <button type="button" class="side-nav-item${activeSection === "preferences" ? " is-active" : ""}" data-section="preferences">
            <span class="side-nav-title">${escapeHtml(t("navPreferences"))}</span>
            <span class="side-nav-subtitle">${escapeHtml(t("navPreferencesSub"))}</span>
          </button>
          <button type="button" class="side-nav-item${activeSection === "account" ? " is-active" : ""}" data-section="account">
            <span class="side-nav-title">${escapeHtml(t("navAccount"))}</span>
            <span class="side-nav-subtitle">${escapeHtml(t("navAccountSub"))}</span>
          </button>
        </div>
      </nav>
      <footer>Copyright © Maishan Inc.</footer>
    </aside>
  `;
}

function renderHistoryView() {
  return `
    <section class="view-stack">
      ${renderHistory()}
    </section>
  `;
}

function renderApiView() {
  const configured = settings.baseUrl && settings.model;
  return `
    <section class="view-stack">
      <section class="hero-panel">
        <div>
          <img src="/icons/icon-128.png" alt="" class="section-logo" />
          <h2>${escapeHtml(t("apiTitle"))}</h2>
          <p>${escapeHtml(t("apiCopy"))}</p>
        </div>
      </section>

      <article class="panel-section">
        <div class="section-head">
          <div>
            <p class="eyebrow">${escapeHtml(t("apiSummary"))}</p>
            <h2>${escapeHtml(configured ? settings.model : t("apiMissing"))}</h2>
            <p>${escapeHtml(configured ? settings.baseUrl : t("customApiCopy"))}</p>
          </div>
          <button type="button" class="primary-action" id="edit-api">${escapeHtml(t("edit"))}</button>
        </div>
      </article>
    </section>
  `;
}

function renderPreferencesView() {
  return `
    <section class="view-stack">
      <section class="hero-panel">
        <div>
          <img src="/icons/icon-128.png" alt="" class="section-logo" />
          <h2>${escapeHtml(t("preferencesTitle"))}</h2>
          <p>${escapeHtml(t("preferencesCopy"))}</p>
        </div>
        <div class="control-row">
          <label class="compact-field">
            <span>${escapeHtml(t("language"))}</span>
            <select id="language-select">${renderLanguageOptions()}</select>
          </label>
          <label class="switch-field">
            <span>${escapeHtml(t("status"))}</span>
            <button type="button" class="toggle-chip${settings.enabled ? " is-on" : ""}" id="status-toggle">
              ${escapeHtml(settings.enabled ? t("enabled") : t("disabled"))}
            </button>
          </label>
        </div>
      </section>
    </section>
  `;
}

function renderAccountView() {
  return `
    <section class="view-stack">
      <article class="panel-section disabled-panel" title="${escapeHtml(t("unavailableTip"))}">
        <p class="eyebrow">${escapeHtml(t("account"))}</p>
        <h2>${escapeHtml(t("smvapi"))}</h2>
        <p>${escapeHtml(t("unavailable"))}</p>
      </article>
    </section>
  `;
}

function renderActiveView() {
  if (activeSection === "api") return renderApiView();
  if (activeSection === "preferences") return renderPreferencesView();
  if (activeSection === "account") return renderAccountView();
  return renderHistoryView();
}

function renderModal() {
  if (!modalOpen) return "";
  return `
    <div class="modal-layer" role="dialog" aria-modal="true" aria-label="${escapeHtml(t("customApi"))}">
      <form class="modal-card" id="custom-api-form">
        <header class="modal-header">
          <div>
            <p class="eyebrow">${escapeHtml(t("connection"))}</p>
            <h2>${escapeHtml(t("customApi"))}</h2>
          </div>
          <button type="button" class="icon-button" id="close-modal" aria-label="${escapeHtml(t("cancel"))}">×</button>
        </header>
        <label class="field field-wide">
          <span>${escapeHtml(t("baseUrl"))}</span>
          <input id="base-url" type="url" spellcheck="false" value="${escapeHtml(settings.baseUrl)}" placeholder="${escapeHtml(t("baseUrlPlaceholder"))}" />
        </label>
        <label class="field">
          <span>${escapeHtml(t("apiKey"))}</span>
          <input id="api-key" type="password" spellcheck="false" value="${escapeHtml(settings.apiKey)}" placeholder="${escapeHtml(t("apiKeyPlaceholder"))}" />
        </label>
        <label class="field">
          <span>${escapeHtml(t("model"))}</span>
          <input id="model" type="text" spellcheck="false" value="${escapeHtml(settings.model)}" placeholder="${escapeHtml(t("modelPlaceholder"))}" />
        </label>
        ${message ? `<p class="message ${messageTone === "error" ? "message-error" : "message-success"}">${escapeHtml(message)}</p>` : ""}
        <div class="modal-actions">
          <button type="button" class="secondary-action" id="test-connection" ${testing ? "disabled" : ""}>${escapeHtml(testing ? t("testing") : t("test"))}</button>
          <button type="submit" class="primary-action" ${saving ? "disabled" : ""}>${escapeHtml(saving ? t("saving") : t("save"))}</button>
        </div>
      </form>
    </div>
  `;
}

function render() {
  if (welcomeMode) {
    root.innerHTML = `
      <main class="install-shell">
        ${renderWelcome()}
        ${renderModal()}
      </main>
    `;
    bindEvents();
    return;
  }

  root.innerHTML = `
    <main class="page-shell">
      ${renderSidebar()}

      <section class="workspace">
        ${renderActiveView()}
      </section>
      ${renderModal()}
    </main>
  `;

  bindEvents();
}

function bindEvents() {
  document.getElementById("language-select")?.addEventListener("change", (event) => setLanguage(event.target.value));
  document.getElementById("status-toggle")?.addEventListener("click", () => setEnabled(!settings.enabled));
  document.getElementById("edit-api")?.addEventListener("click", () => {
    modalOpen = true;
    message = "";
    render();
  });
  document.getElementById("welcome-custom-api")?.addEventListener("click", () => {
    modalOpen = true;
    message = "";
    render();
  });
  document.getElementById("close-modal")?.addEventListener("click", () => {
    modalOpen = false;
    message = "";
    render();
  });
  document.getElementById("custom-api-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSettingsFromForm(false);
  });
  document.getElementById("test-connection")?.addEventListener("click", () => saveSettingsFromForm(true));
  document.getElementById("clear-history")?.addEventListener("click", clearHistory);
  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSection = ["api", "preferences", "account", "history"].includes(button.dataset.section) ? button.dataset.section : "history";
      history.replaceState(null, "", `options.html#${activeSection}`);
      render();
    });
  });
  document.querySelectorAll("[data-delete-record]").forEach((button) => {
    button.addEventListener("click", () => deleteRecord(button.dataset.deleteRecord));
  });
}

if (welcomeMode) {
  window.setTimeout(() => {
    welcomeReady = true;
    render();
  }, 1600);
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes[HISTORY_KEY]) historyEntries = Array.isArray(changes[HISTORY_KEY].newValue) ? changes[HISTORY_KEY].newValue : [];
  if (SETTINGS_KEYS.some((key) => changes[key])) {
    for (const key of SETTINGS_KEYS) {
      if (changes[key]) settings[key] = changes[key].newValue;
    }
  }
  render();
});

load();
