import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInquiry } from "@/hooks/useQueries";
import {
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  Droplets,
  FlaskConical,
  Heart,
  Leaf,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrolled;
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const PROBLEMS = [
  {
    icon: "🦠",
    title: "दाद (Ringworm)",
    desc: "त्वचा पर गोल-गोल लाल निशान जो बहुत जलाते और खुजलाते हैं।",
  },
  {
    icon: "🔴",
    title: "खाज (Scabies)",
    desc: "त्वचा में घुसने वाले कीड़ों से होने वाली तेज खुजली।",
  },
  {
    icon: "😣",
    title: "खुजली (Itching)",
    desc: "रात को बढ़ने वाली असहनीय खुजली जो नींद छीन लेती है।",
  },
  {
    icon: "🍄",
    title: "फंगल इन्फेक्शन",
    desc: "नमी वाली जगह होने वाला फंगस जो तेजी से फैलता है।",
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "त्वरित राहत",
    desc: "48 घंटों में खुजली से राहत, दिखने लगता है असर।",
    color: "text-yellow-600",
  },
  {
    icon: Droplets,
    title: "गहरा प्रवेश",
    desc: "क्रीम त्वचा की गहरी परतों तक जाकर फंगस को नष्ट करती है।",
    color: "text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "कोई साइड इफेक्ट नहीं",
    desc: "100% सुरक्षित फॉर्मूला, त्वचा को कोई नुकसान नहीं।",
    color: "text-red-700",
  },
  {
    icon: FlaskConical,
    title: "जड़ से खत्म करे",
    desc: "फंगस को जड़ से नष्ट करे, दोबारा न आने दे।",
    color: "text-purple-600",
  },
  {
    icon: Award,
    title: "डर्मेटोलॉजिस्ट अनुशंसित",
    desc: "त्वचा विशेषज्ञों द्वारा परीक्षित और अनुशंसित।",
    color: "text-amber-600",
  },
  {
    icon: Users,
    title: "सभी त्वचा के लिए",
    desc: "हर प्रकार की त्वचा के लिए उपयुक्त, बच्चों से लेकर बुजुर्गों तक।",
    color: "text-pink-600",
  },
];

const STEPS = [
  {
    num: "01",
    icon: Droplets,
    title: "प्रभावित क्षेत्र साफ करें",
    desc: "प्रभावित जगह को साफ पानी और साबुन से धोएं और सुखाएं।",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "क्रीम लगाएं",
    desc: "Fungus Infection Cream की एक पतली परत प्रभावित क्षेत्र पर लगाएं।",
  },
  {
    num: "03",
    icon: CheckCircle,
    title: "परिणाम देखें",
    desc: "दिन में 2 बार लगाएं, 7 दिनों में स्वस्थ साफ त्वचा पाएं।",
  },
];

const TESTIMONIALS = [
  {
    name: "Ramesh Kumar",
    location: "Lucknow, UP",
    text: "2 साल से दाद की समस्या थी। Fungus Infection Cream के 10 दिन के इस्तेमाल में पूरी तरह ठीक हो गया। जिंदगी बदल गई!",
    stars: 5,
    initials: "RK",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Sunita Devi",
    location: "Patna, Bihar",
    text: "रात को खुजली इतनी होती थी कि नींद नहीं आती थी। इस क्रीम ने पहली रात से राहत दी। बहुत बहुत शुक्रिया!",
    stars: 5,
    initials: "SD",
    color: "bg-red-100 text-red-800",
  },
  {
    name: "Ajay Singh",
    location: "Jaipur, Rajasthan",
    text: "डॉक्टर की दवाओं पर हजारों रुपये खर्च किए लेकिन फायदा नहीं हुआ। यह क्रीम सस्ती और बेहद असरदार है। 100% recommend करता हूं!",
    stars: 5,
    initials: "AS",
    color: "bg-blue-100 text-blue-700",
  },
];

const INGREDIENTS = [
  {
    name: "Clotrimazole 1%",
    desc: "शक्तिशाली एंटीफंगल एजेंट जो फंगस की कोशिका झिल्ली को नष्ट करता है।",
  },
  {
    name: "Neem Extract",
    desc: "प्राकृतिक एंटीसेप्टिक, त्वचा को शांत करे और संक्रमण से बचाए।",
  },
  { name: "Aloe Vera", desc: "त्वचा को नमी दे और जलन को तुरंत शांत करे।" },
  {
    name: "Tea Tree Oil",
    desc: "प्राकृतिक एंटीफंगल और एंटीबैक्टीरियल गुण, त्वचा को स्वस्थ रखे।",
  },
];

const FAQS = [
  {
    q: "Fungus Infection Cream का असर कितने दिनों में दिखता है?",
    a: "अधिकांश ग्राहकों को 48-72 घंटों में खुजली और जलन से राहत मिलती है। पूर्ण रूप से ठीक होने में 7-14 दिन लगते हैं, यह संक्रमण की गंभीरता पर निर्भर करता है।",
  },
  {
    q: "क्या यह क्रीम बच्चों के लिए सुरक्षित है?",
    a: "हां, यह क्रीम 3 साल से अधिक उम्र के बच्चों के लिए सुरक्षित है। छोटे बच्चों के लिए उपयोग से पहले डॉक्टर की सलाह लें।",
  },
  {
    q: "क्या दाद ठीक होने के बाद दोबारा आ सकता है?",
    a: "नियमित और पूरे कोर्स के साथ उपयोग करने से दाद दोबारा नहीं आता। हम सलाह देते हैं कि लक्षण गायब होने के 2-3 दिन बाद भी क्रीम लगाते रहें।",
  },
  {
    q: "एक दिन में कितनी बार लगानी चाहिए?",
    a: "दिन में 2-3 बार लगाएं। सुबह नहाने के बाद और रात को सोने से पहले। प्रभावित क्षेत्र को अच्छी तरह साफ करके ही क्रीम लगाएं।",
  },
  {
    q: "क्या यह क्रीम सभी प्रकार के फंगल इन्फेक्शन पर काम करती है?",
    a: "हां, यह क्रीम दाद, खाज, खुजली, जॉक इच, एथलीट्स फुट और अन्य सभी प्रकार के त्वचा के फंगल इन्फेक्शन पर प्रभावी है।",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

function AnimatedSection({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement | null>);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pinCode: "",
    quantity: 1,
  });
  const totalPrice = form.quantity * 275;
  const { mutate: submitInquiry, isPending, isSuccess } = useSubmitInquiry();

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("कृपया नाम और फोन नंबर भरें।");
      return;
    }
    submitInquiry(
      {
        name: form.name,
        phone: form.phone,
        message: `Address: ${form.address}, PIN: ${form.pinCode}, Qty: ${form.quantity}`,
      },
      {
        onSuccess: () => {
          const msg = encodeURIComponent(
            `🛒 नया ऑर्डर आया!\n\n👤 नाम: ${form.name}\n📞 फोन: ${form.phone}\n🏠 पता: ${form.address}\n📍 पिन कोड: ${form.pinCode}\n\n💊 प्रोडक्ट: Fungus Infection वाली क्रीम\n📦 मात्रा: ${form.quantity} ट्यूब\n💰 कीमत: ₹${totalPrice}\n\n📦 जल्दी डिलीवरी करें!`,
          );
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.style.width = "0";
          iframe.style.height = "0";
          iframe.src = `https://wa.me/917049290924?text=${msg}`;
          document.body.appendChild(iframe);
          setTimeout(() => {
            try {
              document.body.removeChild(iframe);
            } catch (_e) {}
          }, 5000);
          toast.success(
            "🎉 आपका ऑर्डर सफलतापूर्वक प्राप्त हो गया! हम जल्द ही संपर्क करेंगे।",
          );
          setForm({
            name: "",
            phone: "",
            address: "",
            pinCode: "",
            quantity: 1,
          });
        },
        onError: () => toast.error("कुछ गलत हुआ, दोबारा कोशिश करें।"),
      },
    );
  };

  const navLinks = [
    { label: "होम", href: "#home" },
    { label: "फायदे", href: "#benefits" },
    { label: "कैसे लगाएं", href: "#how-to-use" },
    { label: "समीक्षाएं", href: "#reviews" },
    { label: "संपर्क", href: "#contact" },
  ];

  return (
    <div className="min-h-screen font-body bg-background">
      <Toaster richColors position="top-center" />

      {/* ====== TOP ANNOUNCEMENT BAR ====== */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, #166534 0%, #15803d 30%, #ca8a04 60%, #166534 100%)",
        }}
      >
        <div className="flex items-center justify-center gap-6 py-2 px-4 text-white text-xs font-bold tracking-wide whitespace-nowrap">
          <span className="flex items-center gap-1">
            🔥 <span style={{ color: "#fde047" }}>सीमित समय ऑफर</span> — सिर्फ
            ₹275
          </span>
          <span className="hidden sm:inline text-red-200">|</span>
          <span className="hidden sm:inline flex items-center gap-1">
            🚚 <span style={{ color: "#fde047" }}>Free Delivery</span> सम्पूर्ण
            भारत में
          </span>
          <span className="hidden sm:inline text-red-200">|</span>
          <span className="hidden sm:inline">
            📞 <span style={{ color: "#fde047" }}>+91 70492 90924</span>
          </span>
        </div>
      </div>

      {/* ====== NAVIGATION ====== */}
      <nav
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/fungus-cream-logo-transparent.dim_400x400.png"
              alt="Fungus Infection Cream Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p
                className="font-display text-sm font-bold leading-tight"
                style={{ color: "var(--brand-green)" }}
              >
                Fungus Infection
              </p>
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--brand-gold-dark)" }}
              >
                Cream
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="text-sm font-medium transition-colors hover:text-primary"
                style={{ color: scrolled ? "oklch(25 0.05 148)" : "white" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              data-ocid="nav.primary_button"
              className="hidden md:flex items-center gap-2 font-semibold text-white px-5 py-2 rounded-full"
              style={{ background: "var(--brand-gold-dark)", border: "none" }}
            >
              <a href="#order">
                अभी खरीदें <ChevronRight className="w-4 h-4" />
              </a>
            </Button>
            <button
              type="button"
              className="md:hidden p-2 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: scrolled ? "oklch(25 0.05 148)" : "white" }}
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="py-2 text-sm font-medium border-b border-border last:border-0"
                style={{ color: "var(--brand-green)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              data-ocid="nav.primary_button"
              className="w-full text-white font-semibold rounded-full"
              style={{ background: "var(--brand-gold-dark)" }}
              onClick={() => {
                setMenuOpen(false);
                setTimeout(
                  () =>
                    document
                      .getElementById("order")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  100,
                );
              }}
            >
              अभी खरीदें
            </Button>
          </div>
        )}
      </nav>

      {/* ====== HERO ====== */}
      <section
        id="home"
        className="hero-gradient relative overflow-hidden min-h-screen flex items-center"
      >
        {/* Decorative circles */}
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: "var(--brand-gold)" }}
        />
        <div
          className="absolute bottom-10 right-20 w-96 h-96 rounded-full opacity-5"
          style={{ background: "white" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full opacity-10"
          style={{ background: "var(--brand-gold)" }}
        />

        <div className="container mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left - Text */}
          <div className="text-white space-y-6 animate-fade-up">
            <Badge
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider"
              style={{ background: "var(--brand-gold-dark)", color: "white" }}
            >
              🏆 डर्मेटोलॉजिस्ट अनुशंसित
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              एक बार लगाएं,
              <br />
              <span className="shimmer-text">फंगस भगाएं!</span>
            </h1>
            <p className="text-lg md:text-xl text-red-100 leading-relaxed">
              <span className="font-bold">
                <span className="text-yellow-300">दाद</span>{" "}
                <span className="text-white opacity-60">·</span>{" "}
                <span className="text-orange-300">खाज</span>{" "}
                <span className="text-white opacity-60">·</span>{" "}
                <span className="text-pink-300">खुजली</span>{" "}
                <span className="text-white opacity-60">·</span>{" "}
                <span className="text-cyan-300">फंगल इन्फेक्शन</span>{" "}
                <span className="text-white">के लिए</span>
              </span>
              <br />
              <strong className="text-white">
                भारत की सबसे भरोसेमंद एंटीफंगल क्रीम
              </strong>
            </p>
            <p className="text-sm text-red-200 italic">
              The most trusted anti-fungal cream for ringworm, scabies & itching
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                data-ocid="hero.primary_button"
                size="lg"
                className="rounded-full text-white font-bold px-8 py-4 text-base shadow-lg transition-transform hover:scale-105"
                style={{ background: "var(--brand-gold-dark)", border: "none" }}
              >
                <a href="#order">अभी ऑर्डर करें 🛒</a>
              </Button>
              <Button
                asChild
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                className="rounded-full font-bold px-8 py-4 text-base border-2 border-white/60 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <a href="#benefits">फायदे जानें ↓</a>
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 pt-4">
              {[
                { num: "50,000+", label: "संतुष्ट ग्राहक" },
                { num: "7 दिन", label: "में असर" },
                { num: "100%", label: "सुरक्षित" },
              ].map((stat) => (
                <div key={stat.num} className="text-center">
                  <p
                    className="font-display text-2xl font-bold"
                    style={{ color: "var(--brand-gold)" }}
                  >
                    {stat.num}
                  </p>
                  <p className="text-xs text-red-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Image */}
          <div className="flex justify-center items-center relative">
            <div
              className="animate-glow w-72 h-72 md:w-80 md:h-80 absolute rounded-full"
              style={{ background: "oklch(55 0.12 148 / 0.15)" }}
            />
            <img
              src="/assets/generated/cream-tube-product.dim_600x500.png"
              alt="Fungus Infection Cream Product"
              className="animate-float relative z-10 w-64 md:w-80 drop-shadow-2xl"
            />
            {/* Floating badges */}
            <div
              className="absolute top-6 right-4 bg-white rounded-xl px-3 py-2 shadow-lg text-xs font-bold"
              style={{ color: "var(--brand-green)" }}
            >
              ✅ Clinically Tested
            </div>
            <div
              className="absolute bottom-8 left-0 bg-white rounded-xl px-3 py-2 shadow-lg text-xs font-bold"
              style={{ color: "var(--brand-gold-dark)" }}
            >
              ⚡ 48hr Relief
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
          >
            <path
              d="M0 40C360 80 1080 0 1440 40V80H0V40Z"
              fill="oklch(97 0.01 95)"
            />
          </svg>
        </div>
      </section>

      {/* ====== TRUST BAR ====== */}
      <section className="py-6 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: ShieldCheck, label: "ISO Certified" },
              { icon: Award, label: "Dermatologist Tested" },
              { icon: Leaf, label: "Natural Ingredients" },
              { icon: Heart, label: "Safe Formula" },
              { icon: ThumbsUp, label: "50,000+ Happy Customers" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: "var(--brand-green)" }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: "var(--brand-gold-dark)" }}
                />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PROBLEM SECTION ====== */}
      <section className="py-20 section-alt" id="problems">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <Badge
                className="mb-4 px-4 py-1.5 rounded-full"
                style={{
                  background: "oklch(35 0.12 148 / 0.1)",
                  color: "var(--brand-green)",
                }}
              >
                समस्या पहचानें
              </Badge>
              <h2
                className="font-display text-3xl md:text-4xl font-bold mb-3"
                style={{ color: "var(--brand-green-dark)" }}
              >
                क्या आप इन समस्याओं से परेशान हैं?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                अगर आप भी इन परेशानियों से जूझ रहे हैं, तो Fungus Infection Cream आपके
                लिए ही बनी है।
              </p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map((p) => (
              <AnimatedSection key={p.title}>
                <div className="card-hover bg-white rounded-2xl p-6 shadow-card text-center border border-border">
                  <div className="text-5xl mb-4">{p.icon}</div>
                  <h3
                    className="font-display text-lg font-bold mb-2"
                    style={{ color: "var(--brand-green-dark)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PRODUCT SHOWCASE ====== */}
      <section className="py-20 bg-background" id="product">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <Badge
                className="mb-4 px-4 py-1.5 rounded-full"
                style={{
                  background: "oklch(75 0.14 85 / 0.15)",
                  color: "var(--brand-gold-dark)",
                }}
              >
                ✨ Premium Formula
              </Badge>
              <h2
                className="font-display text-3xl md:text-4xl font-bold"
                style={{ color: "var(--brand-green-dark)" }}
              >
                Fungus Infection Cream
              </h2>
              <p className="text-muted-foreground mt-2">
                Advanced Anti-Fungal Medical Formula
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 items-center gap-8">
            {/* Left features */}
            <div className="space-y-6">
              {[
                { icon: Zap, label: "Fast Acting", desc: "48 घंटे में असर" },
                {
                  icon: FlaskConical,
                  label: "Clinically Tested",
                  desc: "डर्मेटोलॉजी लैब में परीक्षित",
                },
                {
                  icon: Leaf,
                  label: "Natural Base",
                  desc: "नीम और एलोवेरा युक्त",
                },
              ].map(({ icon: Icon, label, desc }) => (
                <AnimatedSection key={label}>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-card border border-border">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(35 0.12 148 / 0.1)" }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: "var(--brand-green)" }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-bold text-sm"
                        style={{ color: "var(--brand-green-dark)" }}
                      >
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Center product */}
            <div className="flex justify-center py-8">
              <div className="relative">
                <div
                  className="w-56 h-56 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow"
                  style={{ background: "oklch(35 0.12 148 / 0.08)" }}
                />
                <img
                  src="/assets/generated/cream-tube-product.dim_600x500.png"
                  alt="Fungus Infection Cream"
                  className="animate-float w-48 md:w-56 relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right features */}
            <div className="space-y-6">
              {[
                {
                  icon: ShieldCheck,
                  label: "Safe Formula",
                  desc: "100% सुरक्षित, कोई हानिकारक रसायन नहीं",
                },
                {
                  icon: Users,
                  label: "All Skin Types",
                  desc: "हर प्रकार की त्वचा के लिए",
                },
                {
                  icon: Award,
                  label: "Doctor Recommended",
                  desc: "त्वचा विशेषज्ञों की पहली पसंद",
                },
              ].map(({ icon: Icon, label, desc }) => (
                <AnimatedSection key={label}>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-card border border-border">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(75 0.14 85 / 0.15)" }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: "var(--brand-gold-dark)" }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-bold text-sm"
                        style={{ color: "var(--brand-green-dark)" }}
                      >
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== BENEFITS ====== */}
      <section id="benefits" className="py-20 section-alt">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <Badge
                className="mb-4 px-4 py-1.5 rounded-full"
                style={{
                  background: "oklch(35 0.12 148 / 0.1)",
                  color: "var(--brand-green)",
                }}
              >
                क्यों चुनें?
              </Badge>
              <h2
                className="font-display text-3xl md:text-4xl font-bold"
                style={{ color: "var(--brand-green-dark)" }}
              >
                6 अद्भुत फायदे
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                जो बनाते हैं Fungus Infection Cream को बाकी सबसे बेहतर
              </p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <AnimatedSection key={b.title}>
                <div className="card-hover bg-white rounded-2xl p-6 shadow-card border border-border h-full">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "oklch(97 0.015 148)" }}
                  >
                    <b.icon className={`w-7 h-7 ${b.color}`} />
                  </div>
                  <h3
                    className="font-display text-lg font-bold mb-2"
                    style={{ color: "var(--brand-green-dark)" }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ====== HOW TO USE ====== */}
      <section
        id="how-to-use"
        className="py-20"
        style={{ background: "var(--brand-green-dark)" }}
      >
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <Badge
                className="mb-4 px-4 py-1.5 rounded-full"
                style={{ background: "var(--brand-gold-dark)", color: "white" }}
              >
                उपयोग विधि
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                3 आसान कदम में पाएं राहत
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5"
              style={{ background: "var(--brand-gold)" }}
            />
            {STEPS.map((step) => (
              <AnimatedSection key={step.num}>
                <div className="text-center relative">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                    style={{
                      background: "var(--brand-gold-dark)",
                      border: "4px solid var(--brand-gold)",
                    }}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-display text-5xl font-bold opacity-20 text-white mb-2">
                    {step.num}
                  </div>
                  <h3
                    className="font-display text-xl font-bold mb-3"
                    style={{ color: "var(--brand-gold)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-red-200 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ====== BEFORE/AFTER ====== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-10">
              <Badge
                className="mb-4 px-4 py-1.5 rounded-full"
                style={{
                  background: "oklch(35 0.12 148 / 0.1)",
                  color: "var(--brand-green)",
                }}
              >
                परिणाम देखें
              </Badge>
              <h2
                className="font-display text-3xl md:text-4xl font-bold"
                style={{ color: "var(--brand-green-dark)" }}
              >
                पहले और बाद का फर्क
              </h2>
              <p className="text-muted-foreground mt-2">
                असली ग्राहकों के असली परिणाम
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <div
                className="rounded-2xl overflow-hidden shadow-lg border-2"
                style={{ borderColor: "var(--brand-gold)" }}
              >
                <img
                  src="/assets/generated/before-after-skin.dim_800x400.jpg"
                  alt="Before and After using Fungus Infection Cream"
                  className="w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "oklch(60 0.2 27 / 0.08)" }}
                >
                  <p className="font-bold text-red-700">पहले (Before)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    लाल, खुजलीदार त्वचा
                  </p>
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "oklch(55 0.12 148 / 0.08)" }}
                >
                  <p
                    className="font-bold"
                    style={{ color: "var(--brand-green)" }}
                  >
                    बाद में (After)
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    स्वस्थ, साफ त्वचा
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section id="reviews" className="py-20 section-alt">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <Badge
                className="mb-4 px-4 py-1.5 rounded-full"
                style={{
                  background: "oklch(35 0.12 148 / 0.1)",
                  color: "var(--brand-green)",
                }}
              >
                ग्राहक समीक्षाएं
              </Badge>
              <h2
                className="font-display text-3xl md:text-4xl font-bold"
                style={{ color: "var(--brand-green-dark)" }}
              >
                50,000+ खुश ग्राहक
              </h2>
              <p className="text-muted-foreground mt-2">
                जानें हमारे ग्राहक क्या कहते हैं
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <AnimatedSection key={t.name}>
                <div className="card-hover bg-white rounded-2xl p-6 shadow-card border border-border h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${t.color}`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p
                        className="font-bold text-sm"
                        style={{ color: "var(--brand-green-dark)" }}
                      >
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {t.location}
                      </p>
                    </div>
                  </div>
                  <StarRating count={t.stars} />
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-700 font-medium">
                      सत्यापित खरीदार
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INGREDIENTS ====== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <Badge
                className="mb-4 px-4 py-1.5 rounded-full"
                style={{
                  background: "oklch(75 0.14 85 / 0.15)",
                  color: "var(--brand-gold-dark)",
                }}
              >
                🧪 मुख्य सामग्री
              </Badge>
              <h2
                className="font-display text-3xl md:text-4xl font-bold"
                style={{ color: "var(--brand-green-dark)" }}
              >
                प्रभावशाली सामग्री
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                विज्ञान और प्रकृति का सर्वश्रेष्ठ संयोजन
              </p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INGREDIENTS.map((ing) => (
              <AnimatedSection key={ing.name}>
                <div
                  className="card-hover rounded-2xl p-6 text-center border-2"
                  style={{
                    borderColor: "var(--brand-gold)",
                    background: "oklch(75 0.14 85 / 0.04)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "oklch(35 0.12 148 / 0.1)" }}
                  >
                    <FlaskConical
                      className="w-7 h-7"
                      style={{ color: "var(--brand-green)" }}
                    />
                  </div>
                  <h3
                    className="font-display font-bold text-base mb-2"
                    style={{ color: "var(--brand-green-dark)" }}
                  >
                    {ing.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {ing.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section className="py-20 section-alt" id="faq">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection>
            <div className="text-center mb-14">
              <Badge
                className="mb-4 px-4 py-1.5 rounded-full"
                style={{
                  background: "oklch(35 0.12 148 / 0.1)",
                  color: "var(--brand-green)",
                }}
              >
                अक्सर पूछे जाने वाले सवाल
              </Badge>
              <h2
                className="font-display text-3xl md:text-4xl font-bold"
                style={{ color: "var(--brand-green-dark)" }}
              >
                आपके सवाल, हमारे जवाब
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.q.slice(0, 20)}
                  value={`item-${i + 1}`}
                  data-ocid={`faq.item.${i + 1}`}
                  className="bg-white rounded-xl border border-border px-4 shadow-card"
                >
                  <AccordionTrigger
                    className="font-semibold text-sm py-4 text-left hover:no-underline"
                    style={{ color: "var(--brand-green-dark)" }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== ORDER CTA ====== */}
      <section
        id="order"
        className="py-20"
        style={{ background: "var(--brand-green-dark)" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Offer Info */}
            <AnimatedSection>
              <div className="text-white space-y-6">
                <Badge
                  className="px-4 py-1.5 rounded-full"
                  style={{
                    background: "var(--brand-gold-dark)",
                    color: "white",
                  }}
                >
                  🎉 सीमित समय ऑफर
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  अभी ऑर्डर करें
                  <br />
                  <span className="shimmer-text">घर बैठे डिलीवरी पाएं</span>
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "var(--brand-gold-dark)" }}
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-red-100">Cash on Delivery उपलब्ध</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "var(--brand-gold-dark)" }}
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-red-100">Free Delivery सम्पूर्ण भारत में</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "var(--brand-gold-dark)" }}
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-red-100">7 दिन मनी बैक गारंटी</p>
                  </div>
                </div>
                {/* Price */}
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: "oklch(99 0 0 / 0.07)",
                    border: "1px solid oklch(99 0 0 / 0.15)",
                  }}
                >
                  <p className="text-red-300 text-sm mb-1">विशेष ऑफर मूल्य</p>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-display text-5xl font-bold"
                      style={{ color: "var(--brand-gold)" }}
                    >
                      ₹275
                    </span>
                    <span className="text-red-400 line-through text-xl">
                      ₹549
                    </span>
                    <Badge
                      style={{
                        background: "var(--brand-gold-dark)",
                        color: "white",
                      }}
                    >
                      50% OFF
                    </Badge>
                  </div>
                  <p className="text-xs text-red-300 mt-2">
                    *30g tube, सीमित स्टॉक उपलब्ध
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Order Form */}
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3
                  className="font-display text-xl font-bold mb-6"
                  style={{ color: "var(--brand-green-dark)" }}
                >
                  📦 ऑर्डर फॉर्म
                </h3>
                {isSuccess ? (
                  <div
                    data-ocid="order.success_state"
                    className="text-center py-8 space-y-4"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                      style={{ background: "oklch(55 0.12 148 / 0.1)" }}
                    >
                      <CheckCircle
                        className="w-8 h-8"
                        style={{ color: "var(--brand-green)" }}
                      />
                    </div>
                    <h4
                      className="font-display text-xl font-bold"
                      style={{ color: "var(--brand-green-dark)" }}
                    >
                      ऑर्डर प्राप्त हो गया!
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      हम 24 घंटे के अंदर आपसे संपर्क करेंगे। धन्यवाद!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleOrder} className="space-y-4">
                    <div>
                      <label
                        htmlFor="order-name"
                        className="text-sm font-semibold mb-1.5 block"
                        style={{ color: "var(--brand-green-dark)" }}
                      >
                        पूरा नाम *
                      </label>
                      <Input
                        id="order-name"
                        data-ocid="order.input"
                        placeholder="आपका पूरा नाम"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className="rounded-xl border-border"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="order-phone"
                        className="text-sm font-semibold mb-1.5 block"
                        style={{ color: "var(--brand-green-dark)" }}
                      >
                        मोबाइल नंबर *
                      </label>
                      <Input
                        id="order-phone"
                        data-ocid="order.input"
                        placeholder="10 अंकों का मोबाइल नंबर"
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        className="rounded-xl border-border"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="order-quantity"
                        className="text-sm font-semibold mb-1.5 block"
                        style={{ color: "var(--brand-green-dark)" }}
                      >
                        📦 मात्रा (कितनी ट्यूब चाहिए)
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              quantity: Math.max(1, p.quantity - 1),
                            }))
                          }
                          className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-colors"
                          style={{
                            borderColor: "var(--brand-green)",
                            color: "var(--brand-green)",
                          }}
                          disabled={form.quantity <= 1}
                        >
                          −
                        </button>
                        <span
                          id="order-quantity"
                          data-ocid="order.input"
                          className="flex-1 text-center text-xl font-bold py-2 rounded-xl border"
                          style={{
                            borderColor: "var(--brand-green)",
                            color: "var(--brand-green-dark)",
                          }}
                        >
                          {form.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              quantity: Math.min(10, p.quantity + 1),
                            }))
                          }
                          className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-colors"
                          style={{
                            borderColor: "var(--brand-green)",
                            color: "var(--brand-green)",
                          }}
                          disabled={form.quantity >= 10}
                        >
                          +
                        </button>
                      </div>
                      <p
                        className="mt-2 text-sm font-bold text-center"
                        style={{ color: "#16a34a" }}
                      >
                        कुल कीमत: ₹{totalPrice}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="order-address"
                        className="text-sm font-semibold mb-1.5 block"
                        style={{ color: "var(--brand-green-dark)" }}
                      >
                        पूरा पता
                      </label>
                      <Textarea
                        id="order-address"
                        data-ocid="order.input"
                        placeholder="अपना पूरा डिलीवरी पता लिखें..."
                        value={form.address}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, address: e.target.value }))
                        }
                        className="rounded-xl border-border resize-none"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="order-pincode"
                        className="text-sm font-semibold mb-1.5 block"
                        style={{ color: "var(--brand-green-dark)" }}
                      >
                        📍 पिन कोड *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="order-pincode"
                          data-ocid="order.input"
                          placeholder="6 अंकों का पिन कोड"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          pattern="[0-9]{6}"
                          value={form.pinCode}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              pinCode: e.target.value
                                .replace(/[^0-9]/g, "")
                                .slice(0, 6),
                            }))
                          }
                          className="rounded-xl border-border pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      data-ocid="order.submit_button"
                      disabled={isPending}
                      className="w-full py-4 text-base font-black rounded-xl transition-transform hover:scale-[1.02]"
                      style={{
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        border: "none",
                        color: "#111111",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {isPending ? (
                        <span className="flex items-center gap-2 justify-center">
                          <Clock className="w-4 h-4 animate-spin" /> भेज रहे हैं...
                        </span>
                      ) : (
                        <span
                          className="flex items-center gap-2 justify-center font-black"
                          style={{ color: "#111111" }}
                        >
                          <ShoppingBasket
                            className="w-5 h-5"
                            style={{ color: "#111111" }}
                          />
                          अभी ऑर्डर करें — ₹{totalPrice}
                        </span>
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      🔒 आपकी जानकारी पूरी तरह सुरक्षित है
                    </p>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer
        id="contact"
        className="py-12 border-t border-border bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/generated/fungus-cream-logo-transparent.dim_400x400.png"
                  alt="Logo"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p
                    className="font-display font-bold text-base"
                    style={{ color: "var(--brand-green)" }}
                  >
                    Fungus Infection Cream
                  </p>
                  <p className="text-xs text-muted-foreground">एंटी-फंगल क्रीम</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                भारत की सबसे भरोसेमंद एंटीफंगल क्रीम। दाद, खाज, खुजली और फंगल इन्फेक्शन के
                लिए प्रभावी और सुरक्षित उपचार।
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="font-display font-bold mb-4 text-sm"
                style={{ color: "var(--brand-green-dark)" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      data-ocid="nav.link"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="font-display font-bold mb-4 text-sm"
                style={{ color: "var(--brand-green-dark)" }}
              >
                संपर्क करें
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone
                    className="w-4 h-4"
                    style={{ color: "var(--brand-green)" }}
                  />
                  <span>+91 70492 90924</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin
                    className="w-4 h-4"
                    style={{ color: "var(--brand-green)" }}
                  />
                  <span>नई दिल्ली, भारत</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock
                    className="w-4 h-4"
                    style={{ color: "var(--brand-green)" }}
                  />
                  <span>सोम–शनि: 9AM – 6PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Fungus Infection Cream. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
