const MENU_ID = "mx-insight-analyze-image";
const OFF_BADGE = "OFF";
const SETTINGS_KEY = "enabled";
const HISTORY_KEY = "historyEntries";
const SNAPSHOT_KEY = "latestAnalysisSnapshot";
const IMAGE_FETCH_TIMEOUT_MS = 30000;
const ANALYSIS_REQUEST_TIMEOUT_MS = 120000;
const TEST_REQUEST_TIMEOUT_MS = 20000;

const GENERATOR_SITES = {
  jimeng: "https://jimeng.jianying.com/",
  gemini: "https://gemini.google.com/app",
  midjourney: "https://www.midjourney.com/imagine",
  lovart: "https://www.lovart.ai/",
};

const SYSTEM_PROMPT = [
  "You are an extremely rigorous visual analyst, cinematography analyst, and prompt engineer.",
  "Always produce highly detailed, visually grounded prompt output for every supported model provider.",
  "Return valid JSON only and follow the requested schema exactly.",
  "Make zh.prompt, zh_hant.prompt, en.prompt, and ja.prompt richly detailed, production-ready, and information-dense while keeping the requested field order.",
  "Make json_prompt the most detailed layer of the output, using nested objects and arrays when useful, but prefer compact factual phrases over verbose prose.",
  "Cover composition, lens language, spatial layout, subjects, objects, text, symbols, lighting, color, materials, background, environment, and generation constraints.",
  "Do not hallucinate. When uncertain, mark information as uncertain or approximate.",
].join(" ");

const PROMPT_SCHEMA_TEXT = `
${SYSTEM_PROMPT}

You are also preparing multilingual prompt output for image generation.
Analyze the provided image and return valid JSON only.

The JSON schema:
{
  "zh": {
    "prompt": "A highly detailed, production-ready Simplified Chinese image generation prompt, ordered as: Subject, Action/Pose, Details/Appearance, Environment/Background, Lighting/Atmosphere, Style/Camera, Colors, Materials, Aspect Ratio.",
    "analysis": "A compact Simplified Chinese explanation that covers the same fields, with extra attention on style and camera language."
  },
  "zh_hant": {
    "prompt": "A highly detailed, production-ready Traditional Chinese image generation prompt, ordered as: Subject, Action/Pose, Details/Appearance, Environment/Background, Lighting/Atmosphere, Style/Camera, Colors, Materials, Aspect Ratio.",
    "analysis": "A compact Traditional Chinese explanation that covers the same fields, with extra attention on style and camera language."
  },
  "en": {
    "prompt": "A highly detailed, production-ready English image generation prompt, ordered as: Subject, Action/Pose, Details/Appearance, Environment/Background, Lighting/Atmosphere, Style/Camera, Colors, Materials, Aspect Ratio.",
    "analysis": "A compact English explanation that covers the same fields, with extra attention on style and camera language."
  },
  "ja": {
    "prompt": "A highly detailed, production-ready Japanese image generation prompt, ordered as: Subject, Action/Pose, Details/Appearance, Environment/Background, Lighting/Atmosphere, Style/Camera, Colors, Materials, Aspect Ratio.",
    "analysis": "A compact Japanese explanation that covers the same fields, with extra attention on style and camera language."
  },
  "zh_style_tags": ["中文标签1", "中文标签2", "中文标签3"],
  "zh_hant_style_tags": ["繁中標籤1", "繁中標籤2", "繁中標籤3"],
  "en_style_tags": ["english tag 1", "english tag 2", "english tag 3"],
  "ja_style_tags": ["日本語タグ1", "日本語タグ2", "日本語タグ3"],
  "json_prompt": {
    "subject": "Main subject.",
    "action_pose": "Action or pose.",
    "details_appearance": "Details, clothing, appearance, accessories or visible design details.",
    "environment_background": "Environment or background.",
    "lighting_atmosphere": "Lighting and atmosphere.",
    "style_camera": "Art style, design language, camera or lens feeling, and technical visual cues.",
    "colors": ["primary color"],
    "materials": ["material 1"],
    "aspect_ratio": "4:5",
    "...any_extra_nested_fields_you_need": {}
  },
  "confidence": 0.0
}

Rules:
- Return JSON only. No markdown fences.
- Keep prompts directly usable for Midjourney, Flux or SDXL style generation.
- All prompt fields should be highly detailed, information-dense, and still directly usable without extra rewriting.
- Be faithful to visually verifiable facts. Do not invent unseen objects, brands, text, camera specs, materials, art movements or lighting setups.
- If something is uncertain, use broader wording instead of hallucinating specifics.
- json_prompt is the strictest part of the output. It can use nested objects and arrays, but prefer compact factual phrases instead of long prose.
- json_prompt must always preserve these exact top-level baseline keys:
  subject, action_pose, details_appearance, environment_background, lighting_atmosphere, style_camera, colors, materials, aspect_ratio
- Beyond those baseline keys, add only the extra fields that materially help reconstruction, such as overview, composition, layout, text, constraints and uncertainties.
- The style/camera part should be richer than before: describe design language, era influence, medium, finish, camera angle, lens feel, framing logic and aesthetic cues when they are visually supported.
- Return 4 to 6 concise style tags for each supported language.
- Confidence must be a number between 0 and 1.
`.trim();

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    zh: {
      type: "object",
      properties: { prompt: { type: "string" }, analysis: { type: "string" } },
      required: ["prompt", "analysis"],
    },
    zh_hant: {
      type: "object",
      properties: { prompt: { type: "string" }, analysis: { type: "string" } },
      required: ["prompt", "analysis"],
    },
    en: {
      type: "object",
      properties: { prompt: { type: "string" }, analysis: { type: "string" } },
      required: ["prompt", "analysis"],
    },
    ja: {
      type: "object",
      properties: { prompt: { type: "string" }, analysis: { type: "string" } },
      required: ["prompt", "analysis"],
    },
    zh_style_tags: { type: "array", items: { type: "string" } },
    zh_hant_style_tags: { type: "array", items: { type: "string" } },
    en_style_tags: { type: "array", items: { type: "string" } },
    ja_style_tags: { type: "array", items: { type: "string" } },
    json_prompt: {
      type: "object",
      properties: {
        subject: { type: "string" },
        action_pose: { type: "string" },
        details_appearance: { type: "string" },
        environment_background: { type: "string" },
        lighting_atmosphere: { type: "string" },
        style_camera: { type: "string" },
        colors: { type: "array", items: { type: "string" } },
        materials: { type: "array", items: { type: "string" } },
        aspect_ratio: { type: "string" },
      },
      additionalProperties: true,
      required: [
        "subject",
        "action_pose",
        "details_appearance",
        "environment_background",
        "lighting_atmosphere",
        "style_camera",
        "colors",
        "materials",
        "aspect_ratio",
      ],
    },
    confidence: { type: "number" },
  },
  required: ["zh", "zh_hant", "en", "ja", "zh_style_tags", "zh_hant_style_tags", "en_style_tags", "ja_style_tags", "json_prompt", "confidence"],
};

