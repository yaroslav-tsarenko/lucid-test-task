import React, { useState, useEffect, useRef } from 'react';
import FormulasIcon from "../../assets/icons/formulas-icon.jpg";
import "./FormulasComponent.css";
import {BsThreeDots} from "react-icons/bs";
import {BsFillInfoCircleFill} from "react-icons/bs";
import {GoTriangleRight} from "react-icons/go";
import { useStore } from "../../local-storage/store";
import { IoClose } from "react-icons/io5";
import { FcCheckmark } from "react-icons/fc";
import { useAutocompleteSuggestions } from '../../custom-hook/useAutoCompleteSuggestions';

type State = {
    formulaContainers: any[];
    addFormulaContainer: any;
};

const FormulasComponent = () => {
    const formulaContainers = useStore((state: State) => state.formulaContainers);
    const addFormulaContainer = useStore((state: State) => state.addFormulaContainer);
    const [activeFormulaContainerIndex, setActiveFormulaContainerIndex] = useState<number | null>(null);
    const [expandedStates, setExpandedStates] = useState(new Array(formulaContainers.length).fill(false));
    const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { data: autocompleteSuggestions } = useAutocompleteSuggestions(inputValue);
    const [inputValues, setInputValues] = useState<string[]>(new Array(formulaContainers.length).fill(''));
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleExpand = (index: number) => {
        const newExpandedStates = [...expandedStates];
        newExpandedStates[index] = !newExpandedStates[index];
        setExpandedStates(newExpandedStates);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputFocus = (index: number) => {
        setActiveFormulaContainerIndex(index);
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
        setActiveFormulaContainerIndex(null);
        setTimeout(() => setShowSuggestions(false), 200);
    };

    const handleSuggestionClick = (suggestion: string) => {
        const cursorPosition = inputRef.current?.selectionStart || 0;
        const newValue = [inputValue.slice(0, cursorPosition), suggestion, inputValue.slice(cursorPosition)].join('');
        setInputValue(newValue);
        setShowSuggestions(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
        } else if (event.key === 'Enter') {
        }
    };

    useEffect(() => {
    }, [inputValue]);

    return (
        <div className="formulas-container">
            <div className="formulas-header">
                <section>
                    <img src={FormulasIcon} alt="Formulas Icon" width="16" height="16"/>
                    Formulas({formulaContainers.length})
                </section>
                <button onClick={() => addFormulaContainer({name: 'New Name', description: 'New Description'})}>+
                </button>
            </div>
            <div className="formulas-container-content">
                {formulaContainers.map((formulaContainer: any, index: number) => (
                    <div className="formula-container" key={index}>
                        <div className="formula-container-header-upper">
                            <section>
                                <GoTriangleRight className={`nav-icon-arrow ${expandedStates[index] ? 'rotated' : ''}`}
                                                 onClick={() => toggleExpand(index)}/>
                            </section>
                            <section>
                                <BsFillInfoCircleFill
                                    className="nav-icon"
                                    onClick={() => setTooltipIndex(tooltipIndex === index ? null : index)}
                                />
                                {tooltipIndex === index && <div className="tooltip">
                                    <input type="text"/>
                                    <button><FcCheckmark/></button>
                                    <button><IoClose onClick={() => setTooltipIndex(null)} /></button>
                                </div>}
                                <BsThreeDots className="nav-icon"/>
                            </section>
                        </div>
                        <div className="formula-container-header-inner" style={{borderRadius: expandedStates[index] ? '0' : '10px'}}>
                            <p>0</p>
                            <button>Aug 2024</button>
                        </div>
                        {expandedStates[index] && (
                            <div className="formula-container-content">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => handleInputFocus(index)}
                                    onBlur={handleInputBlur}
                                    ref={inputRef}
                                />
                                {showSuggestions && activeFormulaContainerIndex === index && (
                                    <div className="autocomplete-suggestions">
                                        {autocompleteSuggestions?.map((suggestion: any, index: number) => (
                                            <div key={index} onClick={() => handleSuggestionClick(suggestion.name)}>
                                                <p>{suggestion.name}</p>
                                                <p>{suggestion.category}</p>
                                                <p>{suggestion.id}</p>
                                                <p>{suggestion.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <section>
                                    <button>+ Add Time Segment</button>
                                </section>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormulasComponent;