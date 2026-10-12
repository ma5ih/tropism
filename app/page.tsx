"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft, ArrowUpLeft, Baby, BookOpen, Check, ChevronDown, HeartHandshake,
  Instagram, Leaf, Menu, MessagesSquare, MoveLeft, ShieldCheck, Sparkles,
  UsersRound, X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/"; // Replace with Tropism's verified account URL before launch.

type Service = { title: string; description: string; image: string; icon: LucideIcon; tone: string };
const services: Service[] = [
  { title: "مشاوره روان‌درمانی فردی", description: "برای شناخت بهتر خود، مدیریت احساسات و عبور از روزهای دشوار.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85", icon: Sparkles, tone: "olive" },
  { title: "مشاوره زوج‌درمانی", description: "برای گفت‌وگوی روشن‌تر، شنیدن یکدیگر و ساختن رابطه‌ای سالم‌تر.", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=85", icon: UsersRound, tone: "lilac" },
  { title: "مشاوره کودکان و نوجوانان", description: "همراهی متناسب با سن، نیازها و دنیای در حال رشد فرزند شما.", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=900&q=85", icon: Baby, tone: "sand" },
  { title: "مشاوره روابط جنسی", description: "گفت‌وگویی محترمانه و بدون قضاوت درباره صمیمیت و سلامت رابطه.", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=85", icon: HeartHandshake, tone: "mauve" }
];

const articles = [
  { tag: "روان‌شناسی", title: "چطور با اضطراب روزمره مهربان‌تر کنار بیاییم؟", description: "گاهی اولین قدم برای آرام‌تر شدن، حذف همه احساسات نیست؛ مکث کردن و فهمیدن چیزی است که تجربه می‌کنیم.", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85" },
  { tag: "روابط", title: "۵ نشانه که رابطه به گفت‌وگوی تازه‌ای نیاز دارد", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80" },
  { tag: "کودک و نوجوان", title: "چطور درباره احساسات با فرزندمان حرف بزنیم؟", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=600&q=80" },
  { tag: "مراقبت از خود", title: "مرزبندی سالم؛ از کجا شروع کنیم؟", image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80" }
];

const socialTiles = [
  { title: "مراقبت از خود", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80" },
  { title: "مکث و آرامش", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80" },
  { title: "نگاهی تازه", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80" },
  { title: "فضای امن", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80" }
];

function Brand({ light = false }: { light?: boolean }) {
  return <a className={"brand" + (light ? " brand--light" : "")} href="#home" aria-label="تروپیسم، صفحه اصلی"><span className="brand__mark"><Leaf size={27} strokeWidth={1.5} /></span><span className="brand__word">tropism</span></a>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow"><span className="eyebrow__dot" />{children}</span>;
}

function PrimaryButton({ children, onClick, className = "" }: { children: ReactNode; onClick: () => void; className?: string }) {
  return <button type="button" className={"button button--primary " + className} onClick={onClick}><span>{children}</span><ArrowLeft size={17} /></button>;
}

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!bookingOpen) return;
    const oldOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setBookingOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [bookingOpen]);

  const openBooking = () => { setSubmitted(false); setMenuOpen(false); setBookingOpen(true); };
  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className={"main-nav" + (menuOpen ? " main-nav--open" : "")} aria-label="منوی اصلی">
            <a href="#home" onClick={closeMenu}>خانه</a><a href="#services" onClick={closeMenu}>خدمات</a><a href="#match" onClick={closeMenu}>راهنمای انتخاب درمانگر</a><a href="#journal" onClick={closeMenu}>مجله</a><a href="#about" onClick={closeMenu}>درباره ما</a>
            <button type="button" className="nav-mobile-cta" onClick={openBooking}>درخواست جلسه</button>
          </nav>
          <div className="header-actions"><a className="header-text-link" href="#journal">مجله تروپیسم</a><PrimaryButton onClick={openBooking} className="button--header">درخواست رزرو جلسه</PrimaryButton></div>
          <button type="button" className="menu-toggle" aria-label={menuOpen ? "بستن منو" : "باز کردن منو"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>فضایی امن برای حال بهتر</Eyebrow>
            <h1>قرار نیست<br /><span>همه‌چیز را</span> یک‌تنه حل کنی.</h1>
            <p className="hero-lead">گاهی فقط به فضایی امن نیاز داریم تا مکث کنیم، حرف بزنیم و مسیرمان را روشن‌تر ببینیم. تروپیسم برای شروع این مسیر کنار شماست.</p>
            <div className="hero-actions"><PrimaryButton onClick={openBooking}>پیدا کردن تراپیست مناسب</PrimaryButton><a className="text-link" href="#services">آشنایی با خدمات <ArrowLeft size={16} /></a></div>
            <div className="hero-note"><span className="hero-note__icon"><ShieldCheck size={18} /></span><span>قدم‌به‌قدم، با احترام به مسیر و انتخاب شما</span></div>
          </div>
          <div className="hero-art" aria-label="فضایی آرام برای گفت‌وگو و روان‌درمانی">
            <span className="hero-art__halo hero-art__halo--olive" /><span className="hero-art__halo hero-art__halo--lilac" />
            <div className="hero-photo"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=90" alt="اتاقی روشن با صندلی راحتی و گیاهان سبز" fetchPriority="high" /></div>
            <div className="hero-art__label hero-art__label--top"><span className="hero-art__label-icon"><Leaf size={15} /></span><span>جایی برای شنیدن خودت</span></div>
            <div className="hero-art__quote"><span className="quote-mark">“</span><p>گاهی یک گفت‌وگوی درست، شروع یک تغییر آرام است.</p><span className="quote-line" /></div>
            <div className="hero-art__caption"><span className="caption-number">01</span><span>شروع مسیر، از همین‌جا</span></div>
            <span className="hero-art__leaf"><Leaf size={53} strokeWidth={0.8} /></span>
          </div>
        </div>
        <div className="container hero-bottom"><span className="hero-bottom__line" /><span>با خودت، مهربان‌تر شروع کن</span><a href="#services" aria-label="رفتن به خدمات"><ChevronDown size={17} /></a></div>
      </section>

      <section className="services section-space" id="services">
        <div className="container">
          <div className="section-heading"><Eyebrow>خدمات ما</Eyebrow><h2>از کجا شروع کنیم؟</h2><p>هر مسیری نقطه شروع خودش را دارد. حوزه‌ای را انتخاب کنید که به دغدغه امروز شما نزدیک‌تر است.</p></div>
          <div className="services-grid">
            {services.map((service, index) => { const Icon = service.icon; return (
              <a className={"service-card service-card--" + service.tone} href="#match" key={service.title}>
                <div className="service-card__image"><img src={service.image} alt="" loading="lazy" /><span className="service-card__wash" /><span className="service-card__number">0{index + 1}</span><span className="service-card__icon"><Icon size={21} strokeWidth={1.6} /></span><span className="service-card__reveal"><span>آشنایی با این مسیر</span><ArrowUpLeft size={17} /></span></div>
                <div className="service-card__body"><h3>{service.title}</h3><p>{service.description}</p><span className="service-card__link">بیشتر بدانید <ArrowLeft size={15} /></span></div>
              </a>
            ); })}
          </div>
          <div className="services-footnote"><span className="services-footnote__icon"><MessagesSquare size={18} /></span><p>برای انتخاب دقیق‌تر لازم نیست از قبل همه جواب‌ها را بدانید.</p><button type="button" className="text-link" onClick={openBooking}>از ما راهنمایی بگیر <ArrowLeft size={16} /></button></div>
        </div>
      </section>

      <section className="match-section section-space" id="match">
        <div className="container"><div className="match-panel">
          <div className="match-art"><span className="match-art__shape match-art__shape--one" /><span className="match-art__shape match-art__shape--two" /><img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=85" alt="گیاه سبز در فضای روشن" loading="lazy" /><div className="match-art__note"><Sparkles size={17} /><span>انتخابی متناسب با تو</span></div></div>
          <div className="match-copy"><Eyebrow>از تردید تا انتخاب</Eyebrow><h2>چطور درمانگر مناسب خود را پیدا کنیم؟</h2><p>لازم نیست از همان ابتدا همه‌چیز را بدانید. با چند سؤال ساده درباره نیازها، ترجیحات و شرایطتان شروع می‌کنیم تا انتخاب مسیر بعدی روشن‌تر شود.</p>
            <div className="match-steps">
              <div className="match-step"><span className="match-step__number">۱</span><div><strong>از دغدغه‌ات بگو</strong><span>آنچه این روزها برایت مهم است.</span></div></div>
              <div className="match-step"><span className="match-step__number">۲</span><div><strong>ترجیحاتت را مشخص کن</strong><span>زمان، شیوه جلسه و نوع همراهی.</span></div></div>
              <div className="match-step"><span className="match-step__number">۳</span><div><strong>انتخاب آگاهانه‌تری داشته باش</strong><span>با اطلاعات روشن‌تر قدم بعدی را بردار.</span></div></div>
            </div>
            <PrimaryButton onClick={openBooking}>شروع فرم انتخاب درمانگر</PrimaryButton><span className="match-disclaimer">فرم کوتاه است؛ پاسخ‌ها برای راهنمایی اولیه طراحی شده‌اند.</span>
          </div>
          <aside className="match-aside"><span className="match-aside__ornament"><Leaf size={29} /></span><p>انتخاب درمانگر، یک تصمیم شخصی است.</p><span>ما کمک می‌کنیم سؤال‌های درست‌تری بپرسی.</span><a href="#journal">خواندن راهنمای شروع <ArrowLeft size={15} /></a></aside>
        </div></div>
      </section>

      <section className="journal section-space" id="journal">
        <div className="container">
          <div className="journal-heading"><div className="section-heading"><Eyebrow>مجله تروپیسم</Eyebrow><h2>چیزهایی برای فکر کردن، یاد گرفتن و آرام‌تر شدن</h2><p>مقاله‌هایی درباره خودشناسی، رابطه‌ها و مراقبت از سلامت روان؛ با زبانی ساده و به دور از قضاوت.</p></div><a className="button button--outline journal-all" href="#all-articles">مشاهده همه مقاله‌ها <ArrowLeft size={16} /></a></div>
          <div className="journal-grid">
            <article className="article-feature"><a className="article-image" href="#all-articles" aria-label={"مطالعه مقاله: " + articles[0].title}><img src={articles[0].image} alt="" loading="lazy" /><span className="article-image__wash" /><span className="article-image__arrow"><ArrowUpLeft size={18} /></span></a><div className="article-content"><span className="article-tag">{articles[0].tag}</span><h3><a href="#all-articles">{articles[0].title}</a></h3><p>{articles[0].description}</p><a className="article-read" href="#all-articles">ادامه مطلب <ArrowLeft size={15} /></a></div></article>
            <div className="article-small-list">{articles.slice(1).map((article) => <article className="article-small" key={article.title}><a className="article-image" href="#all-articles" aria-label={"مطالعه مقاله: " + article.title}><img src={article.image} alt="" loading="lazy" /><span className="article-image__wash" /><span className="article-image__arrow"><ArrowUpLeft size={16} /></span></a><div className="article-content"><span className="article-tag">{article.tag}</span><h3><a href="#all-articles">{article.title}</a></h3><p>نگاهی ساده و کاربردی برای روزهای واقعی زندگی.</p><a className="article-read" href="#all-articles">ادامه مطلب <ArrowLeft size={14} /></a></div></article>)}</div>
          </div>
          <div className="journal-bottom" id="all-articles"><span className="journal-bottom__ornament"><BookOpen size={17} /> هر بار، یک قدم کوچک برای آگاهی بیشتر</span><a className="text-link" href="#about">با رویکرد تروپیسم آشنا شو <ArrowLeft size={16} /></a></div>
        </div>
      </section>

      <section className="social-section section-space" id="social">
        <div className="container social-layout">
          <div className="social-copy"><Eyebrow>همراهی بیرون از جلسه</Eyebrow><h2>گفت‌وگوهای کوچک،<br /><span>برای روزهای واقعی.</span></h2><p>در شبکه‌های اجتماعی از مراقبت روزمره از خود، رابطه‌ها و مسیر سلامت روان می‌گوییم؛ کوتاه، کاربردی و بدون نسخه‌های یکسان برای همه.</p>
            <div className="social-profile"><span className="social-profile__avatar"><Leaf size={24} /></span><div className="social-profile__text"><strong>@tropism</strong><span>همراه تروپیسم در اینستاگرام</span></div><span className="social-profile__instagram"><Instagram size={20} /></span></div>
            <a className="button button--dark" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={17} /><span>همراه ما در اینستاگرام</span><ArrowLeft size={16} /></a><span className="social-note">پیوند صفحه رسمی اینستاگرام پیش از انتشار نهایی جایگزین شود.</span>
          </div>
          <div className="social-gallery"><div className="social-gallery__topline"><span>از دنیای تروپیسم</span><span className="social-gallery__handle"><Instagram size={14} /> @tropism</span></div><div className="social-gallery__grid">{socialTiles.map((tile, i) => <a className={"social-tile social-tile--" + (i + 1)} href={INSTAGRAM_URL} target="_blank" rel="noreferrer" key={tile.title} aria-label={tile.title}><img src={tile.image} alt="" loading="lazy" /><span className="social-tile__wash" /><span className="social-tile__index">0{i + 1}</span><span className="social-tile__label">{tile.title}</span><span className="social-tile__arrow"><ArrowUpLeft size={17} /></span></a>)}</div><div className="social-gallery__footer"><span className="social-gallery__leaf"><Leaf size={18} /></span><span>ذهن آگاه‌تر، رابطه‌ای مهربان‌تر، قدمی به سوی خودت</span></div><span className="social-gallery__orbit social-gallery__orbit--one" /><span className="social-gallery__orbit social-gallery__orbit--two" /></div>
        </div>
      </section>

      <section className="about-section section-space" id="about">
        <div className="container about-grid"><div className="about-copy"><Eyebrow>درباره تروپیسم</Eyebrow><h2>رشد، همیشه با یک حرکت بزرگ شروع نمی‌شود.</h2><p>تروپیسم فضایی برای نزدیک‌تر شدن به خود و انتخاب آگاهانه‌تر مسیر سلامت روان است. باور داریم هر آدمی تجربه و نیازهای منحصربه‌فرد خودش را دارد؛ پس همراهی خوب، از شنیدن شروع می‌شود.</p><a className="text-link" href="#match">بیشتر درباره مسیرمان <ArrowLeft size={16} /></a></div>
          <div className="about-quote"><div className="about-quote__image"><img src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=85" alt="برگ‌های سبز یک گیاه در نور طبیعی" loading="lazy" /></div><div className="about-quote__text"><span className="quote-mark">“</span><p>قرار نیست شبیه کسی دیگر شوی؛ قرار است خودت را بهتر بشناسی.</p><span className="about-quote__signature">با مهر، تروپیسم</span></div><span className="about-quote__badge"><Leaf size={17} /> رشد به روش خودت</span></div>
        </div>
      </section>

      <section className="closing-strip"><div className="container closing-strip__inner"><span className="closing-strip__icon"><HeartHandshake size={23} /></span><p>شروع کردن لازم نیست کامل باشد؛ فقط کافی است قدم اول را برداری.</p><PrimaryButton onClick={openBooking}>شروع گفت‌وگو</PrimaryButton></div></section>

      <footer className="site-footer"><div className="container footer-main">
        <div className="footer-brand"><Brand light /><p>مسیر آرام‌تر به سمت حال بهتر.</p><span className="footer-brand__caption">فضایی برای شنیدن، شناختن و رشد کردن.</span></div>
        <div className="footer-column"><h3>دسترسی سریع</h3><a href="#home">صفحه اصلی</a><a href="#services">خدمات ما</a><a href="#match">انتخاب درمانگر</a><a href="#journal">مجله تروپیسم</a></div>
        <div className="footer-column"><h3>خدمات</h3><a href="#services">روان‌درمانی فردی</a><a href="#services">زوج‌درمانی</a><a href="#services">کودک و نوجوان</a><a href="#services">روابط جنسی</a></div>
        <div className="footer-contact"><h3>در ارتباط بمانیم</h3><p>برای آشنایی با محتوای تازه و خبرهای تروپیسم، ما را دنبال کنید.</p><a className="footer-social-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={18} /> اینستاگرام تروپیسم <ArrowLeft size={15} /></a><button type="button" className="footer-contact__button" onClick={openBooking}>درخواست راهنمایی <ArrowLeft size={15} /></button></div>
      </div><div className="container footer-bottom"><span>© تروپیسم · تمامی حقوق محفوظ است.</span><span className="footer-bottom__center"><Leaf size={14} /> با خودت مهربان‌تر باش</span><a href="#home">بازگشت به بالا <MoveLeft size={15} /></a></div></footer>

      {bookingOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false); }}>
        <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button type="button" className="booking-modal__close" onClick={() => setBookingOpen(false)} aria-label="بستن فرم"><X size={20} /></button>
          {!submitted ? <><div className="booking-modal__icon"><Leaf size={24} /></div><Eyebrow>قدم اول</Eyebrow><h2 id="booking-title">برای انتخاب مسیر مناسب شروع کنیم؟</h2><p className="booking-modal__intro">چند مورد را مشخص کن تا بتوانی قدم بعدی را روشن‌تر ببینی.</p>
            <form className="booking-form" onSubmit={handleSubmit}>
              <label>نام و نام خانوادگی<input name="name" autoComplete="name" placeholder="نام شما" required /></label>
              <label>شماره تماس<input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="شماره‌ای برای تماس" required /></label>
              <label>در چه زمینه‌ای دنبال همراهی هستید؟<select name="service" defaultValue="" required><option value="" disabled>انتخاب حوزه مشاوره</option><option>روان‌درمانی فردی</option><option>زوج‌درمانی</option><option>کودکان و نوجوانان</option><option>روابط جنسی</option><option>هنوز مطمئن نیستم</option></select></label>
              <label>شیوه ترجیحی جلسه<select name="format" defaultValue="فرقی نمی‌کند"><option>آنلاین</option><option>حضوری</option><option>فرقی نمی‌کند</option></select></label>
              <button type="submit" className="button button--primary booking-form__submit">ادامه <ArrowLeft size={17} /></button><p className="booking-form__privacy"><ShieldCheck size={15} /> اطلاعات شما در این نمونه به سرور ارسال نمی‌شود.</p>
            </form></> : <div className="booking-success"><span className="booking-success__icon"><Check size={29} /></span><h2 id="booking-title">فرم نمونه تکمیل شد</h2><p>ظاهر و اعتبارسنجی فرم آماده است. برای دریافت واقعی درخواست‌ها، باید فرم به سامانه رزرو امن متصل شود.</p><button type="button" className="button button--primary" onClick={() => setBookingOpen(false)}>متوجه شدم <ArrowLeft size={17} /></button></div>}
        </section>
      </div>}
    </main>
  );
}