function trimUrl(value) {
  return value.trim().replace(/\/+$/, "");
}

function isDashScopeUrl(url) {
  const lower = trimUrl(url).toLowerCase();
  return (
    lower.includes("dashscope.aliyuncs.com/compatible-mode/v1") ||
    lower.includes("dashscope-us.aliyuncs.com/compatible-mode/v1") ||
    lower.includes("dashscope-intl.aliyuncs.com/compatible-mode/v1")
  );
}

function modelName(config) {
  const model = config.model.trim();
  return isDashScopeUrl(config.baseUrl) ? model.toLowerCase() : model;
}

function providerKind(url) {
  const lower = trimUrl(url).toLowerCase();
  return lower.includes("generativelanguage.googleapis.com") || lower.includes("googleapis.com") ? "gemini" : "openai";
}

function extractTextParts(value) {
  if (typeof value !== "object" || value === null) return "";
  const candidates = value.candidates;
  return Array.isArray(candidates)
    ? candidates
        .map((candidate) => {
          if (typeof candidate !== "object" || candidate === null) return "";
          const content = candidate.content;
          if (typeof content !== "object" || content === null) return "";
          const parts = content.parts;
          return Array.isArray(parts)
            ? parts
                .map((part) => (typeof part === "object" && part !== null && typeof part.text === "string" ? part.text : ""))
                .join("\n")
                .trim()
            : "";
        })
        .filter(Boolean)
        .join("\n")
        .trim()
    : "";
}

