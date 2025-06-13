import React, { useEffect, useState } from 'react';
import './Questions.css';
import {NavLink} from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import {toast} from "react-toastify";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    // const [selectedDateFrom, setSelectedDateFrom] = useState('');
    // const [selectedDateUntil, setSelectedDateUntil] = useState('');
    // const [inStock, setInStock] = useState(false);
    // const [sortOrder, setSortOrder] = useState('');
    //
    // const navigate = useNavigate();
    // const location = useLocation();

    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //
    //     // taking filtering values from link, to prevent filtering reset on page refresh
    //     setInStock(params.get('in_stock') === 'true');
    //     setSelectedDateFrom(params.get('date_from') || '');
    //     setSelectedDateUntil(params.get('date_until') || '');
    //     setSortOrder(params.get('sort_order') || '');
    // }, [location.search]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const params = new URLSearchParams();

            // Uncomment and add conditions as needed
            // if (inStock) params.set('in_stock', 'true');
            // if (selectedDateFrom) params.set('date_from', selectedDateFrom);
            // if (selectedDateUntil) params.set('date_until', selectedDateUntil);
            // if (sortOrder) params.set('sort_order', sortOrder);

            try {
                console.log(params.toString());

                const res = await fetch(`http://localhost:3000/questions?${params.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();
                setQuestions(data.questions);
                console.log(data);

            } catch (error) {
                console.error('Fetch klaida:', error);
                toast.error('Įvyko tinklo klaida');
            }
        };

        fetchQuestions();
    }, []); // Add dependencies like [inStock, selectedDateFrom, selectedDateUntil, sortOrder] if needed

    // const toggleInStock = (e) => {
    //     setInStock(e.target.checked);
    // };
    //
    // const toggleDateFrom = (e) => {
    //     setSelectedDateFrom(e.target.value);
    // };
    //
    // const toggleDateUntil = (e) => {
    //     setSelectedDateUntil(e.target.value);
    // };
    //
    // const handleSortChange = (e) => {
    //     setSortOrder(e.target.value);
    // };

    return (
        <div>

            {/*<label>Sort by rating: </label>*/}
            {/*<select>*/}
            {/*    <option value="" >Choose</option>*/}
            {/*    <option value="desc">High to Low</option>*/}
            {/*    <option value="asc">Low to High</option>*/}
            {/*</select>*/}

            {/*<h1>Welcome to NANI?! Forum, {users.username}!</h1>*/}

            <h1 className="forum-title">All Questions</h1>
            <div className="questions-container">
                {questions.map((question) => (
                    <div className="question-card" key={question.id}>
                        <div>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Questions;
