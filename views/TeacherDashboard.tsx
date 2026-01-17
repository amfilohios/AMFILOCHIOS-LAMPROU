
import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Upload, 
  FileText, 
  Link as LinkIcon, 
  PlusCircle, 
  X,
  Save,
  Youtube,
  GraduationCap
} from 'lucide-react';
import { QuestionSet, Resource, ResourceType, Question } from '../types';
import { CATEGORIES } from '../constants';

interface TeacherDashboardProps {
  sets: QuestionSet[];
  resources: Resource[];
  setSets: (sets: QuestionSet[]) => void;
  setResources: (res: Resource[]) => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ sets, resources, setSets, setResources }) => {
  const [activeTab, setActiveTab] = useState<'sets' | 'resources'>('sets');
  const [showSetModal, setShowSetModal] = useState(false);
  const [showResModal, setShowResModal] = useState(false);

  // New Set Form State
  const [newSet, setNewSet] = useState<Partial<QuestionSet>>({
    title: '',
    description: '',
    category: CATEGORIES[0],
    questions: []
  });

  // New Resource Form State
  const [newRes, setNewRes] = useState<Partial<Resource>>({
    title: '',
    type: ResourceType.PDF,
    url: '',
    category: CATEGORIES[0]
  });

  const handleDeleteSet = (id: string) => {
    if (confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το διαγώνισμα;')) {
      setSets(sets.filter(s => s.id !== id));
    }
  };

  const handleDeleteResource = (id: string) => {
    if (confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το υλικό;')) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const handleSaveSet = () => {
    if (!newSet.title || newSet.questions?.length === 0) {
      alert('Παρακαλώ συμπληρώστε τον τίτλο και τουλάχιστον μία ερώτηση.');
      return;
    }
    const finalSet: QuestionSet = {
      ...newSet as QuestionSet,
      id: `set-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setSets([finalSet, ...sets]);
    setShowSetModal(false);
    setNewSet({ title: '', description: '', category: CATEGORIES[0], questions: [] });
  };

  const handleSaveResource = () => {
    if (!newRes.title || !newRes.url) {
      alert('Συμπληρώστε τίτλο και σύνδεσμο.');
      return;
    }
    const finalRes: Resource = {
      ...newRes as Resource,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setResources([finalRes, ...resources]);
    setShowResModal(false);
    setNewRes({ title: '', type: ResourceType.PDF, url: '', category: CATEGORIES[0] });
  };

  const addQuestionToNewSet = () => {
    const q: Question = {
      id: `q-${Date.now()}`,
      text: 'Νέα Ερώτηση;',
      options: ['Επιλογή 1', 'Επιλογή 2', 'Επιλογή 3', 'Επιλογή 4'],
      correctAnswer: 0,
      explanation: ''
    };
    setNewSet({ ...newSet, questions: [...(newSet.questions || []), q] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Διαχείριση Φροντιστηρίου</h1>
          <p className="text-slate-500 font-medium mt-1">Κέντρο ελέγχου περιεχομένου και αξιολόγησης μαθητών.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowSetModal(true)}
            className="flex items-center gap-2 bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-100"
          >
            <PlusCircle className="w-5 h-5" /> Νέο Διαγώνισμα
          </button>
          <button 
            onClick={() => setShowResModal(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg"
          >
            <Upload className="w-5 h-5" /> Ανέβασμα Υλικού
          </button>
        </div>
      </div>

      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200 mb-8 max-w-fit">
        <button 
          onClick={() => setActiveTab('sets')}
          className={`px-8 py-3 text-sm font-black rounded-xl transition-all ${activeTab === 'sets' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Διαγωνίσματα ({sets.length})
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`px-8 py-3 text-sm font-black rounded-xl transition-all ${activeTab === 'resources' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Εκπαιδευτικό Υλικό ({resources.length})
        </button>
      </div>

      {activeTab === 'sets' ? (
        <div className="grid grid-cols-1 gap-4">
          {sets.map(set => (
            <div key={set.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:shadow-lg transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-black text-xl">
                  {set.questions.length}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg group-hover:text-indigo-700 transition">{set.title}</h3>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">
                    <span className="bg-slate-50 px-2 py-0.5 rounded text-indigo-600">{set.category}</span>
                    <span>•</span>
                    <span>{new Date(set.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition shadow-sm bg-white border border-slate-50">
                  <Edit3 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDeleteSet(set.id)}
                  className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition shadow-sm bg-white border border-slate-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {sets.length === 0 && (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
               <GraduationCap className="w-12 h-12 text-slate-200 mx-auto mb-4" />
               <p className="text-slate-400 font-bold">Δεν υπάρχουν ακόμα διαγωνίσματα.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(res => (
            <div key={res.id} className="bg-white p-8 rounded-3xl border border-slate-100 group hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-3xl -mr-8 -mt-8"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <button 
                  onClick={() => handleDeleteResource(res.id)}
                  className="p-2 text-slate-300 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-black text-slate-900 mb-2 leading-tight">{res.title}</h3>
              <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest bg-indigo-50 inline-block px-2 py-1 rounded">{res.type}</p>
              
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">{res.category}</span>
                <a href={res.url} target="_blank" className="text-xs font-black text-indigo-700 flex items-center gap-1 hover:underline">
                  ΛΗΨΗ <LinkIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Set Modal */}
      {showSetModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300 border border-white/20">
            <div className="p-10 border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-lg flex justify-between items-center z-20">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Σχεδίαση Διαγωνίσματος</h2>
                <p className="text-sm text-slate-500 font-medium">Προσθέστε ερωτήσεις και επιλογές για τους μαθητές.</p>
              </div>
              <button onClick={() => setShowSetModal(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors"><X /></button>
            </div>
            <div className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Τίτλος Διαγωνίσματος</label>
                  <input 
                    type="text" 
                    className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-bold" 
                    placeholder="Π.χ. Προσομοίωση Α' Τετραμήνου"
                    value={newSet.title}
                    onChange={(e) => setNewSet({...newSet, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Μάθημα / Κατηγορία</label>
                  <select 
                    className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-bold appearance-none cursor-pointer"
                    value={newSet.category}
                    onChange={(e) => setNewSet({...newSet, category: e.target.value})}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Σύντομη Περιγραφή & Οδηγίες</label>
                <textarea 
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-bold" 
                  rows={3}
                  placeholder="Εξηγήστε στους μαθητές τι περιλαμβάνει το διαγώνισμα..."
                  value={newSet.description}
                  onChange={(e) => setNewSet({...newSet, description: e.target.value})}
                ></textarea>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center bg-indigo-50 p-6 rounded-3xl">
                  <div>
                    <h3 className="font-black text-indigo-900">Διαμόρφωση Ερωτήσεων</h3>
                    <p className="text-xs text-indigo-600 font-bold">{newSet.questions?.length || 0} ερωτήσεις προστέθηκαν</p>
                  </div>
                  <button 
                    onClick={addQuestionToNewSet}
                    className="bg-white text-indigo-700 font-black text-sm flex items-center gap-2 px-6 py-3 rounded-2xl hover:bg-indigo-100 transition-all shadow-sm"
                  >
                    <Plus className="w-5 h-5" /> Νέα Ερώτηση
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {newSet.questions?.map((q, qIdx) => (
                    <div key={q.id} className="p-8 bg-white rounded-[2rem] border border-slate-100 relative shadow-sm hover:border-indigo-200 transition-colors">
                      <button 
                        onClick={() => setNewSet({...newSet, questions: newSet.questions?.filter((_, idx) => idx !== qIdx)})}
                        className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="mb-6">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Ερώτηση {qIdx + 1}</label>
                        <input 
                          type="text" 
                          className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-black text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                          value={q.text}
                          onChange={(e) => {
                            const qs = [...(newSet.questions || [])];
                            qs[qIdx].text = e.target.value;
                            setNewSet({...newSet, questions: qs});
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex gap-3 items-center group">
                            <input 
                              type="radio" 
                              name={`correct-${q.id}`} 
                              className="w-5 h-5 accent-indigo-700"
                              checked={q.correctAnswer === optIdx}
                              onChange={() => {
                                const qs = [...(newSet.questions || [])];
                                qs[qIdx].correctAnswer = optIdx;
                                setNewSet({...newSet, questions: qs});
                              }}
                            />
                            <input 
                              type="text" 
                              className="flex-grow p-3 text-sm bg-slate-50 rounded-xl border border-slate-100 font-bold focus:bg-white outline-none"
                              placeholder={`Επιλογή ${optIdx + 1}`}
                              value={opt}
                              onChange={(e) => {
                                const qs = [...(newSet.questions || [])];
                                qs[qIdx].options[optIdx] = e.target.value;
                                setNewSet({...newSet, questions: qs});
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-8 border-t border-slate-50 gap-4">
                <button 
                  onClick={() => setShowSetModal(false)}
                  className="px-8 py-4 rounded-2xl font-black text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"
                >
                  Ακύρωση
                </button>
                <button 
                  onClick={handleSaveSet}
                  className="px-10 py-4 rounded-2xl font-black bg-indigo-700 text-white hover:bg-indigo-800 transition-all flex items-center gap-2 shadow-xl shadow-indigo-100"
                >
                  <Save className="w-5 h-5" /> Οριστικοποίηση Διαγωνίσματος
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {showResModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-900">Ανέβασμα Υλικού</h2>
              <button onClick={() => setShowResModal(false)} className="p-2 text-slate-400 hover:text-slate-900"><X /></button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Τίτλος Αρχείου / Σημειώσεων</label>
                <input 
                  type="text" 
                  className="w-full p-4 rounded-2xl border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="π.χ. Ασκήσεις Ορμής"
                  value={newRes.title}
                  onChange={(e) => setNewRes({...newRes, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Είδος</label>
                <select 
                  className="w-full p-4 rounded-2xl border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-indigo-600 appearance-none bg-slate-50"
                  value={newRes.type}
                  onChange={(e) => setNewRes({...newRes, type: e.target.value as ResourceType})}
                >
                  <option value={ResourceType.PDF}>PDF Έγγραφο (Σημειώσεις)</option>
                  <option value={ResourceType.IMAGE}>Εικόνα (Σχέδιο/Διάγραμμα)</option>
                  <option value={ResourceType.VIDEO}>Βίντεο-Μάθημα (URL)</option>
                  <option value={ResourceType.LINK}>Εξωτερικός Σύνδεσμος</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Σύνδεσμος</label>
                <input 
                  type="text" 
                  className="w-full p-4 rounded-2xl border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="https://..."
                  value={newRes.url}
                  onChange={(e) => setNewRes({...newRes, url: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Μάθημα</label>
                <select 
                  className="w-full p-4 rounded-2xl border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50"
                  value={newRes.category}
                  onChange={(e) => setNewRes({...newRes, category: e.target.value})}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="pt-4">
                <button 
                  onClick={handleSaveResource}
                  className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black hover:bg-slate-800 transition-all shadow-xl"
                >
                  Προσθήκη στο Υλικό
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
