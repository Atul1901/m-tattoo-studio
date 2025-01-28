import React, { FC } from "react";
import { useThemeIcons } from "../../utils/hooks/useThemeIcons";

type ErrorBoxProps = {
  errorMessage: string;
  errorBoxStyle?: React.CSSProperties;
  errorTextStyle?: React.CSSProperties;
};

const ErrorBox: FC<ErrorBoxProps> = ({
  errorMessage,
  errorBoxStyle,
  errorTextStyle,
}) => {
  const { ShopIcon } = useThemeIcons();

  return (
    <div style={errorBoxStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* {ShopIcon} */}
        <span style={errorTextStyle}>{errorMessage}</span>
      </div>
    </div>
  );
};

export default ErrorBox;
