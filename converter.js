#!/usr/bin/env node

const Anthropic = require("@anthropic-ai/sdk");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const CONVERSIONS_LOG = "conversions.json";

// Load conversions history
function loadHistory() {
  if (fs.existsSync(CONVERSIONS_LOG)) {
    return JSON.parse(fs.readFileSync(CONVERSIONS_LOG, "utf-8"));
  }
  return [];
}

// Save conversion to history
function saveConversion(data) {
  const history = loadHistory();
  history.unshift({
    ...data,
    timestamp: new Date().toISOString(),
  });
  // Keep last 50 conversions
  fs.writeFileSync(CONVERSIONS_LOG, JSON.stringify(history.slice(0, 50), null, 2));
}

// Main conversion function
async function convertUrlToMarkdown(url, options = {}) {
  const {
    maxChars = 5000,
    saveFile = false,
    verbose = true,
  } = options;

  console.log(`\n📥 Fetching: ${url}`);

  try {
    // 1. Fetch URL
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      timeout: 10000,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const html = await response.text();

    // Check size
    if (html.length > 1000000) {
      throw new Error("Page too large (>1MB)");
    }

    if (verbose) console.log(`✅ Fetched ${html.length} bytes`);

    // 2. Extract title and text
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : new URL(url).hostname;

    // Clean HTML
    const cleanText = html
      .replace(/<script[^>]*>.*?<\/script>/gi, "")
      .replace(/<style[^>]*>.*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, "\n")
      .replace(/\n\n+/g, "\n")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim()
      .substring(0, maxChars);

    if (verbose) console.log(`✅ Extracted ${cleanText.length} chars of content`);

    // 3. Convert with Claude
    if (verbose) console.log("🤖 Converting with Claude...");

    const message = await anthropic.messages.create({
      model: "claude-opus-4-20250805",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a markdown conversion expert. Convert this web page content to clean, well-formatted Markdown. 

Preserve:
- Headings (use #, ##, ###)
- Lists (use - or *)
- Links ([text](url))
- Code blocks (use \`\`\`)
- Bold and italic text

Return ONLY the Markdown, no explanation or extra text.

---
Title: ${title}
URL: ${url}

Content:
${cleanText}
---`,
        },
      ],
    });

    const markdown =
      message.content[0].type === "text" ? message.content[0].text : "";

    if (verbose) console.log(`✅ Converted to ${markdown.length} chars`);

    // 4. Calculate stats
    const tokenCount = Math.ceil(markdown.length / 4); // Rough estimation
    const htmlEstimate = html.length;
    const savingsPercent = Math.round(
      ((htmlEstimate - markdown.length) / htmlEstimate) * 100
    );

    if (verbose) {
      console.log(`\n📊 Statistics:`);
      console.log(`   Tokens: ~${tokenCount}`);
      console.log(`   Characters: ${markdown.length}`);
      console.log(`   HTML Savings: ${savingsPercent}%`);
    }

    const result = {
      url,
      title,
      markdown,
      tokenCount,
      charactersCount: markdown.length,
      htmlSavingsPercent: savingsPercent,
    };

    // 5. Save history
    saveConversion(result);

    // 6. Optionally save to file
    if (saveFile) {
      const filename = `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.md`;
      fs.writeFileSync(filename, markdown);
      if (verbose) console.log(`💾 Saved to: ${filename}`);
    }

    return result;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    throw error;
  }
}

// Batch conversion
async function batchConvert(urls, options = {}) {
  const results = [];

  for (const url of urls) {
    try {
      const result = await convertUrlToMarkdown(url, options);
      results.push(result);
    } catch (error) {
      results.push({
        url,
        error: error.message,
      });
    }
  }

  return results;
}

// Show history
function showHistory(limit = 5) {
  const history = loadHistory();

  if (history.length === 0) {
    console.log("No conversions yet");
    return;
  }

  console.log(`\n📜 Last ${Math.min(limit, history.length)} conversions:\n`);

  history.slice(0, limit).forEach((item, i) => {
    console.log(`${i + 1}. ${item.title}`);
    console.log(`   URL: ${item.url}`);
    console.log(`   Tokens: ~${item.tokenCount}`);
    console.log(`   Savings: ${item.htmlSavingsPercent}%`);
    console.log(`   Time: ${new Date(item.timestamp).toLocaleString()}`);
    console.log();
  });
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🔄 URL to Markdown Converter

Usage:
  node converter.js <url>              Convert single URL
  node converter.js <url> --save       Save to file
  node converter.js --history          Show conversion history
  node converter.js --batch urls.txt   Convert multiple URLs

Examples:
  node converter.js https://example.com
  node converter.js https://example.com --save
  node converter.js --history
    `);
    return;
  }

  if (args[0] === "--history") {
    showHistory(10);
    return;
  }

  if (args[0] === "--batch" && args[1]) {
    const filePath = args[1];
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return;
    }

    const urls = fs
      .readFileSync(filePath, "utf-8")
      .split("\n")
      .filter((u) => u.trim());

    console.log(`\n🚀 Converting ${urls.length} URLs...`);
    const results = await batchConvert(urls);

    console.log(`\n✅ Completed: ${results.filter(r => !r.error).length}/${urls.length}`);
    if (results.some(r => r.error)) {
      console.log(`❌ Failed: ${results.filter(r => r.error).length}`);
    }
    return;
  }

  // Single URL conversion
  const url = args[0];
  const saveFile = args.includes("--save");

  try {
    const result = await convertUrlToMarkdown(url, {
      saveFile,
      verbose: true,
    });

    console.log(`\n${"=".repeat(50)}`);
    console.log("MARKDOWN OUTPUT:");
    console.log(`${"=".repeat(50)}\n`);
    console.log(result.markdown);
    console.log(`\n${"=".repeat(50)}\n`);
  } catch (error) {
    process.exit(1);
  }
}

// Export for use as module
module.exports = {
  convertUrlToMarkdown,
  batchConvert,
  showHistory,
  loadHistory,
};

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}
