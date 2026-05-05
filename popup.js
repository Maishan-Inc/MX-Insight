const SETTINGS_KEYS = ["baseUrl", "apiKey", "model", "enabled", "defaultGeneratorSite", "uiLanguage"];

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
    badge: "Prompt intelligence",
    switchTitle: "Page hover and image analysis",
    on: "Enabled",
    off: "Paused",
    enabledCopy: "Image quick actions, context menu analysis, and the panel are active.",
    disabledCopy: "Hover actions, right-click analysis, and panel opening are paused.",
    openPanel: "Open panel",
    opening: "Opening...",
    uploadImage: "Upload image",
    uploadTitle: "Upload or drag an image",
    uploadCopy: "Analyze the image and save the prompt record locally.",
    uploadHint: "PNG, JPEG, GIF, WebP, AVIF, or BMP",
    analyzing: "Analyzing...",
    uploadSaved: "Saved to local records.",
    viewRecords: "View records",
    settings: "Console",
    language: "Language",
    enabledMsg: "MX-Insight is enabled.",
    disabledMsg: "MX-Insight is paused.",
    toggleError: "Failed to update the switch.",
    panelError: "Failed to open the panel.",
  },
  "zh-CN": {
    badge: "提示词洞察",
    switchTitle: "网页悬浮与图片分析",
    on: "开启",
    off: "暂停",
    enabledCopy: "图片快捷操作、右键分析和面板均已启用。",
    disabledCopy: "悬浮按钮、右键分析和面板打开已暂停。",
    openPanel: "打开面板",
    opening: "打开中...",
    uploadImage: "上传图片分析",
    uploadTitle: "上传或拖动图片",
    uploadCopy: "分析图片提示词，并保存到本地记录。",
    uploadHint: "支持 PNG、JPEG、GIF、WebP、AVIF、BMP",
    analyzing: "分析中...",
    uploadSaved: "已保存到后台保存记录。",
    viewRecords: "查看保存记录",
    settings: "后台",
    language: "语言",
    enabledMsg: "MX-Insight 已开启。",
    disabledMsg: "MX-Insight 已暂停。",
    toggleError: "切换失败，请稍后重试。",
    panelError: "打开面板失败，请稍后重试。",
  },
  "zh-TW": {
    badge: "提示詞洞察",
    switchTitle: "網頁懸浮與圖片分析",
    on: "開啟",
    off: "暫停",
    enabledCopy: "圖片快捷操作、右鍵分析和面板均已啟用。",
    disabledCopy: "懸浮按鈕、右鍵分析和面板開啟已暫停。",
    openPanel: "開啟面板",
    opening: "開啟中...",
    uploadImage: "上傳圖片分析",
    uploadTitle: "上傳或拖動圖片",
    uploadCopy: "分析圖片提示詞，並保存到本地記錄。",
    uploadHint: "支援 PNG、JPEG、GIF、WebP、AVIF、BMP",
    analyzing: "分析中...",
    uploadSaved: "已保存到後台保存記錄。",
    viewRecords: "查看保存記錄",
    settings: "後台",
    language: "語言",
    enabledMsg: "MX-Insight 已開啟。",
    disabledMsg: "MX-Insight 已暫停。",
    toggleError: "切換失敗，請稍後重試。",
    panelError: "開啟面板失敗，請稍後重試。",
  },
  ja: {
    badge: "プロンプト分析",
    switchTitle: "ページ上のホバーと画像分析",
    on: "有効",
    off: "停止",
    enabledCopy: "画像クイック操作、右クリック分析、パネルが有効です。",
    disabledCopy: "ホバー操作、右クリック分析、パネル起動は停止中です。",
    openPanel: "パネルを開く",
    opening: "起動中...",
    uploadImage: "画像をアップロード",
    uploadTitle: "画像をアップロードまたはドラッグ",
    uploadCopy: "画像プロンプトを分析し、ローカル履歴に保存します。",
    uploadHint: "PNG、JPEG、GIF、WebP、AVIF、BMP 対応",
    analyzing: "分析中...",
    uploadSaved: "ローカル履歴に保存しました。",
    viewRecords: "履歴を見る",
    settings: "管理画面",
    language: "言語",
    enabledMsg: "MX-Insight は有効です。",
    disabledMsg: "MX-Insight は停止中です。",
    toggleError: "切り替えに失敗しました。",
    panelError: "パネルを開けませんでした。",
  },
};