function extractOpenAiText(value) {
  if (typeof value !== "object" || value === null) return "";
  const choices = value.choices;
  return Array.isArray(choices)
    ? choices
        .map((choice) => {
          if (typeof choice !== "object" || choice === null) return "";
          const message = choice.message;
          if (typeof message !== "object" || message === null) return "";
          const content = message.content;
          return typeof content === "string"
            ? content.trim()
            : Array.isArray(content)
              ? content
                  .map((part) => (typeof part === "object" && part !== null && typeof part.text === "string" ? part.text : ""))
                  .join("\n")
                  .trim()
              : "";
        })
        .filter(Boolean)
        .join("\n")
        .trim()
    : "";
}

function stripFence(text) {
  const trimmed = text.trim();
  return trimmed.startsWith("```")
    ? trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim()
    : trimmed;
}

function parseArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string").map((item) => item.trim()).filter(Boolean).slice(0, 8) : [];
}

function cleanValue(value) {
  if (value === null) return null;
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "boolean") return value;
  if (Array.isArray(value)) return value.map((item) => cleanValue(item)).filter((item) => item !== void 0);
  if (typeof value === "object") {
    const out = {};
    for (const [key, item] of Object.entries(value)) {
      const cleaned = cleanValue(item);
      if (cleaned !== void 0) out[key] = cleaned;
    }
    return out;
  }
  return void 0;
}

function plainObject(value) {
  const cleaned = cleanValue(value);
  return typeof cleaned === "object" && cleaned !== null && !Array.isArray(cleaned) ? cleaned : {};
}

function firstString(value, ...keys) {
  for (const key of keys) {
    const item = value[key];
    if (typeof item === "string") return item.trim();
  }
  return "";
}

function arrayFrom(value, ...keys) {
  for (const key of keys) {
    if (value[key] !== void 0) return parseArray(value[key]);
  }
  return [];
}

function parseJsonPrompt(value) {
  const source = typeof value === "object" && value !== null ? value : {};
  const raw = plainObject(source);
  return {
    subject: firstString(source, "subject"),
    actionPose: firstString(source, "action_pose", "actionPose"),
    detailsAppearance: firstString(source, "details_appearance", "detailsAppearance"),
    environmentBackground: firstString(source, "environment_background", "environmentBackground"),
    lightingAtmosphere: firstString(source, "lighting_atmosphere", "lightingAtmosphere"),
    styleCamera: firstString(source, "style_camera", "styleCamera"),
    colors: arrayFrom(source, "colors"),
    materials: arrayFrom(source, "materials"),
    aspectRatio: firstString(source, "aspect_ratio", "aspectRatio"),
    raw,
  };
}

function parseTags(value) {
  const zh = parseArray(value.zh_style_tags);
  const zhHant = parseArray(value.zh_hant_style_tags);
  const en = parseArray(value.en_style_tags);
  const ja = parseArray(value.ja_style_tags);
  if (zh.length || zhHant.length || en.length || ja.length) {
    return {
      zh,
      zhHant: zhHant.length ? zhHant : zh,
      en: en.length ? en : zh,
      ja: ja.length ? ja : en.length ? en : zh,
    };
  }
  const fallback = parseArray(value.style_tags);
  return { zh: fallback, zhHant: fallback, en: fallback, ja: fallback };
}

function parseResponse(value) {
  if (typeof value !== "object" || value === null) throw new Error("模型返回的数据格式无效。");
  const payload = value;
  const zh = payload.zh;
  const zhHant = payload.zh_hant || payload.zhHant;
  const en = payload.en;
  const ja = payload.ja;
  const jsonPrompt = payload.json_prompt;
  const confidence = payload.confidence;

  if (!zh || typeof zh.prompt !== "string" || typeof zh.analysis !== "string") throw new Error("缺少简体中文 prompt 数据。");
  if (!zhHant || typeof zhHant.prompt !== "string" || typeof zhHant.analysis !== "string") throw new Error("缺少繁体中文 prompt 数据。");
  if (!en || typeof en.prompt !== "string" || typeof en.analysis !== "string") throw new Error("缺少英文 prompt 数据。");
  if (!ja || typeof ja.prompt !== "string" || typeof ja.analysis !== "string") throw new Error("缺少日文 prompt 数据。");
  if (typeof jsonPrompt !== "object" || jsonPrompt === null || Array.isArray(jsonPrompt)) throw new Error("缺少 JSON prompt 数据。");

  const score = typeof confidence === "number" && Number.isFinite(confidence) ? Math.min(1, Math.max(0, confidence)) : void 0;

  return {
    zh: { prompt: zh.prompt.trim(), analysis: zh.analysis.trim() },
    zhHant: { prompt: zhHant.prompt.trim(), analysis: zhHant.analysis.trim() },
    zh_hant: { prompt: zhHant.prompt.trim(), analysis: zhHant.analysis.trim() },
    en: { prompt: en.prompt.trim(), analysis: en.analysis.trim() },
    ja: { prompt: ja.prompt.trim(), analysis: ja.analysis.trim() },
    jsonPrompt: parseJsonPrompt(jsonPrompt),
    styleTags: parseTags(payload),
    confidence: score,
  };
}

