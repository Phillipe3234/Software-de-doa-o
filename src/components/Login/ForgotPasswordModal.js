import React, { useState, useRef, useEffect } from 'react';
import './ForgotPasswordModal.css';
import { supabase } from '../../supabaseClient';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica se o clique foi fora do modal e não em nenhum elemento do modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      // Adiciona o evento com um pequeno delay para não capturar o clique que abriu o modal
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Focar no input quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      const inputElement = document.getElementById('email-input');
      if (inputElement) {
        setTimeout(() => {
          inputElement.focus();
        }, 150);
      }
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content forgot-modal" ref={modalRef}>
        <button 
          type="button"
          className="modal-close" 
          onClick={onClose}
        >
          ×
        </button>
        
        <h2>Recuperar Senha</h2>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}
          
          <p>Digite seu email para receber as instruções de recuperação de senha.</p>
          
          <input
            id="email-input"
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="forgot-input"
          />
          
          <button 
            type="submit" 
            className="forgot-button" 
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
