import React from 'react';
import { Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCampus } from '../context/CampusContext';

export default function NoticeTicker({ onSelectNotice }) {
  const { notices } = useCampus();
  const noticesList = notices || [];
  const urgentNotices = noticesList.filter(n => n.urgent) || noticesList.slice(0, 3);

  return (
    <div className="bg-amber-500 text-slate-950 py-2.5 px-4 shadow-sm border-b border-amber-600 flex items-center overflow-hidden">
      <div className="container flex items-center gap-4">
        
        <div className="flex items-center gap-2 bg-slate-950 text-amber-400 text-xs font-bold uppercase px-3 py-1 rounded shadow shrink-0">
          <Bell size={14} className="animate-bounce" />
          <span>Notice Ticker</span>
        </div>

        <div className="overflow-hidden relative flex-1 whitespace-nowrap">
          <div className="inline-block animate-[ticker_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
            {urgentNotices.map((notice, idx) => (
              <span 
                key={notice.id} 
                onClick={() => onSelectNotice(notice)}
                className="inline-flex items-center gap-2 mx-6 text-sm font-semibold hover:underline"
              >
                <span className="bg-slate-950/20 text-slate-950 px-2 py-0.5 rounded text-xs font-bold">{notice.category}</span>
                {notice.title} ({notice.date})
                {idx < urgentNotices.length - 1 && <span className="mx-2 text-slate-950/40">•</span>}
              </span>
            ))}
          </div>
        </div>

        <Link 
          to="/notices" 
          className="text-xs font-bold text-slate-950 hover:text-slate-800 flex items-center gap-1 shrink-0 ml-2"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
