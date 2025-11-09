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

export const FrenchBooks = [
  {
    title: "Le Petit Nicolas",
    author: "René Goscinny",
    cover: "https://covers.openlibrary.org/b/isbn/9782070612758-L.jpg",
    difficulty: "Very Easy",
  },
  {
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    cover: "https://covers.openlibrary.org/b/isbn/9782070612758-L.jpg",
    difficulty: "Easy",
  },
  {
    title: "L'Étranger",
    author: "Albert Camus",
    cover: "https://covers.openlibrary.org/b/isbn/9782070360024-L.jpg",
    difficulty: "Easy",
  },
  {
    title: "Candide",
    author: "Voltaire",
    cover: "https://covers.openlibrary.org/b/isbn/9782080712790-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "Le Comte de Monte-Cristo",
    author: "Alexandre Dumas",
    cover: "https://covers.openlibrary.org/b/isbn/9782253098058-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "Bonjour Tristesse",
    author: "Françoise Sagan",
    cover: "https://covers.openlibrary.org/b/isbn/9782266155267-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "Les Misérables",
    author: "Victor Hugo",
    cover: "https://covers.openlibrary.org/b/isbn/9782253096337-L.jpg",
    difficulty: "Hard",
  },
  {
    title: "Madame Bovary",
    author: "Gustave Flaubert",
    cover: "https://covers.openlibrary.org/b/isbn/9782070413119-L.jpg",
    difficulty: "Hard",
  },
  {
    title: "À la recherche du temps perdu",
    author: "Marcel Proust",
    cover: "https://covers.openlibrary.org/b/isbn/9782070755080-L.jpg",
    difficulty: "Very Hard",
  },
  {
    title: "Les Fleurs du mal",
    author: "Charles Baudelaire",
    cover: "https://covers.openlibrary.org/b/isbn/9782253006350-L.jpg",
    difficulty: "Very Hard",
  },
];

export const SpanishBooks = [
  {
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    cover: "https://covers.openlibrary.org/b/isbn/9788498381498-L.jpg",
    difficulty: "Very Easy",
  },
  {
    title: "La Casa en Mango Street",
    author: "Sandra Cisneros",
    cover: "https://covers.openlibrary.org/b/isbn/9780679755265-L.jpg",
    difficulty: "Easy",
  },
  {
    title: "Relato de un náufrago",
    author: "Gabriel García Márquez",
    cover: "https://covers.openlibrary.org/b/isbn/9788497592437-L.jpg",
    difficulty: "Easy",
  },
  {
    title: "Como agua para chocolate",
    author: "Laura Esquivel",
    cover: "https://covers.openlibrary.org/b/isbn/9780385721240-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "Crónica de una muerte anunciada",
    author: "Gabriel García Márquez",
    cover: "https://covers.openlibrary.org/b/isbn/9788497592437-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "La sombra del viento",
    author: "Carlos Ruiz Zafón",
    cover: "https://covers.openlibrary.org/b/isbn/9788408163251-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "Don Quijote",
    author: "Miguel de Cervantes",
    cover: "https://covers.openlibrary.org/b/isbn/9788420412146-L.jpg",
    difficulty: "Hard",
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    cover: "https://covers.openlibrary.org/b/isbn/9788497592437-L.jpg",
    difficulty: "Hard",
  },
  {
    title: "Rayuela",
    author: "Julio Cortázar",
    cover: "https://covers.openlibrary.org/b/isbn/9788420633381-L.jpg",
    difficulty: "Very Hard",
  },
  {
    title: "La Regenta",
    author: "Leopoldo Alas",
    cover: "https://covers.openlibrary.org/b/isbn/9788437604480-L.jpg",
    difficulty: "Very Hard",
  },
];

export const GermanBooks = [
  {
    title: "Der kleine Prinz",
    author: "Antoine de Saint-Exupéry",
    cover: "https://covers.openlibrary.org/b/isbn/9783792000069-L.jpg",
    difficulty: "Very Easy",
  },
  {
    title: "Die Verwandlung",
    author: "Franz Kafka",
    cover: "https://covers.openlibrary.org/b/isbn/9783150009314-L.jpg",
    difficulty: "Easy",
  },
  {
    title: "Emil und die Detektive",
    author: "Erich Kästner",
    cover: "https://covers.openlibrary.org/b/isbn/9783855356080-L.jpg",
    difficulty: "Easy",
  },
  {
    title: "Siddharta",
    author: "Hermann Hesse",
    cover: "https://covers.openlibrary.org/b/isbn/9783518366813-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "Der Vorleser",
    author: "Bernhard Schlink",
    cover: "https://covers.openlibrary.org/b/isbn/9783257229530-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "Im Westen nichts Neues",
    author: "Erich Maria Remarque",
    cover: "https://covers.openlibrary.org/b/isbn/9783462038781-L.jpg",
    difficulty: "Medium",
  },
  {
    title: "Die Blechtrommel",
    author: "Günter Grass",
    cover: "https://covers.openlibrary.org/b/isbn/9783423110259-L.jpg",
    difficulty: "Hard",
  },
  {
    title: "Der Prozess",
    author: "Franz Kafka",
    cover: "https://covers.openlibrary.org/b/isbn/9783596521265-L.jpg",
    difficulty: "Hard",
  },
  {
    title: "Faust",
    author: "Johann Wolfgang von Goethe",
    cover: "https://covers.openlibrary.org/b/isbn/9783150000014-L.jpg",
    difficulty: "Very Hard",
  },
  {
    title: "Der Zauberberg",
    author: "Thomas Mann",
    cover: "https://covers.openlibrary.org/b/isbn/9783596294312-L.jpg",
    difficulty: "Very Hard",
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

export const plans = [
  {
    name: "Starter",
    description: "Best for language learners getting started",
    monthlyPrice: 8,
    yearlyPrice: 76.8,
    popular: false,
    features: [
      "All 6 languages",
      "Unlimited library access",
      "Unlimited vocabulary bookmarks",
      "10 AI content generations per month",
      "Progress analytics",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    description: "Best for learners who want unlimited content on any topic",
    monthlyPrice: 14,
    yearlyPrice: 134.4,
    popular: true,
    features: [
      "All 6 languages",
      "Unlimited library access",
      "Unlimited vocabulary bookmarks",
      "Unlimited AI content generation",
      "Progress analytics",
      "Priority support",
    ],
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
