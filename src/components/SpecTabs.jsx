import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Zap, Shield, Ruler } from 'lucide-react'
import { MOTORCYCLE_SPECS } from '../data/motorcycleData.js'

export default function SpecTabs() {
  const [activeTab, setActiveTab] = useState('engine')

  const tabs = [
    { id: 'engine', label: 'Engine & Power', icon: Cpu },
    { id: 'chassis', label: 'Chassis & Brakes', icon: Shield },
    { id: 'electronics', label: 'Electronics', icon: Zap },
    { id: 'dimensions', label: 'Dimensions', icon: Ruler },
  ]

  const currentSpecs = MOTORCYCLE_SPECS[activeTab] || []

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-white/10 bg-graphite/60 p-6 backdrop-blur-xl shadow-xl">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wider transition-all uppercase ${
                isActive
                  ? 'bg-accent text-black shadow-md shadow-accent/20'
                  : 'bg-white/5 text-silver hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {currentSpecs.map((spec, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 transition-colors"
              >
                <span className="text-xs font-medium text-silver">
                  {spec.label}
                </span>
                <span className="text-sm font-bold text-ivory">
                  {spec.value}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}