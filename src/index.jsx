import * as React from 'react';
import { createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Importing the CSS file for styling

const root = createRoot(document.body);
root.render(
    <App />
);