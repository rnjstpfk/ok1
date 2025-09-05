import "./Home.scss";
import { useNavigate } from "react-router-dom";

// 이미지
import leftImg from "../assets/FLATLAY_3.avif";
import rightImg from "../assets/Yacht_it_final.avif";
import brandImg from "../assets/OK_DRUGS_LOGO.png";
import coffeeStar from "../assets/Coffestar.avif";

import costImg from "../assets/Tansparent_Price_gummy_web.avif";

import eatablesBg from "../assets/OK.png";     // 🟠 배경 이미지
import eatablesText from "../assets/Eatables.avif";

import whoLeft from "../assets/_MG_1759.avif";   // ← 왼쪽 큰 이미지
import whoRight from "../assets/PEACH_BOX_NEW3.avif";

// 두 종류 화살표 아이콘
function ArrowRight({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 24" fill="none" aria-hidden="true">
      <path d="M2 12H98" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M98 12L86 4M98 12L86 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowThin({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 24" fill="none" aria-hidden="true">
      <path d="M2 12H58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M58 12l-8-6M58 12l-8 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();

  // 접근성 포함: 클릭 + Enter/Space 키로도 이동
  const goEatables = () => navigate("/eatables");
  const goWearables = () => navigate("/wearables");
  const goAbout = () => navigate("/about");

  const onKeyGo = (fn) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  return (
    <main className="home">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container grid">
          {/* 로고 */}
          <img className="brand-float" src={brandImg} alt="OK DRUGS." />

          {/* 왼쪽 큰 이미지 → /eatables */}
          <div
            className="img-wrap left"
            role="link"
            tabIndex={0}
            onClick={goEatables}
            onKeyDown={onKeyGo(goEatables)}
            style={{ cursor: "pointer" }}
            aria-label="Go to Eatables"
          >
            <img src={leftImg} alt="product collage" />
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="right-col">
            <p className="desc">
              Check in. Chew up. Tune out. Ok Drugs <br />
              helps elevate micro-experiences for those <br />
              who want to check-in to the moment in a <br />
              hard and heavy world.
            </p>

            {/* 오른쪽 이미지 → /wearables */}
            <div
              className="img-wrap right"
              role="link"
              tabIndex={0}
              onClick={goWearables}
              onKeyDown={onKeyGo(goWearables)}
              style={{ cursor: "pointer" }}
              aria-label="Go to Wearables"
            >
              <img className="rImg" src={rightImg} alt="cap on cactus" />
              <img className="coffee-star" src={coffeeStar} alt="" />
            </div>

            {/* 모바일 전용 SHOP NOW → /eatables */}
            <div
              className="cta-row only-mobile mob-4"
              role="link"
              tabIndex={0}
              onClick={goEatables}
              onKeyDown={onKeyGo(goEatables)}
              style={{ cursor: "pointer" }}
              aria-label="Go to Eatables"
            >
              <div className="huge">SHOP NOW</div>
            </div>

            <div
              className="lead-row only-mobile mob-5"
              role="link"
              tabIndex={0}
              onClick={goEatables}
              onKeyDown={onKeyGo(goEatables)}
              style={{ cursor: "pointer" }}
              aria-label="Go to Eatables"
            >
              <p className="lead">
                Get your feel good fix that <br />
                brings you back to life.
              </p>
            </div>
          </div>
        </div>

        {/* 데스크톱 전용 SHOP NOW → /eatables */}
        <div
          className="container cta-row only-desktop"
          role="link"
          tabIndex={0}
          onClick={goEatables}
          onKeyDown={onKeyGo(goEatables)}
          style={{ cursor: "pointer" }}
          aria-label="Go to Eatables"
        >
          <div className="huge">SHOP NOW</div>
        </div>

        <div
          className="container lead-row only-desktop"
          role="link"
          tabIndex={0}
          onClick={goEatables}
          onKeyDown={onKeyGo(goEatables)}
          style={{ cursor: "pointer" }}
          aria-label="Go to Eatables"
        >
          <p className="lead">
            Get your feel good fix that <br />
            brings you back to life.
          </p>
          <ArrowRight className="cta-arrow" />
        </div>
      </section>

      <div className="amazing-banner">SOMETHING AMAZING IS ABOUT TO HAPPEN</div>

      {/* ===== COST ===== */}
      <section className="cost">
        <div
          className="container cost-clickable"
          role="link"
          tabIndex={0}
          onClick={goEatables}
          onKeyDown={onKeyGo(goEatables)}
          style={{ cursor: "pointer" }}
          aria-label="Go to Eatables"
        >
          <div className="cost-head">
            <h2 className="ttl">EAT CBD</h2>
            <div className="copy">
              <h3 className="sub">Here’s the deal…</h3>
              <p className="desc">
                We price low so you can get high (not really, it’s CBD). Our epic
                entourage of eatables explains this below. They’re great like that.
              </p>
            </div>
          </div>

          <figure className="cost-figure">
            <img src={costImg} alt="Cost breakdown infographic" />
          </figure>
        </div>

        <div className="amazing-banner">FIND OUT IF YOU REALLY EXIST</div>
      </section>

      {/* ===== EATABLES SECTION ===== */}
      <section className="eatables-section">
        <img className="bg" src={eatablesBg} alt="Eatables background pattern" />
        <img
          className="text"
          src={eatablesText}
          alt="Eatables headline"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </section>

      <div className="amazing-banner">BREAK THE ILLUSION - FIND CLARITY</div>


      {/* ===== WHO AM I ===== */}
      <section className="whoami">
        <div className="container who-grid">
          {/* 스타 + 타이틀 */}
          <div className="who-title">
            <div className="star">＊</div>
            <h2>
              <span>WHO</span>
              <span>AM I?</span>
            </h2>
          </div>

          {/* 왼쪽 큰 이미지 */}
          <figure className="who-img-left">
            <img src={whoLeft} alt="OK Drugs boxes" />
          </figure>

          {/* 가운데 카피 */}
          <div className="who-copy">
            <h3>We bring you the clarity in crazy.</h3>
            <p>
              Ok Drugs Peach Eatables, sweet little peachy nuggets, with one sentiment in mind:
              WE bring YOU back to life (angel emoji). We’ve got a strong background in cannabis,
              technology, and design, the Ok Drugs team’s expertise results in a full experience
              that will surely keep you curious, we’re pot heads (shrugging emoji).
            </p>
            <p>
              We finally said, “Ok Drugs,” in 2018. We have one hand in our pocket, and the other
              hand is flashing a peace sign (upside down smiley emoji). Thus, here is our
              unabashedly blunt attitude towards living: WE want to bring YOU the PEACE and
              SATISFACTION we have found. Ok Drugs is rattling your bones, telling the status quo
              to f*ck off, grinding it down to what matters, life.
            </p>
          </div>

          {/* 오른쪽 상자 이미지 */}
          <figure className="who-img-right">
            <img src={whoRight} alt="Peach Eatables box" />
          </figure>
        </div>

        {/* 우하단 얇은 화살표 */}
        <button
          type="button"
          className="who-arrow-btn"
          onClick={goAbout}
          onKeyDown={onKeyGo(goAbout)}
          aria-label="Go to About"
        >
          <ArrowThin className="who-arrow" />
        </button>


        {/* 하단 좁은 바 */}
        <div className="who-bar">
          NOT SURE WHERE YOU ARE, BUT YOU ARE DEFINITELY HERE.
        </div>
      </section>




      {/* ===== LET'S CHAT ===== */}
      <section className="contact">
        <div className="container">
          <h2 className="contact-title">LET’S CHAT</h2>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: 여기에 제출 로직 연결(ajax/Email service 등)
              alert("Thanks! We’ll be in touch.");
            }}
          >
            <div className="row two">
              <label className="field">
                <span className="label">First Name</span>
                <input type="text" name="firstName" placeholder="" />
              </label>

              <label className="field">
                <span className="label">Last Name</span>
                <input type="text" name="lastName" placeholder="" />
              </label>
            </div>

            <div className="row two">
              <label className="field">
                <span className="label">Email</span>
                <input type="email" name="email" placeholder="" />
              </label>

              <label className="field">
                <span className="label">Phone</span>
                <input type="tel" name="phone" placeholder="" />
              </label>
            </div>

            <label className="field">
              <span className="label sr-only">Message</span>
              <textarea
                name="message"
                rows={6}
                placeholder="Tell us a secret..."
              />
            </label>

            <div className="actions">
              <button type="submit" className="btn-dark">Ok</button>
            </div>
          </form>
        </div>
      </section>

    </main>
  );
}
