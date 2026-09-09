import { Language, Lesson, Worksheet, Flashcard, ValidationItem, ActivityItem, TeacherProfile } from '../types';

export const LANGUAGES: Language[] = [
  {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    region: 'North & Central India (School Medium)',
    sampleSentence: 'आज हम 1 से 10 तक गिनती सीखेंगे।',
    sampleTranslation: 'आज हम 1 से 10 तक गिनती सीखेंगे।',
  },
  {
    id: 'santhali',
    name: 'Santhali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    script: 'Ol Chiki / Latin Transliteration',
    region: 'Jharkhand, Odisha, West Bengal',
    sampleSentence: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾',
    sampleTranslation: 'Teheñ abo 1 khon 10 dhabij lekha bon chedog-a.',
  },
  {
    id: 'ho',
    name: 'Ho',
    nativeName: '𑢹𑣉𑣉 𑣎𑣋𑣜',
    script: 'Warang Citi / Latin Transliteration',
    region: 'Singhbhum, Mayurbhanj, Keonjhar',
    sampleSentence: 'ᱛᱮᱥᱤᱝ ᱟᱞᱮ ᱑ ᱮᱛᱮ ᱑᱐ ᱡᱟᱠᱮᱫ ᱦᱤᱥᱟᱹᱵ ᱪᱮᱫᱮᱭᱟᱞᱮ᱾',
    sampleTranslation: 'Tesing ale 1 ete 10 jaked hisab chedeyale.',
  },
  {
    id: 'mundari',
    name: 'Mundari',
    nativeName: 'ᱢᱩᱱᱰᱟᱹᱨᱤ',
    script: 'Mundari Bani / Nagari Transliteration',
    region: 'Ranchi, Khunti, West Singhbhum',
    sampleSentence: 'ᱛᱤᱥᱤᱝ ᱟᱵᱩ ᱑ ᱟᱛᱮ ᱑᱐ ᱡᱟᱹᱠᱤᱫ ᱦᱤᱥᱟᱹᱵᱽ ᱵᱩ ᱤᱛᱩᱱᱟ᱾',
    sampleTranslation: 'Tising abu 1 ate 10 jakid hisab bu ituna.',
  }
];

export const TEACHER_PROFILE: TeacherProfile = {
  name: 'Sunita Bai',
  email: 'sunita.bai@jharkhand.edu.in',
  role: 'Primary Grade Teacher',
  school: 'Govt. Tribal Primary School, Torpa',
  district: 'Khunti District',
  state: 'Jharkhand',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop',
  studentsCount: 38,
  languagesTaught: ['Hindi', 'Santhali', 'Mundari']
};

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    action: 'Created a counting worksheet',
    detail: 'Numbers 1 to 10 with Santhali matching illustrations',
    timestamp: '15 mins ago',
    category: 'worksheet'
  },
  {
    id: 'act-2',
    action: 'Translated a classroom lesson',
    detail: 'Water Cycle & Rain (Hindi → Santhali audio generated)',
    timestamp: '2 hours ago',
    category: 'lesson'
  },
  {
    id: 'act-3',
    action: 'Added new flashcards',
    detail: '5 foundational nature vocabulary cards with Ol Chiki script',
    timestamp: 'Yesterday',
    category: 'flashcard'
  },
  {
    id: 'act-4',
    action: 'Validated a tribal-language translation',
    detail: 'Approved Ho phrasing for "Classroom instructions and greetings"',
    timestamp: '2 days ago',
    category: 'validation'
  }
];

export const SUMMARY_STATS = {
  totalLessons: 24,
  worksheetsCreated: 18,
  flashcardsAvailable: 85,
  pendingValidations: 7,
  activeStudents: 38,
  communityReviewed: '92%'
};

export const PARTICIPATION_CHART_DATA = [
  { day: 'Mon', santhali: 28, ho: 20, mundari: 16 },
  { day: 'Tue', santhali: 34, ho: 24, mundari: 22 },
  { day: 'Wed', santhali: 32, ho: 28, mundari: 25 },
  { day: 'Thu', santhali: 36, ho: 30, mundari: 27 },
  { day: 'Fri', santhali: 38, ho: 32, mundari: 29 },
  { day: 'Sat', santhali: 35, ho: 28, mundari: 24 },
];

