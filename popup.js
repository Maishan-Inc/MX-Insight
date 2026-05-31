const SETTINGS_KEYS = ["baseUrl", "apiKey", "model", "enabled", "defaultGeneratorSite", "uiLanguage"];
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
    badge: "Prompt intelligence",
    status: "Extension status",
    on: "Enabled",
    off: "Paused",
    enabledCopy: "Hover actions and right-click image analysis are active.",
    disabledCopy: "Page hover actions and image analysis are paused.",
    uploadImage: "Upload image analysis",
    analyzing: "Analyzing...",
    uploadSaved: "Reverse prompt task started. Check Reverse records for progress.",
    viewRecords: "Reverse records",
    settings: "Settings",
    language: "Language",
    toggleError: "Failed to update the switch.",
    panelError: "Analysis failed.",
    taskProgress: "Progress",
    taskDone: "Done",
    taskError: "Failed",
    taskRunning: "Running",
  },
  "zh-CN": {
    badge: "提示词洞察",
    status: "插件状态",
    on: "已开启",
    off: "已暂停",
    enabledCopy: "网页悬浮操作和右键图片分析已启用。",
    disabledCopy: "网页悬浮操作和图片分析已暂停。",
    uploadImage: "上传图片分析",
    analyzing: "分析中...",
    uploadSaved: "已加入反推任务，可在反推记录查看进度。",
    viewRecords: "反推记录",
    settings: "设置",
    language: "语言",
    toggleError: "切换失败，请稍后重试。",
    panelError: "分析失败，请稍后重试。",
    taskProgress: "反推进度",
    taskDone: "完成",
    taskError: "失败",
    taskRunning: "进行中",
  },
  "zh-TW": {
    badge: "提示詞洞察",
    status: "插件狀態",
    on: "已開啟",
    off: "已暫停",
    enabledCopy: "網頁懸浮操作和右鍵圖片分析已啟用。",
    disabledCopy: "網頁懸浮操作和圖片分析已暫停。",
    uploadImage: "上傳圖片分析",
    analyzing: "分析中...",
    uploadSaved: "已加入反推任務，可在反推記錄查看進度。",
    viewRecords: "反推記錄",
    settings: "設定",
    language: "語言",
    toggleError: "切換失敗，請稍後重試。",
    panelError: "分析失敗，請稍後重試。",
    taskProgress: "反推進度",
    taskDone: "完成",
    taskError: "失敗",
    taskRunning: "進行中",
  },
  ja: {
    badge: "プロンプト分析",
    status: "拡張機能の状態",
    on: "有効",
    off: "停止",
    enabledCopy: "ページ上のホバー操作と右クリック画像分析が有効です。",
    disabledCopy: "ページ上のホバー操作と画像分析は停止中です。",
    uploadImage: "画像を分析",
    analyzing: "分析中...",
    uploadSaved: "逆引きタスクを開始しました。逆引き記録で進行状況を確認できます。",
    viewRecords: "逆引き記録",
    settings: "設定",
    language: "言語",
    toggleError: "切り替えに失敗しました。",
    panelError: "分析に失敗しました。",
    taskProgress: "進行状況",
    taskDone: "完了",
    taskError: "失敗",
    taskRunning: "実行中",
  },
};

const root = document.getElementById("root");
let settings = { ...DEFAULTS };
let ready = false;
let busy = false;
let uploadBusy = false;
let message = "";
let messageTone = "";
let reverseTasks = [];

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

function sortTasks(tasks) {
  return Array.isArray(tasks)
    ? [...tasks].sort((a, b) => {
        const bTime = typeof b?.createdAt === "number" ? b.createdAt : 0;
        const aTime = typeof a?.createdAt === "number" ? a.createdAt : 0;
        return bTime - aTime;
      })
    : [];
}

