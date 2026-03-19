# URL → Markdown Converter

URL'yi yapıştır, Markdown al. Ücretsiz. API yok. Sadece Claude.ai aboneliği yeterli.

![Claude.ai](https://img.shields.io/badge/Claude.ai-Artifact-black?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Cost](https://img.shields.io/badge/API%20Cost-Zero-brightgreen?style=flat-square)

---

## ▶️ Tek Tıkla Başlat

Aşağıdaki butona tıklayın — Claude.ai açılır, araç otomatik yüklenir:

[![Claude'da Aç](https://img.shields.io/badge/Claude.ai'da%20A%C3%A7-black?style=for-the-badge&logo=anthropic)](https://claude.ai/new?q=https%3A//raw.githubusercontent.com/YOUR_USERNAME/markdown-converter/main/MarkdownConverter.jsx%20adresindeki%20React%20kodunu%20artifact%20olarak%20%C3%A7al%C4%B1%C5%9Ft%C4%B1r.)

> **Not:** `YOUR_USERNAME` kısmını kendi GitHub kullanıcı adınızla değiştirin.

Tıkladıktan sonra Claude mesaj kutusunda hazır gelir — sadece **Enter**'a basın.

---

## Nasıl Çalışır?

`sendPrompt()` — Claude.ai'ın artifact'lere özel fonksiyonu. API key gerektirmez.

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

## Manuel Kullanım

Butonu kullanmak istemiyorsanız:

1. [claude.ai](https://claude.ai) adresine gidin
2. Yeni sohbet başlatın
3. `MarkdownConverter.jsx` içeriğini kopyalayın
4. Claude'a yapıştırıp şunu yazın: **"Bu kodu artifact olarak çalıştır"**
5. Artifact açılınca URL girin → **"Markdown'a Çevir"** butonuna basın

---

## Özellikler

- **Tek URL veya Batch mod** — birden fazla URL aynı anda
- **Otomatik gönderim** — `sendPrompt()` ile Claude'a direkt iletilir
- **Prompt paneli** — gönderilen prompt'u görebilir, kopyalayabilirsiniz
- **Markdown çıktı paneli** — istatistiklerle birlikte görüntüleyin
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

## Sık Sorulan Sorular

**Bu neden ücretsiz?**
`sendPrompt()` Claude.ai'ın artifact API'si. Claude aboneliğinizin içinde, ek ücret yok.

**GitHub Pages veya Netlify'da çalışır mı?**
Hayır. `sendPrompt()` sadece Claude.ai artifact ortamında çalışır.

**Claude ücretsiz planında çalışır mı?**
Evet, ancak ücretsiz planda mesaj limiti var. Pro/Team planlarda limit daha yüksek.

---

## Lisans

MIT — Kullanın, değiştirin, paylaşın.

---

Made by **Bilal Dalgün**
