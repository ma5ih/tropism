'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft, ArrowUpLeft, CalendarDays, Check, ChevronDown, Clock3,
  HeartHandshake, Leaf, Menu, MessageCircle, ShieldCheck, Sparkles,
  Video, X, Brain, Flower2, MoveLeft
} from 'lucide-react';

const services = [
  { id: 'individual', icon: Brain, title: 'تراپی فردی', subtitle: 'برای رابطه‌ای عمیق‌تر با خودت', description: 'احساساتت را بهتر بشناس، الگوهایت را کشف کن و با آگاهی بیشتری تصمیم بگیر.', tag: 'برای خودت', tone: 'sage' },
  { id: 'relationship', icon: HeartHandshake, title: 'تراپی رابطه', subtitle: 'برای شنیدن و شنیده‌شدن', description: 'فضایی امن‌تر برای گفت‌وگو، درک تفاوت‌ها و دیدن رابطه از زاویه‌ای تازه.', tag: 'برای رابطه', tone: 'lilac' },
  { id: 'youth', icon: Flower2, title: 'کودک و نوجوان', subtitle: 'برای رشد در فضای امن', description: 'همراهی متناسب با دنیای کودکان و نوجوانان و نیازهای خانواده.', tag: 'برای خانواده', tone: 'cream' },
];

const faqs = [
  { q: 'از کجا بفهمم کدام درمانگر برای من مناسب است؟', a: 'می‌توانی از حوزه‌های تخصصی، تجربه و رویکرد هر درمانگر شروع کنی. در نسخهٔ نهایی تروپیسم، مسیر راهنمای انتخاب درمانگر بر اساس نیازت شخصی‌سازی می‌شود.' },
  { q: 'جلسه‌ها به چه شکلی برگزار می‌شوند؟', a: 'جلسه‌ها می‌توانند بر اساس خدمت انتخابی به‌صورت آنلاین یا حضوری تعریف شوند. جزئیات دقیق هر خدمت پیش از رزرو نمایش داده خواهد شد.' },
  { q: 'آیا اطلاعات من محرمانه می‌ماند؟', a: 'حریم خصوصی باید از اصول پایهٔ تروپیسم باشد. پیش از آغاز رزرو واقعی، سیاست محرمانگی و شیوهٔ نگهداری اطلاعات به‌صورت شفاف منتشر می‌شود.' },
  { q: 'آیا این صفحه امکان رزرو واقعی دارد؟', a: 'این نسخه نمایشی رابط کاربری است. برای فعال‌کردن رزرو باید سرویس زمان‌بندی، پایگاه داده و ارسال تأییدیه به آن متصل شود.' },
];

