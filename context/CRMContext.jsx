import { useState, createContext } from "react";

const CRMContext = createContext([{}, () => {}]);

export const CRMProvider = ({ children }) => {
  //definir el state inicial
  const [auth, guardarToken] = useState({
    token: "",
    auth: false,
  });

  return (
    <CRMContext.Provider value={[auth, guardarToken]}>
      {children}
    </CRMContext.Provider>
  );
};

export default CRMContext;
