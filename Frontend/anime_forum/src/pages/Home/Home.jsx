import React from 'react'
import Hero from "../../components/Hero/Hero.jsx";
import Questions from "../../components/Questions/Questions.jsx";
import QuestionFilter from "../../components/QuestionFilter/QuestionFilter.jsx";
import './Home.css';
import CreateQuestionModal from "../../components/CreateQuestionModal/CreateQuestionModal.jsx";
// import Sidebar from "../components/Sidebar/Sidebar.jsx";

const Home = () => {
    return (
        <div className="home-layout">
            <Hero />
            {/*<Sidebar />*/}
            <QuestionFilter />
            <Questions />
        </div>
    )
}
export default Home
