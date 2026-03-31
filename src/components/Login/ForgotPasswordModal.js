import React, { useState, useRef, useEffect } from 'react';
import './ForgotPasswordModal.css';
import { supabase } from '../../supabaseClient';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef(null);
<<<<<<< HEAD
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Pequeno delay para garantir que o modal abriu completamente
      setTimeout(() => {
        setIsModalOpen(true);
        // Focar no input automaticamente
        const inputElement = document.getElementById('email-input');
        if (inputElement) {
          inputElement.focus();
        }
      }, 50);
    } else {
      setIsModalOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Só verifica clique fora se o modal estiver completamente aberto
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
=======

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica se o clique foi fora do modal e não em nenhum elemento do modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
>>>>>>> 9923b36d47e1ea779ff5dfdbc900a4380bd4e2b8
        onClose();
      }
    };

<<<<<<< HEAD
    // Adiciona o evento apenas quando o modal estiver aberto
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
=======
    if (isOpen) {
      // Adiciona o evento com um pequeno delay para não capturar o clique que abriu o modal
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
>>>>>>> 9923b36d47e1ea779ff5dfdbc900a4380bd4e2b8
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
<<<<<<< HEAD
  }, [isModalOpen, onClose]);
=======
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
>>>>>>> 9923b36d47e1ea779ff5dfdbc900a4380bd4e2b8

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

<<<<<<< HEAD
  const handleModalClick = (e) => {
    // Impede que o clique no modal feche ele
    e.stopPropagation();
  };
=======
  if (!isOpen) return null;
>>>>>>> 9923b36d47e1ea779ff5dfdbc900a4380bd4e2b8

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleModalClick}>
      <div className="modal-content forgot-modal" ref={modalRef}>
        <button 
          type="button"
          className="modal-close" 
<<<<<<< HEAD
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
=======
          onClick={onClose}
>>>>>>> 9923b36d47e1ea779ff5dfdbc900a4380bd4e2b8
        >
          ×
        </button>
        
        <h2>Recuperar Senha</h2>
        
<<<<<<< HEAD
        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
=======
        <form onSubmit={handleSubmit}>
>>>>>>> 9923b36d47e1ea779ff5dfdbc900a4380bd4e2b8
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}
          
          <p>Digite seu email para receber as instruções de recuperação de senha.</p>
          
          <input
            id="email-input"
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            required
            className="forgot-input"
            autoFocus
          />
          
          <button 
            type="submit" 
            className="forgot-button" 
            disabled={loading}
<<<<<<< HEAD
            onClick={(e) => e.stopPropagation()}
=======
>>>>>>> 9923b36d47e1ea779ff5dfdbc900a4380bd4e2b8
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