async function loadSettings() {
  const stored = await chrome.storage.local.get([...SETTINGS_KEYS, TASKS_KEY]);
  settings = {
    ...DEFAULTS,
    ...stored,
    enabled: typeof stored.enabled === "boolean" ? stored.enabled : true,
    uiLanguage: typeof stored.uiLanguage === "string" ? stored.uiLanguage : "auto",
  };
  reverseTasks = sortTasks(stored[TASKS_KEY]);
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
  } catch (error) {
    message = error instanceof Error ? error.message : t("toggleError");
    messageTone = "error";
  } finally {
    busy = false;
    render();
  }
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
    const maxSide = 2200;
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("无法创建图片处理上下文。");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(bitmap, 0, 0, width, height);
    return {
      src: canvas.toDataURL("image/jpeg", 0.92),
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
  message = "";
  messageTone = "";
  render();
  try {
    const target = await fileToTarget(file);
    const response = await chrome.runtime.sendMessage({ type: "ANALYZE_UPLOADED_IMAGE", payload: { target } });
    if (!response?.ok) throw new Error(response?.error || t("panelError"));
    message = t("uploadSaved");
    messageTone = "success";
  } catch (error) {
    message = error instanceof Error ? error.message : t("panelError");
    messageTone = "error";
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

async function openOptions(section = "settings") {
  try {
    await chrome.runtime.sendMessage({ type: "OPEN_SETTINGS", payload: { focus: section === "history" ? "history" : "base-url" } });
  } catch {
    chrome.runtime.openOptionsPage();
  }
  window.close();
}

function taskLabel(status) {
  if (status === "success") return t("taskDone");
  if (status === "error") return t("taskError");
  return t("taskRunning");
}

function taskStep(task) {
  const map = {
    queued: { en: "Queued", "zh-CN": "已加入后台任务", "zh-TW": "已加入後台任務", ja: "バックグラウンドに追加済み" },
    readImage: { en: "Reading image", "zh-CN": "读取图片", "zh-TW": "讀取圖片", ja: "画像を読み込み中" },
    sendModel: { en: "Sending to model", "zh-CN": "发送至模型", "zh-TW": "發送至模型", ja: "モデルへ送信中" },
    modelWorking: { en: "Model is generating", "zh-CN": "模型生成中", "zh-TW": "模型生成中", ja: "モデル生成中" },
    generatePrompt: { en: "Generating prompt", "zh-CN": "生成提示词", "zh-TW": "生成提示詞", ja: "プロンプト生成中" },
    retryJson: { en: "Checking output, retrying", "zh-CN": "校验输出，正在重试", "zh-TW": "校驗輸出，正在重試", ja: "出力確認、再試行中" },
    prepare: { en: "Preparing analysis", "zh-CN": "准备分析", "zh-TW": "準備分析", ja: "分析準備中" },
    complete: { en: "Reverse prompt complete", "zh-CN": "反推完成", "zh-TW": "反推完成", ja: "逆引き完了" },
    failed: { en: "Reverse prompt failed", "zh-CN": "反推失败", "zh-TW": "反推失敗", ja: "逆引き失敗" },
  };
  return map[task?.stepKey]?.[detectLanguage()] || task?.step || task?.title || "";
}

function renderTasks() {
  const tasks = sortTasks(reverseTasks).slice(0, 4);
  if (!tasks.length) return "";
  return `
    <section class="popup-task-list" aria-label="${escapeHtml(t("taskProgress"))}">
      ${tasks.map((task) => {
        const progress = Math.max(0, Math.min(100, Math.round(Number(task.progress) || 0)));
        return `
          <article class="popup-task ${task.status === "error" ? "is-error" : task.status === "success" ? "is-success" : ""}">
            <div class="popup-task-meta">
              <span>${escapeHtml(taskLabel(task.status))}</span>
              <strong>${progress}%</strong>
            </div>
            <div class="task-progress"><span style="width:${progress}%"></span></div>
            <p>${escapeHtml(task.error || taskStep(task))}</p>
          </article>
        `;
      }).join("")}
    </section>
  `;
}

function render() {
  const lang = detectLanguage();
  const langOptions = LANGUAGES.map((item) => (
    `<option value="${item.value}" ${settings.uiLanguage === item.value ? "selected" : ""}>${escapeHtml(item.labels[lang] || item.labels.en)}</option>`
  )).join("");

  root.innerHTML = `
    <main class="popup-shell">
      <section class="popup-card" aria-label="MX-Insight">
        <header class="popup-header">
          <img src="/icons/icon-128.png" alt="" class="popup-logo" />
          <div>
            <div class="popup-eyebrow">MX-Insight</div>
            <h1>${escapeHtml(t("badge"))}</h1>
          </div>
        </header>

        <section class="popup-status-card">
          <div>
            <span class="status-dot${settings.enabled ? " is-on" : ""}" aria-hidden="true"></span>
            <span class="status-label">${escapeHtml(t("status"))}</span>
            <strong>${escapeHtml(settings.enabled ? t("on") : t("off"))}</strong>
          </div>
          <button type="button" class="switch-control${settings.enabled ? " is-on" : ""}" id="toggle" aria-pressed="${settings.enabled ? "true" : "false"}" ${!ready || busy ? "disabled" : ""}>
            <span></span>
          </button>
        </section>
        <p class="popup-muted">${escapeHtml(settings.enabled ? t("enabledCopy") : t("disabledCopy"))}</p>

        <label class="compact-field">
          <span>${escapeHtml(t("language"))}</span>
          <select id="language-select">${langOptions}</select>
        </label>

        <button type="button" class="upload-inline" id="open-upload" ${!settings.enabled || uploadBusy ? "disabled" : ""}>
          <span class="upload-icon">+</span>
          <span>${escapeHtml(uploadBusy ? t("analyzing") : t("uploadImage"))}</span>
        </button>
        <input id="upload-input" type="file" accept="image/*" hidden />

        ${renderTasks()}

        <div class="popup-actions">
          <button type="button" class="secondary-action" id="view-records">${escapeHtml(t("viewRecords"))}</button>
          <button type="button" class="secondary-action" id="open-settings">${escapeHtml(t("settings"))}</button>
        </div>

        ${message ? `<p class="popup-message ${messageTone === "error" ? "message-error" : "message-success"}">${escapeHtml(message)}</p>` : ""}
        <footer class="copyright">Copyright &copy; Maishan Inc.</footer>
      </section>
    </main>
  `;

  document.getElementById("toggle")?.addEventListener("click", setEnabled);
  document.getElementById("open-settings")?.addEventListener("click", () => openOptions("settings"));
  document.getElementById("view-records")?.addEventListener("click", () => openOptions("history"));
  const uploadInput = document.getElementById("upload-input");
  document.getElementById("open-upload")?.addEventListener("click", () => uploadInput?.click());
  uploadInput?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) analyzeUploadedFile(file);
  });
  document.getElementById("language-select")?.addEventListener("change", (event) => {
    saveLanguage(event.target.value);
  });
}

render();
loadSettings();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes[TASKS_KEY]) {
    reverseTasks = sortTasks(changes[TASKS_KEY].newValue);
    render();
  }
});
