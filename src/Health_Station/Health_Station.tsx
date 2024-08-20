import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar_Sidebar";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ITEMS_PER_PAGE = 3;

const Health_Station: React.FC = () => {
  const [page, setPage] = useState(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const [formData, setFormData] = useState({
    Nationalidentificationnumber:"",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [] as string[],
    birthDate: "",
  });

  const indexOfLastItem = page * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentRows = rows.slice(indexOfFirstItem, indexOfLastItem);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex">
        <div className="flex-1 ">
          {!isSmallScreen && (
            <List className="md:w-56 ">
              {["iouioZ", "Starred", "Send email", "Drafts"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </div>
        <div className=" bg-neutral-100 w-full">
          <div className="flex-initial md:bg-white"></div>
          <div className="flex-1 md:bg-neutral-100 ">
            <div className=" md:bg-white md:m-4 p-2 bg-white rounded-lg">
              <div className="text-center rounded-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 ">
                  <div className="text-left p-2 pr-4 md:p-4 text-2xl font-bold">
                    Search
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:flex-1 text-white md:ml-96">
                    <Link
                      to="/PersonalRecordData"
                      className="your-link-class"
                    >
                      <button className="border-2 rounded-lg p-2 bg-blue-900 w-full">
                        + ข้อมูลส่วนบุคคล
                      </button>
                    </Link>
                    <Link to="/HeaithRecordFrom">
                      <button className="border-2 rounded-lg p-2 bg-blue-500 w-full">
                        + ข้อมูลสุขภาพ
                      </button>
                    </Link>
                    <Link to="/RecordData" className="your-link-class">
                      <button className="border-2 rounded-lg p-2 bg-green-500 w-full">
                        + ข้อมูลตรวจสุขภาพ
                      </button>
                    </Link>
                    <Link to="/RecordData" className="your-link-class">
                      <button className="border-2 rounded-lg p-2 bg-orange-500 w-full">
                        + ประเมิน ADL
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="p-0 md:pl-4 md:pb-4">
                  <form className="flex">
                    <div className="flex flex-col items-start w-full mr-4 p-2">
                      <label htmlFor="searchInput">เลขบัตรประชาชน</label>
                      <input
                        className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                        id="searchInput"
                        name="searchInput"
                        placeholder="Search"
                      />
                    </div>
                    <button className="border-2 flex-none rounded-lg bg-blue-500 text-white p-2 md:w-36 mt-6">
                      ค้นหา
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className=" bg-neutral-100 m-4">
              <div className="bg-white rounded-lg">
                <Paper className="w-full p-4">
                  <h1 className="text-3xl font-bold text-nowrap mb-4">
                    จัดการข้อมูลหลัก
                  </h1>
                  <TableContainer
                    component={Paper}
                    className="w-full overflow-auto"
                  >
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead className="w-full ">
                        <TableRow>
                          <TableCell align="left">ลำดับ</TableCell>
                          <TableCell align="right">เลขบัตรประชาชน</TableCell>
                          <TableCell align="right">ชื่อ-สกุล</TableCell>
                          <TableCell align="right">เพศ</TableCell>
                          <TableCell align="right">อายุ</TableCell>
                          <TableCell align="right">หมายเลขโทรศัพท์</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentRows.map((item, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left">{item.name}</TableCell>
                            <TableCell align="right">{item.calories}</TableCell>
                            <TableCell align="right">{item.carbs}</TableCell>
                            <TableCell align="right">{item.fat}</TableCell>
                            <TableCell align="right">{item.protein}</TableCell>
                            <TableCell align="right">012949148</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <Stack spacing={2} className="mt-4 p-2 items-end">
                  <Pagination
                    count={Math.ceil(rows.length / ITEMS_PER_PAGE)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health_Station;
