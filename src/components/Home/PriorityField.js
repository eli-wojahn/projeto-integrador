import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PriorityField = ({ id, initialValue }) => {
    const [text, setText] = useState(initialValue);

    const updatePriority = async () => {
        try {
            await axios.put(`http://localhost:3001/prioridades/${id}`, { nome: text });
        } catch (error) {
            console.error('Erro ao atualizar a prioridade:', error);
        }
    };

    useEffect(() => {
        if (initialValue !== text) {
            updatePriority();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <input
            type="text"
            value={text}
            onChange={(e) => {
                if (e.target.value.length <= 14) {
                    setText(e.target.value);
                }
            }}
            onBlur={updatePriority}
            maxLength={14}
            title="Customize aqui o nome da prioridade"
            style={{
                backgroundColor: '#f0f0f0',
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '16px',
                padding: '5px',
            }}
        />
    );
};

export default PriorityField;