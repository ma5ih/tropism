'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft, ArrowUpLeft, Baby, Brain, Check, ChevronDown,
  Clock3, Flower2, HeartHandshake, Instagram, Leaf, Menu, MessageCircle,
  ShieldCheck, Sparkles, Sprout, UsersRound, X
} from 'lucide-react';

const services = [
  { id: 'individual', icon: Brain, title: 'تراپی فردی', subtitle: 'رابطه‌ای عمیق‌تر با خودت', description: 'برای شناخت احساسات، دیدن الگوها و پیدا کردن راهی که بیشتر شبیه خودت باشد.', tone: 'sage', number: '۰۱' },
  { id: 'relationship', icon: HeartHandshake, title: 'تراپی رابطه', subtitle: 'برای شنیدن و شنیده‌شدن', description: 'فضایی امن برای گفت‌وگو، درک تفاوت‌ها و ساختن رابطه‌ای آگاهانه‌تر.', tone: 'lilac', number: '۰۲' },
  { id: 'family', icon: UsersRound, title: 'مشاوره خانواده', subtitle: 'برای نزدیک‌تر شدن', description: 'برای وقت‌هایی که خانواده به گفت‌وگویی تازه و نگاهی مهربان‌تر نیاز دارد.', tone: 'peach', number: '۰۳' },
  { id: 'youth', icon: Baby, title: 'کودک و نوجوان', subtitle: 'برای رشد در فضای امن', description: 'همراهی متناسب با دنیای کودکان و نوجوانان، در کنار خانواده.', tone: 'lilac', number: '۰۴' },
  { id: 'education', icon: Flower2, title: 'کارگاه و آموزش', subtitle: 'یادگیری برای زندگی', description: 'تمرین‌ها و آگاهی‌هایی برای شناخت بهتر خود و ساختن عادت‌های سالم‌تر.', tone: 'sage', number: '۰۵' },
];

