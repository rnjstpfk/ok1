import "./About.scss";

// 🔸 에셋 (프로젝트 경로에 맞게 수정)
import artMain from "../assets/about/ZakShaiLou.avif";   // 좌측 큰 일러스트
import artChip from "../assets/about/MIRRORS_EDIT.avif";   // 우측 작은 카드 이미지

export default function About() {
  return (
    <main className="about-page">
      {/* 상단 얇은 바 - 전체 폭 */}
      <div className="page-banner">LET’S TALK ABOUT ME.</div>

      {/* 히어로 */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">OK<br/>WHO?</h1>

          <p className="hero-sub">
            Hi, it’s us, OK Drugs. Nice to meet you.
            <br/>
            If you’re here it’s probably because you want to know
            <br/>
            more about us. Weird. Still, we’ll indulge you.
          </p>
        </div>
      </section>

      {/* 본문 레이아웃 */}
      <section className="container body">
        <div className="grid">
          {/* 왼쪽: 큰 일러스트 */}
          <figure className="main-art">
            <img src={artMain} alt="OK Drugs founders illustration" />
          </figure>

          {/* 오른쪽: 텍스트 블록 */}
          <div className="copy">
            <p>
              After a decade of working in the cannabis industry we finally said OK Drugs,
              and the response was an astounding “WTF, is OK Drugs?” but that just made us
              love it more. A funny thing happened once we’d escaped the corporate hamster wheel /
              rat cage / rodent metaphor and stopped to appreciate the epic micro moments that surrounded us.
            </p>

            <p>
              It’s a sort of supplement for self improvement… a magic bullet pointed straight at mindfulness…
              something that helps shape the way you view the world around you.
            </p>

            {/* 우측 칩 이미지 */}
            <figure className="chip">
              <img src={artChip} alt="OK Drugs capsule pattern" />
            </figure>

            <p className="small">
              If you really want to get down to it, we’re just your friendly neighborhood
              advocates for alternative head spaces.
            </p>

            <p className="signoff">
              Love,<br/>
              Zak, Shai and Lou.
            </p>
          </div>
        </div>
        
      </section>
      <div className="footer-banner">Not sure where you are, but you are definitely here.</div>
    </main>
  );
}
