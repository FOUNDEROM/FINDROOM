import React from 'react';
import { Phone, MapPin, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data - in a real app, this would come from an API
const pgListings = [
  {
    id: 1,
    name: "Sunshine PG",
    address: "123 IT Park Road, Hinjewadi Phase 1, Pune",
    contact: "+91 98765 43210",
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ]
  },
  {
    id: 2,
    name: "Green Valley PG",
    address: "456 Magarpatta City, Hadapsar, Pune",
    contact: "+91 98765 43211",
    photos: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ]
  },
  {
    id: 3,
    name: "Tech Hub PG",
    address: "789 Viman Nagar, Pune",
    contact: "+91 98765 43212",
    photos: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ]
  }
];

function DirectoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Navbar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-purple-400" />
            <span className="font-bold text-xl">FindRoom</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Available PGs in Pune</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {pgListings.map((pg) => (
            <div key={pg.id} className="bg-gray-900/50 rounded-2xl border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)] overflow-hidden">
              {/* Image Carousel */}
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <div className="flex transition-transform duration-500 h-full">
                  {pg.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`${pg.name} - Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ))}
                </div>
              </div>

              {/* PG Details */}
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-2xl font-bold mb-4">{pg.name}</h2>
                
                <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <p>{pg.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-400" />
                    <p>{pg.contact}</p>
                  </div>
                </div>

                <button className="w-full mt-4 sm:mt-6 bg-green-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-600 transition-colors text-sm sm:text-base">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DirectoryPage;