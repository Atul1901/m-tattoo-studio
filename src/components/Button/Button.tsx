import React, { FC, ReactElement } from "react";

interface propTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  containerStyle?: React.CSSProperties;
  onPress?: () => void;
  iconPosition?: "start" | "end";
  icon?: ReactElement;
  childrenStyle?: React.CSSProperties;
  isLoading?: boolean;
  textStyle?: React.CSSProperties;
}

const Button: FC<propTypes> = ({
  title,
  containerStyle,
  onPress,
  icon,
  iconPosition,
  childrenStyle,
  isLoading,
  textStyle,
  ...rest
}) => {
  const containerStyleArray = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f0f0f0", // Replace with theme color if needed
    borderRadius: "12px",
    opacity: isLoading ? 0.5 : 1,
    width: "100%",
  };

  return (
    <button
      style={{
        ...containerStyleArray,
        ...containerStyle,
      }}
      onClick={onPress}
      {...rest}
    >
      {icon && iconPosition === "start" && <div>{icon}</div>}
      <div style={childrenStyle}>
        {!isLoading ? (
          <span style={{ color: "#333", letterSpacing: 0.5, ...textStyle }}>
            {title}
          </span>
        ) : (
          <div>
            <p>{"Loader"}</p>
          </div>
        )}
      </div>
      {icon && iconPosition === "end" && <div>{icon}</div>}
    </button>
  );
};

export default Button;
