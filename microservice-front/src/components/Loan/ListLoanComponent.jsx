import React, { useEffect, useState } from "react";
import { listLoan } from "../../services/LoanService";
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";
import ReturnLoanOptions from "./ReturnLoanOptions";

export const ListLoanComponent = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const { keycloak } = useKeycloak();
  const userEmail = keycloak?.tokenParsed?.email;
  const navigator = useNavigate();

  useEffect(() => {
    loadLoans();
  }, []);

  function loadLoans() {
    listLoan()
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar préstamos:", error);
      });
  }

  function handleFinalizeClick(idLoan) {
    // Verificación de seguridad para depuración
    console.log("ID de préstamo seleccionado:", idLoan);
    setSelectedLoanId(idLoan);
    setShowOptions(true);
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Loans</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Loan id</th>
            <th>Delivery date</th>
            <th>Return date</th>
            <th>Client Rut</th>
            <th>Tool id</th>
            <th>Status</th>
            <th>Penalty</th>
            <th>Penalty total</th>
            <th>OverAll</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            // CAMBIO: Se usa loan.idLoan para coincidir con el backend
            <tr key={loan.idLoan}>
              <td>{loan.idLoan}</td>
              <td>{loan.deliveryDate}</td>
              <td>{loan.returnDate}</td>
              <td>{loan.clientRut}</td>
              <td>{loan.toolId}</td>
              <td>{loan.loanStatus ? "Active" : "Finished"}</td>
              <td>{loan.penalty ? "Penalized" : "Free"}</td>
              <td>{loan.penaltyTotal}</td>
              <td>{loan.priceToPay}</td>
              <td>
                {loan.loanStatus && (
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleFinalizeClick(loan.idLoan)}
                  >
                    Finalize loan
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showOptions && (
        <ReturnLoanOptions
          loanId={selectedLoanId}
          userEmail={userEmail}
          onClose={() => setShowOptions(false)}
          onSuccess={loadLoans}
        />
      )}
    </div>
  );
};

export default ListLoanComponent;