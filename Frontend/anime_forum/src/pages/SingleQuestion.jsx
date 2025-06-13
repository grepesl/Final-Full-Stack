import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import './SingleQuestion.css';
import {toast} from "react-toastify";

const SingleQuestion = () => {
    const { question_id } = useParams();
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState()

    const comments = {
        id: 1,
        items: []
    }
    const [commentsData, setCommentsData] = useState()


    useEffect(() => {
        const fetchQuestion = async () => {
            const params = new URLSearchParams();

            try {
                const res = await fetch(`http://localhost:3000/questions/${question_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();
                setQuestion(data.question);
            } catch (error) {
                console.error('Fetch klaida:', error);
                toast.error('Įvyko tinklo klaida');
            }
        };

        const fetchAnswers = async () => {
            try {
                const res = await fetch(`http://localhost:3000/answers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();
                const filtered = data.answers.filter((answer) => answer.question_uuid === question_id)
                setAnswers(filtered);
            } catch (error) {
                console.error('Fetch klaida:', error);
                toast.error('Įvyko tinklo klaida');
            }
        };

        fetchAnswers();
        fetchQuestion();
    }, [question_id]);

    return (
        <div>
            {/*<h1>All Questions</h1>*/}
            <div>
                    <div>
                        <div>
                            <span>👤 {question.username}</span>
                            <h2>{question.title}</h2>
                            <p>
                                {question.content}
                            </p>
                            {/*<ul>*/}
                            {/*    {question.tags.split(",").map((tag, index) => (*/}
                            {/*        <li key={index}>{tag.trim()}</li>*/}
                            {/*    ))}*/}
                            {/*</ul>*/}
                            <div>
                                <span>
                                    <i className="bi bi-caret-up"></i>
                                    {question.likes_count}
                                    <i className="bi bi-caret-down"></i>
                                </span>
                                <span>💬 {question.answers_count}</span>
                            </div>
                            <div>
                                <h3>Atsakymai</h3>
                                {
                                    //answers == nuull
                                    //answers ==undefiend

                                    (answers === undefined || answers.length === 0) ? (
                                    <p>Šis klausimas kol kas neturi atsakymų.</p>
                                ) : (
                                    answers.map((answer, index) => (
                                        <div key={index} className="answer">
                                            <p>{answer.content}</p>
                                            <p>👤 {answer.username}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/*<Comment comment={commentsData} />*/}


                        </div>
                    </div>
            </div>
        </div>
    )
}
export default SingleQuestion
