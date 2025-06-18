import React from 'react';
import './QuestionFilter.css';

const QuestionFilter = () => {
    return (
        <section className="filter-container">
            <div className="filter-group">
                <label htmlFor="status-filter">Atsakymai</label>
                <select id="status-filter">
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
                    placeholder="Ieškoti pavadinimo..."
                />
            </div>

            <div className="filter-group">
                <label htmlFor="tag-filter">Tema / Tag</label>
                <input
                    type="text"
                    id="tag-filter"
                    placeholder="pvz. anime, veiksmas..."
                />
            </div>

            <div className="filter-group">
                <label htmlFor="sort-date">Data</label>
                <select id="sort-date">
                    <option value="newest">Naujausi</option>
                    <option value="oldest">Seniausi</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="sort-answers">Atsakymų skaičius</label>
                <select id="sort-answers">
                    <option value="most">Daugiausia</option>
                    <option value="least">Mažiausia</option>
                </select>
            </div>
        </section>
    );
};

export default QuestionFilter;
