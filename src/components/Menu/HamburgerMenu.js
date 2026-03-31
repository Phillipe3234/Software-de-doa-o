import React, { useState, useRef, useEffect } from 'react';
import './HamburgerMenu.css';

const HamburgerMenu = ({ setShowProfile, setShowHistory, setShowCompanyDonation, handleLogout, user, onUpdateProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editName, setEditName] = useState(user?.user_metadata?.name || '');
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && 
          buttonRef.current && !buttonRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focar no input quando o modal abrir
  useEffect(() => {
    if (showEditProfile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showEditProfile]);

  const handleSaveProfile = async () => {
    if (onUpdateProfile && editName.trim()) {
      await onUpdateProfile(editName.trim());
      setShowEditProfile(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveProfile();
    }
  };

  return (
    <>
      <button 
        ref={buttonRef}
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div ref={menuRef} className={`menu-content ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <div className="menu-user-info">
            <i className="fa-regular fa-circle-user"></i>
            <div className="user-info-text">
              <span className="welcome-text">Seja bem-vindo,</span>
              <span className="user-name">{user?.user_metadata?.name || 'Usuário'}!</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
        </div>
        
        <button className="menu-item" onClick={() => { 
          setShowEditProfile(true); 
          setEditName(user?.user_metadata?.name || '');
          setIsOpen(false);
        }}>
          <i className="fa-regular fa-pen-to-square"></i>
          <span>Editar Perfil</span>
        </button>
        
        <button className="menu-item" onClick={() => { setShowHistory(true); setIsOpen(false); }}>
          <i className="fa-regular fa-clock"></i>
          <span>Histórico de Doações</span>
        </button>
        
        <button className="menu-item" onClick={() => { setShowCompanyDonation(true); setIsOpen(false); }}>
          <i className="fa-regular fa-heart"></i>
          <span>Doar para Nossa Empresa</span>
        </button>

        <button className="menu-item">
          <i className="fa-regular fa-building"></i>  
          <span><a href="https://pmv-tech.github.io/Website-about-us/">Nossa empresa</a></span>
        </button>
        
        <button className="menu-item logout" onClick={handleLogout}>
          <i className="fa-regular fa-door-open"></i>
          <span>Sair</span>
        </button>
      </div>

      {/* Modal de edição de perfil */}
      {showEditProfile && (
        <div className="modal-overlay" onClick={() => setShowEditProfile(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Perfil</h3>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                value={user?.email || ''}
                disabled
                className="disabled-input"
              />
              <small className="email-hint">O email não pode ser alterado</small>
            </div>
            <div className="form-group">
              <label>Nome:</label>
              <input 
                ref={inputRef}
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={user?.user_metadata?.name || "Digite seu nome"}
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleSaveProfile} className="save-btn">
                Salvar
              </button>
              <button onClick={() => setShowEditProfile(false)} className="cancel-btn">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;