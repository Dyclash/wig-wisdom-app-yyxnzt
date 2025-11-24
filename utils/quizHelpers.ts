
import { Question } from '@/types/quiz';

export const shuffleQuestions = (questions: Question[]): Question[] => {
  console.log('Shuffling questions...');
  const shuffled = [...questions];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  console.log('Questions shuffled successfully');
  return shuffled;
};

export const shuffleAnswers = (options: string[], correctAnswerIndex: number): { options: string[]; correctAnswerIndex: number } => {
  const indices = options.map((_, index) => index);
  
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  const shuffledOptions = indices.map(index => options[index]);
  const newCorrectIndex = indices.indexOf(correctAnswerIndex);
  
  return {
    options: shuffledOptions,
    correctAnswerIndex: newCorrectIndex
  };
};
