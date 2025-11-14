// Import all cover images at the top
import greatGatsbyCover from "./greatGatsbyCover.jpeg";
import prideAndPrejudiceCover from "./prideAndPrejudiceCover.jpeg";
import Sense from "./sense.jpeg";
import emma from "./emma.jpeg";
import Northanger from "./Northanger.jpeg";
import bluebird from "./bluebird.jpeg";
import canadian from "./canadian.jpeg";
import sherlock from "./sherlock.jpeg";
import childhood from "./childhood.jpeg";

import {
  BookText,
  Target,
  Bookmark,
  Sparkles,
  Library,
  TrendingUp,
} from "lucide-react";

export const EnglishBooks = [
  {
    title: "Sense and Sensibility",
    author: "Jane Austen",
    cover: Sense,
    difficulty: "Hard", // Complex 19th century syntax, formal register, period vocabulary
  },
  {
    title: "The Blue Bird",
    author: "Maurice Maeterlinck",
    cover: bluebird,
    difficulty: "Very Easy", // Simple sentences, basic vocabulary, written for children
  },
  {
    title: "Northanger Abbey",
    author: "Jane Austen",
    cover: Northanger,
    difficulty: "Hard", // 19th century English with literary allusions
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: greatGatsbyCover,
    difficulty: "Medium", // Modern English, poetic but accessible prose
  },
  {
    title: "Canadian Fairy Tales",
    author: "Cyrus MacMillan",
    cover: canadian,
    difficulty: "Easy", // Straightforward narrative language, clear sentence structure
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: prideAndPrejudiceCover,
    difficulty: "Hard", // Long sentences, archaic expressions, formal dialogue
  },
  {
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    cover: sherlock,
    difficulty: "Medium", // Victorian vocabulary but clear narrative style
  },
  {
    title: "Emma",
    author: "Jane Austen",
    cover: emma,
    difficulty: "Hard", // Dense prose, subtle irony, sophisticated vocabulary
  },
  {
    title: "Childhood",
    author: "Leo Tolstoy",
    cover: childhood,
    difficulty: "Very Hard", // Complex syntax, stream of consciousness, translated prose
  },
];

import Lupin from "./arsene_lupin.jpeg";
import MamamLeo from "./MamanLéo.jpeg";
import LeComte from "./LeComte.jpeg";
import PlusFort from "./PlusFort.jpeg";
import LeDernierJour from "./LeDernierJour.jpeg";
import napoleon from "./napoleon.jpg";
import Contes from "./Contes.jpeg";
import PoilDeCarotte from "./PoildeCarotte.jpeg";
import LAvare from "./LAvare.jpeg";
import JeanValjean from "./JeanValjean.jpeg";

export const FrenchBooks = [
  {
    title: "Arsène Lupin",
    author: "Maurice Leblanc",
    cover: Lupin,
    difficulty: "Easy",
  },
  {
    title: "Maman Léo",
    author: "Paul Féval",
    cover: MamamLeo,
    difficulty: "Medium",
  },
  {
    title: "Le Comte de Monte-Cristo, Tome I",
    author: "Alexandre Dumas",
    cover: LeComte,
    difficulty: "Medium",
  },
  {
    title: "Plus fort que Sherlock Holmès",
    author: "Mark Twain",
    cover: PlusFort,
    difficulty: "Easy",
  },
  {
    title: "Le Dernier Jour d'un Condamné",
    author: "Victor Hugo",
    cover: LeDernierJour,
    difficulty: "Medium",
  },
  {
    title: "Napoléon Le Petit",
    author: "Victor Hugo",
    cover: napoleon,
    difficulty: "Hard",
  },
  {
    title: "Contes du jour et de la nuit",
    author: "Guy de Maupassant",
    cover: Contes,
    difficulty: "Medium",
  },
  {
    title: "Poil de carotte",
    author: "Jules Renard",
    cover: PoilDeCarotte,
    difficulty: "Medium",
  },
  {
    title: "L'Avare",
    author: "Molière",
    cover: LAvare,
    difficulty: "Hard",
  },
  {
    title: "Jean valjean",
    author: "Victor Hugo",
    cover: JeanValjean,
    difficulty: "Medium",
  },
];

