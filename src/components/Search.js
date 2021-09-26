import React, { useEffect, useState, useCallback } from "react";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import { EuiComboBox } from "@elastic/eui";

function Search() {
  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const [provinces, setProvinces] = useState([])
  const [towns, setTowns] = useState([])

  const URL_PROVINCES = "https://www.el-tiempo.net/api/json/v2/provincias"
  
  const getProvinces = () => {
    fetch(URL_PROVINCES)
      .then((resp) => resp.json())
      .then((data) => {
        setAllOptions(formatProvinces(data));
        setProvinces(formatProvinces(data))
      });
  };

  const formatProvinces = (provinces) => {
    return provinces.provincias.map((item, index) => ({
      label: item.NOMBRE_PROVINCIA,
      codProv: item.CODPROV,
      key: "prov-"+index,
      type: "province"
    }));
  };

  const formatTown = (town) => {
    return town.map((item, index) => ({
      label: item.NOMBRE,
      id: item.COD_GEO,
      key: "town-"+index,
      type: "town"
    }));
  };

  const onChange = (selectedOptions) => {
    if(selectedOptions.length <= 2){
      setSelected(selectedOptions);

      if(selectedOptions.length === 1){
        fetchTown(selectedOptions[0].codProv)
      }else if(selectedOptions.length === 2 ) {
        fetchInfo(selectedOptions[0].codProv, selectedOptions[1].id)
      }else if(selectedOptions.length === 0){
        getProvinces()
      }
    }
  };

  const fetchTown = async (id) => {
    fetch(`${URL_PROVINCES}/${id}/municipios`)
      .then((resp) => resp.json())
      .then((data) => {
        setAllOptions(formatTown(data.municipios));
        setTowns(formatTown(data.municipios))
      });
  };

  const fetchInfo = async (idProvince, IdTown) => {
    fetch(`${URL_PROVINCES}/${idProvince}/municipios/${IdTown}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
      });
  };

  const onSearchChange = (searchValue) => {
    let search = []
      setLoading(true);
      if(selectedOptions.length === 0){
        search = provinces
      }else if(selectedOptions.length === 1){
        search = towns
      }

      setAllOptions(
        search.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      
      setLoading(false);
 
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
