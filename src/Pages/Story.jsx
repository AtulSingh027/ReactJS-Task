import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const TABS = [
  { key: 'story', label: '📖 Story' },
  { key: 'vocab', label: '📚 Vocabulary' },
  { key: 'quiz', label: '🧠 Quiz' },
]

export default function Story() {
  const { id } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('story')

  useEffect(() => {
    async function fetchStory() {
      try {
        setLoading(true)
        const res = await axios.get(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`)
        setStory(res.data)
        setError(null)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchStory()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading Story...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-xl mb-2">Error Loading Story</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <Link to="/cards" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition">
            Back to Stories
          </Link>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white">No Story Found</div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500'
      case 'In Progress': return 'bg-yellow-500'
      case 'New': return 'bg-blue-500'
      default: return 'bg-zinc-800'
    }
  }

  const renderTabContent = () => {
    if (activeTab === 'story') {
      return (
        <div className="space-y-6">
          {story.Storyadvenure?.content && story.Storyadvenure.content.length > 0 ? (
            story.Storyadvenure.content.map((section, idx) => (
              <div key={section._id || idx} className="bg-zinc-800 bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                {section.Storyimage && section.Storyimage.length > 0 && (
                  <img
                    src={`https://ik.imagekit.io/dev24/${section.Storyimage[0]}`}
                    alt="Story Section"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                {section.Paragraph && section.Paragraph.map((para, pidx) => (
                  <p key={pidx} className="text-gray-400 mb-3 text-base leading-relaxed">{para}</p>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">No story content available.</div>
          )}
        </div>
      )
    }

    if (activeTab === 'vocab') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {story.Wordexplore && story.Wordexplore.length > 0 ? (
            story.Wordexplore.map((word, idx) => (
              <div key={word._id || idx} className="bg-zinc-800 bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <h3 className="text-lg font-bold text-white mr-3">{word.Storytitle}</h3>
                  {word.Storyimage && word.Storyimage.length > 0 && (
                    <img
                      src={`https://ik.imagekit.io/dev24/${word.Storyimage[0]}`}
                      alt={word.Storytitle}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  )}
                </div>
                <p className="text-gray-400 mb-2">{word.Storyttext}</p>
                <div className="space-y-1 text-sm">
                  <div className="text-gray-200">Synonyms: {word.Synonyms}</div>
                  <div className="text-gray-200">Antonyms: {word.Antonyms}</div>
                  <div className="text-gray-200">Noun: {word.Noun}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-900 py-8 col-span-2">No vocabulary words available.</div>
          )}
        </div>
      )
    }

    if (activeTab === 'quiz') {
      return (
        <div className="space-y-4">
          {story.Brainquest && story.Brainquest.length > 0 ? (
            story.Brainquest.map((q, idx) => (
              <div key={q._id || idx} className="bg-zinc-800 bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="text-blue-700 font-semibold mb-3">{idx + 1}. {q.Question}</h3>
                <div className="space-y-1 mb-3">
                  {q.Option.map((opt, oidx) => (
                    <div key={oidx} className="text-gray-200 pl-4 border-l-2 border-blue-400">
                      {String.fromCharCode(65 + oidx)}. {opt}
                    </div>
                  ))}
                </div>
                <div className="text-green-400 font-medium">✓ Answer: {q.Answer}</div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">No quiz questions available.</div>
          )}
        </div>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={`https://ik.imagekit.io/dev24/${story?.Image?.[0]}`}
          alt={story.Title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        {/* Back Button */}
        <Link 
          to="/cards" 
          className="absolute top-4 left-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium transition backdrop-blur-sm"
        >
          ← Back
        </Link>

        {/* Title and Status */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{story.Title}</h1>
              <p className="text-blue-200 text-lg">{story.Storyadvenure?.Storytitle}</p>
            </div>
            <span className={`${getStatusColor(story.Status)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
              {story.Status || 'Unknown'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-2 py-6">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-zinc-800 bg-opacity-20 text-blue-500 hover:bg-opacity-30 backdrop-blur-sm'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        {renderTabContent()}
      </div>
    </div>
  )
}