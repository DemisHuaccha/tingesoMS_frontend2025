import React from 'react';
import { returnLoan, returnLoanNotool, returnLoanLate } from '../../services/LoanService';

const ReturnLoanOptions = ({ loanId, userEmail, onClose, onSuccess }) => {
  
  const handleReturn = async (actionFunc) => {
    // Validamos que el ID no sea nulo antes de disparar la petición
    if (!loanId) {
      alert("Critical Error: Loan ID is missing.");
      return;
    }

    // El nombre de la clave 'loanId' debe ser idéntico al atributo en ReturnLoanDto.java
    const payload = { 
      loanId: loanId, 
      email: userEmail 
    };

    try {
      console.log("Enviando actualización de préstamo:", payload);
      await actionFunc(payload);
      onSuccess(); // Recarga la lista en el componente padre
      onClose();   // Cierra este cuadro de opciones
    } catch (error) {
      console.error("Error al actualizar préstamo:", error);
      alert("Error 500: Check backend logs for null ID or missing entities.");
    }
  };

  return (
    <div className="card p-3 mt-4 shadow-sm border-primary">
      <h5>Choose return status for loan #{loanId}</h5>
      <div className="d-flex gap-3 mt-2">
        <button className="btn btn-success" onClick={() => handleReturn(returnLoan)}>
          Tool returned successfully
        </button>
        <button className="btn btn-warning" onClick={() => handleReturn(returnLoanNotool)}>
          Tool needs repair
        </button>
        <button className="btn btn-secondary" onClick={() => handleReturn(returnLoanLate)}>
          Tool must be replaced
        </button>
        <button className="btn btn-outline-dark" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReturnLoanOptions;