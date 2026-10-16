// Direção visual: editorial brutalist aplicado à educação corporativa; contraste carvão/branco, vermelho Ruptura, molduras finas, brush strokes e composição assimétrica.
import { FormEvent, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, Mail, Menu, MessageCircle, Phone, Quote, X } from "lucide-react";

const heroTexture = "/manus-storage/moises-hero-texture_48250a6c.jpg";
const sectionTexture = "/manus-storage/moises-section-texture_4b4ae73c.jpg";
const portrait = "/manus-storage/moises-portrait-cutout_eca342af.png";
const stagePortrait = "/manus-storage/moises-portrait-direct_99a718c9.webp";
const flamePortrait = "/manus-storage/moises-fire_3316ae56.png";
const thinkingPortrait = "/manus-storage/moises-portrait-direct_99a718c9.webp";
const logo = "/manus-storage/asset-003_5fd16f85.jpg";

const navItems = [
  { label: "A palestra", href: "#palestra" },
  { label: "Para quem é", href: "#publico" },
  { label: "Moisés", href: "#moises" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error" | "config">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = import.meta.env.VITE_RESEND_FORM_ENDPOINT as string | undefined;

    if (!endpoint) {
      setFormState("config");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Novo contato para palestra — ${data.name}`,
          ...data,
        }),
      });
      if (!response.ok) throw new Error("Falha no envio");
      form.reset();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  return (
    <main className="site-shell">
      <header className="site-nav" aria-label="Navegação principal">
        <a className="brand-lockup" href="#top" aria-label="Moisés Alves — início">
          <span className="brand-mark"><img src={logo} alt="" /></span>
          <span className="brand-name"><strong>MOISÉS</strong><span>ALVES</span></span>
        </a>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <a className="nav-cta" href="#contato" onClick={() => setMenuOpen(false)}>Vamos conversar <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section id="top" className="hero-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(6,6,6,.96) 0%, rgba(6,6,6,.82) 49%, rgba(6,6,6,.18) 100%), url(${heroTexture})` }}>
        <div className="hero-frame" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Empresário · Palestrante · Educação corporativa</p>
          <h1>Hackeando<br /><span>modelos</span><br />mentais<span className="red-dot">.</span></h1>
          <p className="hero-description">Como crenças invisíveis moldam decisões, resultados e possibilidades — e como reprogramá-las para alta performance.</p>
          <a className="button button-red" href="#contato">Leve essa provocação para sua equipe <ArrowUpRight size={18} /></a>
        </div>
        <div className="hero-person-wrap">
          <div className="hero-person-glow" />
          <img className="hero-person" src={portrait} alt="Moisés Alves em retrato, com a mão apoiada no queixo" />
          <div className="hero-caption"><span>01</span><span>pensamento<br />sob controle</span></div>
        </div>
        <div className="hero-scroll"><ArrowDownRight size={17} /> <span>desça para provocar</span></div>
      </section>

      <section className="manifesto-section">
        <div className="section-signature section-signature-manifesto"><span className="hmm-box">HMM</span></div>
        <div className="manifesto-quote"><Quote size={60} strokeWidth={1.4} /></div>
        <div className="manifesto-content">
          <p className="kicker red-text">Uma experiência, não apenas uma palestra.</p>
          <h2>Se pensamento e ação não estão sob seu <strong>controle<span className="red-text">…</span></strong></h2>
          <div className="brush-label">SUA VIDA NÃO ESTÁ.</div>
          <p className="signature">— Moisés Alves</p>
        </div>
        <div className="manifesto-photo"><img src={stagePortrait} alt="Moisés Alves falando para uma plateia" /></div>
      </section>

      <section id="palestra" className="talk-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(7,7,7,.98) 0%, rgba(7,7,7,.85) 55%, rgba(7,7,7,.25) 100%), url(${sectionTexture})` }}>
        <div className="section-rule top-rule" />
        <div className="talk-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A palestra</p>
          <h2>Mais do que conteúdo.<br /><span>Um convite à ruptura.</span></h2>
          <p><strong className="red-text">Hackeando Modelos Mentais</strong> é uma experiência provocativa que leva o público a questionar padrões invisíveis que limitam decisões, comportamentos e resultados.</p>
          <p>Uma conversa direta sobre a forma como pensamos, decidimos e sustentamos aquilo que chamamos de performance.</p>
          <a className="text-link" href="#contato">Quero conversar sobre a palestra <ArrowUpRight size={17} /></a>
        </div>
        <div className="flame-card"><img src={flamePortrait} alt="Moisés Alves segurando uma chama, em uma imagem conceitual da palestra" /><span>acenda<br />a mudança</span></div>
        <div className="section-rule bottom-rule" />
      </section>

      <section id="publico" className="audience-section">
        <div className="section-signature section-signature-audience"><span className="hmm-box">HMM</span></div>
        <div className="audience-heading">
          <p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> Conteúdo desenvolvido para</p>
          <h2>Quem precisa<br /><span>pensar melhor</span><br />para agir melhor.</h2>
        </div>
        <div className="audience-list">
          {[
            "Empresas que desejam desenvolver líderes mais conscientes.",
            "Equipes que precisam evoluir comportamento e performance.",
            "Ambientes que buscam inovação e mudança de mentalidade.",
            "Pessoas que precisam assumir mais protagonismo sobre suas decisões.",
          ].map((item, index) => (
            <div className="audience-item" key={item}><span>0{index + 1}</span><p>{item}</p><ArrowUpRight size={19} /></div>
          ))}
        </div>
      </section>

      <section id="moises" className="about-section">
        <div className="about-photo"><img src={thinkingPortrait} alt="Retrato de Moisés Alves olhando para a câmera" /><div className="photo-stamp">HMM</div></div>
        <div className="about-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Quem provoca essa conversa</p>
          <h2>Moisés<br /><span>Alves.</span></h2>
          <p>Nascido na periferia, cresceu cercado por limitações impostas pelo ambiente. Questionou essas ideias — e percebeu que o que separa pessoas comuns de resultados extraordinários não é só talento.</p>
          <p>É <strong className="red-text">mentalidade.</strong></p>
          <p>Empresário, especialista em Desenvolvimento Humano pela FGV e pesquisador em neurociência do comportamento, Moisés estuda e ensina modelos mentais para quem deseja mudar a forma de agir.</p>
          <div className="about-highlight">“A mudança começa no modelo que você usa para interpretar o mundo.”</div>
        </div>
      </section>

      <section id="contato" className="contact-section">
        <div className="contact-stamp"><span className="hmm-box">HMM</span><span>conversa<br />que provoca</span></div>
        <div className="contact-intro">
          <p className="eyebrow"><span className="eyebrow-line" /> O próximo passo</p>
          <h2>Resultados diferentes exigem <span>formas diferentes</span> de pensar.</h2>
          <p>Se você quer desenvolver pessoas que pensam melhor, decidem melhor e performam melhor, vamos conversar.</p>
          <div className="contact-details">
            <a href="https://wa.me/5512997722459" target="_blank" rel="noreferrer"><MessageCircle size={19} /> +55 12 99772-2459</a>
            <a href="mailto:moises@e-vironment.com"><Mail size={19} /> moises@e-vironment.com</a>
            <a href="https://www.e-vironment.com/moisesalves" target="_blank" rel="noreferrer"><ArrowUpRight size={19} /> e-vironment.com/moisesalves</a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading"><span>Vamos conversar.</span><p>Conte um pouco sobre o seu evento ou desafio.</p></div>
          <label>Seu nome<input required name="name" type="text" placeholder="Como podemos chamar você?" /></label>
          <label>Seu e-mail<input required name="email" type="email" placeholder="voce@empresa.com" /></label>
          <label>Empresa ou organização<input name="company" type="text" placeholder="Nome da empresa" /></label>
          <label>Mensagem<textarea required name="message" rows={4} placeholder="Qual transformação você quer provocar?" /></label>
          <button className="button button-red form-submit" type="submit" disabled={formState === "sending"}>{formState === "sending" ? "Enviando…" : "Enviar mensagem"} <ArrowUpRight size={18} /></button>
          <div className="form-status" aria-live="polite">
            {formState === "success" && <><Check size={17} /> Mensagem enviada. Em breve, Moisés ou a equipe retornará.</>}
            {formState === "error" && "Não foi possível enviar agora. Tente novamente ou use o WhatsApp."}
            {formState === "config" && "O formulário está pronto para o endpoint Resend. Configure VITE_RESEND_FORM_ENDPOINT para ativar o envio."}
          </div>
        </form>
      </section>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><img src={logo} alt="" /></span><span>MOISÉS ALVES</span></div><p>Hackeando Modelos Mentais.</p><span>© {new Date().getFullYear()} e-Vironment</span></footer>
      <a className="floating-whatsapp" href="https://wa.me/5512997722459" target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp"><Phone size={20} /></a>
    </main>
  );
}
