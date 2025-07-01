import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserContextProvider } from "./hooks/user-context.tsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContextProvider >
        <App />
    </UserContextProvider>

);


