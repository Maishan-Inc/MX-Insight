const SETTINGS_KEYS = ["baseUrl", "apiKey", "model", "enabled", "defaultGeneratorSite", "uiLanguage"];
const HISTORY_KEY = "historyEntries";
const SNAPSHOT_KEY = "latestAnalysisSnapshot";
const TASKS_KEY = "reversePromptTasks";

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
    console: "Console",
    lead: "Manage reverse prompt records, API settings, preferences, and account status.",
    settings: "Settings",
    settingsSub: "API, preferences, account",
    history: "Reverse records",
    historySub: "Reverse prompt tasks",
    apiTitle: "API settings",
    apiCopy: "Base URL, API key and model used for image reverse-prompt analysis.",
    baseUrl: "Base URL",
    apiKey: "API Key",
    model: "Model",
    baseUrlPlaceholder: "https://api.openai.com/v1",
    apiKeyPlaceholder: "sk-... / AIza...",
    modelPlaceholder: "gpt-5.5 / gemini-2.5-flash / qwen-vl-max",
    preferencesTitle: "Preferences",
    language: "Language",
    status: "Extension switch",
    enabled: "Enabled",
    disabled: "Paused",
    accountTitle: "Account mode",
    accountCopy: "SMVAPI login status",
    smvapi: "SMVAPI",
    unavailable: "Not logged in / not available yet",
    save: "Save",
    test: "Save and test",
    saving: "Saving...",
    testing: "Testing...",
    saved: "Settings saved.",
    connected: "Connection is available.",
    historyTitle: "Reverse prompt records",
    historyCopy: "Live task progress appears here. Click prompt text to copy after completion.",
    emptyHistory: "No reverse prompt records yet.",
    clearHistory: "Clear records",
    taskProgress: "Task progress",
    taskDone: "Completed",
    taskError: "Failed",
    taskRunning: "Running",
    taskQueued: "Queued",
    taskReadImage: "Reading image",
    taskSendModel: "Sending to model",
    taskModelWorking: "Model is generating",
    taskGeneratePrompt: "Generating prompt",
    taskRetryJson: "Checking output, retrying",
    taskPrepare: "Preparing analysis",
    taskComplete: "Reverse prompt complete",
    taskFailed: "Reverse prompt failed",
    delete: "Delete",
    source: "Source",
    uploaded: "Uploaded image",
    copy: "Copy",
    copied: "Copied.",
    imageUnavailable: "Image unavailable",
  },
  "zh-CN": {
    console: "后台",
    lead: "管理本地反推记录、接口设置、偏好设置和账户状态。",
    settings: "设置",
    settingsSub: "接口、偏好、账户",
    history: "反推记录",
    historySub: "查看反推任务和结果",
    apiTitle: "接口设置",
    apiCopy: "图片反推使用的接口地址、密钥和模型。",
    baseUrl: "接口地址",
    apiKey: "接口密钥",
    model: "模型名称",
    baseUrlPlaceholder: "请输入接口地址",
    apiKeyPlaceholder: "请输入接口密钥",
    modelPlaceholder: "请输入支持图片分析的模型名称",
    preferencesTitle: "偏好设置",
    language: "语言",
    status: "插件开关",
    enabled: "开启",
    disabled: "暂停",
    accountTitle: "账户模式",
    accountCopy: "SMVAPI 登录状态",
    smvapi: "SMVAPI",
    unavailable: "未登录 / 暂未开放",
    save: "保存",
    test: "保存并测试",
    saving: "保存中...",
    testing: "测试中...",
    saved: "设置已保存。",
    connected: "接口已连通。",
    historyTitle: "反推记录",
    historyCopy: "这里会实时显示后台反推进度。完成后点击提示词文字即可复制。",
    emptyHistory: "还没有反推记录。",
    clearHistory: "清空记录",
    taskProgress: "任务进度",
    taskDone: "已完成",
    taskError: "失败",
    taskRunning: "进行中",
    taskQueued: "已加入后台任务",
    taskReadImage: "读取图片",
    taskSendModel: "发送至模型",
    taskModelWorking: "模型生成中",
    taskGeneratePrompt: "生成提示词",
    taskRetryJson: "校验输出，正在重试",
    taskPrepare: "准备分析",
    taskComplete: "反推完成",
    taskFailed: "反推失败",
    delete: "删除",
    source: "来源",
    uploaded: "上传图片",
    copy: "复制",
    copied: "已复制。",
    imageUnavailable: "图片不可用",
  },
  "zh-TW": {
    console: "後台",
    lead: "管理本地反推記錄、介面設定、偏好設定和帳戶狀態。",
    settings: "設定",
    settingsSub: "介面、偏好、帳戶",
    history: "反推記錄",
    historySub: "查看反推任務和結果",
    apiTitle: "介面設定",
    apiCopy: "圖片反推使用的介面位址、密鑰和模型。",
    baseUrl: "介面位址",
    apiKey: "介面密鑰",
    model: "模型名稱",
    baseUrlPlaceholder: "請輸入介面位址",
    apiKeyPlaceholder: "請輸入介面密鑰",
    modelPlaceholder: "請輸入支援圖片分析的模型名稱",
    preferencesTitle: "偏好設定",
    language: "語言",
    status: "插件開關",
    enabled: "開啟",
    disabled: "暫停",
    accountTitle: "帳戶模式",
    accountCopy: "SMVAPI 登入狀態",
    smvapi: "SMVAPI",
    unavailable: "未登入 / 暫未開放",
    save: "保存",
    test: "保存並測試",
    saving: "保存中...",
    testing: "測試中...",
    saved: "設定已保存。",
    connected: "介面已連通。",
    historyTitle: "反推記錄",
    historyCopy: "這裡會即時顯示後台反推進度。完成後點擊提示詞文字即可複製。",
    emptyHistory: "還沒有反推記錄。",
    clearHistory: "清空記錄",
    taskProgress: "任務進度",
    taskDone: "已完成",
    taskError: "失敗",
    taskRunning: "進行中",
    taskQueued: "已加入後台任務",
    taskReadImage: "讀取圖片",
    taskSendModel: "發送至模型",
    taskModelWorking: "模型生成中",
    taskGeneratePrompt: "生成提示詞",
    taskRetryJson: "校驗輸出，正在重試",
    taskPrepare: "準備分析",
    taskComplete: "反推完成",
    taskFailed: "反推失敗",
    delete: "刪除",
    source: "來源",
    uploaded: "上傳圖片",
    copy: "複製",
    copied: "已複製。",
    imageUnavailable: "圖片不可用",
  },
  ja: {
    console: "管理",
    lead: "逆引き記録、API 設定、環境設定、アカウント状態を管理します。",
    settings: "設定",
    settingsSub: "API、環境設定、アカウント",
    history: "逆引き記録",
    historySub: "ローカル分析を確認",
    apiTitle: "API 設定",
    apiCopy: "画像分析に使う URL、キー、モデルを設定します。",
    baseUrl: "Base URL",
    apiKey: "API Key",
    model: "Model",
    baseUrlPlaceholder: "https://api.openai.com/v1",
    apiKeyPlaceholder: "sk-... / AIza...",
    modelPlaceholder: "gpt-5.5 / gemini-2.5-flash / qwen-vl-max",
    preferencesTitle: "環境設定",
    language: "言語",
    status: "拡張機能",
    enabled: "有効",
    disabled: "停止",
    accountTitle: "アカウントモード",
    accountCopy: "SMVAPI ログイン状態",
    smvapi: "SMVAPI",
    unavailable: "未ログイン / 未公開",
    save: "保存",
    test: "保存してテスト",
    saving: "保存中...",
    testing: "テスト中...",
    saved: "設定を保存しました。",
    connected: "接続できます。",
    historyTitle: "逆引き記録",
    historyCopy: "プロンプト本文をクリックするとコピーできます。アップロード画像はアップロード元として表示します。",
    emptyHistory: "逆引き記録はまだありません。",
    clearHistory: "履歴を消去",
    taskProgress: "タスク進行状況",
    taskDone: "完了",
    taskError: "失敗",
    taskRunning: "実行中",
    taskQueued: "バックグラウンドに追加済み",
    taskReadImage: "画像を読み込み中",
    taskSendModel: "モデルへ送信中",
    taskModelWorking: "モデル生成中",
    taskGeneratePrompt: "プロンプト生成中",
    taskRetryJson: "出力確認、再試行中",
    taskPrepare: "分析準備中",
    taskComplete: "逆引き完了",
    taskFailed: "逆引き失敗",
    delete: "削除",
    source: "出典",
    uploaded: "アップロード画像",
    copy: "コピー",
    copied: "コピーしました。",
    imageUnavailable: "画像を表示できません",
  },
};

