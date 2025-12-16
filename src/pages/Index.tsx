const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl sai-fade-in">
        {/* Animated SAI orb */}
        <div className="w-24 h-24 mx-auto rounded-full sai-gradient-calm sai-breathe shadow-lg" />
        
        <div className="space-y-4">
          <h1 className="sai-heading text-4xl">Welcome to SAI</h1>
          <p className="sai-body text-lg">
            Your trauma-informed ally guide. The design system has been copied successfully.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-4 md:grid-cols-2 mt-8">
          <div className="sai-card-interactive">
            <div className="w-8 h-8 rounded-full bg-sai-calm mb-3" />
            <h3 className="sai-subheading">Calm Colors</h3>
            <p className="sai-gentle text-sm">Teal-based palette for trust and healing</p>
          </div>
          
          <div className="sai-card-interactive">
            <div className="w-8 h-8 rounded-full bg-sai-hope mb-3" />
            <h3 className="sai-subheading">Hope Accents</h3>
            <p className="sai-gentle text-sm">Warm amber for gentle encouragement</p>
          </div>
          
          <div className="sai-card-interactive">
            <div className="w-8 h-8 rounded-full bg-sai-safe mb-3" />
            <h3 className="sai-subheading">Safe Spaces</h3>
            <p className="sai-gentle text-sm">Lavender tones for softness and safety</p>
          </div>
          
          <div className="sai-card-interactive">
            <div className="w-8 h-8 rounded-full sai-gradient-hope mb-3" />
            <h3 className="sai-subheading">Animations</h3>
            <p className="sai-gentle text-sm">Breathing, floating, and gentle transitions</p>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mt-8">
          Tell me which features to copy next: onboarding, voice, accessibility, dashboard, etc.
        </p>
      </div>
    </div>
  );
};

export default Index;