export const LESSONS_COMPLETED_DATA = [
  { week: 'Week 1', completed: 12, target: 15 },
  { week: 'Week 2', completed: 18, target: 15 },
  { week: 'Week 3', completed: 22, target: 20 },
  { week: 'Week 4', completed: 26, target: 25 },
];

export const WORKSHEET_USAGE_DATA = [
  { name: 'Counting & Math', count: 32, fill: '#2563eb' },
  { name: 'Fruits & Plants', count: 24, fill: '#0d9488' },
  { name: 'Animals & Birds', count: 20, fill: '#6366f1' },
  { name: 'Colors & Shapes', count: 18, fill: '#f59e0b' },
  { name: 'Classroom Objects', count: 14, fill: '#ec4899' },
];

export const FLASHCARDS_LIST: Flashcard[] = [
  {
    id: 'fc-1',
    hindiWord: 'आम',
    tribalWord: 'ᱩᱞ',
    phonetic: 'Ul',
    englishMeaning: 'Mango',
    category: 'Fruits',
    iconName: 'Apple',
    sampleSentenceHindi: 'मीठा आम खाओ।',
    sampleSentenceTribal: 'ᱦᱮᱲᱮᱢ ᱩᱞ ᱡᱚᱢ ᱢᱮ᱾ (Herdem ul jom me.)'
  },
  {
    id: 'fc-2',
    hindiWord: 'पानी',
    tribalWord: 'ᱫᱟᱜ',
    phonetic: 'Daah',
    englishMeaning: 'Water',
    category: 'Nature',
    iconName: 'Droplets',
    sampleSentenceHindi: 'मुझे स्वच्छ पानी पीना है।',
    sampleSentenceTribal: 'ᱤᱧ ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱧᱩ ᱥᱟᱱᱟᱹᱧ ᱠᱟᱱᱟ᱾ (Iñ sapha daah ñu sanañ kana.)'
  },
  {
    id: 'fc-3',
    hindiWord: 'घर',
    tribalWord: 'ᱚᱲᱟᱜ',
    phonetic: 'Orak',
    englishMeaning: 'Home / House',
    category: 'Everyday',
    iconName: 'Home',
    sampleSentenceHindi: 'हमारा घर सुंदर है।',
    sampleSentenceTribal: 'ᱟᱞᱮᱭᱟᱜ ᱚᱲᱟᱜ ᱫᱚ ᱢᱚᱡᱽ ᱜᱮᱭᱟ᱾ (Aleyag orak do moj geya.)'
  },
  {
    id: 'fc-4',
    hindiWord: 'पेड़',
    tribalWord: 'ᱫᱟᱨᱮ',
    phonetic: 'Dare',
    englishMeaning: 'Tree',
    category: 'Nature',
    iconName: 'Trees',
    sampleSentenceHindi: 'पेड़ हमें छाया और फल देते हैं।',
    sampleSentenceTribal: 'ᱫᱟᱨᱮ ᱫᱚ ᱩᱢᱩᱞ ᱟᱨ ᱡᱚ ᱮᱢᱚᱜᱼᱟ᱾ (Dare do umul ar jo emog-a.)'
  },
  {
    id: 'fc-5',
    hindiWord: 'सूरज',
    tribalWord: 'ᱵᱮᱲᱟ / ᱥᱤᱧ',
    phonetic: 'Beda / Siñ',
    englishMeaning: 'Sun',
    category: 'Nature',
    iconName: 'Sun',
    sampleSentenceHindi: 'सूरज पूरब से निकलता है।',
    sampleSentenceTribal: 'ᱥᱤᱧ ᱵᱮᱲᱟ ᱫᱚ ᱯᱩᱨᱩᱵᱽ ᱥᱮᱫ ᱛᱮ ᱨᱟᱠᱟᱵᱚᱜᱼᱟ᱾ (Siñ beda do purub sed te rakabog-a.)'
  },
  {
    id: 'fc-6',
    hindiWord: 'किताब',
    tribalWord: 'ᱯᱩᱛᱷᱤ',
    phonetic: 'Puthi',
    englishMeaning: 'Book',
    category: 'Classroom Objects',
    iconName: 'BookOpen',
    sampleSentenceHindi: 'यह एक अच्छी किताब है।',
    sampleSentenceTribal: 'ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫ ᱵᱷᱟᱹᱜᱤ ᱯᱩᱛᱷᱤ ᱠᱟᱱᱟ᱾ (Nowa do mid bhagi puthi kana.)'
  },
  {
    id: 'fc-7',
    hindiWord: 'हाथी',
    tribalWord: 'ᱦᱟᱹᱛᱤ',
    phonetic: 'Hati',
    englishMeaning: 'Elephant',
    category: 'Animals',
    iconName: 'PawPrint',
    sampleSentenceHindi: 'हाथी बहुत बड़ा जानवर है।',
    sampleSentenceTribal: 'ᱦᱟᱹᱛᱤ ᱫᱚ ᱟᱹᱰᱤ ᱢᱟᱨᱟᱝ ᱡᱤᱵᱽ ᱠᱟᱱᱟᱭ᱾ (Hati do adi marang jib kanay.)'
  },
  {
    id: 'fc-8',
    hindiWord: 'लाल',
    tribalWord: 'ᱟᱨᱟᱜ',
    phonetic: 'Arag',
    englishMeaning: 'Red',
    category: 'Colors',
    iconName: 'Palette',
    sampleSentenceHindi: 'लाल रंग का फूल खिला है।',
    sampleSentenceTribal: 'ᱟᱨᱟᱜ ᱨᱚᱝ ᱨᱮᱱᱟᱜ ᱵᱟᱦᱟ ᱯᱷᱩᱴᱟᱹᱣ ᱟᱠᱟᱱᱟ᱾ (Arag rong renag baha phutaw akana.)'
  }
];

