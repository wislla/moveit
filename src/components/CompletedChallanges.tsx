import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/CompletedChallanges.module.css';

export function CompletedChallanges (){

    const {challangeCompleted} = useContext( ChallengesContext );
    return (
        <div className={ styles.completeChallangesContainer }>
            <span>Desafios Completos</span>
            <span>{ challangeCompleted }</span>
        </div>
    );
}