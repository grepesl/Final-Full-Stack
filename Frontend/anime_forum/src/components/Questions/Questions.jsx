import React, { useEffect, useState } from 'react';
import './Questions.css';
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination.jsx";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:3000/questions?page=${currentPage}&limit=${postsPerPage}`);

                const data = await res.json();

                console.log(data);

                setQuestions(data.questions);
                setTotalCount(data.totalCount);
            } catch (error) {
                console.error('Fetch klaida:', error);
                toast.error('Įvyko tinklo klaida');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
1