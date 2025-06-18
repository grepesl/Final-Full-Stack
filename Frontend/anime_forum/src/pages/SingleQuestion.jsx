import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import './SingleQuestion.css';
import {toast} from "react-toastify";

const SingleQuestion = () => {
    const { question_id } = useParams();
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState()

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
        <div className="single-question-container">
            <button className="back-button" onClick={() => window.history.back()}>
                ← Back to Home
            </button>

            <div className="question-header">
                <span className="question-user">👤 {question.username}</span>
                <div className="question-actions">
                    <button className="action-button">Update</button>
                    <button className="action-button">Delete</button>
                </div>
            </div>

            <h2 className="question-title">{question.title}</h2>

            <p className="question-content">{question.content}</p>

            {/*<ul className="question-tags">*/}
            {/*    {question.tags.split(",").map((tag, index) => (*/}
            {/*        <li key={index} className="tag">{tag.trim()}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}

            <div className="question-meta">
                <div className="vote-box">
                    <i className="bi bi-caret-up-fill vote-icon upvote"></i>
                    <span className="vote-count">{question.likes_count}</span>
                    <i className="bi bi-caret-down-fill vote-icon downvote"></i>
                </div>
                <span className="answers-count">💬 {question.answers_count}</span>
            </div>

            <div className="answers-section">
                <h3 className="answers-title">Atsakymai</h3>

                <div className="answer-form">
                    <textarea placeholder="Įvesk atsakymą..." className="answer-input"></textarea>
                    <button className="submit-button">Submit</button>
                </div>

                {(answers === undefined || answers.length === 0) ? (
                    <p className="no-answers">Šis klausimas kol kas neturi atsakymų.</p>
                ) : (
                    answers.map((answer, index) => (
                        <div key={index} className="answer">
                            <p className="answer-content">{answer.content}</p>
                            <p className="answer-user">👤 {answer.username}</p>
                            <div className="answer-actions">
                                <button className="answer-button">Update</button>
                                <button className="answer-button">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default SingleQuestion
