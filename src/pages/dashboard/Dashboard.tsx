import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import DataTable from "@/components/data-table/DataTable";
import generateColumns from "@/hooks/useColumns";

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
    { fieldName: "name", defaultCaption: "Name" },
    { fieldName: "description", defaultCaption: "Description" },
    { fieldName: "createdDate", defaultCaption: "Created Date" },
  ];

  return (
    <div className="space-y-3 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,876.98</div>
          </CardContent>
        </Card>

        <Card className="bg-lime-100 dark:bg-lime-950">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$762.10</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-100 dark:bg-purple-950">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1056</div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={generateColumns(columnFields)}
        data={masterType}
      />
    </div>
  );
};

export default Dashboard;
