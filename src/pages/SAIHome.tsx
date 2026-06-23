import { useState, useEffect } from 'react';
import { FullBodySAI } from '../components/sai/FullBodySAI';
import { RoomNav } from '../components/ui/RoomNav';
import { GlobalMicButton } from '../components/ui/GlobalMicButton';
import { useSAI } from '../contexts/SAIContext';
import { useEmotionalState } from '../contexts/EmotionalStateContext';
import { useSpeakThenListen } from '../hooks/useSpeakThenListen';
import { useMicrophone } from '../contexts/MicrophoneContext';
import { getGoals, saveGoals, getAssessment } from '../lib/persistence';
import { getDailyTasks, updateGoalProgress } from '../lib/goalGenerator';
import { buildPrompt } from '../lib/traumaInformedLogic';
import { getStateLabel, getStateColor } from '../lib/stateEngine';
import { Goal } from '../lib/persistence';
import { CheckCircle, Circle, Heart, Shield, Droplets } from 'lucide-react';

export default function SAIHome() {
  const { saySAI, speaking, lastMessage } = useSAI();
  const { state, stressScore, lowerStress } = useEmotionalState();
  const { micConsented, setMicConsented, micEnabled, setMicEnabled } = useMicrophone();
  const [tasks, setTasks] = useState<Goal[]>([]);
  const [chatLog, setChatLog] = useState<{ from: 'sai' | 'user'; text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const assessment = getAssessment();

  const { phase, run: speakListen } = useSpeakThenListen((text) => {
    setChatLog(prev => [...prev, { from: 'user', text }]);
    handleUserMessage(text);
  });

  useEffect(() => {
    const goals = getGoals();
    setTasks(getDailyTasks(goals));
  }, []);

  useEffect(() => {
    const prompt = buildPrompt(state, 'greeting');
    const greeting = assessment?.nickname
      ? `Hey ${assessment.nickname}. ${prompt.message}`
      : prompt.message;
    saySAI(greeting).then(() => {
      setChatLog([{ from: 'sai', text: greeting }]);
    });
  }, []);

  const handleUserMessage = async (text: string) => {
    const { respondToUser } = (await import('../contexts/SAIContext')).useSAI ? { respondToUser: async (t: string) => {} } : { respondToUser: async () => {} };
    // use context respond
  };

  const handleSend = () => {
    if (!userInput.trim()) return;
    const text = userInput.trim();
    setUserInput('');
    setChatLog(prev => [...prev, { from: 'user', text }]);
  };

  const completeTask = (id: string) => {
    const goals = getGoals();
    const updated = updateGoalProgress(goals, id, 100);
    saveGoals(updated);
    setTasks(getDailyTasks(updated));
    lowerStress(5);
  };

  const statusColor = getStateColor(state);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-12 pb-4 safe-pt">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColor }} aria-hidden />
          <span className="text-slate-300 text-sm" aria-label={`System state: ${getStateLabel(state)}`}>
            {getStateLabel(state)}
          </span>
        </div>
        <RoomNav />
      </header>

      {/* SAI dog — anchored, not floating */}
      <section
        className="flex flex-col items-center pt-4 pb-2"
        aria-label="SAI companion"
      >
        <FullBodySAI size="lg" speaking={speaking || phase === 'speaking'} />

        {/* Speech bubble */}
        {lastMessage && (
          <div
            className="mx-4 mt-3 max-w-xs bg-white/10 backdrop-blur border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3"
            role="status"
            aria-live="polite"
            aria-label="SAI says"
          >
            <p className="text-white text-sm leading-relaxed">{lastMessage}</p>
          </div>
        )}
      </section>

      {/* Daily tasks */}
      {tasks.length > 0 && (
        <section className="px-4 mt-4" aria-label="Today's tasks">
          <h2 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Today</h2>
          <div className="space-y-2">
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => completeTask(task.id)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={`${task.text}${task.progress === 100 ? ' - completed' : ' - tap to complete'}`}
              >
                {task.progress === 100
                  ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0" aria-hidden />
                  : <Circle className="w-5 h-5 text-slate-500 shrink-0" aria-hidden />}
                <span className={`text-sm ${task.progress === 100 ? 'line-through text-slate-500' : 'text-white'}`}>
                  {task.text}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Care actions */}
      <section className="px-4 mt-4" aria-label="Care actions">
        <h2 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Care</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <Heart className="w-5 h-5" />, label: 'Check in', action: () => speakListen(buildPrompt(state, 'checkin').message) },
            { icon: <Shield className="w-5 h-5" />, label: 'Safety', action: () => speakListen('Your safety plan is saved. Do you need it right now, or just checking?') },
            { icon: <Droplets className="w-5 h-5" />, label: 'Calm', action: () => speakListen('Let\'s slow down together. Take a breath with me. In through your nose... and out through your mouth.') },
          ].map(({ icon, label, action }) => (
            <button
              key={label}
              onClick={action}
              className="flex flex-col items-center gap-2 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={label}
            >
              <span aria-hidden>{icon}</span>
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Text input */}
      <section className="px-4 mt-4 mb-24 safe-pb">
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type to SAI..."
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            aria-label="Message SAI"
          />
          <button
            onClick={handleSend}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </section>

      <GlobalMicButton
        listening={phase === 'listening'}
        onPress={() => speakListen(buildPrompt(state, 'general').message)}
      />
    </main>
  );
}
