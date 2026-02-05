'use client';

import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { Quiz } from '@/components/Quiz';

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) {
    return <Quiz />;
  }

  return <LandingPage onStartQuiz={() => setShowQuiz(true)} />;
}
