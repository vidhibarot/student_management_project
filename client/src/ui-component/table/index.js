import { Typography } from '@mui/material';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

const Table = ({ columns, data, enableHiding, defaultFilter, setDefaultFilter, rowCount, enableExpanding, title, enableColumnFilters }) => {
    const theme = useTheme();

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: defaultFilter?.currentPage - 1,
        pageSize: defaultFilter?.itemsPerPage,
    });

    // Set pagination value to defaultFilter state.
    const setPaginationValue = () => {
        {
            setDefaultFilter && setDefaultFilter(prevState => ({
                ...prevState,
                itemsPerPage: pagination?.pageSize,
                currentPage: pagination?.pageIndex + 1,
                sortBy: sorting,
                filters: columnFilters
            }));
        }
    }

    useEffect(() => {
        setPaginationValue();
    }, [sorting, columnFilters, pagination]);

    // Set default hidden columns.
    const findColumn = () => {
        let defaultHiddenColumns = {};
        columns.forEach((column) => {
            if (column?.defaultHidden === true) {
                defaultHiddenColumns[column?.accessorKey] = false;
            }
        });
        return defaultHiddenColumns;
    }
    console.log("dattatattatata", data)
    const table = useMaterialReactTable({
        columns,
        data,
        enableHiding,   // For hiding columns
        initialState: { columnVisibility: findColumn(), density: 'comfortable' },   // For initially hiding columns
        enableFullScreenToggle: false,   // For remove full screen table view option
        enableColumnActions: false,   // For remove column action option
        enableGlobalFilter: false,   // For remove global search option
        paginationDisplayMode: 'pages',   // For display page number in pagination
        rowCount,   // For total count of records.
        muiPaginationProps: {
            shape: 'rounded',   // For page number design in pagination
            // color: 'secondary',
            sx: {
                // '& .MuiPaginationItem-root': {
                //     color: 'white', // Text color for all pagination numbers
                //     backgroundColor: 'blue', // Background color for all pagination numbers
                //     '&:hover': {
                //         backgroundColor: 'lightblue', // Background color on hover
                //     },
                // },
                '& .Mui-selected': {
                    backgroundColor: '#1976D2', // Background color for the selected page
                    color: 'white', // Text color for the selected page
                    '&:hover': {
                        backgroundColor: 'darkred', // Background color on hover when selected
                    },
                },
            },
    
        },
        enableDensityToggle: false,
        enableHiding: false,
        manualSorting: true,   // For manual sorting 
        manualFiltering: true,   // For manual filtering
        manualPagination: true,   // For manual pagination
        onSortingChange: setSorting,   // Set the value of sorting
        onColumnFiltersChange: setColumnFilters,   // Set the value of filtering
        onPaginationChange: setPagination,   // Set the value of pagination
        state: { sorting, columnFilters, pagination },   // Define states for manual sorting, filtering, and pagination
        enableExpanding,
        enableColumnFilters,
        renderTopToolbarCustomActions: () => (
            <div style={{ marginTop: '10px', marginLeft: '8px' }}>
                <Typography variant="h4">{title}</Typography>
            </div>
        ),
    });

    return (
        <div className={`${theme?.palette?.mode === 'dark' ? 'main-data-table' : ''}`}>
            <MaterialReactTable table={table} />
        </div>
    );
};

export default Table;