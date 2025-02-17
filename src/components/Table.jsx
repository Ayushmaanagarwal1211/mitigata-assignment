import React, { useEffect } from "react";
import TableBody from "./TableBody";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFilter,
  selectData,
  selectSortingOptions,
  setData,
} from "../slices/TableSlice";
import dummyData from "../data.json";
import TableHeader from "./table-header/TableHeader";
export default function Table() {
  const dispatch = useDispatch();
  const data = useSelector(state=>selectData(state))
  const sortingOptions = useSelector((state) => selectSortingOptions(state));
  useEffect(() => {
    dispatch(setData(dummyData));
  }, []);

  useEffect(() => {
    dispatch(handleFilter());
  }, [sortingOptions,data]);

  return (
    <>
      <TableHeader />
      <TableBody />
    </>
  );
}
