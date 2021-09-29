import React, { useEffect, useState, useCallback } from "react";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import { EuiComboBox } from "@elastic/eui";

import { useDispatch, useSelector } from "react-redux";

import { addSearch } from "../actions/searches";

function Search({
  allOptions,
  selectedOptions,
  isLoading,
  onChange,
  onSearchChange,
}) {
  return (
    <div className="App">
      <EuiComboBox
        placeholder="Search..."
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