function validateConfig(config) {
  if (!config.baseUrl.trim()) throw new Error("请先在设置页填写接口地址。");
  if (!config.apiKey.trim()) throw new Error("请先在设置页填写接口密钥。");
  if (!config.model.trim()) throw new Error("请先在设置页填写支持图片分析的模型名。");
}

function requestError(kind, config, error) {
  const label = kind === "test" ? "连接测试" : "分析请求";
  const detail = error instanceof Error && error.message ? error.message : "unknown error";
  return isDashScopeUrl(config.baseUrl)
    ? new Error(
        `${label}发起失败：当前没有拿到 DashScope 的 HTTP 响应。请优先检查 1. 模型名称是否写成全小写，例如 qwen3.5-plus 或 qwen-vl-max；2. 接口密钥所在地域与接口地址是否一致，中国内地用 dashscope.aliyuncs.com，弗吉尼亚用 dashscope-us.aliyuncs.com，新加坡用 dashscope-intl.aliyuncs.com；3. 当前网络、代理或证书是否拦截了扩展对 DashScope 的 HTTPS 请求。原始错误：${detail}`,
      )
    : new Error(`${label}发起失败：${detail}`);
}

function isAbortError(error) {
  return typeof error === "object" && error !== null && "name" in error && error.name === "AbortError";
}

async function withTimeout(timeoutMs, timeoutMessage, operation) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await operation(controller.signal);
  } catch (error) {
    if (isAbortError(error)) throw new Error(timeoutMessage);
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

const OPENAI_CHAT_IMAGE_MIMES = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);

