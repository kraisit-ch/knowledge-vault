# Knowledge Vault — กฎการเขียนเอกสาร & Roadmap

> เว็บ: https://kraisit-ch.github.io/knowledge-vault/
> Repo: https://github.com/kraisit-ch/knowledge-vault

---

## 1. กฎหลัก (ต้องทำทุกครั้ง)

1. **เอกสารใหม่ทุกไฟล์เริ่มจาก template** `docs/_template/deck-template.html`
   - คัดลอกไปไว้ที่ `docs/<หมวด>/<ชื่อไฟล์>.html` แล้วแก้เนื้อหา
   - ห้ามเขียน `<style>` สีหรือ layout ใหม่เอง ให้ใช้ class จาก `assets/kv-deck.css` เพื่อให้ทุกเรื่องหน้าตาเหมือนกัน
2. **ชื่อไฟล์และโฟลเดอร์ใช้ภาษาอังกฤษ ตัวเล็ก คั่นด้วย `-`** (kebab-case)
   - ✅ `docs/backend/ef-core-performance.html`
   - ❌ `docs/Backend/EF Core ประสิทธิภาพ.html` (ภาษาไทยหรือเว้นวรรคทำให้ URL อ่านไม่ออก)
3. **ลงทะเบียนใน `catalog.json` ทุกครั้ง** ถ้าไม่ลงทะเบียน หน้าแรกจะไม่แสดง
   ```json
   { "category": "backend", "title": "EF Core Performance", "desc": "สรุป 1 บรรทัด",
     "path": "docs/backend/ef-core-performance.html", "date": "2026-10-06",
     "slides": 12, "level": "กลาง", "tags": ["ef-core", "sql"] }
   ```
4. **หมวดใหม่** ให้เพิ่มใน `categories` ของ `catalog.json` ด้วย
   ```json
   { "id": "ai", "name": "AI & Automation", "icon": "🤖", "desc": "คำอธิบายหมวด" }
   ```
   `id` ต้องตรงกับชื่อโฟลเดอร์ใต้ `docs/`
5. **ห้ามใส่ข้อมูลลับ** เพราะ repo เป็น Public ห้ามมีรหัสผ่าน, API key, connection string จริง, IP ภายใน หรือข้อมูลลูกค้า ให้ใช้ค่าตัวอย่างอย่าง `***` หรือ `example.com`
6. **commit ตาม Conventional Commits** เช่น `docs(backend): add ef-core performance`

## 2. มาตรฐานเนื้อหา (ให้เข้าใจง่าย)

- 1 เรื่องควรมี **10–15 สไลด์** ถ้ายาวกว่านี้ให้แยกเป็นตอน (part 1, part 2)
- ลำดับสไลด์ที่แนะนำ:
  1. **บทนำ**: ปัญหาที่แก้ ใครควรอ่าน และ quote สรุปแก่น
  2. **Mental model / ภาพรวม**: ใช้ diagram (`.flow`, `.layers`)
  3. **เนื้อหาหลัก**: ใส่ตัวอย่างโค้ดจริงที่ copy ไปใช้ได้
  4. **Do / Don't**: ใช้ `.do` กับ `.dont` คู่กัน
  5. **ข้อผิดพลาดที่พบบ่อย**
  6. **Checklist / Decision guide**: สรุปให้นำไปใช้ได้ทันที
- **1 สไลด์ = 1 ประเด็น** ข้อความในการ์ดไม่เกิน 2–3 บรรทัด
- ศัพท์เฉพาะใส่ปุ่ม `?` ด้วย `<button class="term" data-term="key"></button>` แล้วอธิบายใน `window.KV_GLOSSARY` พร้อมตัวอย่างง่าย ๆ
- เนื้อหาที่ผู้นำเสนอต้องพูดเพิ่ม ใส่ใน `<template class="note">` (กด N เพื่อเปิด)
- โค้ดใน `<pre class="code" data-lang="ts|tsx|csharp|json|bash|yaml|text">`
  ต้อง escape `<` เป็น `&lt;`, `>` เป็น `&gt;` และ `&` เป็น `&amp;`
- อ้างอิงเวอร์ชันให้ชัด เช่น "Next.js 15+" หรือ ".NET 10" เพราะเทคโนโลยีเปลี่ยนเร็ว

## 3. Class ที่ใช้บ่อย (สรุปจาก `assets/kv-deck.css`)

