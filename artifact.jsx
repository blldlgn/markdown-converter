import React, { useState, useEffect } from 'react';

export default function MarkdownConverter() {
  const [batchMode, setBatchMode] = useState(false);
  const [urls, setUrls] = useState('');
  const [singleUrl, setSingleUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [markdown, setMarkdown] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [instructions, setInstructions] = useState('');

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

  // Generate prompt for Claude
  const generatePrompt = (urlList) => {
    if (urlList.length === 1) {
      return `Please convert the content from this URL to clean, well-formatted Markdown.

URL: ${urlList[0]}

Instructions:
1. Fetch and extract the main content from the URL
2. Remove scripts, styles, ads, navigation
3. Convert to clean Markdown format
4. Preserve headings (use #, ##, ###)
5. Preserve lists (use - or *)
6. Preserve links ([text](url))
7. Preserve code blocks
8. Return ONLY the Markdown, no explanation

Ready to convert!`;
    } else {
      return `Please convert the content from these URLs to clean, well-formatted Markdown. Process them one by one.

URLs:
${urlList.map((url, i) => `${i + 1}. ${url}`).join('\n')}

Instructions for each URL:
1. Fetch and extract the main content
2. Remove scripts, styles, ads, navigation
3. Convert to clean Markdown format
4. Preserve headings, lists, links, code blocks
5. Return ONLY the Markdown

Start with the first URL:`;
    }
  };

  // Send prompt to Claude
  const handleConvert = () => {
    setError('');

    const urlList = batchMode
      ? urls.split('\n').filter(u => u.trim())
      : [singleUrl];

    if (urlList.length === 0) {
      setError('❌ Please enter at least one URL');
      return;
    }

    try {
      const prompt = generatePrompt(urlList);
      setInstructions(prompt);
      setCurrentTitle(urlList.length === 1 ? urlList[0] : `${urlList.length} URLs`);
      
      setError('✅ Copy the prompt below and paste it into Claude chat to get markdown!');
    } catch (err) {
      setError(`❌ Error: ${err.message}`);
    }
  };

  // Copy instruction to clipboard
  const copyInstructions = () => {
    navigator.clipboard.writeText(instructions);
    alert('✅ Prompt copied! Paste it in Claude chat now.');
  };

  // Handle markdown input
  const handleMarkdownInput = () => {
    const md = prompt('Paste your markdown content:');
    if (md && md.trim()) {
      setMarkdown(md);
      setCurrentTitle('Manual Input');
      saveToHistory('manual', 'Manual Input', md);
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '0.5rem', color: '#333' }}>🔄 URL to Markdown Converter</h1>
        <p style={{ color: '#666', margin: 0 }}>💚 FREE - No API costs, uses your Claude subscription</p>
      </div>

      {/* Input Section */}
      <div style={{ backgroundColor: '#f0f8ff', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', border: '2px solid #28a745' }}>
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#d4edda', borderRadius: '4px', color: '#155724', fontSize: '14px' }}>
          ℹ️ <strong>How it works:</strong> Enter URLs, click convert, copy the prompt, and paste it in Claude chat. Claude will convert the URLs to markdown!
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
            onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '1rem',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        ) : (
          <textarea
            placeholder="Paste URLs (one per line)&#10;https://example.com&#10;https://github.com&#10;https://markdown.new"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            style={{
              width: '100%',
              height: '120px',
              padding: '12px',
              marginBottom: '1rem',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'monospace',
              boxSizing: 'border-box'
            }}
          />
        )}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleConvert}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            ✨ Generate Prompt
          </button>

          <button
            onClick={handleMarkdownInput}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            📝 Paste Markdown
          </button>
        </div>
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

      {/* Instructions Section */}
      {instructions && (
        <div style={{ marginBottom: '2rem', padding: '2rem', backgroundColor: '#fffacd', borderRadius: '8px', border: '2px solid #ffd700' }}>
          <h2 style={{ marginTop: 0, color: '#333' }}>📋 Copy This Prompt to Claude Chat</h2>
          
          <div style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            maxHeight: '300px',
            overflowY: 'auto',
            marginBottom: '1rem',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {instructions}
          </div>

          <button
            onClick={copyInstructions}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            📋 Copy Prompt to Clipboard
          </button>

          <p style={{ fontSize: '12px', color: '#666', marginTop: '1rem' }}>
            👉 <strong>Next step:</strong> Go to Claude chat, paste this prompt, and Claude will convert your URLs to markdown!
          </p>
        </div>
      )}

      {/* Output Section */}
      {markdown && (
        <div style={{ marginBottom: '2rem', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h2 style={{ marginTop: 0 }}>📄 Markdown Output</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }}>
              <strong>{Math.ceil(markdown.length / 4).toLocaleString()}</strong><br />
              <small style={{ color: '#666' }}>Tokens</small>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }}>
              <strong>{markdown.length.toLocaleString()}</strong><br />
              <small style={{ color: '#666' }}>Characters</small>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }}>
              <strong>{markdown.split('\n').length}</strong><br />
              <small style={{ color: '#666' }}>Lines</small>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigator.clipboard.writeText(markdown)}
              style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              📋 Copy
            </button>
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'data:text/markdown,' + encodeURIComponent(markdown);
                link.download = `${currentTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
                link.click();
              }}
              style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              ⬇️ Download
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px' }}
            >
              ✏️ {editMode ? 'View' : 'Edit'}
            </button>
          </div>

          {editMode ? (
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              style={{
                width: '100%',
                height: '400px',
                padding: '12px',
                fontFamily: 'monospace',
                fontSize: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          ) : (
            <div style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontFamily: 'monospace',
              fontSize: '12px',
              lineHeight: '1.6',
              maxHeight: '400px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {markdown}
            </div>
          )}
        </div>
      )}

      {/* History Panel */}
      {history.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ marginTop: 0 }}>📜 History</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setMarkdown(item.markdown);
                  setCurrentTitle(item.title);
                }}
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
          Uses your Claude subscription<br/>
          <br/>
          GitHub: <a href="https://github.com/YOUR_USERNAME/markdown-converter" style={{ color: '#0066cc' }}>markdown-converter</a><br/>
          Made by <strong>Bilal Dalgün</strong>
        </p>
      </div>
    </div>
  );
}
