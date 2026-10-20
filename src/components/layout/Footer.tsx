import React from 'react';
import { Shield, Heart, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-md text-indigo-100 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-600 rounded-xl">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Billy</span>
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed">
              AI-Powered Cyberbullying Prevention & Support Platform. Creating safer, more empathetic digital spaces.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-white transition">Chat with Billy</Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-white transition">Community Leaders</Link>
              </li>
              <li>
                <Link to="/statistics" className="hover:text-white transition">Incident Analytics</Link>
              </li>
            </ul>
          </div>

          {/* Emergency Lifelines */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <LifeBuoy className="w-4 h-4 text-rose-400" />
              <span>Immediate Emergency & Crisis Contacts</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="font-semibold text-white">Crisis Text Line</div>
                <div className="text-indigo-200">Text HOME to 741741</div>
                <div className="text-[11px] text-indigo-300">Free, 24/7 crisis counseling</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="font-semibold text-white">Suicide & Crisis Lifeline</div>
                <div className="text-indigo-200">Dial 988 (USA/Canada)</div>
                <div className="text-[11px] text-indigo-300">Confidential emergency help</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="font-semibold text-white">Cyber Crime Portal (India)</div>
                <div className="text-indigo-200">Dial 1930 / cybercrime.gov.in</div>
                <div className="text-[11px] text-indigo-300">National reporting authority</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="font-semibold text-white">Immediate Danger</div>
                <div className="text-rose-300 font-bold">Call 911 / 112</div>
                <div className="text-[11px] text-indigo-300">Local emergency services</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-indigo-300 gap-4">
          <p>© {new Date().getFullYear()} Billy Cyberbullying Prevention Initiative. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Built with care for digital safety & mental health</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 ml-1 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
