# Record Delete, Popup Task Count, and Theme Adaptation Design

## Goal

Implement three focused UI behavior updates for the MX-Insight Chrome extension:

1. When deleting one reverse prompt record, also delete the corresponding task progress item in the upper task progress area.
2. Change the browser popup task progress panel to show the latest 2 tasks instead of the latest 4.
3. Adapt the popup and background management UI to both light and dark color schemes, using the visual direction from `D:\Github\MX-Insight-Web` as reference.

## Current Context

The extension is a Manifest V3 Chrome extension.

Relevant files:

- `options.js`: renders the background management page, including reverse prompt records and the task progress area.
- `popup.js`: renders the browser action popup.
- `assets/style-CRiQnvvo.css`: shared stylesheet used by both `options.html` and `popup.html`.
- `background.js`: creates and updates reverse prompt tasks and saved history records.

The current options page keeps two local arrays:

- `historyEntries`, stored under `HISTORY_KEY` / `historyEntries`.
- `reverseTasks`, stored under `TASKS_KEY` / `reversePromptTasks`.

Task records produced by successful analysis include `recordId`, so a saved record can be matched back to its task progress card.

## Approved Approach

Use the minimal but complete implementation approach.

### Record Deletion Behavior

Update `deleteRecord(id)` in `options.js` so deleting a single history record also removes task progress entries whose `recordId` matches the deleted record id.

Behavior:

- Filter `historyEntries` by `entry.id !== id`.
- Filter `reverseTasks` by `task.recordId !== id`.
- Persist both arrays to `chrome.storage.local` in the same write call.
- Re-render the page.
- If no task matches the deleted record id, do nothing extra and still delete the history record.

This keeps task generation and record storage unchanged while preventing stale task progress cards from remaining above deleted records.

### Popup Task Count

Update `renderTasks()` in `popup.js`.

Behavior:

- Keep the existing `sortTasks(reverseTasks)` ordering.
- Change the visible slice from 4 tasks to 2 tasks.
- Preserve all existing task card UI, labels, progress bars, success/error styling, and empty-state behavior.

### Light and Dark Theme Adaptation

Update `assets/style-CRiQnvvo.css` by introducing shared MX theme variables and applying them to the existing popup and options UI selectors.

The reference direction from `D:\Github\MX-Insight-Web` is:

- restrained editorial/product UI,
- white or near-white light canvas,
- near-black primary text,
- low-saturation borders,
- flat cards with little or no heavy shadow,
- dark mode with near-black canvas and dark green/navy product-panel surfaces,
- rounded cards and pill controls.

Theme variables should cover at least:

- page background,
- primary surface,
- muted surface,
- primary text,
- secondary/muted text,
- borders,
- accent color,
- danger color,
- success/progress color,
- focus ring.

Default variables define light mode. An `@media (prefers-color-scheme: dark)` block overrides those variables for dark mode.

The implementation should adapt existing selectors instead of rewriting the page layout. Priority selectors include:

- page shells and workspaces,
- side rail / sidebar,
- popup shell and popup card,
- panel sections,
- history panes,
- record cards,
- task cards,
- form inputs and selects,
- buttons,
- progress bars,
- toast/message states.

## Non-Goals

- Do not change task creation or analysis logic in `background.js`.
- Do not change the stored schema for records or tasks.
- Do not clear unrelated task progress entries.
- Do not redesign the whole background management layout.
- Do not introduce a manual theme toggle.
- Do not modify the reference `D:\Github\MX-Insight-Web` project.

## Error Handling

No new user-facing errors are required.

If the deleted record has no matching task progress item, deletion remains successful. The task list update is best-effort through normal array filtering and storage persistence.

## Testing and Verification

Static verification:

- Confirm `deleteRecord(id)` writes both `HISTORY_KEY` and `TASKS_KEY`.
- Confirm task deletion is scoped to `task.recordId === id`.
- Confirm `popup.js` renders `slice(0, 2)`.
- Confirm theme variables have light defaults and dark-mode overrides.

Manual visual verification:

- Open the background management page in light mode and confirm readable white/near-white control-panel styling.
- Open it in dark mode and confirm readable dark product-panel styling.
- Open the browser popup in light and dark mode and confirm the task cards, progress bars, buttons, and form controls remain legible.
- Delete a record that has a corresponding task card and confirm the task card disappears while unrelated task cards remain.
