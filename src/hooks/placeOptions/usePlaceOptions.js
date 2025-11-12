import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllCantones,
  addCantones,
  addProvincias,
} from "../../features/filters/placesState";
import { getCantonesOptions, getProvinciaOptions } from "../../utils/api";

export const usePlaceOptions = ({ type }) => {
  const placesState = useSelector((state) => state.placesState);
  const dispatch = useDispatch();
  const [options, setOptions] = useState();

  const formatOptions = (data) => {
    if (type === "provincia") {
      setOptions(
        data.map((val) => {
          return {
            id: val["idProvincia"],
            label: val.provincia,
            value: val.provincia,
            idProvincia: val["idProvincia"],
          };
        })
      );
      return;
    }
    setOptions(
      data.map((val) => {
        return {
          id: val["idCanton"],
          label: val.canton,
          value: val.canton,
          fecha: "fecha y hora",
          idProvincia: val["idProvincia"],
          idCanton: val["idCanton"],
        };
      })
    );
  };

  const getOptions = async () => {
    switch (type) {
      case "provincia":
        if (placesState.provincias.length > 0) {
          formatOptions(placesState.provincias);
          break;
        }
        const provincias = await getProvinciaOptions();
        dispatch(addProvincias(provincias.data));
        formatOptions(provincias.data);
        break;

      case "canton":
        if (placesState.allCantones.length > 0) {
          formatOptions(
            placesState.cantones.length > 0
              ? placesState.cantones
              : placesState.allCantones
          );
          break;
        }
        const cantones = await getCantonesOptions();
        dispatch(addAllCantones(cantones.data));
        formatOptions(cantones.data);
        break;

      default:
        break;
    }
  };

  const filterCantonesOptions = ({ idProvincia }) => {
    const filterdCantones = placesState.allCantones.filter(
      (canton) => canton.idProvincia === idProvincia
    );
    dispatch(addCantones(filterdCantones));
  };

  useEffect(() => {
    getOptions();
  }, [placesState]);

  return [options, filterCantonesOptions];
};
