const MENU_ID = "mx-insight-analyze-image";
const OFF_BADGE = "OFF";
const SETTINGS_KEY = "enabled";
const HISTORY_KEY = "historyEntries";
const SNAPSHOT_KEY = "latestAnalysisSnapshot";
const TASKS_KEY = "reversePromptTasks";
const IMAGE_FETCH_TIMEOUT_MS = 30000;
const ANALYSIS_REQUEST_TIMEOUT_MS = 180000;
const TEST_REQUEST_TIMEOUT_MS = 20000;
const OPENAI_ANALYSIS_MAX_OUTPUT_TOKENS = 5200;
const OPENAI_ANALYSIS_RETRY_MAX_OUTPUT_TOKENS = 3600;
const TOP_INTERMEDIATE_MAX_OUTPUT_TOKENS = 2600;
const TOP_FINAL_MAX_OUTPUT_TOKENS = 6200;
const MAX_IMAGE_SIDE = 2200;
const HISTORY_PREVIEW_MAX_SIDE = 720;
const JPEG_QUALITY = 0.92;

const GENERATOR_SITES = {
  jimeng: "https://jimeng.jianying.com/",
  gemini: "https://gemini.google.com/app",
  midjourney: "https://www.midjourney.com/imagine",
  lovart: "https://www.lovart.ai/",
};

const SYSTEM_PROMPT = [
  "You are an elite reverse-prompt analyst for AI-generated and highly-stylized images.",
  "Your job is to reconstruct the most likely original image-generation prompt as faithfully as possible from visible evidence.",
  "Your output should help another image model recreate the source image with close visual fidelity.",
  "Return valid JSON only and follow the requested schema exactly.",
  "Treat this as forensic reconstruction, not creative writing.",
  "Maximize visual fidelity to the source image and infer the likely prompting logic behind the result.",
  "Be faithful to visually verifiable facts. Never invent brands, logos, exact text, named artists, camera bodies, lens models, render engines, precise locations, or hidden objects unless clearly visible.",
  "Do not use generic filler as a replacement for concrete visual description.",
].join(" ");