export const LESSONS_LIST: Lesson[] = [
  {
    id: 'les-1',
    title: 'Counting 1 to 10 in Nature',
    hindiTitle: '1 से 10 तक गिनती: प्रकृति के साथ',
    targetLanguage: 'santhali',
    category: 'Counting',
    duration: '15 mins',
    activitiesCount: 4,
    description: 'Teach children foundational number concepts using stones, leaves, and tribal counting rhymes.',
    objectives: [
      'Recognize Hindi numbers 1 to 10 and map them to Santhali counting terms',
      'Pronounce tribal numbers correctly with mother-tongue audio reinforcement',
      'Solve matching interactive activities between numeral and word'
    ],
    hindiContent: 'आज हम 1 से 10 तक गिनती सीखेंगे। 1 (एक), 2 (दो), 3 (तीन), 4 (चार), 5 (पाँच), 6 (छह), 7 (सात), 8 (आठ), 9 (नौ), 10 (दस)। हमारे आसपास के पेड़ों और पक्षियों को गिनें।',
    translatedContent: {
      scriptText: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾ ᱑ (ᱢᱤᱫ), ᱒ (ᱵᱟᱨ), ᱓ (ᱯᱮ), ᱔ (ᱯᱩᱱ), ᱕ (ᱢᱚᱬᱮ), ᱖ (ᱛᱩᱨᱩᱭ), ᱗ (ᱮᱭᱟᱭ), ᱘ (ᱤᱨᱟᱹᱞ), ᱙ (ᱟᱨᱮ), ᱑᱐ (ᱜᱮᱞ)᱾ ᱟᱵᱚ ᱟᱰᱮ-ᱯᱟᱥᱮ ᱨᱮᱱᱟᱜ ᱫᱟᱨᱮ ᱟᱨ ᱪᱮᱬᱮ ᱠᱚ ᱞᱮᱠᱷᱟᱭ ᱯᱮ᱾',
      phoneticText: 'Teheñ abo 1 khon 10 dhabij lekha bon chedog-a: 1 (Mid), 2 (Bar), 3 (Pe), 4 (Pun), 5 (More), 6 (Turuy), 7 (Eyay), 8 (Iral), 9 (Are), 10 (Gel).',
      meaning: 'Today we will learn counting from 1 to 10 using familiar items from our village surroundings.'
    },
    audioDuration: '01:45',
    status: 'Ready',
    createdAt: 'Sep 06, 2026'
  },
  {
    id: 'les-2',
    title: 'Common Local Fruits & Trees',
    hindiTitle: 'हमारे फल और पेड़',
    targetLanguage: 'santhali',
    category: 'Fruits',
    duration: '18 mins',
    activitiesCount: 5,
    description: 'Learn names of fruits commonly found in Jharkhand and central Indian tribal forests.',
    objectives: [
      'Connect Hindi names of Mango, Guava, Mahua, Jamun to tribal vocabulary',
      'Strengthen oral pronunciation through audio repetition',
      'Complete bilingual picture identification worksheet'
    ],
    hindiContent: 'आम को संथाली में उल कहते हैं। महुआ हमारे जंगल का अनमोल फल और फूल है। जामुन को कुद कहते हैं।',
    translatedContent: {
      scriptText: 'ᱩᱞ ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱩᱞ ᱠᱚ ᱢᱮᱛᱟᱜᱼᱟ᱾ ᱢᱟᱹᱛᱠᱚᱢ ᱫᱚ ᱟᱵᱚ ᱵᱤᱨ ᱨᱮᱱᱟᱜ ᱟᱹᱰᱤ ᱫᱟᱢᱟᱱ ᱡᱚ ᱟᱨ ᱵᱟᱦᱟ ᱠᱟᱱᱟ᱾',
      phoneticText: 'Ul do Santhali te Ul ko metag-a. Matkom do abo bir renag adi daman jo ar baha kana. Kud (Jamun) ho hedem geya.',
      meaning: 'Mango is called Ul in Santhali. Mahua is our forest prized flower and fruit.'
    },
    audioDuration: '02:10',
    status: 'Ready',
    createdAt: 'Sep 04, 2026'
  },
  {
    id: 'les-3',
    title: 'Forest & Domestic Animals',
    hindiTitle: 'जंगली और पालतू पशु',
    targetLanguage: 'ho',
    category: 'Animals',
    duration: '20 mins',
    activitiesCount: 4,
    description: 'Identifying animals in the Ho language with phonetics and sounds.',
    objectives: [
      'Learn Ho names for cow, goat, dog, elephant, and tiger',
      'Understand animal habitats through bilingual story snippets',
      'Listen to audio flashcards for phonetic nuance'
    ],
    hindiContent: 'गाय को हो भाषा में उरीः कहते हैं। बकरी को मेरोम और कुत्ते को सेता कहते हैं।',
    translatedContent: {
      scriptText: 'ᱜᱟᱹᱭ ᱫᱚ ᱦᱳ ᱡᱟᱜᱟᱨ ᱛᱮ ᱩᱨᱤᱜ ᱠᱚ ᱢᱮᱛᱟᱜᱼᱟ᱾ ᱢᱮᱨᱚᱢ ᱟᱨ ᱥᱮᱛᱟ ᱟᱞᱮ ᱚᱲᱟᱜ ᱨᱮ ᱢᱮᱱᱟᱜ ᱠᱚᱣᱟ᱾',
      phoneticText: 'Gai do Ho jagar te Urih ko metaga. Merom (Goat) ar Seta (Dog) ale orak re menakoa.',
      meaning: 'Cow is called Urih in Ho language. Goat is Merom and Dog is Seta.'
    },
    audioDuration: '02:30',
    status: 'Ready',
    createdAt: 'Sep 02, 2026'
  },
  {
    id: 'les-4',
    title: 'Colors Around Our Village',
    hindiTitle: 'हमारे गाँव के रंग',
    targetLanguage: 'mundari',
    category: 'Colors',
    duration: '12 mins',
    activitiesCount: 3,
    description: 'Exploring colors of soil, sky, vegetation, and traditional attire in Mundari.',
    objectives: [
      'Name colors: Red (Arag), Green (Hariyar/Sakam-leka), White (Pundi), Black (Hende)',
      'Associate village everyday objects with their color names',
      'Sing the colors rhyme with audio assistance'
    ],
    hindiContent: 'लाल रंग को अराग कहते हैं। सफेद को पुण्डी और काले को हेन्दे कहते हैं।',
    translatedContent: {
      scriptText: 'ᱟᱨᱟᱜ ᱨᱚᱝ ᱫᱚ ᱵᱟᱦᱟ ᱞᱮᱠᱟ᱾ ᱯᱩᱱᱰᱤ ᱫᱚ ᱫᱟᱜ ᱟᱨ ᱵᱤᱞᱟᱹᱭ ᱞᱮᱠᱟ, ᱦᱮᱱᱫᱮ ᱫᱚ ᱢᱮᱰᱦᱮᱫ ᱞᱮᱠᱟ᱾',
      phoneticText: 'Arag rong do baha leka. Pundi do daah ar bilay leka, hende do koyla leka.',
      meaning: 'Red is like flowers, white like clean water, black like coal in Mundari.'
    },
    audioDuration: '01:50',
    status: 'Ready',
    createdAt: 'Aug 29, 2026'
  },
  {
    id: 'les-5',
    title: 'Everyday Classroom Objects',
    hindiTitle: 'कक्षा के उपयोगी सामान',
    targetLanguage: 'santhali',
    category: 'Classroom Objects',
    duration: '15 mins',
    activitiesCount: 4,
    description: 'Helping first-generation learners name their slate, chalk, pencil, and satchel.',
    objectives: [
      'Overcome hesitation in asking for classroom stationery',
      'Bridge Hindi instructional phrases with Santhali home terminology',
      'Encourage classroom speaking participation'
    ],
    hindiContent: 'यह मेरी किताब है। कृपया मुझे अपनी पेंसिल दें। हम सब मिलकर पढ़ेंगे।',
    translatedContent: {
      scriptText: 'ᱱᱚᱣᱟ ᱫᱚ ᱤᱧᱟᱜ ᱯᱩᱛᱷᱤ ᱠᱟᱱᱟ᱾ ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱯᱮᱱᱥᱤᱞ ᱤᱧ ᱮᱢᱟᱹᱧ ᱢᱮ᱾ ᱟᱵᱚ ᱡᱚᱛᱚ ᱦᱚᱲ ᱢᱤᱫ ᱛᱮ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱜᱼᱟ᱾',
      phoneticText: 'Nowa do iñag puthi kana. Daya kate amag pencil iñ emañ me. Abo joto hor mid te bon padhawg-a.',
      meaning: 'This is my book. Please lend me your pencil. We will all read together.'
    },
    audioDuration: '02:15',
    status: 'Ready',
    createdAt: 'Aug 25, 2026'
  }
];

