import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Instagram,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import coverImage from "../assets/slivasa-cover.jpg";
import browniesImage from "../assets/brownies.jpg";
import cakesImage from "../assets/cakes.jpg";
import confectionsImage from "../assets/confections.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Slivasa Restaurant & Café — Our Menu" },
      {
        name: "description",
        content:
          "Turn the pages of Slivasa's digital menu and discover handmade brownies, tea cakes, celebration cakes, cookies, and chocolates.",
      },
      { property: "og:title", content: "Slivasa Restaurant & Café — Our Menu" },
      {
        property: "og:description",
        content: "A beautifully crafted digital menu of handmade bakes and confections from Slivasa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SlivasaMenu,
});

type MenuItem = { name: string; description: string; price: string };
type MenuPage = {
  kind: "cover" | "welcome" | "menu" | "offers";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  items?: MenuItem[];
};

const pages: [MenuPage, ...MenuPage[]] = [
  { kind: "cover", title: "Slivasa", subtitle: "Restaurant & Café", image: coverImage, imageAlt: "Chocolate cake with coffee on a dark wooden table" },
  { kind: "welcome", eyebrow: "A note from our kitchen", title: "Made for slow moments", subtitle: "At Slivasa, familiar recipes meet patient craft. Every brownie, cake and confection is baked in small batches, with honest ingredients and a generous hand." },
  { kind: "menu", eyebrow: "From the oven", title: "Brownies", image: browniesImage, imageAlt: "Stack of rich walnut fudge brownies", items: [
    { name: "Fudge Brownie", description: "Dense, soft and deeply chocolatey", price: "₹120" },
    { name: "Chocolate Chip", description: "Dark cocoa crumb, molten chips", price: "₹135" },
    { name: "Nuts Brownie", description: "Toasted walnut and chocolate", price: "₹145" },
    { name: "Double Chocolate", description: "Cocoa ganache, chocolate chunks", price: "₹155" },
    { name: "Triple Chocolate", description: "Dark, milk and white chocolate", price: "₹175" },
  ] },
  { kind: "menu", eyebrow: "Tea-time favourites", title: "Tea Cakes", items: [
    { name: "Vanilla Tea Cake", description: "Madagascan vanilla, tender crumb", price: "₹320" },
    { name: "Strawberry Tea Cake", description: "Berry preserve and vanilla glaze", price: "₹360" },
    { name: "Marble Tea Cake", description: "Vanilla and cocoa swirls", price: "₹350" },
    { name: "Chocolate Tea Cake", description: "Dark cocoa with a satin glaze", price: "₹380" },
  ] },
  { kind: "menu", eyebrow: "For every celebration", title: "Cakes", image: cakesImage, imageAlt: "Elegant celebration cake with chocolate curls and strawberries", items: [
    { name: "White Forest", description: "Vanilla sponge, cherries and cream", price: "₹720" },
    { name: "Black Forest", description: "Chocolate sponge and cherry compote", price: "₹760" },
    { name: "Chocolate Truffle", description: "Silky ganache and cocoa sponge", price: "₹820" },
    { name: "Strawberry", description: "Fresh cream and berry preserve", price: "₹780" },
    { name: "Classic Vanilla", description: "Vanilla bean and cloud-soft cream", price: "₹680" },
  ] },
  { kind: "menu", eyebrow: "Baked until golden", title: "Cookies", image: confectionsImage, imageAlt: "Artisan butter cookies and dark chocolates", items: [
    { name: "Butter Swirls", description: "Delicate, crisp and buttery", price: "₹180" },
    { name: "Choco Chunk", description: "Soft centre, dark chocolate chunks", price: "₹220" },
    { name: "Oat & Almond", description: "Toasted oats and almond flakes", price: "₹210" },
    { name: "Jam Thumbprints", description: "Shortbread with berry preserve", price: "₹200" },
  ] },
  { kind: "menu", eyebrow: "Hand-finished", title: "Chocolates", image: confectionsImage, imageAlt: "Handmade dark chocolates and artisan cookies", items: [
    { name: "Classic Truffles", description: "Dark chocolate ganache", price: "₹240" },
    { name: "Roasted Almond", description: "Whole almonds in milk chocolate", price: "₹260" },
    { name: "Coffee Pralines", description: "Espresso caramel centre", price: "₹280" },
    { name: "Celebration Box", description: "A handpicked assortment of twelve", price: "₹640" },
  ] },
  { kind: "offers", eyebrow: "A little more to share", title: "Slivasa Specials", subtitle: "Pair any two brownies with two café beverages and enjoy 10% off. Celebration cake pre-orders include a complimentary message plaque." },
];

