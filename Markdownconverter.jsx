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

  .mc-root { background: var(--bg); min-height: 100vh; font-family: var(--sans); color: var(--ink); padding: 3rem 2rem; }
  .mc-inner { max-width: 720px; margin: 0 auto; }

  .mc-header { margin-bottom: 3.5rem; padding-bottom: 2rem; border-bottom: 2px solid var(--ink); display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  .mc-eyebrow { font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink3); margin-bottom: 0.6rem; }
  .mc-title { font-size: clamp(30px, 5vw, 48px); font-weight: 700; line-height: 1; letter-spacing: -0.03em; }
  .mc-title em { font-style: normal; font-weight: 300; }
  .mc-badge { font-family: var(--mono); font-size: 10px; color: var(--ink3); border: 1px solid var(--rule); padding: 5px 10px; letter-spacing: 0.08em; white-space: nowrap; background: var(--paper); }

  .mc-section { margin-bottom: 2.5rem; }
  .mc-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink3); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.75rem; }
  .mc-label::after { content: ''; flex: 1; height: 1px; background: var(--rule); }

  /* Mode tabs */
  .mc-tabs { display: flex; gap: 0; margin-bottom: 1rem; border: 1.5px solid var(--rule); border-radius: 3px; overflow: hidden; }
  .mc-tab { flex: 1; padding: 9px 14px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; background: var(--paper); color: var(--ink3); border: none; cursor: pointer; transition: all 0.15s; border-right: 1px solid var(--rule); }
  .mc-tab:last-child { border-right: none; }
  .mc-tab.active { background: var(--ink); color: #fff; }
  .mc-tab:hover:not(.active) { background: var(--bg); color: var(--ink); }

  .mc-input, .mc-textarea { width: 100%; background: var(--paper); border: 1.5px solid var(--rule); color: var(--ink); font-family: var(--mono); font-size: 13px; padding: 13px 15px; outline: none; transition: border-color 0.15s; resize: none; border-radius: 2px; }
  .mc-input::placeholder, .mc-textarea::placeholder { color: var(--ink3); }
  .mc-input:focus, .mc-textarea:focus { border-color: var(--ink); }
  .mc-textarea { height: 108px; line-height: 1.8; }

  .mc-sitemap-row { display: flex; gap: 8px; }
  .mc-sitemap-row .mc-input { flex: 1; }

  /* URL checklist */
  .mc-url-list { background: var(--paper); border: 1.5px solid var(--rule); border-radius: 2px; margin-top: 1rem; max-height: 260px; overflow-y: auto; }
  .mc-url-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--rule2); cursor: pointer; transition: background 0.1s; }
  .mc-url-item:last-child { border-bottom: none; }
  .mc-url-item:hover { background: var(--bg); }
  .mc-url-check { width: 14px; height: 14px; border: 1.5px solid var(--ink3); border-radius: 2px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.1s; }
  .mc-url-check.checked { background: var(--ink); border-color: var(--ink); }
  .mc-url-check.checked::after { content: '✓'; color: #fff; font-size: 9px; }
  .mc-url-text { font-family: var(--mono); font-size: 11px; color: var(--ink2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
  .mc-url-list-footer { padding: 8px 14px; background: var(--bg); border-top: 1px solid var(--rule); display: flex; align-items: center; justify-content: space-between; }
  .mc-url-count { font-family: var(--mono); font-size: 10px; color: var(--ink3); }

  .mc-btn-row { display: flex; gap: 10px; margin-top: 1rem; flex-wrap: wrap; }
  .mc-btn { font-family: var(--sans); font-size: 13px; font-weight: 600; letter-spacing: 0.01em; padding: 11px 20px; border-radius: 2px; cursor: pointer; transition: all 0.15s; border: 1.5px solid transparent; display: flex; align-items: center; gap: 7px; }
  .mc-btn-primary { background: #111; color: #fff; border-color: #111; }
  .mc-btn-primary:hover:not(:disabled) { background: #333; border-color: #333; box-shadow: 0 3px 12px rgba(0,0,0,0.15); }
  .mc-btn-primary:disabled { background: #ccc; border-color: #ccc; cursor: not-allowed; }
  .mc-btn-outline { background: #fff; color: #111; border-color: #999; }
  .mc-btn-outline:hover { border-color: #111; background: #f5f5f5; }
  .mc-btn-sm { font-size: 12px; padding: 7px 14px; }
  .mc-btn-danger { background: transparent; color: #c0392b; border-color: #e8bcb9; }
  .mc-btn-danger:hover { border-color: #c0392b; }

  .mc-status { padding: 11px 14px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.03em; margin-bottom: 2rem; border-radius: 2px; display: flex; gap: 10px; align-items: flex-start; animation: fadeUp 0.25s ease; }
  .mc-status.ok  { background: #f0faf0; border: 1px solid #b8e0b8; color: #2d6a2d; }
  .mc-status.err { background: #fdf0f0; border: 1px solid #e0b8b8; color: #7a2d2d; }
  .mc-status.info { background: #f0f4fa; border: 1px solid #b8cce0; color: #1a3a6a; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

  .mc-panel { background: var(--paper); border: 1.5px solid var(--rule); border-radius: 2px; margin-bottom: 2rem; overflow: hidden; animation: fadeUp 0.25s ease; }
  .mc-panel-head { padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--rule2); display: flex; align-items: center; justify-content: space-between; background: var(--bg); }
  .mc-panel-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink3); }
  .mc-panel-body { padding: 1.25rem; font-family: var(--mono); font-size: 12px; line-height: 1.8; color: var(--ink2); max-height: 200px; overflow-y: auto; white-space: pre-wrap; word-break: break-word; }
  .mc-panel-foot { padding: 0.75rem 1.25rem; border-top: 1px solid var(--rule2); display: flex; align-items: center; gap: 12px; background: var(--bg); flex-wrap: wrap; }
  .mc-panel-hint { font-family: var(--mono); font-size: 10px; color: var(--ink3); letter-spacing: 0.03em; }

  .mc-output-head { padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--rule2); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; background: var(--bg); }
  .mc-stats { display: flex; gap: 16px; }
  .mc-stat { text-align: right; }
  .mc-stat-val { font-family: var(--mono); font-size: 13px; font-weight: 500; color: var(--ink); display: block; }
  .mc-stat-lbl { font-family: var(--mono); font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink3); }
  .mc-output-actions { padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--rule2); display: flex; gap: 8px; flex-wrap: wrap; align-items: center; background: var(--bg); }
  .mc-output-body { padding: 1.25rem; font-family: var(--mono); font-size: 12px; line-height: 1.8; color: var(--ink); max-height: 400px; overflow-y: auto; white-space: pre-wrap; word-break: break-word; }
  .mc-output-edit { width: 100%; background: var(--paper); border: none; outline: none; resize: none; font-family: var(--mono); font-size: 12px; line-height: 1.8; color: var(--ink); padding: 1.25rem; height: 400px; }

  .mc-history-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1px; background: var(--rule); border: 1.5px solid var(--rule); border-radius: 2px; overflow: hidden; }
  .mc-history-item { background: var(--paper); padding: 1rem; cursor: pointer; transition: background 0.12s; position: relative; }
  .mc-history-item:hover { background: var(--bg); }
  .mc-history-item:hover .mc-h-arrow { opacity: 1; }
  .mc-h-arrow { position: absolute; top: 1rem; right: 1rem; font-size: 14px; color: var(--ink3); opacity: 0; transition: opacity 0.15s; }
  .mc-h-title { font-size: 12px; font-weight: 600; color: var(--ink); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 18px; }
  .mc-h-time { font-family: var(--mono); font-size: 10px; color: var(--ink3); }
  .mc-history-clear-btn { font-family: var(--mono); font-size: 10px; color: var(--ink3); background: none; border: 1px solid var(--rule); padding: 3px 9px; cursor: pointer; border-radius: 2px; transition: all 0.12s; }
  .mc-history-clear-btn:hover { color: #c0392b; border-color: #e0b8b8; }

  .mc-footer { margin-top: 4rem; padding-top: 1.5rem; border-top: 1px solid var(--rule); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
  .mc-footer-text { font-family: var(--mono); font-size: 10px; color: var(--ink3); letter-spacing: 0.04em; }
  .mc-footer-tag { font-family: var(--mono); font-size: 10px; color: var(--ink3); border: 1px solid var(--rule); padding: 3px 9px; border-radius: 2px; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--rule); }
`;

// Modes: 'single' | 'manual' | 'sitemap'
export default function MarkdownConverter() {
  const [mode, setMode] = useState('single');
  const [singleUrl, setSingleUrl] = useState('');
  const [manualUrls, setManualUrls] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [sitemapLoading, setSitemapLoading] = useState(false);
  const [sitemapUrls, setSitemapUrls] = useState([]); // [{url, selected}]
  const [history, setHistory] = useState([]);
  const [markdown, setMarkdown] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [mdCopied, setMdCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('markdown-history');
      if (saved) setHistory(JSON.parse(saved));
    } catch (_) {}
  }, []);

  const saveToHistory = (url, title, md) => {
    const item = {
      id: Date.now(), url, title, markdown: md,
      timestamp: new Date().toLocaleString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    };
    const updated = [item, ...history].slice(0, 20);
    setHistory(updated);
    try { localStorage.setItem('markdown-history', JSON.stringify(updated)); } catch (_) {}
  };

  // Fetch sitemap and extract URLs
  const fetchSitemap = async () => {
    if (!sitemapUrl.trim()) return;
    setSitemapLoading(true);
    setStatus(null);
    setSitemapUrls([]);
    try {
      const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(sitemapUrl.trim())}`;
      const res = await fetch(proxy);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const xml = await res.text();
      const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/gi)].map(m => m[1].trim());
      if (!matches.length) throw new Error('Sitemap\'te URL bulunamadı');
      setSitemapUrls(matches.map(url => ({ url, selected: true })));
      setStatus({ type: 'ok', msg: `${matches.length} URL bulundu — göndermek istediklerinizi seçin.` });
    } catch (err) {
      setStatus({ type: 'err', msg: `Sitemap çekilemedi: ${err.message}` });
    }
    setSitemapLoading(false);
  };

  const toggleUrl = (i) => {
    setSitemapUrls(prev => prev.map((item, idx) => idx === i ? { ...item, selected: !item.selected } : item));
  };

  const toggleAll = () => {
    const allSelected = sitemapUrls.every(u => u.selected);
    setSitemapUrls(prev => prev.map(item => ({ ...item, selected: !allSelected })));
  };

  const buildPrompt = (urlList) => {
    if (urlList.length === 1) {
      return `Please fetch the content at the following URL and convert it to clean, well-structured Markdown. Preserve headings, lists, code blocks. Return ONLY the Markdown.\n\nURL: ${urlList[0]}`;
    }
    return `Please fetch and convert each of these URLs to clean Markdown. For each URL, use the URL as a heading, then the content below. Separate each with ---.\n\nURLs:\n${urlList.map((u, i) => `${i + 1}. ${u}`).join('\n')}`;
  };

  const getUrlList = () => {
    if (mode === 'single') return [singleUrl.trim()].filter(Boolean);
    if (mode === 'manual') return manualUrls.split('\n').map(u => u.trim()).filter(Boolean);
    if (mode === 'sitemap') return sitemapUrls.filter(u => u.selected).map(u => u.url);
    return [];
  };

  const handleConvert = () => {
    setStatus(null);
    const urlList = getUrlList();
    if (!urlList.length) {
      setStatus({ type: 'err', msg: 'En az bir URL gerekli.' });
      return;
    }
    const prompt = buildPrompt(urlList);
    setGeneratedPrompt(prompt);
    setCurrentTitle(urlList.length === 1 ? urlList[0] : `${urlList.length} sayfa`);
    try {
      sendPrompt(prompt);
      setStatus({ type: 'ok', msg: `${urlList.length} URL Claude'a gönderildi ↑` });
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const copyText = (text, setCopiedFn) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedFn(true);
      setTimeout(() => setCopiedFn(false), 2000);
    } catch (_) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedFn(true);
        setTimeout(() => setCopiedFn(false), 2000);
      }).catch(() => {});
    }
  };

  const downloadMarkdown = () => {
    const name = (currentTitle || 'converted').replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const a = document.createElement('a');
    a.href = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(markdown);
    a.download = `${name}.md`;
    a.click();
  };

  const downloadAllHistory = () => {
    if (!history.length) return;
    const combined = history
      .filter(item => item.markdown)
      .map(item => `# ${item.title}\n> ${item.url}\n\n${item.markdown}`)
      .join('\n\n---\n\n');
    const a = document.createElement('a');
    a.href = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(combined);
    a.download = 'tum-sayfalar.md';
    a.click();
  };

  const clearHistory = () => {
    setHistory([]);
    try { localStorage.removeItem('markdown-history'); } catch (_) {}
  };

  const selectedCount = sitemapUrls.filter(u => u.selected).length;

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

            {/* Mode tabs */}
            <div className="mc-tabs">
              <button className={`mc-tab ${mode === 'single' ? 'active' : ''}`} onClick={() => setMode('single')}>Tek URL</button>
              <button className={`mc-tab ${mode === 'manual' ? 'active' : ''}`} onClick={() => setMode('manual')}>Manuel Liste</button>
              <button className={`mc-tab ${mode === 'sitemap' ? 'active' : ''}`} onClick={() => setMode('sitemap')}>Sitemap</button>
            </div>

            {/* Single */}
            {mode === 'single' && (
              <input
                className="mc-input"
                type="url"
                placeholder="https://example.com/article"
                value={singleUrl}
                onChange={e => setSingleUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleConvert()}
              />
            )}

            {/* Manual */}
            {mode === 'manual' && (
              <textarea
                className="mc-textarea"
                placeholder={"https://example.com/page-1\nhttps://example.com/page-2\nhttps://example.com/page-3"}
                value={manualUrls}
                onChange={e => setManualUrls(e.target.value)}
              />
            )}

            {/* Sitemap */}
            {mode === 'sitemap' && (
              <div>
                <div className="mc-sitemap-row">
                  <input
                    className="mc-input"
                    type="url"
                    placeholder="https://example.com/sitemap.xml"
                    value={sitemapUrl}
                    onChange={e => setSitemapUrl(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && fetchSitemap()}
                  />
                  <button
                    className="mc-btn mc-btn-outline"
                    onClick={fetchSitemap}
                    disabled={sitemapLoading}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {sitemapLoading ? 'Yükleniyor…' : 'Çek'}
                  </button>
                </div>

                {sitemapUrls.length > 0 && (
                  <div className="mc-url-list">
                    {sitemapUrls.map((item, i) => (
                      <div key={i} className="mc-url-item" onClick={() => toggleUrl(i)}>
                        <div className={`mc-url-check ${item.selected ? 'checked' : ''}`} />
                        <span className="mc-url-text">{item.url}</span>
                      </div>
                    ))}
                    <div className="mc-url-list-footer">
                      <span className="mc-url-count">{selectedCount} / {sitemapUrls.length} seçili</span>
                      <button className="mc-history-clear-btn" onClick={toggleAll}>
                        {sitemapUrls.every(u => u.selected) ? 'Tümünü Kaldır' : 'Tümünü Seç'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mc-btn-row">
              <button
                className="mc-btn mc-btn-primary"
                onClick={handleConvert}
                disabled={mode === 'sitemap' && selectedCount === 0}
              >
                Markdown'a Çevir
                {mode === 'sitemap' && selectedCount > 0 && ` (${selectedCount})`}
              </button>
            </div>
          </div>

          {/* Status */}
          {status && (
            <div className={`mc-status ${status.type}`}>
              <span>{status.type === 'ok' ? '✓' : status.type === 'info' ? 'ℹ' : '✕'}</span>
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
                <button className="mc-btn mc-btn-outline mc-btn-sm" onClick={() => copyText(generatedPrompt, setCopied)}>
                  {copied ? '✓ Kopyalandı' : 'Tekrar Kopyala'}
                </button>
                <span className="mc-panel-hint">Otomatik gönderildi — tekrar kullanmak için kopyalayın</span>
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
                  <button className="mc-btn mc-btn-outline mc-btn-sm" onClick={() => copyText(markdown, setMdCopied)}>
                    {mdCopied ? '✓ Kopyalandı' : 'Kopyala'}
                  </button>
                  <button className="mc-btn mc-btn-outline mc-btn-sm" onClick={downloadMarkdown}>
                    İndir .md
                  </button>
                  <button className="mc-btn mc-btn-outline mc-btn-sm" onClick={() => setEditMode(e => !e)}>
                    {editMode ? 'Görüntüle' : 'Düzenle'}
                  </button>
                  <button className="mc-btn mc-btn-danger mc-btn-sm" style={{ marginLeft: 'auto' }} onClick={() => { setMarkdown(''); setEditMode(false); }}>
                    Temizle
                  </button>
                </div>
                {editMode
                  ? <textarea className="mc-output-edit" value={markdown} onChange={e => setMarkdown(e.target.value)} />
                  : <div className="mc-output-body">{markdown}</div>
                }
              </div>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="mc-section">
              <div className="mc-label">
                <span>Geçmiş</span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                  <button className="mc-history-clear-btn" onClick={downloadAllHistory}>Tümünü İndir</button>
                  <button className="mc-history-clear-btn" onClick={clearHistory}>Temizle</button>
                </div>
              </div>
              <div className="mc-history-grid">
                {history.map(item => (
                  <div key={item.id} className="mc-history-item" onClick={() => { setMarkdown(item.markdown || ''); setCurrentTitle(item.title); }} title={item.url}>
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
            <span className="mc-footer-tag">v2</span>
          </div>

        </div>
      </div>
    </>
  );
}
