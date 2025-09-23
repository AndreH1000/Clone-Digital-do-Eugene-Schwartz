'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, Brain, Sparkles } from 'lucide-react'
import Brain3D from './Brain3D'
import AnalysisResult from './AnalysisResult'

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

export default function EugeneBrainInterface() {
  const [lead, setLead] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showJsonView, setShowJsonView] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentProcessingText, setCurrentProcessingText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const processingPhrases = [
    "Analisando o nível de consciência do prospect...",
    "Dissecando a estrutura da lead pelo framework AIDA/PAS...",
    "Verificando desalinhamentos entre promessa e consciência...",
    "Classificando se o prospect é Desconsciente, Problema, Solução, Produto ou Mais Consciente...",
    "Testando se a promessa é forte o bastante para o estágio de sofisticação...",
    "Procurando o mecanismo único que diferencia essa oferta...",
    "Pensando como Eugene: o que o prospect já sabe e o que ainda precisa descobrir?",
    "Comparando a copy com os princípios de Breakthrough Advertising...",
    "Checando se há provas, mecanismos e fascinações suficientes...",
    "Explorando novos ângulos criativos para destravar a atenção...",
    "Validando se a promessa é específica, crível e limitada no tempo...",
    "Testando se a voz da copy conversa com a mente do prospect...",
    "Medindo intensidade da dor vs intensidade da solução...",
    "Mapeando a jornada emocional da lead...",
    "Verificando se a copy fala com a conversa que já existe na cabeça do cliente...",
    "Testando se o mecanismo está claro ou vago demais...",
    "Caçando exageros que quebram credibilidade...",
    "Checando bullets de curiosidade e fascinações...",
    "Pesando promessa vs prova: está equilibrado ou frágil?",
    "Canalizando Eugene Schwartz: só as melhores ideias sobrevivem..."
  ]

  const startProcessingAnimation = () => {
    setIsProcessing(true)
    let phraseIndex = 0
    
    const showNextPhrase = () => {
      setCurrentProcessingText(processingPhrases[phraseIndex])
      phraseIndex = (phraseIndex + 1) % processingPhrases.length
    }
    
    // Mostrar primeira frase imediatamente
    showNextPhrase()
    
    // Trocar frase a cada 10 segundos
    const interval = setInterval(showNextPhrase, 10000)
    
    return () => {
      clearInterval(interval)
      setIsProcessing(false)
      setCurrentProcessingText('')
    }
  }

  const analyzeWithEugeneBrain = async (leadText: string): Promise<AnalysisData> => {
    try {
      // Enviar para o webhook do Eugene Brain
      const response = await fetch('https://webhooks.gtline.click/webhook/eugene-brain/Core', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lead: leadText,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`)
      }

      const result = await response.json()
      
      // Verificar se o retorno é um array (formato esperado)
      if (Array.isArray(result) && result.length > 0) {
        // Processar o formato com array wrapper
        const analysisData = result[0]?.output
        
        if (analysisData) {
          return {
            nivelConsciencia: analysisData.nivel_consciencia,
            estruturaLead: analysisData.estrutura_lead,
            pontosMelhoria: analysisData.pontos_melhoria || [],
            novosAngulos: analysisData.novos_angulos || []
          }
        } else {
          throw new Error('Dados de análise não encontrados no formato esperado')
        }
      } else if (result.nivel_consciencia && result.estrutura_lead) {
        // Processar o formato direto (sem array wrapper)
        return {
          nivelConsciencia: result.nivel_consciencia,
          estruturaLead: result.estrutura_lead,
          pontosMelhoria: result.pontos_melhoria || [],
          novosAngulos: result.novos_angulos || []
        }
      } else {
        throw new Error('Formato de resposta inválido do webhook')
      }
    } catch (error) {
      console.error('Erro na análise:', error)
      
      // Fallback em caso de erro
      return {
        nivelConsciencia: {
          nivel: 0,
          justificativa: `Erro na análise. Lead com ${leadText.length} caracteres. Tentando novamente...`,
          estagio_sofisticacao: 0
        },
        estruturaLead: {
          framework: 'Análise Offline',
          explicacao: `Estrutura ${leadText.split('.').length > 3 ? 'complexa' : 'simples'} com ${leadText.split(' ').length} palavras.`
        },
        pontosMelhoria: [
          {
            problema: 'Conexão com Eugene Brain',
            porque_e_um_problema: 'Erro na comunicação com o servidor',
            referencia_eugene: 'Verificar conectividade',
            correcao_eugene: 'Tentar novamente em alguns segundos',
            exemplo_reescrito: 'Recarregue a página e teste novamente'
          }
        ],
        novosAngulos: [
          {
            headline: 'Análise temporariamente indisponível',
            nivel_consciencia: 'Nível 0',
            justificativa: 'Sistema em manutenção',
            bullets_curiosidade: [
              'Tente novamente em alguns minutos',
              'Verifique sua conexão com a internet',
              'Entre em contato se o problema persistir'
            ]
          }
        ]
      }
    }
  }

  const handleAnalyze = async () => {
    if (!lead.trim()) return

    setIsAnalyzing(true)
    
    // Iniciar animação de processamento
    const stopProcessing = startProcessingAnimation()
    
    try {
      const result = await analyzeWithEugeneBrain(lead)
      setAnalysis(result)
      setShowAnalysis(true)
    } catch (error) {
      console.error('Erro na análise:', error)
      // Mostrar análise de fallback mesmo em caso de erro
      const fallbackResult = await analyzeWithEugeneBrain(lead)
      setAnalysis(fallbackResult)
      setShowAnalysis(true)
    } finally {
      setIsAnalyzing(false)
      stopProcessing()
    }
  }

  const handleCloseAnalysis = () => {
    setShowAnalysis(false)
  }

  return (
    <div className="min-h-screen neural-network-bg relative overflow-hidden">
      {/* Header */}
      <motion.header
        className="relative z-10 p-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
              <span className="neon-text text-neon-blue">EUGENE</span>
              <span className="text-white mx-4">SCHWARTZ</span>
              <span className="neon-text text-neon-cyan">BRAIN</span>
            </h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 font-inter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Digital Clone • Análise de Leads Inteligente
            </motion.p>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - 3D Brain */}
          <motion.div
            className="relative h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden hud-border">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                style={{ background: 'transparent' }}
              >
                <Brain3D 
                  useRealModel={true} 
                  modelUrl="/models/Brain_3d.glb"
                  isProcessing={isProcessing}
                />
              </Canvas>
            </div>
            
            {/* Brain Status */}
            <motion.div
              className="absolute bottom-4 left-4 right-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Card className="hud-border bg-black/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-neon-blue rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-neon-cyan rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-neon-purple rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                    <span className="text-sm text-gray-300 font-orbitron">
                      Sistema Neural Ativo
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Side - Input Form */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Card className="hud-border bg-black/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Brain className="w-6 h-6 text-neon-blue" />
                  <span className="neon-text text-neon-cyan">Análise de Lead</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">
                    Cole sua LEAD aqui:
                  </label>
                  <Textarea
                    ref={textareaRef}
                    value={lead}
                    onChange={(e) => setLead(e.target.value)}
                    placeholder="Cole aqui o texto da sua lead para análise..."
                    className="min-h-[200px] resize-none bg-black/50 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={!lead.trim() || isAnalyzing}
                  variant="neon"
                  size="lg"
                  className="w-full"
                >
                  <AnimatePresence mode="wait">
                    {isAnalyzing ? (
                      <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        <span>Analisando com Eugene Brain...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="analyze"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <Send className="w-5 h-5" />
                        <span>Analisar com Eugene Brain</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>

                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                  >
                    <div className="flex justify-center space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-neon-blue rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">
                      Eugene está processando sua lead...
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      Conectando com Eugene Brain Core...
                    </div>
                    {currentProcessingText && (
                      <motion.div
                        key={currentProcessingText}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-3 p-3 bg-black/30 rounded-lg border border-neon-blue/30"
                      >
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-3 h-3 border border-neon-blue border-t-transparent rounded-full"
                          />
                          <p className="text-xs text-neon-blue font-medium">
                            {currentProcessingText}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Analysis Modal */}
      <AnimatePresence>
        {showAnalysis && analysis && (
          <AnalysisResult
            analysis={analysis}
            onClose={handleCloseAnalysis}
            showJsonView={showJsonView}
            onToggleJsonView={setShowJsonView}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
