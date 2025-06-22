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
        newParams.set('page', 1);
        setSearchParams(newParams);
    };

    return (
        <section className="filter-container">
            <div className="filter-group">
                <label htmlFor="status-filter">Atsakymai</label>
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
                    <option value="all">Visi</option>
                    <option value="answered">Atsakyti</option>
                    <option value="unanswered">Neatsakyti</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="title-filter">Pavadinimas</label>
                <input
                    type="text"
                    id="title-filter"
                    value={searchParams.get('name') || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Ieškoti pavadinimo..."
                />
            </div>

            <div className="filter-group">
                <label htmlFor="tag-filter">Tema / Tag</label>
                <input
                    type="text"
                    id="tag-filter"
                    value={searchParams.get('tag') || ''}
                    onChange={(e) => handleChange('tag', e.target.value)}
                    placeholder="pvz. anime, veiksmas..."
                />
            </div>

            <div className="filter-group">
                <label htmlFor="sort-date">Data</label>
                <select
                    id="sort-date"
                    value={searchParams.get('sort_by_date') || 'ASC'}
                    onChange={(e) => handleChange('sort_by_date', e.target.value)}
                >
                    <option value="DESC">Naujausi</option>
                    <option value="ASC">Seniausi</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="sort-answers">Atsakymų skaičius</label>
                <select
                    id="sort-answers"
                    value={searchParams.get('answers_count') || 'ASC'}
                    onChange={(e) => handleChange('answers_count', e.target.value)}
                >
                    <option value="DESC">Daugiausia</option>
                    <option value="ASC">Mažiausia</option>
                </select>
            </div>
        </section>
    );
};

export default QuestionFilter;