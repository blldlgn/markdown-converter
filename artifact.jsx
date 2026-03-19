import React, { useState, useEffect } from 'react';

export default function MarkdownConverter() {
  const [batchMode, setBatchMode] = useState(false);
  const [urls, setUrls] = useState('');
  const [singleUrl, setSingleUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('markdown-history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  const saveToHistory = (url, title, md) => {
    const newItem = {
      id: Date.now(),
      url,
      title,
      markdown: md,
      timestamp: new Date().toLocaleString()
    };
    const updated = [newItem, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem('markdown-history', JSON.stringify(updated));
  };

  // Fetch URL and extract text (client-side)
 const fetchUrlContent = async (url) => {
    try {
      // Note: This is a limitation - URL fetching may not work in artifact
      // For best results, use the "Send to Claude" button instead
      
      const title = new URL(url).hostname;
      const content = `Content from: ${url}\n\nNote: Direct URL fetching from artifact has limitations.\nFor the best experience, use the "Send to Claude" button and paste the content directly.`;
      
      return { title, content };
```

### **ADIM 3: Kaydet**

Sağ üstte **checkmark** veya **"Done"** tıkla

---

## 🎯 **Şimdi Nasıl Çalışacak?**

### **Yeni Workflow:**

1. **"Send to Claude" butonuna tıkla**
2. Claude'a şu prompt gidiyor:
```
"https://example.com sayfasını markdown'a çevir"
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const html = await response.text();

      // Extract title
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : new URL(url).hostname;

      // Extract text content
      const cleanText = html
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<style[^>]*>.*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, '\n')
        .replace(/\n\n+/g, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim()
        .substring(0, 5000);

      return { title, content: cleanText };
    } catch (err) {
      throw new Error(`Failed to fetch URL: ${err.message}`);
    }
  };

  // Convert with Claude (send via sendPrompt - FREE!)
  const convert = async () => {
    setError('');
    setLoading(true);

    const urlList = batchMode
      ? urls.split('\n').filter(u => u.trim())
      : [singleUrl];

    if (urlList.length === 0) {
      setError('❌ Please enter at least one URL');
      setLoading(false);
      return;
    }

    try {
      for (const url of urlList) {
        // Fetch content
        const { title, content } = await fetchUrlContent(url);
        setCurrentTitle(title);

        // Create prompt for Claude
        const prompt = `Convert this web page content to clean, well-formatted Markdown. Preserve headings, lists, links, and code blocks. Return ONLY the Markdown, no explanation.

**Title:** ${title}
**URL:** ${url}

**Content:**
${content}

---

After the markdown, add a brief summary line like: "📊 Statistics: ~XXX tokens, XXX characters"`;

        // Send to Claude via sendPrompt (uses your Claude subscription, NOT API credits!)
        await sendPrompt(prompt);

        setError('✅ Check Claude chat above for the markdown output! (Free - uses your subscription)');
      }

      setLoading(false);
    } catch (err) {
      setError(`❌ Error: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '0.5rem' }}>🔄 URL to Markdown Converter</h1>
        <p style={{ color: '#666', margin: 0 }}>💰 FREE - Uses your Claude subscription, no API credits!</p>
      </div>

      {/* Input Section */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', border: '2px solid #28a745' }}>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#d4edda', borderRadius: '4px', color: '#155724' }}>
          ✅ <strong>Zero Cost!</strong> This uses your Claude subscription. No API credit charges.
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={batchMode}
              onChange={(e) => setBatchMode(e.target.checked)}
            />
            <strong>Batch mode (multiple URLs)</strong>
          </label>
        </div>

        {!batchMode ? (
          <input
            type="url"
            placeholder="https://example.com"
            value={singleUrl}
            onChange={(e) => setSingleUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && convert()}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '1rem',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        ) : (
          <textarea
            placeholder="Paste URLs (one per line)&#10;https://example.com&#10;https://github.com"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            style={{
              width: '100%',
              height: '100px',
              padding: '12px',
              marginBottom: '1rem',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}
          />
        )}

        <button
          onClick={convert}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          {loading ? '⏳ Processing...' : '✨ Send to Claude'}
        </button>
      </div>

      {/* Message */}
      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: error.includes('✅') ? '#d4edda' : '#f8d7da',
          color: error.includes('✅') ? '#155724' : '#721c24',
          borderRadius: '4px',
          marginBottom: '1rem',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {/* History Panel */}
      {history.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>📜 Previous Conversions</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {history.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '1rem',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px',
                  border: '1px solid #eee',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.borderColor = '#28a745';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9f9f9';
                  e.currentTarget.style.borderColor = '#eee';
                }}
              >
                <strong style={{ fontSize: '14px', display: 'block', marginBottom: '0.5rem' }}>
                  {item.title}
                </strong>
                <small style={{ color: '#666', display: 'block', marginBottom: '0.5rem' }}>
                  {item.url}
                </small>
                <small style={{ color: '#999' }}>{item.timestamp}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ fontSize: '12px', color: '#999', textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid #eee', marginTop: '2rem' }}>
        <p>
          💚 <strong>Completely Free</strong> - No API credits used<br/>
          This tool uses Claude's chat interface (sendPrompt) which is included in your subscription.<br/>
          <br/>
          GitHub: <a href="https://github.com/YOUR_USERNAME/markdown-converter" style={{ color: '#0066cc' }}>markdown-converter</a>
        </p>
      </div>
    </div>
  );
}
