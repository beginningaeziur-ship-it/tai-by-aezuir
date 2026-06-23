export interface ELVoice {
  id: string;
  name: string;
  mood: 'calm' | 'supportive' | 'grounded' | 'warm';
}

export const EL_VOICES: ELVoice[] = [
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', mood: 'warm' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', mood: 'calm' },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', mood: 'grounded' },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli', mood: 'supportive' },
];

export async function speakElevenLabs(
  text: string,
  apiKey: string,
  voiceId: string = EL_VOICES[0].id
): Promise<void> {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'xi-api-key': apiKey },
    body: JSON.stringify({
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: { stability: 0.6, similarity_boost: 0.8 },
    }),
  });
  if (!res.ok) throw new Error('ElevenLabs TTS failed');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  return new Promise((resolve, reject) => {
    audio.onended = () => { URL.revokeObjectURL(url); resolve(); };
    audio.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Audio play failed')); };
    audio.play().catch(reject);
  });
}

export function speakBrowser(text: string, rate = 1, pitch = 1): Promise<void> {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = pitch;
    u.lang = 'en-US';
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}
