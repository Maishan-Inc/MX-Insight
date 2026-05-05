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
  { value: "auto", label: "Auto" },
  { value: "en", label: "English" },
  { value: "zh-CN", label: "简体中文" },
  { value: "zh-TW", label: "繁體中文" },
  { value: "ja", label: "日本語" },
];

const TEXT = {
  en: {
    console: "Console",
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
    cancel: "Cancel",
    saved: "Settings saved.",
    connected: "Connection is available.",
    historyTitle: "Local saved records",
    historyCopy: "Records are stored in chrome.storage.local on this browser.",
    emptyHistory: "No saved records yet.",
    clearHistory: "Clear records",
    delete: "Delete",
    source: "Source",
  },
  "zh-CN": {
    console: "后台",
    lead: "配置图片提示词分析、界面语言，并查看本地保存记录。",
    welcomeTitle: "选择 MX-Insight 的连接方式",
    welcomeCopy: "本地优先设置会把 API 凭据和分析记录保存在当前浏览器。",
    smvapi: "使用 SMVAPI 账户登录",
    unavailable: "暂未开放",
    unavailableTip: "暂未开放",
    customApi: "自定义 API",
    customApiCopy: "接入 OpenAI 兼容接口、Gemini 接口，或其他支持图片理解的 API。",
    openCustomApi: "配置",
    connection: "连接",
    account: "账户模式",
    localMode: "本地自定义 API",
    language: "语言",
    status: "插件状态",
    enabled: "开启",
    disabled: "暂停",
    apiSummary: "自定义 API",
    apiMissing: "未配置",
    edit: "编辑",
    test: "测试连接",
    save: "保存设置",
    saving: "保存中...",
    testing: "测试中...",
    baseUrl: "Base URL",
    apiKey: "API Key",
    model: "Model",
    cancel: "取消",
    saved: "设置已保存。",
    connected: "接口已连通。",
    historyTitle: "本地保存记录",
    historyCopy: "记录保存在当前浏览器的 chrome.storage.local 中。",
    emptyHistory: "还没有保存记录。",
    clearHistory: "清空记录",
    delete: "删除",
    source: "来源",
  },
  "zh-TW": {
    console: "後台",
    lead: "設定圖片提示詞分析、介面語言，並查看本地保存記錄。",
    welcomeTitle: "選擇 MX-Insight 的連線方式",
    welcomeCopy: "本地優先設定會把 API 憑證和分析記錄保存在目前瀏覽器。",
    smvapi: "使用 SMVAPI 帳戶登入",
    unavailable: "暫未開放",
    unavailableTip: "暫未開放",
    customApi: "自訂 API",
    customApiCopy: "接入 OpenAI 相容介面、Gemini 介面，或其他支援圖片理解的 API。",
    openCustomApi: "設定",
    connection: "連線",
    account: "帳戶模式",
    localMode: "本地自訂 API",
    language: "語言",
    status: "插件狀態",
    enabled: "開啟",
    disabled: "暫停",
    apiSummary: "自訂 API",
    apiMissing: "未設定",
    edit: "編輯",
    test: "測試連線",
    save: "保存設定",
    saving: "保存中...",
    testing: "測試中...",
    baseUrl: "Base URL",
    apiKey: "API Key",
    model: "Model",
    cancel: "取消",
    saved: "設定已保存。",
    connected: "介面已連通。",
    historyTitle: "本地保存記錄",
    historyCopy: "記錄保存在目前瀏覽器的 chrome.storage.local 中。",
    emptyHistory: "還沒有保存記錄。",
    clearHistory: "清空記錄",
    delete: "刪除",
    source: "來源",
  },
  ja: {
    console: "管理画面",
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
    cancel: "キャンセル",
    saved: "設定を保存しました。",
    connected: "接続できます。",
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
let modalOpen = false;
let welcomeMode = location.hash === "#welcome";
let welcomeReady = !welcomeMode;
let message = "";
let messageTone = "";
let saving = false;
let testing = false;

document.body.dataset.page = "options";

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
    } else {
      message = t("saved");
      messageTone = "success";
      modalOpen = false;
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
  return LANGUAGES.map((item) => (
    `<option value="${item.value}" ${settings.uiLanguage === item.value ? "selected" : ""}>${escapeHtml(item.label)}</option>`
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
        <p class="eyebrow">MX-Insight</p>
        <h1>${escapeHtml(t("welcomeTitle"))}</h1>
        <p>${escapeHtml(t("welcomeCopy"))}</p>
      </div>
      <div class="choice-grid">
        <button type="button" class="choice-card is-disabled" disabled data-tooltip="${escapeHtml(t("unavailableTip"))}" title="${escapeHtml(t("unavailableTip"))}">
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
          <input id="base-url" type="url" spellcheck="false" value="${escapeHtml(settings.baseUrl)}" placeholder="https://api.openai.com/v1" />
        </label>
        <label class="field">
          <span>${escapeHtml(t("apiKey"))}</span>
          <input id="api-key" type="password" spellcheck="false" value="${escapeHtml(settings.apiKey)}" placeholder="sk-... / AIza..." />
        </label>
        <label class="field">
          <span>${escapeHtml(t("model"))}</span>
          <input id="model" type="text" spellcheck="false" value="${escapeHtml(settings.model)}" placeholder="gpt-4o-mini / gemini-2.5-flash / qwen-vl-max" />
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
  const configured = settings.baseUrl && settings.model;
  root.innerHTML = `
    <main class="page-shell">
      <aside class="side-rail">
        <div>
          <p class="brand-mark">MX</p>
          <h1>MX-Insight</h1>
          <p>${escapeHtml(t("lead"))}</p>
        </div>
        <footer>Copyright &copy; Maishan Inc.</footer>
      </aside>

      <section class="workspace">
        ${renderWelcome()}

        <section class="hero-panel">
          <div>
            <p class="eyebrow">MX-Insight</p>
            <h2>${escapeHtml(t("console"))}</h2>
            <p>${escapeHtml(t("lead"))}</p>
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

        <section class="panel-grid">
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

          <article class="panel-section disabled-panel" title="${escapeHtml(t("unavailableTip"))}">
            <p class="eyebrow">${escapeHtml(t("account"))}</p>
            <h2>${escapeHtml(t("smvapi"))}</h2>
            <p>${escapeHtml(t("unavailable"))}</p>
          </article>
        </section>

        ${renderHistory()}
      </section>
      ${renderModal()}
    </main>
  `;

  document.getElementById("language-select")?.addEventListener("change", (event) => setLanguage(event.target.value));
  document.getElementById("status-toggle")?.addEventListener("click", () => setEnabled(!settings.enabled));
  document.getElementById("edit-api")?.addEventListener("click", () => {
    modalOpen = true;
    message = "";
    render();
  });
  document.getElementById("welcome-custom-api")?.addEventListener("click", () => {
    modalOpen = true;
    welcomeMode = false;
    history.replaceState(null, "", "options.html");
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
