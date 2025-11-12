import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";
import { usePlaceOptions } from "../hooks/placeOptions/usePlaceOptions";

function AutocompleteInput({ type, text, defaultPlace, control, onChange }) {
  const [defaultOption, setDefaultOption] = useState();

  const hookResult = usePlaceOptions({ type });
  const options = hookResult?.[0] || [];
  const filterCantonesOptions = hookResult?.[1];
  const isLoading = hookResult?.[2] ?? options.length === 0;

  useEffect(() => {
    if (type === "provincia") {
      setDefaultOption({ ...defaultPlace, id: defaultPlace.idProvincia });
    } else {
      setDefaultOption({ ...defaultPlace, id: defaultPlace.idCanton });
    }
  }, [defaultPlace, type]);

  const handleSelect = (selectedValue) => {
    if (!selectedValue) return;

    if (type === "provincia") {
      onChange({
        provincia: selectedValue.label,
        idProvincia: selectedValue.idProvincia,
      });
      filterCantonesOptions?.({ idProvincia: selectedValue.idProvincia });
    } else if (type === "canton") {
      onChange({
        canton: selectedValue.label,
        idCanton: selectedValue.idCanton,
      });
    }
  };

  return (
    <Controller
      name={type}
      control={control}
      rules={{
        required: `${text} es requerido`,
      }}
      defaultValue={defaultOption}
      render={({ field, fieldState: { error } }) => {
        const { onChange: formOnChange, value } = field;

        const currentValue =
          value && options.length > 0
            ? options.find((option) => value.id === option.id) ?? null
            : null;

        return (
          <Autocomplete
            value={currentValue}
            size="small"
            getOptionLabel={(option) => option.label || ""}
            options={options}
            loading={isLoading}
            loadingText="Cargando..."
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={text}
                error={!!error}
                helperText={error ? error.message : ""}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            onChange={(e, data) => {
              handleSelect(data);
              formOnChange(data ? data : null);
            }}
          />
        );
      }}
    />
  );
}

export default AutocompleteInput;
