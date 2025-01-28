import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AppImages } from "../../assets/assets";
import IconCard from "../IconCard/IconCard";
import dayjs, { Dayjs } from "dayjs";
import { DateRangeStateType } from "../../utils/types/types";
import React from "react";

interface CustomDateRangeProps {
  dateRange: DateRangeStateType;
  setDateRange: React.Dispatch<React.SetStateAction<DateRangeStateType>>;
}

const CustomDateRange = ({ dateRange, setDateRange }: CustomDateRangeProps) => {
  const setDateRangeKey = (
    key: keyof DateRangeStateType,
    value: Dayjs | null
  ) => {
    setDateRange({
      ...dateRange,
      [key]: value,
    });
  };

  return (
    <Box
      className="flex fdr jc-c ai-c g20 px10 py10 br10"
      sx={{
        boxShadow: "5px 5px 5px #eaeaea",
        // border: "1px solid #e3e3e3",
        backgroundColor: "#fff",
      }}
    >
      <Box className="flex fdr jc-c ai-c g10">
        <IconCard
          image={AppImages.ClockIcon}
          backgroundColor={"rgba(255, 144, 102, 20%)"}
          className="p10 br35"
          size={15}
        />
        <Typography className="fw400 fs14">{"Select Duration"}</Typography>
      </Box>
      <Box
        className="flex fdr jc-c ai-c g15"
        sx={{
          border: "1px solid #e3e3e3",
          borderRadius: 2,
          padding: "15px 10px 0px 10px",
          // backgroundColor: "#fff",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From Date"
            format="D MMM YYYY"
            sx={{
              width: 160,
              "& .MuiOutlinedInput-root": {
                border: "none",
                "& fieldset": {
                  border: "none", // Remove the input's border
                },
              },
              "& .MuiInputBase-input": {
                fontSize: 14,
                fontWeight: 400,
                paddingBottom: 1,
              },
            }}
            value={dateRange?.startDate ? dateRange?.startDate : null}
            onChange={(date) => setDateRangeKey("startDate", date)}
          />
        </LocalizationProvider>
        <Box
          className="flex fdr jc-c ai-c g5 br5 p5 px10"
          sx={{
            border: "1px solid #eaeaea",
            backgroundColor: "#eaeaea",
          }}
        >
          <Typography className="fw500 fs12">
            {`${
              dayjs(dateRange?.endDate).diff(dateRange?.startDate, "days") + 1
            } ${
              dayjs(dateRange?.endDate).diff(dateRange?.startDate, "days") +
                1 ===
              1
                ? "day"
                : "days"
            }`}
          </Typography>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="To Date"
            format="D MMM YYYY"
            sx={{
              width: 160,
              "& .MuiOutlinedInput-root": {
                border: "none",
                "& fieldset": {
                  border: "none", // Remove the input's border
                },
              },
              "& .MuiInputBase-input": {
                fontSize: 14,
                fontWeight: 400,
                paddingLeft: 2,
                paddingBottom: 1,
              },
            }}
            value={dateRange?.endDate ? dateRange?.endDate : null}
            onChange={(date) => setDateRangeKey("endDate", date)}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default CustomDateRange;
