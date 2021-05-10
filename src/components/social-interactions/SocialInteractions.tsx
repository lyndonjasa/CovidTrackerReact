import React, { useEffect, useState } from "react";
import useSocialInteraction from "../../hooks/useSocialInteraction";
import { GroupedCovidDataModel } from "../../models/GroupedCovidDataModel";
import { groupData } from "../../shared/group-data-helper";
import CovidDataTable from "../shared/CovidDataTable";
import './SocialInteractions.scss';
import CovidDataAddButton from "../shared/CovidDataAddButton";

const SocialInteractions = () => {
  const { interactions } = useSocialInteraction();
  const [groupedInteractions, setGroupedInteractions] = useState<GroupedCovidDataModel[]>([]);

  // pagination data
  const [length, setLength] = useState(0);
  const [page, setPage] = useState(0);
  const [take, setTake] = useState(5);

  const onRowsPerPageChange = (value: number) => {
    setTake(value);
  }

  const onPageChange = (value: number) => {
    setPage(value);
  }

  useEffect(() => {
    setLength(interactions.length);
    const currentPage = (page * take);
    setGroupedInteractions(groupData(interactions.slice(currentPage, currentPage + take)))
  }, [interactions, page, take])

  return (
    <>
      <CovidDataTable 
        data={groupedInteractions} 
        pagination={{
          length,
          rowsPerPage: take,
          page
        }}
        rowsPerPageCallback={onRowsPerPageChange}
        pageCallback={onPageChange}></CovidDataTable>
      <CovidDataAddButton addDisplayText="Add Interaction" />
    </>
  )
}

export default SocialInteractions;