const root = document.getElementById("root");
let settings = { ...DEFAULTS };
let historyEntries = [];
let reverseTasks = [];
let activeSection = sectionFromHash();
let message = "";
let messageTone = "";
let toast = "";
let toastTone = "";
let toastTimer = null;
let saving = false;
let testing = false;
let recordPromptLanguages = {};

document.body.dataset.page = "options";

function sectionFromHash(hash = location.hash) {
  if (hash === "#history") return "history";
  return "settings";
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

function cssUrl(value) {
  return String(value ?? "").replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("\n", "");
}

function sortTasks(tasks) {
  return Array.isArray(tasks)
    ? [...tasks].sort((a, b) => {
        const bTime = typeof b?.createdAt === "number" ? b.createdAt : 0;
        const aTime = typeof a?.createdAt === "number" ? a.createdAt : 0;
        return bTime - aTime;
      })
    : [];
}

const PROMPT_LANGUAGE_OPTIONS = [
  { value: "zh", label: "简中" },
  { value: "zh_hant", label: "繁中" },
  { value: "en", label: "EN" },
  { value: "ja", label: "日文" },
  { value: "json", label: "JSON" },
];

function defaultPromptLanguage() {
  const lang = detectLanguage();
  if (lang === "en") return "en";
  if (lang === "ja") return "ja";
  if (lang === "zh-TW") return "zh_hant";
  return "zh";
}

function promptLanguageFor(entry) {
  const value = recordPromptLanguages[entry?.id];
  return PROMPT_LANGUAGE_OPTIONS.some((option) => option.value === value) ? value : defaultPromptLanguage();
}

function jsonPromptFor(entry) {
  const analysis = entry?.analysis || {};
  const json = analysis.jsonPrompt || {};
  const raw = json.raw && typeof json.raw === "object" ? json.raw : {
    subject: json.subject,
    action_pose: json.actionPose,
    details_appearance: json.detailsAppearance,
    environment_background: json.environmentBackground,
    lighting_atmosphere: json.lightingAtmosphere,
    composition_framing: json.compositionFraming,
    style_camera: json.styleCamera,
    colors: json.colors,
    materials: json.materials,
    aspect_ratio: json.aspectRatio,
    quality_modifiers: json.qualityModifiers,
    likely_generation_intent: json.likelyGenerationIntent,
  };
  if (analysis.recreationPrompt) raw.recreation_prompt = analysis.recreationPrompt;
  if (analysis.promptCore) raw.prompt_core = analysis.promptCore;
  if (analysis.negativePrompt) raw.negative_prompt = analysis.negativePrompt;
  return JSON.stringify(raw, null, 2);
}

function promptFor(entry, language = promptLanguageFor(entry)) {
  const analysis = entry?.analysis || {};
  if (language === "json") return jsonPromptFor(entry);
  if (language === "en") return analysis.recreationPrompt || analysis.en?.prompt || analysis.zh?.prompt || "";
  if (language === "ja") return analysis.ja?.prompt || analysis.en?.prompt || analysis.zh?.prompt || "";
  if (language === "zh_hant") return analysis.zhHant?.prompt || analysis.zh_hant?.prompt || analysis.zh?.prompt || "";
  return analysis.zh?.prompt || analysis.en?.prompt || analysis.recreationPrompt || "";
}

function renderPromptLanguageOptions(value) {
  return PROMPT_LANGUAGE_OPTIONS.map((option) => (
    `<option value="${option.value}" ${option.value === value ? "selected" : ""}>${escapeHtml(option.label)}</option>`
  )).join("");
}

function sourceFor(entry) {
  const pageUrl = typeof entry.pageUrl === "string" ? entry.pageUrl.trim() : "";
  if (!pageUrl || pageUrl === "#") return t("uploaded");
  return pageUrl;
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
  const stored = await chrome.storage.local.get([...SETTINGS_KEYS, HISTORY_KEY, TASKS_KEY]);
  settings = {
    ...DEFAULTS,
    ...stored,
    enabled: typeof stored.enabled === "boolean" ? stored.enabled : true,
    uiLanguage: typeof stored.uiLanguage === "string" ? stored.uiLanguage : "auto",
  };
  historyEntries = Array.isArray(stored[HISTORY_KEY]) ? stored[HISTORY_KEY] : [];
  reverseTasks = sortTasks(stored[TASKS_KEY]);
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
    } else {
      message = t("saved");
    }
    messageTone = "success";
    showToast(message, "success");
  } catch (error) {
    message = error instanceof Error ? error.message : String(error);
    messageTone = "error";
    showToast(message, "error");
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
  reverseTasks = reverseTasks.filter((task) => task.recordId !== id);
  await chrome.storage.local.set({
    [HISTORY_KEY]: historyEntries,
    [TASKS_KEY]: reverseTasks,
  });
  render();
}

