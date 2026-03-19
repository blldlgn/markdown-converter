# URL → Markdown Converter

URL'yi yapıştır, Markdown al. Ücretsiz. API yok. Sadece Claude.ai aboneliği yeterli.

![Claude.ai](https://img.shields.io/badge/Claude.ai-Artifact-black?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Cost](https://img.shields.io/badge/API%20Cost-Zero-brightgreen?style=flat-square)

---

## Nasıl Çalışır?

`sendPrompt()` — Claude.ai'ın artifact'lere özel bir fonksiyonu. API key gerektirmez, Claude aboneliğinizle çalışır.

```
Siz URL girersiniz
       ↓
Artifact sendPrompt() ile Claude'a gönderir
       ↓
Claude sayfayı çekip Markdown'a çevirir
       ↓
Yanıt chat'te görünür
```

---

## Kullanım

### Adım 1 — Claude.ai'ı açın

[claude.ai](https://claude.ai) adresine gidin. Ücretsiz veya Pro hesap çalışır.

### Adım 2 — Yeni sohbet başlatın

Yeni bir konuşma açın.

### Adım 3 — Kodu artifact olarak çalıştırın

Claude'a şunu yazın:

```
Aşağıdaki React kodunu artifact olarak çalıştır:
```

Ardından `MarkdownConverter.jsx` dosyasının içeriğini mesaja yapıştırın ve gönderin.

### Adım 4 — Kullanın

Artifact paneli açılır. URL girin, **"Markdown'a Çevir"** butonuna basın. Claude yukarıda Markdown çıktısını yazar.

---

## Özellikler

- **Tek URL veya Batch mod** — birden fazla URL aynı anda
- **Prompt paneli** — gönderilen prompt'u görebilir, kopyalayabilirsiniz
- **Markdown çıktı paneli** — Claude'un yanıtını yapıştırıp istatistikleri görün
- **Token / karakter / satır sayacı**
- **Düzenleme modu** — Markdown'ı inline düzenleyin
- **.md olarak indirin**
- **Geçmiş** — son 20 dönüşüm tarayıcıda saklanır

---

## Gereksinimler

| | |
|---|---|
| Claude.ai hesabı | ✅ Gerekli |
| API Key | ❌ Gerekmez |
| Backend / Sunucu | ❌ Gerekmez |
| Kurulum | ❌ Gerekmez |

---

## Dosyalar

```
markdown-converter/
├── MarkdownConverter.jsx   # Tek dosya, tüm kod burada
└── README.md
```

---

## Sık Sorulan Sorular

**Bu neden ücretsiz?**
`sendPrompt()` Claude.ai'ın artifact API'si. Claude aboneliğinizin içinde, ek ücret yok.

**GitHub Pages veya Netlify'da çalışır mı?**
Hayır. `sendPrompt()` sadece Claude.ai artifact ortamında tanımlı. Bağımsız web uygulaması yapmak istiyorsanız Anthropic API'si gerekir.

**Claude ücretsiz planında çalışır mı?**
Evet, ancak ücretsiz planda mesaj limiti var. Pro/Team planlarda limit daha yüksek.

---

## Lisans

MIT — Kullanın, değiştirin, paylaşın.

---

Made by **Bilal Dalgün**
