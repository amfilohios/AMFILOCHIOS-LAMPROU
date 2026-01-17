
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, GraduationCap } from 'lucide-react';

interface LoginViewProps {
  onLogin: (username: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate teacher login - usually firebase.auth() here
    if (email && password.length >= 6) {
      onLogin(email.split('@')[0]);
      navigate('/teacher');
    } else {
      alert('Παρακαλώ εισάγετε έγκυρο email και κωδικό τουλάχιστον 6 χαρακτήρων.');
    }
  };

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Σύνδεση Καθηγητή</h2>
            <p className="text-slate-500 mb-8">Εισάγετε τα στοιχεία σας για πρόσβαση στη διαχείριση.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="email" 
                  required
                  placeholder="Email Διεύθυνση"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="password" 
                  required
                  placeholder="Κωδικός Πρόσβασης"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
              >
                Είσοδος <ChevronRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-50 text-sm text-slate-400">
              <p>Η πρόσβαση περιορίζεται μόνο σε πιστοποιημένους εκπαιδευτικούς.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
