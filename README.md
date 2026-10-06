# Knowledge Vault

คลังความรู้ทีมพัฒนา (React · Next.js · .NET / C# · DevOps) ในรูปแบบสไลด์ HTML
เปิดอ่านที่ **https://kraisit-ch.github.io/knowledge-vault/**

## โครงสร้าง
```
index.html              หน้าแรก (อ่านรายการจาก catalog.json)
catalog.json            ทะเบียนหมวดและเอกสารทั้งหมด
assets/kv-deck.css      ธีมกลาง (ฟ้า-ทอง) ของทุกเอกสาร
assets/kv-deck.js       ระบบสไลด์: สารบัญ, โน้ต, ศัพท์เฉพาะ, คีย์ลัด, ปุ่ม Copy โค้ด
docs/_template/         template สำหรับเอกสารใหม่
docs/<หมวด>/*.html      เอกสาร
todo.md                 กฎการเขียนเอกสาร + roadmap หัวข้อ
```

## เพิ่มเอกสารใหม่
อ่านกฎใน [todo.md](todo.md) แบบย่อคือ:
1. คัดลอก `docs/_template/deck-template.html` ไปที่ `docs/<หมวด>/<ชื่อ-ภาษาอังกฤษ>.html`
2. เพิ่มรายการใน `catalog.json` (ถ้าเป็นหมวดใหม่ให้เพิ่มใน `categories` ด้วย)
3. `git add . && git commit -m "docs(<หมวด>): add ..." && git push`

## ดูบนเครื่อง
```bash
python -m http.server 8765
```
แล้วเปิด http://localhost:8765

---
© MERCENT GROUP
