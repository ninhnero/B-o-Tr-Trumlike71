import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Server, 
  Phone, 
  Users, 
  CheckCircle2, 
  Clock, 
  Settings, 
  AlertTriangle, 
  ChevronDown, 
  Copy, 
  MessageSquare, 
  Send, 
  Database, 
  ShieldCheck, 
  Activity, 
  Wifi, 
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Volume2
} from "lucide-react";

// Structure for system checklist
interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  status: "done" | "running" | "pending";
  progress?: number;
}

interface SupportTicket {
  name: string;
  contact: string;
  service: string;
  note: string;
}

export default function App() {
  // Brand Configuration
  const brandName = "TRUMLIKE71.COM";
  const zaloGroupLink = "https://zalo.me/g/eptafacou8q7cd5yievm";
  const hotlineNumber = "092.2222.451";
  const rawHotline = "0922222451";

  // State Management
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"roadmap" | "faq" | "support">("roadmap");
  const [faqIndex, setFaqIndex] = useState<number | null>(null);
  
  // Real-time migration simulator states
  const [progressPercent, setProgressPercent] = useState(89.4);
  const [syncSpeed, setSyncSpeed] = useState(412);
  const [syncedSize, setSyncedSize] = useState(3.58);
  const [totalSize] = useState(4.00);
  const [serverLoad, setServerLoad] = useState(42);

  // Form states
  const [ticket, setTicket] = useState<SupportTicket>({
    name: "",
    contact: "",
    service: "Tài khoản / Số dư",
    note: ""
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [activeLogs, setActiveLogs] = useState<string[]>([
    "Khởi tạo hệ thống máy chủ Cloud Run mới...",
    "Đang liên kết hạ tầng cụm DNS dự phòng...",
    "Đang chuyển hóa Database sang định dạng Cloud Cluster...",
  ]);

  // Support ticket records saved in localStorage
  const [savedTickets, setSavedTickets] = useState<SupportTicket[]>(() => {
    const data = localStorage.getItem("trumlike71_support_tickets");
    return data ? JSON.parse(data) : [];
  });

  // Countdown timer calculation (target state: 08:00 AM of next day / or a fixed hours timer)
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  // Simulation effect for server migration metrics (increases slowly on screen stay)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressPercent(prev => {
        if (prev >= 99.9) return 99.9;
        const add = Math.random() * 0.05 + 0.01;
        return parseFloat((prev + add).toFixed(2));
      });

      setSyncSpeed(prev => {
        const delta = Math.floor(Math.random() * 50) - 25;
        const next = prev + delta;
        return next < 300 ? 300 : next > 520 ? 520 : next;
      });

      setServerLoad(() => Math.floor(Math.random() * 20) + 35);

      // Log updates
      const logTemplates = [
        "Đồng bộ hóa bản ghi ví người dùng...",
        "Tối ưu hóa bảng dịch vụ sub/like...",
        "Chứng chỉ bảo mật SSL đang được di chuyển...",
        "Kiểm tra kết nối SSL API bảo mật...",
        "Xác minh tính ổn định của cụm Database...",
        "Lưu trữ bản backup nén dự phòng an toàn..."
      ];
      if (Math.random() > 0.7) {
        const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
        const timeStr = new Date().toLocaleTimeString("vi-VN", { hour12: false });
        setActiveLogs(prev => [`[${timeStr}] ${randomLog}`, ...prev.slice(0, 4)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Update synced size correlated with percentage
  useEffect(() => {
    const newSynced = (totalSize * progressPercent) / 100;
    setSyncedSize(parseFloat(newSynced.toFixed(2)));
  }, [progressPercent, totalSize]);

  // Real countdown timer decrementing
  useEffect(() => {
    // Generate constant target hour: 08:00 AM next day
    const target = new Date();
    target.setHours(target.getHours() + 10);
    
    const countInterval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(countInterval);
      } else {
        const totalSecs = Math.floor(difference / 1000);
        const hours = Math.floor(totalSecs / 3600);
        const minutes = Math.floor((totalSecs % 3600) / 60);
        const seconds = Math.floor(totalSecs % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(countInterval);
  }, []);

  const handleCopyHotline = () => {
    navigator.clipboard.writeText(rawHotline);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket.name || !ticket.contact) return alert("Vui lòng điền họ tên và thông tin liên hệ Zalo/SĐT.");

    const updated = [ticket, ...savedTickets];
    setSavedTickets(updated);
    localStorage.setItem("trumlike71_support_tickets", JSON.stringify(updated));
    setFormSuccess(true);
    
    // reset form
    setTicket({
      name: "",
      contact: "",
      service: "Tài khoản / Số dư",
      note: ""
    });
  };

  const handleClearTickets = () => {
    setSavedTickets([]);
    localStorage.removeItem("trumlike71_support_tickets");
  };

  // Roadmap details
  const roadmapSteps: RoadmapStep[] = [
    {
      id: 1,
      title: "Sao lưu & Đóng cổng giao dịch cũ",
      description: "Thực hiện snapshot toàn bộ cơ sở dữ liệu và tạm ngưng nạp ví để đảm bảo không mất mát lịch sử ví tiền.",
      status: "done"
    },
    {
      id: 2,
      title: "Chuyển dữ liệu sang Cloud Server mới",
      description: "Đồng bộ hóa 4.0 TB dữ liệu tài khoản và các đơn hàng đang chạy sang hạ tầng thế hệ mới siêu tốc.",
      status: "running",
      progress: Math.floor(progressPercent)
    },
    {
      id: 3,
      title: "Cập nhật định tuyến DNS & SSL toàn cầu",
      description: "Định cấu hình lại DNS của tên miền TRUMLIKE71.COM sang địa chỉ IP máy chủ Cloud mới cực nhanh.",
      status: "pending"
    },
    {
      id: 4,
      title: "Chạy thử nghiệm tải & Kiểm tra bảo mật",
      description: "Kích hoạt bảo vệ Cloudflare Anti-DDoS kép, kiểm thử API tốc độ cao, hoàn tất hoạt động.",
      status: "pending"
    }
  ];

  // FAQ list
  const faqs = [
    {
      q: "Tại sao website TRUMLIKE71.COM lại tiến hành bảo trì nâng cấp?",
      a: "Chúng tôi đang di chuyển toàn bộ cơ sở dữ liệu sang cụm máy chủ Cloud hiệu năng cao mới. Điều này nhằm tối ưu tốc độ phản hồi API nhanh hơn gấp 5 lần, tăng dung lượng chịu tải cho hàng triệu đơn hàng sub/like diễn ra đồng thời không bị trễ."
    },
    {
      q: "Số dư ví và thông tin tài khoản của tôi có bị mất không?",
      a: "Tuyệt đối KHÔNG. Toàn bộ tiền ví, thông tin đăng nhập, đại lý, lịch sử đơn hàng của bạn đã được sao lưu dự phòng an toàn gấp hai lần (double redundancy backup) và được đảm bảo giữ nguyên vẹn 100% khi hệ thống chạy trở lại."
    },
    {
      q: "Khi nào quá trình nâng chuyển đổi máy chủ sẽ kết thúc hoàn toàn?",
      a: "Theo đúng tiến trình, thời gian chạy thử nghiệm và mở khóa giao diện dự kiến sẽ hoàn thành trong khoảng thời gian đếm ngược phía trên (dự kiến hoàn tất vào sáng sớm). Lịch bảo trì cụ thể có thể được cập nhật liên tục tại Group Zalo."
    },
    {
      q: "Các đơn hàng tăng Like, Sub, View cũ của tôi có bị hủy không?",
      a: "Không. Các dịch vụ tương tác đã xếp hàng trên hệ thống máy chủ mạng xã hội (Facebook, TikTok, Instagram...) vẫn sẽ tự động phân phối và chạy tiếp bình thường một cách ổn định."
    },
    {
      q: "Tôi cần liên hệ hỗ trợ gấp thì làm thế nào?",
      a: "Nếu bạn gặp bất kỳ sự cố phát sinh nào hoặc cần hỗ trợ nạp tiền khẩn cấp trong thời gian này, vui lòng tham gia ngay Zalo Group hoặc gọi điện trực tiếp tới Hotline chăm sóc VIP: 092.2222.451 để các kỹ thuật viên tiếp nhận xử lý."
    }
  ];

  return (
    <div id="maintenance_panel" class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden relative grid-bg">
      
      {/* Decorative Blur Backgrounds */}
      <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[130px] animate-pulse-slow pointer-events-none" />
      <div class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[130px] animate-pulse-slow pointer-events-none" />

      {/* Header Bar */}
      <header id="app_header" class="border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/10 flex items-center justify-center">
              <Server className="w-6 h-6 text-white stroke-[2]" />
            </div>
            <div>
              <span class="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">{brandName}</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span class="text-[10px] uppercase tracking-wider font-bold text-amber-400">Đang Chuyển Server</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons Header (Desktop) */}
          <div class="hidden md:flex items-center gap-4">
            <button 
              id="copy_phone_header"
              onClick={handleCopyHotline}
              class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold hover:bg-slate-800 transition text-slate-300"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>SĐT: {hotlineNumber}</span>
              <Copy className="w-3 h-3 text-slate-500 hover:text-white" />
              {copied && <span class="text-[10px] text-emerald-400 ml-1">Đã chép!</span>}
            </button>
            <a 
              id="join_zalo_header"
              href={zaloGroupLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-bold transition shadow-md shadow-cyan-500/5 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Nhận Báo Cáo Zalo</span>
            </a>
          </div>

          {/* Mobile Status Badge */}
          <div class="block md:hidden">
            <span class="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-semibold">
              Bảo trì S1
            </span>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full z-10">
        
        {/* Urgent Announcement Hero Section */}
        <div id="announcement_hero" class="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold mb-6 animate-bounce">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Nâng Cấp Hệ Thống Đại Lý Tự Động Toàn Cầu</span>
          </div>
          
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Nâng Cấp Server Siêu Cấp <br />
            <span class="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">Gấp 5 Lần Tốc Độ</span>
          </h1>
          
          <p class="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Chúng tôi thành thật xin lỗi vì sự gián đoạn này. Hệ thống máy chủ của <strong class="text-white font-semibold">{brandName}</strong> đang tiến hành đồng bộ dữ liệu ví và nâng cấp hạ tầng mạng. Dịch vụ dự kiến sẽ trực tuyến sớm hơn thời gian đếm ngược.
          </p>

          {/* Core Countdown Elements */}
          <div id="countdown_timer" class="grid grid-cols-3 gap-3 max-w-md mx-auto mb-12">
            
            {/* Hours Box */}
            <div class="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl relative shadow-xl overflow-hidden group">
              <div class="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div class="relative z-10">
                <span class="block text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span class="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">Giờ</span>
              </div>
              <div class="absolute bottom-0 inset-x-0 h-1 bg-cyan-500" />
            </div>

            {/* Minutes Box */}
            <div class="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl relative shadow-xl overflow-hidden group">
              <div class="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div class="relative z-10">
                <span class="block text-3xl sm:text-4xl font-extrabold font-mono text-indigo-400 animate-pulse">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span class="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">Phút</span>
              </div>
              <div class="absolute bottom-0 inset-x-0 h-1 bg-indigo-500" />
            </div>

            {/* Seconds Box */}
            <div class="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl relative shadow-xl overflow-hidden group">
              <div class="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div class="relative z-10">
                <span class="block text-3xl sm:text-4xl font-extrabold font-mono text-purple-400">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span class="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">Giây</span>
              </div>
              <div class="absolute bottom-0 inset-x-0 h-1 bg-purple-500" />
            </div>

          </div>

          {/* Quick Action Group Links (Prominent CTAs) */}
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            
            {/* Zalo CTA Box */}
            <a 
              id="huge_zalo_cta"
              href={zaloGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-1/2 flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-600/90 to-blue-700 hover:from-cyan-600 hover:to-blue-600 font-bold text-white shadow-xl shadow-cyan-500/10 cursor-pointer overflow-hidden relative group transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-cyan-500/20"
            >
              <div class="absolute top-[-30px] right-[-30px] w-20 h-20 bg-white/10 rounded-full rotate-45 transform scale-150 group-hover:scale-175 transition-all pointer-events-none" />
              <div class="flex items-center gap-3 relative z-10">
                <div class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-5.5 h-5.5 text-white" />
                </div>
                <div class="text-left">
                  <span class="block text-[11px] font-medium text-cyan-200 uppercase tracking-widest leading-none">Mạng xã hội</span>
                  <span class="block text-sm pt-0.5">Group Zalo Hỗ Trợ</span>
                </div>
              </div>
              <div class="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform relative z-10">
                <ChevronRight className="w-4 h-4" />
              </div>
            </a>

            {/* Hotline Calling Box */}
            <div 
              id="huge_hotline_cta"
              class="w-full sm:w-1/2 flex items-center justify-between p-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 font-bold shadow-xl overflow-hidden relative group transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <div class="flex items-center gap-3">
                <a 
                  id="hotline_dial_action"
                  href={`tel:${rawHotline}`} 
                  class="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform cursor-pointer"
                  title="Gọi ngay hotline"
                >
                  <Phone className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                </a>
                <div class="text-left">
                  <span class="block text-[11px] font-medium text-slate-500 uppercase tracking-widest leading-none">Chăm sóc khách hàng</span>
                  <a 
                    href={`tel:${rawHotline}`} 
                    class="block text-sm pt-0.5 font-extrabold hover:text-cyan-400 text-white transition decoration-cyan-500/40"
                  >
                    Hotline: {hotlineNumber}
                  </a>
                </div>
              </div>

              <button 
                id="copy_phone_main"
                onClick={handleCopyHotline}
                class="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 transition-all cursor-pointer"
                title="Sao chép số"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

          </div>

          {copied && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              class="text-xs text-emerald-400 mt-3 font-semibold space-x-1"
            >
              🎉 Đã sao chép Hotline <strong class="underline">{hotlineNumber}</strong> thành công! Quý đại lý có thể liên hệ trực tiếp.
            </motion.div>
          )}

        </div>

        {/* Dashboard Section */}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column (Roadmap & Status Dashboard - 7 cols) */}
          <div class="lg:col-span-7 space-y-8">
            
            {/* Real-time Infrastructure Monitoring Panel */}
            <div id="telemetry_monitor" class="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-2xl relative overflow-hidden">
              <div class="flex items-center justify-between mb-5">
                <h3 class="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>GIÁM SÁT TIẾN TRÌNH DI TRÚ SERVER S1 (LIVE)</span>
                </h3>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span class="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Hạ tầng sẵn sàng</span>
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                
                <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800/60">
                  <span class="block text-[11px] text-slate-500">Đồng bộ cơ sở dữ liệu</span>
                  <span class="block text-lg font-extrabold font-mono text-cyan-400 mt-1">{progressPercent}%</span>
                  <div class="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div class="bg-cyan-400 h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>

                <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800/60">
                  <span class="block text-[11px] text-slate-500">Tốc độ băng thông</span>
                  <span class="block text-lg font-extrabold font-mono text-indigo-400 mt-1">{syncSpeed} MB/s</span>
                  <span class="block text-[9px] text-indigo-500 mt-1 flex items-center gap-1">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Live update 4s
                  </span>
                </div>

                <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800/60">
                  <span class="block text-[11px] text-slate-500">Dung lượng an toàn</span>
                  <span class="block text-lg font-extrabold font-mono text-purple-400 mt-1">{syncedSize} / {totalSize} TB</span>
                  <span class="block text-[9px] font-bold text-emerald-400 mt-1">Đã mã hóa 100%</span>
                </div>

                <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800/60">
                  <span class="block text-[11px] text-slate-500">Tải lượng CPU máy chủ</span>
                  <span class="block text-lg font-extrabold font-mono text-amber-500 mt-1">{serverLoad}%</span>
                  <span class="block text-[9px] text-slate-500 mt-1">Nhiệt độ: Đạt chuẩn</span>
                </div>

              </div>

              {/* Progress Bar overall */}
              <div class="mb-4">
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-slate-400">Tiến trình tổng thể di chuyển dữ liệu cốt lõi:</span>
                  <span class="text-cyan-400">{progressPercent}%</span>
                </div>
                <div class="w-full h-3.5 bg-slate-950 rounded-full p-0.5 border border-slate-800">
                  <div 
                    class="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-1000 relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <span class="absolute right-1 top-0.5 w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                  </div>
                </div>
              </div>

              {/* Real-time Event System Log Container */}
              <div class="p-3 bg-slate-950 font-mono text-xs text-slate-500 rounded-lg border border-slate-850/80 space-y-1.5 max-h-24 overflow-y-auto">
                {activeLogs.map((log, i) => (
                  <div key={i} class={`flex items-start gap-1 ${i === 0 ? "text-cyan-400/90 font-medium" : "text-slate-500"}`}>
                    <span class="text-cyan-500 select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* TAB SELECTOR for Roadmap or FAQ */}
            <div class="flex border-b border-slate-800/80">
              <button 
                id="tab_btn_roadmap"
                onClick={() => setActiveTab("roadmap")}
                class={`flex items-center gap-2 px-6 py-3.5 font-bold text-sm border-b-2 transition -mb-[2px] cursor-pointer ${
                  activeTab === "roadmap" 
                  ? "border-cyan-500 text-white" 
                  : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Lộ Trình Chuyển Đổi</span>
                <span class="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-bold">4 Bước</span>
              </button>
              
              <button 
                id="tab_btn_faq"
                onClick={() => setActiveTab("faq")}
                class={`flex items-center gap-2 px-6 py-3.5 font-bold text-sm border-b-2 transition -mb-[2px] cursor-pointer ${
                  activeTab === "faq" 
                  ? "border-cyan-500 text-white" 
                  : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Giải Đáp & Ví Tiền</span>
              </button>
            </div>

            {/* Tap Panel Content */}
            <div>
              <AnimatePresence mode="wait">
                {activeTab === "roadmap" && (
                  <motion.div 
                    key="roadmap"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    class="space-y-4"
                  >
                    {roadmapSteps.map((step, idx) => (
                      <div 
                        key={step.id} 
                        class={`p-4 rounded-xl border transition-all ${
                          step.status === "done" 
                            ? "bg-slate-900/30 border-slate-800/50 opacity-80" 
                            : step.status === "running"
                            ? "bg-gradient-to-r from-slate-900 to-indigo-950/20 border-cyan-500/50 shadow-lg shadow-cyan-500/5"
                            : "bg-slate-900/10 border-slate-900/70"
                        }`}
                      >
                        <div class="flex items-start gap-4">
                          
                          {/* Number / Status Circle Indicator */}
                          <div class="mt-0.5">
                            {step.status === "done" ? (
                              <div class="w-7 h-7 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/30">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                            ) : step.status === "running" ? (
                              <div class="w-7 h-7 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center border border-cyan-500/40 animate-pulse">
                                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                              </div>
                            ) : (
                              <div class="w-7 h-7 bg-slate-900 text-slate-500 rounded-full flex items-center justify-center border border-slate-800 text-xs font-bold">
                                0{step.id}
                              </div>
                            )}
                          </div>

                          <div class="flex-grow">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <h4 class={`font-bold text-sm sm:text-base ${step.status === "done" ? "text-slate-400 line-through" : "text-white"}`}>
                                {step.title}
                              </h4>
                              {step.status === "running" && (
                                <span class="px-2 py-0.5 bg-cyan-950 text-cyan-400 text-[10px] font-bold rounded-full w-fit">
                                  Đang đồng bộ - {step.progress}%
                                </span>
                              )}
                              {step.status === "pending" && (
                                <span class="px-2 py-0.5 bg-slate-950 text-slate-500 text-[10px] font-bold rounded-full border border-slate-900 w-fit">
                                  Chờ đợi
                                </span>
                              )}
                              {step.status === "done" && (
                                <span class="text-[11px] font-semibold text-emerald-400">Hoàn tất</span>
                              )}
                            </div>
                            
                            <p class={`text-xs sm:text-sm mt-1 leading-relaxed ${step.status === "done" ? "text-slate-500" : "text-slate-400"}`}>
                              {step.description}
                            </p>
                          </div>

                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "faq" && (
                  <motion.div 
                    key="faq"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    class="space-y-3"
                  >
                    <div class="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl text-xs sm:text-sm flex items-start gap-2.5 mb-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong class="font-bold">HƯỚNG DẪN BẢO VỆ VÍ:</strong> Vui lòng tuyệt đối không thực hiện giao dịch nạp tiền ATM/MOMO qua các số tài khoản ngân hàng cũ của hệ thống khi không có thông báo trực tiếp tải từ Group Đại lý Zalo. Chúng tôi đang kiểm thử bảo mật định tuyến nạp ví tự động.
                      </div>
                    </div>

                    {faqs.map((faq, index) => (
                      <div key={index} class="border border-slate-850 bg-slate-900/30 rounded-xl transition overflow-hidden">
                        <button 
                          onClick={() => setFaqIndex(faqIndex === index ? null : index)}
                          class="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm hover:bg-slate-900/50 transition cursor-pointer"
                        >
                          <span class="text-slate-200">{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${faqIndex === index ? "rotate-180 text-cyan-400" : ""}`} />
                        </button>
                        
                        {faqIndex === index && (
                          <div class="px-4 pb-4 pt-1 border-t border-slate-850 text-slate-400 text-xs sm:text-sm leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column (Support Interaction Ticket & General info - 5 cols) */}
          <div class="lg:col-span-12 xl:col-span-5 space-y-8 lg:mt-0 xl:col-start-8">
            
            {/* Interactive Support Ticket Submission (Directly record) */}
            <div id="support_ticket_panel" class="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
              <div class="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                <Wifi className="w-3 h-3 animate-pulse" />
                <span>Tiếp nhận 24/7</span>
              </div>

              <h3 class="font-extrabold text-lg text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Gửi Yêu Cầu Gấp</span>
              </h3>
              
              <p class="text-xs text-slate-400 mb-5 leading-relaxed">
                Đăng ký ngay thông tin tài khoản nếu bạn cần đối soát giao dịch số dư ví, nạp hoặc lỗi xử lý dòng tiền khẩn cấp. Kỹ sư TRUMLIKE71 sẽ trực tiếp rà soát và phản hồi qua số Zalo của bạn.
              </p>

              {formSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  class="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-center space-y-3"
                >
                  <div class="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 class="font-bold text-sm">Gửi Yêu Cầu Thành Công!</h4>
                    <p class="text-[11px] text-emerald-300 mt-1">Yêu cầu trợ giúp đã được lưu cục bộ và xếp hàng xử lý tự động sang cơ sở dữ liệu mới.</p>
                  </div>
                  <div class="pt-2">
                    <button 
                      onClick={() => setFormSuccess(false)}
                      class="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer"
                    >
                      Báo cáo thêm vấn đề khác
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSupportSubmit} class="space-y-4">
                  
                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Họ Tên Quý Khách <span class="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={ticket.name}
                      onChange={e => setTicket({ ...ticket, name: e.target.value })}
                      class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">SĐT Zalo Liên Hệ <span class="text-rose-500">*</span></label>
                      <input 
                        type="tel" 
                        required
                        placeholder="Số điện thoại"
                        value={ticket.contact}
                        onChange={e => setTicket({ ...ticket, contact: e.target.value })}
                        class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Hạng Mục Lỗi</label>
                      <select 
                        value={ticket.service}
                        onChange={e => setTicket({ ...ticket, service: e.target.value })}
                        class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                      >
                        <option value="Tài khoản / Số dư">Tài khoản / Số dư</option>
                        <option value="Nạp tiền MOMO/ATM">Nạp tiền MOMO/ATM</option>
                        <option value="Đơn hàng đang chạy">Đơn hàng đang chạy</option>
                        <option value="Đóng góp dịch vụ">Đại lý VIP / API</option>
                        <option value="Khác">Vấn đề khác kỹ thuật</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Chi Tiết Vấn Đề Gặp Phải</label>
                    <textarea 
                      rows={3}
                      placeholder="Mô tả chi tiết tài khoản, số dư gặp sự cố hay nội dung cần xử lý khẩn cấp..."
                      value={ticket.note}
                      onChange={e => setTicket({ ...ticket, note: e.target.value })}
                      class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    class="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Đơn Yêu Cầu Hỗ Trợ</span>
                  </button>

                </form>
              )}

              {/* Saved local tickets list */}
              {savedTickets.length > 0 && (
                <div class="mt-6 pt-5 border-t border-slate-800">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-bold text-slate-300">YÊU CẦU ĐÃ GỬI CỦA BẠN:</span>
                    <button 
                      onClick={handleClearTickets}
                      class="text-[10px] text-rose-400 hover:underline cursor-pointer"
                    >
                      Dọn dẹp lịch sử
                    </button>
                  </div>
                  
                  <div class="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {savedTickets.map((tc, key) => (
                      <div key={key} class="p-2 bg-slate-950 border border-slate-850 rounded-lg text-xs space-y-1">
                        <div class="flex items-center justify-between font-semibold">
                          <span class="text-slate-200">{tc.name}</span>
                          <span class="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 rounded">{tc.service}</span>
                        </div>
                        <p class="text-slate-400 text-[11px]">SĐT: <span class="text-slate-300 font-mono">{tc.contact}</span></p>
                        {tc.note ? <p class="text-slate-500 text-[11.5px] italic">“ {tc.note} ”</p> : null}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Quick API status widget info */}
            <div id="api_status_widget" class="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Trạng thái dịch vụ kết nối (Core APIs)</span>
              </h4>

              <div class="grid grid-cols-2 gap-3 text-xs">
                
                <div class="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-indigo-950/10">
                  <span class="text-slate-400">Facebook API</span>
                  <span class="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 rounded font-semibold animate-pulse">Bảo trì</span>
                </div>

                <div class="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-indigo-950/10">
                  <span class="text-slate-400">TikTok Engine</span>
                  <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 rounded font-semibold">Ổn định</span>
                </div>

                <div class="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-indigo-950/10">
                  <span class="text-slate-400">Instagram API</span>
                  <span class="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 rounded font-semibold animate-pulse">Di trú</span>
                </div>

                <div class="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-indigo-950/10">
                  <span class="text-slate-400">Auto Banking</span>
                  <span class="text-[10px] text-rose-500 bg-rose-500/10 px-1.5 rounded font-semibold">Tạm dừng</span>
                </div>

                <div class="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-indigo-950/10">
                  <span class="text-slate-400">Youtube Views</span>
                  <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 rounded font-semibold">Ổn định</span>
                </div>

                <div class="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-indigo-950/10">
                  <span class="text-slate-400">Telegram Bot</span>
                  <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 rounded font-semibold">Ổn định</span>
                </div>

              </div>
              
              <div class="flex gap-2 p-3 bg-cyan-950/20 border border-cyan-950/50 rounded-xl text-[11px] text-cyan-300 leading-relaxed">
                <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 animate-pulse" />
                <span>
                  Hạ tầng máy chủ mới sử dụng công nghệ băng thông không giới hạn, đảm bảo các tác vụ API chạy nhanh tuyệt đối ngay sau khi di chuyển.
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Support channels badges / Trust block */}
        <div id="trust_partner_banner" class="border-t border-slate-900 pt-8 mt-12 text-center">
          <p class="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4">ĐỐI TÁC DỊCH VỤ VÀ GIAO DỊCH AN TOÀN CAO</p>
          
          <div class="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-30 grayscale hover:grayscale-0 hover:opacity-75 transition-all duration-300">
            <span class="text-sm font-extrabold text-white select-none">DATABASE ENCRYP</span>
            <span class="text-sm font-extrabold text-white select-none">CLOUDFLARE SSL</span>
            <span class="text-sm font-extrabold text-white select-none">MOMO SÉCURITÉ</span>
            <span class="text-sm font-extrabold text-white select-none">PCI-DSS COMPLIANT</span>
          </div>
        </div>

      </main>

      {/* Footer Area */}
      <footer id="app_footer" class="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          <div class="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-slate-500 font-semibold">
            <a href={zaloGroupLink} target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400 transition flex items-center gap-1">
              <span>Group Zalo Cập Nhật</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span class="text-slate-800">|</span>
            <a href={`tel:${rawHotline}`} class="hover:text-cyan-400 transition">Hotline: {hotlineNumber}</a>
            <span class="text-slate-800">|</span>
            <span class="text-slate-600">Hỗ trợ khẩn cấp 24/7</span>
          </div>

          <p class="text-slate-600">
            &copy; {new Date().getFullYear()} <span class="text-slate-500 font-bold">{brandName}</span>. Bản Quyền Giao Diện Được Thiết Kế Cho Mục ĐÍch Nâng Cấp Hệ Thống Server Độc Quyền.
          </p>

        </div>
      </footer>

    </div>
  );
}
