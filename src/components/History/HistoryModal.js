import React, { useRef, useEffect } from 'react';
import './HistoryModal.css';

const HistoryModal = ({ donations, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content history-modal" ref={modalRef}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Histórico de Doações</h2>
        
        {donations.length === 0 ? (
          <div className="empty-state">
            <i className="fa-regular fa-circle-xmark"></i>
            <p>Nenhuma doação encontrada.</p>
            <p className="empty-subtitle">Comece a doar para ver seu histórico aqui!</p>
          </div>
        ) : (
          <>
            <div className="donations-summary">
              <div className="summary-item">
                <span className="summary-label">Total de doações:</span>
                <span className="summary-value">{donations.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Valor total:</span>
                <span className="summary-value highlight">R$ {totalDonated.toFixed(2)}</span>
              </div>
            </div>
            <div className="donations-list">
              {donations.map((donation, index) => (
                <div key={index} className="donation-item">
                  <div className="donation-icon">
                    <i className="fa-regular fa-circle-check"></i>
                  </div>
                  <div className="donation-details">
                    <div className="donation-header">
                      <span className="company-name">{donation.company_name}</span>
                      <span className="donation-amount">R$ {donation.amount.toFixed(2)}</span>
                    </div>
                    <div className="donation-footer">
                      <span className="donation-date">
                        <i className="fa-regular fa-calendar"></i>
                        {formatDate(donation.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;