import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/ExperienceBar.module.css';
function ExperienceBar (){

    const { currentExperience, experienceToNextLevel } = useContext( ChallengesContext ); 

    const percentToLevel =(Math.round(currentExperience*100)) /experienceToNextLevel;

    return(
        <header className={ styles.experienceBar }>
            <span>0xp</span>
                <div>
                    <div style={ { width:`${ percentToLevel }%` } }></div>
                   <span  
                   className={ styles.currentExperience }
                   style={ { left: `${ percentToLevel }%` } }
                   >{ currentExperience }xp
                   </span>
                    
                </div>
            <span>{experienceToNextLevel}xp</span>
        </header>
    );

}
export default ExperienceBar;