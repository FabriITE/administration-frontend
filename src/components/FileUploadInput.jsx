import React, { useState, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FileCard from "./FileCard";
import { uploadFile } from "../utils/api";

async function uploadFileToSharePoint(file, type, destinyFolder) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("destiny_folder", destinyFolder);
    const response = await uploadFile(formData);
    return response.data;
  } catch (error) {
    console.error("Error subiendo archivo:", error);
    return null;
  }
}

export default function FileUploadInput({
  files,
  setFiles,
  filesType,
  setFilesToDelete,
  destinyFolder,
}) {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = async (file) => {
    let newFile = {};
    if (destinyFolder) {
      newFile = {
        file,
        file_name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        uploading: true,
        file_url: "",
        record_type: destinyFolder,
      };
    } else {
      newFile = {
        file,
        file_name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        uploading: true,
        file_url: "",
      };
    }

    setFiles((prev) => [...prev, newFile]);

    const url = await uploadFileToSharePoint(file, filesType, destinyFolder);
    setFiles((prev) =>
      prev.map((f) =>
        f.file === file
          ? { ...f, uploading: false, folder: url.folder, file_url: url.url }
          : f
      )
    );
  };

  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      await processFile(selectedFiles[i]);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDragging(false);

    const droppedFiles = event.dataTransfer.files;
    for (let i = 0; i < droppedFiles.length; i++) {
      await processFile(droppedFiles[i]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDelete = (file) => {
    setFilesToDelete((prev) => [...prev, file]);
    setFiles((prev) => prev.filter((f) => f.file_name !== file.file_name));
  };

  return (
    <Box sx={{ p: 1 }}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Box
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          mt: 2,
          p: 4,
          border: "2px dashed",
          borderColor: dragging ? "primary.main" : "grey.400",
          borderRadius: 2,
          textAlign: "center",
          transition: "0.2s",
          backgroundColor: dragging ? "action.hover" : "transparent",
          cursor: "pointer",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Arrastre y suelte archivos aquí o haga clic para seleccionarlos
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2, display: "flex" }}>
        {files.map((f, index) => (
          <FileCard
            handleDelete={handleDelete}
            file={f}
            index={index}
            type={"uploaded"}
          />
        ))}
      </Grid>
    </Box>
  );
}
