// src/pages/Contact.jsx
import React, { useState } from "react";
import "./Contact.scss";

// 데코/사진 예시(원하는 이미지로 교체해도 됨)
import photoRight from "../assets/contact/KaitOnPhone.avif";
import photoSmall from "../assets/contact/francisco-andreotti-9dP9fEbbGY8-unsplash.avif";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 👉 실제 전송 로직을 붙이기 전 간단 확인
    if (!form.firstName || !form.email || !form.message) {
      alert("First Name, Email, Message는 필수입니다.");
      return;
    }
    alert("메시지가 전송된 것처럼 처리했어요 🙌\n(백엔드 연결 후 실제 전송 로직 넣으세요)");
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="contact-page">
      {/* 상단 히어로 */}
      <section className="hero">
        <div className="hero-inner">
          <div className="left">
            <h1 className="headline">
              GET IN
              <br />
              TOUCH
            </h1>

            <div className="info">
              <p>Curious about CBD?<br/>Need to get in touch with us?<br/>Or you just want to make a new friend?<br/>Shoot us a msg.</p>

              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:info@okdrugs.co">info@okdrugs.co</a>
                <br />
                <strong>Text us:</strong>{" "}
                <a href="tel:+12135591123">(213) 559-1123</a>
              </p>
            </div>

            {/* 작은 사진 + 원형 텍스트 뱃지 */}
            <div className="decor">
              <img className="small-photo" src={photoSmall} alt="kitchen tv" />
              <svg className="circle-text" viewBox="0 0 200 200">
                <defs>
                  <path id="circlePath" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
                </defs>
                <text dy="5" textLength="440">
                  <textPath href="#circlePath">
                    OK DRUGS • CRAZY IN A GOOD WAY •
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          <div className="right">
            <img className="hero-photo" src={photoRight} alt="on the phone" />
          </div>
        </div>
      </section>

      {/* 폼 영역 */}
      <section className="form-section">
        <h2>LET&apos;S CHAT</h2>

        <form className="contact-form" onSubmit={onSubmit}>
          <div className="grid">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={onChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={onChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={onChange}
            />
            <textarea
              name="message"
              placeholder="Tell us a secret..."
              rows={6}
              value={form.message}
              onChange={onChange}
              required
            />
          </div>

          <div className="submit-wrap">
            <button type="submit">Ok</button>
          </div>
        </form>
      </section>
    </div>
  );
}
