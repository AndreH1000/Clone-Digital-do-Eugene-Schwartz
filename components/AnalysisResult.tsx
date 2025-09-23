'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Lightbulb, Target, Zap, Code, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface AnalysisData {
  nivelConsciencia: {
    nivel: number
    justificativa: string
    estagio_sofisticacao: number
  }
  estruturaLead: {
    framework: string
    explicacao: string
  }
  pontosMelhoria: Array<{
    problema: string
    porque_e_um_problema: string
    referencia_eugene: string
    correcao_eugene: string
    exemplo_reescrito: string
  }>
  novosAngulos: Array<{
    headline: string
    nivel_consciencia: string
    justificativa: string
    bullets_curiosidade: string[]
  }>
}

interface AnalysisResultProps {
  analysis: AnalysisData
  onClose: () => void
  showJsonView: boolean
  onToggleJsonView: (show: boolean) => void
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: "backOut"
    }
  }
}

export default function AnalysisResult({ analysis, onClose, showJsonView, onToggleJsonView }: AnalysisResultProps) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

  const toggleCardExpansion = (cardKey: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }))
  }

  const cards = [
    {
      key: 'nivel-consciencia',
      title: "Nível de Consciência",
      content: analysis.nivelConsciencia,
      icon: Brain,
      color: "text-neon-blue",
      bgColor: "bg-blue-500/10",
      borderColor: "border-neon-blue/50"
    },
    {
      key: 'estrutura-lead',
      title: "Estrutura da Lead",
      content: analysis.estruturaLead,
      icon: Target,
      color: "text-neon-cyan",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-neon-cyan/50"
    },
    {
      key: 'pontos-melhoria',
      title: "Análise & Otimizações",
      content: analysis.pontosMelhoria,
      icon: Lightbulb,
      color: "text-amber-400",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-amber-500/10",
      borderColor: "border-amber-400/50"
    },
    {
      key: 'novos-angulos',
      title: "Novos Ângulos",
      content: analysis.novosAngulos,
      icon: Zap,
      color: "text-neon-pink",
      bgColor: "bg-pink-500/10",
      borderColor: "border-neon-pink/50"
    }
  ]

  const renderNivelConsciencia = (data: AnalysisData['nivelConsciencia']) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-neon-blue">Nível {data.nivel}</div>
        <div className="text-sm text-gray-400">Sofisticação: {data.estagio_sofisticacao}</div>
      </div>
      <p className="text-sm leading-relaxed">{data.justificativa}</p>
    </div>
  )

  const renderEstruturaLead = (data: AnalysisData['estruturaLead']) => (
    <div className="space-y-4">
      <div className="font-semibold text-neon-cyan">{data.framework}</div>
      <p className="text-sm leading-relaxed">{data.explicacao}</p>
    </div>
  )

  const renderPontosMelhoria = (data: AnalysisData['pontosMelhoria']) => (
    <div className="space-y-4">
      {data.slice(0, expandedCards['pontos-melhoria'] ? data.length : 2).map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
        >
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mt-2 flex-shrink-0"></div>
            <h4 className="font-semibold text-amber-300 text-sm leading-relaxed">{item.problema}</h4>
          </div>
          <p className="text-sm text-gray-300 mb-3 pl-5">{item.porque_e_um_problema}</p>
          <div className="pl-5 space-y-2 text-xs">
            <div className="p-2 bg-black/30 rounded border-l-2 border-yellow-500/50">
              <p><span className="text-yellow-400 font-medium">Referência Eugene:</span> <span className="text-gray-300">{item.referencia_eugene}</span></p>
            </div>
            <div className="p-2 bg-black/30 rounded border-l-2 border-green-500/50">
              <p><span className="text-green-400 font-medium">Correção:</span> <span className="text-gray-300">{item.correcao_eugene}</span></p>
            </div>
            <div className="p-2 bg-black/30 rounded border-l-2 border-cyan-500/50">
              <p><span className="text-cyan-400 font-medium">Exemplo:</span> <span className="text-gray-300 italic">{item.exemplo_reescrito}</span></p>
            </div>
          </div>
        </motion.div>
      ))}
      {data.length > 2 && (
        <button
          onClick={() => toggleCardExpansion('pontos-melhoria')}
          className="text-neon-purple text-sm hover:underline flex items-center space-x-2"
        >
          <span>{expandedCards['pontos-melhoria'] ? 'Ver menos' : `Ver mais ${data.length - 2} pontos`}</span>
          <motion.div
            animate={{ rotate: expandedCards['pontos-melhoria'] ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ↓
          </motion.div>
        </button>
      )}
    </div>
  )

  const renderNovosAngulos = (data: AnalysisData['novosAngulos']) => (
    <div className="space-y-4">
      {data.slice(0, expandedCards['novos-angulos'] ? data.length : 2).map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-black/20 rounded-lg border border-gray-700"
        >
          <h4 className="font-semibold text-neon-pink mb-2">{item.headline}</h4>
          <p className="text-sm text-gray-400 mb-2">{item.nivel_consciencia}</p>
          <p className="text-sm text-gray-300 mb-3">{item.justificativa}</p>
          <ul className="space-y-1">
            {item.bullets_curiosidade.map((bullet, bulletIndex) => (
              <li key={bulletIndex} className="flex items-start space-x-2 text-sm">
                <span className="text-neon-blue mt-1">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
      {data.length > 2 && (
        <button
          onClick={() => toggleCardExpansion('novos-angulos')}
          className="text-neon-pink text-sm hover:underline"
        >
          {expandedCards['novos-angulos'] ? 'Ver menos' : `Ver mais ${data.length - 2} ângulos`}
        </button>
      )}
    </div>
  )

  const renderContent = (content: any, cardKey: string) => {
    switch (cardKey) {
      case 'nivel-consciencia':
        return renderNivelConsciencia(content)
      case 'estrutura-lead':
        return renderEstruturaLead(content)
      case 'pontos-melhoria':
        return renderPontosMelhoria(content)
      case 'novos-angulos':
        return renderNovosAngulos(content)
      default:
        return <p className="text-sm leading-relaxed">{JSON.stringify(content)}</p>
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        className="relative max-w-7xl w-full max-h-[90vh] overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {showJsonView ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/90 p-6 rounded-lg border border-neon-blue/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-orbitron text-neon-blue">JSON Response</h3>
              <button
                onClick={() => onToggleJsonView(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors"
              >
                <EyeOff className="w-4 h-4" />
                <span>Voltar à Visualização</span>
              </button>
            </div>
            <pre className="text-xs text-gray-300 overflow-x-auto bg-gray-900/50 p-4 rounded border">
              {JSON.stringify(analysis, null, 2)}
            </pre>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-orbitron text-white">Análise Eugene Brain</h2>
              <button
                onClick={() => onToggleJsonView(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors"
              >
                <Code className="w-4 h-4" />
                <span>Ver JSON</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className={`${card.bgColor} ${card.borderColor} border-2 h-full`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          variants={iconVariants}
                          className={`p-2 rounded-lg ${card.bgColor} ${card.borderColor} border`}
                        >
                          <card.icon className={`w-5 h-5 ${card.color}`} />
                        </motion.div>
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderContent(card.content, card.key)}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={onClose}
            className="px-8 py-3 bg-transparent border-2 border-neon-blue text-neon-blue rounded-lg hover:bg-neon-blue hover:text-black transition-all duration-300 font-orbitron font-semibold tracking-wider neon-glow hover:neon-text"
          >
            Fechar Análise
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}