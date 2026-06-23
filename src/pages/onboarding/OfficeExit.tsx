import { useNavigate } from 'react-router-dom';
import { ConversationalScreen } from '../../components/onboarding/ConversationalScreen';
import { setCheckpoint } from '../../lib/persistence';

export default function OfficeExit() {
  const navigate = useNavigate();

  const go = () => {
    setCheckpoint('/onboarding/home-entrance');
    navigate('/onboarding/home-entrance');
  };

  return (
    <ConversationalScreen
      message="You did it. All of that took courage. Now let me show you your space. I’ll be there waiting for you."
      optionA="Take me home"
      optionB="I'm ready"
      onA={go}
      onB={go}
    />
  );
}
