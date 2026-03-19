# URL → Markdown Converter

A free, zero-API-cost tool that converts any URL to clean Markdown — built as a Claude.ai artifact using `sendPrompt()`.

No API keys. No backend. No charges. Works with any active Claude subscription.

---

## How It Works

1. Open the artifact inside **Claude.ai**
2. Enter a URL (or multiple URLs in batch mode)
3. Click **"Markdown'a Çevir"**
4. Claude responds above with the clean Markdown output

The artifact uses Claude's built-in `sendPrompt()` function, which sends the request through your existing Claude subscription — completely free.

```
User enters URL
      ↓
sendPrompt() fires
      ↓
Claude fetches + converts → outputs Markdown in chat
```

---

## Features

- **Single & Batch mode** — convert one URL or many at once
- **Prompt preview panel** — see and copy the generated prompt
- **Markdown output panel** — paste Claude's response back to view stats
- **Token / character / line stats**
- **Edit mode** — tweak the markdown inline
- **Download as .md** — save the file directly
- **History** — last 20 conversions stored locally
- **Minimal light theme** — paper-white, print-quality design

---

## Usage

### Option A — Use directly in Claude.ai

1. Go to [claude.ai](https://claude.ai)
2. Start a new conversation
3. Create a new Artifact and paste the contents of `MarkdownConverter.jsx`
4. The tool runs instantly in the artifact panel

### Option B — Embed in your own React project

```bash
# No dependencies beyond React
cp MarkdownConverter.jsx your-project/src/components/
```

```jsx
import MarkdownConverter from './components/MarkdownConverter';

export default function App() {
  return <MarkdownConverter />;
}
```

> **Note:** `sendPrompt()` is a Claude.ai-specific function. It only works inside Claude artifacts. If you embed this outside Claude, the convert button will throw an error.

---

## Requirements

- An active **Claude.ai subscription** (Free tier may have limits)
- A modern browser
- No API key, no `.env`, no backend

---

## File Structure

```
markdown-converter/
├── MarkdownConverter.jsx   # The full component (single file)
└── README.md
```

---

## License

MIT — free to use, modify, and share.

---

Made by **Bilal Dalgün**
