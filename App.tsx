
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Settings, 
  LogOut, 
  LogIn, 
  Plus, 
  Search, 
  FileText, 
  Youtube, 
  Layers,
  CheckCircle,
  GraduationCap,
  School
} from 'lucide-react';
import { QuestionSet, Resource, UserState } from './types';
import { MOCK_SETS, MOCK_RESOURCES } from './constants';
import StudentDashboard from './views/StudentDashboard';
import TeacherDashboard from './views/TeacherDashboard';
import QuizPlayer from './views/QuizPlayer';
import LoginView from './views/LoginView';

const App: React.FC = () => {
  const [sets, setSets] = useState<QuestionSet[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [user, setUser] = useState<UserState>({ isTeacher: false, username: null });

  useEffect(() => {
    const savedSets = localStorage.getItem('edu_sets');
    const savedRes = localStorage.getItem('edu_res');
    
    if (savedSets) setSets(JSON.parse(savedSets));
    else setSets(MOCK_SETS);

    if (savedRes) setResources(JSON.parse(savedRes));
    else setResources(MOCK_RESOURCES);

    const savedAuth = sessionStorage.getItem('edu_auth');
    if (savedAuth) setUser(JSON.parse(savedAuth));
  }, []);

  const saveToStorage = (newSets: QuestionSet[], newRes: Resource[]) => {
    localStorage.setItem('edu_sets', JSON.stringify(newSets));
    localStorage.setItem('edu_res', JSON.stringify(newRes));
  };

  const handleLogin = (username: string) => {
    const newState = { isTeacher: true, username };
    setUser(newState);
    sessionStorage.setItem('edu_auth', JSON.stringify(newState));
  };

  const handleLogout = () => {
    setUser({ isTeacher: false, username: null });
    sessionStorage.removeItem('edu_auth');
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 text-indigo-700">
              <div className="bg-indigo-700 p-2 rounded-lg">
                <School className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl leading-none tracking-tight text-slate-900">EduQuest</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">Ψηφιακό Φροντιστήριο</span>
              </div>
            </Link>

            <nav className="flex items-center space-x-6">
              {user.isTeacher ? (
                <>
                  <Link to="/teacher" className="text-slate-600 hover:text-indigo-600 font-bold text-sm flex items-center gap-1.5 transition">
                    <Settings className="w-4 h-4" /> Διαχείριση
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 text-rose-500 hover:text-rose-600 font-bold text-sm transition"
                  >
                    <LogOut className="w-4 h-4" /> <span>Έξοδος</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-800 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
                >
                  <LogIn className="w-4 h-4" /> Πύλη Καθηγητών
                </Link>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<StudentDashboard sets={sets} resources={resources} />} 
            />
            <Route 
              path="/login" 
              element={<LoginView onLogin={handleLogin} />} 
            />
            <Route 
              path="/teacher" 
              element={
                <TeacherDashboard 
                  sets={sets} 
                  resources={resources} 
                  setSets={(s) => { setSets(s); saveToStorage(s, resources); }}
                  setResources={(r) => { setResources(r); saveToStorage(sets, r); }}
                />
              } 
            />
            <Route 
              path="/quiz/:id" 
              element={<QuizPlayer sets={sets} />} 
            />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-200 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-4 text-slate-300">
               <School className="w-5 h-5" />
               <div className="h-px w-8 bg-slate-200"></div>
               <GraduationCap className="w-5 h-5" />
            </div>
            <p className="text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} EduQuest Φροντιστήριο. Όλα τα δικαιώματα διατηρούνται.
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
