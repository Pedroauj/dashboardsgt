import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  DollarSign,
  LayoutDashboard,
  Menu,
  Phone,
  TrendingDown,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease` }}>
      {children}
    </div>
  );
}

const barHeights = [52, 68, 58, 75, 62, 82, 71, 100];

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company) return;
    setSubmitted(true);
    setTimeout(() => { onClose(); setSubmitted(false); setName(""); setEmail(""); setCompany(""); }, 2200);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-md rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,26,53,0.97)_0%,rgba(10,16,36,0.99)_100%)] p-8 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-500 transition-colors hover:text-white"><X className="h-5 w-5" /></button>
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10"><CheckCircle2 className="h-7 w-7 text-cyan-300" /></div>
            <h3 className="font-['Syne'] text-xl font-bold text-white">Solicitação recebida!</h3>
            <p className="text-sm text-slate-400">Nossa equipe entrará em contato em breve para agendar a demonstração.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="font-['Syne'] text-xl font-bold text-white">Agendar demonstração</h3>
              <p className="mt-1 text-sm text-slate-400">Preencha os dados e nossa equipe entra em contato.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Nome completo", value: name, set: setName, placeholder: "Seu nome", type: "text" },
                { label: "E-mail corporativo", value: email, set: setEmail, placeholder: "voce@empresa.com", type: "email" },
                { label: "Empresa", value: company, set: setCompany, placeholder: "Nome da empresa", type: "text" },
              ].map(({ label, value, set, placeholder, type }) => (
                <div key={label} className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</label>
                  <input type={type} required value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder} className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all hover:border-white/20 focus:border-cyan-400/40 focus:bg-white/[0.08]" />
                </div>
              ))}
              <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/15 text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-300/30 hover:bg-cyan-400/20 cursor-pointer">
                Solicitar demonstração <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-[11px] text-slate-600">
                Já tem uma conta?{" "}
                <button type="button" onClick={() => { onClose(); navigate("/login"); }} className="text-cyan-400 underline-offset-2 hover:underline cursor-pointer bg-transparent border-none">Fazer login</button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const featuresRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLElement>(null);
  const depoimentosRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(ellipse_at_70%_15%,rgba(14,165,233,0.1),transparent_45%),radial-gradient(ellipse_at_50%_80%,rgba(16,185,129,0.07),transparent_40%)]" />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* NAV */}
      <nav className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-[5vw] transition-all duration-300 ${scrolled ? "h-[64px] border-b border-white/[0.06] bg-[rgba(2,6,23,0.85)] backdrop-blur-xl" : "h-[72px] bg-transparent"}`}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer" style={{ fontFamily: "'Syne', sans-serif" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10"><Activity className="h-4 w-4 text-cyan-300" /></div>
          <span className="text-[16px] font-bold tracking-tight text-white">Executive Insights</span>
        </button>
        <ul className="hidden items-center gap-8 list-none md:flex">
          {[{ label: "Funcionalidades", ref: featuresRef }, { label: "Indicadores", ref: metricsRef }, { label: "Depoimentos", ref: depoimentosRef }].map(({ label, ref }) => (
            <li key={label}><button onClick={() => scrollTo(ref)} className="text-[13.5px] text-slate-400 transition-colors hover:text-white bg-transparent border-none cursor-pointer">{label}</button></li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <button onClick={() => navigate("/login")} className="text-[13px] font-semibold text-slate-400 transition-colors hover:text-white bg-transparent border-none cursor-pointer" style={{ fontFamily: "'Syne', sans-serif" }}>Entrar</button>
          <button onClick={() => setDemoOpen(true)} className="rounded-[10px] border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-[13px] font-semibold text-cyan-300 transition-all hover:bg-cyan-400/15 cursor-pointer" style={{ fontFamily: "'Syne', sans-serif" }}>Solicitar Acesso</button>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 md:hidden">
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[#020617] px-6 pt-24 pb-8 md:hidden">
          <ul className="flex flex-col gap-6 list-none">
            {[{ label: "Funcionalidades", ref: featuresRef }, { label: "Indicadores", ref: metricsRef }, { label: "Depoimentos", ref: depoimentosRef }].map(({ label, ref }) => (
              <li key={label}><button onClick={() => scrollTo(ref)} className="text-2xl font-bold text-white bg-transparent border-none cursor-pointer" style={{ fontFamily: "'Syne', sans-serif" }}>{label}</button></li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3">
            <button onClick={() => { navigate("/login"); setMobileMenuOpen(false); }} className="h-12 w-full rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white cursor-pointer">Entrar</button>
            <button onClick={() => { setDemoOpen(true); setMobileMenuOpen(false); }} className="h-12 w-full rounded-xl border border-cyan-400/20 bg-cyan-500/15 text-sm font-semibold text-cyan-300 cursor-pointer">Solicitar Acesso</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-[5vw] pb-20 pt-32 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-300" style={{ animation: "fadeUp 0.6s ease both" }}>
          <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" /></span>
          Inteligência Financeira em Tempo Real
        </div>
        <h1 className="max-w-[900px] leading-[1.02] tracking-[-0.04em] text-white" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 800, animation: "fadeUp 0.7s 0.1s ease both", opacity: 0, animationFillMode: "forwards" }}>
          Decisões melhores com{" "}
          <span style={{ background: "linear-gradient(135deg, #22d3ee 0%, #38bdf8 40%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>dados precisos</span>
        </h1>
        <p className="mt-6 max-w-[540px] font-light leading-relaxed text-slate-400" style={{ fontSize: "clamp(15px, 1.8vw, 18px)", animation: "fadeUp 0.7s 0.2s ease both", opacity: 0, animationFillMode: "forwards" }}>
          O Executive Insights transforma dados financeiros complexos em painéis claros e acionáveis — feito para líderes que não têm tempo a perder.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animation: "fadeUp 0.7s 0.3s ease both", opacity: 0, animationFillMode: "forwards" }}>
          <button onClick={() => setDemoOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/20 to-sky-500/15 px-7 py-3.5 text-sm font-semibold text-cyan-200 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)] cursor-pointer" style={{ fontFamily: "'Syne', sans-serif" }}>
            <ArrowRight className="h-4 w-4" /> Solicitar demonstração
          </button>
          <button onClick={() => scrollTo(featuresRef)} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:border-white/18 hover:text-white cursor-pointer" style={{ fontFamily: "'Syne', sans-serif" }}>
            Ver funcionalidades <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Mockup */}
        <div className="relative mt-16 w-full max-w-[1000px]" style={{ animation: "fadeUp 0.9s 0.4s ease both", opacity: 0, animationFillMode: "forwards" }}>
          <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,26,53,0.92)_0%,rgba(10,16,36,0.98)_100%)] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">Dashboard — Abril 2026</span>
            </div>
            <div className="grid grid-cols-2 gap-3.5 p-5 sm:grid-cols-4">
              {[{ label: "Faturamento", value: "R$ 4,2M", delta: "+12,4%", pos: true }, { label: "Margem Bruta", value: "38,7%", delta: "+2,1 p.p.", pos: true }, { label: "Inadimplência", value: "3,1%", delta: "+0,4 p.p.", pos: false }, { label: "Saldo Líquido", value: "R$ 892K", delta: "Fluxo positivo", pos: true }].map(({ label, value, delta, pos }) => (
                <div key={label} className="rounded-[14px] border border-white/[0.07] bg-white/[0.03] p-4">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</div>
                  <div className="font-['Syne'] text-[18px] font-bold leading-none tracking-tight text-white">{value}</div>
                  <div className={`mt-2 flex items-center gap-1 text-[11px] font-medium ${pos ? "text-emerald-400" : "text-red-400"}`}>
                    {pos ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{delta}
                  </div>
                </div>
              ))}
              <div className="col-span-2 rounded-[14px] border border-white/[0.06] bg-white/[0.02] p-4 sm:col-span-4">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">Receita mensal — últimos 8 meses</div>
                <div className="flex h-[80px] items-end gap-1.5">
                  {barHeights.map((h, i) => (
                    <div key={i} className="flex-1 origin-bottom rounded-t-[3px]" style={{ height: `${h}%`, background: i === barHeights.length - 1 ? "linear-gradient(180deg,rgba(34,211,238,0.85) 0%,rgba(34,211,238,0.2) 100%)" : "linear-gradient(180deg,rgba(34,211,238,0.45) 0%,rgba(34,211,238,0.1) 100%)", animation: `barGrow 1.2s ${0.05 * i}s ease both` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <Reveal className="border-y border-white/[0.05] px-[5vw] py-12 text-center">
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Usado por empresas que valorizam dados</p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {["Construtech", "VitaFarma", "Grupo Meridian", "LogiPrime", "SteelBr", "Nexora"].map((name) => (
            <span key={name} className="font-['Syne'] text-[14px] font-bold text-slate-600 transition-colors hover:text-slate-400">{name}</span>
          ))}
        </div>
      </Reveal>

      {/* FEATURES */}
      <section ref={featuresRef} className="px-[5vw] py-24">
        <Reveal><div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400" style={{ fontFamily: "'Syne', sans-serif" }}>Funcionalidades</div></Reveal>
        <Reveal delay={0.05}><h2 className="mb-4 max-w-[560px] leading-[1.05] tracking-[-0.04em] text-white" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 800 }}>Tudo que você precisa <span style={{ color: "#22d3ee" }}>num único painel</span></h2></Reveal>
        <Reveal delay={0.1}><p className="max-w-[500px] font-light leading-relaxed text-slate-400" style={{ fontSize: 15 }}>Do fluxo de caixa à inadimplência, do contas a pagar ao contas a receber — visibilidade total da saúde financeira da sua empresa.</p></Reveal>
        <div className="mt-14 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <LayoutDashboard className="h-5 w-5 text-cyan-300" />, title: "Dashboard Executivo", desc: "Visão consolidada de todos os indicadores financeiros em tempo real, com KPIs que realmente importam para a tomada de decisão.", action: () => navigate("/login"), actionLabel: "Ver dashboard →" },
            { icon: <TrendingUp className="h-5 w-5 text-cyan-300" />, title: "Contas a Receber", desc: "Acompanhe o pipeline de recebíveis, monitore vencimentos e identifique inadimplência antes que ela impacte seu fluxo de caixa.", action: () => navigate("/login"), actionLabel: "Ver recebíveis →" },
            { icon: <Clock className="h-5 w-5 text-cyan-300" />, title: "Contas a Pagar", desc: "Gestão completa de obrigações financeiras com alertas proativos de vencimento e análise de concentração de fornecedores.", action: () => navigate("/login"), actionLabel: "Ver pagamentos →" },
            { icon: <DollarSign className="h-5 w-5 text-cyan-300" />, title: "Fluxo de Caixa", desc: "Projeções de saldo, análise de entradas e saídas e gestão de liquidez para garantir que a operação nunca seja surpreendida.", action: () => navigate("/login"), actionLabel: "Ver fluxo →" },
            { icon: <BarChart3 className="h-5 w-5 text-cyan-300" />, title: "Indicadores por Área", desc: "Drill-down por centro de custo, filial ou departamento. Entenda onde estão as oportunidades — e os riscos — da sua operação.", action: () => navigate("/login"), actionLabel: "Ver indicadores →" },
            { icon: <Zap className="h-5 w-5 text-cyan-300" />, title: "Análise de Realizações", desc: "Compare planejado vs realizado com visualizações intuitivas. Identifique desvios e corrija o curso rapidamente.", action: () => navigate("/login"), actionLabel: "Ver análise →" },
          ].map(({ icon, title, desc, action, actionLabel }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="group flex h-full flex-col rounded-[18px] border border-white/[0.08] bg-[linear-gradient(160deg,rgba(18,26,53,0.6),rgba(10,16,36,0.9))] p-7 transition-all hover:-translate-y-0.5 hover:border-cyan-400/20">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[11px] border border-cyan-400/20 bg-cyan-500/10">{icon}</div>
                <div className="mb-2.5 font-['Syne'] text-[15px] font-bold tracking-tight text-white">{title}</div>
                <p className="flex-1 text-[13.5px] font-light leading-relaxed text-slate-400">{desc}</p>
                <button onClick={action} className="mt-5 self-start text-[12px] font-semibold text-cyan-400 transition-colors hover:text-cyan-300 bg-transparent border-none cursor-pointer p-0">{actionLabel}</button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section ref={metricsRef} className="grid grid-cols-1 gap-14 px-[5vw] py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal><div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400" style={{ fontFamily: "'Syne', sans-serif" }}>Resultados concretos</div></Reveal>
          <Reveal delay={0.05}><h2 className="mb-4 max-w-[520px] leading-[1.05] tracking-[-0.04em] text-white" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800 }}>Menos tempo em planilhas, <span style={{ color: "#22d3ee" }}>mais foco no que importa</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mb-8 max-w-[460px] font-light leading-relaxed text-slate-400" style={{ fontSize: 15 }}>Gestores que usam o Executive Insights reportam ganhos expressivos de produtividade e qualidade nas decisões financeiras.</p></Reveal>
          <Reveal delay={0.15}><button onClick={() => setDemoOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/15 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all hover:bg-cyan-400/20 cursor-pointer" style={{ fontFamily: "'Syne', sans-serif" }}>Quero ver esses resultados <ArrowRight className="h-4 w-4" /></button></Reveal>
        </div>
        <Reveal delay={0.1} className="grid grid-cols-2 gap-3.5">
          {[{ num: "87%", label: "Redução no tempo de fechamento", bar: 87 }, { num: "3×", label: "Mais velocidade nas decisões", bar: 72 }, { num: "99,8%", label: "Uptime garantido", bar: 99 }, { num: "< 5s", label: "Atualização em tempo real", bar: 60 }].map(({ num, label, bar }) => (
            <div key={label} className="rounded-[16px] border border-white/[0.07] bg-[linear-gradient(160deg,rgba(18,26,53,0.7),rgba(10,16,36,0.95))] p-5 transition-all hover:-translate-y-0.5">
              <div className="text-[30px] font-extrabold leading-none tracking-[-0.05em]" style={{ fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #fff 0%, #cbd5e1 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{num}</div>
              <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</div>
              <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full" style={{ width: `${bar}%`, background: "linear-gradient(90deg, #22d3ee 0%, #38bdf8 100%)" }} /></div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section ref={depoimentosRef} className="px-[5vw] py-20">
        <Reveal><div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400" style={{ fontFamily: "'Syne', sans-serif" }}>Depoimentos</div></Reveal>
        <Reveal delay={0.05}><h2 className="mb-14 max-w-[480px] leading-[1.05] tracking-[-0.04em] text-white" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800 }}>O que os líderes <span style={{ color: "#22d3ee" }}>estão dizendo</span></h2></Reveal>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {[
            { text: "Antes levávamos dois dias para fechar o relatório mensal. Com o Executive Insights, a diretoria tem os números frescos toda segunda-feira de manhã.", name: "Rafael Campos", role: "CFO — Grupo Meridian", initials: "RC", color: "rgba(34,211,238,0.12)", textColor: "#22d3ee" },
            { text: "A visibilidade de inadimplência em tempo real mudou completamente nossa gestão de crédito. Reduzimos o índice em 40% em seis meses.", name: "Ana Moura", role: "Diretora Financeira — VitaFarma", initials: "AM", color: "rgba(52,211,153,0.12)", textColor: "#34d399" },
            { text: "Finalmente um sistema que fala a língua do executivo. Sem abas escondidas, sem fórmulas frágeis. Só o número que preciso, na hora que preciso.", name: "Thiago Prado", role: "CEO — LogiPrime", initials: "TP", color: "rgba(251,191,36,0.12)", textColor: "#fbbf24" },
          ].map(({ text, name, role, initials, color, textColor }, i) => (
            <Reveal key={name} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-[18px] border border-white/[0.07] bg-[linear-gradient(160deg,rgba(18,26,53,0.55),rgba(10,16,36,0.85))] p-7">
                <div className="mb-4 flex gap-1">{Array.from({ length: 5 }).map((_, j) => (<div key={j} className="h-3 w-3" style={{ background: "#fbbf24", clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />))}</div>
                <p className="mb-6 flex-1 text-[13.5px] font-light italic leading-relaxed text-slate-300">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold" style={{ fontFamily: "'Syne', sans-serif", background: color, color: textColor }}>{initials}</div>
                  <div>
                    <div className="text-[13px] font-semibold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{name}</div>
                    <div className="text-[11px] text-slate-500">{role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-[5vw] py-24">
        <Reveal>
          <div className="relative mx-auto max-w-[700px] overflow-hidden rounded-[24px] border border-cyan-400/15 bg-[linear-gradient(160deg,rgba(18,26,53,0.7),rgba(10,16,36,0.95))] px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] bg-[radial-gradient(ellipse,rgba(34,211,238,0.1),transparent_60%)]" />
            <h2 className="mb-4 leading-[1.05] tracking-[-0.04em] text-white" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 800 }}>Pronto para tomar decisões com <span style={{ color: "#22d3ee" }}>clareza</span>?</h2>
            <p className="mx-auto mb-10 max-w-[440px] font-light leading-relaxed text-slate-400" style={{ fontSize: 15 }}>Solicite uma demonstração personalizada e veja como o Executive Insights pode transformar a gestão financeira da sua empresa.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => setDemoOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/20 px-8 py-3.5 text-[15px] font-semibold text-cyan-200 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(34,211,238,0.18)] cursor-pointer" style={{ fontFamily: "'Syne', sans-serif" }}><Phone className="h-4 w-4" />Falar com um especialista</button>
              <button onClick={() => navigate("/login")} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-8 py-3.5 text-[15px] font-semibold text-slate-300 transition-all hover:text-white cursor-pointer" style={{ fontFamily: "'Syne', sans-serif" }}>Já tenho conta — Entrar</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.05] px-[5vw] py-10">
        <div className="flex items-center gap-2.5" style={{ fontFamily: "'Syne', sans-serif" }}>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10"><Activity className="h-3.5 w-3.5 text-cyan-300" /></div>
          <span className="text-[14px] font-bold tracking-tight text-slate-400">Executive Insights</span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {[{ label: "Funcionalidades", action: () => scrollTo(featuresRef) }, { label: "Indicadores", action: () => scrollTo(metricsRef) }, { label: "Depoimentos", action: () => scrollTo(depoimentosRef) }, { label: "Entrar", action: () => navigate("/login") }].map(({ label, action }) => (
            <button key={label} onClick={action} className="text-[12px] text-slate-600 transition-colors hover:text-slate-400 bg-transparent border-none cursor-pointer">{label}</button>
          ))}
        </div>
        <div className="text-[12px] text-slate-700">© 2026 Executive Insights. Todos os direitos reservados.</div>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes barGrow { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); transform-origin: bottom; } }
      `}</style>
    </div>
  );
}
