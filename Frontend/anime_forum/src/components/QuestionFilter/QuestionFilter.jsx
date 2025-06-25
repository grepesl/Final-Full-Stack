import React from 'react';
import './QuestionFilter.css';
import { useSearchParams } from 'react-router-dom';

const QuestionFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === '' || value === 'all') {
            newParams.delete(key);
        } else {
            newParams.set(key, value);
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    return (
        <section className="filter-container">
            <div className="filter-group">
                <label htmlFor="status-filter">Answers</label>
                <select
                    id="status-filter"
                    value={searchParams.get('is_answered') || 'all'}
                    onChange={(e) =>
                        handleChange(
                            'is_answered',
                            e.target.value === 'answered'
                                ? 'answered'
                                : e.target.value === 'unanswered'
                                    ? 'unanswered'
                                    : 'all'
                        )
                    }
                >
                    <option value="all">All</option>
                    <option value="answered">Answered</option>
                    <option value="unanswered">Not Answered</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="title-filter">Title</label>
                <input
                    type="text"
                    id="title-filter"
                    value={searchParams.get('name') || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Search for a title..."
                />
            </div>

            <div className="filter-group">
                <label htmlFor="tag-filter">Tema / Tag</label>
                <input
                    type="text"
                    id="tag-filter"
                    value={searchParams.get('tag') || ''}
                    onChange={(e) => handleChange('tag', e.target.value)}
                    placeholder="e.g. anime"
                />
            </div>

            <div className="filter-group">
                <label htmlFor="sort-questions">Sort by</label>
                <select
                    id="sort-questions"
                    value={searchParams.get('sorting_type') || 'date-desc'}
                    onChange={(e) => handleChange('sorting_type', e.target.value)}
                >
                    <option value="date-desc">Date: Latest</option>
                    <option value="date-asc">Date: The oldest</option>
                    <option value="answer-desc">Answers: Most</option>
                    <option value="answer-asc">Answers: Lowest</option>
                </select>
            </div>
        </section>
    );
};

export default QuestionFilter;