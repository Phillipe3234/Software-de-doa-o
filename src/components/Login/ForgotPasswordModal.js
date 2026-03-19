import React, { useState, useRef, useEffect } from 'react';
import './ForgotPasswordModal.css';
import { supabase } from '../../supabaseClient';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });

      if (error) throw error;
      
      setMessage('Email de recuperação enviado! Verifique sua caixa de entrada.');
      setTimeout(() => onClose(), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content forgot-modal" ref={modalRef}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Recuperar Senha</h2>
        
        <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}
          
          <p>Digite seu email para receber as instruções de recuperação de senha.</p>
          
          <input
            ref={inputRef}
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="forgot-input"
          />
          
          <button type="submit" className="forgot-button" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;