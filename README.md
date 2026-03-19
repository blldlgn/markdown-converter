# URL → Markdown Converter

URL'yi yapıştır, Markdown al. Ücretsiz. API yok. Sadece Claude.ai aboneliği yeterli.

![Claude.ai](https://img.shields.io/badge/Claude.ai-Artifact-black?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Cost](https://img.shields.io/badge/API%20Cost-Zero-brightgreen?style=flat-square)

---

## ▶️ Tek Tıkla Başlat

Aşağıdaki butona tıklayın — Claude.ai açılır, araç otomatik yüklenir:

[![Claude.ai'da Aç](https://img.shields.io/badge/Claude.ai'da%20A%C3%A7-black?style=for-the-badge)](https://claude.ai/new?q=https%3A//raw.githubusercontent.com/blldlgn/markdown-converter/refs/heads/main/MarkdownConverterV2.jsx%20adresindeki%20React%20kodunu%20artifact%20olarak%20%C3%A7al%C4%B1%C5%9Ft%C4%B1r.)

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

## Özellikler

- **Tek URL** — tek bir sayfa
- **Manuel Liste** — birden fazla URL satır satır
- **Sitemap modu** — `sitemap.xml` girin, URL'leri otomatik çeker, seçip toplu gönderin
- **Otomatik gönderim** — `sendPrompt()` ile Claude'a direkt iletilir
- **Kopyala / İndir .md** — çıktıyı kaydedin
- **Düzenleme modu** — Markdown'ı inline düzenleyin
- **Geçmiş** — son 20 dönüşüm tarayıcıda saklanır
- **Tümünü İndir** — geçmişteki tüm sayfaları tek `.md` dosyasına

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
