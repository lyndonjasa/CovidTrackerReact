import React, { useEffect, useState } from "react";
import { TableContext } from "../../context/TableContext";
import useVisitedPlace from "../../hooks/useVisitedPlace";
import { CovidDataModel } from "../../models/CovidDataModel";
import { GroupedCovidDataModel } from "../../models/GroupedCovidDataModel";
import { groupData } from "../../shared/group-data-helper";
import CovidDataAddButton from "../shared/CovidDataAddButton";
import CovidDataEmptyTable from "../shared/CovidDataEmptyTable";
import CovidDataForm from "../shared/CovidDataForm";
import CovidDataTable from "../shared/CovidDataTable";

const VisitedPlaces = () => {
  const { places, addPlace, loading, deletePlace, savePlace } = useVisitedPlace();
  const [groupedPlaces, setGroupedPlaces] = useState<GroupedCovidDataModel[]>([]);

  // pagination data
  const [length, setLength] = useState(0);
  const [page, setPage] = useState(0);
  const [take, setTake] = useState(5);

  const [open, setOpen] = useState(false);
  const onPlaceAdd = (place: CovidDataModel) => {
    addPlace(place);
  }

  const onRowsPerPageChange = (value: number) => {
    setTake(value);
  }

  const onPageChange = (value: number) => {
    setPage(value);
  }

  useEffect(() => {
    setLength(places.length);
    const currentPage = (page * take);
    setGroupedPlaces(groupData(places
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(currentPage, currentPage + take)))

  }, [places, page, take])

  const dialogTitle = "Update Visited Place";
  const nameDisplayText = 'Place';
  const exposureDisplayText = "Is Crowded?";
  const updateDataCallback = (data: CovidDataModel) => {
    savePlace(data);
  }
  const deleteDataCallback = (id: string) => {
    deletePlace(id);
  }

  const contextValues = {
    dialogTitle, 
    nameDisplayText, 
    exposureDisplayText, 
    updateDataCallback, 
    deleteDataCallback 
  };

  return (
    <>
      <TableContext.Provider value={{...contextValues, mode: "place"}}>
      {
          places.length > 0 &&
          <CovidDataTable 
            data={groupedPlaces} 
            pagination={{
              length,
              rowsPerPage: take,
              page
            }}
            rowsPerPageCallback={onRowsPerPageChange}
            pageCallback={onPageChange} />
        }
        {
          places.length <= 0 &&
          <CovidDataEmptyTable>
            No interaction data present yet. Click on <b>ADD PLACE</b> to start collecting data.
          </CovidDataEmptyTable>
        }
      </TableContext.Provider>
      {
        !loading &&
        <CovidDataAddButton addDisplayText="Add Place"
          onAddClick={() => setOpen(true)} />
      }
      <CovidDataForm open={open}
        dialogTitle="Add Visited Place"
        nameDisplayText="Place"
        exposureDisplayText="Is Crowded?"
        saveCallback={onPlaceAdd}
        handleClose={() => setOpen(false)} />
    </>
  )
}

export default VisitedPlaces;