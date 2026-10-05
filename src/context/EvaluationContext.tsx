import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import {
  DEFAULT_RANKING,
  DEFAULT_CSP_RATINGS,
  SDLC_PHASES,
  SCENARIOS,
  PARAMETERS,
} from '@/data/projectData';
import {
  generateRecommendation,
  type RecommendationResult,
} from '@/lib/prplw';

interface EvaluationState {
  selectedPhaseId: string;
  selectedScenarioId: string;
  customProjectName: string;
  parameterRanking: Record<string, number>;
  cspRatings: Record<string, Record<string, number>>;
  advancedSimulation: boolean;
  recommendation: RecommendationResult;
}

interface EvaluationContextValue extends EvaluationState {
  setPhase: (phaseId: string) => void;
  setScenario: (scenarioId: string) => void;
  setCustomProjectName: (value: string) => void;
  setParameterRanking: (ranking: Record<string, number>) => void;
  updateParameterRank: (parameterId: string, newRank: number) => void;
  swapParameters: (paramIdA: string, paramIdB: string) => void;
  setCSPRating: (cspId: string, parameterId: string, rating: number) => void;
  toggleAdvancedSimulation: () => void;
  applyPhasePriorities: (phaseId: string) => void;
  applyScenarioPriorities: (scenarioId: string) => void;
  resetEvaluation: () => void;
}

const EvaluationContext = createContext<EvaluationContextValue | null>(null);

const DEFAULT_PHASE_ID = 'planning';
const DEFAULT_SCENARIO_ID = 'custom';

export function EvaluationProvider({ children }: { children: ReactNode }) {
  const [selectedPhaseId, setSelectedPhaseId] = useState(DEFAULT_PHASE_ID);
  const [selectedScenarioId, setSelectedScenarioId] = useState(DEFAULT_SCENARIO_ID);
  const [customProjectName, setCustomProjectName] = useState('');
  const [parameterRanking, setParameterRanking] =
    useState<Record<string, number>>(DEFAULT_RANKING);
  const [cspRatings, setCspRatings] =
    useState<Record<string, Record<string, number>>>(DEFAULT_CSP_RATINGS);
  const [advancedSimulation, setAdvancedSimulation] = useState(false);

  const recommendation = useMemo(
    () => generateRecommendation(parameterRanking, cspRatings),
    [parameterRanking, cspRatings]
  );

  const setPhase = useCallback((phaseId: string) => {
    setSelectedPhaseId(phaseId);
  }, []);

  const setScenario = useCallback((scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
  }, []);

  const setParameterRankingState = useCallback(
    (ranking: Record<string, number>) => {
      setParameterRanking(ranking);
    },
    []
  );

  const updateParameterRank = useCallback(
    (parameterId: string, newRank: number) => {
      setParameterRanking((prev) => {
        const next = { ...prev };
        const oldRank = next[parameterId];
        // Shift other parameters
        for (const key of Object.keys(next)) {
          if (key === parameterId) continue;
          if (oldRank < newRank) {
            // Moving down: parameters between old+1 and new shift up
            if (next[key] > oldRank && next[key] <= newRank) {
              next[key] = next[key] - 1;
            }
          } else if (oldRank > newRank) {
            // Moving up: parameters between new and old-1 shift down
            if (next[key] >= newRank && next[key] < oldRank) {
              next[key] = next[key] + 1;
            }
          }
        }
        next[parameterId] = newRank;
        return next;
      });
    },
    []
  );

  const swapParameters = useCallback((paramIdA: string, paramIdB: string) => {
    setParameterRanking((prev) => {
      const next = { ...prev };
      const temp = next[paramIdA];
      next[paramIdA] = next[paramIdB];
      next[paramIdB] = temp;
      return next;
    });
  }, []);

  const setCSPRating = useCallback(
    (cspId: string, parameterId: string, rating: number) => {
      setCspRatings((prev) => ({
        ...prev,
        [cspId]: {
          ...prev[cspId],
          [parameterId]: Math.max(0, Math.min(10, rating)),
        },
      }));
    },
    []
  );

  const toggleAdvancedSimulation = useCallback(() => {
    setAdvancedSimulation((prev) => !prev);
  }, []);

  const applyPhasePriorities = useCallback((phaseId: string) => {
    const phase = SDLC_PHASES.find((p) => p.id === phaseId);
    if (phase) {
      setParameterRanking({ ...phase.recommendedPriorities });
      setSelectedPhaseId(phaseId);
    }
  }, []);

  const applyScenarioPriorities = useCallback((scenarioId: string) => {
    const scenario = SCENARIOS.find((s) => s.id === scenarioId);
    if (scenario) {
      setParameterRanking({ ...scenario.recommendedPriorities });
      setSelectedScenarioId(scenarioId);
    }
  }, []);

  const resetEvaluation = useCallback(() => {
    setSelectedPhaseId(DEFAULT_PHASE_ID);
    setSelectedScenarioId(DEFAULT_SCENARIO_ID);
    setCustomProjectName('');
    setParameterRanking({ ...DEFAULT_RANKING });
    setCspRatings(JSON.parse(JSON.stringify(DEFAULT_CSP_RATINGS)));
    setAdvancedSimulation(false);
  }, []);

  const value: EvaluationContextValue = {
    selectedPhaseId,
    selectedScenarioId,
    customProjectName,
    parameterRanking,
    cspRatings,
    advancedSimulation,
    recommendation,
    setPhase,
    setScenario,
    setCustomProjectName,
    setParameterRanking: setParameterRankingState,
    updateParameterRank,
    swapParameters,
    setCSPRating,
    toggleAdvancedSimulation,
    applyPhasePriorities,
    applyScenarioPriorities,
    resetEvaluation,
  };

  return (
    <EvaluationContext.Provider value={value}>
      {children}
    </EvaluationContext.Provider>
  );
}

export function useEvaluation() {
  const ctx = useContext(EvaluationContext);
  if (!ctx) {
    throw new Error('useEvaluation must be used within EvaluationProvider');
  }
  return ctx;
}

// Helper hooks
export function useSelectedPhase() {
  const { selectedPhaseId } = useEvaluation();
  return SDLC_PHASES.find((p) => p.id === selectedPhaseId) ?? SDLC_PHASES[0];
}

export function useSelectedScenario() {
  const { selectedScenarioId } = useEvaluation();
  return SCENARIOS.find((s) => s.id === selectedScenarioId) ?? SCENARIOS[0];
}

export function useParameterList() {
  return PARAMETERS;
}
