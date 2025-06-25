import React from "react";
import EditedSymbol from "../EditedSymbol.jsx";

const Answers = ({
                        user,
                        answers,
                        answerContent,
                        setAnswerContent,
                        handleAddAnswer,
                        setEditingAnswer,
                        handleDeleteAnswer,
                    }) => {
    return (
        <div className="answers-section">
            <h3 className="answers-title">Answers</h3>

            {user && (
                <div className="answer-form">
                    <textarea
                        placeholder="Enter your answer..."
                        className="answer-input"
                        value={answerContent}
                        onChange={(e) => setAnswerContent(e.target.value)}
                    />
                    <button className="submit-button" onClick={handleAddAnswer}>
                        Submit
                    </button>
                </div>
            )}

            {(!answers || answers.length === 0) ? (
                <p className="no-answers">This question has no answers yet.</p>
            ) : (
                answers.map((answer, index) => (
                    <div key={index} className="answer">
                        <EditedSymbol isNotEdited={answer.updated_at === null} />
                        <p className="answer-content">{answer.content}</p>
                        <p className="answer-user">👤 {answer.username}</p>

                        {user && user.uuid === answer.user_uuid && (
                            <div className="answer-actions">
                                <button className="answer-button" onClick={() => setEditingAnswer(answer)}>
                                    Update
                                </button>
                                <button className="answer-button" onClick={() => handleDeleteAnswer(answer.uuid)}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Answers;