async function clearHistory() {
  historyEntries = [];
  await chrome.storage.local.set({ [HISTORY_KEY]: [] });
  await chrome.storage.local.remove(SNAPSHOT_KEY);
  render();
}

function statusLabel(status) {
  if (status === "success") return t("taskDone");
  if (status === "error") return t("taskError");
  return t("taskRunning");
}

function stepLabel(task) {
  const map = {
    queued: "taskQueued",
    readImage: "taskReadImage",
    sendModel: "taskSendModel",
    modelWorking: "taskModelWorking",
    generatePrompt: "taskGeneratePrompt",
    retryJson: "taskRetryJson",
    prepare: "taskPrepare",
    complete: "taskComplete",
    failed: "taskFailed",
  };
  const raw = String(task?.step || "");
  const inferred =
    raw.includes("读取") || raw.includes("讀取") ? "readImage" :
    raw.includes("发送") || raw.includes("發送") ? "sendModel" :
    raw.includes("模型生成") ? "modelWorking" :
    raw.includes("生成提示") ? "generatePrompt" :
    raw.includes("重试") || raw.includes("重試") ? "retryJson" :
    raw.includes("准备") || raw.includes("準備") ? "prepare" :
    raw.includes("完成") ? "complete" :
    raw.includes("失败") || raw.includes("失敗") ? "failed" :
    raw.includes("后台") || raw.includes("後台") ? "queued" :
    "";
  return t(map[task?.stepKey || inferred] || "") || raw;
}