const articles = [
  { category: 'رابطه با خود', title: 'چطور با احساسات سخت مهربان‌تر باشیم؟', excerpt: 'قرار نیست همیشه حالمان خوب باشد؛ گاهی فقط باید به آنچه می‌گذرد، جا بدهیم.', time: '۶ دقیقه مطالعه', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=85', shape: 'article-photo-one' },
  { category: 'روان‌شناسی', title: 'قدرت عادت‌های کوچک در روزهای شلوغ', excerpt: 'تغییرهای پایدار همیشه با قدم‌های بزرگ شروع نمی‌شوند؛ گاهی یک مکث کافی است.', time: '۴ دقیقه مطالعه', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=85', shape: 'article-photo-two' },
  { category: 'آرامش ذهن', title: 'وقتی ذهن شلوغ است، از کجا شروع کنیم؟', excerpt: 'چند راه ساده برای برگشتن به لحظه و شنیدن صدای خودمان.', time: '۵ دقیقه مطالعه', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=85', shape: 'article-photo-three' },
];

const steps = [
  { n: '۱', title: 'از نیازت بگو', text: 'لازم نیست از همین ابتدا همه‌چیز را بدانی؛ از چیزی که امروز درگیرش هستی شروع کن.' },
  { n: '۲', title: 'همراه مناسب را پیدا کن', text: 'حوزه تخصصی، رویکرد و شیوه کار درمانگر را ببین و با آرامش انتخاب کن.' },
  { n: '۳', title: 'زمانت را انتخاب کن', text: 'جزئیات جلسه را مرور کن و برای اولین قدم، زمانی متناسب با زندگی‌ات بردار.' },
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reduced ? 0 : 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a className={'brand-mark ' + (light ? 'brand-mark-light' : '')} href="#home" aria-label="تروپیسم، صفحه اصلی">
      <img src="/logo.svg" alt="تروپیسم" />
    </a>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);
  const [selectedService, setSelectedService] = useState('تراپی فردی');
  const reduced = useReducedMotion();

  const openBooking = (service?: string) => {
    if (service) setSelectedService(service);
    setBookingSent(false);
    setBookingOpen(true);
    setMenuOpen(false);
  };

  const handleBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingSent(true);
  };

  const navItems = [
    ['خانه', '#home'], ['خدمات', '#services'], ['راهنمای شروع', '#guide'],
    ['مجله', '#journal'], ['درباره ما', '#about'],
  ];

  return (
    <main id="home" className="site-shell">
      <div className="announcement">
        <span className="announcement-spark"><Sparkles size={13} /></span>
        <span>قرار نیست همه‌چیز را یک‌روزه حل کنی؛ فقط از یک قدم شروع کن.</span>
        <a href="#guide">مسیرت را پیدا کن <ArrowLeft size={13} /></a>
      </div>

      <header className="site-header">
        <div className="container nav-inner">
          <BrandMark />
          <nav className={'desktop-nav ' + (menuOpen ? 'desktop-nav-open' : '')} aria-label="ناوبری اصلی">
            {navItems.map(([label, href], i) => (
              <a key={href} className={i === 0 ? 'nav-link nav-link-active' : 'nav-link'} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="button button-primary nav-cta" onClick={() => openBooking()}><span>رزرو جلسه</span><ArrowUpLeft size={16} /></button>
            <button className="icon-button mobile-menu-button" aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> فضایی برای رشد، با ریتم خودت</div>
            <h1>قرار نیست<br />همه‌چیز را <span className="headline-highlight">بدانی.</span><br /><em>فقط شروع کن.</em></h1>
            <p className="hero-description">گاهی یک گفت‌وگو، دریچه‌ای تازه باز می‌کند. اینجا می‌توانی با همراهی متخصصان، خودت را بهتر بشناسی و آرام‌آرام مسیرت را پیدا کنی.</p>
            <div className="hero-actions">
              <button className="button button-primary button-large" onClick={() => openBooking()}>پیدا کردن همراه من <ArrowLeft size={17} /></button>
              <a className="text-link" href="#guide"><span className="play-dot"><ArrowUpLeft size={15} /></span> ببین چطور شروع کنیم</a>
            </div>
            <div className="hero-trust">
              <div className="avatar-stack" aria-hidden="true">
                <span className="mini-avatar avatar-a">ر</span><span className="mini-avatar avatar-b">م</span><span className="mini-avatar avatar-c">ن</span>
              </div>
              <div><strong>قدم‌به‌قدم، کنار تو</strong><span>برای روزهایی که به همراهی نیاز داری</span></div>
              <span className="trust-leaf"><Leaf size={23} /></span>
            </div>
          </Reveal>
          <div className="hero-art">
            <motion.div className="hero-image-frame" initial={reduced ? false : { opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: reduced ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}>
              <img className="hero-image" src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1500&q=90" alt="فضایی گرم و آرام با نور طبیعی، گیاهان و صندلی راحت برای مکث و گفت‌وگو" />
              <div className="image-wash" />
            </motion.div>
            <motion.div className="hero-sticker sticker-top" animate={reduced ? undefined : { y: [0, -7, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="sticker-icon"><Sprout size={18} /></span><span>جایی برای<br /><b>نفس کشیدن</b></span>
            </motion.div>
            <motion.div className="hero-sticker sticker-bottom" animate={reduced ? undefined : { y: [0, 6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="sticker-check"><Check size={15} /></span><span><b>همراهی بدون قضاوت</b><small>با احترام به مسیر تو</small></span>
            </motion.div>
            <div className="hero-number">T / ۰۱</div>
            <svg className="hero-doodle" viewBox="0 0 160 180" fill="none" aria-hidden="true"><path d="M18 164C73 138 82 89 50 45C40 31 25 27 16 31C31 12 60 11 76 36C95 66 87 110 113 120C131 127 145 113 143 96" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M49 46C22 56 19 77 22 92C43 88 54 70 49 46Z" fill="#6a804a"/><path d="M96 100C94 78 109 65 129 63C132 82 118 99 96 100Z" fill="#9b76b4"/></svg>
            <span className="hero-caption">گاهی مسیر، با یک مکث روشن می‌شود.</span>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>آرام‌تر، آگاهانه‌تر، نزدیک‌تر به خودت</span>
          <a href="#services" aria-label="رفتن به بخش خدمات"><span className="scroll-line" /> اسکرول کن</a>
          <span className="hero-index">۰۱ — ۰۷</span>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="container">
          <Reveal className="section-heading services-heading">
            <div>
              <span className="section-kicker">راه‌های همراهی</span>
              <h2>هر آدمی، <span className="serif-accent">داستان</span> خودش را دارد.</h2>
            </div>
            <p>برای هر چیزی که این روزها در ذهنت می‌گذرد، می‌شود یک قدم مناسب پیدا کرد؛ بدون عجله و بدون قضاوت.</p>
          </Reveal>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.id} delay={index * 0.07} className="service-reveal">
                  <button className={'service-card service-' + service.tone} onClick={() => openBooking(service.title)}>
                    <div className="service-card-top"><span className="service-number">{service.number}</span><span className="service-icon"><Icon size={26} strokeWidth={1.45} /></span></div>
                    <h3>{service.title}</h3>
                    <p className="service-subtitle">{service.subtitle}</p>
                    <p className="service-description">{service.description}</p>
                    <span className="service-arrow"><ArrowLeft size={17} /></span>
                    <span className="service-orb" />
                  </button>
                </Reveal>
              );
            })}
          </div>
          <div className="services-footer">
            <span><ShieldCheck size={16} /> انتخاب آگاهانه، با خیال راحت</span>
            <button className="underlined-link" onClick={() => openBooking()}>هنوز نمی‌دونی کدوم مسیر؟ <ArrowLeft size={15} /></button>
          </div>
        </div>
      </section>

      <section className="guide-section section-pad" id="guide">
        <div className="guide-backdrop-shape" />
        <div className="container guide-grid">
          <Reveal className="guide-visual">
            <div className="guide-photo-main">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85" alt="گوشه‌ای آرام با صندلی، نور طبیعی و گیاهان سبز" loading="lazy" />
              <div className="guide-photo-overlay"><span>یک لحظه برای خودت</span><b>نفس عمیق بکش.</b><span className="guide-quote-mark">“</span></div>
            </div>
            <div className="guide-note"><span className="note-icon"><Leaf size={22} /></span><p>برای شروع، لازم نیست آماده باشی؛<br /><b>همین که اینجایی کافیه.</b></p></div>
            <span className="guide-art-number">TRO / ۰۲</span>
          </Reveal>
          <Reveal className="guide-copy" delay={0.1}>
            <span className="section-kicker"><span className="kicker-dot" /> راهنمای شروع</span>
            <h2>شروع کردن،<br /><span className="serif-accent">پیچیده نیست.</span></h2>
            <p className="guide-intro">لازم نیست از قبل بدانی چه چیزی می‌خواهی بگویی. قرار است با هم، قدم بعدی را پیدا کنیم.</p>
            <div className="steps-list">
              {steps.map((step, index) => (
                <div className="step-item" key={step.n}>
                  <div className="step-number">{step.n}</div>
                  <div className="step-copy"><h3>{step.title}</h3><p>{step.text}</p></div>
                  <ArrowUpLeft className="step-arrow" size={17} />
                  {index < steps.length - 1 && <span className="step-connector" />}
                </div>
              ))}
            </div>
            <button className="button button-outline" onClick={() => openBooking()}>شروع مسیر من <ArrowLeft size={16} /></button>
            <div className="guide-footnote"><span className="footnote-star">✳</span> با ریتم خودت؛ بدون عجله، با احترام به مسیرت.</div>
          </Reveal>
        </div>
      </section>

      <section className="journal-section section-pad" id="journal">
        <div className="container">
          <Reveal className="section-heading journal-heading">
            <div><span className="section-kicker">مجله تروپیسم / برای روزهای واقعی</span><h2>چند دقیقه برای <span className="serif-accent">خودت.</span></h2></div>
            <a className="text-link journal-all" href="#journal-cards">همه نوشته‌ها <ArrowLeft size={16} /></a>
          </Reveal>
          <div className="journal-layout" id="journal-cards">
            <Reveal className="journal-intro-card">
              <span className="journal-intro-ornament"><Sprout size={35} strokeWidth={1.1} /></span>
              <span className="section-kicker">خواندنی‌هایی برای مکث</span>
              <h3>گاهی یک جمله،<br />چیزی را درون ما روشن می‌کند.</h3>
              <p>یادداشت‌هایی کوتاه و کاربردی درباره خودشناسی، رابطه و مراقبت از ذهن؛ برای آن‌که در شلوغی روز کمی جا برای خودت باز کنی.</p>
              <div className="journal-progress"><span /><span /><span /></div>
              <span className="journal-side-label">T / JOURNAL</span>
            </Reveal>
            <div className="article-grid">
              {articles.map((article, index) => (
                <Reveal key={article.title} delay={index * 0.08} className="article-reveal">
                  <article className="article-card">
                    <a href="#journal" className="article-image-wrap" aria-label={'خواندن مقاله ' + article.title}>
                      <img className={article.shape} src={article.image} alt="" loading="lazy" />
                      <span className="article-category">{article.category}</span>
                      <span className="article-open"><ArrowUpLeft size={17} /></span>
                    </a>
                    <div className="article-body"><span className="article-index">۰{index + 1} / یادداشت</span><h3>{article.title}</h3><p>{article.excerpt}</p><div className="article-meta"><span><Clock3 size={13} /> {article.time}</span><a href="#journal">بیشتر بخوان <ArrowLeft size={14} /></a></div></div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="instagram-section" id="instagram">
        <div className="instagram-blob" />
        <div className="container instagram-grid">
          <Reveal className="phone-stage">
            <div className="phone-halo" />
            <div className="phone-mockup">
              <div className="phone-speaker" />
              <div className="phone-screen">
                <div className="phone-status"><span>۹:۴۱</span><span>● ◔ ▰</span></div>
                <div className="phone-profile"><img src="/logo.svg" alt="نشان تروپیسم" /><div><b>tropism.ir</b><span>فضایی برای رشد 🌱</span></div><button aria-label="مشاهده اینستاگرام" onClick={() => window.open('https://instagram.com/tropism.ir', '_blank', 'noopener,noreferrer')}><Instagram size={15} /></button></div>
                <div className="phone-stats"><span><b>۱۲۴</b> پست</span><span><b>۸.۶k</b> همراه</span><span><b>۳۲</b> راهنما</span></div>
                <div className="phone-bio">برای حالِ بهتر، از همین‌جا شروع کن.<br />خودشناسی • رابطه • آرامش</div>
                <button className="phone-follow" type="button" onClick={() => window.open('https://instagram.com/tropism.ir', '_blank', 'noopener,noreferrer')}>مشاهده صفحه</button>
                <div className="phone-story-row"><i /><i /><i /><i /></div>
                <div className="phone-photo-grid">
                  <div className="phone-shot shot-a" /><div className="phone-shot shot-b" /><div className="phone-shot shot-c" /><div className="phone-shot shot-d" /><div className="phone-shot shot-e" /><div className="phone-shot shot-f" />
                </div>
              </div>
            </div>
            <span className="phone-floating-leaf"><Leaf size={31} /></span>
            <span className="phone-caption">یک گوشه کوچک<br />برای مکث روزانه‌ات.</span>
          </Reveal>
          <Reveal className="instagram-copy" delay={0.12}>
            <span className="section-kicker">بیرون از این صفحه هم کنار توییم</span>
            <h2>با ما در <span className="serif-accent">اینستاگرام</span><br />نزدیک‌تر باش.</h2>
            <p>یادداشت‌های کوتاه، تمرین‌های کوچک و حرف‌هایی درباره زندگی واقعی؛ برای وقت‌هایی که چند دقیقه همراهی می‌تواند حال روزت را کمی عوض کند.</p>
            <a className="button button-dark" href="https://instagram.com/tropism.ir" target="_blank" rel="noreferrer"><Instagram size={17} /> @tropism.ir <ArrowUpLeft size={16} /></a>
            <div className="instagram-gallery">
              <a href="https://instagram.com/tropism.ir" target="_blank" rel="noreferrer" aria-label="اینستاگرام تروپیسم"><img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=360&q=80" alt="" loading="lazy" /></a>
              <a href="https://instagram.com/tropism.ir" target="_blank" rel="noreferrer" aria-label="اینستاگرام تروپیسم"><img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=360&q=80" alt="" loading="lazy" /></a>
              <a href="https://instagram.com/tropism.ir" target="_blank" rel="noreferrer" aria-label="اینستاگرام تروپیسم"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=360&q=80" alt="" loading="lazy" /></a>
              <a href="https://instagram.com/tropism.ir" target="_blank" rel="noreferrer" aria-label="اینستاگرام تروپیسم"><img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=360&q=80" alt="" loading="lazy" /></a>
            </div>
            <div className="insta-signature"><span className="insta-line" /><span>هر روز، یک قدم نزدیک‌تر به خودت</span><span className="insta-flower">✳</span></div>
          </Reveal>
        </div>
      </section>

      <section className="about-section section-pad" id="about">
        <div className="about-topography" />
        <div className="container about-grid">
          <Reveal className="about-visual">
            <div className="about-image"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85" alt="فضایی روشن و پر از گیاه برای رشد و گفت‌وگو" loading="lazy" /></div>
            <div className="about-stamp"><img src="/logo.svg" alt="" /><span>SPACE<br />TO GROW</span></div>
            <svg className="about-line-doodle" viewBox="0 0 240 120" fill="none" aria-hidden="true"><path d="M2 90C44 22 72 25 112 65S171 115 210 48 237 22 238 16" stroke="#6a804a" strokeWidth="1.3" strokeLinecap="round"/><path d="M111 65C106 43 122 28 139 31 139 50 128 64 111 65Z" fill="#9b76b4"/></svg>
            <span className="about-image-caption">رشد، یک مسیر است؛ نه یک مقصد.</span>
          </Reveal>
          <Reveal className="about-copy" delay={0.12}>
            <span className="section-kicker">درباره تروپیسم</span>
            <h2>اینجا قرار نیست<br />نسخه‌ای از کسی دیگر باشی؛<br /><span className="serif-accent">قرار است خودت را پیدا کنی.</span></h2>
            <p>تروپیسم از یک باور ساده شروع شده: هر آدمی شایسته فضایی امن برای شناختن خودش است. ما می‌خواهیم مسیر پیدا کردن همراه حرفه‌ای، از اولین جست‌وجو تا شروع گفت‌وگو، روشن‌تر، انسانی‌تر و نزدیک‌تر به نیاز واقعی تو باشد.</p>
            <p>نه وعده تغییر یک‌شبه می‌دهیم، نه برای احساساتت نسخه آماده داریم؛ فقط کمک می‌کنیم قدم بعدی را آگاهانه‌تر برداری.</p>
            <div className="about-values"><span><i><Leaf size={17} /></i> احترام به تفاوت‌ها</span><span><i><ShieldCheck size={17} /></i> امنیت و محرمانگی</span><span><i><HeartHandshake size={17} /></i> همراهی انسانی</span></div>
            <button className="button button-outline" onClick={() => openBooking()}>بیا از همین‌جا شروع کنیم <ArrowLeft size={16} /></button>
          </Reveal>
        </div>
        <div className="container about-bottom">
          <div className="about-stat"><strong>۰۱</strong><span>تو، نقطه شروع این مسیری</span></div>
          <div className="about-stat"><strong>آرام</strong><span>به اندازه‌ای که نیاز داری</span></div>
          <div className="about-stat"><strong>واقعی</strong><span>بدون قضاوت و شعار</span></div>
          <div className="about-bottom-note">هر رشد کوچکی، ارزش جشن گرفتن دارد. <span>✳</span></div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand-col"><BrandMark light /><p>فضایی امن برای شناختن خودت،<br />فهمیدن رابطه‌ها و رشد کردن.</p><div className="footer-socials"><a href="https://instagram.com/tropism.ir" target="_blank" rel="noreferrer" aria-label="اینستاگرام"><Instagram size={17} /></a><a href="mailto:hello@tropism.example" aria-label="ایمیل"><MessageCircle size={17} /></a><a href="#home" aria-label="بازگشت به بالا"><ArrowUpLeft size={17} /></a></div></div>
          <div className="footer-nav-col"><span className="footer-heading">گشت‌وگذار</span>{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
          <div className="footer-nav-col"><span className="footer-heading">راه‌های همراهی</span>{services.slice(0, 4).map((service) => <button key={service.id} onClick={() => openBooking(service.title)}>{service.title}</button>)}</div>
          <div className="footer-contact-col"><span className="footer-heading">از ما بپرس</span><p>برای شروع، پرسیدن یا فقط روشن شدن یک ابهام؛ اینجا هستیم.</p><a href="mailto:hello@tropism.example" className="footer-email">hello@tropism.example <ArrowUpLeft size={15} /></a><a href="https://instagram.com/tropism.ir" target="_blank" rel="noreferrer" className="footer-insta">@tropism.ir <Instagram size={15} /></a></div>
        </div>
        <div className="container footer-bottom"><span>© تروپیسم — همراه تو در مسیر رشد</span><span>با احترام به مسیر منحصربه‌فرد هر آدم <Leaf size={13} /></span><a href="#home">برگشتن به بالا ↑</a></div>
      </footer>

      <AnimatePresence>
        {bookingOpen && (
          <motion.div className="booking-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false); }}>
            <motion.div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" initial={reduced ? false : { opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: reduced ? 0 : 0.28 }}>
              <button className="booking-close icon-button" onClick={() => setBookingOpen(false)} aria-label="بستن پنجره"><X size={20} /></button>
              {!bookingSent ? <>
                <div className="booking-symbol"><Sprout size={26} /></div><span className="section-kicker">اولین قدم تو</span><h2 id="booking-title">از کجا شروع کنیم؟</h2><p className="booking-intro">نوع همراهی را انتخاب کن و راه ارتباطی‌ات را بگذار تا مسیر بعدی مشخص شود.</p>
                <form onSubmit={handleBooking} className="booking-form">
                  <label htmlFor="service-select">چه نوع همراهی‌ای می‌خواهی؟</label><div className="select-wrap"><select id="service-select" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>{services.map((service) => <option key={service.id}>{service.title}</option>)}</select><ChevronDown size={17} /></div>
                  <label htmlFor="contact-name">اسمت را چطور صدا کنیم؟</label><input id="contact-name" name="name" placeholder="نام کوچک" required />
                  <label htmlFor="contact-way">راه ارتباطی تو</label><input id="contact-way" name="contact" placeholder="شماره تماس یا ایمیل" required />
                  <button className="button button-primary button-full" type="submit">ادامه مسیر <ArrowLeft size={16} /></button>
                  <p className="booking-disclaimer"><ShieldCheck size={14} /> این فرم در حال حاضر نمایشی است و اطلاعات جایی ارسال نمی‌شود.</p>
                </form>
              </> : <div className="booking-success"><span className="success-mark"><Check size={26} /></span><span className="section-kicker">قدم اول برداشته شد</span><h2 id="booking-title">ممنون که شروع کردی.</h2><p>این فرم در نسخه فعلی نمایشی است؛ برای فعال شدن رزرو واقعی باید به سامانه نوبت‌دهی و مسیر امن نگهداری اطلاعات متصل شود.</p><button className="button button-primary button-full" onClick={() => setBookingOpen(false)}>متوجه شدم <Check size={16} /></button></div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