function detectMime(bytes) {
  if (bytes.length >= 8 && bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71 && bytes[4] === 13 && bytes[5] === 10 && bytes[6] === 26 && bytes[7] === 10) return "image/png";
  if (bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "image/jpeg";
  if (bytes.length >= 12 && bytes[0] === 82 && bytes[1] === 73 && bytes[2] === 70 && bytes[3] === 70 && bytes[8] === 87 && bytes[9] === 69 && bytes[10] === 66 && bytes[11] === 80) return "image/webp";
  if (bytes.length >= 6 && bytes[0] === 71 && bytes[1] === 73 && bytes[2] === 70 && bytes[3] === 56 && (bytes[4] === 55 || bytes[4] === 57) && bytes[5] === 97) return "image/gif";
  if (bytes.length >= 2 && bytes[0] === 66 && bytes[1] === 77) return "image/bmp";
  if (bytes.length >= 12 && bytes[4] === 102 && bytes[5] === 116 && bytes[6] === 121 && bytes[7] === 112 && bytes[8] === 97 && bytes[9] === 118 && bytes[10] === 105 && bytes[11] === 102) return "image/avif";
  return null;
}

function bytesToBase64(bytes) {
  const chunk = 32768;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function base64ToBytes(text) {
  const binary = atob(text);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function normalizeMime(mimeType) {
  const lower = mimeType.split(";")[0]?.trim().toLowerCase() || "";
  return lower === "image/jpg" ? "image/jpeg" : lower;
}

async function convertImageToPng(bytes, sourceMimeType) {
  if (typeof createImageBitmap !== "function" || typeof OffscreenCanvas !== "function") {
    throw new Error("当前浏览器无法转换该图片格式，请换用 JPEG、PNG、GIF 或 WebP 图片。");
  }
  const blob = new Blob([bytes], { type: sourceMimeType || "application/octet-stream" });
  let bitmap;
  try {
    bitmap = await createImageBitmap(blob);
  } catch {
    throw new Error("图片数据不是有效图片，或当前浏览器无法解码该格式。请换用 JPEG、PNG、GIF 或 WebP 图片。");
  }
  try {
    const maxSide = 1800;
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("无法创建图片转换上下文。");
    context.drawImage(bitmap, 0, 0, width, height);
    const output = await canvas.convertToBlob({ type: "image/png" });
    const buffer = await output.arrayBuffer();
    return { mimeType: "image/png", data: bytesToBase64(new Uint8Array(buffer)) };
  } finally {
    bitmap.close?.();
  }
}

async function normalizeImagePayload(bytes, mimeType) {
  if (!bytes.length) throw new Error("图片数据为空，请换一张图片再试。");
  const detected = detectMime(bytes);
  if (detected && OPENAI_CHAT_IMAGE_MIMES.has(detected)) {
    return { mimeType: detected, data: bytesToBase64(bytes) };
  }
  const declared = normalizeMime(mimeType);
  if ((detected && detected.startsWith("image/")) || declared.startsWith("image/")) {
    return convertImageToPng(bytes, detected || declared);
  }
  throw new Error("图片抓取结果不是有效图片，请换一张允许直接访问的网页图片。");
}

function aspectRatio(image) {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  if (!width || !height) return "unknown";
  const gcd = (a, b) => {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
      const r = x % y;
      x = y;
      y = r;
    }
    return x || 1;
  };
  const divisor = gcd(width, height);
  return `${Math.round(width / divisor)}:${Math.round(height / divisor)}`;
}

function parseDataUrl(value) {
  const match = value.match(/^data:(.*?);base64,(.*)$/i);
  return match ? { mimeType: match[1] || "image/png", data: match[2] } : null;
}

async function readImagePayload(target) {
  const dataUrl = parseDataUrl(target.src);
  if (dataUrl) {
    const bytes = base64ToBytes(dataUrl.data);
    return normalizeImagePayload(bytes, dataUrl.mimeType);
  }
  const bytesAndType = await withTimeout(IMAGE_FETCH_TIMEOUT_MS, "图片抓取超时（30 秒），请换一张允许直接访问的网页图片。", async (signal) => {
    const response = await fetch(target.src, {
      signal,
      headers: {
        Accept: "image/png,image/jpeg,image/webp,image/gif,image/avif,image/*,*/*;q=0.8",
      },
    });
    if (!response.ok) throw new Error(`图片抓取失败 (${response.status})，请换一张允许直接访问的网页图片。`);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    return { bytes: new Uint8Array(buffer), mimeType: blob.type };
  });
  const bytes = bytesAndType.bytes;
  return normalizeImagePayload(bytes, bytesAndType.mimeType);
}

function buildPrompt(target, ratio, mode = "full") {
  const base = [
    SYSTEM_PROMPT,
    "",
    "Analyze the provided image and return valid JSON only.",
    "",
    "Use the schema exactly and make each language field explicit.",
    "Focus on subject, action/pose, details/appearance, environment/background, lighting/atmosphere, style/camera, colors, materials and aspect ratio.",
    "The json_prompt must preserve the baseline top-level keys while adding only the extra nested fields needed for faithful reconstruction.",
    "Prefer compact phrases, compact arrays and compact nested objects over long natural-language paragraphs.",
  ];

  if (mode === "compact-retry") {
    base.push(
      "Your previous attempt was malformed or truncated JSON. Regenerate from scratch as valid JSON only.",
      "Keep all language fields detailed but concise.",
      "Keep json_prompt strict and reconstructable, but use compact factual phrases and avoid repetitive prose.",
    );
  }

  base.push(
    `Page URL: ${target.pageUrl}`,
    `Alt text: ${target.alt || "N/A"}`,
    `Image size: ${target.naturalWidth || "unknown"}x${target.naturalHeight || "unknown"}`,
    `Aspect ratio: ${ratio}`,
  );

  return base.join("\n");
}

function toDataUrl(mimeType, data) {
  return `data:${mimeType};base64,${data}`;
}

async function extractJson(text) {
  const stripped = stripFence(text);
  if (!stripped) throw new Error("接口没有返回可解析的内容。");
  try {
    return parseResponse(JSON.parse(stripped));
  } catch (error) {
    throw new Error(`接口返回了非 JSON 内容：${error instanceof Error ? error.message : "unknown error"}`);
  }
}

function looksBrokenJson(error) {
  return error instanceof Error && /JSON|Unterminated string|Unexpected end|Unexpected token|格式损坏|被截断/i.test(error.message);
}

async function callGemini(config, target, image, ratio, compact = false) {
  const url = `${trimUrl(config.baseUrl)}/models/${config.model.trim()}:generateContent?key=${encodeURIComponent(config.apiKey.trim())}`;
  let payload;
  try {
    payload = await withTimeout(ANALYSIS_REQUEST_TIMEOUT_MS, "分析请求超时（120 秒），请稍后重试或换用响应更快的模型。", async (signal) => {
      const response = await fetch(url, {
        signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            {
              role: "user",
              parts: [{ text: buildPrompt(target, ratio, compact ? "compact-retry" : "full") }, { inlineData: { mimeType: image.mimeType, data: image.data } }],
            },
          ],
          generationConfig: {
            temperature: 0.18,
            maxOutputTokens: compact ? 3600 : 2600,
            responseMimeType: "application/json",
            responseJsonSchema: RESPONSE_SCHEMA,
          },
        }),
      });
      if (!response.ok) {
        const body = await response.text();
        throw new Error(`分析请求失败 (${response.status}) ${body || response.statusText}`.trim());
      }
      return response.json();
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("分析请求失败")) throw error;
    throw requestError("analysis", config, error);
  }
  return extractJson(extractTextParts(payload));
}

