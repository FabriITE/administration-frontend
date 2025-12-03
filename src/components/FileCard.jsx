import {
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Tooltip,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import ArticleIcon from "@mui/icons-material/Article";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DescriptionIcon from "@mui/icons-material/Description";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ClipLoader } from "react-spinners";
import { errorAlert } from "./alerts/alerts";
import { downloadFile } from "../utils/api";

export default function FileCard({ handleDelete, file, index, type }) {
  const [downloading, setDownloading] = useState(false);

  const downloadUrl = async () => {
    try {
      setDownloading(true);
      const { data: link } = await downloadFile({
        folder: file.folder,
        filename: file.file_name,
      });

      if (link) {
        window.location.href = link;
      } else {
        console.error("No se recibió link de descarga");
      }
    } catch (error) {
      errorAlert("Error al descargar el archivo", "colored");
    } finally {
      setDownloading(false);
    }
  };

  // Determina color e ícono según extensión
  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    const iconStyles = {
      borderRadius: "8px",
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: 24,
    };

    switch (ext) {
      case "pdf":
        return (
          <Box sx={{ ...iconStyles, bgcolor: "#e53935" }}>
            <PictureAsPdfIcon fontSize="small" />
          </Box>
        );
      case "xls":
      case "xlsx":
        return (
          <Box sx={{ ...iconStyles, bgcolor: "#2e7d32" }}>
            <TableChartIcon fontSize="small" />
          </Box>
        );
      case "doc":
      case "docx":
        return (
          <Box sx={{ ...iconStyles, bgcolor: "#1565c0" }}>
            <ArticleIcon fontSize="small" />
          </Box>
        );
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return (
          <Box sx={{ ...iconStyles, bgcolor: "#43a047" }}>
            <ImageIcon fontSize="small" />
          </Box>
        );
      case "txt":
        return (
          <Box sx={{ ...iconStyles, bgcolor: "#6d4c41" }}>
            <InsertDriveFileIcon fontSize="small" />
          </Box>
        );
      default:
        return (
          <Box sx={{ ...iconStyles, bgcolor: "#757575" }}>
            <DescriptionIcon fontSize="small" />
          </Box>
        );
    }
  };

  return (
    <Paper
      key={index}
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        mb: 1,
        minHeight: 55,
        width: 240,
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "#f9f9f9",
          borderColor: "#cfcfcf",
        },
      }}
    >
      {/* Icono + Nombre */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
        {getFileIcon(file.file_name)}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Tooltip title={file.file_name}>
            <Typography
              variant="body2"
              noWrap
              sx={{
                fontWeight: 600,
                maxWidth: 110,
              }}
            >
              {file.file_name}
            </Typography>
          </Tooltip>
          <Typography variant="caption" color="text.secondary">
            {file.size} MB
          </Typography>
        </Box>
      </Box>

      {/* Acciones */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          justifyContent: "flex-end",
          minWidth: 80,
        }}
      >
        {file.uploading ? (
          <LinearProgress sx={{ width: 70 }} />
        ) : (
          <>
            {file.file_url && (
              <Tooltip title="Ver">
                <a
                  href={file.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#1b5e20",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  Ver
                </a>
              </Tooltip>
            )}

            {downloading ? (
              <ClipLoader size={"14px"} />
            ) : (
              <Tooltip title="Descargar">
                <IconButton size="small" onClick={downloadUrl}>
                  <FileDownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {type === "uploaded" && (
              <Tooltip title="Eliminar">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(file)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
}
