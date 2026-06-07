# Popup Theme Button and Admin Dot Background Design

## Goal

Update the MX-Insight browser extension theme behavior and background treatment:

1. Add a real theme toggle button in the browser popup header, positioned at the top right.
2. Make the button switch directly between light and dark themes.
3. Save the selected theme so the popup and background management page use the same mode.
4. Apply the `MX-Insight-Web` dot-grid background direction to the background management page only.

## Current Context

The extension is a Manifest V3 browser extension.

Relevant files:

- `popup.js`: renders the browser action popup and currently has no manual theme control.
- `options.js`: renders the background management page and already sets `document.body.dataset.page = "options"`.
- `assets/style-CRiQnvvo.css`: shared CSS for the popup and options page, with light defaults and dark mode currently based on `prefers-color-scheme`.
- `D:\Github\MX-Insight-Web\src\app\globals.css`: reference style includes `.dot-grid-bg` using a 16px radial dot grid.

The existing spec `2026-06-07-record-delete-popup-theme-design.md` explicitly avoided a manual theme toggle. This new design supersedes that non-goal for the popup: the popup must expose a manual theme button.

## Approved Approach

Use a small shared theme state stored in `chrome.storage.local`.

### Theme Palette Revision

The final visual direction is neutral black and white, not a green-accented brand theme.

The `MX-Insight-Web` reference is used for the dot-grid background pattern only. Do not carry over its green or dark navy brand accents into the extension theme.

Theme color direction:

- Light mode: white or near-white background, black primary text, gray borders, black primary actions.
- Dark mode: black or near-black background, white primary text, dark gray surfaces, white primary actions.
- Dot-grid background: gray dots only.
- Success and enabled indicators use neutral black/white styling; destructive/error states may keep restrained red for readability.

### Theme State

Add `themeMode` to the local settings keys used by popup and options.

Supported values:

- `"light"`
- `"dark"`

If no saved value exists, initialize from `window.matchMedia("(prefers-color-scheme: dark)")`. After the user clicks the popup button, the saved value becomes authoritative.

Apply the theme by setting:

```js
document.documentElement.dataset.theme = themeMode;
```

The popup and options page both read `themeMode` during load and respond to `chrome.storage.onChanged` updates so both pages stay consistent.

### Popup Button

Update the popup header layout so the existing logo/title group remains on the left and a compact icon button sits on the right.

Behavior:

- Button is a real `<button type="button">`.
- Button toggles `themeMode` from light to dark or dark to light.
- Button uses an accessible `aria-label` matching the next action.
- Button visual changes with the current theme, using a sun/moon icon treatment.
- The button should not replace or affect the existing extension enabled switch.

### Admin Dot Background

Apply the dot-grid background to the background management page only, not to the browser popup.

Implementation direction:

- Use `body[data-page="options"]` or `.page-shell` as the admin-only target.
- Use `background-color: var(--bg)`.
- Use `background-image: radial-gradient(var(--mx-dot) 1px, transparent 1px)`.
- Use `background-size: 16px 16px`.
- Define `--mx-dot` in light and dark theme variables.

The popup shell should keep its current flat background without the dot grid.

### CSS Theme Resolution

Keep the existing `@media (prefers-color-scheme: dark)` fallback for first-load/system behavior, but add explicit attribute selectors:

```css
:root[data-theme="light"] { ...light variables... }
:root[data-theme="dark"] { ...dark variables... }
```

Explicit `data-theme` variables override the system media query.

## Non-Goals

- Do not add a theme button to the background management page.
- Do not add a three-state system/light/dark cycle.
- Do not add the dot-grid background to the browser popup.
- Do not change task, history, API, upload, or analysis behavior.
- Do not modify the reference `D:\Github\MX-Insight-Web` project.

## Error Handling

If saving `themeMode` fails, keep the current in-memory theme and re-render without blocking other popup controls.

If `themeMode` contains an unsupported value, ignore it and initialize from the system color scheme.

## Testing and Verification

Static verification:

- Confirm `themeMode` is included in both popup and options settings keys.
- Confirm popup click writes `{ themeMode: "light" | "dark" }`.
- Confirm both popup and options set `document.documentElement.dataset.theme`.
- Confirm `chrome.storage.onChanged` updates theme state on both pages.
- Confirm dot-grid CSS is scoped to the options page only.

Manual visual verification:

- Open the popup in light mode and confirm the top-right theme button is visible and clickable.
- Click the button and confirm the popup switches to dark mode.
- Open the background management page and confirm it uses the same saved theme.
- Confirm the background management page shows the dot-grid background in light and dark mode.
- Confirm the popup does not show the dot-grid background.
