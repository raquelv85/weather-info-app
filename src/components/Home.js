import React, { useEffect, useState, useCallback } from "react";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";

import { addSearch, updateSearchSuccess } from "../actions/searches";

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiCard,
  EuiText,
  EuiSpacer,
  EuiTitle,
  EuiIcon,
} from "@elastic/eui";

function Home() {
  const { searches } = useSelector((state) => state.searches);
  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [towns, setTowns] = useState([]);
  const [dataCard, setDataCard] = useState({});

  const dispatch = useDispatch();

  const URL_PROVINCES = "https://www.el-tiempo.net/api/json/v2/provincias";

  const getProvinces = () => {
    fetch(URL_PROVINCES)
      .then((resp) => resp.json())
      .then((data) => {
        setAllOptions(formatProvinces(data));
        setProvinces(formatProvinces(data));
      });
  };

  const formatProvinces = (provinces) => {
    return provinces.provincias.map((item, index) => ({
      label: item.NOMBRE_PROVINCIA,
      codProv: item.CODPROV,
      key: "prov-" + index,
      type: "province",
    }));
  };

  const formatTown = (town) => {
    return town.map((item, index) => ({
      label: item.NOMBRE,
      id: item.COD_GEO,
      key: "town-" + index,
      type: "town",
    }));
  };

  const onChange = (selectedOptions) => {
    if (selectedOptions.length <= 2) {
      setSelected(selectedOptions);

      if (selectedOptions.length === 1) {
        fetchTown(selectedOptions[0].codProv);
      } else if (selectedOptions.length === 2) {
        dispatch(
          addSearch(
            selectedOptions[0].codProv,
            selectedOptions[1].id,
            selectedOptions[1].label
          )
        );

        fetchInfo(
          selectedOptions[0].codProv,
          selectedOptions[1].id,
          selectedOptions[1].label
        );
      } else if (selectedOptions.length === 0) {
        getProvinces();
      }
    }
  };

  const fetchTown = async (id) => {
    fetch(`${URL_PROVINCES}/${id}/municipios`)
      .then((resp) => resp.json())
      .then((data) => {
        setAllOptions(formatTown(data.municipios));
        setTowns(formatTown(data.municipios));
      });
  };

  const fetchInfo = async (idProvince, IdTown, name) => {
    fetch(`${URL_PROVINCES}/${idProvince}/municipios/${IdTown}`)
      .then((resp) => resp.json())
      .then((data) => {
        setDataCard({
          name: name,
          temperature: data.temperatura_actual,
          rain: data.lluvia,
        });
      });
  };

  const onSearchChange = (searchValue) => {
    let search = [];
    setLoading(true);
    if (selectedOptions.length === 0) {
      search = provinces;
    } else if (selectedOptions.length === 1) {
      search = towns;
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
    <>
      <EuiSpacer />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem style={{ minWidth: 400 }} grow={false}>
          <Search
            allOptions={allOptions}
            selectedOptions={selectedOptions}
            isLoading={isLoading}
            onChange={onChange}
            onSearchChange={onSearchChange}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      {searches.length > 0 && (
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem style={{ minWidth: 400 }} grow={false}>
            <EuiTitle size="m" style={{ textAlign: "center" }}>
              <h1>Last searchs</h1>
            </EuiTitle>
          </EuiFlexItem>
        </EuiFlexGroup>
      )}

      <EuiSpacer />
      <EuiFlexGroup
        justifyContent="center"
        wrap
        gutterSize="s"
        alignItems="center"
        direction="row"
      >
        {searches.length > 0 &&
          searches.map((item, index) => {
            return (
              <EuiFlexItem grow={false}>
                <EuiButton
                  onClick={() =>
                    fetchInfo(item.codProv, item.idTown, item.name)
                  }
                >
                  {item.name}
                </EuiButton>
              </EuiFlexItem>
            );
          })}
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      {Object.keys(dataCard).length > 0 && (
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem style={{ minWidth: 400 }} grow={false}>
            <EuiCard
              icon={<EuiIcon size="xxl" type="visMapCoordinate" />}
              title={dataCard.name}
              //description="Example of a card's description. Stick to one or two sentences."
            >
              <EuiSpacer size="m" />
              <EuiText size="s">
                <p>
                  <EuiIcon size="l" type="temperature" /> Temperature:{" "}
                  {`${dataCard.temperature}°`}{" "}
                </p>
              </EuiText>
              <EuiText size="s">
                <p>
                  <EuiIcon size="l" type="cloudDrizzle" /> Rain:{" "}
                  {`${dataCard.rain}%`}
                </p>
              </EuiText>
            </EuiCard>
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
    </>
  );
}

export default Home;
