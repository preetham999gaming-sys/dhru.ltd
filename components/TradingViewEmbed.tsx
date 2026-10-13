@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #07111f;
  --card: rgba(15, 23, 42, 0.88);
  --line: rgba(148, 163, 184, 0.18);
  --text: #e2e8f0;
  --muted: #94a3b8;
  --cyan: #22d3ee;
  --orange: #f97316;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(34, 211, 238, 0.12), transparent 25%),
    linear-gradient(180deg, #07111f 0%, #0b1629 100%);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

button, input {
  font: inherit;
}

::selection {
  background: rgba(34, 211, 238, 0.35);
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.64; }
  50% { opacity: 1; }
}

.status-dot {
  animation: pulse-slow 2s ease-in-out infinite;
}
