import React, { useEffect, useState, useCallback } from "react";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import { EuiComboBox } from "@elastic/eui";

function Search() {
  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [allOptions, setAllOptions] = useState([]);

  
  const getProvinces = () => {
    fetch("https://www.el-tiempo.net/api/json/v2/provincias")
      .then((resp) => resp.json())
      .then((data) => {
        setAllOptions(formatProvinces(data));
      });
  };

  const formatProvinces = (provinces) => {
    return provinces.provincias.map((item, index) => ({
      label: item.NOMBRE_PROVINCIA,
      codProv: item.CODPROV,
    }));
  };

  const formatTown = (town) => {
    return town.map((item, index) => ({
      label: item.NOMBRE,
      id: item.ID_REL,
    }));
  };

  const onChange = (selectedOptions) => {
    if(selectedOptions.length <= 2){
      setSelected(selectedOptions);
      fetchData(selectedOptions[0].codProv)
    }
  };

  const fetchData = async (id) => {
    fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${id}/municipios`)
      .then((resp) => resp.json())
      .then((data) => {
        setAllOptions(formatTown(data.municipios));
      });
  };

  const onSearchChange = (searchValue) => {
    if (searchValue !== "" && selectedOptions < 2) {
      setLoading(true);
      setAllOptions(
        allOptions.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      setLoading(false);
    }
  };


  useEffect(() => {
    getProvinces();
  }, []);


  return (
    <div className="App">
      <EuiComboBox
        placeholder="Search asynchronously"
        async
        options={allOptions}
        selectedOptions={selectedOptions}
        isLoading={isLoading}
        onChange={onChange}
        onSearchChange={onSearchChange}
      />
    </div>
  );
}

export default Search;
