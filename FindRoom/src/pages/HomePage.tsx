import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, MapPin, Shield, Users, Sparkles, ChevronDown, Home } from 'lucide-react';

function HomePage() {
  const [location, setLocation] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do you verify PGs?",
      answer: "Our team personally visits each PG, takes real photos, and verifies all amenities. No catfishing here! 📸"
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes! If the PG doesn't match our listing, we offer a 100% booking fee refund. Your money is safe with us! 💰"
    },
    {
      question: "Can I schedule a visit before booking?",
      answer: "Absolutely! Schedule a visit through our app and we'll arrange it within 24 hours. Easy peasy! 🏃‍♂️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Navbar */}
      <div className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-purple-400" />
            <span className="font-bold text-xl">FindRoom</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Stop living like a 🐌 nomad!
          <br />
          Get your dream PG with{" "}
          <span className="inline-block border-4 border-dashed border-green-500 px-4 rounded-xl">
            FindRoom
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          No more endless searches, fake listings, or sketchy brokers. 
          Find verified PGs that actually exist (yes, really!) in Pune.
        </p>

        {/* Key Benefits */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="flex items-center gap-3 text-lg font-medium">
            <span className="bg-purple-900/50 text-purple-300 px-4 py-1 rounded-full">1</span>
            Pay only after you move in 🏠
          </div>
          <div className="flex items-center gap-3 text-lg font-medium">
            <span className="bg-purple-900/50 text-purple-300 px-4 py-1 rounded-full">2</span>
            5-minute booking process ⚡
          </div>
          <div className="flex items-center gap-3 text-lg font-medium">
            <span className="bg-purple-900/50 text-purple-300 px-4 py-1 rounded-full">3</span>
            100% verified listings 🎯
          </div>
        </div>
          
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex items-center bg-gray-900 border-2 border-green-500 rounded-2xl p-2 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)]">
            <MapPin className="h-6 w-6 text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Where in Pune do you want to live?"
              className="w-full px-4 py-3 focus:outline-none text-lg bg-transparent text-white placeholder-gray-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          <div className="bg-gray-900/50 p-6 rounded-2xl border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)] w-[280px]">
            <div className="text-4xl font-bold text-green-400">500+</div>
            <div className="text-gray-300">Verified PGs</div>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-2xl border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)] w-[280px]">
            <div className="text-4xl font-bold text-green-400">2000+</div>
            <div className="text-gray-300">Happy Students</div>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-2xl border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)] w-[280px] mt-4 md:mt-8">
            <div className="text-4xl font-bold text-green-400">15+</div>
            <div className="text-gray-300">Locations</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-6 rounded-2xl bg-gray-900/50 border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)]">
            <Building2 className="h-10 w-10 text-green-400 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Verified Listings</h3>
            <p className="text-gray-300">Every PG is personally verified by our team for quality assurance.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900/50 border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)]">
            <Shield className="h-10 w-10 text-green-400 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
            <p className="text-gray-300">All PGs follow our safety guidelines and security protocols.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900/50 border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)]">
            <Users className="h-10 w-10 text-green-400 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Student Community</h3>
            <p className="text-gray-300">Join a vibrant community of students in your PG.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-2 border-green-500 rounded-xl overflow-hidden bg-gray-900/50">
                <button
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                  <ChevronDown className={`h-5 w-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-800/50 border-t-2 border-green-500">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-900/50 p-12 rounded-3xl border-2 border-green-500 shadow-[8px_8px_0px_0px_rgba(34,197,94,0.5)]">
          <div className="inline-block p-2 px-4 bg-purple-900/50 rounded-full text-purple-300 font-medium mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Limited Time Offer
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 1000₹ off on your first booking! 🎁</h2>
          <p className="text-xl text-gray-300 mb-8">Sign up now and claim your discount voucher.</p>
          <button 
            onClick={() => navigate('/directory')}
            className="bg-green-500 text-white px-8 py-4 rounded-xl font-medium hover:bg-green-600 transition-colors text-lg"
          >
            Find Your PG Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;