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
- **ลิงก์ไปหน้าอื่นในเนื้อหา ต้องเปิดแท็บใหม่เสมอ** (เช่น “อ่านเต็ม →”, “อ่านต่อ →”, “ตอนถัดไป →”, “อ่านเจาะลึก →”)
  ใส่ใน HTML ทุกครั้ง: `<a class="tag gold" href="..." target="_blank" rel="noopener">อ่านเต็ม</a>`
  (`kv-deck.js` ใส่ให้อัตโนมัติเป็นตัวสำรองด้วย แต่ห้ามพึ่งอย่างเดียว เพราะ browser อาจ cache JS ตัวเก่า)
  ยกเว้น: ลิงก์ `#เลขสไลด์` ในหน้าเดียวกัน, ปุ่ม 🏠 / โลโก้ และการ์ดเอกสารในหน้าแรก → เปิดแท็บเดิม
- **แก้ `assets/kv-deck.css` หรือ `kv-deck.js` แล้วต้องเปลี่ยนเลขเวอร์ชัน** `?v=YYYYMMDD` ในทุกไฟล์ ไม่งั้นผู้ใช้จะเห็นของเก่าจาก cache
  ```bash
  python -c "import pathlib,re;[p.write_text(re.sub(r'kv-deck\.(css|js)\?v=\d+',r'kv-deck.?v=YYYYMMDD',p.read_text(encoding='utf-8')),encoding='utf-8') for p in pathlib.Path('docs').rglob('*.html')]"
  ```
- **ตรวจข้อมูลเวอร์ชันล่าสุดจากแหล่งทางการก่อนเขียน** (เอกสาร / changelog / npm / NuGet) โดยเฉพาะเรื่อง “รองรับ / ไม่รองรับ” ที่เปลี่ยนตามเวอร์ชัน
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

### 🐳 Docker สำหรับ Dev (ซีรีส์ `docs/docker/`)
- [x] ตอนที่ 1: พื้นฐาน (Image, Container, คำสั่งประจำวัน)
- [x] ตอนที่ 2: เขียน Dockerfile (Layer cache, Multi-stage, Next.js / .NET)
- [x] ตอนที่ 3: Docker Compose
- [x] ตอนที่ 4: การจัดการ .env และ Config
- [x] ตอนที่ 5: Volume & Network
- [x] ตอนที่ 6: Dev Workflow & แก้ปัญหา (Windows / WSL2)
- [x] ตอนที่ 7: Production & Security
- [x] ตอนเสริม: Dev Containers (VS Code) สำหรับทีม
- [ ] ตอนเสริม: รัน SQL Server / RabbitMQ / Kafka สำหรับ dev ด้วย Compose

### 🖥️ DevOps & Security
- [ ] CI/CD ด้วย GitHub Actions → Deploy (Coolify / VPS)
- [ ] Logging & Monitoring (Serilog + Seq / Grafana)
- [ ] OWASP Top 10 สำหรับเว็บแอป
- [ ] PDPA สำหรับนักพัฒนา (ข้อมูลส่วนบุคคลใน log, DB, backup)

### 🏗️ Architecture
- [x] Kafka vs RabbitMQ vs BullMQ
- [x] Apache Kafka Deep Dive
- [x] RabbitMQ Deep Dive
- [x] BullMQ Deep Dive
- [x] DLT / DLQ อธิบายละเอียด
- [x] Background Jobs: BullMQ ไม่ใช้ Redis ได้ไหม & งานเบื้องหลังแบบอื่น (Batch, Cron, Fire-and-forget, Workflow)
- [x] Kafka Integration Guide 4 ตอน (เตรียมข้อมูล & Contract · Retry & DLT · Status & Tracking · โครงสร้างโค้ด) — จาก kafka-integration-checklist.md ของทีม
- [ ] Monolith vs Modular Monolith vs Microservices
- [ ] Event-driven / Outbox pattern กับ .NET
- [ ] Caching Strategy ระดับระบบ (CDN, Redis, HTTP cache)

---

