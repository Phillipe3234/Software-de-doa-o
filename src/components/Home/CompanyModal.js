import React, { useState, useEffect, useRef } from 'react';
import './CompanyModal.css';

const CompanyModal = ({ company, onClose, onDonate }) => {
  const [amount, setAmount] = useState('');
  const [showPix, setShowPix] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPix]);

  const handleConfirm = () => {
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      setShowPix(true);
    }
  };

  const copyPix = () => {
    navigator.clipboard.writeText(company.pix);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFinalize = () => {
    onDonate(company, parseFloat(amount));
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!showPix) {
        handleConfirm();
      } else {
        handleFinalize();
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {!showPix ? (
          <>
            <h2>Doar para {company.name}</h2>
            <p className="company-description">{company.description}</p>
            <p className="amount-label">Digite o valor da doação:</p>
            <div className="amount-input-wrapper">
              <span className="currency">R$</span>
              <input
                ref={inputRef}
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="0,00"
                className="amount-input"
                autoFocus
              />
            </div>
            <button 
              onClick={handleConfirm}
              onKeyPress={handleKeyPress}
              disabled={!amount || parseFloat(amount) <= 0}
              className="confirm-button"
            >
              Confirmar
            </button>
          </>
        ) : (
          <>
            <h2>Doação para {company.name}</h2>
            <div className="success-icon">
              <i className="fa-regular fa-circle-check"></i>
            </div>
            <p className="amount-display">R$ {parseFloat(amount).toFixed(2)}</p>
            <div className="pix-container">
              <p className="pix-label">Chave PIX:</p>
              <div className="pix-code">
                <span>{company.pix}</span>
                <button onClick={copyPix} className="copy-button">
                  <i className={`fa-regular ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
            <p className="pix-instruction">
              Após realizar o PIX, clique em "Finalizar Doação" para registrar.
            </p>
            <button 
              onClick={handleFinalize} 
              onKeyPress={handleKeyPress}
              className="finalize-button"
            >
              Finalizar Doação
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyModal;