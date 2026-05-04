import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";

const shops = [
  { id: 1, name: "The Canteen", cuisine: "Rice Meals · All-Day", rating: "4.8", time: "10–15 min", emoji: "🍱", tag: "Best Seller" },
  { id: 2, name: "Munchies Corner", cuisine: "Snacks · Kakanin", rating: "4.7", time: "5–10 min", emoji: "🧁", tag: "Student Fave" },
  { id: 3, name: "Brew & Bites", cuisine: "Coffee · Sandwiches", rating: "4.9", time: "8–12 min", emoji: "☕", tag: "Top Rated" },
  { id: 4, name: "Grill House", cuisine: "BBQ · Isaw · Ihaw", rating: "4.6", time: "15–20 min", emoji: "🍢", tag: "Open Late" },
];

const features = [
  { icon: "🗺️", title: "Campus Stalls Only", desc: "Every shop is right on campus — no waiting for deliveries from outside. Order from where you are." },
  { icon: "⚡", title: "Order in Seconds", desc: "Skip the long canteen lines. Add to cart, pay, and pick up when it's ready — between classes." },
  { icon: "🔔", title: "Get Notified", desc: "We'll ping you when your order's ready so you can keep studying (or scrolling, we won't judge)." },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#FAFAF8;color:#1C1C1C;line-height:1.6;-webkit-font-smoothing:antialiased;}
a{text-decoration:none;color:inherit;}ul{list-style:none;}

:root{
  --red:#8A252C;--red-dark:#6b1a20;--red-light:#b03039;
  --gold:#F4C522;--gold-dark:#d4a91a;
  --cream:#FAFAF8;--white:#fff;
  --text:#1C1C1C;--muted:#6E6E6E;--border:#EBEBEB;
  --shadow-sm:0 2px 10px rgba(28,28,28,.07);
  --shadow-md:0 8px 28px rgba(28,28,28,.10);
  --shadow-lg:0 20px 52px rgba(28,28,28,.14);
  --r:12px;--r-lg:20px;--r-xl:28px;
  --t:0.22s cubic-bezier(.4,0,.2,1);
}

.page{min-height:100vh;overflow-x:hidden;}
.container{width:100%;max-width:1180px;margin:0 auto;padding:0 28px;}
.section{padding:88px 0;}
.grid{display:grid;gap:22px;}
.g3{grid-template-columns:repeat(3,1fr);}
.g4{grid-template-columns:repeat(4,1fr);}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:.9rem;padding:13px 26px;border-radius:var(--r);cursor:pointer;border:2px solid transparent;transition:all var(--t);white-space:nowrap;letter-spacing:.01em;}
.btn-red{background:var(--red);color:var(--white);border-color:var(--red);}
.btn-red:hover{background:var(--red-dark);transform:translateY(-2px);box-shadow:0 8px 22px rgba(138,37,44,.35);}
.btn-gold{background:var(--gold);color:var(--red);border-color:var(--gold);font-weight:800;}
.btn-gold:hover{background:var(--red);color:var(--gold);border-color:var(--red);transform:translateY(-2px);box-shadow:0 8px 22px rgba(244,197,34,.4);}
.btn-ghost{background:rgba(255,255,255,.14);color:var(--white);border-color:rgba(255,255,255,.45);backdrop-filter:blur(6px);}
.btn-ghost:hover{background:rgba(255,255,255,.26);border-color:var(--white);transform:translateY(-2px);}
.btn-outline{background:transparent;color:var(--red);border-color:var(--red);}
.btn-outline:hover{background:var(--red);color:var(--white);transform:translateY(-2px);}
.btn-sm{padding:9px 18px;font-size:.82rem;}
.btn-full{width:100%;margin-top:14px;}

.sec-hdr{text-align:center;margin-bottom:56px;}
.sec-eyebrow{display:inline-block;background:rgba(138,37,44,.08);color:var(--red);font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:6px 16px;border-radius:40px;margin-bottom:14px;}
.sec-title{font-family:'Unbounded',sans-serif;font-size:clamp(1.7rem,3vw,2.4rem);font-weight:900;color:var(--text);line-height:1.15;margin-bottom:12px;}
.sec-sub{color:var(--muted);font-size:1rem;max-width:480px;margin:0 auto;line-height:1.7;}

.card{background:var(--white);border-radius:var(--r-lg);box-shadow:var(--shadow-sm);border:1px solid var(--border);overflow:hidden;transition:transform var(--t),box-shadow var(--t);}
.card:hover{transform:translateY(-5px);box-shadow:var(--shadow-lg);}

.navbar{position:sticky;top:0;z-index:1000;background:var(--red);}
.navbar::after{content:'';display:block;height:3px;background:linear-gradient(90deg,var(--gold) 0%,#f4c52200 100%);}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:66px;}
.logo{display:flex;align-items:center;gap:10px;font-family:'Unbounded',sans-serif;font-size:1.25rem;font-weight:900;color:var(--white);letter-spacing:-.02em;transition:opacity var(--t);}
.logo:hover{opacity:.88;}
.logo-mark{background:var(--gold);color:var(--red);width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;box-shadow:0 2px 8px rgba(244,197,34,.4);}
.logo span b{color:var(--gold);}
.nav-links{display:flex;align-items:center;gap:4px;}
.nav-link{color:rgba(255,255,255,.78);font-size:.88rem;font-weight:600;padding:8px 14px;border-radius:8px;transition:all var(--t);cursor:pointer;}
.nav-link:hover,.nav-link.on{color:var(--gold);background:rgba(244,197,34,.1);}
.nav-cart{position:relative;display:inline-flex;align-items:center;gap:6px;}
.cbadge{background:var(--gold);color:var(--red);font-size:.6rem;font-weight:900;min-width:17px;height:17px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;padding:0 3px;}
.nav-cta{margin-left:8px;}

.hero{position:relative;background:var(--red);overflow:hidden;padding:90px 0 110px;display:flex;align-items:center;}
.hero-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 55% 80% at 85% 40%,rgba(244,197,34,.22) 0%,transparent 55%),radial-gradient(ellipse 35% 50% at 5% 90%,rgba(255,255,255,.05) 0%,transparent 50%),radial-gradient(ellipse 30% 40% at 50% 0%,rgba(176,48,57,.6) 0%,transparent 60%);pointer-events:none;}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;align-items:center;gap:60px;}
.hero-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);color:rgba(255,255,255,.9);font-size:.78rem;font-weight:700;padding:7px 16px;border-radius:40px;margin-bottom:22px;backdrop-filter:blur(8px);}
.hero-chip-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.7);}}
.hero-h1{font-family:'Unbounded',sans-serif;font-size:clamp(2.6rem,5.5vw,4.4rem);font-weight:900;color:var(--white);line-height:1.08;margin-bottom:20px;letter-spacing:-.02em;}
.hero-h1 em{font-style:normal;color:var(--gold);}
.hero-p{font-size:1.05rem;color:rgba(255,255,255,.8);max-width:420px;margin-bottom:36px;line-height:1.75;}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:52px;}
.hero-proof{display:flex;align-items:center;gap:20px;}
.proof-avatars{display:flex;}
.avatar{width:34px;height:34px;border-radius:50%;border:2.5px solid var(--red);background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:.85rem;margin-left:-10px;}
.avatar:first-child{margin-left:0;}
.proof-text{color:rgba(255,255,255,.75);font-size:.82rem;line-height:1.4;}
.proof-text strong{color:var(--gold);font-weight:700;}
.hero-card-stack{position:relative;width:280px;height:320px;flex-shrink:0;}
.hcard{position:absolute;background:var(--white);border-radius:20px;padding:18px;box-shadow:var(--shadow-lg);}
.hcard-main{width:220px;top:20px;right:0;}
.hcard-side{width:180px;top:130px;right:60px;background:var(--gold);}
.hcard-bot{width:160px;top:230px;right:20px;}
.hcard-emoji{font-size:2rem;margin-bottom:8px;}
.hcard-name{font-family:'Unbounded',sans-serif;font-size:.8rem;font-weight:900;color:var(--text);margin-bottom:3px;}
.hcard-name.inv{color:var(--red);}
.hcard-sub{font-size:.72rem;color:var(--muted);}
.hcard-sub.inv{color:rgba(138,37,44,.7);}
.hcard-row{display:flex;align-items:center;justify-content:space-between;margin-top:10px;}
.hcard-tag{font-size:.65rem;font-weight:700;background:rgba(138,37,44,.08);color:var(--red);padding:3px 9px;border-radius:20px;}
.hcard-tag.inv{background:rgba(138,37,44,.15);color:var(--red);}
.hcard-price{font-family:'Unbounded',sans-serif;font-size:.88rem;font-weight:900;color:var(--red);}
@keyframes rise{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
.fe{position:absolute;animation:fb 4s ease-in-out infinite;pointer-events:none;filter:drop-shadow(0 4px 14px rgba(0,0,0,.2));z-index:1;user-select:none;}
.fe1{top:8%;left:48%;font-size:2.2rem;}
.fe2{bottom:18%;left:44%;font-size:1.8rem;animation-delay:1.2s;}
.fe3{top:60%;left:38%;font-size:2rem;animation-delay:.6s;}
@keyframes fb{0%,100%{transform:translateY(0) rotate(-4deg);}50%{transform:translateY(-13px) rotate(4deg);}}

.features-sec{background:var(--white);}
.feat-card{padding:34px 28px;display:flex;flex-direction:column;gap:14px;border-top:3px solid transparent;transition:transform var(--t),box-shadow var(--t),border-color var(--t);}
.feat-card:hover{border-top-color:var(--gold);}
.feat-icon{width:64px;height:64px;border-radius:var(--r);background:#FFF8E1;display:flex;align-items:center;justify-content:center;font-size:2rem;transition:transform var(--t),background var(--t);}
.feat-card:hover .feat-icon{transform:scale(1.1) rotate(-5deg);background:#fef3c7;}
.feat-title{font-family:'Unbounded',sans-serif;font-size:1.05rem;font-weight:900;color:var(--text);}
.feat-desc{font-size:.9rem;color:var(--muted);line-height:1.7;}

.shops-sec{background:var(--cream);}
.shop-card{display:flex;flex-direction:column;}
.shop-cover{height:120px;background:linear-gradient(140deg,var(--red) 0%,var(--red-light) 100%);display:flex;align-items:center;justify-content:center;font-size:3.2rem;position:relative;overflow:hidden;}
.shop-cover::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 65% 25%,rgba(244,197,34,.22) 0%,transparent 55%);}
.shop-emoji-wrap{position:relative;z-index:1;transition:transform var(--t);}
.shop-card:hover .shop-emoji-wrap{transform:scale(1.12) rotate(6deg);}
.shop-badge{position:absolute;top:10px;left:10px;z-index:2;font-size:.65rem;font-weight:800;padding:4px 10px;border-radius:20px;background:var(--gold);color:var(--red);}
.shop-rating{position:absolute;top:10px;right:10px;z-index:2;font-size:.68rem;font-weight:800;padding:4px 10px;border-radius:20px;background:rgba(255,255,255,.9);color:var(--text);}
.shop-body{padding:16px 18px 18px;display:flex;flex-direction:column;flex:1;}
.shop-name{font-family:'Unbounded',sans-serif;font-size:.95rem;font-weight:900;color:var(--text);margin-bottom:3px;}
.shop-cuisine{font-size:.78rem;color:var(--muted);margin-bottom:12px;}
.shop-meta{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:2px;}
.mpill{font-size:.7rem;font-weight:600;padding:4px 10px;border-radius:20px;background:rgba(138,37,44,.07);color:var(--red);}
.mpill-green{background:rgba(34,197,94,.1);color:#16a34a;}
.shops-more{text-align:center;margin-top:44px;}

.promo-sec{background:var(--white);padding:40px 0 88px;}
.promo-wrap{background:var(--red);border-radius:var(--r-xl);padding:56px 52px;display:flex;align-items:center;justify-content:space-between;gap:40px;position:relative;overflow:hidden;box-shadow:var(--shadow-lg);}
.promo-wrap::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 95% 50%,rgba(244,197,34,.2) 0%,transparent 55%),radial-gradient(ellipse at 5% 100%,rgba(255,255,255,.04) 0%,transparent 40%);pointer-events:none;}
.promo-left{position:relative;z-index:1;}
.promo-eyebrow{display:inline-block;background:rgba(244,197,34,.18);color:var(--gold);font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:6px 16px;border-radius:40px;margin-bottom:16px;border:1px solid rgba(244,197,34,.35);}
.promo-h2{font-family:'Unbounded',sans-serif;font-size:clamp(1.5rem,2.8vw,2.1rem);font-weight:900;color:var(--white);margin-bottom:12px;line-height:1.15;}
.promo-sub{color:rgba(255,255,255,.78);margin-bottom:28px;font-size:.92rem;line-height:1.65;}
.promo-code{display:inline-block;background:rgba(244,197,34,.15);color:var(--gold);font-family:'Unbounded',sans-serif;font-size:.82rem;font-weight:900;padding:4px 12px;border-radius:6px;border:1px dashed rgba(244,197,34,.5);letter-spacing:.08em;}
.promo-right{position:relative;z-index:1;display:flex;gap:16px;align-items:center;}
.pbub{border-radius:50%;background:rgba(255,255,255,.12);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;animation:fb 3.8s ease-in-out infinite;flex-shrink:0;}
.pb1{width:88px;height:88px;font-size:2.3rem;}
.pb2{width:66px;height:66px;font-size:1.7rem;animation-delay:.9s;}
.pb3{width:54px;height:54px;font-size:1.4rem;animation-delay:1.8s;}

.footer{background:var(--red);padding:48px 0 32px;}
.footer-top{display:flex;align-items:flex-start;justify-content:space-between;gap:40px;padding-bottom:36px;border-bottom:1px solid rgba(255,255,255,.12);margin-bottom:28px;flex-wrap:wrap;}
.footer-logo{display:flex;align-items:center;gap:10px;font-family:'Unbounded',sans-serif;font-size:1.2rem;font-weight:900;color:var(--white);margin-bottom:10px;}
.footer-tagline{font-size:.82rem;color:rgba(255,255,255,.55);max-width:220px;line-height:1.6;}
.footer-cols{display:flex;gap:48px;flex-wrap:wrap;}
.footer-col h5{font-family:'Unbounded',sans-serif;font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;}
.footer-col ul{display:flex;flex-direction:column;gap:8px;}
.footer-col a{font-size:.85rem;color:rgba(255,255,255,.6);transition:color var(--t);cursor:pointer;}
.footer-col a:hover{color:var(--gold);}
.footer-bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
.footer-copy{font-size:.78rem;color:rgba(255,255,255,.35);}
.footer-hearts{font-size:.78rem;color:rgba(255,255,255,.4);}
.footer-hearts span{color:var(--gold);}

@media(max-width:960px){
  .g4{grid-template-columns:repeat(2,1fr);}
  .hero-inner{grid-template-columns:1fr;}
  .hero-card-stack{display:none;}
  .fe1,.fe2,.fe3{display:none;}
  .promo-wrap{flex-direction:column;text-align:center;padding:44px 32px;}
  .footer-top{flex-direction:column;}
}
@media(max-width:640px){
  .section{padding:60px 0;}
  .g3{grid-template-columns:1fr;}
  .g4{grid-template-columns:1fr;}
  .hero{padding:64px 0 80px;}
  .hero-h1{font-size:2.4rem;}
  .hero-btns{flex-direction:column;}
  .hero-btns .btn{width:100%;}
  .promo-right{display:none;}
  .footer-cols{gap:32px;}
}
`;

export default function WildEatsHome() {
  return (
    <>
      <style>{css}</style>
      <div className="page">

        <Navbar />

        {/* HERO */}
        <section className="hero">
          <div className="hero-mesh" />
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <div className="hero-chip">
                  <span className="hero-chip-dot" />
                  Campus Stalls — Open Now
                </div>
                <h1 className="hero-h1">
                  Fuel Your<br />
                  <em>Campus Life.</em>
                </h1>
                <p className="hero-p">
                  Order from your favorite campus stalls between classes. No waiting in line, no missing lectures — just good food, fast.
                </p>
                <div className="hero-btns">
                  <Link to="/browse-shop" className="btn btn-gold">Browse Stalls 🐾</Link>
                  <a href="#features" className="btn btn-ghost">How It Works</a>
                </div>
                <div className="hero-proof">
                  <div className="proof-avatars">
                    {["😊", "😄", "🤩", "😋"].map((e, i) => (
                      <div className="avatar" key={i} style={{ zIndex: 4 - i }}>{e}</div>
                    ))}
                  </div>
                  <div className="proof-text">
                    <strong>2,400+ students</strong> already ordering<br />
                    on campus this semester
                  </div>
                </div>
              </div>

              <div className="hero-card-stack">
                <div className="hcard hcard-main">
                  <div className="hcard-emoji">🍱</div>
                  <div className="hcard-name">Canteen Special</div>
                  <div className="hcard-sub">Rice + Ulam + Soup</div>
                  <div className="hcard-row">
                    <span className="hcard-tag">Ready in 8 min</span>
                    <span className="hcard-price">₱65</span>
                  </div>
                </div>
                <div className="hcard hcard-side">
                  <div className="hcard-emoji">☕</div>
                  <div className="hcard-name inv">Brew & Bites</div>
                  <div className="hcard-sub inv">Iced Coffee · Sandwiches</div>
                  <div className="hcard-row">
                    <span className="hcard-tag inv">⭐ 4.9</span>
                    <span className="hcard-price inv">₱45+</span>
                  </div>
                </div>
                <div className="hcard hcard-bot">
                  <div style={{ fontSize: '.75rem', fontWeight: 700, color: '#16a34a', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
                    Order Ready!
                  </div>
                  <div className="hcard-name" style={{ fontSize: '.75rem' }}>Your isaw order 🍢</div>
                  <div className="hcard-sub">Grill House · Building C</div>
                </div>
                <div className="fe fe1">🧋</div>
                <div className="fe fe2">🍔</div>
                <div className="fe fe3">🍜</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-sec section" id="features">
          <div className="container">
            <div className="sec-hdr">
              <span className="sec-eyebrow">Built for Students</span>
              <h2 className="sec-title">Made for the Campus Grind</h2>
              <p className="sec-sub">WildEats is designed around your schedule — 15-minute breaks and all.</p>
            </div>
            <div className="grid g3">
              {features.map((f, i) => (
                <div className="card feat-card" key={i}>
                  <div className="feat-icon">{f.icon}</div>
                  <h3 className="feat-title">{f.title}</h3>
                  <p className="feat-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SHOPS */}
        <section className="shops-sec section" id="shops">
          <div className="container">
            <div className="sec-hdr">
              <span className="sec-eyebrow">On Campus Now</span>
              <h2 className="sec-title">Popular Stalls Today</h2>
              <p className="sec-sub">All stalls are within walking distance. Pick one and order ahead.</p>
            </div>
            <div className="grid g4">
              {shops.map((shop) => (
                <div className="card shop-card" key={shop.id}>
                  <div className="shop-cover">
                    <span className="shop-badge">{shop.tag}</span>
                    <span className="shop-rating">⭐ {shop.rating}</span>
                    <div className="shop-emoji-wrap">{shop.emoji}</div>
                  </div>
                  <div className="shop-body">
                    <h4 className="shop-name">{shop.name}</h4>
                    <p className="shop-cuisine">{shop.cuisine}</p>
                    <div className="shop-meta">
                      <span className="mpill">🕐 {shop.time}</span>
                      <span className="mpill mpill-green">✓ Open</span>
                    </div>
                    <Link to={`/menu-list/${shop.id}`} className="btn btn-red btn-full">View Menu</Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="shops-more">
              <Link to="/browse-shop" className="btn btn-outline">See All Campus Stalls →</Link>
            </div>
          </div>
        </section>

        {/* PROMO */}
        <section className="promo-sec">
          <div className="container">
            <div className="promo-wrap">
              <div className="promo-left">
                <div className="promo-eyebrow">New Student Deal 🎓</div>
                <h2 className="promo-h2">First Order?<br />You Eat for Less.</h2>
                <p className="promo-sub">
                  Get ₱30 off your first WildEats order. Use code{" "}
                  <span className="promo-code">WILD30</span>{" "}
                  at checkout. New accounts only.
                </p>
                <Link to="/register" className="btn btn-gold">Grab the Deal</Link>
              </div>
              <div className="promo-right">
                <div className="pbub pb1">🍱</div>
                <div className="pbub pb2">🧁</div>
                <div className="pbub pb3">🌮</div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer-top">
              <div className="footer-brand">
                <div className="footer-logo">
                  <div className="logo-mark">🐾</div>
                  <span>Wild<b style={{ color: "#F4C522" }}>Eats</b></span>
                </div>
                <p className="footer-tagline">Your campus food companion. Order ahead, eat on time.</p>
              </div>
              <div className="footer-cols">
                <div className="footer-col">
                  <h5>Explore</h5>
                  <ul>
                    <li><Link to="/browse-shop">Browse Stalls</Link></li>
                    <li><Link to="/browse-shop">Today's Specials</Link></li>
                    <li><Link to="/my-orders">My Orders</Link></li>
                    <li><Link to="/cart">Favorites</Link></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h5>Support</h5>
                  <ul>
                    <li><a>Help Center</a></li>
                    <li><a>Report an Issue</a></li>
                    <li><a>Contact Us</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h5>About</h5>
                  <ul>
                    <li><a>About WildEats</a></li>
                    <li><a>Join as a Stall</a></li>
                    <li><a>Privacy Policy</a></li>
                    <li><a>Terms of Use</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="footer-copy">© 2025 WildEats. All rights reserved.</p>
              <p className="footer-hearts">Made with <span>♥</span> for campus life 🐾</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}