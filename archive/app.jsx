// MAIN APP — routing, page transitions, tweaks integration
const { useState, useEffect } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FF3D2E",
  "lime": "#C8E84E",
  "showCursor": true,
  "glow": ["#6A47D6", "#3A47B8", "#A2479E"],
  "glowIntensity": 78,
  "glowOn": true
}/*EDITMODE-END*/;

function App() {
  const [page, setPageState] = useState('home');
  const [transitioning, setTransitioning] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [tweaks, setTweak] = useTweaks(DEFAULTS);

  // Apply tweaks to CSS vars
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    document.documentElement.style.setProperty('--lime', tweaks.lime);
    if (tweaks.showCursor === false) {
      document.body.style.cursor = 'auto';
    } else {
      document.body.style.cursor = 'none';
    }
    const glow = Array.isArray(tweaks.glow) ? tweaks.glow : ['#6A47D6', '#3A47B8', '#A2479E'];
    document.documentElement.style.setProperty('--glow-1', glow[0]);
    document.documentElement.style.setProperty('--glow-2', glow[1] || glow[0]);
    document.documentElement.style.setProperty('--glow-3', glow[2] || glow[0]);
    const on = tweaks.glowOn !== false;
    const intensity = (typeof tweaks.glowIntensity === 'number' ? tweaks.glowIntensity : 50) / 100;
    document.documentElement.style.setProperty('--blob-opacity', on ? String(intensity) : '0');
  }, [tweaks]);

  const setPage = (next) => {
    if (next === page) return;
    setTransitioning(true);
    setActiveProject(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      setPageState(next);
    }, 500);
    setTimeout(() => {
      setTransitioning(false);
    }, 1200);
  };

  const openProject = (id) => {
    // If on home, route to work first
    if (page !== 'work') {
      setPage('work');
      setTimeout(() => setActiveProject(id), 1300);
      return;
    }
    setActiveProject(id);
  };
  const closeProject = () => setActiveProject(null);

  // Listen for next-project event
  useEffect(() => {
    const handler = (e) => setActiveProject(e.detail);
    document.addEventListener('open-project', handler);
    return () => document.removeEventListener('open-project', handler);
  }, []);

  return (
    <>
      {tweaks.showCursor !== false && <CustomCursor />}

      <Nav page={page} setPage={setPage} />

      <div className={`page-curtain ${transitioning ? 'active' : ''}`}></div>

      {page === 'home' && <HomePage setPage={setPage} openProject={openProject} />}
      {page === 'work' && (
        <WorkPage openProject={openProject} activeProject={activeProject} closeProject={closeProject} />
      )}
      {page === 'about' && <AboutPage />}

      <Footer setPage={setPage} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent color">
          <TweakColor
            label="Accent"
            value={tweaks.accent}
            options={['#FF3D2E', '#2A6FDB', '#1F8A5B', '#E94F8E', '#FFB400']}
            onChange={(v) => setTweak('accent', v)}
          />
        </TweakSection>
        <TweakSection title="Secondary">
          <TweakColor
            label="Lime"
            value={tweaks.lime}
            options={['#C8E84E', '#8AD7FB', '#FFD6A5', '#D5BFFF']}
            onChange={(v) => setTweak('lime', v)}
          />
        </TweakSection>
        <TweakSection title="Background glow">
          <TweakToggle
            label="Enable glow"
            value={tweaks.glowOn !== false}
            onChange={(v) => setTweak('glowOn', v)}
          />
          <TweakSlider
            label="Intensity"
            value={typeof tweaks.glowIntensity === 'number' ? tweaks.glowIntensity : 78}
            min={0}
            max={100}
            step={5}
            unit="%"
            onChange={(v) => setTweak('glowIntensity', v)}
          />
          <TweakColor
            label="Palette"
            value={tweaks.glow}
            options={[
              ['#6A47D6', '#3A47B8', '#A2479E'],
              ['#2A8FB0', '#3A6FD6', '#3FC0A0'],
              ['#C0476E', '#8A47D6', '#E0663F'],
              ['#4F7FD6', '#6A5FE0', '#3FA8C8'],
            ]}
            onChange={(v) => setTweak('glow', v)}
          />
        </TweakSection>
        <TweakSection title="Interaction">
          <TweakToggle
            label="Custom cursor"
            value={tweaks.showCursor !== false}
            onChange={(v) => setTweak('showCursor', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