## 6. งานปรับปรุงเว็บ (Backlog)
- [ ] เพิ่มปุ่มพิมพ์เป็น PDF ต่อเรื่อง
- [ ] Custom domain เช่น `kb.mercent.co.th` (ตั้งที่ Settings → Pages)
- [x] ย้ายเอกสารเก่า (Kafka, Playwright, Docker) มาใช้ธีม `kv-deck` เดียวกัน
- [ ] Script ตรวจว่าทุกไฟล์ใน `docs/` ถูกลงทะเบียนใน `catalog.json`
- [ ] ปุ่มอ่านในโหมดบทความ (เลื่อนอ่านต่อเนื่องแทนสไลด์) สำหรับอ่านบนมือถือ

---

## 7. บันทึกงาน (Work Log)

> เพิ่มรายการใหม่ไว้ **บนสุด** ทุกครั้งที่ push งาน ระบุวันที่, สิ่งที่ทำ และ commit

### 2026-10-08

| งาน | Commit |
|---|---|
| เพิ่ม **Docker ตอนเสริม: Dev Containers** (14 สไลด์): ต่างจากตอนที่ 6 อย่างไร, กลไก, devcontainer.json แรก (Next.js), property ที่ใช้บ่อย, Features, Full stack ด้วย Compose (Next.js + .NET + PostgreSQL + Redis), .NET ใน container, env/secret, Windows, daily workflow, troubleshooting, checklist · ตรวจ image/feature/CLI เวอร์ชันล่าสุดจาก MCR / npm ก่อนเขียน · ลิงก์จากตอนที่ 7 | ดู `git log` |
| **แก้ข้อมูลล้าสมัย: BullMQ v6 (ก.ค. 2026) รองรับ PostgreSQL แล้ว** — ตรวจกับเอกสารทางการ docs.bullmq.io/guide/postgresql + npm (ล่าสุด 6.3.11) · Background Jobs: เพิ่มสไลด์ “BullMQ v6 + PostgreSQL” (โค้ด, ตัวเลขประสิทธิภาพ, สิ่งที่ต้องตั้งค่า) และแก้สไลด์ที่บอกว่าต้องใช้ Redis เท่านั้น (→ 16 สไลด์) · Kafka vs RabbitMQ vs BullMQ: แก้ตารางเปรียบเทียบ, คำศัพท์, สไลด์ “ไม่ใช้ Redis ได้ไหม” · BullMQ Deep Dive: หมายเหตุ v6 | `a8a2976` |
| ลิงก์ “อ่านเต็ม / อ่านต่อ / ตอนถัดไป” ทุกจุด (43 ลิงก์ใน 25 ไฟล์) ใส่ `target="_blank"` ใน HTML โดยตรง ไม่พึ่ง JS อย่างเดียว · เพิ่มเลขเวอร์ชัน `?v=20261008` ให้ `kv-deck.css/js` ทุกไฟล์ กัน browser ใช้ไฟล์เก่าจาก cache · อัปเดตกฎใน `todo.md` + ตัวอย่างลิงก์ใน template | `636460d` |
| เพิ่มเอกสาร **Background Jobs: ไม่ใช้ Redis ได้ไหม & งานแบบอื่น** (15 สไลด์): Redis-compatible (Valkey, Dragonfly…), ทางเลือกแทน BullMQ (pg-boss, Graphile, Inngest, Hangfire, Quartz.NET) พร้อมโค้ด, Queue vs Batch vs Cron vs Fire-and-forget vs Workflow vs Stream · เพิ่มสไลด์สรุปใน Kafka vs RabbitMQ vs BullMQ (→ 20 สไลด์) และลิงก์จาก BullMQ Deep Dive | `4191e81` |
| **Kafka vs RabbitMQ vs BullMQ** (12 → 19 สไลด์): เพิ่มสไลด์ “คำศัพท์ที่ต้องเข้าใจตรงกัน” ก่อนเข้าเรื่องแต่ละตัว (ตารางรูปแบบเดียวกับ Kafka Integration #4) · ตัวอย่างระบบที่เหมาะ ตัวละ 3 ระบบ พร้อมอธิบาย “ทำงานอย่างไร / ทำไมต้องใช้ตัวนี้” · สไลด์เปรียบเทียบ DLT vs DLQ ของ 3 ตัว | `2f77fd9` |
| เพิ่มเอกสาร **DLT / DLQ อธิบายละเอียด** (10 สไลด์): ทำไมต้องมี, DLT vs DLQ, ส่งเข้าเมื่อไร, โค้ด Kafka / RabbitMQ / BullMQ, Runbook, Replay อย่างปลอดภัย, Checklist | `2f77fd9` |

### 2026-10-07

| งาน | Commit |
|---|---|
| เพิ่ม **Kafka Integration Guide** 4 ตอน (48 สไลด์) จากเอกสาร `kafka-integration-checklist.md` เดิม: ขยายความ + ตัวอย่างโค้ด KafkaJS (worker retry/DLT, backoff+jitter, idempotency, tracking, คำนวณ lag) · เปลี่ยนข้อมูลเฉพาะโปรเจกต์เป็นค่ากลางเพราะ repo เป็น Public | `e724e72` |
| เพิ่มหมวด **🐳 Docker สำหรับ Dev** ซีรีส์ 7 ตอน (70 สไลด์): พื้นฐาน · Dockerfile · Compose · **.env & Config** (14 สไลด์) · Volume & Network · Dev Workflow & แก้ปัญหา · Production & Security — ทุกตอนลิงก์ไปตอนถัดไป | `803190d` |
| ธีม: ไฮไลต์ keyword/ตัวเลขเฉพาะภาษาโปรแกรม (Dockerfile/YAML/bash ไม่ระบายสีคำอย่าง `from`, `public` ผิด) · คอมเมนต์ `#` ใน Dockerfile แสดงเป็นคอมเมนต์ | `803190d` |
| หน้าแรก: การ์ดหมวดหมู่ 7 หมวดพอดีแถวเดียว · กดเมนูแล้วหัวข้อไม่ถูกแถบด้านบนบัง | `803190d` |
| `todo.md`: เพิ่ม roadmap ซีรีส์ Docker + ตอนเสริมที่ควรทำต่อ | `803190d` |

### 2026-10-06

| เวลา | งาน | Commit |
|---|---|---|
| 19:37 | ลิงก์ในเนื้อหาสไลด์ (เช่น "อ่านเจาะลึก →") เปิดแท็บใหม่อัตโนมัติผ่าน `kv-deck.js` ส่วนปุ่ม 🏠 และโลโก้เปิดแท็บเดิม | `b5acdec` |
| 19:13 | เขียน **Kafka vs RabbitMQ vs BullMQ** ใหม่ให้เข้าใจง่าย (16 → 12 สไลด์): ปัญหา → สิ่งที่ส่ง 3 แบบ → กลไก → ตารางเปรียบเทียบ → เหมาะ/ไม่เหมาะ → ตัวอย่างจริง → คำถาม 4 ข้อ · การ์ดหน้าแรกกลับมาเปิดแท็บเดิม · ปรับ letter-spacing หัวข้อภาษาไทย และสีหัวตาราง | `fdba47c` |
| 18:48 | การ์ดหน้าแรกเปิดแท็บใหม่ (ยกเลิกภายหลังที่ `fdba47c`) | `412112d` |
| 18:33 | เพิ่ม **Kafka Deep Dive** (16), **RabbitMQ Deep Dive** (14), **BullMQ Deep Dive** (14) · ลิงก์จากเรื่องเปรียบเทียบ · เปลี่ยนเครดิตเป็น "© MERCENT GROUP" | `f44455c` |
| 18:12 | ย้ายเอกสารเก่า 3 เรื่อง (Kafka vs RabbitMQ vs BullMQ, Playwright 101, aaPanel vs Coolify) มาใช้ธีม `kv-deck` · เพิ่ม component decision tree / status dot / score / recommendation · แก้บั๊กการ์ดสีทองทำให้ตัวหนังสือเป็นสีทองทั้งการ์ด | `fd5276e` |
| 17:47 | หน้าแรกใหม่โทนฟ้า-ทอง (ค้นหา, หมวดหมู่, dark mode, footer MERCENT GROUP) · สร้างธีมกลาง `kv-deck.css/js` · เพิ่มเอกสาร React Essentials, Next.js App Router, .NET Clean Architecture, API Contract, Git Workflow · template + `todo.md` | `2ca4544` |
| 17:25 | สร้าง repo `knowledge-vault` + เปิด GitHub Pages · จัดโฟลเดอร์ `docs/<หมวด>` · `catalog.json` + หน้าสารบัญแรก | `7fa1b2e` |

**สรุปสถานะ ณ สิ้นวัน:** เอกสาร 11 เรื่อง · 6 หมวด · ทุกเรื่องใช้ธีมเดียวกัน
