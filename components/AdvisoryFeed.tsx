import React from 'react';
import { Newspaper, ChevronRight } from 'lucide-react';

export const AdvisoryFeed: React.FC = () => {
  const advisories = [
    {
      id: 1,
      title: "PM Kisan 17th Installment Released",
      summary: "Check your bank account for the latest transfer of ₹2000. Ensure e-KYC is completed at your nearest CSC.",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600",
      source: "Govt of India",
      date: "2 Days ago"
    },
    {
      id: 2,
      title: "Yellow Rust Warning for Wheat",
      summary: "High humidity may trigger Yellow Rust in North India. Monitor leaves for yellow stripes and spray Propiconazole if needed.",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=600",
      source: "ICAR Advisory",
      date: "Today"
    },
     {
      id: 3,
      title: "50% Subsidy on Agri-Drones",
      summary: "Applications open for drone subsidy under SMAM scheme. Ideal for pesticide spraying in large fields.",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600",
      source: "Agri Dept",
      date: "1 Week ago"
    },
    {
      id: 4,
      title: "Cotton Pink Bollworm Alert",
      summary: "Install pheromone traps immediately to monitor pest population. Economic threshold level crossed in some districts.",
      image: "https://images.unsplash.com/photo-1595246698188-466d6d7c71ba?auto=format&fit=crop&q=80&w=600",
      source: "KVK Alert",
      date: "Yesterday"
    }
  ];

  return (
    <div className="space-y-3 animate-fade-in">
       <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Newspaper size={20} className="text-green-700"/> Expert Advisories
          </h3>
          <button className="text-xs text-green-600 font-semibold flex items-center hover:text-green-800 transition-colors">
            View All <ChevronRight size={14} />
          </button>
       </div>
       
       <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x scrollbar-hide -mx-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {advisories.map(item => (
            <div key={item.id} className="min-w-[260px] max-w-[260px] bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden snap-center flex-shrink-0 hover:shadow-lg transition-shadow cursor-pointer">
               <div className="h-32 overflow-hidden relative group">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2">
                     <span className="text-[10px] font-bold text-green-800 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-green-100">
                       {item.source}
                     </span>
                  </div>
               </div>
               <div className="p-3">
                  <div className="flex justify-between items-start mb-1">
                     <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight h-10">{item.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2 h-8">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                    <span className="text-[10px] text-gray-400 font-medium">{item.date}</span>
                    <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-0.5">
                       Read <ChevronRight size={10} />
                    </span>
                  </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};