const getPage = (index: number) => pages[index] ?? pages[0];

function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return desktop;
}

function SlivasaMenu() {
  const isDesktop = useDesktop();
  const [pageIndex, setPageIndex] = useState(0);
  const [turn, setTurn] = useState<{ direction: "next" | "previous"; page: number } | null>(null);
  const gestureStart = useRef<number | null>(null);
  const turning = turn !== null;

  const step = isDesktop && pageIndex > 0 ? 2 : 1;
  const nextIndex = pageIndex === 0 ? 1 : Math.min(pageIndex + step, pages.length - 1);
  const previousIndex = pageIndex <= 1 ? 0 : Math.max(1, pageIndex - (isDesktop ? 2 : 1));

  const turnPage = useCallback((direction: "next" | "previous") => {
    if (turning) return;
    const target = direction === "next" ? nextIndex : previousIndex;
    if (target === pageIndex) return;
    setTurn({ direction, page: direction === "next" ? (isDesktop && pageIndex > 0 ? Math.min(pageIndex + 1, pages.length - 1) : pageIndex) : pageIndex });
    window.setTimeout(() => setPageIndex(target), 330);
    window.setTimeout(() => setTurn(null), 760);
  }, [isDesktop, nextIndex, pageIndex, previousIndex, turning]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") turnPage("next");
      if (event.key === "ArrowLeft") turnPage("previous");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turnPage]);

  const visiblePages = useMemo(() => {
    if (!isDesktop || pageIndex === 0) return [pageIndex];
    return [pageIndex, Math.min(pageIndex + 1, pages.length - 1)].filter((value, index, array) => array.indexOf(value) === index);
  }, [isDesktop, pageIndex]);

  const onPointerDown = (event: React.PointerEvent) => { gestureStart.current = event.clientX; };
  const onPointerUp = (event: React.PointerEvent) => {
    if (gestureStart.current === null) return;
    const movement = event.clientX - gestureStart.current;
    gestureStart.current = null;
    if (Math.abs(movement) > 45) turnPage(movement < 0 ? "next" : "previous");
  };

  const countLabel = isDesktop && pageIndex > 0 && pageIndex < pages.length - 1
    ? `${pageIndex + 1}–${Math.min(pageIndex + 2, pages.length)} / ${pages.length}`
    : `${pageIndex + 1} / ${pages.length}`;

  return (
    <main className="menu-stage" aria-label="Slivasa restaurant menu">
      <div className="ambient-mark" aria-hidden="true">S</div>
      <header className="menu-masthead">
        <span className="brand-mark">S</span>
        <div><strong>Slivasa</strong><span>Restaurant & Café</span></div>
      </header>

      <section
        className={`book-shell ${pageIndex === 0 ? "is-closed" : "is-open"}`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        aria-live="polite"
      >
        <div className="book-shadow" aria-hidden="true" />
        <div className="book-pages">
          {visiblePages.map((index, position) => (
            <MenuSheet key={index} page={getPage(index)} pageNumber={index + 1} side={position === 0 ? "left" : "right"} onOpen={index === 0 ? () => turnPage("next") : undefined} />
          ))}
          {turn && (
            <div className={`turning-sheet turn-${turn.direction}`} aria-hidden="true">
              <div className="turning-face turning-front">
                <MenuPageContent page={getPage(turn.page)} pageNumber={turn.page + 1} onOpen={undefined} />
              </div>
              <div className="turning-face turning-back">
                <MenuPageContent page={getPage(turn.direction === "next" ? Math.min(turn.page + 1, pages.length - 1) : Math.max(turn.page - 1, 0))} pageNumber={turn.direction === "next" ? Math.min(turn.page + 2, pages.length) : turn.page} onOpen={undefined} />
              </div>
            </div>
          )}
        </div>
      </section>

      <nav className="menu-controls" aria-label="Menu page controls">
        <ControlButton label="Previous page" disabled={pageIndex === 0 || turning} onClick={() => turnPage("previous")}><ArrowLeft /></ControlButton>
        <div className="page-status"><span>{countLabel}</span><small>{isDesktop ? "Use arrows or page edges" : "Swipe to turn"}</small></div>
        <ControlButton label="Next page" disabled={pageIndex === pages.length - 1 || turning} onClick={() => turnPage("next")}><ArrowRight /></ControlButton>
      </nav>
    </main>
  );
}

function ControlButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button className="page-control" type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick}>{children}</button>;
}

function MenuSheet({ page, pageNumber, side, onOpen }: { page: MenuPage; pageNumber: number; side: "left" | "right"; onOpen?: (() => void) | undefined }) {
  return (
    <article className={`menu-sheet sheet-${side} ${page.kind === "cover" ? "cover-sheet" : ""}`} onClick={(event) => {
      if (onOpen) onOpen();
      else if (event.clientX > window.innerWidth / 2) window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
      else window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    }}>
      <MenuPageContent page={page} pageNumber={pageNumber} onOpen={onOpen} />
    </article>
  );
}

function MenuPageContent({ page, pageNumber, onOpen }: { page: MenuPage; pageNumber: number; onOpen?: (() => void) | undefined }) {
  if (page.kind === "cover") {
    return (
      <div className="cover-content" style={{ backgroundImage: `linear-gradient(var(--cover-overlay), var(--cover-overlay)), url(${page.image})` }}>
        <div className="cover-border"><div className="cover-emblem">S</div><p>{page.subtitle}</p><h1>{page.title}</h1><div className="cover-rule"><span>Our Menu</span></div><button type="button" className="open-menu" onClick={onOpen}>Tap to open <ArrowRight /></button></div>
      </div>
    );
  }
  if (page.kind === "welcome") {
    return (
      <div className="page-inner welcome-page">
        <PageHeading eyebrow={page.eyebrow} title={page.title} />
        <p className="welcome-copy">{page.subtitle}</p>
        <div className="chef-note"><span>“</span><p>We bake not to impress, but to make your day taste a little warmer.</p><strong>— The Slivasa Kitchen</strong></div>
        <div className="botanical" aria-hidden="true">✦</div><PageFolio number={pageNumber} />
      </div>
    );
  }
  if (page.kind === "offers") {
    return (
      <div className="page-inner offers-page">
        <PageHeading eyebrow={page.eyebrow} title={page.title} />
        <div className="offer-seal"><Sparkles /><strong>10% off</strong><span>Brownie & beverage pairing</span></div>
        <p className="offer-copy">{page.subtitle}</p>
        <div className="contact-list">
          <span><MapPin /> Address available at the counter</span><span><Clock3 /> Opening hours to be added</span><span><MessageCircle /> WhatsApp number to be added</span><span><Instagram /> Instagram handle to be added</span>
        </div>
        <div className="thank-you"><span>Thank you</span><small>for sharing a sweet moment with us</small></div><PageFolio number={pageNumber} />
      </div>
    );
  }
  return (
    <div className="page-inner menu-list-page">
      <PageHeading eyebrow={page.eyebrow} title={page.title} />
      {page.image && <img className="menu-photo" src={page.image} alt={page.imageAlt ?? ""} loading="lazy" width={1200} height={912} />}
      <div className="menu-items">{page.items?.map((item) => <div className="menu-item" key={item.name}><div><h3>{item.name}</h3><p>{item.description}</p></div><span>{item.price}</span></div>)}</div>
      <PageFolio number={pageNumber} />
    </div>
  );
}

function PageHeading({ eyebrow, title }: { eyebrow?: string | undefined; title: string }) {
  return <header className="page-heading">{eyebrow && <p>{eyebrow}</p>}<h2>{title}</h2><span aria-hidden="true">◆</span></header>;
}
function PageFolio({ number }: { number: number }) { return <span className="page-folio">{String(number).padStart(2, "0")}</span>; }
