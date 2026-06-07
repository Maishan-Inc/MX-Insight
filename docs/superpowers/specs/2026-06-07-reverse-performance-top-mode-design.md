# Reverse Performance Top Mode Design

## Goal

Add a backend setting for reverse prompt performance:

- `standard`: current single-call reverse prompt flow.
- `top`: quality-first multi-call flow for difficult images.

Top mode should improve prompt quality by splitting the work into separate API calls:

1. Identify image type and possible source.
2. Deeply analyze image details using the source analysis.
3. Generate the final reverse prompt from the first two stages.
4. Self-review and rewrite the prompt so important details are not lost.

## Context

The current extension sends one image and one large prompt to the configured vision model. That single call must classify the image, inspect details, produce multiple languages, return JSON, and write final prompts. This is fast, but difficult anime, game, poster, 3D, and AI-generated images can produce shallow prompts.

Relevant files:

- `background.js`: model calls, image normalization, prompt schema, task progress, result parsing.
- `options.js`: backend settings page and storage.
- `popup.js`: upload entry point. It does not need a UI change for this setting.

## Storage

Add a new setting:

```js
reversePerformance: "standard" | "top"
```

Default is `"standard"` for cost and speed compatibility.

## Options UI

Add a `Reverse performance` setting in the backend preferences card.

Options:

- `Standard`: single API call, faster, lower cost.
- `Top`: multi-call source identification, deep detail analysis, prompt generation, and self-review. Higher quality, slower, more API usage.

## Standard Mode

Keep the current `analyze()` behavior:

- Read image.
- Send one prompt to the configured provider.
- Retry once with compact JSON if the result is malformed.

## Top Mode

Top mode reuses the same normalized image payload for all calls.

### Stage 1: Source Identification

Ask the model to identify:

- `image_type`
- `source_guess`
- `source_confidence`
- `source_evidence`
- `uncertain_items`
- `prompt_strategy`

This call should not generate the final prompt.

### Stage 2: Deep Detail Analysis

Send the image again with stage 1 results.

Ask the model to deeply analyze:

- subject and identity category,
- pose and action,
- character/object details,
- foreground/midground/background,
- lighting and atmosphere,
- composition and camera,
- style and medium,
- color system,
- materials and textures,
- likely generation intent,
- details that must appear in the final prompt.

### Stage 3: Prompt Generation

Use the image, stage 1, and stage 2 to generate the normal final schema used by the extension.

The output must remain compatible with existing UI fields:

- `zh`, `zh_hant`, `en`, `ja`
- style tags
- `json_prompt`
- `recreation_prompt`
- `prompt_core`
- `negative_prompt`
- `confidence`

### Stage 4: Self-Review and Rewrite

Ask the model to compare stage 3 against stage 1 and stage 2.

It must:

- find missing important details,
- remove unsupported source guesses from final prompts,
- reduce generic filler,
- improve prompt density,
- return the same final schema.

If stage 4 fails, keep stage 3 as the final result and include refinement failure metadata when possible.

## Task Progress

Top mode should report clearer task steps:

- `identifySource`: identifying image type and possible source.
- `deepAnalyze`: deeply analyzing image details.
- `generatePrompt`: generating reverse prompt.
- `refinePrompt`: self-reviewing and optimizing prompt.
- `complete`: complete.

## Error Handling

- If stage 1 fails, use a conservative fallback source analysis with `image_type: "unknown"`.
- If stage 2 fails, fall back to standard mode.
- If stage 3 fails, return an error.
- If stage 4 fails, return stage 3.

## Non-Goals

- Do not add video or multi-frame analysis.
- Do not require users to choose an image type manually.
- Do not change the upload UI.
- Do not force top mode for all users.