const approaches = [
  { icon: MessageCircle, title: 'بدون قضاوت', text: 'جایی برای گفتن آنچه واقعاً حس می‌کنی.' },
  { icon: ShieldCheck, title: 'با احساس امنیت', text: 'مرزها و نیازهایت با احترام شنیده می‌شوند.' },
  { icon: Sparkles, title: 'با قدم‌های کوچک', text: 'تغییر، لازم نیست یک‌باره اتفاق بیفتد.' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('تراپی فردی');
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const openBooking = (service?: string) => {
    if (service) setSelectedService(service);
    setSubmitted(false);
    setBookingOpen(true);
  };

  return (
    <main id="top">
      <div className="announcement">
        <span className="announcement-dot" />
        <span>برای حالِ بهتر، لازم نیست همه‌چیز را به‌تنهایی حل کنی.</span>
        <button onClick={() => scrollTo('approach')} className="announcement-link">با تروپیسم آشنا شو <ArrowLeft size={14} /></button>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#top" aria-label="تروپیسم، صفحهٔ اول" onClick={(e) => { e.preventDefault(); scrollTo('top'); }}>
            <img src="/logo.svg" alt="تروپیسم" className="brand-logo" />
          </a>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="ناوبری اصلی">
            <a href="#services" onClick={() => setMenuOpen(false)}>خدمات تراپی</a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>نگاه تروپیسم</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>مسیر شروع</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>سؤالات پرتکرار</a>
            <button className="mobile-nav-cta" onClick={() => { setMenuOpen(false); openBooking(); }}>شروع مسیر من <ArrowLeft size={16} /></button>
          </nav>
          <div className="nav-actions">
            <button className="nav-cta" onClick={() => openBooking()}>رزرو جلسه <ArrowLeft size={16} /></button>
            <button className="menu-toggle" aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <section className="hero section-shell">
        <div className="hero-grain" aria-hidden="true" />
        <div className="container hero-grid">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="eyebrow"><span className="eyebrow-mark"><Leaf size={15} /></span> هر تغییری، از یک توجه کوچک شروع می‌شود</div>
            <h1>به سمت خودت<br /><span className="headline-accent">رشد کن.</span></h1>
            <p className="hero-lead">تروپیسم فضایی‌ست برای مکث‌کردن، شنیدن خودت و پیدا کردن مسیرت؛ با همراهی درمانگرانی که بدون قضاوت، کنارت هستند.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => openBooking()}>مسیر تراپی من <ArrowLeft size={18} /></button>
              <button className="button button-text" onClick={() => scrollTo('approach')}><span className="play-mark"><ArrowUpLeft size={17} /></span> با نگاه تروپیسم آشنا شو</button>
            </div>
            <div className="hero-trust-row">
              <div className="trust-avatars" aria-hidden="true"><span className="trust-avatar avatar-one">م</span><span className="trust-avatar avatar-two">ر</span><span className="trust-avatar avatar-three">ن</span></div>
              <div className="trust-caption"><div className="mini-stars">✳ ✳ ✳</div><span>یک قدم کوچک برای توجه به خودت</span></div>
            </div>
          </motion.div>

          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, delay: 0.12 }}>
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-sun"><span /></div>
            <div className="art-card-main">
              <div className="art-card-top"><span>NOTE TO SELF</span><span>۰۱ / ۰۳</span></div>
              <div className="art-plant" aria-hidden="true"><i className="stem" /><i className="leaf leaf-a" /><i className="leaf leaf-b" /><i className="leaf leaf-c" /><i className="leaf leaf-d" /><i className="leaf leaf-e" /><i className="plant-pot" /></div>
              <div className="art-card-caption"><span className="caption-kicker">A GENTLE REMINDER</span><strong>به خودت فرصت بده.</strong><p>رشد، مسیر است نه مقصد.</p></div>
            </div>
            <div className="floating-note note-top"><span className="note-icon"><HeartHandshake size={18} /></span><span><b>همراهی امن</b><small>در مسیر خودشناسی</small></span></div>
            <div className="floating-note note-bottom"><span className="note-icon note-icon-purple"><Sparkles size={18} /></span><span><b>شروع از همین‌جا</b><small>با یک قدم کوچک</small></span></div>
            <div className="art-index">TROPISM / 001</div>
          </motion.div>
        </div>
        <div className="container hero-bottom"><span className="bottom-line" /> <span>فضایی برای رشد، آگاهی و ارتباط</span><span className="scroll-indicator" onClick={() => scrollTo('services')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && scrollTo('services')}>به پایین برو <ChevronDown size={15} /></span></div>
      </section>

      <section className="intro-strip">
        <div className="container intro-strip-inner"><div className="intro-mark"><Leaf size={28} /></div><p>گاهی فقط به فضایی نیاز داریم که در آن، <em>خودمان را دوباره بشنویم.</em></p><span className="intro-side-note">A SPACE TO GROW — AT YOUR OWN PACE</span></div>
      </section>

      <section className="section-pad services-section" id="services">
        <div className="container">
          <div className="heading-split">
            <div className="section-heading"><div className="eyebrow"><span className="eyebrow-mark"><span>✳</span></span> همراهی متناسب با تو</div><h2>هر مسیر،<br /><span className="headline-accent">از یک نیاز</span> شروع می‌شود.</h2></div>
            <div className="heading-aside"><p>قرار نیست همه‌چیز را از قبل بدانی. کافی‌ست از جایی شروع کنی که امروز ایستاده‌ای.</p><button className="inline-link" onClick={() => openBooking()}>در انتخاب مسیر کمکم کن <MoveLeft size={16} /></button></div>
          </div>
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return <motion.article key={service.id} className={'service-card tone-' + service.tone} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.08 }}>
                <div className="service-card-top"><span className="service-icon"><Icon size={22} strokeWidth={1.5} /></span><span className="service-tag">{service.tag}</span><span className="service-index">۰{index + 1}</span></div>
                <div className="service-copy"><p className="service-subtitle">{service.subtitle}</p><h3>{service.title}</h3><p>{service.description}</p></div>
                <button className="service-link" onClick={() => openBooking(service.title)} aria-label={'انتخاب ' + service.title}>بررسی این مسیر <span><ArrowLeft size={17} /></span></button>
              </motion.article>;
            })}
          </div>
          <div className="services-footnote"><span className="footnote-mark">✳</span><span>نمی‌دانی از کدام مسیر شروع کنی؟ این کاملاً طبیعی‌ست.</span><button onClick={() => openBooking()}>راهنمایی‌ام کن <ArrowLeft size={14} /></button></div>
        </div>
      </section>

      <section className="section-pad approach-section" id="approach">
        <div className="container approach-grid">
          <motion.div className="approach-visual" initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <div className="approach-visual-bg" /><div className="approach-ring ring-a" /><div className="approach-ring ring-b" />
            <div className="approach-center"><span className="center-sprout"><i /><b /><em /></span><span className="center-label">GROW AT<br />YOUR OWN PACE</span></div>
            <div className="approach-stamp"><Leaf size={23} /><span>آرام<br />و پیوسته</span></div>
            <span className="approach-caption">A LITTLE SPACE FOR YOURSELF</span>
          </motion.div>
          <div className="approach-copy"><div className="eyebrow"><span className="eyebrow-mark"><Leaf size={15} /></span> نگاه تروپیسم</div><h2>قرار نیست<br /><span className="headline-accent">نسخهٔ دیگری</span> از خودت باشی.</h2><p className="approach-lead">ما به رشد به‌عنوان نزدیک‌شدن به خودت نگاه می‌کنیم؛ نه تبدیل‌شدن به کسی که دیگران انتظارش را دارند.</p>
            <div className="approach-points">{approaches.map((item) => { const Icon = item.icon; return <div className="approach-point" key={item.title}><span className="point-icon"><Icon size={19} /></span><div><strong>{item.title}</strong><p>{item.text}</p></div><Check size={15} className="point-check" /></div>; })}</div>
          </div>
        </div>
      </section>

      <section className="steps-section section-pad" id="process">
        <div className="container"><div className="centered-heading"><div className="eyebrow"><span className="eyebrow-mark"><Sparkles size={14} /></span> شروع لازم نیست پیچیده باشد</div><h2>سه قدم برای <span className="headline-accent">شروع مسیرت</span></h2><p>آرام، روشن و با اختیار خودت.</p></div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">۰۱</span><div className="step-illustration step-one"><MessageCircle size={27} strokeWidth={1.4} /></div><h3>از نیازت بگو</h3><p>ببین این روزها بیشتر به چه نوع همراهی نیاز داری.</p><span className="step-line" /></article>
            <article className="step-card"><span className="step-number">۰۲</span><div className="step-illustration step-two"><Leaf size={27} strokeWidth={1.4} /></div><h3>مسیر مناسب را پیدا کن</h3><p>با شناخت گزینه‌ها، انتخابت را آگاهانه‌تر انجام بده.</p><span className="step-line" /></article>
            <article className="step-card"><span className="step-number">۰۳</span><div className="step-illustration step-three"><CalendarDays size={27} strokeWidth={1.4} /></div><h3>برای خودت وقت بگذار</h3><p>زمان مناسب را انتخاب کن و قدم اول را بردار.</p><span className="step-line" /></article>
          </div>
          <div className="steps-cta"><span>شروع مسیر، از همین حالا می‌تواند آرام‌تر باشد.</span><button className="button button-primary" onClick={() => openBooking()}>شروع مسیر من <ArrowLeft size={17} /></button></div>
        </div>
      </section>

      <section className="quote-section"><div className="container quote-inner"><span className="quote-mark">“</span><p>لازم نیست همین امروز<br /><em>همه‌چیز را حل کنی.</em></p><div className="quote-bottom"><span /> فقط کافی‌ست به خودت توجه کنی <span /></div><div className="quote-orbit" /></div></section>

      <section className="section-pad faq-section" id="faq">
        <div className="container faq-grid"><div className="faq-intro"><div className="eyebrow"><span className="eyebrow-mark"><MessageCircle size={14} /></span> سؤال‌های تو مهم‌اند</div><h2>شاید این‌ها<br /><span className="headline-accent">همان چیزهایی</span> باشند که می‌پرسی.</h2><p>برای شروع لازم نیست پاسخ همهٔ سؤال‌ها را بدانی؛ اما حق داری با خیال روشن‌تری تصمیم بگیری.</p><button className="inline-link" onClick={() => openBooking()}>سؤال دیگری دارم <ArrowLeft size={16} /></button></div>
          <div className="faq-list">{faqs.map((faq, index) => <div className={activeFaq === index ? 'faq-item is-active' : 'faq-item'} key={faq.q}><button className="faq-question" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}><span className="faq-count">۰{index + 1}</span><span>{faq.q}</span><span className="faq-toggle"><ChevronDown size={17} /></span></button><AnimatePresence initial={false}>{activeFaq === index && <motion.div className="faq-answer-wrap" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }}><p>{faq.a}</p></motion.div>}</AnimatePresence></div>)}</div>
        </div>
      </section>

      <section className="final-cta"><div className="container final-cta-inner"><div className="final-ornament"><div className="final-orbit" /><Leaf size={35} strokeWidth={1.2} /><span>GROW<br />TOWARD YOU</span></div><div className="final-copy"><div className="eyebrow"><span className="eyebrow-mark"><Sparkles size={14} /></span> همین‌جا، همین‌قدر کافی‌ست</div><h2>یک قدم کوچک،<br /><span>برای خودت.</span></h2><p>هر وقت آماده بودی، ما اینجاییم تا شروع مسیر را برایت ساده‌تر کنیم.</p><button className="button button-light" onClick={() => openBooking()}>رزرو جلسه <ArrowLeft size={18} /></button></div><span className="final-side-label">A SPACE TO GROW / TROPISM</span></div></section>

      <footer className="site-footer"><div className="container footer-main"><div className="footer-brand-col"><img src="/logo.svg" alt="تروپیسم" className="footer-brand" /><p>فضایی برای مکث‌کردن، شنیدن خودت و پیدا کردن مسیرت.</p><span className="footer-motto"><Leaf size={14} /> رشد، به سبک خودت</span></div><div className="footer-links-col"><h4>دسترسی سریع</h4><a href="#services">خدمات تراپی</a><a href="#approach">نگاه تروپیسم</a><a href="#process">مسیر شروع</a><a href="#faq">سؤالات پرتکرار</a></div><div className="footer-links-col"><h4>شروع ارتباط</h4><button onClick={() => openBooking()}>درخواست جلسه</button><a href="mailto:hello@tropism.example">hello@tropism.example</a><span>شنبه تا پنج‌شنبه · با هماهنگی قبلی</span></div><div className="footer-note-col"><span className="footer-note-mark">✳</span><p>به خودت<br />فرصت بده.</p><span>TAKE YOUR TIME.</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} تروپیسم — تمامی حقوق محفوظ است.</span><span>ساخته‌شده با توجه به جزئیات و احترام به مسیر تو.</span><a href="#top">بازگشت به بالا ↑</a></div></footer>

      <AnimatePresence>
        {bookingOpen && <motion.div className="booking-overlay" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) setBookingOpen(false); }}>
          <motion.section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.22 }}>
            <button className="modal-close" aria-label="بستن" onClick={() => setBookingOpen(false)}><X size={20} /></button>
            {!submitted ? <>
              <div className="modal-kicker"><Sparkles size={15} /> قدم اول، با انتخاب تو</div><h2 id="booking-title">مسیرت از کجا شروع می‌شود؟</h2><p className="modal-description">نوع همراهی‌ای را که به آن فکر می‌کنی انتخاب کن. این فرم در حال حاضر نمایشی است.</p>
              <div className="booking-options">{services.map((service) => <button key={service.id} className={selectedService === service.title ? 'booking-option selected' : 'booking-option'} onClick={() => setSelectedService(service.title)}><span>{service.title}</span><span className="option-check">{selectedService === service.title && <Check size={13} />}</span></button>)}</div>
              <div className="modal-info-row"><span><Clock3 size={15} /> زمان را بعداً انتخاب می‌کنی</span><span><Video size={15} /> آنلاین یا حضوری</span></div>
              <button className="button button-primary modal-submit" onClick={() => setSubmitted(true)}>ادامهٔ مسیر <ArrowLeft size={17} /></button>
              <p className="modal-disclaimer">با ادامه، هنوز رزرو واقعی یا ثبت اطلاعاتی انجام نمی‌شود.</p>
            </> : <div className="booking-success"><span className="success-mark"><Check size={25} /></span><h2>شروع خوبی‌ست.</h2><p>انتخاب تو: <strong>{selectedService}</strong></p><p>این نمونهٔ اولیه هنوز به سامانهٔ رزرو متصل نیست. برای فعال‌شدن این مرحله باید سرویس رزرو واقعی به سایت اضافه شود.</p><button className="button button-primary modal-submit" onClick={() => setBookingOpen(false)}>متوجه شدم <ArrowLeft size={17} /></button></div>}
          </motion.section>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}
