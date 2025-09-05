import "./Eatables.scss";
import heroImg from "../assets/5c2bcb_0d0804f90b7b42ba98be9dbf7ed90140~mv2.avif";

export default function Eatables() {
  return (
    <main className="eatables-page">
      {/* 상단 얇은 바 - 전체 폭 */}
      <div className="page-banner">
        NOT SURE WHERE YOU ARE BUT YOU ARE DEFINITELY HERE
      </div>

      <section className="container product">
        {/* 좌: 이미지 */}
        <div className="product-left">
          <figure className="product-media">
            <img src={heroImg} alt="OK Drugs Peach Eatables" />
          </figure>
        </div>

        {/* 우: 제품 정보 */}
        <div className="product-info">
          <header className="title-wrap">
            <h1 className="title">
              <span>PEACH</span>
              <span>EATABLES</span>
            </h1>
            <div className="price">$24.99</div>
          </header>

          {/* 비활성 버튼 */}
          <button className="btn-disabled" aria-disabled="true" tabIndex={-1}>
            Making More Gummies!!
          </button>

          {/* 성분표 */}
          <details className="ingredients" open>
            <summary>Ingredients:</summary>
            <div className="ing-body">
              Organic Cane Sugar, Organic Tapioca Syrup, Pectin, Organic Peach Concentrate,
              Broad Spectrum Hemp Extract, Citric Acid, Organic Color, L-Theanine
            </div>
          </details>

          {/* 공유 아이콘 (원본 SVG 4개) */}
          <div className="share">
            <a href="#" aria-label="Share on Facebook" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.1 5.66 21.2 10.44 22v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.5-3.88 3.8-3.88 1.1 0 2.24.2 2.24.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22C18.34 21.2 22 17.1 22 12.07z"/>
              </svg>
            </a>
            <a href="#" aria-label="Share on Pinterest" title="Pinterest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 3 5.64 3 10.09c0 3.17 1.78 4.97 2.8 4.97.44 0 .7-1.23.7-1.58 0-.41-1.06-1.3-1.06-3.04 0-3.59 2.73-6.12 6.62-6.12 3.22 0 5.6 1.83 5.6 5.2 0 2.51-1.02 7.25-4.33 7.25-1.2 0-2.23-.86-2.23-2.09 0-1.81 1.27-3.56 1.27-5.43 0-3.15-4.48-2.58-4.48 1.2 0 .8.1 1.67.47 2.38l-1.9 7.82c-.56 2.28-.08 5.08-.04 5.35h.03c.02 0 1.46-1.07 2.42-2.9 1.58-3 1.02-3.85 2.5-8.92.43.82 1.53 1.34 2.68 1.34 4.08 0 6.84-3.72 6.84-8.15C21.07 5.47 17.29 2 12.04 2z"/>
              </svg>
            </a>
            <a href="#" aria-label="Share on WhatsApp" title="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.49A10.66 10.66 0 0 0 12.04 0C5.78 0 .7 5.05.7 11.27c0 1.99.52 3.93 1.5 5.64L0 24l7.3-2.09a11 11 0 0 0 4.75 1.06h.01c6.26 0 11.34-5.05 11.34-11.27 0-3-1.17-5.81-3.38-7.94zM12.06 21.1h-.01a9.12 9.12 0 0 1-4.65-1.28l-.33-.2-4.34 1.24 1.16-4.2-.21-.34a8.72 8.72 0 0 1-1.33-4.67c0-4.86 4.01-8.81 8.94-8.81 2.39 0 4.64.92 6.33 2.6a8.74 8.74 0 0 1 2.62 6.25c0 4.86-4 8.81-8.88 8.81zm5.13-6.52c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.27-.73.9-.9 1.08-.17.2-.33.22-.6.08-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.37-1.63-1.53-1.9-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.18.19-.3.3-.5.1-.2.05-.38-.02-.53-.07-.14-.62-1.52-.85-2.1-.22-.53-.44-.46-.63-.47h-.54c-.2 0-.53.08-.8.38-.28.28-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.11c.15.2 2.13 3.21 5.16 4.39.72.31 1.28.49 1.72.62.72.23 1.37.2 1.88.13.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.08-.12-.26-.2-.54-.32z"/>
              </svg>
            </a>
            <a href="#" aria-label="Copy link" title="Copy link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.9 12c0-2.25 1.85-4.1 4.1-4.1h3V6H8C4.69 6 2 8.69 2 12s2.69 6 6 6h3v-1.9H8c-2.25 0-4.1-1.85-4.1-4.1zm4.5 1.1h7.2v-2.2H8.4v2.2zM16 6h-3v1.9h3c2.25 0 4.1 1.85 4.1 4.1s-1.85 4.1-4.1 4.1h-3V18h3c3.31 0 6-2.69 6-6S19.31 6 16 6z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 설명: 항상 맨 아래, 전체폭 */}
        <div className="desc">
          <p>
            Peach Flavor CBD Gummies. Check in. Chew up. Tune out. Ok Eatables are the perfectly
            calming remedy for those seeking a gentle easing of worry. Our gummies help to shift
            perspectives, elevate experiences and find clarity in crazy. Your feel good fix that
            brings you back to life.
          </p>
          <p className="bold">Each gummy contains 25 MG CBD and 100 MG L-Theanine.</p>
          <p className="note">*This product is currently only sold in the USA</p>
          <a className="faq" href="#">What are the benefits of CBD? I'm glad you asked.</a>
        </div>
      </section>
    </main>
  );
}
