import React from 'react'
import Hero from "../../components/Hero/Hero.jsx";
import Questions from "../../components/Questions/Questions.jsx";
import QuestionFilter from "../../components/QuestionFilter/QuestionFilter.jsx";
import './Home.css';

const Home = () => {
    return (
        <div>
            <Hero />
            <QuestionFilter />
            <Questions />
        </div>
    )
}
export default Home