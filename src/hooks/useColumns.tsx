import React from "react";
import Tooltip from "@/components/tooltip/Tooltip";
import { Edit, Eye } from "lucide-react";

interface Field {
  fieldName: string;
  [key: string]: any; // in case fields have more properties
}

type RowData = Record<string, any>;

type HandleEditFn = (row: RowData, isView?: boolean) => void;

interface Column {
  name: string;
  selector?: (row: RowData, index?: number) => any;
  sortable?: boolean;
  minwidth?: string;
  cell?: React.FC<{ row: RowData }>;
  ignoreRowClick?: boolean;
  button?: {
    className: string;
    style: React.CSSProperties;
  };
}

const generateColumns = (
  fields: Field[],
  isAllowEdit = true,
  isAllowView = true,
  handleEdit?: HandleEditFn
): Column[] => {
  const columns: Column[] = [
    {
      name: "Sr No",
      selector: (_row, index) => index! + 1,
      sortable: false,
      minwidth: "70px",
    },
    ...fields.map((field) => ({
      name: field.fieldName,
      selector: (row: { [x: string]: any; }) => row[field.fieldName],
      sortable: true,
      minwidth: "200px",
    })),
  ];

  if (isAllowView || isAllowEdit) {
    columns.push({
      name: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          {isAllowView && (
            <Tooltip content="View">
              <div onClick={() => handleEdit && handleEdit(row, true)}>
                <Eye className="icon" />
              </div>
            </Tooltip>
          )}
          {isAllowEdit && (
            <Tooltip content="Edit">
              <div onClick={() => handleEdit && handleEdit(row)}>
                <Edit className="icon" />
              </div>
            </Tooltip>
          )}
        </div>
      ),
      ignoreRowClick: true,
      button: {
        className: "p-0",
        style: { background: "transparent" },
      },
      minwidth: "150px",
    });
  }

  return columns;
};

export default generateColumns;
