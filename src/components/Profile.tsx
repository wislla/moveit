import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext( ChallengesContext );
    return (
        <div className={ styles.profileContainer }>
            <img src="https://github.com/wislla.png" alt="wislla"/>
            <div>
                <strong> Wislla Nuânska </strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level { level }
                </p>
            </div>
        </div>
    );
}