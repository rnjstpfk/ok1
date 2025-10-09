import "./Footer.scss";
import footerLogo from "../assets/Footer.avif"; // 🟠 로고 이미지 불러오기
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
            {/* 로고 + 저작권 */}
            <div 
                className="footer-left"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // 🟢 상단 이동
                style={{ cursor: "pointer" }} // 클릭 가능 표시
                >
                <img src={footerLogo} alt="OK Drugs Logo" className="footer-logo" />
                <p className="copyright">©2021 Ok Drugs LLC. All Rights Reserved.</p>
            </div>


        {/* 메뉴 */}
        <nav className="footer-nav">
          <a href="#">RETURN POLICY</a>
          <a href="#">TERMS & LEGAL</a>
          <a href="#">PRIVACY NOTICE</a>
        </nav>

        {/* 소셜 아이콘 */}
        <div className="footer-social">
          <a href="https://www.facebook.com/okdrugsco/?ref=py_c" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}
