// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Importing page components
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import MoodSelector from './pages/MoodSelector';
import Random from './pages/Random';
import Saved from './pages/Saved';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* This is the default route for the home page */}
        <Route path="calendar" element={<Calendar />} />
        <Route path="moodSelector" element={<MoodSelector />} />
        <Route path="random" element={<Random />} />
        <Route path="saved" element={<Saved />} />
      </Route>
    </Routes>
  );
}

export default App
