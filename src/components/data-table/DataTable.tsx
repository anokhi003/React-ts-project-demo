import { ArrowDown } from "lucide-react";
import { default as DataTableComponent, TableColumn } from "react-data-table-component";
import { ReactNode, useEffect } from "react";
import { useTheme } from "@/lib/contexts/theme-provider";

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isFooter?: boolean;
  children?: ReactNode;
}

function DataTable<T>({
  columns,
  data,
  isFooter = false,
  children,
}: DataTableProps<T>) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const customStyles = {
    table: {
      style: {
        backgroundColor: isDarkMode ? "hsl(0 3% 2%)" : "hsl(0, 0%, 100%)",
        borderSpacing: "0 4px",
        borderCollapse: "separate",
        outline: "none",
      },
    },
    headRow: {
      style: {
        backgroundColor: isDarkMode ? "hsl(0 3% 2%)" : "hsl(210, 100%, 98%)",
        borderBottomColor: isDarkMode ? "hsl(0 3% 30%)" : "#E5E7EB",
        minHeight: "56px",
      },
    },
    headCells: {
      style: {
        fontSize: "17.5px",
        fontWeight: "600",
        color: isDarkMode ? "hsl(0 0% 78%)" : "hsl(204, 100%, 33.3%)",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "12px",
        paddingBottom: "12px",
      },
    },
    rows: {
      style: {
        fontSize: "15px",
        backgroundColor: isDarkMode ? "hsl(0, 3%, 6%)" : "hsl(0, 0%, 100%)",
        color: isDarkMode ? "hsl(0 0% 75%)" : "inherit",
        minHeight: "52px",
        "&:not(:last-of-type)": {
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: isDarkMode ? "hsl(0 3% 30%)" : "#E5E7EB",
        },
        "&:hover": {
          backgroundColor: isDarkMode ? "hsl(0 3% 8%)" : "hsl(0, 0%, 98.8%)",
          cursor: "pointer",
          transform: "translateY(-1px)",
          transition: "all 0.2s ease-in-out",
          boxShadow: isDarkMode
            ? "0 2px 4px rgba(0, 0, 0, 0.2)"
            : "0 2px 4px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "20px",
        paddingBottom: "20px",
      },
    },
    pagination: {
      style: {
        backgroundColor: isDarkMode ? "hsl(0, 3%, 6%)" : "hsl(0, 0%, 100%)",
        color: isDarkMode ? "hsl(0 0% 75%)" : "inherit",
        borderTop: isDarkMode ? "1px solid hsl(0 3% 30%)" : "1px solid #E5E7EB",
        padding: "8px",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
      },
      pageButtonsStyle: {
        borderRadius: "100px",
        height: "32px",
        minwidth: "32px",
        padding: "0 8px",
        margin: "0 4px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover:not(:disabled)": {
          backgroundColor: isDarkMode ? "hsl(0 0% 25%)" : "#f3f4f6",
        },
      },
      rowsPerPageText: {
        style: {
          color: isDarkMode ? "hsl(0 0% 75%)" : "inherit",
        },
      },
      select: {
        style: {
          borderRadius: "4px",
          padding: "4px 8px",
          cursor: "pointer",
          "&:focus": {
            outline: "none",
            boxShadow: isDarkMode
              ? "0 0 0 2px hsl(0 3% 30%)"
              : "0 0 0 2px hsl(0 0% 50%)",
          },
        },
      },
      selectOptions: {
        style: {
          backgroundColor: isDarkMode ? "hsl(0, 3%, 6%)" : "hsl(0, 0%, 100%)",
          color: isDarkMode ? "hsl(0 0% 75%)" : "inherit",
        },
      },
    },
    noData: {
      style: {
        backgroundColor: isDarkMode ? "hsl(0, 3%, 6%)" : "hsl(0, 0%, 100%)",
        color: isDarkMode ? "hsl(0 0% 80%)" : "hsl(0 0% 35%)",
      },
    },
  };

  useEffect(() => {
    if (isDarkMode) {
      const style = document.createElement("style");
      style.textContent = `
        .rdt_Pagination select option {
          background-color: hsl(0, 3%, 6%) !important;
          color: hsl(0 0% 75%) !important;
        }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }
  }, [isDarkMode]);

  return (
    <div
      className={`flex flex-col border ${
        isDarkMode ? "border-[hsl(0_3%_30%)]" : "border-[#E5E7EB]"
      } rounded-xl`}
    >
      <DataTableComponent
        columns={columns}
        data={data}
        fixedHeader
        fixedHeaderScrollHeight={
          data?.length > 10 ? "calc(100vh - 300px)" : "calc(100vh - 250px)"
        }
        customStyles={customStyles}
        sortIcon={<ArrowDown className="ml-2 h-4 w-4" />}
        direction="auto"
        pagination={data?.length > 10}
        persistTableHead
        pointerOnHover
        responsive
        selectableRowsHighlight
        subHeaderAlign="right"
        subHeaderWrap
        theme={isDarkMode ? "dark" : "light"}
      />
      {isFooter && (
        <div
          className={`rounded-b-md overflow-hidden py-3 ${
            isDarkMode
              ? "bg-[#404040] border-none"
              : "bg-[#f5faff] border-t-[1px] border-[#e5e7eb] text-main"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default DataTable;