| ต้องการ | class |
|---|---|
| หัวเล็กสีทองเหนือหัวข้อ | `.eyebrow` |
| ข้อความไล่สีฟ้า→ทอง | `.grad` |
| เน้นคำ | `.gold`, `.blue`, `.green`, `.red`, `.muted` |
| Grid | `.grid .grid-2` / `.grid-3` / `.grid-4` |
| การ์ด (แถบสีซ้าย) | `.card`, `.card.gold`, `.card.good`, `.card.bad`, `.card.violet` |
| ตัวเลขใหญ่ในการ์ด | `.big-number` |
| คำคม / สรุป | `.quote` |
| กล่องหมายเหตุ | `.callout`, `.callout.warn`, `.callout.bad` |
| ควรทำ / ไม่ควรทำ | `.do`, `.dont` |
| Diagram | `.diagram > .flow > .node(.gold/.green/.violet) + .arrow` |
| ขั้นตอนมีเลข | `<ol class="steps">` |
| ตาราง | `<div class="table-wrap"><table class="table">` |
| แท็ก | `.tag-row > .tag(.gold/.blue)` |

## 4. ขั้นตอนเพิ่มเอกสาร (สรุป)

```bash
# 1. คัดลอก template
cp docs/_template/deck-template.html docs/backend/ef-core-performance.html
# 2. แก้เนื้อหา + เพิ่มรายการใน catalog.json
# 3. ดูผลบนเครื่อง (ต้องรันผ่าน server เพราะ catalog.json โหลดด้วย fetch)
python -m http.server 8765    # เปิด http://localhost:8765
# 4. ส่งขึ้นเว็บ
git add . && git commit -m "docs(backend): add ef-core performance" && git push
```

---

## 5. Roadmap หัวข้อที่ควรเพิ่ม

สถานะ: `[x]` เสร็จแล้ว · `[ ]` ยังไม่ทำ

### ⚛️ Frontend (React / Next.js)
- [x] React Essentials สำหรับทีม
- [x] Next.js App Router Playbook
- [ ] TypeScript Patterns ที่ใช้บ่อย (Generic, Utility types, Discriminated union)
- [ ] State Management: Zustand vs Context vs TanStack Query
- [ ] Authentication ใน Next.js (Auth.js + .NET JWT) แบบละเอียด
- [ ] UI Component Library ของทีม (shadcn/ui + Tailwind) และ Design tokens
- [ ] Web Performance & Core Web Vitals
- [ ] Accessibility (a11y) checklist
- [ ] Testing React: Vitest + Testing Library + MSW

### 🛠️ Backend (.NET / C#)
- [x] .NET Web API & Clean Architecture
- [x] API Contract: Next.js ↔ .NET
- [ ] EF Core Performance & Migration strategy
- [ ] C# Modern Features (record, pattern matching, primary constructor, collection expressions)
- [ ] Authentication & Authorization ใน ASP.NET Core (JWT, Policy, Role)
- [ ] Background Jobs: Hangfire / Quartz / Hosted Service
- [ ] Caching: IMemoryCache, HybridCache, Redis
- [ ] SQL Server / PostgreSQL: Index, Query plan, Transaction isolation
- [ ] Integration Test ด้วย Testcontainers

### 🤝 Team & Process
- [x] Git Workflow & Code Review
- [ ] Onboarding Guide สำหรับคนใหม่ (setup เครื่อง, เข้าถึงระบบ, โปรเจกต์หลัก)
- [ ] Coding Standard รวม (ESLint/Prettier + .editorconfig ของ .NET)
- [ ] Estimation & Sprint Planning
- [ ] Incident Response & Postmortem template
- [ ] การใช้ AI (Claude Code / Copilot) ในทีมอย่างปลอดภัย

### 🖥️ DevOps & Security
- [ ] Docker สำหรับ Next.js + .NET (multi-stage build)
- [ ] CI/CD ด้วย GitHub Actions → Deploy (Coolify / VPS)
- [ ] Logging & Monitoring (Serilog + Seq / Grafana)
- [ ] OWASP Top 10 สำหรับเว็บแอป
- [ ] PDPA สำหรับนักพัฒนา (ข้อมูลส่วนบุคคลใน log, DB, backup)

### 🏗️ Architecture
- [x] Kafka vs RabbitMQ vs BullMQ
- [x] Apache Kafka Deep Dive
- [x] RabbitMQ Deep Dive
- [x] BullMQ Deep Dive
- [ ] Monolith vs Modular Monolith vs Microservices
- [ ] Event-driven / Outbox pattern กับ .NET
- [ ] Caching Strategy ระดับระบบ (CDN, Redis, HTTP cache)

---

## 6. งานปรับปรุงเว็บ (Backlog)
- [ ] เพิ่มปุ่มพิมพ์เป็น PDF ต่อเรื่อง
- [ ] Custom domain เช่น `kb.mercent.co.th` (ตั้งที่ Settings → Pages)
- [x] ย้ายเอกสารเก่า (Kafka, Playwright, Docker) มาใช้ธีม `kv-deck` เดียวกัน
- [ ] Script ตรวจว่าทุกไฟล์ใน `docs/` ถูกลงทะเบียนใน `catalog.json`
