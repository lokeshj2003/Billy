import React from 'react';
import { PhoneCall, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmergencyBanner: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16 relative z-20">
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-indigo-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-400/20 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span>Experiencing cyberbullying or online harassment right now?</span>
            </h3>
            <p className="text-indigo-200 text-sm mt-1 max-w-2xl leading-relaxed">
              You are not alone. Billy is available 24/7 with confidential guidance, or you can connect with crisis counselors immediately.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-shrink-0">
          <Link
            to="/chat"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold shadow-lg transition"
          >
            <span>Talk to Billy</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:988"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-indigo-100 rounded-xl text-sm font-medium border border-white/10 transition"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Crisis Line (988)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
