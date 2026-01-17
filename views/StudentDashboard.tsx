
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Play, ExternalLink, Filter, Sparkles, BookOpen } from 'lucide-react';
import { QuestionSet, Resource, ResourceType } from '../types';
import { CATEGORIES } from '../constants';

interface StudentDashboardProps {
  sets: QuestionSet[];
  resources: Resource[];
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ sets, resources }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Όλα');

  const filteredSets = sets.filter(s => 
    (activeCategory === 'Όλα' || s.category === activeCategory) &&
    (s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredResources = resources.filter(r => 
    (activeCategory === 'Όλα' || r.category === activeCategory) &&
    (r.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" /> 
          Προετοιμασία για την Επιτυχία
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Καλώς ήρθες στο <span className="text-indigo-700">Ψηφιακό Φροντιστήριο</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Εδώ θα βρεις όλα τα διαγωνίσματα προσομοίωσης και το απαραίτητο υλικό για την προετοιμασία των εξετάσεων σου.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-5 mb-12 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Αναζήτηση μαθημάτων ή υλικού..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0 mr-1" />
          {['Όλα', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-indigo-700 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content: Question Sets */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Play className="w-6 h-6 text-indigo-700 fill-indigo-700" />
              Διαγωνίσματα Προσομοίωσης
            </h2>
            <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded">
              {filteredSets.length} ΕΝΕΡΓΑ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filteredSets.map(set => (
              <div key={set.id} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-bl-full -mr-12 -mt-12 group-hover:bg-indigo-100 transition-colors"></div>
                
                <div className="relative">
                  <span className="inline-block bg-indigo-50 text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider mb-5">
                    {set.category}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-700 transition line-clamp-2 leading-tight">
                    {set.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">
                    {set.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-slate-400">
                       <BookOpen className="w-4 h-4" />
                       <span className="text-xs font-bold">{set.questions.length} Ερωτήσεις</span>
                    </div>
                    <Link 
                      to={`/quiz/${set.id}`}
                      className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all text-sm shadow-md"
                    >
                      Έναρξη <Play className="w-3.5 h-3.5 fill-current" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {filteredSets.length === 0 && (
              <div className="col-span-2 py-20 text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Search className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-400 font-bold italic text-sm">Δεν βρέθηκαν διαθέσιμα διαγωνίσματα.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Resources */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <FileText className="w-6 h-6 text-indigo-700" />
              Υλικό Μαθήματος
            </h2>
          </div>
          
          <div className="space-y-4">
            {filteredResources.map(res => (
              <a 
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors mr-4 flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate group-hover:text-indigo-700 transition">{res.title}</p>
                  <p className="text-slate-400 text-[10px] uppercase font-black mt-1 tracking-widest">{res.type} • {res.category}</p>
                </div>
                <div className="ml-2 w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition">
                   <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-700" />
                </div>
              </a>
            ))}
            {filteredResources.length === 0 && (
              <div className="py-12 text-center text-slate-300 text-sm font-bold italic">
                Δεν υπάρχει διαθέσιμο υλικό προς το παρόν.
              </div>
            )}
          </div>
          
          {/* Promo Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-3xl p-8 text-white shadow-xl">
             <h4 className="text-xl font-black mb-3">Χρειάζεσαι βοήθεια;</h4>
             <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Επικοινώνησε με τη γραμματεία του φροντιστηρίου για απορίες σχετικά με την ύλη.</p>
             <button className="w-full bg-white text-indigo-700 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition shadow-lg">
                Επικοινωνία
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
