import React from 'react';
import styles from './CounterPage.module.scss';

type State = {
    turn: number;
    energy: number;
    cards: number;
};

const ENERGY_START = 3;
const CARDS_START = 6;

const ENERGY_PER_TURN = 2;
const CARDS_PER_TURN = 3;

const CounterPage: React.FC = () => {
    const [history, setHistory] = React.useState<State[]>([{
        turn: 1,
        energy: ENERGY_START,
        cards: CARDS_START,
    }]);

    const lastState = history[history.length - 1];

    const deriveHistory = React.useCallback((next: Partial<State>) => {
        setHistory([...history, {
            energy: lastState.energy + (next.energy ?? 0),
            cards: lastState.cards + (next.cards ?? 0),
            turn: lastState.turn + (next.turn ?? 0),
        }]);
    }, [history, lastState]);

    /*const undoLastHistory = React.useCallback(() => {
        if (history.length > 1)
            setHistory(history.slice(0, history.length - 2));
    }, [history]);*/

    const resetGame = React.useCallback(() => {
        setHistory([{
            turn: 1,
            energy: ENERGY_START,
            cards: CARDS_START,
        }]);
    }, []);

    const nextTurn = React.useCallback(() => {
        deriveHistory({
            turn: 1,
            energy: ENERGY_PER_TURN,
            cards: CARDS_PER_TURN,
        });
    }, [deriveHistory]);

    React.useEffect(() => {
        resetGame();
    }, [resetGame]);

    return (
        <div className={styles.Root}>
            <div className={styles.NavBar}>
                <div className={styles.Round}>
                    Round {lastState.turn}
                </div>
            </div>

            <div className={styles.Wrapper}>
                <div className={styles.Section}>
                    <div className={styles.Label}>Energy</div>
                    <div className={styles.ValueWrapper}>
                        <button className={styles.Button} onClick={() => deriveHistory({ energy: -1 })}>
                            -
                        </button>
                        <div className={styles.Value}>{lastState.energy}</div>
                        <button className={styles.Button} onClick={() => deriveHistory({ energy: 1 })}>
                            +
                        </button>
                    </div>
                </div>

                <div className={styles.Section}>
                    <div className={styles.Label}>Cards</div>
                    <div className={styles.ValueWrapper}>
                        <button className={styles.Button} onClick={() => deriveHistory({ cards: - 1 })}>
                            -
                        </button>
                        <div className={styles.Value}>{lastState.cards}</div>
                        <button className={styles.Button} onClick={() => deriveHistory({ cards: 1 })}>
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

                        <div className={styles.ControlSection + ' ' + styles.ScreenLarge}>
                            <button className={styles.Button} onClick={() => {
                                deriveHistory({ cards: -1 });
                            }}>
                                Cost: 0
                            </button>

                            <button className={styles.Button} onClick={() => {
                                deriveHistory({
                                    energy: -1,
                                    cards: -1,
                                });
                            }}>
                                Cost: 1
                            </button>

                            <button className={styles.Button} onClick={() => {
                                deriveHistory({
                                    energy: -2,
                                    cards: -1,
                                });
                            }}>
                                Cost: 2
                            </button>
                        </div>

                        <div className={styles.CompactControlSection + ' ' + styles.ScreenSmall}>
                            <button className={styles.Button} onClick={() => {
                                deriveHistory({
                                    energy: -1,
                                    cards: -1,
                                });
                            }}>
                                Cost: 1
                            </button>

                            <div className={styles.CompactRight}>
                                <button className={styles.Button} onClick={() => {
                                    deriveHistory({
                                        cards: -1,
                                    });
                                }}>
                                    Cost: 0
                                </button>

                                <button className={styles.Button} onClick={() => {
                                    deriveHistory({
                                        energy: -2,
                                        cards: -1,
                                    });
                                }}>
                                    Cost: 2
                                </button>
                            </div>
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
                        style={{ marginBottom: 30 }}
                    >
                        Reset Game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CounterPage);
