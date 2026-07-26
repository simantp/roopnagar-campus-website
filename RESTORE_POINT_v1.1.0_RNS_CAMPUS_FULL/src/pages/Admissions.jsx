import React, { useState } from 'react';
import { GraduationCap, CheckCircle, FileText, Send, HelpCircle } from 'lucide-react';
import { campusData } from '../data/campusData';

export default function Admissions({ onOpenAdmission }) {
  return (
    <div className="py-12 space-y-16">
      
      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container text-center max-w-3xl mx-auto space-y-4">
          <span className="badge badge-gold">Academic Year 2082 / 2083</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">Admissions Open</h1>
          <p className="text-slate-300 text-base">
            Enroll in Tribhuvan University's 4-Year Bachelor of Business Studies (BBS) at Roopnagar Nandaraj Sangraula Campus.
          </p>
          <div>
            <button onClick={onOpenAdmission} className="btn-primary text-base py-3 px-8">
              <GraduationCap size={20} /> Open Online Admission Form
            </button>
          </div>
        </div>
      </section>

      {/* Eligibility & Required Documents */}
      <section className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="glass-card p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center font-bold">
              <CheckCircle size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">BBS Eligibility Criteria</h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-amber-500 shrink-0 mt-1" />
              <span>Must have completed 10+2 or equivalent examination from NEB or recognized board.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-amber-500 shrink-0 mt-1" />
              <span>Minimum Grade 'D+' in all subjects of Grade 11 & 12 (or minimum 45% aggregate in old system).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-amber-500 shrink-0 mt-1" />
              <span>Must pass the Tribhuvan University (TU) Faculty of Management CMAT / Admission Entrance test.</span>
            </li>
          </ul>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center font-bold">
              <FileText size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Required Documents</h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <FileText size={16} className="text-amber-500 shrink-0 mt-1" />
              <span>SEE / SLC Marksheet, Character Certificate & Admit Card copy</span>
            </li>
            <li className="flex items-start gap-2">
              <FileText size={16} className="text-amber-500 shrink-0 mt-1" />
              <span>10+2 / Higher Secondary Transcript, Migration & Character Certificates</span>
            </li>
            <li className="flex items-start gap-2">
              <FileText size={16} className="text-amber-500 shrink-0 mt-1" />
              <span>Citizenship Copy & 3 Passport-size Photographs</span>
            </li>
          </ul>
        </div>

      </section>

    </div>
  );
}
