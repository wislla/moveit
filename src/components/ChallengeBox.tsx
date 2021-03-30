import { useContext } from 'react';
import styles from '../styles/components/ChallengeBox.module.css';
import { ChallengesContext } from '../contexts/ChallangesContext';
import { CountdownContext } from '../contexts/CountdownContext';

export function ChallengeBox (){

    const { 
        activeChallenge , 
        resetChallenge, 
        completeChallanges 
    } = useContext(ChallengesContext);

    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSuccess() {
        completeChallanges();
        resetCountdown();
    }

    function handleChallengeFailure() {
        resetChallenge();
        resetCountdown();
    }
    
    const hasActiveChallenge = true;
    return (
        <div className={ styles.challangeBoxContainer}>
            {activeChallenge ? (
                <div className={ styles.challangeActive}>
                    <header>
                        Ganhe { activeChallenge.amount }xp
                    </header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{ activeChallenge.description }</p>
                    </main>
                <footer>
                    <button
                    className={styles.challangeFalied}
                    onClick={handleChallengeFailure}
                    >Falhei</button>

                    <button
                    className={styles.challangeCompleted}
                    onClick={handleChallengeSuccess}
                    >Completei</button>

                </footer>
                </div>
            ) : (

                <div className={ styles.challangeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio.</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Avance de Level completando desafio. 
                    </p>
    
                </div>
            )}

            
        </div>
    );
}