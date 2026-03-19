import React, { useState, useEffect } from 'react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f7f5f0;
    --paper: #fdfcfa;
    --ink: #111111;
    --ink2: #444444;
    --ink3: #888888;
    --rule: #dddad4;
    --rule2: #e8e5df;
    --mono: 'DM Mono', monospace;
    --sans: 'DM Sans', sans-serif;
  }

  .mc-root {
    background: var(--bg);
    min-height: 100vh;
    font-family: var(--sans);
    color: var(--ink);
    padding: 3rem 2rem;
  }

  .mc-inner {
    max-width: 720px;
    margin: 0 auto;
  }

  /* Header */
  .mc-header {
    margin-bottom: 3.5rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--ink);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .mc-eyebrow {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink3);
    margin-bottom: 0.6rem;
  }
  .mc-title {
    font-size: clamp(30px, 5vw, 48px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--ink);
  }
  .mc-title em {
    font-style: normal;
    font-weight: 300;
  }
  .mc-badge {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink3);
    border: 1px solid var(--rule);
    padding: 5px 10px;
    letter-spacing: 0.08em;
    white-space: nowrap;
    background: var(--paper);
  }

  /* Section */
  .mc-section {
    margin-bottom: 2.5rem;
  }
  .mc-label {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink3);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .mc-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--rule);
  }

  /* Toggle */
  .mc-toggle-row {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    margin-bottom: 1rem;
    width: fit-content;
  }
  .mc-toggle-text {
    font-size: 13px;
    color: var(--ink2);
  }
  .mc-switch {
    width: 34px; height: 18px;
    border: 1.5px solid var(--ink3);
    border-radius: 9px;
    position: relative;
    transition: all 0.2s;
    background: transparent;
  }
  .mc-switch.on {
    border-color: var(--ink);
    background: var(--ink);
  }
  .mc-switch::after {
    content: '';
    position: absolute;
    top: 2px; left: 2px;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--ink3);
    transition: all 0.2s;
  }
  .mc-switch.on::after {
    left: 18px;
    background: var(--paper);
  }

  /* Inputs */
  .mc-input, .mc-textarea {
    width: 100%;
    background: var(--paper);
    border: 1.5px solid var(--rule);
    color: var(--ink);
    font-family: var(--mono);
    font-size: 13px;
    padding: 13px 15px;
    outline: none;
    transition: border-color 0.15s;
    resize: none;
    border-radius: 2px;
  }
  .mc-input::placeholder, .mc-textarea::placeholder {
    color: var(--ink3);
  }
  .mc-input:focus, .mc-textarea:focus {
    border-color: var(--ink);
  }
  .mc-textarea { height: 108px; line-height: 1.8; }

  /* Buttons */
  .mc-btn-row {
    display: flex; gap: 10px; margin-top: 1rem; flex-wrap: wrap;
  }
  .mc-btn {
    font-family: var(--sans);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.01em;
    padding: 11px 20px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.15s;
    border: 1.5px solid transparent;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .mc-btn-primary {
    background: #111;
    color: #fff;
    border-color: #111;
  }
  .mc-btn-primary:hover {
    background: #333;
    border-color: #333;
    box-shadow: 0 3px 12px rgba(0,0,0,0.15);
  }
  .mc-btn-outline {
    background: #fff;
    color: #111;
    border-color: #999;
  }
  .mc-btn-outline:hover {
    border-color: #111;
    background: #f5f5f5;
  }
  .mc-btn-sm {
    font-size: 12px;
    padding: 7px 14px;
  }
  .mc-btn-danger {
    background: transparent;
    color: #c0392b;
    border-color: #e8bcb9;
  }
  .mc-btn-danger:hover {
    border-color: #c0392b;
  }

  /* Status */
  .mc-status {
    padding: 11px 14px;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.03em;
    margin-bottom: 2rem;
    border-radius: 2px;
    display: flex;
    gap: 10px;
    align-items: flex-start;
    animation: fadeUp 0.25s ease;
  }
  .mc-status.ok  { background: #f0faf0; border: 1px solid #b8e0b8; color: #2d6a2d; }
  .mc-status.err { background: #fdf0f0; border: 1px solid #e0b8b8; color: #7a2d2d; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Prompt panel */
  .mc-panel {
    background: var(--paper);
    border: 1.5px solid var(--rule);
    border-radius: 2px;
    margin-bottom: 2rem;
    overflow: hidden;
    animation: fadeUp 0.25s ease;
  }
  .mc-panel-head {
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid var(--rule2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg);
  }
  .mc-panel-label {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink3);
  }
  .mc-panel-body {
    padding: 1.25rem;
    font-family: var(--mono);
    font-size: 12px;
    line-height: 1.8;
    color: var(--ink2);
    max-height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
  .mc-panel-foot {
    padding: 0.75rem 1.25rem;
    border-top: 1px solid var(--rule2);
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--bg);
    flex-wrap: wrap;
  }
  .mc-panel-hint {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink3);
    letter-spacing: 0.03em;
  }

  /* Output panel */
  .mc-output-head {
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid var(--rule2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    background: var(--bg);
  }
  .mc-stats {
    display: flex;
    gap: 16px;
  }
  .mc-stat {
    text-align: right;
  }
  .mc-stat-val {
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 500;
    color: var(--ink);
    display: block;
  }
  .mc-stat-lbl {
    font-family: var(--mono);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink3);
  }
  .mc-output-actions {
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid var(--rule2);
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    background: var(--bg);
  }
  .mc-output-body {
    padding: 1.25rem;
    font-family: var(--mono);
    font-size: 12px;
    line-height: 1.8;
    color: var(--ink);
    max-height: 400px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
  .mc-output-edit {
    width: 100%;
    background: var(--paper);
    border: none;
    outline: none;
    resize: none;
    font-family: var(--mono);
    font-size: 12px;
    line-height: 1.8;
    color: var(--ink);
    padding: 1.25rem;
    height: 400px;
  }

  /* History */
  .mc-history-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1px;
    background: var(--rule);
    border: 1.5px solid var(--rule);
    border-radius: 2px;
    overflow: hidden;
  }
  .mc-history-item {
    background: var(--paper);
    padding: 1rem;
    cursor: pointer;
    transition: background 0.12s;
    position: relative;
  }
  .mc-history-item:hover { background: var(--bg); }
  .mc-history-item:hover .mc-h-arrow { opacity: 1; }
  .mc-h-arrow {
    position: absolute; top: 1rem; right: 1rem;
    font-size: 14px; color: var(--ink3);
    opacity: 0; transition: opacity 0.15s;
  }
  .mc-h-title {
    font-size: 12px; font-weight: 600;
    color: var(--ink);
    margin-bottom: 4px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    padding-right: 18px;
  }
  .mc-h-time {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink3);
  }
  .mc-history-clear-btn {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink3);
    background: none;
    border: 1px solid var(--rule);
    padding: 3px 9px;
    cursor: pointer;
    border-radius: 2px;
    margin-left: auto;
    transition: all 0.12s;
  }
  .mc-history-clear-btn:hover { color: #c0392b; border-color: #e0b8b8; }

  /* Footer */
  .mc-footer {
    margin-top: 4rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .mc-footer-text {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink3);
    letter-spacing: 0.04em;
  }
  .mc-footer-tag {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink3);
    border: 1px solid var(--rule);
    padding: 3px 9px;
    border-radius: 2px;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--rule); }
