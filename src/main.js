import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import App from './App';
createRoot(document.getElementById('root')).render(_jsx(Provider, { store: store, children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }));
