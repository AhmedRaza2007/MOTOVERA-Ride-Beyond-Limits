import React from 'react'
import { Check } from 'lucide-react'
import { PAINTS, WHEELS, SEATS, ACCENTS } from '../data/motorcycleData.js'

export default function ColorSelector({ config, setConfig }) {
  const sections = [
    { key: 'paint', title: 'PAINT FINISH', options: PAINTS },
    { key: 'wheels', title: 'WHEEL FINISH', options: WHEELS },
    { key: 'seat', title: 'SEAT MATERIAL', options: SEATS },
    { key: 'accent', title: 'ACCENT HIGHLIGHTS', options: ACCENTS },
  ]

  const handleSelect = (category, option) => {
    setConfig((prev) => ({
      ...prev,
      [category]: option,
    }))
  }

  return (
    <div className="space-y-6">
      {sections.map(({ key, title, options }) => (
        <div key={key} className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-silver uppercase">
              {title}
            </span>
            <span className="text-xs font-medium text-ivory">
              {config[key]?.name || 'Default'}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {options?.map((option) => {
              const isSelected = config[key]?.id === option.id || config[key]?.name === option.name
              const isLightColor = ['#FFFFFF', '#F5F5F5', '#E5E5E5', '#C0C0C0'].includes(option.hex.toUpperCase())

              return (
                <button
                  key={option.id || option.name}
                  onClick={() => handleSelect(key, option)}
                  className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-accent ring-offset-2 ring-offset-graphite scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: option.hex }}
                  title={`${option.name} ${option.price ? `(+$${option.price})` : ''}`}
                >
                  {isSelected && (
                    <Check
                      size={16}
                      className={isLightColor ? 'text-black' : 'text-white'}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}