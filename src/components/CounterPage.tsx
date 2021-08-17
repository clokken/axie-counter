import React from 'react';
import styles from './CounterPage.module.scss';

const ENERGY_START = 3;
const CARDS_START = 6;

const CounterPage: React.FC = () => {
    const [energy, setEnergy] = React.useState(0);
    const [cards, setCards] = React.useState(0);

    const resetGame = React.useCallback(() => {
        setEnergy(ENERGY_START);
        setCards(CARDS_START);
    }, []);

    const nextTurn = React.useCallback(() => {
        setEnergy(energy + 2);
        setCards(cards + 3);
    }, [energy, cards]);

    React.useEffect(() => {
        resetGame();
    }, []);

    return (
        <div className={styles.Root}>
            <div className={styles.Wrapper}>
                <div className={styles.Section}>
                    <div className={styles.Label}>Energy</div>
                    <div className={styles.ValueWrapper}>
                        <button className={styles.Button} onClick={() => setEnergy(energy - 1)}>
                            -
                        </button>
                        <div className={styles.Value}>{energy}</div>
                        <button className={styles.Button} onClick={() => setEnergy(energy + 1)}>
                            +
                        </button>
                    </div>
                </div>

                <div className={styles.Section}>
                    <div className={styles.Label}>Cards</div>
                    <div className={styles.ValueWrapper}>
                        <button className={styles.Button} onClick={() => setCards(cards - 1)}>
                            -
                        </button>
                        <div className={styles.Value}>{cards}</div>
                        <button className={styles.Button} onClick={() => setCards(cards + 1)}>
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.BottomContent}>
                <div className={styles.ControlsWrapper}>
                    <div className={styles.Controls}>
                        <div className={styles.Label}>
                            Use Cards
                        </div>

                        <div className={styles.ControlSection}>
                            <button className={styles.Button} onClick={() => {
                                setCards(cards - 1);
                            }}>
                                Cost: 0
                            </button>

                            <button className={styles.Button} onClick={() => {
                                setEnergy(energy - 1);
                                setCards(cards - 1);
                            }}>
                                Cost: 1
                            </button>

                            <button className={styles.Button} onClick={() => {
                                setEnergy(energy - 2);
                                setCards(cards - 1);
                            }}>
                                Cost: 2
                            </button>
                        </div>
                    </div>

                    <button
                        className={styles.Button + ' ' + styles.FinalButton}
                        onClick={nextTurn}
                    >
                        Next Turn
                    </button>

                    <button
                        className={styles.Button + ' ' + styles.FinalButton}
                        onClick={resetGame}
                    >
                        Reset Game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CounterPage);
