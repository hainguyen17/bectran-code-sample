Projects

import React from "react";
import Button, { ButtonSize, ButtonVariant } from "@/components/Button";
import { ProjectsTable } from "@/components/ProjectsTable";
import {
  ArrowUpOnSquareIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { FilterModal } from "@/components/ProjectsTable/FilterModal";
import { MassMap } from "@/components/MassMap";
import Input from "@/components/Form/Input";
import { Typography } from "@/components/Typography";
import { useNavigate } from "react-router-dom";
import { CardView } from "@/components/ProjectsTable/CardView";
import { downloadBlob, objectToCsv } from "@/utils/downloadCsv";
import { useProjectsTableData } from "@/hooks/useProjectsTableData";

export default function Projects() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const params = new URLSearchParams(location.search);
  const selectedFilter = params.get("ecosystemArea") || "";
  const searchQuery = params.get("q") || "";
  const filteredData = useProjectsTableData();

  const onSearch = (e) => {
    params.set('q', e.target.value);

    navigate(`${location.pathname}?${params.toString()}`);
  }

  const onExportCsv = () => {
    const csv = objectToCsv(filteredData);

    downloadBlob(csv, 'export.csv', 'text/csv;charset=utf-8;');
  }

  return (
    <>

      <div className="relative w-full">
        <MassMap className="w-full " zoomLevel={456} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-7xl ">

            <div className="bg-black/[.6] md:w-7/12 h-full flex flex-col justify-center md:justify-start p-8 gap-y-8">
              <Typography
                variant="h2"
                className="font-semibold text-white"
              >
                Insights from the ecosystem analysis
              </Typography>
              <div className="h-[12px] w-[160px] bg-red-600" />
              <Typography
                className="font-light text-white"
              >
                Discover a curated collection of ~70 companies and their work identified through extensive exploration of diverse sources, using search methods focused on patient-centered and person-centered healthcare innovation in the Boston area.
              </Typography>
              <Typography
                className="font-light text-white"
              >The projects span various fields, including health tech, patient-driven care, and technology-driven solutions, reflecting a commitment to advancing patient-centered design and healthcare experiences. From start-ups to established organizations, this collection provides insights into their focus areas, impact, and unique contributions to the ecosystem.</Typography>
            </div>
          </div>
        </div>
      </div >
      <div className="my-5 max-w-7xl py-6 flex flex-col gap-8">

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 items-center justify-between w-full">
          <div className="flex flex-col md:flex-row gap-2">
            <Typography variant="h3" className="font-semibold text-black-600">Projects |</Typography>
            <Typography variant="h3" className="font-medium text-gray-400">
              Patient-centered care
            </Typography>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 h-min">
            <Input className="grow w-full md:grow-0 md:w-fit" placeholder="Search" value={searchQuery} onChange={onSearch} />
            <Button
              variant={ButtonVariant.SECONDARY}
              icon={<FunnelIcon width="1rem" />}
              size={ButtonSize.L}
              onClick={() => setOpenModal(true)}
            >
              Filter{selectedFilter && ` (1)`}
            </Button>
            <Button
              onClick={onExportCsv}
              variant={ButtonVariant.SECONDARY}
              size={ButtonSize.L}
              icon={<ArrowUpOnSquareIcon width="1rem" />}
            >
              Export
            </Button>
          </div>
        </div>

        <ProjectsTable className="hidden md:block" />
        <CardView className="md:hidden" />

        <Typography variant="body-small" className="w-100 text-center text-gray-500">
          Last updated: 01/16/2025
        </Typography>

        <FilterModal open={openModal} setOpen={setOpenModal} />
      </div>
    </>
  );
}

