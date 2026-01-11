
import React from "react";
import { Alert } from "react-bootstrap";

function formatChild(child) {
  if (child === null || child === undefined) return "";
  if (typeof child === "string" || typeof child === "number") return child;
  if (React.isValidElement(child)) return child;
  if (Array.isArray(child)) return child;
  if (typeof child === "object") {
    if (child.data && typeof child.data === 'string') return child.data;
    if (child.data && child.data.message) return child.data.message;
    if (child.message) return child.message;
    if (child.error) return child.error;
    try {
      return JSON.stringify(child);
    } catch {
      return String(child);
    }
  }
  return String(child);
}

export default function Message({ variant, children }) {
  return (
    <Alert variant={variant}>
      {formatChild(children)}
    </Alert>
  );
}

Message.defaultProps = {
  variant: 'info',
};
