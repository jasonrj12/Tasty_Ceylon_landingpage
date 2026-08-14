import { useEffect, useState } from "react";
import "./styles.css";

const SHOP_URL = "https://tastyceylon.co.uk";
const IMAGES = {
  logo: "/assets/tasy-ceylon-logo.png",
  hero: "/assets/tasty-ceylon-hero.jpg",
  kottu: "/assets/kottu.png",
  rice: "/assets/rice.png",
  curry: "/assets/curry.png",
  //hero: "https://www.aniprivateresorts.com/wp-content/uploads/2022/05/Ani-Sri-Lanka_Gallery21.jpg",
 // kottu: "https://tudestinoviajar.com/wp-content/uploads/2025/04/Kottu-Roti.jpeg",
 // rice: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/recipe_pics_v2/medium/sri_lankan_chicken_biriyani.jpg",
 // curry: "https://www.theflavorbender.com/wp-content/uploads/2018/02/Sri-Lankan-Chicken-Curry-The-Flavor-Bender-2-1-700x1049.jpg",
};

const cultureCards = [
  {
    number: "01",
    icon: "ආ",
    title: "Ayubowan",
    copy: "A greeting that wishes long life — and a spirit of welcome that sits at the heart of Sri Lankan hospitality.",
  },
  {
    number: "02",
    icon: "✦",
    title: "The shared table",
    copy: "Meals arrive as a colourful spread of rice, curries, sambols and sides, made to be shared and discovered together.",
  },
  {
    number: "03",
    icon: "❋",
    title: "An island of spice",
    copy: "Cinnamon, curry leaves, coconut, chilli and roasted spice blends give every region its own unmistakable character.",
  },
];

const dishes = [
  {
    image: IMAGES.kottu,
    className: "dish-image--kottu",
    label: "Street favourite",
    title: "Kottu Roti",
    copy: "Chopped roti tossed on the griddle with vegetables, egg, spice and your choice of flavour-packed extras.",
  },
  {
    image: IMAGES.rice,
    className: "dish-image--rice",
    label: "Comfort in a bowl",
    title: "Aromatic Rice",
    copy: "Fragrant biriyani and fried rice layered with herbs, warming spices and generous Sri Lankan flavour.",
  },
  {
    image: IMAGES.curry,
    className: "dish-image--curry",
    label: "Slow & soulful",
    title: "Ceylon Curries",
    copy: "Deeply spiced curries balanced with coconut, curry leaves and the bright lift of sambol on the side.",
  },
];

