import React from "react";
import EditedSymbol from "../EditedSymbol.jsx";

const QuestionHeader = ({ question, user, onEdit, onDelete }) => {
    return (
        <div className="question-header">
            <span className="question-user">👤 {question.username}</span>
            <EditedSymbol isNotEdited={question.updated_at === null} />
            {user && user.uuid === question.user_uuid && (
                <div className="question-actions">
                    <button className="action-button" onClick={onEdit}>Update</button>
                    <button className="action-button" onClick={onDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default QuestionHeader;