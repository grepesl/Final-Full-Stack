import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import './SingleQuestion.css';
import EditQuestionModal from "../../components/EditQuestionModal/EditQuestionModal.jsx";
import EditAnswerModal from '../../components/EditAnswerModal/EditAnswerModal.jsx';
import { useNavigate } from 'react-router-dom';
import {deleteQuestion, getQuestionsById} from "../../services/questionService.js";
import {createAnswer, deleteAnswer, getAnswersByQuestion} from "../../services/answerService.js";
import {useAuth} from "../../context/AuthContext.jsx";
import {addReaction, getUserReaction} from "../../services/likeService.js";
import QuestionHeader from "../../components/QuestionHeader/QuestionHeader.jsx";
import Answers from "../../components/Answers/Answers.jsx";

const SingleQuestion = () => {
    const { question_id } = useParams();
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnswer, setEditingAnswer] = useState(null);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [answerContent, setAnswerContent] = useState('');
    const [userVote, setUserVote] = useState(null);
    const {user} = useAuth()

    const navigate = useNavigate();

    const handleUpvote = async () => {
        const newVote = userVote === 'up' ? null : 'up';
        setUserVote(newVote);
        await addReaction(question_id, newVote === 'up' ? 1 : 0);
        await refreshQuestionLikes();
    };

    const handleDownvote = async () => {
        const newVote = userVote === 'down' ? null : 'down';
        setUserVote(newVote);
        await addReaction(question_id, newVote === 'down' ? -1 : 0);
        await refreshQuestionLikes();
    };

    useEffect(() => {
        fetchAnswers();
        fetchQuestion();
    }, [question_id]);

    const fetchQuestion = async () => {
        const response = await getQuestionsById(question_id);
        if (response.status === 200) {
            setQuestion(response.question);
        }
        await getLike();
    };

    const getLike = async () => {
        if (!user || user.uuid === null) {
            return;
        }

        const response = await getUserReaction(question_id);
        if (response.status === 200) {
            if (response.value === 1){
                setUserVote('up');
            }

            if (response.value === -1){
                setUserVote('down');
            }
        }
    }

    const refreshQuestionLikes = async () => {
        const response = await getQuestionsById(question_id);
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

    const handleDeleteQuestion = async () => {
        const response = await deleteQuestion(question.uuid);
        if (response.status === 200) {
            navigate('/')
        }
    };

    const handleDeleteAnswer = async (uuid) => {
        const response = await deleteAnswer(uuid);
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
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back to Home
            </button>

            <QuestionHeader
                question={question}
                user={user}
                onEdit={() => setIsModalOpen(true)}
                onDelete={handleDeleteQuestion}
            />

            <h2 className="question-title">{question.title}</h2>

            <p className="question-content">{question.content}</p>

            <ul className="question-tags">
                {(question.tags || '').split(",").map((tag, index) => (
                    <li key={index} className="tag">{tag.trim()}</li>
                ))}
            </ul>

            <div className={`question-meta ${!user ? 'disabled' : ''}`}>
                <div className="vote-box">
                    <i
                        className={`bi bi-caret-up-fill vote-icon upvote ${userVote === 'up' ? 'active' : ''}`}
                        onClick={user ? handleUpvote : undefined}
                    ></i>
                    <span className="vote-count">{question.likes_count ?? 0}</span>
                    <i
                        className={`bi bi-caret-down-fill vote-icon downvote ${userVote === 'down' ? 'active' : ''}`}
                        onClick={user ? handleDownvote : undefined}
                    ></i>
                </div>
                <span className="answers-count">💬 {question.answers_count}</span>
            </div>

            <Answers
                user={user}
                answers={answers}
                answerContent={answerContent}
                setAnswerContent={setAnswerContent}
                handleAddAnswer={handleAddAnswer}
                setEditingAnswer={setEditingAnswer}
                handleDeleteAnswer={handleDeleteAnswer}
            />
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