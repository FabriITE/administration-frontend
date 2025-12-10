import readXlsxFile from "read-excel-file";
import { useDispatch, useSelector } from "react-redux";
import { uploadClients } from "../utils/api";
import { errorAlert, successAlert } from "./alerts/alerts";

export default function ExcelReader() {
  const dispatch = useDispatch();
  function normalizePrice(value) {
    if (value === null || value === undefined) return null;

    let num = Number(String(value).replace(/[^\d.-]/g, ""));

    if (Number.isInteger(num) && num >= 1000) {
      return num / 100;
    }

    return num;
  }

  const uploadClientsFromExcel = async (list) => {
    try {
      await uploadClients({ clients_list: list });
      successAlert("Clientes cargados correctamente", "colored");
    } catch {
      errorAlert("Error al cargar los clientes", "colored");
    }
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    readXlsxFile(file)
      .then((rows) => {
        const clients = rows.map((row, index) => {
          if (index !== 0) {
            let client = {
              name: row[0],
              san: row[1],
              start_date: row[2],
              invoice_date: row[3],
              payment_date: row[4],
              suspension_date: row[5],
              monthly_payment: normalizePrice(row[6]),
              is_paid: ["si", "sí"].includes(String(row[7]).toLowerCase()),
              notes: row[8],
            };
            if (client.san === null) {
              return;
            }
            return client;
          }
          return;
        });
        uploadClientsFromExcel(clients);
      })
      .catch((error) => {
        console.log(error);
        console.error(
          "Error al leer el archivo Excel, verifica si este tiene el formato solicitado"
        );
      });
  };

  return (
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleFileUpload}
      id="excelPicker"
    />
  );
}
