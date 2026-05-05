# MX-Insight

MX-Insight is a browser extension for analyzing image elements and generating multilingual image prompt descriptions.

Copyright © Maishan Inc.

## Features

- Analyze image elements from the browser right-click menu.
- Generate prompt output in English, Simplified Chinese, Traditional Chinese, and Japanese.
- Switch interface language from a dropdown menu.
- Follow the system light or dark theme automatically.
- Configure a custom vision-capable API endpoint.
- Save analysis history locally in `chrome.storage.local`.
- View and delete local history records from the extension console.

## Installation

1. Open Chrome or a Chromium-based browser.
2. Go to `chrome://extensions`.
3. Enable `Developer mode`.
4. Click `Load unpacked`.
5. Select this project folder.

After installation, MX-Insight opens an independent setup page. The page shows the connection choices:

- `Log in with an SMVAPI account`: not available yet.
- `Custom API`: opens the custom API configuration dialog.

After the custom API is tested or saved successfully, the page enters the main console.

## Custom API

Open the MX-Insight console and configure:

- `Base URL`: OpenAI-compatible endpoint, Gemini endpoint, DashScope compatible endpoint, or another supported vision API base URL.
- `API Key`: your API key.
- `Model`: a vision-capable model name.

Examples:

- `https://api.openai.com/v1`
- `https://generativelanguage.googleapis.com/v1beta`
- `https://dashscope.aliyuncs.com/compatible-mode/v1`

The extension detects Gemini-style URLs and OpenAI-compatible URLs automatically.

## Usage

1. Right-click an image on a webpage.
2. Select `分析图片提示词`.
3. Wait for the analysis panel to finish.
4. Choose the output language from the dropdown.
5. Copy the prompt, open a supported generation site, or save the result to local history.

The extension can also show quick hover actions on supported image elements when the plugin switch is enabled.

## Console

The console contains:

- `Local saved records`: local history records.
- `System settings`: language selection and plugin enable/disable switch.
- `Custom API`: edit and test API settings.
- `SMVAPI account login`: reserved and currently disabled.

## Logo

The source logo can be placed at:

```text
icons/logo.png
```

The extension icon files are:

```text
icons/icon-16.png
icons/icon-32.png
icons/icon-48.png
icons/icon-128.png
```

If `icons/logo.png` is replaced, regenerate these icon files before packaging.

## Privacy

API credentials and history records are stored locally in the current browser with `chrome.storage.local`.

Image analysis requests are sent only to the custom API endpoint configured by the user.

## Project Files

- `manifest.json`: extension manifest.
- `background.js`: service worker, context menu, API calls, and install flow.
- `content.js`: webpage image detection, analysis panel, and local history behavior.
- `options.html` / `options.js`: setup page and console.
- `popup.html` / `popup.js`: extension popup.
- `assets/style-CRiQnvvo.css`: shared extension page styles.
- `icons/`: extension icons and logo.
