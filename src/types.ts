export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  category: 'Homework' | 'Exam' | 'Project' | 'Other';
};

export type ClassEvent = {
  id: string;
  title: string;
  dayOfWeek: number; // 0-6
  startTime: string; // "HH:mm"
  endTime: string;
  room: string;
  color: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
};

export type Grade = {
  id: string;
  course: string;
  grade: string;
  credits: number;
};

export type Flashcard = {
  id: string;
  front: string;
  back: string;
};

export type FlashcardDeck = {
  id: string;
  title: string;
  cards: Flashcard[];
};

export type AppState = {
  tasks: Task[];
  classes: ClassEvent[];
  notes: Note[];
  grades: Grade[];
  flashcardDecks: FlashcardDeck[];
};