async function copyText(text) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  showToast(t("copied"), "success");
}

function showToast(text, tone = "success") {
  toast = text;
  toastTone = tone;
  if (toastTimer !== null) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast = "";
    toastTone = "";
    toastTimer = null;
    render();
  }, 1800);
  render();
}

function renderLanguageOptions() {
  const lang = detectLanguage();
  return LANGUAGES.map((item) => (
    `<option value="${item.value}" ${settings.uiLanguage === item.value ? "selected" : ""}>${escapeHtml(item.labels[lang] || item.labels.en)}</option>`
  )).join("");
}

function renderSidebar() {
  return `
    <aside class="side-rail">
      <div>
        <div class="brand-block">
          <img src="/icons/icon-128.png" alt="" class="brand-logo" />
          <div class="brand-copy">
            <h1>MX-Insight</h1>
            <p>${escapeHtml(t("console"))}</p>
          </div>
        </div>
        <nav class="side-nav" aria-label="后台导航">
          <button type="button" class="side-nav-item${activeSection === "history" ? " is-active" : ""}" data-section="history">
            <span class="side-nav-title">${escapeHtml(t("history"))}</span>
            <span class="side-nav-subtitle">${escapeHtml(t("historySub"))}</span>
          </button>
          <button type="button" class="side-nav-item${activeSection === "settings" ? " is-active" : ""}" data-section="settings">
            <span class="side-nav-title">${escapeHtml(t("settings"))}</span>
            <span class="side-nav-subtitle">${escapeHtml(t("settingsSub"))}</span>
          </button>
        </nav>
      </div>
      <footer>Copyright © Maishan Inc.</footer>
    </aside>
  `;
}

