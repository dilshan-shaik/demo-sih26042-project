export type LanguageCode = 'hindi' | 'santhali' | 'ho' | 'mundari';

export interface Language {
  id: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
  region: string;
  sampleSentence: string;
  sampleTranslation: string;
}

export type LessonCategory = 
  | 'Counting'
  | 'Fruits'
  | 'Animals'
  | 'Colors'
  | 'Classroom Objects';

export interface Lesson {
  id: string;
  title: string;
  hindiTitle: string;
  targetLanguage: LanguageCode;
  category: LessonCategory;
  duration: string;
  activitiesCount: number;
  description: string;
  objectives: string[];
  hindiContent: string;
  translatedContent: {
    scriptText: string;
    phoneticText: string;
    meaning: string;
  };
  audioDuration: string;
  status: 'Ready' | 'In Review' | 'Draft';
  createdAt: string;
}

export interface MatchingPair {
  id: string;
  hindi: string;
  tribal: string;
  phonetic: string;
  iconName: string;
}

export interface FillInTheBlank {
  id: string;
  promptHindi: string;
  sentenceWithBlank: string;
  correctAnswer: string;
  options: string[];
}

export interface WorksheetVocabulary {
  hindi: string;
  tribal: string;
  phonetic: string;
  iconName: string;
}

export interface Worksheet {
  id: string;
  title: string;
  topic: LessonCategory;
  targetLanguage: LanguageCode;
  grade: string;
  vocabulary: WorksheetVocabulary[];
  matchingPairs: MatchingPair[];
  fillInBlanks: FillInTheBlank[];
  createdDate: string;
  estimatedTime: string;
}

export interface Flashcard {
  id: string;
  hindiWord: string;
  tribalWord: string;
  phonetic: string;
  englishMeaning: string;
  category: string;
  iconName: string;
  sampleSentenceHindi: string;
  sampleSentenceTribal: string;
}

export type ValidationStatus = 'Pending Review' | 'Approved' | 'Needs Correction';

export interface ValidationItem {
  id: string;
  hindiSource: string;
  aiTranslation: string;
  phonetic: string;
  targetLanguage: LanguageCode;
  status: ValidationStatus;
  submittedDate: string;
  reviewedBy?: string;
  confidenceScore: number;
  notes?: string;
  suggestedCorrection?: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
  category: 'worksheet' | 'lesson' | 'flashcard' | 'validation';
}

export interface TeacherProfile {
  name: string;
  email?: string;
  role: string;
  school: string;
  district: string;
  state: string;
  avatar: string;
  studentsCount: number;
  languagesTaught: string[];
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
