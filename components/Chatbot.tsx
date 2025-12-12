import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  type: 'user' | 'bot'
  text: string
  timestamp: Date
  isQuestion?: boolean
  field?: 'name' | 'phone' | 'email' | 'boothType'
}

type QuickReply = {
  text: string
  action: string
}

type InteractiveContent = {
  type: 'calendar' | 'pricing' | 'features' | null
}

type UserInfo = {
  name: string
  phone: string
  email: string
}

interface PackageOption {
  name: string
  price: string
  regularPrice?: string
  description?: string
  features: string[]
}

interface PackageType {
  title: string
  options: PackageOption[]
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      text: 'Hi! 👋 I\'m RoboAssist. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [interactiveContent, setInteractiveContent] = useState<InteractiveContent>({ type: null })
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', phone: '', email: '' })
  const [collectingInfo, setCollectingInfo] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<'name' | 'phone' | 'email' | null>(null)
  const [showingPricing, setShowingPricing] = useState(false)

  const quickReplies: QuickReply[] = [
    { text: '📅 Check Availability', action: 'availability' },
    { text: '💰 View Pricing for Robo Booth', action: 'pricing_robo' },
    { text: '🎥 View Pricing for 360° Booth', action: 'pricing_360' },
    { text: '📸 Features', action: 'features' },
    { text: '📞 Contact Sales', action: 'contact' }
  ]

  const pricingOptionsRobo = [
    {
      name: 'Essential',
      price: '$899',
      features: ['3 Hours', 'Unlimited Photos', 'Basic Props', 'Digital Gallery']
    },
    {
      name: 'Premium',
      price: '$1,299',
      features: ['5 Hours', 'Unlimited Photos', 'Premium Props', '360° Booth']
    },
    {
      name: 'Ultimate',
      price: '$1,799',
      features: ['7 Hours', 'Unlimited Photos', 'Luxury Props', 'Video Messages']
    }
  ]

  const pricingOptions360 = [
    {
      name: '360° Essential',
      price: '$250',
      regularPrice: '$450',
      description: 'Experience the viral 360° booth trend',
      features: [
        '2 Hours of Service',
        'Unlimited Videos',
        'Slow Motion Effects',
        'Digital Gallery',
        'Social Media Sharing',
        'On-site Attendant',
        'Save $200 Today!'
      ]
    },
    {
      name: '360° Premium',
      price: '$350',
      regularPrice: '$599',
      description: 'The complete 360° experience',
      features: [
        '3 Hours of Service',
        'Unlimited Videos',
        'Slow Motion Effects',
        'Custom Music Selection',
        'LED Platform',
        'Digital Gallery',
        'Social Media Sharing',
        'Custom Branding',
        'Save $249 Today!'
      ]
    }
  ]

  const features = [
    {
      icon: '🤖',
      title: 'AI Interaction',
      description: 'Voice commands and gesture recognition'
    },
    {
      icon: '📸',
      title: 'Pro Quality',
      description: 'Studio-grade camera system'
    },
    {
      icon: '🎯',
      title: 'Smart Poses',
      description: 'AI-powered pose guidance'
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage = { type: 'user' as const, text: reply.text, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    
    switch (reply.action) {
      case 'availability':
        setInteractiveContent({ type: 'calendar' })
        break
      case 'pricing_robo':
        setInteractiveContent({ type: 'pricing' })
        break
      case 'pricing_360':
        setInteractiveContent({ type: 'pricing' })
        break
      case 'features':
        setInteractiveContent({ type: 'features' })
        break
      default:
        simulateBotResponse(reply.action)
    }
  }

  const simulateBotResponse = (action: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const response = getBotResponse(action)
      setMessages(prev => [...prev, { type: 'bot', text: response, timestamp: new Date() }])
    }, 1500)
  }

  const handleDateSelect = (date: string) => {
    setMessages(prev => [...prev, {
      type: 'user',
      text: `I'm interested in booking for ${date}`,
      timestamp: new Date()
    }])
    
    setInteractiveContent({ type: null })
    simulateBotResponse('date_selected')
  }