`;

export default function MarkdownConverter() {
  const [batchMode, setBatchMode] = useState(false);
  const [urls, setUrls] = useState('');
  const [singleUrl, setSingleUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [markdown, setMarkdown] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [mdCopied, setMdCopied] = useState(false);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteInput, setPasteInput] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('markdown-history');
      if (saved) setHistory(JSON.parse(saved));
    } catch (_) {}
  }, []);

  const saveToHistory = (url, title, md) => {
    const item = {
      id: Date.now(), url, title, markdown: md,
      timestamp: new Date().toLocaleString('tr-TR', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
      })
    };
    const updated = [item, ...history].slice(0, 20);
    setHistory(updated);
    try { localStorage.setItem('markdown-history', JSON.stringify(updated)); } catch (_) {}
  };

  const buildPrompt = (urlList) => {
    if (urlList.length === 1) {
      return `Convert ${urlList[0]} to markdown`;
    }
    return `Convert these URLs to markdown:\n${urlList.map((u, i) => `${i + 1}. ${u}`).join('\n')}`;
  };

  const handleConvert = () => {
    setStatus(null);
    const urlList = batchMode
      ? urls.split('\n').map(u => u.trim()).filter(Boolean)
      : [singleUrl.trim()];

    if (!urlList.length || !urlList[0]) {
      setStatus({ type: 'err', msg: 'En az bir geçerli URL girin.' });
      return;
    }

    const prompt = buildPrompt(urlList);
    setGeneratedPrompt(prompt);
    setCurrentTitle(urlList.length === 1 ? urlList[0] : `${urlList.length} URLs`);

    try {
      sendPrompt(prompt);
      setStatus({ type: 'ok', msg: "Claude'a gönderildi ↑ — yanıt yukarıda görünecek." });
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const handleMarkdownInput = () => {
    setPasteMode(p => !p);
    setPasteInput('');
  };

  const handlePasteSubmit = () => {
    if (pasteInput.trim()) {
      setMarkdown(pasteInput.trim());
      saveToHistory(singleUrl || 'batch', currentTitle || 'Untitled', pasteInput.trim());
      setStatus({ type: 'ok', msg: 'Markdown yüklendi.' });
      setPasteMode(false);
      setPasteInput('');
    }
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setMdCopied(true);
      setTimeout(() => setMdCopied(false), 2000);
    } catch (_) {}
  };

  const downloadMarkdown = () => {
    const name = (currentTitle || 'converted').replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const a = document.createElement('a');
    a.href = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(markdown);
    a.download = `${name}.md`;
    a.click();
  };

  const clearHistory = () => {
    setHistory([]);
    try { localStorage.removeItem('markdown-history'); } catch (_) {}
  };

  const mdStats = markdown ? {
    tokens: Math.ceil(markdown.length / 4).toLocaleString(),
    chars: markdown.length.toLocaleString(),
    lines: markdown.split('\n').length.toLocaleString(),
  } : null;

  return (
    <>
      <style>{STYLES}</style>
      <div className="mc-root">
        <div className="mc-inner">

          {/* Header */}
          <div className="mc-header">
            <div>
              <div className="mc-eyebrow">Web to Markdown</div>
              <h1 className="mc-title">URL <em>→</em> .md</h1>
            </div>
            <div className="mc-badge">FREE · No API Cost</div>
          </div>

          {/* Input */}
          <div className="mc-section">
            <div className="mc-label">Input</div>

            <div
              className="mc-toggle-row"
              onClick={() => setBatchMode(b => !b)}
            >
              <div className={`mc-switch ${batchMode ? 'on' : ''}`} />
              <span className="mc-toggle-text">
                {batchMode ? 'Çoklu URL modu' : 'Tek URL modu'}
              </span>
            </div>

            {!batchMode ? (
              <input
                className="mc-input"
                type="url"
                placeholder="https://example.com/article"
                value={singleUrl}
                onChange={e => setSingleUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleConvert()}
              />
            ) : (
              <textarea
                className="mc-textarea"
                placeholder={"https://example.com\nhttps://github.com/user/repo\nhttps://docs.site.com/page\n..."}
                value={urls}
                onChange={e => setUrls(e.target.value)}
              />
            )}

            <div className="mc-btn-row">
              <button className="mc-btn mc-btn-primary" onClick={handleConvert}>
                Markdown'a Çevir
              </button>
              <button className="mc-btn mc-btn-outline" onClick={handleMarkdownInput}>
                {pasteMode ? 'İptal' : 'Markdown Yapıştır'}
              </button>
            </div>

            {pasteMode && (
              <div style={{ marginTop: '1rem' }}>
                <textarea
                  className="mc-textarea"
                  style={{ height: '140px', marginBottom: '0.75rem' }}
                  placeholder="Claude'ın markdown çıktısını buraya yapıştırın..."
                  value={pasteInput}
                  onChange={e => setPasteInput(e.target.value)}
                  autoFocus
                />
                <button
                  className="mc-btn mc-btn-primary"
                  onClick={handlePasteSubmit}
                  disabled={!pasteInput.trim()}
                >
                  Kaydet
                </button>
              </div>
            )}
          </div>

          {/* Status */}
          {status && (
            <div className={`mc-status ${status.type}`}>
              <span>{status.type === 'ok' ? '✓' : '✕'}</span>
              <span>{status.msg}</span>
            </div>
          )}

          {/* Prompt Panel */}
          {generatedPrompt && (
            <div className="mc-panel">
              <div className="mc-panel-head">
                <span className="mc-panel-label">Oluşturulan Prompt</span>
              </div>
              <div className="mc-panel-body">{generatedPrompt}</div>
              <div className="mc-panel-foot">
                <button className="mc-btn mc-btn-outline mc-btn-sm" onClick={copyPrompt}>
                  {copied ? '✓ Kopyalandı' : 'Tekrar Kopyala'}
                </button>
                <span className="mc-panel-hint">
                  Otomatik gönderildi — tekrar kullanmak için kopyalayın
                </span>
              </div>
            </div>
          )}

          {/* Markdown Output */}
          {markdown && (
            <div className="mc-section">
              <div className="mc-label">Markdown Çıktısı</div>
              <div className="mc-panel" style={{ marginBottom: 0 }}>
                <div className="mc-output-head">
                  <span className="mc-panel-label">Output</span>
                  {mdStats && (
                    <div className="mc-stats">
                      <div className="mc-stat">
                        <span className="mc-stat-val">{mdStats.tokens}</span>
                        <span className="mc-stat-lbl">Tokens</span>
                      </div>
                      <div className="mc-stat">
                        <span className="mc-stat-val">{mdStats.chars}</span>
                        <span className="mc-stat-lbl">Chars</span>
                      </div>
                      <div className="mc-stat">
                        <span className="mc-stat-val">{mdStats.lines}</span>
                        <span className="mc-stat-lbl">Lines</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mc-output-actions">
                  <button className="mc-btn mc-btn-outline mc-btn-sm" onClick={copyMarkdown}>
                    {mdCopied ? '✓ Kopyalandı' : 'Kopyala'}
                  </button>
                  <button className="mc-btn mc-btn-outline mc-btn-sm" onClick={downloadMarkdown}>
                    İndir .md
                  </button>
                  <button className="mc-btn mc-btn-outline mc-btn-sm" onClick={() => setEditMode(e => !e)}>
                    {editMode ? 'Görüntüle' : 'Düzenle'}
                  </button>
                  <button
                    className="mc-btn mc-btn-danger mc-btn-sm"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => { setMarkdown(''); setEditMode(false); }}
                  >
                    Temizle
                  </button>
                </div>
                {editMode ? (
                  <textarea
                    className="mc-output-edit"
                    value={markdown}
                    onChange={e => setMarkdown(e.target.value)}
                  />
                ) : (
                  <div className="mc-output-body">{markdown}</div>
                )}
              </div>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="mc-section">
              <div className="mc-label">
                <span>Geçmiş</span>
                <button className="mc-history-clear-btn" onClick={clearHistory}>Temizle</button>
              </div>
              <div className="mc-history-grid">
                {history.map(item => (
                  <div
                    key={item.id}
                    className="mc-history-item"
                    onClick={() => { setMarkdown(item.markdown || ''); setCurrentTitle(item.title); }}
                    title={item.url}
                  >
                    <span className="mc-h-arrow">↗</span>
                    <div className="mc-h-title">{item.title}</div>
                    <div className="mc-h-time">{item.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mc-footer">
            <div className="mc-footer-text">
              Claude subscription kullanır · API ücreti yok · Made by <strong>Bilal Dalgün</strong>
            </div>
            <span className="mc-footer-tag">v1</span>
          </div>

        </div>
      </div>
    </>
  );
}