export const WORKSHEETS_LIST: Worksheet[] = [
  {
    id: 'ws-1',
    title: 'Numbers 1–10 Bilingual Match & Count',
    topic: 'Counting',
    targetLanguage: 'santhali',
    grade: 'Grade 1 & 2',
    estimatedTime: '20 mins',
    createdDate: 'Sep 05, 2026',
    vocabulary: [
      { hindi: 'एक (1)', tribal: 'ᱢᱤᱫ', phonetic: 'Mid', iconName: 'Hash' },
      { hindi: 'दो (2)', tribal: 'ᱵᱟᱨ', phonetic: 'Bar', iconName: 'Hash' },
      { hindi: 'तीन (3)', tribal: 'ᱯᱮ', phonetic: 'Pe', iconName: 'Hash' },
      { hindi: 'चार (4)', tribal: 'ᱯᱩᱱ', phonetic: 'Pun', iconName: 'Hash' },
      { hindi: 'पाँच (5)', tribal: 'ᱢᱚᱬᱮ', phonetic: 'More', iconName: 'Hash' },
    ],
    matchingPairs: [
      { id: 'm-1', hindi: 'एक (1)', tribal: 'ᱢᱤᱫ (Mid)', phonetic: 'Mid', iconName: 'CheckCircle2' },
      { id: 'm-2', hindi: 'दो (2)', tribal: 'ᱵᱟᱨ (Bar)', phonetic: 'Bar', iconName: 'CheckCircle2' },
      { id: 'm-3', hindi: 'तीन (3)', tribal: 'ᱯᱮ (Pe)', phonetic: 'Pe', iconName: 'CheckCircle2' },
      { id: 'm-4', hindi: 'चार (4)', tribal: 'ᱯᱩᱱ (Pun)', phonetic: 'Pun', iconName: 'CheckCircle2' },
      { id: 'm-5', hindi: 'पाँच (5)', tribal: 'ᱢᱚᱬᱮ (More)', phonetic: 'More', iconName: 'CheckCircle2' },
    ],
    fillInBlanks: [
      {
        id: 'fib-1',
        promptHindi: 'संथाली में "एक" को क्या कहते हैं?',
        sentenceWithBlank: 'एक पेड़ = ______ ᱫᱟᱨᱮ (dare)',
        correctAnswer: 'ᱢᱤᱫ (Mid)',
        options: ['ᱢᱤᱫ (Mid)', 'ᱵᱟᱨ (Bar)', 'ᱯᱮ (Pe)']
      },
      {
        id: 'fib-2',
        promptHindi: 'दो पक्षी = _____ ᱪᱮᱬᱮ (cheñe)',
        sentenceWithBlank: 'दो पक्षी = ______ ᱪᱮᱬᱮ (cheñe)',
        correctAnswer: 'ᱵᱟᱨ (Bar)',
        options: ['ᱵᱟᱨ (Bar)', 'ᱯᱩᱱ (Pun)', 'ᱢᱚᱬᱮ (More)']
      }
    ]
  },
  {
    id: 'ws-2',
    title: 'Forest Fruits & Plants Vocabulary Explorer',
    topic: 'Fruits',
    targetLanguage: 'santhali',
    grade: 'Grade 1–3',
    estimatedTime: '25 mins',
    createdDate: 'Sep 03, 2026',
    vocabulary: [
      { hindi: 'आम', tribal: 'ᱩᱞ', phonetic: 'Ul', iconName: 'Apple' },
      { hindi: 'पानी', tribal: 'ᱫᱟᱜ', phonetic: 'Daah', iconName: 'Droplets' },
      { hindi: 'पेड़', tribal: 'ᱫᱟᱨᱮ', phonetic: 'Dare', iconName: 'Trees' },
      { hindi: 'फूल', tribal: 'ᱵᱟᱦᱟ', phonetic: 'Baha', iconName: 'Flower2' }
    ],
    matchingPairs: [
      { id: 'm-f1', hindi: 'आम (Mango)', tribal: 'ᱩᱞ (Ul)', phonetic: 'Ul', iconName: 'Apple' },
      { id: 'm-f2', hindi: 'पेड़ (Tree)', tribal: 'ᱫᱟᱨᱮ (Dare)', phonetic: 'Dare', iconName: 'Trees' },
      { id: 'm-f3', hindi: 'फूल (Flower)', tribal: 'ᱵᱟᱦᱟ (Baha)', phonetic: 'Baha', iconName: 'Flower2' },
      { id: 'm-f4', hindi: 'पानी (Water)', tribal: 'ᱫᱟᱜ (Daah)', phonetic: 'Daah', iconName: 'Droplets' }
    ],
    fillInBlanks: [
      {
        id: 'fib-f1',
        promptHindi: 'आम बहुत मीठा फल है। संथाली शब्द चुनें:',
        sentenceWithBlank: 'মিঠা आम = ᱦᱮᱲᱮᱢ _____ (jo)',
        correctAnswer: 'ᱩᱞ (Ul)',
        options: ['ᱩᱞ (Ul)', 'ᱫᱟᱨᱮ (Dare)', 'ᱵᱟᱦᱟ (Baha)']
      }
    ]
  },
  {
    id: 'ws-3',
    title: 'Animals in the Village & Forest (Ho)',
    topic: 'Animals',
    targetLanguage: 'ho',
    grade: 'Grade 2 & 3',
    estimatedTime: '20 mins',
    createdDate: 'Aug 30, 2026',
    vocabulary: [
      { hindi: 'गाय', tribal: 'ᱩᱨᱤᱜ', phonetic: 'Urih', iconName: 'PawPrint' },
      { hindi: 'बकरी', tribal: 'ᱢᱮᱨᱚᱢ', phonetic: 'Merom', iconName: 'PawPrint' },
      { hindi: 'कुत्ता', tribal: 'ᱥᱮᱛᱟ', phonetic: 'Seta', iconName: 'PawPrint' },
      { hindi: 'हाथी', tribal: 'ᱦᱟᱹᱛᱤ', phonetic: 'Hati', iconName: 'PawPrint' }
    ],
    matchingPairs: [
      { id: 'm-a1', hindi: 'गाय (Cow)', tribal: 'ᱩᱨᱤᱜ (Urih)', phonetic: 'Urih', iconName: 'PawPrint' },
      { id: 'm-a2', hindi: 'बकरी (Goat)', tribal: 'ᱢᱮᱨᱚᱢ (Merom)', phonetic: 'Merom', iconName: 'PawPrint' },
      { id: 'm-a3', hindi: 'कुत्ता (Dog)', tribal: 'ᱥᱮᱛᱟ (Seta)', phonetic: 'Seta', iconName: 'PawPrint' }
    ],
    fillInBlanks: [
      {
        id: 'fib-a1',
        promptHindi: 'हो भाषा में बकरी को क्या कहते हैं?',
        sentenceWithBlank: 'बकरी घास चर रही है = _____ ghas jomtana',
        correctAnswer: 'ᱢᱮᱨᱚᱢ (Merom)',
        options: ['ᱢᱮᱨᱚᱢ (Merom)', 'ᱥᱮᱛᱟ (Seta)', 'ᱩᱨᱤᱜ (Urih)']
      }
    ]
  },
  {
    id: 'ws-4',
    title: 'Classroom Objects & Tools',
    topic: 'Classroom Objects',
    targetLanguage: 'santhali',
    grade: 'Grade 1–4',
    estimatedTime: '15 mins',
    createdDate: 'Aug 27, 2026',
    vocabulary: [
      { hindi: 'किताब', tribal: 'ᱯᱩᱛᱷᱤ', phonetic: 'Puthi', iconName: 'BookOpen' },
      { hindi: 'घर', tribal: 'ᱚᱲᱟᱜ', phonetic: 'Orak', iconName: 'Home' },
      { hindi: 'सूरज', tribal: 'ᱥᱤᱧ ᱵᱮᱲᱟ', phonetic: 'Siñ Beda', iconName: 'Sun' }
    ],
    matchingPairs: [
      { id: 'm-c1', hindi: 'किताब (Book)', tribal: 'ᱯᱩᱛᱷᱤ (Puthi)', phonetic: 'Puthi', iconName: 'BookOpen' },
      { id: 'm-c2', hindi: 'घर (House)', tribal: 'ᱚᱲᱟᱜ (Orak)', phonetic: 'Orak', iconName: 'Home' }
    ],
    fillInBlanks: [
      {
        id: 'fib-c1',
        promptHindi: 'संथाली में किताब का सही शब्द:',
        sentenceWithBlank: 'मेरी किताब = ᱤᱧᱟᱜ _____ (iñag ____)',
        correctAnswer: 'ᱯᱩᱛᱷᱤ (Puthi)',
        options: ['ᱯᱩᱛᱷᱤ (Puthi)', 'ᱚᱲᱟᱜ (Orak)', 'ᱫᱟᱨᱮ (Dare)']
      }
    ]
  }
];

