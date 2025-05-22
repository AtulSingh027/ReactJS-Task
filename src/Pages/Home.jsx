import React, { useContext, useState } from 'react'
import { DataContext } from '../Data/ApiData'
import { Link } from 'react-router-dom'

export default function Home() {
  const { Data, loading, error } = useContext(DataContext);
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter out items that don't have complete story data
  const validStories = Data?.filter(item => 
    item.Storyadvenure?.Storytitle && 
    item.Title && 
    item.Image?.length > 0
  ) || [];

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <div className="text-white text-xl">Loading Stories...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <div className="text-white text-xl mb-2">Error Loading Stories</div>
          <div className="text-gray-300">{error}</div>
        </div>
      </div>
    );
  }

  // Filter stories based on status
  const getFilteredStories = () => {
    if (activeFilter === 'All') return validStories;
    if (activeFilter === 'New') return validStories.filter(item => item.Status === 'Draft');
    if (activeFilter === 'In Progress') return validStories.filter(item => item.Status === 'In Progress');
    if (activeFilter === 'Completed') return validStories.filter(item => item.Status === 'Published' || item.Status === 'Completed');
    return validStories;
  };

  const filteredStories = getFilteredStories();
     
    //    i Use Ai For Some *Designing* part only
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-400 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-yellow-400 rounded-full blur-lg"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-white font-bold text-xl">BrainyLingo</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white hover:text-blue-300 transition-colors">Home</a>
          <a href="#" className="text-white hover:text-blue-300 transition-colors">Leaderboard</a>
          <a href="#" className="text-white hover:text-blue-300 transition-colors">Daily Quiz</a>
          <a href="#" className="text-white hover:text-blue-300 transition-colors">Games</a>
        </div>
        
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors">
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Science Fiction Stories
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['All', 'New', 'In Progress', 'Completed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? filter === 'New' ? 'bg-purple-600 text-white shadow-lg'
                  : filter === 'In Progress' ? 'bg-yellow-500 text-black shadow-lg'
                  : filter === 'Completed' ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-blue-600 text-white shadow-lg'
                  : 'bg-zinc-800 bg-opacity-20 text-blue-500 hover:bg-opacity-30'
              }`}
            >
              {filter === 'All' && '🌟 All'}
              {filter === 'New' && '🆕 New'}
              {filter === 'In Progress' && '⏳ In Progress'}
              {filter === 'Completed' && '✅ Completed'}
            </button>
          ))}
          <button className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
            Clear All
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredStories.length > 0 ? (
            filteredStories.map((item, idx) => (
              <div key={item._id || idx} className="bg-gradient-to-br from-indigo-800 to-purple-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-500 border-opacity-30">
                {/* Image */}
                <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center relative">
                  <img 
                    src={`https://ik.imagekit.io/dev24/${item?.Image[0]}`}
                    alt={item.Title || "Science Fiction Story"} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
                    {item.Storyadvenure?.Storytitle || item.Title || "No Title"}
                  </h3>
                  
                  {/* Status Button */}
                  <div className="mt-4 flex gap-2">
                    <button className={`flex-1 py-2 px-4 rounded-full font-semibold text-sm transition-colors ${
                      item.Status === 'Published' || item.Status === 'Completed' ? 'bg-green-500 text-white hover:bg-green-600' :
                      item.Status === 'In Progress' ? 'bg-yellow-500 text-black hover:bg-yellow-600' :
                      item.Status === 'Draft' ? 'bg-purple-500 text-white hover:bg-purple-600' :
                      'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                      {item.Status === 'Published' || item.Status === 'Completed' ? 'Completed' :
                       item.Status === 'In Progress' ? 'In Progress' :
                       item.Status === 'Draft' ? 'New' : 'New'}
                    </button>
                    {/* Read More Button */}
                    <Link to={`/story/${item._id}`} className="flex-1">
                      <button className="w-full py-2 px-4 rounded-full font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-white text-6xl mb-4">🚀</div>
                <div className="text-xl text-white">No Stories Found</div>
                <div className="text-gray-300 mt-2">Try again or check back later!</div>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredStories.length > 8 && (
          <div className="flex justify-between items-center mt-8 max-w-7xl mx-auto">
            <button className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
              <span>←</span>
              <span>Previous</span>
            </button>
            <button className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
              <span>Next</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}