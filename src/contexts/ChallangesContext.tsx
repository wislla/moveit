import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookie from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: string;
    description: string;
    amount: number;
}
interface ChallengesProviderProp {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
  }
interface ChallengeContextData {

    level: number; 
    levelUp: () => void; 
    currentExperience: number;
    challangeCompleted: number;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallanges: () => void;
    closeLevelUpModal: () => void;


}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({children, ...rest} : ChallengesProviderProp ) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState( rest.currentExperience ?? 0);
    const [challangeCompleted, setChallengeCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const experienceToNextLevel = Math.pow((level + 1)*4, 2);

    useEffect(()=>{
        Notification.requestPermission();
    }, [])

    useEffect(()=>{

        Cookie.set('level', String(level))
        Cookie.set('challangeCompleted', String(challangeCompleted))
        Cookie.set('currentExperience', String(currentExperience))


    },[level, currentExperience, challangeCompleted])

    function levelUp() {
        setLevel(level +1);
        setIsLevelUpModalOpen(true);

    }

    function startNewChallenge () {

        const randomChallengesIndex = Math.floor(Math.random()* challenges.length);
        const challenge = challenges [randomChallengesIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === "granted"){
            new Notification("Novo desafio", {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge () {
        setActiveChallenge(null);
    }

    function completeChallanges () {
        if (!activeChallenge) return
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();  
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challangeCompleted +1 );
    }
    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
      }
    
    return (
        <ChallengesContext.Provider value={{
            level, 
            levelUp, 
            currentExperience, 
            challangeCompleted, 
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallanges,
            closeLevelUpModal,
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}