export const VALIDATION_ITEMS: ValidationItem[] = [
  {
    id: 'val-1',
    hindiSource: 'आज हम 1 से 10 तक गिनती सीखेंगे।',
    aiTranslation: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾',
    phonetic: 'Teheñ abo 1 khon 10 dhabij lekha bon chedog-a.',
    targetLanguage: 'santhali',
    status: 'Pending Review',
    submittedDate: 'Today, 10:30 AM',
    confidenceScore: 94,
    notes: 'Common classroom counting introduction. Recommended for immediate verification by Ol Chiki certified teacher.'
  },
  {
    id: 'val-2',
    hindiSource: 'यह एक किताब है।',
    aiTranslation: 'ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫᱴᱟᱹᱝ ᱯᱩᱛᱷᱤ ᱠᱟᱱᱟ᱾',
    phonetic: 'Nowa do midtang puthi kana.',
    targetLanguage: 'santhali',
    status: 'Approved',
    submittedDate: 'Sep 07, 2026',
    reviewedBy: 'Sunita Bai (Teacher)',
    confidenceScore: 98,
    notes: 'Accurate Santhali syntax for identifying classroom objects.'
  },
  {
    id: 'val-3',
    hindiSource: 'पानी पीने के लिए गिलास लाओ।',
    aiTranslation: 'ᱫᱟᱜ ᱧᱩ ᱞᱟᱹᱜᱤᱫ ᱜᱤᱞᱟᱥ ᱟᱹᱜᱩᱭ ᱢᱮ᱾',
    phonetic: 'Daah ñu lagid glass aguy me.',
    targetLanguage: 'santhali',
    status: 'Pending Review',
    submittedDate: 'Sep 06, 2026',
    confidenceScore: 89,
    notes: 'Check whether local colloquial term for water vessel (bāti / kando) should be added alongside glass.'
  },
  {
    id: 'val-4',
    hindiSource: 'कृपया अपनी कॉपी खोलो।',
    aiTranslation: 'ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱠᱷᱟᱛᱟ ᱡᱷᱤᱡᱽ ᱢᱮ᱾',
    phonetic: 'Daya kate amag khata jhij me.',
    targetLanguage: 'ho',
    status: 'Needs Correction',
    submittedDate: 'Sep 05, 2026',
    confidenceScore: 78,
    reviewedBy: 'Ramesh Birua (Language Specialist)',
    notes: 'In Ho spoken classroom register, "Jhukaote khata ool me" or simpler verb form is preferred over direct literal translation of kripya.',
    suggestedCorrection: 'ᱟᱢᱟᱜ ᱠᱷᱟᱛᱟ ᱚᱰᱚᱠ ᱢᱮ (Amag khata odok me - Take out your notebook)'
  },
  {
    id: 'val-5',
    hindiSource: 'पेड़ हमें स्वच्छ हवा और फल देते हैं।',
    aiTranslation: 'ᱫᱟᱨᱮ ᱫᱚ ᱟᱵᱚ ᱥᱟᱯᱷᱟ ᱦᱚᱭ ᱟᱨ ᱡᱚ ᱠᱚ ᱮᱢᱟᱵᱚᱱᱟ᱾',
    phonetic: 'Dare do abo sapha hoy ar jo ko emabona.',
    targetLanguage: 'mundari',
    status: 'Pending Review',
    submittedDate: 'Sep 04, 2026',
    confidenceScore: 91,
    notes: 'Environmental science lesson snippet for primary students.'
  }
];

