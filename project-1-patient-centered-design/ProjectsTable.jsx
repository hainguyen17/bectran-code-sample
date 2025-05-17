import React from "react";
import { ExpandableText } from "@/components/ExpandableText";
import { Tag } from "@/components/Tag";
import { Pagination } from "@/components/Pagination";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { InformationModal } from "./InformationModal";
import { useProjectsTableData } from "@/hooks/useProjectsTableData";
import Button, { ButtonVariant } from "../Button";

export const ProjectsTable = (props) => {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const filteredData = useProjectsTableData();

  const paginatedFilteredData = filteredData.slice((page - 1) * 5, page * 5);

  return (
    <div {...props}>
      <table className="table-fixed w-full border border-black">
        <thead className="divide-y divide-gray-400 text-left text-white bg-black">
          <tr>
            <th className="p-5">Name (company)</th>
            <th className="p-5">Work description</th>
            <th className="p-5 align-middle">
              Ecosystem area{" "}
              <Button variant={ButtonVariant.TERTIARY} onClick={() => setOpen(true)}>
                <InformationCircleIcon
                  fill="#fff"
                  width={16}
                  height={16}
                />
              </Button>
            </th>
            <th className="p-5 w-36">Ecosystem category</th>
            <th className="p-5 w-32">Read more</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-neutral-1">
          {paginatedFilteredData.map((actor, idx) => (
            <tr key={idx}>
              <td className="p-3">{actor.name}</td>
              <td className="p-3">
                <ExpandableText>{actor.description}</ExpandableText>
              </td>
              <td className="p-3">{<Tag>{actor.ecoArea}</Tag>}</td>
              <td className="p-3">{actor.ecoCategory}</td>
              <td className="p-3">
                <a
                  className="flex justify-center"
                  href={actor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read more about ${actor.name} in a new tab`}
                >
                  <ArrowTopRightOnSquareIcon className="w-6 h-6" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
        <InformationModal open={open} setOpen={setOpen} />
      </table>

      <Pagination
        current={page}
        onChange={(p) => setPage(p)}
        total={filteredData.length}
      />
    </div>
  );
};
