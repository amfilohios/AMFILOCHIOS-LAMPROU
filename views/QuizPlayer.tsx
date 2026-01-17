
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react';
import { QuestionSet } from '../types';

interface QuizPlayerProps {
  sets: QuestionSet[];
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ sets }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const set = sets.find(s => s.id === id);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!set) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-slate-500 mb-4">Το τεστ δεν βρέθηκε.</p>
        <button onClick={() => navigate('/')} className="text-indigo-600 font-bold underline">Επιστροφή</button>
      </div>
    );
  }

  const currentQuestion = set.questions[currentIdx];
  const progress = ((currentIdx + 1) / set.questions.length) * 100;

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (idx === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < set.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 text-center p-12">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8 text-indigo-600">
            <Award className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-2">Συγχαρητήρια!</h2>
          <p className="text-slate-500 text-lg mb-8">Ολοκλήρωσες το τεστ: {set.title}</p>
          
          <div className="flex justify-center items-center gap-12 mb-12">
            <div>
              <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Βαθμολογία</p>
              <p className="text-4xl font-bold text-indigo-600">{score} / {set.questions.length}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Ποσοστό</p>
              <p className="text-4xl font-bold text-indigo-600">
                {Math.round((score / set.questions.length) * 100)}%
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={resetQuiz}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              <RotateCcw className="w-5 h-5" /> Προσπάθεια Ξανά
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition"
            >
              <ArrowLeft className="w-5 h-5" /> Αρχική Σελίδα
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-8 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Επιστροφή στην Αρχική
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="p-8 sm:p-12">
          <div className="flex justify-between items-center mb-8">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Ερώτηση {currentIdx + 1} από {set.questions.length}
            </span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
              {set.category}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10 leading-snug">
            {currentQuestion.text}
          </h3>

          <div className="grid grid-cols-1 gap-4 mb-10">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correctAnswer;
              const isSelected = idx === selectedAnswer;
              
              let styles = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50";
              if (isAnswered) {
                if (isCorrect) styles = "bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20";
                else if (isSelected) styles = "bg-rose-50 border-rose-500 text-rose-700 ring-2 ring-rose-500/20";
                else styles = "opacity-50 border-slate-100";
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(idx)}
                  className={`group relative flex items-center p-6 border-2 rounded-2xl transition-all duration-200 text-left font-semibold ${styles}`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${
                    isAnswered && isCorrect ? 'bg-emerald-500 border-emerald-500 text-white' :
                    isAnswered && isSelected ? 'bg-rose-500 border-rose-500 text-white' :
                    'border-slate-200 group-hover:border-indigo-400'
                  }`}>
                    {isAnswered && isCorrect ? <CheckCircle2 className="w-5 h-5" /> : 
                     isAnswered && isSelected ? <XCircle className="w-5 h-5" /> : 
                     String.fromCharCode(65 + idx)}
                  </div>
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className={`p-6 rounded-2xl mb-10 border transition-all animate-in slide-in-from-bottom-2 ${
              selectedAnswer === currentQuestion.correctAnswer 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
              : 'bg-indigo-50 border-indigo-100 text-indigo-800'
            }`}>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  {selectedAnswer === currentQuestion.correctAnswer ? '🎯' : '💡'}
                </div>
                <div>
                  <p className="font-bold mb-1">
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Σωστή Απάντηση!' : 'Πληροφορία'}
                  </p>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {currentQuestion.explanation || 'Εξαιρετική προσπάθεια! Συνέχισε έτσι.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-bold transition shadow-lg ${
                isAnswered 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 cursor-pointer' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {currentIdx < set.questions.length - 1 ? 'Επόμενη Ερώτηση' : 'Τέλος Τεστ'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPlayer;
