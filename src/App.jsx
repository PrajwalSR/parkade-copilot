import { useState } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Vehicles from './components/Vehicles';
import Spots from './components/Spots';
import Reservations from './components/Reservations';
import Problems from './components/Problems';
import Payouts from './components/Payouts';
import Pricing from './components/Pricing'; // <-- Import the new component

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeView, setActiveView] = useState('Members');

  const renderActiveView = () => {
    switch (activeView) {
      case 'Members':
        return <MainContent />;
      case 'Vehicles':
        return <Vehicles />;
      case 'Spots':
        return <Spots />;
      case 'Reservations':
        return <Reservations />;
      case 'Problems':
        return <Problems />;
      case 'Payouts':
        return <Payouts />;
      case 'Pricing': // <-- Add the new case
        return <Pricing />;
      default:
        return <MainContent />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      {renderActiveView()}

      <ChatBubble onClick={() => setIsChatOpen(true)} />
      {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
      
    </div>
  );
}

export default App;