import { useForm } from "react-hook-form";
import DataTable from "@/components/data-table/DataTable";
import generateColumns from "@/hooks/useColumns";
import Header from "@/components/header/Header";

interface MasterType {
  id: number;
  name: string;
  description: string;
  createdDate: string; // Consider Date if parsed
}

interface ColumnField {
  fieldName: keyof MasterType;
  defaultCaption: string;
}

const Dashboard: React.FC = () => {
  const {
    formState: { errors },
  } = useForm();

  const masterType: MasterType[] = [
    {
      id: 1,
      name: "Admin",
      description: "Administrator user with full access",
      createdDate: "2024-01-10",
    },
    {
      id: 2,
      name: "Editor",
      description: "Can edit content but has limited admin privileges",
      createdDate: "2024-02-14",
    },
    {
      id: 3,
      name: "Viewer",
      description: "Read-only access to all data",
      createdDate: "2024-03-05",
    },
  ];

  const columnFields: ColumnField[] = [
    { fieldName: "name", defaultCaption: "Name", width:30 },
    { fieldName: "description", defaultCaption: "Description" },
    { fieldName: "createdDate", defaultCaption: "Created Date" },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
         <Header headerLabel={"Dashboard"} />
      </div>
      {/* Data Table */}
      <DataTable
        columns={generateColumns(columnFields, false, false)}
        data={masterType}
      />
    </>
  );
};

export default Dashboard;
