import React, { useContext } from 'react'
import { DataContext } from '../Data/ApiData'

export default function Cards() {
  const { Data, loading, error } = useContext(DataContext);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-gray-600">Loading Stories...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <div className="text-red-600 text-lg mb-2">Error Loading Stories</div>
          <div className="text-gray-500">{error}</div>
        </div>
      </div>
    );
  }

  // Filter out items that don't have complete story data
  const validStories = Data?.filter(item => 
    item.Storyadvenure?.Storytitle && 
    item.Title && 
    item.Image?.length > 0
  ) || [];

  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {validStories.length > 0 ? (
        validStories.map((item, idx) => (
          <div key={item._id || idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              {item.Image && item.Image.length > 0 ? (
                <img 
                  src={`/api/placeholder/400/300`} 
                  alt={item.Title || "Science Fiction Story"} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-white text-xl font-bold">Sci-Fi</div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Main Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.Title || "No Title"}
              </h3>
              
              {/* Story Adventure Title */}
              <h4 className="text-lg font-semibold text-blue-600 mb-3">
                {item.Storyadvenure?.Storytitle || "No Story Title"}
              </h4>
              
              {/* Story Content Preview */}
              {item.Storyadvenure?.content && item.Storyadvenure.content.length > 0 && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.Storyadvenure.content[0]?.Paragraph?.[0] || "No description available"}
                </p>
              )}
              
              {/* Status Badge */}
              <div className="mb-3">
                <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                  item.Status === 'Published' ? 'bg-green-100 text-green-800' :
                  item.Status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  item.Status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                  item.Status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {item.Status || 'Unknown'}
                </span>
              </div>
              
              {/* Word Count Info */}
              {item.Wordexplore && item.Wordexplore.length > 0 && (
                <div className="mb-3">
                  <span className="text-xs text-gray-500">
                    📚 {item.Wordexplore.length} vocabulary words
                  </span>
                </div>
              )}
              
              {/* Brain Quest Info */}
              {item.Brainquest && item.Brainquest.length > 0 && (
                <div className="mb-3">
                  <span className="text-xs text-gray-500">
                    🧠 {item.Brainquest.length} quiz questions
                  </span>
                </div>
              )}
              
              {/* Story Content Count */}
              {item.Storyadvenure?.content && item.Storyadvenure.content.length > 0 && (
                <div className="mb-4">
                  <span className="text-xs text-gray-500">
                    📖 {item.Storyadvenure.content.length} story sections
                  </span>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                  Read Story
                </button>
                <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm">
                  Take Quiz
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🚀</div>
            <div className="text-xl text-gray-600">No Science Fiction Stories Available</div>
            <div className="text-gray-500 mt-2">Check back later for amazing sci-fi adventures!</div>
          </div>
        </div>
      )}
    </div>
  )
}