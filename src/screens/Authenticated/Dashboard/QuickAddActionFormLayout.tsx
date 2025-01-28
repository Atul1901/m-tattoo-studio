import { ArrowBack } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBox } from "../../../components";
import IconCard from "../../../components/IconCard/IconCard";
import InputField from "../../../components/InputField/InputField";
import { useThemeColors } from "../../../utils/hooks/useThemeColors";
import {
  ErrorType,
  Field,
  QuickAddActionFormValuesType,
} from "../../../utils/types/types";
import { constants } from "../../../utils/constants/constants";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";

type PropsType = {
  title: string;
  buttonTitle: string;
  onPrimaryButtonClick: () => void;
  fields: Field[];
  formValues: QuickAddActionFormValuesType;
  setFormValues: React.Dispatch<
    React.SetStateAction<QuickAddActionFormValuesType>
  >;
  image?: string;
  backgroundColor?: string;
  handleInputChange: (
    key: string,
    value: string | string[],
    field: string
  ) => void;
  errors?: ErrorType;
  loading?: boolean;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const QuickAddActionFormLayout = ({
  title,
  buttonTitle,
  onPrimaryButtonClick,
  fields,
  formValues,
  setFormValues,
  image,
  backgroundColor,
  handleInputChange,
  errors,
  loading,
}: PropsType) => {
  const navigate = useNavigate();
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const { themePrimaryColor, primary, themeSecondaryColor, redColor } =
    useThemeColors();

  return (
    <Box className="flex fdc ai-fs jc-fs g25 py15 h-auto fullW">
      <Box className="flex fdc ai-fs jc-fs g20 fullW">
        <Box className="flex fdr fwr jc-c ai-c g10">
          <Avatar
            sx={{ width: 24, height: 24, cursor: "pointer" }}
            onClick={() => navigate(-1)}
          >
            <ArrowBack sx={{ width: 16 }} />
          </Avatar>
          <Typography variant="h6" className="fw500">
            {title}
          </Typography>
        </Box>
        <Box
          className="flex fdc jc-c ai-c br10 g30 py20 fullW"
          sx={{
            backgroundColor: themePrimaryColor,
            boxShadow: "2px 2px 5px #eaeaea",
          }}
        >
          <IconCard
            image={image || ""}
            size={25}
            backgroundColor={
              backgroundColor || constants.colors.customerBgColor
            }
            className="p15 br35"
          />

          <div
            className="flex fdr fwr jc-c ai-c g30 pb20  "
            style={{ width: "75%", display: "flex", gap: "30px" }}
          >
            {fields
              ?.filter(
                (field) => !field.isSelectable && !field.isMultiSelectable
              )
              ?.map((field, index) => (
                <InputField
                  key={index}
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={
                    formValues[field.name as keyof typeof formValues] || ""
                  }
                  setValue={(value) =>
                    handleInputChange(field.name, value, field?.label || "")
                  }
                  isPasswordField={field.isPasswordField}
                  inputFieldBgColor={field.inputFieldBgColor}
                  inputFieldPlaceholderColor={field.inputFieldPlaceholderColor}
                  inputFieldStyles={field.inputFieldStyles}
                  error={{ message: errors?.[field.name]?.message || "" }}
                  isDisabled={field?.isDisabled}
                />
              ))}
            {fields
              ?.filter((field) => field.isSelectable || field.isMultiSelectable)
              ?.map((field, index) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "10px",
                    width: 280,
                  }}
                >
                  {field?.label && (
                    <Typography
                      className="fw400 fs14"
                      color={themeSecondaryColor}
                    >
                      {field.label}
                    </Typography>
                  )}
                  <Select
                    className="fs14"
                    autoWidth
                    sx={{
                      width: "100%",
                      height: 45,
                      borderRadius: "10px",
                      backgroundColor: "#F5F6FA",
                      marginBottom: "10px",
                    }}
                    value={
                      formValues[field.name as keyof typeof formValues] || ""
                    }
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      handleInputChange(
                        field.name,
                        e.target.value,
                        field?.label || ""
                      );
                    }}
                    renderValue={(selected) =>
                      typeof selected !== "string"
                        ? selected
                            ?.map(
                              (s) =>
                                field?.options?.find(
                                  (option) => option.value === s
                                )?.label
                            )
                            .join(", ")
                        : field?.options?.find(
                            (option) => option.value === selected
                          )?.label
                    }
                    multiple={field.isMultiSelectable}
                    MenuProps={MenuProps}
                    disabled={field?.isDisabled}
                  >
                    {field?.options?.map((option, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={option.value}
                          sx={{ width: 280, fontSize: 13 }}
                        >
                          <Checkbox
                            checked={
                              field.isMultiSelectable
                                ? formValues?.[
                                    field.name as keyof typeof formValues
                                  ]?.includes(option.value)
                                : formValues?.[
                                    field.name as keyof typeof formValues
                                  ] === option.value
                            }
                            size="small"
                          />
                          {option.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors?.[field.name] && (
                    <ErrorBox
                      errorMessage={errors?.[field.name]?.message || ""}
                      errorTextStyle={{ fontSize: "13px", color: redColor }}
                    />
                  )}
                </div>
              ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <ConfirmationModal
              onYes={onPrimaryButtonClick}
              openConfirmModal={openConfirmModal}
              setOpenConfirmModal={setOpenConfirmModal}
              title="Are you sure to submit ?"
            />
            <Button
              variant="contained"
              style={{ backgroundColor: primary, textTransform: "capitalize" }}
              onClick={() => setOpenConfirmModal(true)}
            >
              {buttonTitle}
            </Button>
            {loading && (
              <LinearProgress
                style={{ width: 170, color: "orange" }}
                color="primary"
              />
            )}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default QuickAddActionFormLayout;
