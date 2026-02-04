'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResultsPage } from '@/components/ResultsPage';
import { QuizResult } from '@/types/quiz';
import { getResult } from '@/lib/utils';

export default function BlueprintPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;

    if (!id) {
      router.push('/');
      return;
    }

    // Try to get result from localStorage
    const storedResult = getResult(id) as QuizResult | null;

    if (storedResult) {
      setResult(storedResult);
      setLoading(false);
    } else {
      // No result found, redirect to quiz
      router.push('/');
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4" />
          <p className="text-slate-600">Loading your blueprint...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            Blueprint not found
          </h1>
          <p className="text-slate-600 mb-6">
            This blueprint may have expired or doesn&apos;t exist.
          </p>
          <a
            href="/"
            className="inline-block py-3 px-6 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200"
          >
            Take the Quiz
          </a>
        </div>
      </div>
    );
  }

  return <ResultsPage result={result} />;
}