import PlateroYo from "./Juan Ramon Jimenez_ Platero y yo, editorial signo, 1934_.jpeg";
import LazarilloDeTormes from "./EL LAZARILLO DE TORMES.jpeg";
import ElSiDeLasNinas from "./El sí de las niñas.jpg";
import FabulasSamaniego from "./Fábulas.jpg";
import FabulasLiterarias from "./Fábulas literarias.jpg";
import Marianela from "./Marianela.jpg";
import FuenteOvejuna from "./Fuente Ovejuna.jpg";
import PepitaJimenez from "./Pepita Jiménez.jpeg";
import MarcosDeObregon from "./Vida del escudero Marcos de Obregón.jpg";
import LaRegenta from "./LaRegenta.jpeg";

export const SpanishBooks = [
  {
    title: "Platero y yo",
    author: "Juan Ramón Jiménez",
    cover: PlateroYo,
    difficulty: "Very Easy",
  },
  {
    title: "Vida De Lazarillo De Tormes",
    author: "Anónimo",
    cover: LazarilloDeTormes,
    difficulty: "Easy",
  },
  {
    title: "El sí de las niñas",
    author: "Leandro Fernández de Moratín",
    cover: ElSiDeLasNinas,
    difficulty: "Easy",
  },
  {
    title: "Fábulas",
    author: "Félix María Samaniego",
    cover: FabulasSamaniego,
    difficulty: "Easy",
  },
  {
    title: "Fábulas literarias",
    author: "Tomás de Iriarte",
    cover: FabulasLiterarias,
    difficulty: "Easy",
  },
  {
    title: "Marianela",
    author: "Benito Pérez Galdós",
    cover: Marianela,
    difficulty: "Medium",
  },
  {
    title: "Fuente Ovejuna",
    author: "Lope de Vega",
    cover: FuenteOvejuna,
    difficulty: "Medium",
  },
  {
    title: "Pepita Jiménez",
    author: "Juan Valera",
    cover: PepitaJimenez,
    difficulty: "Medium",
  },
  {
    title: "Vida del escudero Marcos de Obregón",
    author: "Vicente Espinel",
    cover: MarcosDeObregon,
    difficulty: "Hard",
  },
  {
    title: "La Regenta",
    author: "Leopoldo Alas",
    cover: LaRegenta,
    difficulty: "Very Hard",
  },
  {
    title: "La Regenta II",
    author: "Leopoldo Alas",
    cover: LaRegenta,
    difficulty: "Very Hard",
  },
  {
    title: "La Regenta III",
    author: "Leopoldo Alas",
    cover: LaRegenta,
    difficulty: "Very Hard",
  },
];

import DieRegentrude from "./DieRegentrude.jpeg";
import DerSchimmelreiter from "./DerSchimmelreiter.jpg";
import DerStruwwelpeter from "./DerStruwwelpeter.jpeg";
import MaxandMoritz from "./MaxandMoritz.jpeg";
import DieJudenbuche from "./DieJudenbuche.jpg";
import AusdemLebeneinesTaugenichts from "./AusdemLebeneinesTaugenichts.jpeg";
import EffiBriest from "./EffiBriest.jpeg";
import IphigenieaufTauris from "./IphigenieaufTauris.jpeg";
import DerProzess from "./DerProzess.jpeg";
import DieLeutevonSeldwylaBandI from "./DieLeutevonSeldwylaBandI.webp";

export const GermanBooks = [
  {
    title: "Die Regentrude",
    Author: "Theodor Storm",
    cover: DieRegentrude,
    difficulty: "Very Easy",
  },
  {
    title: "Der Schimmelreiter",
    Author: "Theodor Storm",
    cover: DerSchimmelreiter,
    difficulty: "Easy",
  },
  {
    title: "Der Struwwelpeter",
    author: "Heinrich Hoffmann",
    cover: DerStruwwelpeter,
    difficulty: "Easy",
  },
  {
    title: "Max und Moritz",
    author: "Wilhelm Busch",
    cover: MaxandMoritz,
    difficulty: "Medium",
  },
  {
    title: "Die Judenbuche",
    author: "Annette von Droste-Hülshoff",
    cover: DieJudenbuche,
    difficulty: "Medium",
  },
  {
    title: "Aus dem Leben eines Taugenichts: Novelle",
    author: "Freiherr von Joseph Eichendorff",
    cover: AusdemLebeneinesTaugenichts,
    difficulty: "Medium",
  },
  {
    title: "Effi Briest",
    author: "Theodor Fontane",
    cover: EffiBriest,
    difficulty: "Hard",
  },
  {
    title: "Iphigenie auf Tauris",
    author: "Johann Wolfgang von Goethe",
    cover: IphigenieaufTauris,
    difficulty: "Hard",
  },
  {
    title: "Der Prozess",
    author: "Franz Kafka",
    cover: DerProzess,
    difficulty: "Very Hard",
  },
  {
    title: "Die Leute von Seldwyla Band I",
    author: "Gottfried Keller",
    cover: DieLeutevonSeldwylaBandI,
    difficulty: "Very Easy",
  },
];

