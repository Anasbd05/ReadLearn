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

import { Target, Bookmark, Library, Newspaper, ScrollText } from "lucide-react";

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
    author: "Theodor Storm",
    cover: DieRegentrude,
    difficulty: "Very Easy",
  },
  {
    title: "Der Schimmelreiter",
    author: "Theodor Storm",
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
import 論語 from "./論語.jpg";
import 孟子 from "./孟子.jpg";
import 三字經 from "./三字經.webp";
import 聊齋志異 from "./聊齋志異.jpg";
import 古文觀止 from "./古文觀止.jpg";
import 東周列國志 from "./東周列國志.jpg";
import 世說新語 from "./世說新語.jpg";
import 史記 from "./史記.jpg";
export const ChineseBooks = [
  {
    title: "論語",
    author: "Confucius",
    cover: 論語,
    difficulty: "Hard", // Classical Chinese, concise but difficult
  },
  {
    title: "孟子",
    author: "Mencius",
    cover: 孟子,
    difficulty: "Very Hard", // Philosophical + dense Classical Chinese
  },
  {
    title: "三字經",
    author: "Yinglin Wang",
    cover: 三字經,
    difficulty: "Medium", // Simple sentences, easier classical style
  },
  {
    title: "聊齋志異 I",
    author: "Songling Pu",
    cover: 聊齋志異,
    difficulty: "Medium", // Vernacular Classical Chinese, manageable
  },
  {
    title: "聊齋志異 II",
    author: "Songling Pu",
    cover: 聊齋志異,
    difficulty: "Medium",
  },
  {
    title: "古文觀止",
    author: "Dazhi Wu && Chengquan Wu",
    cover: 古文觀止,
    difficulty: "Very Hard", // Pure Classical Chinese anthology
  },
  {
    title: "世說新語",
    author: "Yiqing Liu",
    cover: 世說新語,
    difficulty: "Hard", // Anecdotal classical prose, short but dense
  },
  {
    title: "東周列國志",
    author: "Menglong Feng",
    cover: 東周列國志,
    difficulty: "Medium", // Vernacular Chinese; much easier than classical works
  },
  {
    title: "史记 I",
    author: "Qian Sima",
    cover: 史記,
    difficulty: "Very Hard", // Pure Classical Chinese, historical narrative
  },
  {
    title: "史記 II",
    author: "Qian Sima",
    cover: 史記,
    difficulty: "Very Hard",
  },
  {
    title: "史記 III",
    author: "Qian Sima",
    cover: 史記,
    difficulty: "Very Hard",
  },
];

export const features = [
  {
    icon: Target,
    title: "Flexible Language Learning",
    description:
      "Switch between target languages anytime you want. Learn at your own pace and explore multiple languages whenever you choose.",
  },
  {
    icon: Library,
    title: "Books in Your Target Language",
    description:
      "Access books in your target language with instant translation support. Tap any word or line you don't understand to see the full translation in your native language.",
  },
  {
    icon: Newspaper,
    title: "Daily Articles",
    description:
      "Receive a fresh article every day in your target language. Perfect for expanding your knowledge, learning new vocabulary, and improving your language skills. Click any word or line for instant translation to your native language.",
  },
  {
    icon: ScrollText,
    title: "Weekly Stories",
    description:
      "Enjoy 3 engaging stories every week in your target language. Explore exciting narratives and different themes while enhancing your language skills. Tap any word or line you don't understand for immediate translation.",
  },
  {
    icon: Bookmark,
    title: "Import Your Own Content",
    description:
      "Import your own articles, stories, or any text you want to read. Build your personal reading library with unlimited content of any length.",
  },
  {
    icon: Target,
    title: "Smart Vocabulary Tracker",
    description:
      "View all the vocabularies you've learned in your target language with translations in your native language. Track your progress and review anytime.",
  },
];

export const reviews = [
  {
    name: "Abhijeet Satogiya",
    avatar: "AS",
    rating: 5,
    text: "Love the concept - learning through real content is the most natural method. The UI looks clean and focused.",
    highlight: "learning through real content is the most natural method",
  },
  {
    name: "Wesley Javorsky",
    avatar: "WJ",
    rating: 5,
    text: "I liked the idea, the website is quite good, and it’s appearance is very beautifull",
    highlight: "it’s appearance is very beautifull",
  },
  {
    name: "Sara Moon",
    avatar: "SM",
    rating: 5,
    text: "The translation is good and clear. As for how user friendly it is, I’m not completely sure. I find it easy to understand.",
    highlight: "The translation is good and clear",
  },
  {
    name: "Hamza",
    avatar: "HZ",
    rating: 5,
    text: "The website is amazing for learning English. The design is clean and user‑friendly, and it is very easy to navigate.",
    highlight: "The design is clean and user‑friendly",
  },
  {
    name: "Amanda",
    avatar: "AM",
    rating: 5,
    text: "Wait omg that's actually really great I've been searching for website where there's spanish book so i can learn and practice my spanish And finnaly found one",
    highlight: "learn and practice my spanish",
  },
  {
    name: "Nellie",
    avatar: "NL",
    rating: 5,
    text: "the platform is really helpful and user friendly! ,I really enjoyed it",
    highlight: "user friendly!",
  },
  {
    name: "Alex D",
    avatar: "AD",
    rating: 5,
    text: "Love the idea! Honestly I've heard from friends that the way they made language learning fun is by reading children books and going up the grade ladder.",
    highlight: "language learning fun is by reading",
  },
  {
    name: "karim",
    avatar: "KR",
    rating: 5,
    text: "i think the idea is good translations and vocabulary lists are good",
    highlight: "translations and vocabulary lists are good",
  },
];

export const BooksCover = [
  {
    cover: 東周列國志,
    alt: "東周列國志",
  },
  {
    cover: sherlock,
    alt: "The Adventures of Sherlock Holmes",
  },
  {
    cover: DerProzess,
    alt: "Der Prozess",
  },
  {
    cover: Lupin,
    alt: "Arsène Lupin",
  },
  {
    cover: EffiBriest,
    alt: "Effi Briest",
  },
  {
    cover: bluebird,
    alt: "The Blue Bird",
  },
  {
    cover: PlateroYo,
    alt: "Platero y yo",
  },
  {
    cover: LeComte,
    alt: "Le Comte de Monte-Cristo",
  },
  {
    cover: DerSchimmelreiter,
    alt: "Der Schimmelreiter",
  },
  {
    cover: PoilDeCarotte,
    alt: "Poil de carotte",
  },
  {
    cover: LazarilloDeTormes,
    alt: "Vida De Lazarillo De Tormes",
  },
  {
    cover: FabulasLiterarias,
    alt: "Fábulas Literarias",
  },
  {
    cover: 世說新語,
    alt: "世說新語",
  },
  {
    cover: Northanger,
    alt: "Northanger Abbey",
  },
  {
    cover: greatGatsbyCover,
    alt: "The Great Gatsby",
  },
];