const root = document.getElementById("root");
let settings = { ...DEFAULTS };
let ready = false;
let busy = false;
let opening = false;
let message = "";
let uploadOpen = false;
let uploadBusy = false;
let uploadMessage = "";
let uploadTone = "";

function detectLanguage(value = settings.uiLanguage) {
  if (value && value !== "auto") return TEXT[value] ? value : "en";
  const nav = navigator.language || "en";
  if (/^ja/i.test(nav)) return "ja";
  if (/^(zh-HK|zh-TW|zh-MO)/i.test(nav)) return "zh-TW";
  if (/^zh/i.test(nav)) return "zh-CN";
  return "en";
}

function t(key) {
  return TEXT[detectLanguage()][key] || TEXT.en[key] || key;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function loadSettings() {
  const stored = await chrome.storage.local.get(SETTINGS_KEYS);
  settings = {
    ...DEFAULTS,
    ...stored,
    enabled: typeof stored.enabled === "boolean" ? stored.enabled : true,
    uiLanguage: typeof stored.uiLanguage === "string" ? stored.uiLanguage : "auto",
  };
  ready = true;
  render();
}

async function setEnabled() {
  if (!ready || busy) return;
  busy = true;
  message = "";
  render();
  try {
    const enabled = !settings.enabled;
    await chrome.storage.local.set({ enabled });
    settings = { ...settings, enabled };
    message = enabled ? t("enabledMsg") : t("disabledMsg");
  } catch (error) {
    message = error instanceof Error ? error.message : t("toggleError");
  } finally {
    busy = false;
    render();
  }
}

function openUploadModal() {
  if (!settings.enabled || uploadBusy) return;
  uploadOpen = true;
  uploadMessage = "";
  uploadTone = "";
  render();
}

function closeUploadModal() {
  if (uploadBusy) return;
  uploadOpen = false;
  uploadMessage = "";
  uploadTone = "";
  render();
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("读取图片失败。"));
    reader.readAsDataURL(file);
  });
}

async function fileToTarget(file) {
  if (!file || !file.type.startsWith("image/")) throw new Error("请选择图片文件。");
  let bitmap = null;
  try {
    bitmap = await createImageBitmap(file);
    const maxSide = 1800;
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("无法创建图片处理上下文。");
    context.drawImage(bitmap, 0, 0, width, height);
    return {
      src: canvas.toDataURL("image/png"),
      alt: file.name || "uploaded image",
      pageUrl: "#",
      naturalWidth: width,
      naturalHeight: height,
    };
  } catch {
    const src = await readFileAsDataUrl(file);
    return {
      src,
      alt: file.name || "uploaded image",
      pageUrl: "#",
      naturalWidth: void 0,
      naturalHeight: void 0,
    };
  } finally {
    bitmap?.close?.();
  }
}

async function analyzeUploadedFile(file) {
  if (uploadBusy) return;
  uploadBusy = true;
  uploadMessage = "";
  uploadTone = "";
  message = "";
  render();
  try {
    const target = await fileToTarget(file);
    const response = await chrome.runtime.sendMessage({ type: "ANALYZE_UPLOADED_IMAGE", payload: { target } });
    if (!response?.ok) throw new Error(response?.error || t("panelError"));
    uploadMessage = t("uploadSaved");
    uploadTone = "success";
  } catch (error) {
    uploadMessage = error instanceof Error ? error.message : t("panelError");
    uploadTone = "error";
  } finally {
    uploadBusy = false;
    render();
  }
}

async function saveLanguage(value) {
  settings = { ...settings, uiLanguage: value };
  await chrome.storage.local.set({ uiLanguage: value });
  render();
}

function openSettings() {
  chrome.runtime.openOptionsPage();
  window.close();
}

