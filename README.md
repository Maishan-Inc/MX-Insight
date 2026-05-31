# MX-Insight

成为此项目的赞助商 / Become a sponsor / このプロジェクトのスポンサーになる  
邮箱 / Email / メール: maishanemail@qq.com

Language: [中文](#中文) | [English](#english) | [日本語](#日本語)

Copyright (c) Maishan Inc.

## 中文

MX-Insight 是一个浏览器扩展，用于分析网页图片并生成多语言的图像反推提示词。

### 功能

- 从浏览器右键菜单或图片悬浮按钮分析图片。
- 生成英文、简体中文、繁体中文、日语和结构化数据提示词。
- 在结果卡片中切换提示词版本。
- 自动跟随系统浅色或深色主题。
- 配置自定义的视觉模型 API 接口。
- 将反推任务和结果保存在本地 `chrome.storage.local`。
- 在扩展后台查看任务进度、错误信息和历史记录。

### 安装

1. 打开 Chrome 或 Chromium 系浏览器。
2. 进入 `chrome://extensions`。
3. 开启 `开发者模式`。
4. 点击 `加载已解压的扩展程序`。
5. 选择本项目文件夹。

安装后，MX-Insight 会打开独立设置页。可选择：

- `使用 SMVAPI 账号登录`：暂不可用。
- `自定义 API`：配置自定义 API。

### 自定义 API

在 MX-Insight 后台配置：

- `Base URL`：OpenAI 兼容接口、Gemini 接口、DashScope 兼容接口或其他支持视觉模型的接口地址。
- `API Key`：你的接口密钥。
- `Model`：支持图片分析的模型名称。

示例：

- `https://api.openai.com/v1`
- `https://generativelanguage.googleapis.com/v1beta`
- `https://dashscope.aliyuncs.com/compatible-mode/v1`

### 使用

1. 在网页图片上右键，或将鼠标悬浮到图片右上角按钮。
2. 选择 `反推提示词` 或 `分析图片提示词`。
3. 等待分析面板完成。
4. 切换需要的提示词语言版本。
5. 复制提示词、打开支持的生成站点，或在后台查看反推记录。

### 隐私

API 密钥、反推任务和历史记录只保存在当前浏览器本地。

图片分析请求只会发送到用户配置的自定义 API 接口。

## English

MX-Insight is a browser extension for analyzing webpage images and generating multilingual reverse image prompts.

### Features

- Analyze images from the browser context menu or the image hover button.
- Generate prompts in English, Simplified Chinese, Traditional Chinese, Japanese, and structured JSON.
- Switch prompt versions inside result cards.
- Follow the system light or dark theme automatically.
- Configure a custom vision-capable API endpoint.
- Store reverse prompt tasks and results locally in `chrome.storage.local`.
- View task progress, errors, and history records from the extension console.

### Installation

1. Open Chrome or a Chromium-based browser.
2. Go to `chrome://extensions`.
3. Enable `Developer mode`.
4. Click `Load unpacked`.
5. Select this project folder.

After installation, MX-Insight opens an independent setup page. The page offers:

- `Log in with an SMVAPI account`: not available yet.
- `Custom API`: opens the custom API configuration dialog.

### Custom API

Open the MX-Insight console and configure:

- `Base URL`: OpenAI-compatible endpoint, Gemini endpoint, DashScope-compatible endpoint, or another supported vision API base URL.
- `API Key`: your API key.
- `Model`: a vision-capable model name.

Examples:

- `https://api.openai.com/v1`
- `https://generativelanguage.googleapis.com/v1beta`
- `https://dashscope.aliyuncs.com/compatible-mode/v1`

### Usage

1. Right-click an image on a webpage, or use the hover button at the image top-right corner.
2. Select `Reverse prompt` or `Analyze image prompt`.
3. Wait for the analysis panel to finish.
4. Switch to the prompt language version you need.
5. Copy the prompt, open a supported generation site, or review reverse prompt records in the console.

### Privacy

API credentials, reverse prompt tasks, and history records are stored locally in the current browser.

Image analysis requests are sent only to the custom API endpoint configured by the user.

## 日本語

MX-Insight は、Web ページ上の画像を解析し、多言語の画像リバースプロンプトを生成するブラウザ拡張機能です。

### 機能

- ブラウザの右クリックメニュー、または画像右上のホバーボタンから画像を解析。
- 英語、簡体字中国語、繁体字中国語、日本語、構造化 JSON のプロンプトを生成。
- 結果カードごとにプロンプトの言語バージョンを切り替え。
- システムのライト / ダークテーマに自動追従。
- 画像解析に対応したカスタム API エンドポイントを設定。
- リバースプロンプトのタスクと結果を `chrome.storage.local` にローカル保存。
- 拡張機能のコンソールで進行状況、エラー、履歴を確認。

### インストール

1. Chrome または Chromium ベースのブラウザを開きます。
2. `chrome://extensions` に移動します。
3. `デベロッパー モード` を有効にします。
4. `パッケージ化されていない拡張機能を読み込む` をクリックします。
5. このプロジェクトフォルダを選択します。

インストール後、MX-Insight は独立した設定ページを開きます。選択肢は次の通りです。

- `SMVAPI アカウントでログイン`：現在は未対応。
- `カスタム API`：カスタム API の設定を開きます。

### カスタム API

MX-Insight のコンソールで以下を設定します。

- `Base URL`：OpenAI 互換エンドポイント、Gemini エンドポイント、DashScope 互換エンドポイント、または対応する画像解析 API のベース URL。
- `API Key`：API キー。
- `Model`：画像解析に対応したモデル名。

例：

- `https://api.openai.com/v1`
- `https://generativelanguage.googleapis.com/v1beta`
- `https://dashscope.aliyuncs.com/compatible-mode/v1`

### 使い方

1. Web ページ上の画像を右クリックするか、画像右上のホバーボタンを使用します。
2. `リバースプロンプト` または `画像プロンプトを解析` を選択します。
3. 解析パネルが完了するまで待ちます。
4. 必要なプロンプト言語バージョンに切り替えます。
5. プロンプトをコピーする、対応する生成サイトを開く、またはコンソールで履歴を確認します。

### プライバシー

API 認証情報、リバースプロンプトタスク、履歴は現在のブラウザ内にローカル保存されます。

画像解析リクエストは、ユーザーが設定したカスタム API エンドポイントにのみ送信されます。

## Project Files

- `manifest.json`: extension manifest.
- `background.js`: service worker, context menu, API calls, notifications, and install flow.
- `content.js`: webpage image detection, hover actions, and analysis panel.
- `options.html` / `options.js`: setup page and console.
- `popup.html` / `popup.js`: extension popup.
- `assets/style-CRiQnvvo.css`: shared extension page styles.
- `icons/`: extension icons and logo.
