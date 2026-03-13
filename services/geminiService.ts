
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getSafetyAdvice = async (history: { role: string, content: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: history.map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    })),
    config: {
      systemInstruction: `คุณคือ "ผู้เชี่ยวชาญด้านการวิเคราะห์ข้อมูลและความปลอดภัยผู้ป่วย" (Data Analyst & Patient Safety Expert) ประจำงานการพยาบาลศัลยกรรม โรงพยาบาลมหาวิทยาลัยนเรศวร (NUH)

หน้าที่ของคุณคือ:
1. วิเคราะห์ความเสี่ยงและแนวโน้มความผิดพลาดในการระบุตัวตนผู้ป่วย โดยใช้หลักการทางสถิติและข้อมูลจากมาตรฐาน SOP (SP-BQP-002-205-03)
2. ให้คำปรึกษาเชิงลึกที่อ้างอิงข้อมูล (Data-driven advice) เพื่อนำไปสู่เป้าหมาย Zero Identification Error
3. อธิบาย "เหตุผลเชิงวิเคราะห์" ว่าทำไมขั้นตอนต่างๆ ถึงสำคัญ เช่น การวิเคราะห์โอกาสเกิดความผิดพลาดหากใช้ตัวบ่งชี้เดียวเทียบกับสองตัวบ่งชี้
4. วิเคราะห์และประเมินพฤติกรรมความสอดคล้อง (Compliance) ของบุคลากร เพื่อเสนอแนะแนวทางปรับปรุงรายบุคคลหรือรายหอผู้ป่วย
5. ส่งเสริมระบบ Gamification โดยการให้กำลังใจและแนะนำวิธีการสะสมแต้ม (Points) และตราสัญลักษณ์ (Badges) เช่น "Safety Champion" หรือ "Compliance Master" เพื่อสร้างวัฒนธรรมความปลอดภัยที่สนุกสนานและยั่งยืน

ความเชี่ยวชาญด้านข้อมูลของคุณรวมถึง:
- การวิเคราะห์ Root Cause Analysis (RCA) ของการระบุตัวตนผิดพลาด
- การแปลผลตัวชี้วัด (KPIs) เช่น ร้อยละการสแกน Barcode สำเร็จ
- การประยุกต์ใช้หลักการ Independent Double Check (7 See) ในเชิงระบบเพื่อลด Human Error

ใช้ภาษาไทยที่เป็นทางการ สุขุม และเน้นการใช้ตรรกะเชิงวิเคราะห์ (Analytical thinking) พร้อมให้คำแนะนำที่เป็นรูปธรรม`,
      temperature: 0.7,
    }
  });

  const response = await model;
  return response.text;
};

export const analyzeAssessmentResult = async (data: {
  userName: string;
  testerName: string;
  experience: number;
  unit: string;
  position: string;
  score: number;
  wrongAnswers: string[];
}) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `วิเคราะห์ผลการประเมินความปลอดภัยผู้ป่วย (Patient Safety Compliance) ดังนี้:
ชื่อผู้ทดสอบ: ${data.userName}
หน่วยงาน: ${data.unit}
ตำแหน่ง: ${data.position}
ชื่อเจ้าหน้าที่ผู้ประเมิน: ${data.testerName}
อายุงาน: ${data.experience} ปี
คะแนนที่ได้: ${data.score}/12
ข้อที่ปฏิบัติไม่ครบถ้วน: ${data.wrongAnswers.length > 0 ? data.wrongAnswers.join(', ') : 'ไม่มี'}

เมื่อวิเคราะห์เสร็จสิ้น ให้ตอบกลับเป็นรูปแบบ JSON เท่านั้น ห้ามมีข้อความอื่นปน โดยใช้โครงสร้างดังนี้:
{
  "name": "ชื่อผู้ทดสอบ",
  "unit": "${data.unit}",
  "position": "${data.position}",
  "tester": "ชื่อเจ้าหน้าที่",
  "experience": ${data.experience},
  "score": ${data.score},
  "improvement": "ประเด็นที่ควรพัฒนา (สรุปจากข้อที่ผิด)",
  "ai_advice": "คำแนะนำเชิงลึกจาก AI เพื่อพัฒนาความปลอดภัย"
}`;

  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      temperature: 0.3,
      responseMimeType: 'application/json'
    }
  });

  const response = await model;
  return response.text;
};