  const renderInteractiveContent = () => {
    switch (interactiveContent.type) {
      case 'calendar':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-4 bg-white rounded-lg shadow-lg p-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Event Date</h3>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleDateSelect(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-4">
              * Select your preferred event date
            </p>
          </motion.div>
        )

      case 'pricing':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-4 space-y-2"
          >
            {pricingOptionsRobo.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-blue-600">{option.name}</h4>
                  <span className="text-lg font-bold">{option.price}</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setMessages(prev => [...prev, {
                      type: 'user',
                      text: `I'm interested in the ${option.name} package`,
                      timestamp: new Date()
                    }])
                    setInteractiveContent({ type: null })
                    simulateBotResponse('package_selected')
                  }}
                  className="mt-3 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium"
                >
                  Select Package
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )

      case 'features':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-4 grid grid-cols-1 gap-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3"
              >
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h4 className="font-bold text-blue-600">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )

      default:
        return null
    }
  }

  const getBotResponse = (action: string): string => {
    switch (action) {
      case 'date_selected':
        return "Great choice! This date is available. Would you like to see our packages to complete your booking? 📅"
      case 'availability':
        return 'I can help you check our availability! What date are you looking at for your event? 📅'
      case 'pricing_robo':
        return `Essential\n$899\n\n✓ 3 Hours\n✓ Unlimited Photos\n✓ Basic Props\n✓ Digital Gallery\n\nSelect Package\n\n─────────────\n\nPremium\n$1,299\n\n✓ 5 Hours\n✓ Unlimited Photos\n✓ Premium Props\n✓ Digital Gallery\n✓ Custom Branding\n✓ Video Messages\n\nSelect Package`
      case 'pricing_360':
        return `360° Essential\n$250 $450 /event\n\nExperience the viral 360° booth trend\n\n✓ 2 Hours of Service\n✓ Unlimited Videos\n✓ Slow Motion Effects\n✓ Digital Gallery\n✓ Social Media Sharing\n✓ On-site Attendant\n✓ Save $200 Today!\n\nSelect Package\n\n─────────────\n\n360° Premium\n$350 $599 /event\n\nThe complete 360° experience\n\n✓ 3 Hours of Service\n✓ Unlimited Videos\n✓ Slow Motion Effects\n✓ Custom Music Selection\n✓ LED Platform\n✓ Digital Gallery\n✓ Social Media Sharing\n✓ Custom Branding\n✓ Save $249 Today!\n\nSelect Package`
      case 'features':
        return 'Robo Booth comes with AI-powered interactions, instant photo sharing, custom branding, and much more! Want to see all features? 🤖'
      case 'contact':
        return 'I\'ll connect you with our sales team! Please provide your name and contact number, and they\'ll reach out within 24 hours. 📞'
      default:
        return 'Thanks for your message! Our team will get back to you shortly. Meanwhile, feel free to explore our packages!'
    }
  }

  const handleUserResponse = (text: string) => {
    // Check if user said "yes" to viewing packages
    if (text.toLowerCase() === 'yes' && messages[messages.length - 1].text.includes("Would you like to see our packages")) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Which service are you interested in? The 360° Booth or the Robo Booth?',
        timestamp: new Date(),
        isQuestion: true,
        field: 'boothType'
      }])
      return true
    }
    
    // Handle booth type selection
    if (messages[messages.length - 1].field === 'boothType') {
      const is360 = text.toLowerCase().includes('360')
      const isRobo = text.toLowerCase().includes('robo')
      
      if (is360 || isRobo) {
        const packages: PackageType = is360 ? {
          title: "360° Booth Packages",
          options: pricingOptions360
        } : {
          title: "Robo Booth Packages",
          options: pricingOptionsRobo
        }

        const packageText = packages.options.map(pkg => (
          `${pkg.name}\n` +
          `$${pkg.price}${pkg.regularPrice ? ` $${pkg.regularPrice}` : ''}\n` +
          `${pkg.description}\n\n` +
          pkg.features.map(f => `✓ ${f}`).join('\n') +
          '\n\nSelect Package'
        )).join('\n\n─────────────\n\n')

        setMessages(prev => [...prev, {
          type: 'bot',
          text: packageText,
          timestamp: new Date(),
          isQuestion: true
        }])
        return true
      }
    }
    
    return false
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { type: 'user' as const, text: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    
    // Check if it's a response to a specific question
    if (!handleUserResponse(input)) {
      simulateBotResponse('default')
    }
  }

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = { type: 'user', text, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])

    // Handle pricing inquiry
    if (showingPricing) {
      if (text.toLowerCase().includes('360') || text.toLowerCase().includes('robo')) {
        const boothType = text.toLowerCase().includes('360') ? '360' : 'robo'
        const pricingCards = boothType === '360' ? 
          `Here are our 360° Booth packages:\n
          1. Essential Package - $250 (Regular $450)
          • 2 Hours of Service
          • Unlimited Videos
          • Slow Motion Effects
          • Digital Gallery
          • Social Media Sharing
          • On-site Attendant\n
          2. Premium Package - $350 (Regular $599)
          • 3 Hours of Service
          • Custom Music Selection
          • LED Platform
          • Custom Branding
          • And more!` :
          `Here are our Robo Booth packages:\n
          [Insert Robo Booth pricing cards here]`
        
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: pricingCards,
          timestamp: new Date()
        }])
        setShowingPricing(false)
        return
      }
    }

    // Handle user info collection
    if (collectingInfo) {
      if (currentQuestion === 'name') {
        setUserInfo(prev => ({ ...prev, name: text }))
        setCurrentQuestion('email')
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Great! What\'s your email address?',
          timestamp: new Date(),
          isQuestion: true,
          field: 'email'
        }])
        return
      }
      if (currentQuestion === 'email') {
        setUserInfo(prev => ({ ...prev, email: text }))
        setCurrentQuestion('phone')
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Almost done! What\'s your phone number?',
          timestamp: new Date(),
          isQuestion: true,
          field: 'phone'
        }])
        return
      }
      if (currentQuestion === 'phone') {
        setUserInfo(prev => ({ ...prev, phone: text }))
        setCollectingInfo(false)
        setCurrentQuestion(null)
        
        // Send email with user info
        const emailBody = `
          New Chat Inquiry:
          Name: ${userInfo.name}
          Email: ${text}
          Phone: ${userInfo.phone}
          Chat History:
          ${messages.map(m => `${m.type}: ${m.text}`).join('\n')}
        `
        
        // Open default email client
        window.location.href = `mailto:info@robobooth.ca?subject=New Chat Inquiry&body=${encodeURIComponent(emailBody)}`

        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Thanks! I\'ve sent your information to our team. They\'ll be in touch soon!',
          timestamp: new Date()
        }])
        return
      }
    }

    // Handle initial messages
    if (text.toLowerCase().includes('pricing') || text.toLowerCase().includes('cost')) {
      setShowingPricing(true)
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Which service are you interested in? The 360° Booth or the Robo Booth?',
        timestamp: new Date(),
        isQuestion: true,
        field: 'boothType'
      }])
      return
    }

    // Start collecting info if not already doing so
    if (!collectingInfo) {
      setCollectingInfo(true)
      setCurrentQuestion('name')
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'I\'d be happy to help! First, could you tell me your name?',
        timestamp: new Date(),
        isQuestion: true,
        field: 'name'
      }])
      return
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <svg 
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span className="hidden md:block">Chat with RoboAssist</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold">RoboAssist</h3>
                  <span className="text-xs text-white/80">Always here to help</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {message.text}
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {renderInteractiveContent()}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 text-gray-400"
                >
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="p-2 bg-white border-t border-gray-100">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickReplies.map((reply, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickReply(reply)}
                    className="whitespace-nowrap px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {reply.text}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Send
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 