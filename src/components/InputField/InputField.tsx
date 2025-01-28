import React, { ReactElement } from "react";
import { Typography } from "@mui/material";
import { useThemeColors } from "../../utils/hooks/useThemeColors";
import { useThemeIcons } from "../../utils/hooks/useThemeIcons";
import ErrorBox from "../ErrorBox/ErrorBox";

interface InputFieldProps {
  type?: "text" | "password" | "email" | "number" | "date" | "datetime-local";
  label?: string;
  placeholder?: string;
  value: string | string[];
  setValue: (value: string) => void;
  error?: {
    message: string;
  } | null;
  iconStart?: ReactElement;
  iconStartPositionFromTop?: number;
  iconEndPositionFromTop?: number;
  iconEnd?: ReactElement;
  isPasswordField?: boolean;
  labelTextColor?: string;
  inputFieldBgColor?: string;
  inputFieldPlaceholderColor?: string;
  inputFieldStyles?: React.CSSProperties;
  isDisabled?: boolean;
}

const InputField = ({
  label,
  placeholder,
  value,
  setValue,
  error,
  iconStart,
  iconEnd,
  isPasswordField,
  labelTextColor,
  inputFieldBgColor,
  inputFieldPlaceholderColor,
  iconStartPositionFromTop,
  iconEndPositionFromTop,
  inputFieldStyles,
  isDisabled,
  type,
}: InputFieldProps) => {
  const { themePrimaryColor, redColor, themeSecondaryColor } = useThemeColors();
  const { EyeIcon, EyeSlashIcon } = useThemeIcons();
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div
      className="input-field-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "10px",
        width: 280,
      }}
    >
      {label && (
        // <CustomText
        //   title={label}
        //   style={{ fontSize: "16px", color: labelTextColor || secondaryColor }}
        // />
        <Typography
          className="fw400 fs14"
          color={labelTextColor || themeSecondaryColor}
        >
          {label}
        </Typography>
      )}
      <div
        className="input-wrapper"
        style={{ position: "relative", width: "100%" }}
      >
        <input
          type={
            type ? type : isPasswordField && !showPassword ? "password" : "text"
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            color: themeSecondaryColor,
            backgroundColor: "#F5F6FA",
            paddingLeft: iconStart ? 50 : 15,
            paddingRight: iconEnd ? 50 : 15,
            paddingTop: 15,
            paddingBottom: 15,
            borderRadius: "10px",
            border: "1px solid #E0E0E0",
            width: "90%",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0.5px",
            ...inputFieldStyles,
          }}
          disabled={isDisabled}
        />
        {iconStart && (
          <div
            style={{
              position: "absolute",
              left: 15,
              top: iconStartPositionFromTop ? iconStartPositionFromTop : "97px",
              transform: "translateY(-50%)",
            }}
          >
            {iconStart}
          </div>
        )}
        {iconEnd && (
          <div
            style={{
              position: "absolute",
              right: 15,
              top: iconEndPositionFromTop ? iconEndPositionFromTop : "97px",
              transform: "translateY(-50%)",
            }}
          >
            {iconEnd}
          </div>
        )}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 15,
              top: "20px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showPassword ? EyeSlashIcon : EyeIcon}
          </button>
        )}
      </div>
      {error && (
        <ErrorBox
          errorMessage={error?.message || ""}
          errorTextStyle={{ fontSize: "13px", color: redColor }}
        />
      )}
    </div>
  );
};

export default InputField;