async function callOpenAICompatible(config, target, image, ratio, compact = false) {
  const url = `${trimUrl(config.baseUrl)}/chat/completions`;
  const model = modelName(config);
  let payload;
  try {
    payload = await withTimeout(ANALYSIS_REQUEST_TIMEOUT_MS, "分析请求超时（120 秒），请稍后重试或换用响应更快的模型。", async (signal) => {
      const response = await fetch(url, {
        signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey.trim()}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.18,
          max_tokens: compact ? 3600 : 2600,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: [
                { type: "text", text: buildPrompt(target, ratio, compact ? "compact-retry" : "full") },
                { type: "image_url", image_url: { url: toDataUrl(image.mimeType, image.data) } },
              ],
            },
          ],
        }),
      });
      if (!response.ok) {
        const body = await response.text();
        throw new Error(`分析请求失败 (${response.status}) ${body || response.statusText}`.trim());
      }
      return response.json();
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("分析请求失败")) throw error;
    throw requestError("analysis", config, error);
  }
  return extractJson(extractOpenAiText(payload));
}

async function analyze(config, target) {
  validateConfig(config);
  const image = await readImagePayload(target);
  const ratio = aspectRatio(target);

  try {
    return providerKind(config.baseUrl) === "gemini"
      ? await callGemini(config, target, image, ratio)
      : await callOpenAICompatible(config, target, image, ratio);
  } catch (error) {
    if (!looksBrokenJson(error)) throw error;
    try {
      return providerKind(config.baseUrl) === "gemini"
        ? await callGemini(config, target, image, ratio, true)
        : await callOpenAICompatible(config, target, image, ratio, true);
    } catch (retryError) {
      throw new Error(
        `模型返回的 JSON 仍然不完整，已自动重试一次但还是失败。请稍后重试，或改用输出更稳定的模型。${retryError instanceof Error ? retryError.message : "unknown error"}`,
      );
    }
  }
}

function sanitizeHistoryEntries(value) {
  return Array.isArray(value) ? value.filter((entry) => entry && typeof entry === "object").slice(0, 49) : [];
}

async function saveUploadedAnalysis(target, analysis) {
  const record = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    imageSrc: target.src,
    pageUrl: target.pageUrl || "#",
    imageWidth: typeof target.naturalWidth === "number" ? target.naturalWidth : void 0,
    imageHeight: typeof target.naturalHeight === "number" ? target.naturalHeight : void 0,
    analysis,
    promptDrafts: {},
  };
  const stored = await chrome.storage.local.get(HISTORY_KEY);
  const history = [record, ...sanitizeHistoryEntries(stored[HISTORY_KEY])].slice(0, 50);
  await chrome.storage.local.set({
    [HISTORY_KEY]: history,
    [SNAPSHOT_KEY]: {
      createdAt: record.createdAt,
      target: {
        src: target.src,
        pageUrl: target.pageUrl || "#",
        naturalWidth: record.imageWidth,
        naturalHeight: record.imageHeight,
      },
      analysis,
      promptDrafts: {},
    },
  });
  return record;
}