function renderSettingsView() {
  return `
    <section class="view-stack settings-grid">
      <section class="page-title">
        <div>
          <p class="eyebrow">${escapeHtml(t("console"))}</p>
          <h2>${escapeHtml(t("settings"))}</h2>
          <p>${escapeHtml(t("lead"))}</p>
        </div>
      </section>

      <form class="panel-section settings-api-card" id="settings-form">
        <div class="section-head">
          <div>
            <p class="eyebrow">${escapeHtml(t("apiTitle"))}</p>
            <h2>${escapeHtml(settings.model || t("model"))}</h2>
            <p>${escapeHtml(t("apiCopy"))}</p>
          </div>
        </div>
        <div class="form-grid">
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
        </div>
        ${message ? `<p class="message ${messageTone === "error" ? "message-error" : "message-success"}">${escapeHtml(message)}</p>` : ""}
        <div class="modal-actions">
          <button type="button" class="secondary-action" id="test-connection" ${testing ? "disabled" : ""}>${escapeHtml(testing ? t("testing") : t("test"))}</button>
          <button type="submit" class="primary-action" ${saving ? "disabled" : ""}>${escapeHtml(saving ? t("saving") : t("save"))}</button>
        </div>
      </form>

      <section class="panel-section settings-side-card">
        <p class="eyebrow">${escapeHtml(t("preferencesTitle"))}</p>
        <label class="compact-field">
          <span>${escapeHtml(t("language"))}</span>
          <select id="language-select">${renderLanguageOptions()}</select>
        </label>
        <div class="preference-row">
          <div>
            <span>${escapeHtml(t("status"))}</span>
            <strong>${escapeHtml(settings.enabled ? t("enabled") : t("disabled"))}</strong>
          </div>
          <button type="button" class="switch-control${settings.enabled ? " is-on" : ""}" id="status-toggle" aria-pressed="${settings.enabled ? "true" : "false"}">
            <span></span>
          </button>
        </div>
      </section>

      <section class="panel-section settings-side-card disabled-panel" title="${escapeHtml(t("unavailable"))}">
        <p class="eyebrow">${escapeHtml(t("accountTitle"))}</p>
        <h2>${escapeHtml(t("smvapi"))}</h2>
        <p>${escapeHtml(t("accountCopy"))}</p>
        <span class="account-status">${escapeHtml(t("unavailable"))}</span>
      </section>
    </section>
  `;
}

function renderHistory() {
  const visibleTasks = sortTasks(reverseTasks).slice(0, 40);
  const taskRows = visibleTasks.map((task) => {
    const progress = Math.max(0, Math.min(100, Math.round(Number(task.progress) || 0)));
    const tone = task.status === "error" ? " is-error" : task.status === "success" ? " is-success" : "";
    return `
      <article class="task-card${tone}">
        ${task.imageSrc ? `<img class="task-thumb" src="${escapeHtml(task.imageSrc)}" alt="" loading="lazy" referrerpolicy="no-referrer" />` : `<span class="task-thumb"></span>`}
        <div class="task-body">
          <div class="record-meta">
            <span>${escapeHtml(statusLabel(task.status))}</span>
            <span>${escapeHtml(formatDate(task.updatedAt || task.createdAt || Date.now()))}</span>
          </div>
          <strong>${escapeHtml(task.title || t("imageUnavailable"))}</strong>
          <div class="task-progress" aria-label="${escapeHtml(t("taskProgress"))}">
            <span style="width:${progress}%"></span>
          </div>
          <p class="${task.status === "error" ? "message-error" : ""}">${escapeHtml(task.error || stepLabel(task))}</p>
        </div>
      </article>
    `;
  }).join("");

  const rows = historyEntries.slice(0, 80).map((entry) => {
    const selectedLanguage = promptLanguageFor(entry);
    const prompt = promptFor(entry, selectedLanguage);
    const preview = prompt.length > 360 ? `${prompt.slice(0, 360).trimEnd()}...` : prompt;
    const source = sourceFor(entry);
    const sourceIsLink = source !== t("uploaded");
    return `
      <article class="record-card">
        <div class="record-image-shell">
          ${entry.imageSrc ? `<img src="${escapeHtml(entry.imageSrc)}" alt="" loading="lazy" referrerpolicy="no-referrer" data-record-img />` : ""}
          <span class="record-image-fallback">${escapeHtml(t("imageUnavailable"))}</span>
        </div>
        <div class="record-body">
          <div class="record-meta">
            <span>${escapeHtml(formatDate(entry.createdAt || Date.now()))}</span>
            <button type="button" class="text-button danger" data-delete-record="${escapeHtml(entry.id)}">${escapeHtml(t("delete"))}</button>
          </div>
          <button type="button" class="record-prompt" data-copy-prompt="${escapeHtml(entry.id)}" title="${escapeHtml(t("copy"))}">
            ${escapeHtml(preview || "")}
          </button>
          <div class="record-source">
            <div class="record-source-head">
              <span>${escapeHtml(t("source"))}</span>
              <select class="record-language-select" data-record-language="${escapeHtml(entry.id)}" aria-label="切换提示词版本">
                ${renderPromptLanguageOptions(selectedLanguage)}
              </select>
            </div>
            ${sourceIsLink
              ? `<a href="${escapeHtml(source)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(source)}">${escapeHtml(source)}</a>`
              : `<strong>${escapeHtml(source)}</strong>`}
          </div>
        </div>
      </article>
    `;
  }).join("");

  return `
    <section class="history-layout">
      <section class="page-title">
        <div>
          <p class="eyebrow">${escapeHtml(t("historyTitle"))}</p>
          <h2>${historyEntries.length}</h2>
          <p>${escapeHtml(t("historyCopy"))}</p>
        </div>
        <button type="button" class="secondary-action" id="clear-history" ${historyEntries.length ? "" : "disabled"}>
          ${escapeHtml(t("clearHistory"))}
        </button>
      </section>
      <section class="history-pane task-pane" aria-label="${escapeHtml(t("taskProgress"))}">
        <div class="task-list">
          ${taskRows || `<p class="empty-state">${escapeHtml(t("emptyHistory"))}</p>`}
        </div>
      </section>
      <section class="history-pane record-pane">
        <div class="record-grid">
          ${rows || `<p class="empty-state">${escapeHtml(t("emptyHistory"))}</p>`}
        </div>
      </section>
    </section>
  `;
}

