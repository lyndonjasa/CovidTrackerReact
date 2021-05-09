import React, { useEffect, useState } from "react";
import useSocialInteraction from "../../hooks/useSocialInteraction";
import { GroupedCovidDataModel } from "../../models/GroupedCovidDataModel";
import { groupData } from "../../shared/group-data-helper";
import CovidDataTable from "../shared/CovidDataTable";

const SocialInteractions = () => {
  const { interactions } = useSocialInteraction();
  const [groupedInteractions, setGroupedInteractions] = useState<GroupedCovidDataModel[]>([]);

  useEffect(() => {
    setGroupedInteractions(groupData(interactions))
  }, [interactions])

  return (
    <>
      <CovidDataTable data={groupedInteractions}></CovidDataTable>
    </>
  )
}

export default SocialInteractions;