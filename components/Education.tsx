
import React from 'react';
import { CheckCircle2, AlertCircle, ShieldCheck, Video, FileText, ArrowRight } from 'lucide-react';

const Education: React.FC = () => {
  const videoLinks = [
    { ward: 'หอผู้ป่วย EYE', url: 'https://drive.google.com/file/d/1EGkCJxD4QsxoliqdAWLqOf_9y2N8Qid7/view?usp=sharing' },
    { ward: 'หอผู้ป่วย ENT', url: 'https://drive.google.com/file/d/1iRWgBHImC8dfAkmtryOCQy6T3bBWJKMv/view?usp=sharing' },
    { ward: 'หอผู้ป่วย Ortho', url: 'https://drive.google.com/file/d/1s1MhzUOVo61Ql5tPIIpRwkmupRg8n8Qu/view?usp=sharing' },
    { ward: 'หอผู้ป่วย VIP Ortho', url: 'https://drive.google.com/file/d/1tPstWlRJrvOMHHLOD7PN6C9eSLuRYiPM/view?usp=sharing' },
    { ward: 'หอผู้ป่วย Surg1', url: 'https://drive.google.com/file/d/1h7CMYjdGaPqnkUnjFIU5HjewIBA9kHwK/view?usp=sharing' },
    { ward: 'หอผู้ป่วย VIP Surg1', url: 'https://drive.google.com/file/d/1C2DxGehGPkejurQx13M8cV0ZtbIWLKm/view?usp=sharing' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="mb-6">
        <div className="inline-block bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold mb-2">
          SOP: SP-BQP-002-205-03
        </div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Identify ดีไม่มีผิดพลาด</h2>
        <p className="text-slate-600 italic font-medium">งานการพยาบาลศัลยกรรม รพ.มหาวิทยาลัยนเรศวร</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all group">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-800">เป้าหมาย (Goals)</h3>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
              <span className="font-medium">อุบัติการณ์การระบุตัวตนผิดพลาดเป็น "ศูนย์" (Zero Error)</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
              <span className="font-medium">บุคลากรปฏิบัติตามแนวทางได้ถูกต้อง 100%</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-violet-100 transition-all group">
          <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-800">ตัวบ่งชี้อย่างน้อย 2 อย่าง</h3>
          <p className="text-slate-500 text-sm mb-4 font-medium">ห้ามใช้เลขเตียงหรือห้องพักเด็ดขาด</p>
          <div className="grid grid-cols-2 gap-3">
            {['ชื่อ-นามสกุล', 'วันเดือนปีเกิด', 'อายุ', 'เลข HN / AN'].map((item) => (
              <div key={item} className="bg-slate-50 p-3 rounded-xl text-sm text-slate-700 font-bold border border-slate-100 text-center hover:bg-white hover:border-violet-200 transition-all">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px]"></div>
          <h3 className="text-2xl font-bold flex items-center gap-3 relative z-10">
            <FileText size={28} className="text-indigo-400" /> ขั้นตอนการปฏิบัติงานมาตรฐาน (SOP Checklist)
          </h3>
        </div>
        <div className="p-8 grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">1</div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg">การบ่งชี้ตัวผู้ป่วยทั่วไป</h4>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">สแกน Barcode และใช้ตัวบ่งชี้ 2 อย่างเสมอ (ห้ามใช้เลขเตียง) สแกน QR Code ทุกครั้งเมื่อรับใหม่/รับย้าย</p>
              </div>
            </div>
            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">2</div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg">การเจาะเลือด/เก็บสิ่งส่งตรวจ</h4>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">ตรวจสอบคำสั่งแพทย์ ติดสติกเกอร์ต่อหน้าผู้ป่วย สแกน QR Code และให้ผู้ป่วยยืนยันความถูกต้องซ้ำ</p>
              </div>
            </div>
            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">3</div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg">การส่งผ่าตัด/ทำหัตถการ</h4>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">สแกน QR Code ระบุตัวตัวเทียบกับป้ายข้อมือและแฟ้มประวัติก่อนทำหัตถการทุกครั้ง</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 font-black border border-violet-100 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-sm">4</div>
              <div>
                <h4 className="font-bold text-violet-800 text-lg">การให้ยา (Drug Administration)</h4>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">ถามชื่อ-นามสกุล วันเดือนปีเกิด และตรวจสอบร่วมกับ MAR (Medical Administration Record) ทุกครั้ง</p>
              </div>
            </div>
            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 font-black border border-violet-100 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-sm">5</div>
              <div>
                <h4 className="font-bold text-violet-800 text-lg">การให้เลือด (Blood Transfusion)</h4>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">ตรวจสอบ Physician's Order Sheet และใช้หลัก Independent Double Check (พยาบาล 2 คน) ก่อนเริ่มให้เลือด</p>
              </div>
            </div>
            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 font-black border border-violet-100 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-sm">6</div>
              <div>
                <h4 className="font-bold text-violet-800 text-lg">หลักการ 7 See (กรณีอยู่คนเดียว)</h4>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Self Independent Double Check ตรวจสอบซ้ำด้วยตนเองอย่างเป็นระบบ เว้นช่วงเวลา แล้วตรวจซ้ำเสมือนเป็นคนที่ 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16"></div>
        <h3 className="text-xl font-bold text-indigo-900 mb-8 flex items-center gap-3 relative z-10">
          <Video size={28} className="text-indigo-600" /> สื่อวิดีโอประกอบการเรียนรู้ (Clip VDO)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
          {videoLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-2xl border border-indigo-100 hover:border-indigo-500 hover:shadow-xl transition-all group flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                  <Video size={20} />
                </div>
                <span className="text-sm font-bold text-slate-700">{link.ward}</span>
              </div>
              <ArrowRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </section>

      <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start gap-4">
        <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
        <div>
          <h4 className="text-red-800 font-bold mb-1">หลักการ Independent Double Check (7 See)</h4>
          <p className="text-red-700 text-sm leading-relaxed">
            กรณีพยาบาลขึ้นเวรคนเดียว ให้ตรวจสอบซ้ำด้วยตนเองอย่างเป็นระบบ เว้นช่วงเวลา แล้วตรวจซ้ำเสมือนเป็นคนที่ 2 พร้อมลงลายมือชื่อกำกับ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