function renderUploadModal() {
  if (!uploadOpen) return "";
  return `
    <div class="modal-layer popup-modal-layer" role="dialog" aria-modal="true" aria-label="${escapeHtml(t("uploadTitle"))}">
      <section class="modal-card upload-modal">
        <header class="modal-header">
          <div>
            <p class="eyebrow">${escapeHtml(t("uploadImage"))}</p>
            <h2>${escapeHtml(t("uploadTitle"))}</h2>
          </div>
          <button type="button" class="icon-button" id="close-upload" aria-label="关闭">×</button>
        </header>
        <button type="button" class="upload-dropzone" id="upload-dropzone" ${uploadBusy ? "disabled" : ""}>
          <span class="upload-icon">+</span>
          <strong>${escapeHtml(uploadBusy ? t("analyzing") : t("uploadCopy"))}</strong>
          <small>${escapeHtml(t("uploadHint"))}</small>
        </button>
        <input id="upload-input" type="file" accept="image/*" hidden />
        ${uploadMessage ? `<p class="popup-message ${uploadTone === "error" ? "message-error" : "message-success"}">${escapeHtml(uploadMessage)}</p>` : ""}
        <div class="popup-actions">
          <button type="button" class="secondary-action" id="view-records">${escapeHtml(t("viewRecords"))}</button>
        </div>
      </section>
    </div>
  `;
}

function render() {
  const langOptions = LANGUAGES.map((item) => (
    `<option value="${item.value}" ${settings.uiLanguage === item.value ? "selected" : ""}>${escapeHtml(item.labels[detectLanguage()] || item.labels.en)}</option>`
  )).join("");

  root.innerHTML = `
    <main class="popup-shell">
      <section class="popup-card" aria-label="MX-Insight">
        <header class="popup-header">
          <img src="/icons/icon-128.png" alt="" class="popup-logo" />
          <div>
            <div class="popup-eyebrow">${escapeHtml(t("settings"))}</div>
            <h1>${escapeHtml(t("badge"))}</h1>
          </div>
          <span class="status-pill${settings.enabled ? " is-on" : ""}">${escapeHtml(settings.enabled ? t("on") : t("off"))}</span>
        </header>

        <label class="compact-field">
          <span>${escapeHtml(t("language"))}</span>
          <select id="language-select">${langOptions}</select>
        </label>

        <button type="button" class="toggle-row${settings.enabled ? " is-on" : ""}" id="toggle" ${!ready || busy ? "disabled" : ""}>
          <span class="toggle-copy">
            <span class="toggle-title">${escapeHtml(t("switchTitle"))}</span>
            <span class="toggle-subtitle">${escapeHtml(settings.enabled ? t("enabledCopy") : t("disabledCopy"))}</span>
          </span>
          <span class="toggle-switch${settings.enabled ? " is-on" : ""}" aria-hidden="true"><span class="toggle-thumb"></span></span>
        </button>

        <div class="popup-actions">
          <button type="button" class="primary-action" id="open-panel" ${!settings.enabled || opening ? "disabled" : ""}>
            ${escapeHtml(opening ? t("opening") : t("uploadImage"))}
          </button>
          <button type="button" class="secondary-action" id="open-settings">${escapeHtml(t("settings"))}</button>
        </div>

        ${message ? `<p class="popup-message">${escapeHtml(message)}</p>` : ""}
        <footer class="copyright">Copyright &copy; Maishan Inc.</footer>
      </section>
      ${renderUploadModal()}
    </main>
  `;

  document.getElementById("toggle")?.addEventListener("click", setEnabled);
  document.getElementById("open-panel")?.addEventListener("click", openUploadModal);
  document.getElementById("open-settings")?.addEventListener("click", openSettings);
  document.getElementById("close-upload")?.addEventListener("click", closeUploadModal);
  document.getElementById("view-records")?.addEventListener("click", openSettings);
  const uploadInput = document.getElementById("upload-input");
  const dropzone = document.getElementById("upload-dropzone");
  dropzone?.addEventListener("click", () => uploadInput?.click());
  uploadInput?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) analyzeUploadedFile(file);
  });
  dropzone?.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropzone.classList.add("is-dragover");
  });
  dropzone?.addEventListener("dragleave", () => {
    dropzone.classList.remove("is-dragover");
  });
  dropzone?.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.classList.remove("is-dragover");
    const file = event.dataTransfer?.files?.[0];
    if (file) analyzeUploadedFile(file);
  });
  document.getElementById("language-select")?.addEventListener("change", (event) => {
    saveLanguage(event.target.value);
  });
}

render();
loadSettings();
