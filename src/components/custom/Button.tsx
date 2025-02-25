// Definir ButtonProps
export interface ButtonProps {
  label: string;
  disabled?: boolean; // Esta propiedad debe ser opcional
}

// Componente Button
const Button: React.FC<ButtonProps> = ({ label, disabled = false }) => {
  return (
    <button
      className={`btn ${disabled ? "btn-disabled" : "btn-active"}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