const PROMPT_SCHEMA_TEXT = `
${SYSTEM_PROMPT}

Analyze the provided image and output reverse-prompt JSON with reconstruction prompts.
Prioritize accurate visual grounding, compositional logic and likely prompt reconstruction over creativity.
Make the prompt detailed, concrete, and reproduction-oriented. Avoid short summaries.

The JSON schema:
{
  "zh": {
    "prompt": "A dense, visually grounded Simplified Chinese reconstruction prompt ordered as Subject, Action/Pose, Details/Appearance, Environment/Background, Lighting/Atmosphere, Composition/Framing, Style/Camera, Colors, Materials, Aspect Ratio, Quality/Finish, Likely Generation Intent.",
    "analysis": "A short Simplified Chinese explanation covering the same fields, with extra attention on composition, style and camera language."
  },
  "zh_hant": {
    "prompt": "A dense, visually grounded Traditional Chinese reconstruction prompt ordered as Subject, Action/Pose, Details/Appearance, Environment/Background, Lighting/Atmosphere, Composition/Framing, Style/Camera, Colors, Materials, Aspect Ratio, Quality/Finish, Likely Generation Intent.",
    "analysis": "A short Traditional Chinese explanation covering the same fields, with extra attention on composition, style and camera language."
  },
  "en": {
    "prompt": "A dense, visually grounded English reconstruction prompt ordered as Subject, Action/Pose, Details/Appearance, Environment/Background, Lighting/Atmosphere, Composition/Framing, Style/Camera, Colors, Materials, Aspect Ratio, Quality/Finish, Likely Generation Intent.",
    "analysis": "A short English explanation covering the same fields, with extra attention on composition, style and camera language."
  },
  "ja": {
    "prompt": "A dense, visually grounded Japanese reconstruction prompt ordered as Subject, Action/Pose, Details/Appearance, Environment/Background, Lighting/Atmosphere, Composition/Framing, Style/Camera, Colors, Materials, Aspect Ratio, Quality/Finish, Likely Generation Intent.",
    "analysis": "A short Japanese explanation covering the same fields, with extra attention on composition, style and camera language."
  },
  "zh_style_tags": ["中文标签1", "中文标签2", "中文标签3", "中文标签4"],
  "zh_hant_style_tags": ["繁中標籤1", "繁中標籤2", "繁中標籤3", "繁中標籤4"],
  "en_style_tags": ["english tag 1", "english tag 2", "english tag 3", "english tag 4"],
  "ja_style_tags": ["日本語タグ1", "日本語タグ2", "日本語タグ3", "日本語タグ4"],
  "json_prompt": {
    "image_type": "One of anime_illustration, game_screenshot, real_photo, ai_art, design_poster, 3d_render, or unknown.",
    "source_guess": "A cautious source/type guess such as anime-style key visual, mobile game splash art, cinematic game screenshot, studio portrait, product render, or poster layout. Do not claim a specific IP, franchise, character, studio or game title unless the image clearly proves it.",
    "source_confidence": 0.0,
    "source_evidence": ["visible clue 1", "visible clue 2", "visible clue 3"],
    "prompt_strategy": "The type-specific strategy used to write the final prompts.",
    "subject": "Main subject with count, type, scale, identity category and the most visually important attributes.",
    "action_pose": "Action, pose, gesture, gaze, orientation, body language or object placement.",
    "details_appearance": "Specific visible details, clothing, anatomy, props, accessories, markings, silhouette, condition or design cues.",
    "environment_background": "Environment, set, backdrop, foreground/midground/background relationship, depth cues and surrounding objects.",
    "lighting_atmosphere": "Lighting direction, source quality, contrast, shadow softness, color temperature, mood, weather or atmospheric effects.",
    "composition_framing": "Shot distance, angle, crop, subject placement, negative space, perspective, focal emphasis and framing logic.",
    "style_camera": "Visual medium, aesthetic style, realism/stylization level, camera or lens feel, render/paint/photographic finish and post-processing cues.",
    "colors": ["primary color", "secondary color", "accent color"],
    "materials": ["material 1", "material 2", "surface finish"],
    "aspect_ratio": "4:5",
    "quality_modifiers": ["output quality cue 1", "output quality cue 2", "finish cue"],
    "likely_generation_intent": "What the original creator was likely optimizing for."
  },
  "recreation_prompt": "A long, polished, single-line English recreation prompt that aims to reproduce the source image as closely as possible, with dense visual details and no filler.",
  "prompt_core": "A shorter reusable English core prompt with the most important visual ingredients, preserving subject, composition, lighting, style and palette.",
  "negative_prompt": "An English negative prompt that removes common artifacts while staying compatible with the observed style.",
  "confidence": 0.0
}

Rules:
- Return JSON only. No markdown fences.
- Treat this as forensic reconstruction, not creative writing.
- Maximize visual fidelity to the source image and infer the likely prompting logic behind the result.
- Be faithful to visually verifiable facts. Never invent brands, logos, exact text, named artists, camera bodies, lens models, render engines, precise locations, or hidden objects unless clearly visible.
- If a detail is uncertain, use broader but still useful wording.
- Do not use generic filler such as "highly detailed" or "masterpiece" as a replacement for concrete visual description.
- zh.prompt, zh_hant.prompt, en.prompt and ja.prompt must be natural readable paragraphs, not field-labeled lists.
- Each language prompt must be detailed enough for image recreation: target 90 to 150 English words or equivalent density in the target language.
- recreation_prompt must be the most complete output: target 130 to 220 English words in one polished line.
- Describe visible foreground, midground and background relationships when present.
- Capture subject count, identity category, pose, gesture, gaze, expression, clothing or object design, materials, textures, surface finish, weathering, and small distinctive details.
- For magazine, poster or ad layouts, always describe masthead/title text, main title position, side/bottom small text, barcode/price/date blocks, subject-to-title overlap, subject scale, background layers, clothing material, makeup/hair, lighting and color system when visible.
- First classify the image inside json_prompt.image_type before writing the final prompt. Use this classification to choose the correct prompt strategy.
- Supported image_type values:
  - anime_illustration: anime illustration, manga/anime key visual, cel-shaded character art, visual novel or anime screenshot style.
  - game_screenshot: game screenshot, 3D game character, game environment, game UI/HUD, splash art with game-asset language.
  - real_photo: real photography, portrait, product photo, documentary or lifestyle image.
  - ai_art: visibly AI-generated illustration/concept art that is not better described by another category.
  - design_poster: poster, magazine cover, advertising layout, ecommerce banner or typography-led graphic.
  - 3d_render: CG render, toy/figurine render, product render, stylized 3D model or scene.
  - unknown: use only when the visible evidence is too ambiguous.
- For anime_illustration, emphasize character design, hair shape and color, eye design, expression, outfit construction, accessories, line art, cel shading, painterly finish, background layers, key visual composition and anime-specific lighting. Do not force real-camera language.
- For game_screenshot, emphasize character/creature/vehicle design, weapons or props, environment assets, HUD/UI when visible, real-time rendering, PBR materials, engine-like lighting, camera perspective, depth of field, motion blur and gameplay/splash-art framing.
- For real_photo, emphasize photographic subject, real materials, lens feel, shot distance, natural or studio light, depth of field, skin/cloth/product texture and believable environment.
- For ai_art, emphasize the visible generated-image style, composition, surface finish, lighting, palette and model-friendly visual modifiers without relying on generic filler.
- For design_poster, prioritize layout, typography, text blocks, hierarchy, grids, logo/title placement, subject-to-text overlap, margins, barcode/date/price blocks and graphic design system.
- For 3d_render, emphasize geometry, shader/material behavior, render lighting, model scale, camera angle, surface finish, ambient occlusion, reflections and CG/post-processing cues.
- json_prompt.source_guess may name broad categories or possible source types. Only name a specific franchise, character, game or anime when clearly visible from reliable on-image evidence. Keep uncertain names out of recreation_prompt.
- json_prompt.source_evidence must list concrete visible clues that justify image_type and source_guess.
- recreation_prompt and prompt_core must follow json_prompt.prompt_strategy and should not include low-confidence source guesses as facts.
- Capture lighting direction, shadow softness, contrast, color temperature, atmosphere, depth, lens feel, camera angle, shot distance, crop, focal emphasis, and aspect ratio.
- If the image is simple, expand on spatial placement, proportions, edges, textures, lighting, palette, and finish instead of inventing new objects.
- Return exactly 4 concise style tags in each language.
- Keep English style tags short enough for compact UI pills: 1 to 3 words, ideally under 24 characters.
- Keep structured categories only inside json_prompt.
- Language fields must not be mixed up:
  - zh.prompt, zh.analysis and zh_style_tags must be Simplified Chinese.
  - zh_hant.prompt, zh_hant.analysis and zh_hant_style_tags must be Traditional Chinese.
  - en.prompt, en.analysis and en_style_tags must be English.
  - ja.prompt, ja.analysis and ja_style_tags must be Japanese.
  - json_prompt, recreation_prompt, prompt_core and negative_prompt must be English.
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
        image_type: { type: "string" },
        source_guess: { type: "string" },
        source_confidence: { type: "number" },
        source_evidence: { type: "array", items: { type: "string" } },
        prompt_strategy: { type: "string" },
        subject: { type: "string" },
        action_pose: { type: "string" },
        details_appearance: { type: "string" },
        environment_background: { type: "string" },
        lighting_atmosphere: { type: "string" },
        composition_framing: { type: "string" },
        style_camera: { type: "string" },
        colors: { type: "array", items: { type: "string" } },
        materials: { type: "array", items: { type: "string" } },
        aspect_ratio: { type: "string" },
        quality_modifiers: { type: "array", items: { type: "string" } },
        likely_generation_intent: { type: "string" },
      },
      additionalProperties: true,
      required: [
        "image_type",
        "source_guess",
        "source_confidence",
        "source_evidence",
        "prompt_strategy",
        "subject",
        "action_pose",
        "details_appearance",
        "environment_background",
        "lighting_atmosphere",
        "composition_framing",
        "style_camera",
        "colors",
        "materials",
        "aspect_ratio",
        "quality_modifiers",
        "likely_generation_intent",
      ],
    },
    recreation_prompt: { type: "string" },
    prompt_core: { type: "string" },
    negative_prompt: { type: "string" },
    confidence: { type: "number" },
  },
  required: [
    "zh",
    "zh_hant",
    "en",
    "ja",
    "zh_style_tags",
    "zh_hant_style_tags",
    "en_style_tags",
    "ja_style_tags",
    "json_prompt",
    "recreation_prompt",
    "prompt_core",
    "negative_prompt",
    "confidence",
  ],
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

function extractOpenAiDeltaText(value) {
  if (typeof value !== "object" || value === null) return "";
  const choices = value.choices;
  return Array.isArray(choices)
    ? choices
        .map((choice) => {
          if (typeof choice !== "object" || choice === null) return "";
          const delta = choice.delta;
          if (typeof delta !== "object" || delta === null) return "";
          const content = delta.content;
          return typeof content === "string"
            ? content
            : Array.isArray(content)
              ? content.map((part) => (typeof part === "object" && part !== null && typeof part.text === "string" ? part.text : "")).join("")
              : "";
        })
        .join("")
    : "";
}

function extractOpenAiError(value) {
  if (typeof value !== "object" || value === null) return "";
  const error = value.error;
  if (typeof error === "string") return error;
  if (typeof error !== "object" || error === null) return "";
  return typeof error.message === "string" ? error.message : JSON.stringify(error);
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
  const sourceConfidence = source.source_confidence ?? source.sourceConfidence;
  const confidence = typeof sourceConfidence === "number" && Number.isFinite(sourceConfidence)
    ? Math.min(1, Math.max(0, sourceConfidence))
    : void 0;
  return {
    imageType: firstString(source, "image_type", "imageType"),
    sourceGuess: firstString(source, "source_guess", "sourceGuess"),
    sourceConfidence: confidence,
    sourceEvidence: arrayFrom(source, "source_evidence", "sourceEvidence"),
    promptStrategy: firstString(source, "prompt_strategy", "promptStrategy"),
    subject: firstString(source, "subject"),
    actionPose: firstString(source, "action_pose", "actionPose"),
    detailsAppearance: firstString(source, "details_appearance", "detailsAppearance"),
    environmentBackground: firstString(source, "environment_background", "environmentBackground"),
    lightingAtmosphere: firstString(source, "lighting_atmosphere", "lightingAtmosphere"),
    compositionFraming: firstString(source, "composition_framing", "compositionFraming"),
    styleCamera: firstString(source, "style_camera", "styleCamera"),
    colors: arrayFrom(source, "colors"),
    materials: arrayFrom(source, "materials"),
    aspectRatio: firstString(source, "aspect_ratio", "aspectRatio"),
    qualityModifiers: arrayFrom(source, "quality_modifiers", "qualityModifiers"),
    likelyGenerationIntent: firstString(source, "likely_generation_intent", "likelyGenerationIntent"),
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

function countMatches(text, pattern) {
  return text.match(pattern)?.length || 0;
}

function hasChineseText(text) {
  const chinese = countMatches(text, /[\u4e00-\u9fff]/g);
  const japanese = countMatches(text, /[\u3040-\u30ff]/g);
  return chinese >= 8 && japanese <= Math.max(2, Math.floor(chinese * 0.12));
}

function hasEnglishText(text) {
  const latin = countMatches(text, /[A-Za-z]/g);
  const cjk = countMatches(text, /[\u3040-\u30ff\u4e00-\u9fff]/g);
  return latin >= 24 && latin >= cjk * 2;
}

function hasJapaneseText(text) {
  return countMatches(text, /[\u3040-\u30ff]/g) >= 6;
}

function tagsAreChinese(tags) {
  return tags.length > 0 && tags.every((tag) => countMatches(tag, /[\u4e00-\u9fff]/g) > 0 && countMatches(tag, /[\u3040-\u30ff]/g) === 0);
}

function tagsAreEnglish(tags) {
  return tags.length > 0 && tags.every((tag) => countMatches(tag, /[A-Za-z]/g) > 0 && countMatches(tag, /[\u3040-\u30ff\u4e00-\u9fff]/g) === 0);
}

function tagsAreJapanese(tags) {
  return tags.length > 0 && tags.every((tag) => countMatches(tag, /[\u3040-\u30ff]/g) > 0 || (countMatches(tag, /[\u4e00-\u9fff]/g) > 0 && countMatches(tag, /[A-Za-z]/g) === 0));
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

  const parsed = {
    zh: { prompt: zh.prompt.trim(), analysis: zh.analysis.trim() },
    zhHant: { prompt: zhHant.prompt.trim(), analysis: zhHant.analysis.trim() },
    zh_hant: { prompt: zhHant.prompt.trim(), analysis: zhHant.analysis.trim() },
    en: { prompt: en.prompt.trim(), analysis: en.analysis.trim() },
    ja: { prompt: ja.prompt.trim(), analysis: ja.analysis.trim() },
    jsonPrompt: parseJsonPrompt(jsonPrompt),
    styleTags: parseTags(payload),
    recreationPrompt: typeof payload.recreation_prompt === "string" ? payload.recreation_prompt.trim() : "",
    promptCore: typeof payload.prompt_core === "string" ? payload.prompt_core.trim() : "",
    negativePrompt: typeof payload.negative_prompt === "string" ? payload.negative_prompt.trim() : "",
    confidence: score,
  };

  if (
    !hasChineseText(`${parsed.zh.prompt}\n${parsed.zh.analysis}`) ||
    !hasEnglishText(`${parsed.en.prompt}\n${parsed.en.analysis}`) ||
    !hasJapaneseText(`${parsed.ja.prompt}\n${parsed.ja.analysis}`) ||
    !tagsAreChinese(parsed.styleTags.zh.slice(0, 4)) ||
    !tagsAreEnglish(parsed.styleTags.en.slice(0, 4)) ||
    !tagsAreJapanese(parsed.styleTags.ja.slice(0, 4))
  ) {
    throw new Error("模型返回的多语言字段混乱。");
  }

  return parsed;
}

function validateConfig(config) {
  if (!config.baseUrl.trim()) throw new Error("请先在设置页填写接口地址。");
  if (!config.apiKey.trim()) throw new Error("请先在设置页填写接口密钥。");
  if (!config.model.trim()) throw new Error("请先在设置页填写支持图片分析的模型名。");
}

function normalizeReversePerformance(value) {
  return value === "top" ? "top" : "standard";
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

async function reencodeImageToJpeg(bytes, sourceMimeType, maxSide = MAX_IMAGE_SIDE, quality = JPEG_QUALITY) {
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
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("无法创建图片转换上下文。");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(bitmap, 0, 0, width, height);
    const output = await canvas.convertToBlob({ type: "image/jpeg", quality });
    const buffer = await output.arrayBuffer();
    return { mimeType: "image/jpeg", data: bytesToBase64(new Uint8Array(buffer)) };
  } finally {
    bitmap.close?.();
  }
}

async function createHistoryPreview(bytes, mimeType) {
  try {
    const detected = detectMime(bytes);
    const declared = normalizeMime(mimeType);
    if (!((detected && detected.startsWith("image/")) || declared.startsWith("image/"))) return "";
    const preview = await reencodeImageToJpeg(bytes, detected || declared, HISTORY_PREVIEW_MAX_SIDE, 0.82);
    return toDataUrl(preview.mimeType, preview.data);
  } catch {
    return "";
  }
}

async function normalizeImagePayload(bytes, mimeType) {
  if (!bytes.length) throw new Error("图片数据为空，请换一张图片再试。");
  const detected = detectMime(bytes);
  const declared = normalizeMime(mimeType);
  if ((detected && detected.startsWith("image/")) || declared.startsWith("image/")) {
    return reencodeImageToJpeg(bytes, detected || declared);
  }
  if (detected && OPENAI_CHAT_IMAGE_MIMES.has(detected)) {
    return { mimeType: detected, data: bytesToBase64(bytes) };
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
    const image = await normalizeImagePayload(bytes, dataUrl.mimeType);
    const previewSrc = await createHistoryPreview(bytes, dataUrl.mimeType);
    return { ...image, previewSrc };
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
  const image = await normalizeImagePayload(bytes, bytesAndType.mimeType);
  const previewSrc = await createHistoryPreview(bytes, bytesAndType.mimeType);
  return { ...image, previewSrc };
}

function buildPrompt(target, ratio, mode = "full") {
  const base = [
    PROMPT_SCHEMA_TEXT,
    "",
    "Analyze this image and output multilingual reverse-prompt JSON with recreation_prompt, prompt_core and negative_prompt.",
    "Prioritize accurate visual grounding, compositional logic and likely prompt reconstruction over creativity.",
    "Make the prompt detailed, concrete, and reproduction-oriented. Avoid short summaries.",
  ];

  if (mode === "compact-retry") {
    base.push(
      "Your previous attempt was malformed or truncated JSON. Regenerate from scratch as valid JSON only.",
      "Preserve the same schema, but keep zh/zh_hant/en/ja prompt fields closer to 80 to 110 English words or equivalent density.",
      "Keep recreation_prompt under 150 English words.",
      "Do not include markdown, comments, reasoning or explanations outside the JSON object.",
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
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  const jsonText = start >= 0 && end > start ? stripped.slice(start, end + 1) : stripped;
  try {
    return parseResponse(JSON.parse(jsonText));
  } catch (error) {
    throw new Error(`接口返回了非 JSON 内容：${error instanceof Error ? error.message : "unknown error"}`);
  }
}

function looksBrokenJson(error) {
  return error instanceof Error && /JSON|Unterminated string|Unexpected end|Unexpected token|格式损坏|被截断|多语言字段混乱/i.test(error.message);
}

function openAiTokenParam(model) {
  return /^(gpt-5|o\d|o-)/i.test(model.trim()) ? "max_completion_tokens" : "max_tokens";
}

function buildOpenAiChatBody(model, target, image, ratio, compact = false, stream = false, options = {}) {
  const tokenLimit = compact ? OPENAI_ANALYSIS_RETRY_MAX_OUTPUT_TOKENS : OPENAI_ANALYSIS_MAX_OUTPUT_TOKENS;
  const body = {
    model,
    temperature: 0.18,
    stream,
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
  };
  body[options.tokenParam || openAiTokenParam(model)] = tokenLimit;
  if (options.responseFormat !== false) body.response_format = { type: "json_object" };
  return body;
}

function buildOpenAiCustomBody(model, prompt, image, maxTokens, options = {}) {
  const body = {
    model,
    temperature: 0.16,
    stream: false,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: toDataUrl(image.mimeType, image.data) } },
        ],
      },
    ],
  };
  body[options.tokenParam || openAiTokenParam(model)] = maxTokens;
  if (options.responseFormat !== false) body.response_format = { type: "json_object" };
  return body;
}

function parseJsonObjectText(text) {
  const stripped = stripFence(text);
  if (!stripped) throw new Error("接口没有返回可解析的 JSON 内容。");
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  const jsonText = start >= 0 && end > start ? stripped.slice(start, end + 1) : stripped;
  const parsed = JSON.parse(jsonText);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("JSON 顶层不是对象。");
  return parsed;
}

async function callGeminiCustomText(config, image, prompt, maxTokens, responseSchema = null) {
  const url = `${trimUrl(config.baseUrl)}/models/${config.model.trim()}:generateContent?key=${encodeURIComponent(config.apiKey.trim())}`;
  let payload;
  try {
    payload = await withTimeout(ANALYSIS_REQUEST_TIMEOUT_MS, "分析请求超时（180 秒），请稍后重试或换用响应更快的模型。", async (signal) => {
      const generationConfig = {
        temperature: 0.16,
        maxOutputTokens: maxTokens,
        responseMimeType: "application/json",
      };
      if (responseSchema) generationConfig.responseJsonSchema = responseSchema;
      const response = await fetch(url, {
        signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }, { inlineData: { mimeType: image.mimeType, data: image.data } }],
            },
          ],
          generationConfig,
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
  return extractTextParts(payload);
}

async function callOpenAICustomText(config, image, prompt, maxTokens) {
  const url = `${trimUrl(config.baseUrl)}/chat/completions`;
  const model = modelName(config);
  try {
    const payload = await withTimeout(ANALYSIS_REQUEST_TIMEOUT_MS, "分析请求超时（180 秒），请稍后重试或换用响应更快的模型。", async (signal) => {
      const response = await fetch(url, {
        signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey.trim()}`,
        },
        body: JSON.stringify(buildOpenAiCustomBody(model, prompt, image, maxTokens)),
      });
      if (!response.ok) {
        const body = await response.text();
        throw new Error(`分析请求失败 (${response.status}) ${body || response.statusText}`.trim());
      }
      return response.json();
    });
    return extractOpenAiText(payload);
  } catch {
    try {
      const payload = await withTimeout(ANALYSIS_REQUEST_TIMEOUT_MS, "分析请求超时（180 秒），请稍后重试或换用响应更快的模型。", async (signal) => {
        const response = await fetch(url, {
          signal,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiKey.trim()}`,
          },
          body: JSON.stringify(buildOpenAiCustomBody(model, prompt, image, maxTokens, { responseFormat: false, tokenParam: "max_tokens" })),
        });
        if (!response.ok) {
          const body = await response.text();
          throw new Error(`分析请求失败 (${response.status}) ${body || response.statusText}`.trim());
        }
        return response.json();
      });
      return extractOpenAiText(payload);
    } catch (fallbackError) {
      if (fallbackError instanceof Error && fallbackError.message.startsWith("分析请求失败")) throw fallbackError;
      throw requestError("analysis", config, fallbackError);
    }
  }
}

async function callVisionJsonObject(config, image, prompt, maxTokens, responseSchema = null) {
  const text = providerKind(config.baseUrl) === "gemini"
    ? await callGeminiCustomText(config, image, prompt, maxTokens, responseSchema)
    : await callOpenAICustomText(config, image, prompt, maxTokens);
  return parseJsonObjectText(text);
}

function compactJson(value) {
  return JSON.stringify(value, null, 2);
}

function buildTopSourcePrompt(target, ratio) {
  return `
${SYSTEM_PROMPT}

Stage 1 of top-quality reverse prompt analysis.
Analyze the image only for source/type identification. Do not generate the final prompt yet.

Return JSON only:
{
  "image_type": "anime_illustration | game_screenshot | real_photo | ai_art | design_poster | 3d_render | unknown",
  "source_guess": "Cautious source/type guess based only on visible evidence.",
  "source_confidence": 0.0,
  "source_evidence": ["visible clue 1", "visible clue 2", "visible clue 3"],
  "uncertain_items": ["uncertain item 1", "uncertain item 2"],
  "prompt_strategy": "How later prompt stages should analyze and write this image."
}

Rules:
- Do not claim a specific IP, franchise, character, studio, game title, artist, brand, logo or exact text unless clearly visible and strongly supported.
- Low-confidence guesses belong only in source_guess or uncertain_items.
- source_evidence must be concrete visible evidence.
- source_confidence must be a number from 0 to 1.

Page URL: ${target.pageUrl}
Alt text: ${target.alt || "N/A"}
Image size: ${target.naturalWidth || "unknown"}x${target.naturalHeight || "unknown"}
Aspect ratio: ${ratio}
`.trim();
}

function buildTopDeepPrompt(target, ratio, source) {
  return `
${SYSTEM_PROMPT}

Stage 2 of top-quality reverse prompt analysis.
Use the provided image and Stage 1 source analysis to perform a deep visual inspection. Do not generate the final prompt yet.

Stage 1 source analysis:
${compactJson(source)}

Return JSON only:
{
  "subject": "Exhaustive subject analysis with count, identity category, scale, visible attributes and role.",
  "action_pose": "Detailed pose, action, gaze, expression, gesture, body orientation and object placement.",
  "details_appearance": "Hair, eyes, face, clothing, anatomy, props, accessories, markings, silhouette, condition, design cues and small visible details.",
  "environment_background": "Foreground, midground, background, setting, spatial relationships, depth cues and surrounding objects.",
  "lighting_atmosphere": "Light direction, source quality, contrast, shadow softness, color temperature, atmosphere, weather and mood.",
  "composition_framing": "Shot distance, camera angle, crop, perspective, subject placement, negative space, focal emphasis and framing logic.",
  "style_camera": "Visual medium, stylization level, anime/game/photo/3D/poster cues, lens or render feel and post-processing.",
  "colors": ["primary color", "secondary color", "accent color"],
  "materials": ["material 1", "material 2", "surface finish"],
  "quality_modifiers": ["specific quality cue", "specific finish cue", "specific rendering cue"],
  "likely_generation_intent": "What the original creator likely optimized for.",
  "must_keep_details": ["detail that must appear in final prompt", "detail that must appear in final prompt"],
  "avoid_in_final_prompt": ["unsupported guess or misleading wording to avoid"]
}

Rules:
- Be more detailed than a caption. This is the evidence base for final prompt generation.
- Use Stage 1 to choose the correct analysis vocabulary.
- Separate visible facts from uncertain source guesses.
- If anime/game/poster/3D cues are visible, analyze them explicitly.

Page URL: ${target.pageUrl}
Alt text: ${target.alt || "N/A"}
Image size: ${target.naturalWidth || "unknown"}x${target.naturalHeight || "unknown"}
Aspect ratio: ${ratio}
`.trim();
}

function buildTopGenerationPrompt(target, ratio, source, deep) {
  return `
${PROMPT_SCHEMA_TEXT}

Stage 3 of top-quality reverse prompt analysis.
Generate the final multilingual reverse-prompt JSON using the image, Stage 1 source analysis and Stage 2 deep analysis.

Stage 1 source analysis:
${compactJson(source)}

Stage 2 deep analysis:
${compactJson(deep)}

Rules for this stage:
- Return exactly the final schema requested above.
- Integrate source.image_type, source.source_guess, source.source_confidence, source.source_evidence and source.prompt_strategy into json_prompt.
- The final prompts must preserve deep.must_keep_details.
- Do not put low-confidence source guesses into recreation_prompt or prompt_core as facts.
- Make recreation_prompt dense and reproduction-oriented.

Page URL: ${target.pageUrl}
Alt text: ${target.alt || "N/A"}
Image size: ${target.naturalWidth || "unknown"}x${target.naturalHeight || "unknown"}
Aspect ratio: ${ratio}
`.trim();
}

function buildTopRefinementPrompt(target, ratio, source, deep, draft) {
  return `
${PROMPT_SCHEMA_TEXT}

Stage 4 of top-quality reverse prompt analysis.
Self-review and rewrite the final reverse-prompt JSON. Compare the draft against Stage 1 and Stage 2.

Stage 1 source analysis:
${compactJson(source)}

Stage 2 deep analysis:
${compactJson(deep)}

Draft final result:
${compactJson(draft)}

Return JSON only in the same final schema.

Review requirements:
- Add missing important visual details from Stage 2.
- Preserve composition, lighting, background, material and style cues.
- Remove unsupported source guesses from final prompts.
- Reduce generic filler and increase concrete visual density.
- Keep all language fields in the correct language.
- Keep json_prompt compatible with the requested schema.

Page URL: ${target.pageUrl}
Alt text: ${target.alt || "N/A"}
Image size: ${target.naturalWidth || "unknown"}x${target.naturalHeight || "unknown"}
Aspect ratio: ${ratio}
`.trim();
}

async function readOpenAiStream(response) {
  if (!response.body) throw new Error("接口没有返回可读取的流式内容。");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let output = "";

  const consumeLine = (line) => {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.startsWith("data:")) return false;
    const data = trimmed.slice(5).trim();
    if (!data) return false;
    if (data === "[DONE]") return true;
    let event;
    try {
      event = JSON.parse(data);
    } catch {
      return false;
    }
    const error = extractOpenAiError(event);
    if (error) throw new Error(`分析请求失败：${error}`);
    output += extractOpenAiDeltaText(event);
    return false;
  };

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (consumeLine(line)) return output.trim();
    }
    if (done) break;
  }

  if (buffer && consumeLine(buffer)) return output.trim();
  return output.trim();
}

function parseOpenAiStreamText(text) {
  let output = "";
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.startsWith("data:")) continue;
    const data = trimmed.slice(5).trim();
    if (!data || data === "[DONE]") continue;
    let event;
    try {
      event = JSON.parse(data);
    } catch {
      continue;
    }
    const error = extractOpenAiError(event);
    if (error) throw new Error(`分析请求失败：${error}`);
    output += extractOpenAiDeltaText(event);
  }
  return output.trim();
}

function parseOpenAiResponseText(text) {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("data:")) return parseOpenAiStreamText(trimmed);
  return extractOpenAiText(JSON.parse(trimmed));
}

async function callGemini(config, target, image, ratio, compact = false) {
  const url = `${trimUrl(config.baseUrl)}/models/${config.model.trim()}:generateContent?key=${encodeURIComponent(config.apiKey.trim())}`;
  let payload;
  try {
    payload = await withTimeout(ANALYSIS_REQUEST_TIMEOUT_MS, "分析请求超时（180 秒），请稍后重试或换用响应更快的模型。", async (signal) => {
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
            maxOutputTokens: compact ? OPENAI_ANALYSIS_RETRY_MAX_OUTPUT_TOKENS : OPENAI_ANALYSIS_MAX_OUTPUT_TOKENS,
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
  const body = buildOpenAiChatBody(model, target, image, ratio, compact, true);
  let text;
  try {
    text = await withTimeout(ANALYSIS_REQUEST_TIMEOUT_MS, "分析请求超时（180 秒），请稍后重试或换用响应更快的模型。", async (signal) => {
      const response = await fetch(url, {
        signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream, application/json",
          Authorization: `Bearer ${config.apiKey.trim()}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const body = await response.text();
        throw new Error(`分析请求失败 (${response.status}) ${body || response.statusText}`.trim());
      }
      const contentType = response.headers.get("content-type") || "";
      if (contentType.toLowerCase().includes("text/event-stream")) return readOpenAiStream(response);
      return parseOpenAiResponseText(await response.text());
    });
  } catch (error) {
    try {
      const payload = await withTimeout(ANALYSIS_REQUEST_TIMEOUT_MS, "分析请求超时（180 秒），请稍后重试或换用响应更快的模型。", async (signal) => {
        const response = await fetch(url, {
          signal,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiKey.trim()}`,
          },
          body: JSON.stringify(buildOpenAiChatBody(model, target, image, ratio, compact, false, { responseFormat: false, tokenParam: "max_tokens" })),
        });
        if (!response.ok) {
          const body = await response.text();
          throw new Error(`分析请求失败 (${response.status}) ${body || response.statusText}`.trim());
        }
        return response.json();
      });
      text = extractOpenAiText(payload);
    } catch (fallbackError) {
      if (fallbackError instanceof Error && fallbackError.message.startsWith("分析请求失败")) throw fallbackError;
      throw requestError("analysis", config, fallbackError);
    }
  }
  return extractJson(text);
}

async function analyzeStandardWithImage(config, target, image, ratio, onProgress) {
  let modelProgress = 42;
  let heartbeat = null;
  const startModelHeartbeat = () => {
    heartbeat = setInterval(() => {
      modelProgress = Math.min(88, modelProgress + (modelProgress < 70 ? 4 : 2));
      onProgress?.({ progress: modelProgress, stepKey: "modelWorking", step: "模型生成中" });
    }, 3500);
  };
  const stopModelHeartbeat = () => {
    if (heartbeat !== null) clearInterval(heartbeat);
    heartbeat = null;
  };

  try {
    startModelHeartbeat();
    const analysis = providerKind(config.baseUrl) === "gemini"
      ? await callGemini(config, target, image, ratio)
      : await callOpenAICompatible(config, target, image, ratio);
    stopModelHeartbeat();
    await onProgress?.({ progress: 92, stepKey: "generatePrompt", step: "生成提示词" });
    return { ...analysis, imagePreviewSrc: image.previewSrc || "" };
  } catch (error) {
    stopModelHeartbeat();
    if (!looksBrokenJson(error)) throw error;
    try {
      await onProgress?.({ progress: 78, stepKey: "retryJson", step: "校验输出，正在重试" });
      startModelHeartbeat();
      const analysis = providerKind(config.baseUrl) === "gemini"
        ? await callGemini(config, target, image, ratio, true)
        : await callOpenAICompatible(config, target, image, ratio, true);
      stopModelHeartbeat();
      await onProgress?.({ progress: 94, stepKey: "generatePrompt", step: "生成提示词" });
      return { ...analysis, imagePreviewSrc: image.previewSrc || "" };
    } catch (retryError) {
      stopModelHeartbeat();
      throw new Error(
        `模型返回的 JSON 仍然不完整，已自动重试一次但还是失败。请稍后重试，或改用输出更稳定的模型。${retryError instanceof Error ? retryError.message : "unknown error"}`,
      );
    }
  }
}

function fallbackSourceAnalysis(error) {
  return {
    image_type: "unknown",
    source_guess: "unknown image source",
    source_confidence: 0,
    source_evidence: [],
    uncertain_items: [error instanceof Error ? error.message : "source identification failed"],
    prompt_strategy: "Use a conservative general visual reconstruction strategy based only on visible evidence.",
  };
}

async function analyzeTopWithImage(config, target, image, ratio, onProgress) {
  let source;
  try {
    await onProgress?.({ progress: 45, stepKey: "identifySource", step: "识别图片类型与可能来源" });
    source = await callVisionJsonObject(config, image, buildTopSourcePrompt(target, ratio), TOP_INTERMEDIATE_MAX_OUTPUT_TOKENS);
  } catch (error) {
    source = fallbackSourceAnalysis(error);
  }

  let deep;
  try {
    await onProgress?.({ progress: 58, stepKey: "deepAnalyze", step: "深度分析图片细节" });
    deep = await callVisionJsonObject(config, image, buildTopDeepPrompt(target, ratio, source), TOP_INTERMEDIATE_MAX_OUTPUT_TOKENS);
  } catch {
    const standard = await analyzeStandardWithImage(config, target, image, ratio, onProgress);
    return {
      ...standard,
      analysisMeta: {
        performance: "top",
        fallback: "standard_after_deep_analysis_failure",
        source,
      },
    };
  }

  await onProgress?.({ progress: 72, stepKey: "generatePrompt", step: "生成反推提示词" });
  const generatedPayload = await callVisionJsonObject(config, image, buildTopGenerationPrompt(target, ratio, source, deep), TOP_FINAL_MAX_OUTPUT_TOKENS, RESPONSE_SCHEMA);
  const generated = parseResponse(generatedPayload);

  try {
    await onProgress?.({ progress: 86, stepKey: "refinePrompt", step: "自检并优化提示词" });
    const refinedPayload = await callVisionJsonObject(config, image, buildTopRefinementPrompt(target, ratio, source, deep, generatedPayload), TOP_FINAL_MAX_OUTPUT_TOKENS, RESPONSE_SCHEMA);
    const refined = parseResponse(refinedPayload);
    return {
      ...refined,
      imagePreviewSrc: image.previewSrc || "",
      analysisMeta: {
        performance: "top",
        source,
        deepAnalysis: deep,
        refinementStatus: "refined",
      },
    };
  } catch (error) {
    return {
      ...generated,
      imagePreviewSrc: image.previewSrc || "",
      analysisMeta: {
        performance: "top",
        source,
        deepAnalysis: deep,
        refinementStatus: "failed_kept_generated",
        refinementError: error instanceof Error ? error.message : "refinement failed",
      },
    };
  }
}

async function analyze(config, target, onProgress) {
  validateConfig(config);
  await onProgress?.({ progress: 18, stepKey: "readImage", step: "读取图片" });
  const image = await readImagePayload(target);
  await onProgress?.({ progress: 42, stepKey: "sendModel", step: "发送至模型" });
  const ratio = aspectRatio(target);
  return normalizeReversePerformance(config.reversePerformance) === "top"
    ? analyzeTopWithImage(config, target, image, ratio, onProgress)
    : analyzeStandardWithImage(config, target, image, ratio, onProgress);
}

function sanitizeHistoryEntries(value) {
  return Array.isArray(value) ? value.filter((entry) => entry && typeof entry === "object").slice(0, 79) : [];
}

function sanitizeTasks(value) {
  return Array.isArray(value)
    ? value
        .filter((task) => task && typeof task === "object")
        .sort((a, b) => {
          const bTime = typeof b.createdAt === "number" ? b.createdAt : 0;
          const aTime = typeof a.createdAt === "number" ? a.createdAt : 0;
          return bTime - aTime;
        })
        .slice(0, 40)
    : [];
}

function taskTitle(target) {
  const alt = typeof target?.alt === "string" ? target.alt.trim() : "";
  if (alt) return alt.slice(0, 80);
  try {
    const url = new URL(target?.src || target?.pageUrl || "");
    const file = decodeURIComponent(url.pathname.split("/").filter(Boolean).pop() || "");
    return (file || url.hostname || "图片").slice(0, 80);
  } catch {
    return "图片";
  }
}

function promptPreviewForNotification(record) {
  const prompt = record?.analysis?.zh?.prompt || record?.analysis?.en?.prompt || record?.analysis?.recreationPrompt || "";
  const compact = String(prompt).replace(/\s+/g, " ").trim();
  return compact.length > 120 ? `${compact.slice(0, 117).trimEnd()}...` : compact;
}

function showTaskCompleteNotification(task, record) {
  if (!chrome.notifications?.create) return;
  const title = "反推完成";
  const preview = promptPreviewForNotification(record);
  const message = `${task?.title || "图片"} 已完成反推${preview ? `\n${preview}` : ""}`;
  const imageUrl = typeof record?.imageSrc === "string" && /^data:image\//i.test(record.imageSrc) ? record.imageSrc : "";
  const options = imageUrl
    ? {
        type: "image",
        iconUrl: "icons/icon-128.png",
        imageUrl,
        title,
        message,
        priority: 1,
      }
    : {
        type: "basic",
        iconUrl: "icons/icon-128.png",
        title,
        message,
        priority: 1,
      };
  chrome.notifications.create(`mx-insight-task-${task?.id || Date.now()}`, options, () => {
    chrome.runtime.lastError;
  });
}

async function upsertTask(patch) {
  const stored = await chrome.storage.local.get(TASKS_KEY);
  const tasks = sanitizeTasks(stored[TASKS_KEY]);
  const existing = tasks.find((task) => task.id === patch.id);
  const nextTask = {
    ...(existing || {}),
    ...patch,
    createdAt: typeof existing?.createdAt === "number" ? existing.createdAt : patch.createdAt,
    updatedAt: Date.now(),
  };
  const next = [nextTask, ...tasks.filter((task) => task.id !== patch.id)]
    .sort((a, b) => {
      const bTime = typeof b.createdAt === "number" ? b.createdAt : 0;
      const aTime = typeof a.createdAt === "number" ? a.createdAt : 0;
      return bTime - aTime;
    })
    .slice(0, 40);
  await chrome.storage.local.set({ [TASKS_KEY]: next });
  return nextTask;
}

async function saveReversePromptAnalysis(target, analysis, taskId) {
  const record = {
    id: taskId || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    imageSrc: analysis.imagePreviewSrc || target.src,
    pageUrl: target.pageUrl || "#",
    imageWidth: typeof target.naturalWidth === "number" ? target.naturalWidth : void 0,
    imageHeight: typeof target.naturalHeight === "number" ? target.naturalHeight : void 0,
    analysis,
    promptDrafts: {},
  };
  const stored = await chrome.storage.local.get(HISTORY_KEY);
  const history = [record, ...sanitizeHistoryEntries(stored[HISTORY_KEY]).filter((entry) => entry.id !== record.id)].slice(0, 80);
  await chrome.storage.local.set({
    [HISTORY_KEY]: history,
    [SNAPSHOT_KEY]: {
      createdAt: record.createdAt,
      target: {
        src: analysis.imagePreviewSrc || target.src,
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

async function saveUploadedAnalysis(target, analysis) {
  return saveReversePromptAnalysis(target, analysis);
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

async function startAnalysisTask(rawTarget, options = {}) {
  const target = {
    src: rawTarget.src,
    alt: rawTarget.alt || "image",
    pageUrl: rawTarget.pageUrl || "#",
    naturalWidth: rawTarget.naturalWidth,
    naturalHeight: rawTarget.naturalHeight,
  };
  const taskId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = Date.now();
  await upsertTask({
    id: taskId,
    status: "queued",
    source: options.source || "page",
    title: taskTitle(target),
    imageSrc: target.src,
    pageUrl: target.pageUrl,
    progress: 5,
    stepKey: "queued",
    step: "已加入后台任务",
    error: "",
    createdAt,
  });

  (async () => {
    let timeoutId = null;
    try {
      timeoutId = setTimeout(() => {
        upsertTask({
          id: taskId,
          status: "error",
          progress: 100,
          stepKey: "failed",
          step: "反推超时",
          error: "反推任务超过 4 分钟仍未完成，请检查模型服务响应或稍后重试。",
          completedAt: Date.now(),
        });
      }, ANALYSIS_REQUEST_TIMEOUT_MS + IMAGE_FETCH_TIMEOUT_MS + 30000);
      const config = await chrome.storage.local.get(["baseUrl", "apiKey", "model", "reversePerformance"]);
      await upsertTask({ id: taskId, status: "running", progress: 10, stepKey: "prepare", step: "准备分析", error: "" });
      const analysis = await analyze(config, target, (progress) => (
        upsertTask({ id: taskId, status: "running", error: "", ...progress })
      ));
      if (timeoutId !== null) clearTimeout(timeoutId);
      const record = await saveReversePromptAnalysis(target, analysis, taskId);
      const completedTask = await upsertTask({
        id: taskId,
        status: "success",
        progress: 100,
        stepKey: "complete",
        step: "反推完成",
        error: "",
        recordId: record.id,
        imageSrc: record.imageSrc,
        completedAt: Date.now(),
      });
      showTaskCompleteNotification(completedTask, record);
    } catch (error) {
      if (timeoutId !== null) clearTimeout(timeoutId);
      await upsertTask({
        id: taskId,
        status: "error",
        progress: 100,
        stepKey: "failed",
        step: "反推失败",
        error: error instanceof Error ? error.message : "分析失败，请稍后重试。",
        completedAt: Date.now(),
      });
    }
  })();

  return { taskId };
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
        const config = await chrome.storage.local.get(["baseUrl", "apiKey", "model", "reversePerformance"]);
        const target = message.payload?.target;
        if (!target || typeof target.src !== "string") throw new Error("没有拿到可分析的图片。");
        if (message.payload?.background === true) {
          respond({ ok: true, data: await startAnalysisTask(target, { source: "page" }) });
          return;
        }
        respond({ ok: true, data: await analyze(config, target) });
      } catch (error) {
        respond({ ok: false, error: error instanceof Error ? error.message : "分析失败，请稍后重试。" });
      }
    })();
    return true;
  }

  if (message.type === "GET_ANALYSIS_TASK") {
    (async () => {
      try {
        const taskId = message.payload?.taskId;
        const stored = await chrome.storage.local.get(TASKS_KEY);
        const task = sanitizeTasks(stored[TASKS_KEY]).find((item) => item.id === taskId);
        if (!task) throw new Error("没有找到反推任务。");
        const data = { task };
        if (task.status === "success" && task.recordId) {
          const history = sanitizeHistoryEntries((await chrome.storage.local.get(HISTORY_KEY))[HISTORY_KEY]);
          data.record = history.find((entry) => entry.id === task.recordId) || null;
          data.analysis = data.record?.analysis || null;
        }
        respond({ ok: true, data });
      } catch (error) {
        respond({ ok: false, error: error instanceof Error ? error.message : "读取任务失败。" });
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
        const target = message.payload?.target;
        if (!target || typeof target.src !== "string") throw new Error("没有拿到可分析的上传图片。");
        const task = await startAnalysisTask({
          src: target.src,
          alt: target.alt || "uploaded image",
          pageUrl: target.pageUrl || "#",
          naturalWidth: target.naturalWidth,
          naturalHeight: target.naturalHeight,
        }, { source: "upload" });
        respond({ ok: true, data: task });
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
