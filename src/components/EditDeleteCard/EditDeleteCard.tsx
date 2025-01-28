import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

type PropsType = {
  onClickEdit?: () => void;
  onClickDelete: () => void;
  showEdit?: boolean;
  showDelete?: boolean;
};

const EditDeleteCard = ({
  onClickDelete,
  onClickEdit,
  showEdit = true,
  showDelete = true,
}: PropsType) => {
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
        marginTop: "10px",
      }}
    >
      {showEdit && (
        <Edit
          sx={{
            width: 15,
            cursor: "pointer",
            color: "blue",
            border: "1px solid blue",
            borderRadius: "5px",
            padding: "0px 5px",
          }}
          onClick={onClickEdit}
        />
      )}
      <ConfirmationModal
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
        onYes={onClickDelete}
        title="Are you sure you want to delete?"
      />
      {showDelete && (
        <Delete
          sx={{
            width: 15,
            cursor: "pointer",
            color: "red",
            border: "1px solid red",
            borderRadius: "5px",
            padding: "0px 5px",
          }}
          onClick={() => setOpenConfirmModal(true)}
        />
      )}
    </div>
  );
};

export default EditDeleteCard;