export const TRANSLATION_PRESETS: Record<string, Record<string, { script: string; phonetic: string; notes: string }>> = {
  'आज हम 1 से 10 तक गिनती सीखेंगे।': {
    santhali: {
      script: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾',
      phonetic: 'Teheñ abo 1 khon 10 dhabij lekha bon chedog-a.',
      notes: 'Demo translation — requires native-speaker validation.'
    },
    ho: {
      script: 'ᱛᱮᱥᱤᱝ ᱟᱞᱮ ᱑ ᱮᱛᱮ ᱑᱐ ᱡᱟᱠᱮᱫ ᱦᱤᱥᱟᱹᱵ ᱪᱮᱫᱮᱭᱟᱞᱮ᱾',
      phonetic: 'Tesing ale 1 ete 10 jaked hisab chedeyale.',
      notes: 'Demo translation — requires native-speaker validation.'
    },
    mundari: {
      script: 'ᱛᱤᱥᱤᱝ ᱟᱵᱩ ᱑ ᱟᱛᱮ ᱑᱐ ᱡᱟᱹᱠᱤᱫ ᱦᱤᱥᱟᱹᱵᱽ ᱵᱩ ᱤᱛᱩᱱᱟ᱾',
      phonetic: 'Tising abu 1 ate 10 jakid hisab bu ituna.',
      notes: 'Demo translation — requires native-speaker validation.'
    }
  },
  'यह एक किताब है।': {
    santhali: {
      script: 'ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫᱴᱟᱹᱝ ᱯᱩᱛᱷᱤ ᱠᱟᱱᱟ᱾',
      phonetic: 'Nowa do midtang puthi kana.',
      notes: 'Demo translation — requires native-speaker validation.'
    },
    ho: {
      script: 'ᱱᱮᱭᱟ ᱢᱤᱫᱴᱟᱹᱝ ᱯᱩᱛᱷᱤ ᱛᱟᱱᱟᱜ᱾',
      phonetic: 'Neya midtang puthi tanag.',
      notes: 'Demo translation — requires native-speaker validation.'
    },
    mundari: {
      script: 'ᱱᱮᱭᱟ ᱢᱤᱫ ᱯᱩᱛᱷᱤ ᱛᱟᱱᱟ᱾',
      phonetic: 'Neya mid puthi tana.',
      notes: 'Demo translation — requires native-speaker validation.'
    }
  }
};