const faqs = [
  {
    question: "Do you offer delivery and collection?",
    answer: "Yes. Choose delivery or collection when you order through our online shop.",
  },
  {
    question: "What kind of food do you serve?",
    answer: "Our menu celebrates Sri Lankan favourites, from kottu and curries to hoppers, biriyani, fried rice, starters and devilled dishes.",
  },
  {
    question: "What if I have a food allergy?",
    answer: "Please contact the restaurant before ordering so the team can guide you using the latest allergen information.",
  },
];

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Tasty Ceylon",
  image: IMAGES.hero,
  url: SHOP_URL,
  telephone: "+44 121 296 7768",
  email: "tastyceylon17@gmail.com",
  servesCuisine: ["Sri Lankan", "South Asian"],
  priceRange: "££",
  address: {
    "@type": "PostalAddress",
    streetAddress: "47 Woodgate Lane",
    addressLocality: "Birmingham",
    addressRegion: "West Midlands",
    postalCode: "B32 3QU",
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "23:00",
    },
  ],
  hasMenu: `${SHOP_URL}/food-menu`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow${light ? " eyebrow--light" : ""}`}>
      <span /> {children}
    </p>
  );
}

function ArrowButton({ children, className = "" }) {
  return (
    <a className={`button ${className}`.trim()} href={SHOP_URL}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

// function BrandMark({ large = false }) {
//   return (
//     <span className={`brand-mark${large ? " brand-mark--large" : ""}`} aria-hidden="true">
//       <span>🐘</span><b>TC</b>
//     </span>
//   );
// }

function BrandMark({ large = false }) {
  return (
    <img
      className={`navbar-logo${large ? " navbar-logo--large" : ""}`}
      src="/assets/tasty-ceylon-logo.png"
      alt="Tasty Ceylon logo"
    />
  );
}

// function BrandMark({ large = false }) {
//   return (
//     <img
//       className={`brand-mark${large ? " brand-mark--large" : ""}`}
//       src={IMAGES.logo}
//       alt="Tasty Ceylon logo"
//       width="505"
//       height="401"
//     />
//   );
// }

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 36);
      setShowBackToTop(window.scrollY > 700);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const revealElements = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return () => window.removeEventListener("scroll", updateScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -50px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", updateScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <a className="brand" href="#home" aria-label="Tasty Ceylon home">
          <BrandMark />
          <span><strong>Tasty Ceylon</strong><small>Sri Lankan cuisine</small></span>
        </a>
        <nav className="primary-nav" aria-label="Primary navigation">
          <ArrowButton className="button--small">Order now</ArrowButton>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <img
            className="hero-background"
            src={IMAGES.hero}
            alt="A colourful spread of Sri Lankan kottu, rice, curry and freshly baked flatbread"
            width="2400"
            height="1013"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-grain" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span /> Authentic Sri Lankan food · Birmingham</p>
            <h1 id="hero-title">Come for the spice.<em>Stay for the story.</em></h1>
            <p className="hero-copy">Discover the warmth of Sri Lankan hospitality through colourful curries, sizzling kottu and recipes made with soul.</p>
            <div className="hero-actions">
              <ArrowButton className="button--gold">Explore the menu</ArrowButton>
              <a className="text-link" href="#story">Meet Tasty Ceylon <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <aside className="hero-card" aria-label="Restaurant information">
            <span className="status-dot" /><p>Serving every day</p>
            <strong>8:00am — 11:00pm</strong>
            <a href="#visit">Birmingham · Get directions</a>
          </aside>
          <a className="scroll-cue" href="#culture" aria-label="Scroll to culture"><span>Discover</span><i /></a>
        </section>

        <div className="marquee" aria-label="Tasty Ceylon highlights">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <span className="marquee-group" aria-hidden={group === 1} key={group}>
                <span>Made with warmth</span><b>✦</b><span>Island spices</span><b>✦</b><span>Traditional recipes</span><b>✦</b><span>Delivery &amp; collection</span><b>✦</b>
              </span>
            ))}
          </div>
        </div>

        <section className="culture section" id="culture">
          <div className="section-heading" data-reveal>
            <Eyebrow>The island behind every bite</Eyebrow>
            <h2>A culture of colour, connection and generosity.</h2>
            <p>Sri Lanka is shaped by ancient traditions, many communities and an instinct to welcome guests with something delicious. Food is where those stories meet.</p>
          </div>
          <div className="culture-grid">
            {cultureCards.map((card, index) => (
              <article className="culture-card" data-reveal data-delay={String(index + 1)} key={card.title}>
                <span className="card-number">{card.number}</span>
                <div className="culture-icon" aria-hidden="true">{card.icon}</div>
                <h3>{card.title}</h3><p>{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="food section" id="food">
          <div className="food-intro" data-reveal>
            <Eyebrow light>Taste the island</Eyebrow>
            <h2>Bold, bright and made to be remembered.</h2>
            <p>The Sri Lankan table balances heat with fragrance, richness with freshness, and comforting favourites with a little theatre.</p>
          </div>
          <div className="dish-grid">
            {dishes.map((dish, index) => (
              <article className="dish-card" data-reveal data-delay={String(index + 1)} key={dish.title}>
                <div className={`dish-image ${dish.className}`}>
                  <img src={dish.image} alt={dish.title} width="1200" height="800" loading="lazy" />
                </div>
                <div className="dish-content"><span>{dish.label}</span><h3>{dish.title}</h3><p>{dish.copy}</p></div>
              </article>
            ))}
          </div>
          <ArrowButton className="button--outline-light">View the full menu</ArrowButton>
        </section>

        <section className="story section" id="story">
          <div className="story-art" data-reveal>
            <div className="sun-disc" />
            <BrandMark large />
            <span className="art-note art-note--one">Birmingham</span>
            <span className="art-note art-note--two">Sri Lanka, at heart</span>
          </div>
          <div className="story-copy" data-reveal data-delay="1">
            <Eyebrow>Our story</Eyebrow>
            <h2>The heart of Sri Lankan flavours, here in Birmingham.</h2>
            <p className="story-lead">Tasty Ceylon is a welcoming destination for authentic Sri Lankan cuisine and genuine hospitality.</p>
            <p>Traditional cooking, quality ingredients and careful service come together in food that feels both comforting and memorable — whether you are sharing a family meal, catching up with friends or ordering a favourite to enjoy at home.</p>
            <div className="story-values">
              <div><strong>Fresh</strong><span>Prepared with care</span></div>
              <div><strong>Authentic</strong><span>Rooted in tradition</span></div>
              <div><strong>Welcoming</strong><span>Made for sharing</span></div>
            </div>
          </div>
        </section>

        <section className="offer section" aria-label="First order offer">
          <div className="offer-mark" aria-hidden="true">25</div>
          <div data-reveal><Eyebrow light>Your first taste</Eyebrow><h2>Enjoy 25% off your first online order.</h2><p>Register through the Tasty Ceylon shop to claim the current welcome offer. Terms apply.</p></div>
          <ArrowButton className="button--gold">Order now</ArrowButton>
        </section>

        <section className="visit section" id="visit">
          <div className="visit-copy" data-reveal>
            <Eyebrow>Visit Tasty Ceylon</Eyebrow>
            <h2>Your table is closer than you think.</h2>
            <p>Visit us in Birmingham, order for collection, or have your Sri Lankan favourites delivered to your door.</p>
            <div className="contact-list">
              <div><span>Find us</span><address>47 Woodgate Lane<br />Birmingham, West Midlands<br />B32 3QU</address></div>
              <div><span>Opening hours</span><p>Monday — Sunday<br /><strong>8:00am — 11:00pm</strong></p></div>
              <div><span>Talk to us</span><p><a href="tel:+441212967768">0121 296 7768</a><br /><a href="mailto:tastyceylon17@gmail.com">tastyceylon17@gmail.com</a></p></div>
            </div>
            <div className="visit-actions">
              <a className="button button--dark" href="https://www.google.com/maps/search/?api=1&query=47+Woodgate+Lane+Birmingham+B32+3QU">Get directions <span aria-hidden="true">↗</span></a>
              <a className="text-link text-link--dark" href="tel:+441212967768">Call the restaurant</a>
            </div>
          </div>
          <div className="map-wrap" data-reveal data-delay="1">
            <iframe title="Map showing Tasty Ceylon at 47 Woodgate Lane, Birmingham" src="https://www.google.com/maps?q=47%20Woodgate%20Lane%2C%20Birmingham%2C%20B32%203QU&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div className="map-badge"><BrandMark /><span><strong>Tasty Ceylon</strong>47 Woodgate Lane</span></div>
          </div>
        </section>

        <section className="faq section" aria-labelledby="faq-title">
          <div className="faq-heading" data-reveal><Eyebrow>Good to know</Eyebrow><h2 id="faq-title">Before your first bite.</h2></div>
          <div className="faq-list" data-reveal data-delay="1">
            {faqs.map((faq) => (
              <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><BrandMark /><p>The Heart of Sri Lankan Flavours.</p></div>
        <div className="footer-links">
          <div><strong>Explore</strong><a href="#culture">Culture</a><a href="#food">Our food</a><a href="#story">Our story</a></div>
          <div><strong>Visit</strong><a href="#visit">Location &amp; hours</a><a href="tel:+441212967768">Call us</a><a href="mailto:tastyceylon17@gmail.com">Email us</a></div>
          <div><strong>Order</strong><a href={SHOP_URL}>Delivery</a><a href={SHOP_URL}>Collection</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Tasty Ceylon. All rights reserved.</span><a href="#home">Back to top ↑</a></div>
      </footer>

      <button className={`back-top${showBackToTop ? " is-shown" : ""}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
    </>
  );
}
