import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ConversationalScreen } from '../../components/onboarding/ConversationalScreen';
import { setCheckpoint } from '../../lib/persistence';

export default function WaitingRoom() {
  const navigate = useNavigate();

  useEffect(() => setCheckpoint('/onboarding/waiting-room'), []);

  const go = () => navigate('/onboarding/security');

  return (
    <ConversationalScreen
      message="Hi. I'm SAI. I'm really glad you're here. Before we go in, I want to be honest with you about who I am and what I can do. Ready?"
      optionA="Yes, tell me"
      optionB="I'm nervous, but okay"
      onA={go}
      onB={go}
    />
  );
}
