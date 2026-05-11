"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type SnackbarContextType = {
  toast: (message: string, severity?: "success" | "error" | "warning" | "info") => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error" | "warning" | "info">("info");

  const toast = (msg: string, sev: "success" | "error" | "warning" | "info" = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ toast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={severity} onClose={handleClose} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useToast must be used within a SnackbarProvider");
  }
  return context;
};