export const ChineseBooks = [
  {
    title: "小王子",
    author: "Antoine de Saint-Exupéry",
    cover: "https://covers.openlibrary.org/b/isbn/9787544270878-L.jpg",
    difficulty: "Very Easy",
  },
  {
    title: "城南旧事",
    author: "Lin Haiyin",
    cover: "https://covers.openlibrary.org/b/isbn/9787020002207-L.jpg",
    difficulty: "Easy",
  },
  {
    title: "三毛流浪记",
    author: "Zhang Leping",
    cover: "https://covers.openlibrary.org/b/isbn/9787532243945-L.jpg",
    difficulty: "Easy",
  },
  {
    title: "活着",
    author: "Yu Hua",
    cover: "https://covers.openlibrary.org/b/isbn/9787506365437-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "围城",
    author: "Qian Zhongshu",
    cover: "https://covers.openlibrary.org/b/isbn/9787020024759-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "平凡的世界",
    author: "Lu Yao",
    cover: "https://covers.openlibrary.org/b/isbn/9787530211007-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "红楼梦",
    author: "Cao Xueqin",
    cover: "https://covers.openlibrary.org/b/isbn/9787020002207-L.jpg",
    difficulty: "Hard",
  },
  {
    title: "三国演义",
    author: "Luo Guanzhong",
    cover: "https://covers.openlibrary.org/b/isbn/9787020008735-L.jpg",
    difficulty: "Hard",
  },
  {
    title: "西游记",
    author: "Wu Cheng'en",
    cover: "https://covers.openlibrary.org/b/isbn/9787020008728-L.jpg",
    difficulty: "Very Hard",
  },
  {
    title: "金瓶梅",
    author: "Lanling Xiaoxiao Sheng",
    cover: "https://covers.openlibrary.org/b/isbn/9787020008711-L.jpg",
    difficulty: "Very Hard",
  },
];

export const ArabicBooks = [
  {
    title: "الأمير الصغير",
    author: "Antoine de Saint-Exupéry",
    cover: "https://covers.openlibrary.org/b/isbn/9789953639048-L.jpg",
    difficulty: "Very Easy",
  },
  {
    title: "رجال في الشمس",
    author: "Ghassan Kanafani",
    cover: "https://covers.openlibrary.org/b/isbn/9789953634807-L.jpg",
    difficulty: "Easy",
  },
  {
    title: "الخبز الحافي",
    author: "Mohamed Choukri",
    cover: "https://covers.openlibrary.org/b/isbn/9789953634814-L.jpg",
    difficulty: "Easy",
  },
  {
    title: "موسم الهجرة إلى الشمال",
    author: "Tayeb Salih",
    cover: "https://covers.openlibrary.org/b/isbn/9789953634821-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "ثلاثية غرناطة",
    author: "Radwa Ashour",
    cover: "https://covers.openlibrary.org/b/isbn/9789771413943-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "بنات الرياض",
    author: "Rajaa Alsanea",
    cover: "https://covers.openlibrary.org/b/isbn/9789953634838-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "أولاد حارتنا",
    author: "Naguib Mahfouz",
    cover: "https://covers.openlibrary.org/b/isbn/9789770927991-L.jpg",
    difficulty: "Hard",
  },
  {
    title: "ألف ليلة وليلة",
    author: "Unknown",
    cover: "https://covers.openlibrary.org/b/isbn/9789953634845-L.jpg",
    difficulty: "Hard",
  },
  {
    title: "ديوان المتنبي",
    author: "Al-Mutanabbi",
    cover: "https://covers.openlibrary.org/b/isbn/9789953634852-L.jpg",
    difficulty: "Very Hard",
  },
  {
    title: "الأغاني",
    author: "Abu al-Faraj al-Isfahani",
    cover: "https://covers.openlibrary.org/b/isbn/9789953634869-L.jpg",
    difficulty: "Very Hard",
  },
];