async function testConnection(config) {
  validateConfig(config);
  if (providerKind(config.baseUrl) === "gemini") {
    const url = `${trimUrl(config.baseUrl)}/models/${config.model.trim()}:generateContent?key=${encodeURIComponent(config.apiKey.trim())}`;
    let payload;
    try {
      payload = await withTimeout(TEST_REQUEST_TIMEOUT_MS, "连接测试超时（20 秒），请检查接口地址、网络代理或模型服务状态。", async (signal) => {
        const response = await fetch(url, {
          signal,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ system_instruction: { parts: [{ text: SYSTEM_PROMPT }] }, contents: [{ role: "user", parts: [{ text: "Reply with exactly OK." }] }] }),
        });
        if (!response.ok) {
          const body = await response.text();
          throw new Error(`连接测试失败 (${response.status}) ${body || response.statusText}`.trim());
        }
        return response.json();
      });
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("连接测试失败")) throw error;
      throw requestError("test", config, error);
    }
    if (!extractTextParts(payload)) throw new Error("接口已连通，但没有返回有效内容。");
    return;
  }

  const url = `${trimUrl(config.baseUrl)}/chat/completions`;
  let payload;
  try {
    payload = await withTimeout(TEST_REQUEST_TIMEOUT_MS, "连接测试超时（20 秒），请检查接口地址、网络代理或模型服务状态。", async (signal) => {
      const response = await fetch(url, {
        signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: modelName(config),
          max_tokens: 16,
          messages: [{ role: "user", content: "Reply with exactly OK." }],
        }),
      });
      if (!response.ok) {
        const body = await response.text();
        throw new Error(`连接测试失败 (${response.status}) ${body || response.statusText}`.trim());
      }
      return response.json();
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("连接测试失败")) throw error;
    throw requestError("test", config, error);
  }
  if (!extractOpenAiText(payload)) throw new Error("接口已连通，但没有返回有效内容。");
}

async function loadEnabled() {
  const result = await chrome.storage.local.get(SETTINGS_KEY);
  return typeof result[SETTINGS_KEY] === "boolean" ? result[SETTINGS_KEY] : true;
}

async function refreshBadge() {
  const enabled = await loadEnabled();
  chrome.action.setBadgeText({ text: enabled ? "" : OFF_BADGE });
  chrome.action.setBadgeBackgroundColor({ color: enabled ? "#00000000" : "#000000" });
  updateContextMenu(enabled);
}

function updateContextMenu(enabled) {
  chrome.contextMenus.removeAll(() => {
    chrome.runtime.lastError;
    if (!enabled) return;
    chrome.contextMenus.create(
      {
        id: MENU_ID,
        title: "使用MX-Insight分析此图片提示词",
        contexts: ["image"],
      },
      () => {
        chrome.runtime.lastError;
      },
    );
  });
}

function openOptions(hash = "") {
  chrome.tabs.create({ url: chrome.runtime.getURL(`options.html${hash}`) });
}

function sendTabMessage(tabId, payload, frameId) {
  return new Promise((resolve, reject) => {
    const done = () => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve();
    };
    if (typeof frameId === "number") {
      chrome.tabs.sendMessage(tabId, payload, { frameId }, done);
      return;
    }
    chrome.tabs.sendMessage(tabId, payload, done);
  });
}

async function retrySendTabMessage(tabId, payload, frameId, attempts = 4) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      await sendTabMessage(tabId, payload, frameId);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < attempts - 1) await new Promise((resolve) => setTimeout(resolve, 120 * (attempt + 1)));
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Failed to send message to tab.");
}

async function waitForTabLoad(tabId, timeout = 15000) {
  return new Promise((resolve) => {
    let resolved = false;
    const cleanup = () => {
      chrome.tabs.onUpdated.removeListener(listener);
      clearTimeout(timer);
    };
    const finish = () => {
      if (resolved) return;
      resolved = true;
      cleanup();
      resolve();
    };
    const listener = (updatedTabId, info) => {
      if (updatedTabId === tabId && info.status === "complete") finish();
    };
    const timer = setTimeout(finish, timeout);
    chrome.tabs.onUpdated.addListener(listener);
  });
}

async function openGeneratorSite(siteId, prompt) {
  const tab = await chrome.tabs.create({ url: GENERATOR_SITES[siteId], active: true });
  if (!tab.id) throw new Error("无法打开目标生图网站。");
  const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  try {
    try {
      await chrome.tabs.setZoomSettings(tab.id, { mode: "automatic", scope: "per-tab" });
      await chrome.tabs.setZoom(tab.id, 1);
    } catch {}
    await waitForTabLoad(tab.id);
    await retrySendTabMessage(tab.id, { type: "AUTOFILL_GENERATOR_PROMPT", payload: { siteId, prompt, requestId } }, void 0, 6);
    return true;
  } catch {
    return false;
  }
}

