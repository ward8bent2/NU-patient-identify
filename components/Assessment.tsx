
import React, { useState, useEffect } from 'react';
import { AssessmentQuestion } from '../types';
import { analyzeAssessmentResult } from '../services/geminiService';
import { 
  CheckCircle, 
  ArrowRight, 
  RotateCcw, 
  BarChart2, 
  ShieldCheck, 
  UserCheck, 
  Beaker, 
  Stethoscope, 
  Droplet, 
  AlertCircle,
  Trophy,
  Medal,
  Star,
  Zap
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Badge } from '../types';

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

const BADGES: Badge[] = [
  { id: 'champion', name: 'Safety Champion', description: 'ปฏิบัติครบถ้วน 100%', icon: 'Trophy', color: 'text-yellow-500' },
  { id: 'master', name: 'Compliance Master', description: 'ปฏิบัติถูกต้องมากกว่า 90%', icon: 'Medal', color: 'text-indigo-500' },
  { id: 'guardian', name: 'Safety Guardian', description: 'ปฏิบัติถูกต้องมากกว่า 80%', icon: 'ShieldCheck', color: 'text-emerald-500' },
  { id: 'star', name: 'Rising Star', description: 'เริ่มต้นการเรียนรู้ความปลอดภัย', icon: 'Star', color: 'text-amber-500' },
];

// Questions derived directly from the OCR Compliance Checklist (SP-BQP-002-205-03)
// Expanded to 12 points to match the user's Google Sheet structure
const COMPLIANCE_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "1. ขั้นตอนทั่วไป: คุณได้สแกน Barcode และใช้ตัวบ่งชี้อย่างน้อย 2 อย่าง (ชื่อ-สกุล, วันเกิด, อายุ หรือเลขบัตรประชาชน) หรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 2,
    question: "2. การรับใหม่/รับย้าย: คุณได้สแกน QR Code จากป้ายข้อมือทุกครั้งเพื่อยืนยันตัวตนหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 3,
    question: "3. ห้องแล็บ (การบ่งชี้): คุณได้ตรวจสอบความถูกต้องกับคำสั่งแพทย์และจัดทำสติ๊กเกอร์ระบุตัวตนได้ถูกต้องหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 4,
    question: "4. ห้องแล็บ (การตรวจสอบ): คุณได้สแกน QR Code เพื่อตรวจสอบความถูกต้องกับป้ายข้อมือและอุปกรณ์เก็บสิ่งส่งตรวจหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 5,
    question: "5. ห้องแล็บ (การเก็บสิ่งส่งตรวจ): คุณได้ใส่สิ่งส่งตรวจลงในหลอด 'ต่อหน้าผู้ป่วย' และตรวจสอบชื่อ-สกุลซ้ำอีกครั้งหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 6,
    question: "6. ผ่าตัด/หัตถการ: คุณได้สแกน QR Code ระบุตัวตนเทียบกับป้ายข้อมือและแฟ้มประวัติก่อนเริ่มหัตถการทุกครั้งหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 7,
    question: "7. การให้ยา: คุณได้ถามชื่อ-นามสกุล วันเดือนปีเกิด และตรวจสอบร่วมกับ MAR (Medical Administration Record) ทุกครั้งหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 8,
    question: "8. จองเลือด (ระบบ HIS): คุณได้ตรวจสอบคำสั่งใน HIS และพิมพ์ใบขอเลือดพร้อมลงลายมือชื่อผู้คีย์และผู้ตรวจสอบหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 9,
    question: "9. จองเลือด (การเตรียม): คุณได้เตรียมหลอดเลือดและสอบถามชื่อ-สกุล/วันเกิด จากผู้ป่วยหรือญาติก่อนเจาะเลือดหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 10,
    question: "10. จองเลือด (การเจาะ): คุณได้เจาะเลือดและใส่หลอดต่อหน้าผู้ป่วย พร้อมลงชื่อในสติ๊กเกอร์ข้างหลอดเลือดทุกครั้งหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 11,
    question: "11. การเบิกเลือด: คุณได้ตรวจสอบชนิด จำนวน และชื่อ-สกุล HN ให้ถูกต้องครบถ้วนก่อนคีย์เบิกในระบบคอมพิวเตอร์หรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 12,
    question: "12. การให้เลือด: คุณได้ทำ Independent Double Check (2 คน) หรือ 7 See และสแกน QR ก่อนเริ่มให้เลือดทุกครั้งหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  }
];

const Assessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for Pre-assessment form
  const [userName, setUserName] = useState('');
  const [unit, setUnit] = useState('');
  const [position, setPosition] = useState('');
  const [testerName, setTesterName] = useState('');
  const [userExperience, setUserExperience] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [points, setPoints] = useState(0);

  // Auto-submit when assessment is finished
  useEffect(() => {
    if (showResult && submitStatus === 'idle' && !isSubmitting) {
      handleSubmit();
    }
  }, [showResult]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName && unit && position && testerName && userExperience) {
      setCurrentStep(0);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (currentStep < COMPLIANCE_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateRawScore = () => {
    let score = 0;
    answers.forEach((ans) => {
      if (ans === 0) score += 1;
      else if (ans === 1) score += 0.5;
    });
    return score;
  };

  const calculateCompliancePercentage = () => {
    let totalScore = 0;
    let validAnswersCount = 0;

    answers.forEach((ans) => {
      if (ans === 3) return; // Skip "ไม่มีข้อมูล"
      
      validAnswersCount++;
      if (ans === 0) totalScore += 100;
      else if (ans === 1) totalScore += 50;
    });

    if (validAnswersCount === 0) return 0;
    return Math.round(totalScore / validAnswersCount);
  };

  const calculatePointsAndBadges = (percentage: number) => {
    let earnedPoints = percentage * 10;
    if (percentage === 100) earnedPoints += 500; // Bonus for perfect score
    
    const newBadges: Badge[] = [];
    if (percentage === 100) newBadges.push(BADGES[0]);
    if (percentage >= 90) newBadges.push(BADGES[1]);
    if (percentage >= 80) newBadges.push(BADGES[2]);
    if (percentage > 0) newBadges.push(BADGES[3]);

    setPoints(earnedPoints);
    setEarnedBadges(newBadges);
    return { earnedPoints, newBadges };
  };

  const getWrongAnswers = () => {
    return answers
      .map((ans, idx) => {
        if (ans === 1 || ans === 2) {
          return `ข้อ ${idx + 1}: ${COMPLIANCE_QUESTIONS[idx].options[ans]}`;
        }
        return null;
      })
      .filter(Boolean) as string[];
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const rawScore = calculateRawScore();
    const complianceRate = calculateCompliancePercentage();
    
    // ดึงเฉพาะหัวข้อข้อที่พยาบาลทำผิด/ทำไม่ครบ มาใส่ในช่อง "จุดที่ต้องพัฒนา"
    const improvementPoints = answers
      .map((ans, idx) => (ans !== 0 ? COMPLIANCE_QUESTIONS[idx].question.split('.')[0] : null))
      .filter(Boolean)
      .join(", ");

    try {
      // 1. เรียก AI มาวิเคราะห์ (ใช้ฟังก์ชันที่คุณมีอยู่แล้ว)
      const aiResponse = await analyzeAssessmentResult({
        userName,
        testerName,
        unit,
        position,
        experience: parseInt(userExperience) || 0,
        score: rawScore,
        wrongAnswers: getWrongAnswers()
      });

      const parsedAnalysis = JSON.parse(aiResponse);
      setAiAnalysis(parsedAnalysis);

      // 2. ส่งข้อมูลไปที่ Google Sheets ตาม URL ที่ให้มา
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          traineeName: userName,           // ไปลงช่อง B
          department: unit,               // ไปลงช่อง C
          position: position,             // ไปลงช่อง D
          evaluatorName: testerName,       // ไปลงช่อง E
          experienceYears: userExperience, // ไปลงช่อง F
          totalScore: `${rawScore}/12`,    // ไปลงช่อง G
          improvementPoints: improvementPoints || "ไม่มี", // ไปลงช่อง H
          aiSuggestions: parsedAnalysis.ai_advice         // ไปลงช่อง I
        }),
      });

      setSubmitStatus('success');
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const complianceRate = calculateCompliancePercentage();

  const chartData = [
    { name: 'สอดคล้อง (Compliance)', value: complianceRate, color: '#6366f1' }, // indigo-500
    { name: 'ความเสี่ยง (Gap)', value: 100 - complianceRate, color: '#f1f5f9' }, // slate-100
  ];

  const getStepIcon = (index: number) => {
    switch(index) {
      case 0: return <UserCheck size={24} />;
      case 1: return <ShieldCheck size={24} />;
      case 2: return <Beaker size={24} />;
      case 3: return <Stethoscope size={24} />;
      case 4: return <AlertCircle size={24} />;
      case 5: return <Droplet size={24} />;
      case 6: return <UserCheck size={24} />;
      case 7: return <ShieldCheck size={24} />;
      case 8: return <Beaker size={24} />;
      case 9: return <Stethoscope size={24} />;
      case 10: return <AlertCircle size={24} />;
      case 11: return <Droplet size={24} />;
      default: return <CheckCircle size={24} />;
    }
  };

  // Pre-assessment Form
  if (currentStep === -1) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 animate-fadeIn relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16"></div>
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <UserCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">ข้อมูลผู้รับการประเมิน</h2>
            <p className="text-slate-500">โปรดระบุข้อมูลเพื่อบันทึกผลการประเมิน</p>
          </div>

          <form onSubmit={handleStart} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">ชื่อ-นามสกุล ผู้รับการประเมิน</label>
              <input 
                required
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="ระบุชื่อ-นามสกุล"
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">หน่วยงาน</label>
                <input 
                  required
                  type="text" 
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="เช่น ศัลยกรรมชาย"
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">ตำแหน่ง</label>
                <input 
                  required
                  type="text" 
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="เช่น พยาบาลวิชาชีพ"
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">ชื่อเจ้าหน้าที่ผู้ประเมิน</label>
              <input 
                required
                type="text" 
                value={testerName}
                onChange={(e) => setTesterName(e.target.value)}
                placeholder="ระบุชื่อเจ้าหน้าที่"
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">อายุงาน (ปี)</label>
              <input 
                required
                type="number" 
                min="0"
                max="60"
                value={userExperience}
                onChange={(e) => setUserExperience(e.target.value)}
                placeholder="ระบุอายุงานเป็นตัวเลข"
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              เริ่มการประเมิน
            </button>
          </form>
        </div>
      </div>
    );
  }

  const getBadgeIcon = (iconName: string, color: string) => {
    switch(iconName) {
      case 'Trophy': return <Trophy className={color} size={24} />;
      case 'Medal': return <Medal className={color} size={24} />;
      case 'ShieldCheck': return <ShieldCheck className={color} size={24} />;
      case 'Star': return <Star className={color} size={24} />;
      default: return <Zap className={color} size={24} />;
    }
  };

  if (showResult) {
    return (
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 animate-fadeIn max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32"></div>
        <header className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <BarChart2 size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">ดัชนีความสอดคล้อง (Compliance Index)</h2>
          <p className="text-slate-500 font-medium">ผู้ประเมิน: {userName} (อายุงาน: {userExperience} ปี)</p>
          
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="bg-amber-50 px-4 py-2 rounded-full border border-amber-100 flex items-center gap-2">
              <Zap className="text-amber-500" size={18} />
              <span className="font-bold text-amber-700">{points} Points Earned</span>
            </div>
          </div>
        </header>

        {/* Badges Section */}
        {earnedBadges.length > 0 && (
          <div className="mb-10 relative z-10">
            <h4 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Badges Earned</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 animate-bounce-subtle">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                    {getBadgeIcon(badge.icon, badge.color)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{badge.name}</p>
                    <p className="text-[10px] text-slate-400">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-10 items-center mb-10 relative z-10">
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-5xl font-black text-slate-800 tracking-tighter">{complianceRate}%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Compliance</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border-2 ${complianceRate >= 90 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-center gap-3 mb-3">
                {complianceRate >= 90 ? <ShieldCheck className="text-emerald-600" /> : <AlertCircle className="text-amber-600" />}
                <h4 className={`font-bold ${complianceRate >= 90 ? 'text-emerald-800' : 'text-amber-800'}`}>
                  {complianceRate >= 90 ? 'ระดับความปลอดภัยสูงมาก' : 'ต้องการการปรับปรุงพฤติกรรม'}
                </h4>
              </div>
              <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                {aiAnalysis ? (
                  <>
                    <div>
                      <p className="font-bold text-slate-800">ประเด็นที่ควรพัฒนา:</p>
                      <p>{aiAnalysis.improvement}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">คำแนะนำเชิงลึกจาก AI:</p>
                      <p>{aiAnalysis.ai_advice}</p>
                    </div>
                  </>
                ) : (
                  <p>กำลังประมวลผลคำแนะนำจาก AI...</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              {isSubmitting && (
                <div className="p-4 bg-indigo-50 text-indigo-700 rounded-2xl text-center font-bold flex items-center justify-center gap-2 animate-pulse">
                  <RotateCcw className="animate-spin" size={20} /> กำลังบันทึกข้อมูลอัตโนมัติ...
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl text-center font-bold flex items-center justify-center gap-2">
                  <CheckCircle size={20} /> บันทึกข้อมูลลง Google Sheet สำเร็จ
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-rose-100 text-rose-700 rounded-2xl text-center font-bold flex flex-col gap-2">
                  <span>เกิดข้อผิดพลาดในการบันทึกข้อมูล</span>
                  <button 
                    onClick={handleSubmit}
                    className="text-xs underline font-normal hover:text-rose-900 transition-colors"
                  >
                    ลองใหม่อีกครั้ง
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
          <button 
            onClick={() => {
              setCurrentStep(-1);
              setAnswers([]);
              setShowResult(false);
              setSubmitStatus('idle');
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95"
          >
            <RotateCcw size={20} />
            เริ่มต้นประเมินใหม่
          </button>
          <p className="text-[10px] text-slate-400 max-w-[200px] text-center sm:text-left font-medium">
            *ผลการประเมินนี้อ้างอิงจาก Compliance Checklist งานพยาบาลศัลยกรรม NUH
          </p>
        </div>
      </div>
    );
  }

  const question = COMPLIANCE_QUESTIONS[currentStep];

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Self-Assessment Tool</h2>
        <p className="text-slate-500 font-medium">ตรวจสอบความสอดคล้องตามมาตรฐาน (SOP-SP-BQP-002-205-03)</p>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              {getStepIcon(currentStep)}
            </div>
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Section {currentStep + 1}</p>
              <p className="text-slate-400 text-xs font-bold uppercase">Compliance Audit</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-slate-800">{currentStep + 1}</span>
            <span className="text-slate-300 font-bold"> / {COMPLIANCE_QUESTIONS.length}</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200 shadow-inner">
          <div 
            className="bg-indigo-600 h-full transition-all duration-700 ease-out" 
            style={{ width: `${((currentStep + 1) / COMPLIANCE_QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-indigo-900/5 border border-slate-50 animate-slideUp relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
        <h3 className="text-2xl font-bold text-slate-800 mb-10 leading-snug relative z-10">
          {question.question}
        </h3>

        <div className="space-y-4 relative z-10">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-6 rounded-[1.5rem] border-2 transition-all duration-300 flex items-center justify-between group active:scale-[0.98] ${
                index === 0 
                ? 'bg-indigo-50/30 border-slate-100 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white' 
                : 'bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <span className="font-bold text-lg">{option}</span>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors group-hover:scale-110 ${
                index === 0 ? 'border-indigo-200 group-hover:border-white' : 'border-slate-200'
              }`}>
                <ArrowRight size={16} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-center gap-2 text-slate-400">
        <ShieldCheck size={14} className="text-indigo-400" />
        <p className="text-[10px] font-bold uppercase tracking-widest">Data Analysis & Safety Verification System</p>
      </div>
    </div>
  );
};

export default Assessment;
