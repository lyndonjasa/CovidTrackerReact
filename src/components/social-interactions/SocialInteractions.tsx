import React, { useEffect, useState } from "react";
import useSocialInteraction from "../../hooks/useSocialInteraction";
import { GroupedCovidDataModel } from "../../models/GroupedCovidDataModel";
import { groupData } from "../../shared/group-data-helper";
import CovidDataTable from "../shared/CovidDataTable";
import CovidDataAddButton from "../shared/CovidDataAddButton";
import CovidDataForm from "../shared/CovidDataForm";
import { CovidDataModel } from "../../models/CovidDataModel";

const SocialInteractions = () => {
  const { interactions, addInteraction } = useSocialInteraction();
  const [groupedInteractions, setGroupedInteractions] = useState<GroupedCovidDataModel[]>([]);

  // pagination data
  const [length, setLength] = useState(0);
  const [page, setPage] = useState(0);
  const [take, setTake] = useState(5);

  const [open, setOpen] = useState(false);
  const onInteractionAdd = (interaction: CovidDataModel) => {
    addInteraction({ ...interaction, isExposed: !interaction.isExposed });
  }

  const onRowsPerPageChange = (value: number) => {
    setTake(value);
  }

  const onPageChange = (value: number) => {
    setPage(value);
  }

  useEffect(() => {
    setLength(interactions.length);
    const currentPage = (page * take);
    setGroupedInteractions(groupData(interactions
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(currentPage, currentPage + take)))

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
      <CovidDataAddButton addDisplayText="Add Interaction"
        onAddClick={() => setOpen(true)} />
      <CovidDataForm open={open}
        dialogTitle="Add Social Interaction"
        nameDisplayText="Name"
        exposureDisplayText="Is Social Distancing Observed"
        saveCallback={onInteractionAdd}
        handleClose={() => setOpen(false)} />
    </>
  )
}

export default SocialInteractions;