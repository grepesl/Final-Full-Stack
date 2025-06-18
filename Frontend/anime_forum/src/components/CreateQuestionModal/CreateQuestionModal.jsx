import { useState } from "react";
import "./CreateQuestionModal.css";

const CreateQuestionModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="padding-button">
            <button className="create-question-button" onClick={() => setIsOpen(true)}>
                ➕ Sukurti klausimą
            </button>

            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Sukurti naują klausimą</h2>
                        <input type="text" placeholder="Pavadinimas" />
                        <textarea placeholder="Klausimo turinys..."></textarea>
                        <input type="text" placeholder="Temos / tag'ai (atskirti kableliais)" />
                        <div className="modal-buttons">
                            <button className="submit-button">Pateikti</button>
                            <button className="cancel-button" onClick={() => setIsOpen(false)}>
                                Atšaukti
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateQuestionModal;
