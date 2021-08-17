import React from 'react';
import CounterPage from './components/CounterPage';

export type Language = {
    passTurn: string;
    gainCard: string;
    loseCard: string;
    addEnergy: string;
    loseEnergy: string;
};

export type Theme = {};

const english: Language = {
    passTurn: 'Pass Turn',
    gainCard: 'Gain Card',
    loseCard: 'Lose Card',
    addEnergy: 'Add Energy',
    loseEnergy: 'Lose Energy',
}

const light: Theme = {};

const LanguageContext = React.createContext<Language>(english);
const ThemeContext = React.createContext<Theme>(light);

function App() {
    return (
        <LanguageContext.Provider value={english}>
            <ThemeContext.Provider value={light}>
                <CounterPage />
            </ThemeContext.Provider>
        </LanguageContext.Provider>
    );
}

export default App;