function renderActiveView() {
  return activeSection === "history" ? renderHistory() : renderSettingsView();
}

function render() {
  root.innerHTML = `
    <main class="page-shell">
      ${renderSidebar()}
      <section class="workspace">
        ${renderActiveView()}
      </section>
      ${toast ? `<div class="admin-toast ${toastTone === "error" ? "is-error" : "is-success"}" role="status">${escapeHtml(toast)}</div>` : ""}
    </main>
  `;
  bindEvents();
}

function bindEvents() {
  document.getElementById("settings-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSettingsFromForm(false);
  });
  document.getElementById("test-connection")?.addEventListener("click", () => saveSettingsFromForm(true));
  document.getElementById("language-select")?.addEventListener("change", (event) => setLanguage(event.target.value));
  document.getElementById("status-toggle")?.addEventListener("click", () => setEnabled(!settings.enabled));
  document.getElementById("clear-history")?.addEventListener("click", clearHistory);
  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSection = button.dataset.section === "history" ? "history" : "settings";
      history.replaceState(null, "", `options.html#${activeSection}`);
      message = "";
      render();
    });
  });
  document.querySelectorAll("[data-delete-record]").forEach((button) => {
    button.addEventListener("click", () => deleteRecord(button.dataset.deleteRecord));
  });
  document.querySelectorAll("[data-copy-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = historyEntries.find((item) => item.id === button.dataset.copyPrompt);
      copyText(promptFor(entry));
    });
  });
  document.querySelectorAll("[data-record-language]").forEach((select) => {
    select.addEventListener("change", () => {
      const id = select.dataset.recordLanguage;
      if (!id) return;
      recordPromptLanguages = { ...recordPromptLanguages, [id]: select.value };
      render();
    });
  });
  document.querySelectorAll("[data-record-img]").forEach((image) => {
    image.addEventListener("error", () => {
      image.removeAttribute("src");
      image.closest(".record-image-shell")?.classList.add("is-missing");
    });
  });
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes[HISTORY_KEY]) historyEntries = Array.isArray(changes[HISTORY_KEY].newValue) ? changes[HISTORY_KEY].newValue : [];
  if (changes[TASKS_KEY]) reverseTasks = sortTasks(changes[TASKS_KEY].newValue);
  if (SETTINGS_KEYS.some((key) => changes[key])) {
    for (const key of SETTINGS_KEYS) {
      if (changes[key]) settings[key] = changes[key].newValue;
    }
  }
  render();
});

load();
