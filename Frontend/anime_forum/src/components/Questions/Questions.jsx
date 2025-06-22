import React, { useEffect, useState } from 'react';
import './Questions.css';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {safeRequest} from "../../utils/api.js";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);

            const params = new URLSearchParams(location.search);

            // Jei nėra puslapio, nustatom default
            if (!params.get('page')) params.set('page', currentPage);
            if (!params.get('limit')) params.set('limit', postsPerPage);

            const response = await safeRequest(
                `/questions?${params.toString()}`,
                'GET',
                null,
                null,
                false
            );

            if (response.status === 200) {
                setQuestions(response.questions);
                setTotalCount(response.totalCount);
            }

            setLoading(false);
        };

        fetchQuestions();
    }, [location.search]);

    const paginate = (pageNumber) => {
        const params = new URLSearchParams(location.search);
        params.set('page', pageNumber);
        setCurrentPage(pageNumber)
        navigate({ search: params.toString() });
    }

    return (
        <div>
            <h1 className="forum-title">All Questions</h1>
            <div className="questions-container">
                {questions.map((question) => (
                    <div className="question-card" key={question.id}>
                        <NavLink to={`/question/${question.uuid}`} className="question-title">
                            <h2>{question.title}</h2>
                        </NavLink>
                        <p className="question-snippet">
                            {question.content.substring(0, 500) + '...'}
                        </p>
                        <ul className="tag-list">
                            {question.tags.split(',').map((tag, index) => (
                                <li key={index} className="tag-item">{tag.trim()}</li>
                            ))}
                        </ul>
                        <div className="question-meta">
                            <span>👍 {question.likes_count}</span>
                            <span>💬 {question.answers_count}</span>
                            <span>👤 {question.username}</span>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                //filteredDataAmount={totalCount} // or total count if you have it
                filteredDataAmount={50}
                pageSize={postsPerPage}
                currentPage={currentPage}
                changePage={paginate}
            />
        </div>
    );
};

export default Questions;