async function openPanel(tabId, srcUrl, frameId, preferLatest = false) {
  const message = { type: "OPEN_PANEL", payload: { srcUrl, preferLatest } };
  try {
    await sendTabMessage(tabId, message, frameId);
  } catch {
    await chrome.scripting.executeScript({
      target: typeof frameId === "number" ? { tabId, frameIds: [frameId] } : { tabId },
      files: ["content.js"],
    });
    await retrySendTabMessage(tabId, message, frameId);
  }
}

chrome.runtime.onInstalled.addListener((details) => {
  refreshBadge();
  if (details.reason === "install") {
    openOptions("#welcome");
  }
});

chrome.runtime.onStartup.addListener(() => {
  refreshBadge();
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && Object.prototype.hasOwnProperty.call(changes, SETTINGS_KEY)) {
    refreshBadge();
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID || !tab?.id || !info.srcUrl) return;
  (async () => {
    if (await loadEnabled()) {
      await openPanel(tab.id, info.srcUrl, typeof info.frameId === "number" ? info.frameId : void 0);
    }
  })();
});

chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (message.type === "RUN_ANALYSIS") {
    (async () => {
      try {
        const config = await chrome.storage.local.get(["baseUrl", "apiKey", "model"]);
        respond({ ok: true, data: await analyze(config, message.payload.target) });
      } catch (error) {
        respond({ ok: false, error: error instanceof Error ? error.message : "分析失败，请稍后重试。" });
      }
    })();
    return true;
  }

  if (message.type === "TEST_CONNECTION") {
    (async () => {
      try {
        const config = await chrome.storage.local.get(["baseUrl", "apiKey", "model"]);
        await testConnection(config);
        respond({ ok: true, data: { ok: true } });
      } catch (error) {
        respond({ ok: false, error: error instanceof Error ? error.message : "连接测试失败。" });
      }
    })();
    return true;
  }

  if (message.type === "ANALYZE_UPLOADED_IMAGE") {
    (async () => {
      try {
        const config = await chrome.storage.local.get(["baseUrl", "apiKey", "model"]);
        const target = message.payload?.target;
        if (!target || typeof target.src !== "string") throw new Error("没有拿到可分析的上传图片。");
        const analysis = await analyze(config, {
          src: target.src,
          alt: target.alt || "uploaded image",
          pageUrl: target.pageUrl || "#",
          naturalWidth: target.naturalWidth,
          naturalHeight: target.naturalHeight,
        });
        const record = await saveUploadedAnalysis(target, analysis);
        respond({ ok: true, data: { record } });
      } catch (error) {
        respond({ ok: false, error: error instanceof Error ? error.message : "上传图片分析失败。" });
      }
    })();
    return true;
  }

  if (message.type === "OPEN_SETTINGS") {
    const focus = message.payload?.focus;
    const hash =
      focus === "base-url" ? "#base-url" :
      focus === "history" ? "#history" :
      focus === "preferences" ? "#preferences" :
      focus === "account" ? "#account" :
      "#api";
    openOptions(hash);
    respond({ ok: true, data: { opened: true } });
    return false;
  }

  if (message.type === "OPEN_ACTIVE_PANEL") {
    (async () => {
      try {
        if (!(await loadEnabled())) throw new Error("插件当前已关闭，请先在弹窗里开启。");
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) throw new Error("没有找到当前标签页。");
        await openPanel(tab.id, void 0, void 0, true);
        respond({ ok: true, data: { opened: true } });
      } catch (error) {
        respond({ ok: false, error: error instanceof Error ? error.message : "打开面板失败。" });
      }
    })();
    return true;
  }

  if (message.type === "OPEN_GENERATOR_SITE") {
    (async () => {
      try {
        if (!(await loadEnabled())) throw new Error("插件当前已关闭，请先在弹窗里开启。");
        const opened = await openGeneratorSite(message.payload.siteId, message.payload.prompt);
        respond({ ok: true, data: { opened: true, autofillRequested: opened } });
      } catch (error) {
        respond({ ok: false, error: error instanceof Error ? error.message : "打开生图网站失败。" });
      }
    })();
    return true;
  }

  return false;
});

refreshBadge();
