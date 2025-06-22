import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import './SingleQuestion.css';
import EditQuestionModal from "../components/EditQuestionModal/EditQuestionModal.jsx";
import EditAnswerModal from '../components/EditAnswerModal/EditAnswerModal.jsx';
import { useNavigate } from 'react-router-dom';
import EditedSymbol from "../components/EditedSymbol.jsx";
import {deleteQuestion, getQuestionsById} from "../services/questionService.js";
import {createAnswer, deleteAnswer, getAnswersByQuestion} from "../services/answerService.js";

const SingleQuestion = () => {
    const { question_id } = useParams();
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnswer, setEditingAnswer] = useState(null);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [answerContent, setAnswerContent] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchAnswers();
        fetchQuestion();
    }, [question_id]);

    const fetchQuestion = async () => {
        const response = await getQuestionsById(question_id);
        console.log(response);
        if (response.status === 200) {
            setQuestion(response.question);
        }
    };

    const fetchAnswers = async () => {
        const response = await getAnswersByQuestion(question_id);
        if (response.status === 200) {
            setAnswers(response.answers);
        }
    };

    const onEditAnswerClose = (isSuccess) => {
        if (isSuccess) {
            fetchAnswers();
        }
        setEditingAnswer(null);
    }

    const onEditQuestionClose = (isSuccess) => {
        if (isSuccess) {
            fetchQuestion();
        }
        setIsModalOpen(false)
        setEditingQuestion(null);
    }

    // DELETE QUESTION

    const handleDelete = async () => {
        const response = await deleteQuestion(question.uuid);
        if (response.status === 200) {
            navigate('/')
        }
    };

    const handleDeleteAnswer = async (index) => {
        const response = await deleteAnswer(answers[index].uuid);
        if (response.status === 200) {
            await fetchAnswers();
        }
    };

    const handleAddAnswer = async () => {
        const response = await createAnswer(question_id, answerContent);
        if (response.status === 200) {
            await fetchAnswers();
            setAnswerContent('');
        }
    };

    return (
        <div className="single-question-container">
            <button className="back-button" onClick={() => window.history.back()}>
                ← Back to Home
            </button>

            <div className="question-header">
                <span className="question-user">👤 {question.username}</span>
                <EditedSymbol isNotEdited={question.updated_at === null} />
                <div className="question-actions">
                    <button className="action-button" onClick={() => setIsModalOpen(true)}>Update</button>
                    <button className="action-button" onClick={handleDelete}>Delete</button>
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
                    <textarea placeholder="Įvesk atsakymą..." className="answer-input" value={answerContent} onChange={(e) => setAnswerContent(e.target.value)}></textarea>
                    <button className="submit-button" onClick={handleAddAnswer}>Submit</button>
                </div>

                {(answers === undefined || answers.length === 0) ? (
                    <p className="no-answers">Šis klausimas kol kas neturi atsakymų.</p>
                ) : (
                    answers.map((answer, index) => (

                        <div key={index} className="answer">
                            <EditedSymbol isNotEdited={answer.updated_at === null} />
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
