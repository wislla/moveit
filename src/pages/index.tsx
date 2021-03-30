import React from "react";
import { CompletedChallanges } from "../components/CompletedChallanges";
import { Countdown } from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/pages/Home.module.css';
import  Head  from 'next/head';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengeProvider } from '../contexts/ChallangesContext';

import { GetServerSideProps } from 'next';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};


export default function Home(props: HomeProps) {
  return (
    <ChallengeProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head><title>Inicio</title></Head>
        <ExperienceBar/>

        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallanges/>
              <Countdown/>
            </div>
            <div>
                <ChallengeBox/>
            </div>
            
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  )
}
