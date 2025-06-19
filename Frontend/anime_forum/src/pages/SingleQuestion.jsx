import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import './SingleQuestion.css';
import {toast} from "react-toastify";
import EditQuestionModal from "../components/EditQuestionModal/EditQuestionModal.jsx";
import EditAnswerModal from '../components/EditAnswerModal/EditAnswerModal.jsx';
import { useNavigate } from 'react-router-dom';

// TODO parodyt kad buvo updated kl ir ats

const SingleQuestion = () => {
    const { question_id } = useParams();
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnswer, setEditingAnswer] = useState(null);
    const [editingQuestion, setEditingQuestion] = useState(null);
    // const [deletingAnswer, setDeletingAnswer] = useState()

    const navigate = useNavigate();

    useEffect(() => {
        fetchAnswers();
        fetchQuestion();
    }, [question_id]);

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

    const onEditAnswerClose = (isSuccess) => {
        if (isSuccess) {
            fetchAnswers();
        }

        // setDeletingAnswer(null); // bandau reloaudint
        setEditingAnswer(null);
    }

    const onEditQuestionClose = (isSuccess) => {
        if (isSuccess) {
            fetchQuestion();
        }
        setIsModalOpen(false)
        setEditingQuestion(null);
    }

    // DELETE ANSWER RELOAD

    // const onDeleteAnswerClose = (isSuccess) => {
    //     if (isSuccess) {
    //         fetchAnswers();
    //     }
    //     setIsModalOpen(false)
    //     setEditingQuestion(null);
    // }

    // DELETE QUESTION

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:3000/questions/${question.uuid}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            const data = await res.json();

            console.log("Delete response:", data);

            if (res.ok) {
                toast.success("Klausimas sėkmingai ištrintas!");
                // onClose(true); // uždaro modalą ir informuoja apie sėkmę
                navigate('/');
            } else {
                toast.error("Nepavyko ištrinti klausimo: " + data.message);
                onClose(false);
            }

        } catch (error) {
            console.error('Klaida trynimo metu:', error);
            toast.error('Įvyko tinklo klaida');
            // onClose(false);
        }
    };

    const handleDeleteAnswer = async (index) => {
        try {
            const res = await fetch(`http://localhost:3000/answers/${answers[index].uuid}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Atsakymas sėkmingai ištrintas!");
                fetchAnswers();
            } else {
                toast.error("Nepavyko ištrinti atsakymo: " + data.message);
            }

        } catch (error) {
            toast.error("Įvyko tinklo klaida");
            console.error(error);
        }
    };

    return (
        <div className="single-question-container">
            <button className="back-button" onClick={() => window.history.back()}>
                ← Back to Home
            </button>

            <div className="question-header">
                <span className="question-user">👤 {question.username}</span>
                <div className="question-actions">
                    <button className="action-button" onClick={() => setIsModalOpen(true)}>Update</button>
                    <button className="action-button" onClick={() => handleDelete}>Delete</button>
                </div>
            </div>

            <h2 className="question-title">{question.title}</h2>

            <p className="question-content">{question.content}</p>

            {/*TODO pataisyt, nes neveikia*/}

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
                        //answer.updated_at === undefined || null

                        <div key={index} className="answer">
                            <p className="answer-content">{answer.content}</p>
                            <p className="answer-user">👤 {answer.username}</p>
                            <div className="answer-actions">
                                <button className="answer-button" onClick={() => setEditingAnswer(answer)}>
                                    Update
                                </button>
                                <button className="answer-button" onClick={() => handleDeleteAnswer(index)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <EditQuestionModal
                isOpen={isModalOpen}
                onClose={onEditQuestionClose}
                question={question}
            />
            {editingAnswer && (
                <EditAnswerModal
                    answer={editingAnswer}
                    onClose={onEditAnswerClose}
                />
            )}
        </div>
    )
}
export default SingleQuestion