export const faqs = [
  {
    question: "Which languages does FluentRead support?",
    answer:
      "We currently support English, French, Spanish, German, Arabic, and Chinese. Each language has a curated library and full translation support.",
  },
  {
    question: "Can I import my own content?",
    answer:
      "Yes! You can upload PDFs, EPUB files, plain text, or paste content directly. You can also import articles from URLs.",
  },
  {
    question: "How does the instant translation work?",
    answer:
      "Simply click on any word while reading, and you'll see its translation, context, part of speech, and example sentences. No need to switch between apps or look up words manually.",
  },
  {
    question: "What is the AI content generator?",
    answer:
      "Our AI creates personalized reading material based on topics you choose, adjusted to your proficiency level. It's perfect for practicing specific vocabulary or exploring new subjects.",
  },
  {
    question: "How does the vocabulary tracking work?",
    answer:
      "Every word you bookmark is saved to your personal vocabulary list. You can review them anytime, star difficult words, and see example sentences to reinforce learning.",
  },
  {
    question: "Can I switch between languages?",
    answer:
      "Yes! Both plans give you access to all 6 languages, and you can switch between them anytime.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. I take privacy seriously — all data is encrypted and securely stored.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Of course. Just email me at anastrying05@gmail.com, and I’ll personally handle your cancellation within 12–24 hours.",
  },
];
export const features = [
  {
    icon: BookText,
    title: "Import Any Content",
    description:
      "Add your own text, create custom stories, notes, or learning scripts. Build your personal reading library. Save unlimited content — any length.",
  },
  {
    icon: Target,
    title: "Instant Word Translation",
    description:
      "Click any word for immediate translation. See context and usage examples. Understand grammar and part of speech. Native pronunciation audio.",
  },
  {
    icon: Bookmark,
    title: "Smart Vocabulary Builder",
    description:
      "Bookmark words you're learning. Star your most challenging words. Review with spaced repetition. Track your progress over time.",
  },
  {
    icon: Sparkles,
    title: "AI Content Generator",
    description:
      "Create personalized reading material. Choose your topics and interests. Adjust difficulty level (A1-C2). Get content tailored to your level.",
  },
  {
    icon: Library,
    title: "Curated Book Library",
    description:
      "Access hundreds of books in 6 languages. Classic literature to modern stories. Filter by difficulty and genre. Track reading progress.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor words learned. See reading statistics. Celebrate milestones. Watch your vocabulary grow.",
  },
];
export const reviews = [
  {
    name: "Sarah Chen",
    role: "Learning Spanish",
    avatar: "SC",
    rating: 5,
    text: "FluentRead transformed how I learn Spanish. Being able to click on any word while reading actual books is incredible.",
    highlight: "click on any word",
  },
  {
    name: "Marcus Weber",
    role: "Learning French",
    avatar: "MW",
    rating: 5,
    text: "The AI content generator is a game-changer. I can create reading material about topics I'm actually interested in.",
    highlight: "game-changer",
  },
  {
    name: "Yuki Tanaka",
    role: "Learning English",
    avatar: "YT",
    rating: 5,
    text: "My vocabulary has grown so much in just 2 months! Now I just click and continue reading without losing track.",
    highlight: "2 months",
  },
  {
    name: "Ahmed Al-Rashid",
    role: "Learning German",
    avatar: "AA",
    rating: 5,
    text: "The vocabulary tracking is brilliant. It's like having a personal language tutor in my pocket.",
    highlight: "personal language tutor",
  },
  {
    name: "Emma Laurent",
    role: "Learning Chinese",
    avatar: "EL",
    rating: 5,
    text: "Being able to click on characters and see instant translations with context made everything click.",
    highlight: "instant translations",
  },
  {
    name: "Carlos Rodriguez",
    role: "Learning Arabic",
    avatar: "CR",
    rating: 5,
    text: "I love that I can import articles from websites. Learning through content I care about is so much more engaging.",
    highlight: "import articles",
  },
  {
    name: "Sophie Andersson",
    role: "Learning Spanish & French",
    avatar: "SA",
    rating: 5,
    text: "Learning two languages at once is easy with FluentRead. Best investment I've made in my language journey!",
    highlight: "Best investment",
  },
  {
    name: "David Kim",
    role: "Learning German",
    avatar: "DK",
    rating: 5,
    text: "I've made more progress in 6 weeks than I did in a year of evening classes. Perfect for busy professionals.",
    highlight: "6 weeks",
  },
];
