import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoSplash } from '../components/onboarding/LogoSplash';
import { getLaunchRoute } from '../lib/persistence';

export default function Index() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!showSplash) navigate(getLaunchRoute(), { replace: true });
  }, [showSplash, navigate]);

  return showSplash ? <LogoSplash onDone={() => setShowSplash(false)} /> : null;
}
