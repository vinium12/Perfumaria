import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'; 
import styles from './Input.module.css';

const EyeIcon = ({ onClick, isVisible }) => (
    <span 
        className={styles.passwordToggle} 
        onClick={onClick}
        aria-label={isVisible ? "Esconder senha" : "Mostrar senha"}
    >
        {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
    </span>
);

const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    ...rest
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const inputType = 
        type === 'password' && isPasswordVisible 
            ? 'text' 
            : type;

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    return (
        <div className={styles.inputGroup}>
            {label && <label htmlFor={name} className={styles.label}>{label}</label>}
            
            <div className={styles.inputWrapper}>
                <input 
                    type={inputType}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || `Digite seu ${label || 'valor'}`}
                    className={styles.inputField}
                    {...rest}
                />
                
                {type === 'password' && (
                    <EyeIcon 
                        onClick={togglePasswordVisibility}
                        isVisible={isPasswordVisible}
                    />
                )}
            </div>
        </div>
    );
};

export default Input;
