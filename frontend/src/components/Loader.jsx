
import { Spinner } from "react-bootstrap";


export default function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "120px",
        height: "120px",
        margin: "auto",
        display: "block",
      }}
    />
  );
};

