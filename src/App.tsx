import React from 'react'

import './App.css';
import WidgetPage from './components/WidgetPage/WidgetPage';
import { initializeIcons } from '@fluentui/react';
import WidgetPageInitiator from './components/WidgetPageInitator/WidgetPageInitiator';

initializeIcons();
function App() {
  return (    
    <div className="App">
      <WidgetPageInitiator />
      {/* Hello page */}
    </div>
  );
}

export default App;
