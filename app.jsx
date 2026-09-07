// MAIN APP — routing, page transitions, tweaks integration
const { useState, useEffect } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#131317",
  "lime": "#E8EAEE",
  "showCursor": true,
  "glow": ["#0A0A11", "#232634", "#050508"],
  "glowIntensity": 35,
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
    const glow = Array.isArray(tweaks.glow) ? tweaks.glow : ['#0A0A11', '#232634', '#050508'];
    document.documentElement.style.setProperty('--glow-1', glow[0]);
    document.documentElement.style.setProperty('--glow-2', glow[1] || glow[0]);
    document.documentElement.style.setProperty('--glow-3', glow[2] || glow[0]);
    const on = tweaks.glowOn !== false;
    const intensity = (typeof tweaks.glowIntensity === 'number' ? tweaks.glowIntensity : 35) / 100;
    document.documentElement.style.setProperty('--blob-opacity', on ? String(intensity) : '0');
  }, [tweaks]);

  // `project` is applied in the same frame as the page swap, so navigating from
  // a home tile straight into a case study is ONE curtain, not two.
  const goTo = (next, project = null) => {
    if (next === page && project === activeProject) return;
    setTransitioning(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      setPageState(next);
      setActiveProject(project);
    }, 500);
    setTimeout(() => {
      setTransitioning(false);
    }, 1200);
  };

  const setPage = (next) => {
    if (next === page && !activeProject) return;
    goTo(next, null);
  };

  const openProject = (id) => {
    // Already on work: the detail view swaps in place, no page transition.
    if (page === 'work') {
      setActiveProject(id);
      return;
    }
    goTo('work', id);
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
            options={['#131317', '#33343C', '#243447', '#3B2E3E']}
            onChange={(v) => setTweak('accent', v)}
          />
        </TweakSection>
        <TweakSection title="Secondary">
          <TweakColor
            label="Lime"
            value={tweaks.lime}
            options={['#E8EAEE', '#F2F3F5', '#DEE1E7', '#D5D9E0']}
            onChange={(v) => setTweak('lime', v)}
          />
        </TweakSection>
        <TweakSection title="Lava blobs">
          <TweakToggle
            label="Enable blobs"
            value={tweaks.glowOn !== false}
            onChange={(v) => setTweak('glowOn', v)}
          />
          <TweakSlider
            label="Intensity"
            value={typeof tweaks.glowIntensity === 'number' ? tweaks.glowIntensity : 35}
            min={0}
            max={100}
            step={5}
            unit="%"
            onChange={(v) => setTweak('glowIntensity', v)}
          />
          <TweakColor
            label="Blob shade"
            value={tweaks.glow}
            options={[
              ['#101014', '#1A1B22', '#0B0B0F'],
              ['#0E1220', '#1A2233', '#0A0D16'],
              ['#141019', '#221A2E', '#0F0B14'],
              ['#101413', '#1A2420', '#0A0F0D'],
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
