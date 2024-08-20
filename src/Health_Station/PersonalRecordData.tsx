import React, { useState } from "react";
import Navbar from "../components/Navbar_Sidebar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import Icon from "../assets/Icon.png";
import * as Yup from "yup";

// จำนวนรายการต่อหน้า
const ITEMS_PER_PAGE = 3;

// ประกาศประเภทข้อมูลของฟอร์ม
interface FormData {
  nationalIdentificationNumber: string;
  typePhysicalDisability: string;
  elderlycaregiveridentificationnumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  birthDate: string;
  bloodGroup: string;
  houseAddressNumber: string;
  village: string;
  alley: string;
  road: string;
  district: string;
  canton: string;
  province: string;
  postcode: string;
  phoneNumber: string;
}

// ประกาศประเภทข้อมูลของข้อผิดพลาด
interface Errors {
  nationalIdentificationNumber?: string;
  typePhysicalDisability?: string;
  elderlycaregiveridentificationnumber?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  age?: string;
  birthDate?: string;
  bloodGroup?: string;
  houseaddressnumber?: string;
  village?: string;
  alley?: string;
  road?: string;
  district?: string;
  canton?: string;
  province?: string;
  postcode?: string;
  phoneNumber?: string;
}

// กำหนดการตรวจสอบข้อมูลด้วย Yup
const validationSchema = Yup.object().shape({
  nationalIdentificationNumber: Yup.string().required(
    "กรุณากรอกเลขประจำตัวประชาชน"
  ),
  typePhysicalDisability: Yup.string().required(
    "กรุณาเลือกประเภทความบกพร่องทางร่างกาย"
  ),
  firstName: Yup.string().required("กรุณากรอกชื่อ"),
  lastName: Yup.string().required("กรุณากรอกนามสกุล"),
  gender: Yup.string().required("กรุณาเลือกเพศ"),
  age: Yup.number()
    .required("กรุณากรอกอายุ")
    .typeError("อายุต้องเป็นตัวเลข")
    .min(1, "ไม่มีอายุ 0")
    .max(100, "อายุไม่ควรเกิน 100 ปี"),
  birthDate: Yup.date().required("กรุณากรอกวันเกิด"),
  bloodGroup: Yup.string().required("กรุณากรอกหมู่เลือด"),
  houseaddressnumber: Yup.string().required("กรุณากรอกที่อยู่บ้านเลขที่"),
  Village: Yup.string().required("กรุณากรอกหมู่ที่"),
  alley: Yup.string(),
  road: Yup.string(),
  district: Yup.string().required("กรุณากรอกตำบล"),
  canton: Yup.string().required("กรุณากรอกอำเภอ"),
  province: Yup.string().required("กรุณากรอกจังหวัด"),
  postcode: Yup.string().required("กรุณากรอกรหัสไปรษณีย์"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "หมายเลขโทรศัพท์ต้องมี 10 หลัก")
    .required("กรุณากรอกหมายเลขโทรศัพท์"),
});

// คอมโพเนนต์หลัก
const Health_Station: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    typePhysicalDisability: "",
    nationalIdentificationNumber: "",
    elderlycaregiveridentificationnumber: "",
    firstName: "",
    lastName: "",
    bloodGroup: "",
    houseAddressNumber: "",
    village: "",
    alley: "",
    road: "",
    district: "",
    canton: "",
    province: "",
    postcode: "",
    phoneNumber: "",
    age: "",
    gender: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
    } catch (error) {
      const newErrors: { [key: string]: string } = {};

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });
      }

      setErrors(newErrors);
    }
  };

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
        <div className="md:bg-neutral-100 w-full p-4">
          <div className="bg-white p-2">
            <div className="flex-initial md:bg-white">
              <div className="flex p-4 ">
                <Link to="/Health_Station">
                  <button className="mr-2 ">
                    <img
                      src={Icon}
                      alt="Icon"
                      className="object-cover h-3 mt-3 mr-1 md:place-items-start"
                    />
                  </button>
                </Link>
                <div className="text-2xl">แบบบันทึกข้อมูลส่วนตัว</div>
              </div>
            </div>
            <Accordion className="bg-blue-500">
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>ข้อมูลส่วนตัวบุคคล</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="p-4">
                    <form className="" onSubmit={handleSubmit}>
                      <div className="items-start w-full">
                        <label
                          htmlFor="typePhysicalDisability"
                          className="relative"
                        >
                          ประเภทความบกพร่องทางร่างกาย
                          <span className="text-red-500 absolute">*</span>
                        </label>
                        <select
                          name="typePhysicalDisability"
                          id="idType_of_Physical_Disability"
                          onChange={handleChange}
                          value={formData.typePhysicalDisability}
                          className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                        >
                          <option value="">ประเภทความบกพร่องทางร่างกาย</option>
                          <option value="มีความพิการ">มีความพิการ</option>
                          <option value="สุขภาวะปกติ">สุขภาวะปกติ</option>
                        </select>
                        {errors.typePhysicalDisability && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.typePhysicalDisability}
                          </div>
                        )}
                      </div>
                      <div className="items-start w-full mt-3">
                        <label
                          htmlFor="nationalIdentificationNumber"
                          className="relative"
                        >
                          เลขประจำตัวประชาชน
                          <span className="text-red-500 absolute">*</span>
                        </label>
                        <input
                          className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                          id="idNationalIdentificationNumber"
                          name="nationalIdentificationNumber"
                          placeholder="เลขประจำตัวประชาชน"
                          onChange={handleChange}
                          value={formData.nationalIdentificationNumber}
                        />
                        {errors.nationalIdentificationNumber && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.nationalIdentificationNumber}
                          </div>
                        )}
                      </div>
                      <div className="items-start w-full mt-3">
                        <label htmlFor="elderlycaregiveridentificationnumber">
                          เลขประจำตัวประชาชนของผู้ดูแลผู้สูงอายุ
                        </label>
                        <input
                          className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                          id="idElderly_caregiver_identification_number"
                          name="elderlycaregiveridentificationnumber"
                          placeholder="เลขประจำตัวประชาชนของผู้ดูแลผู้สูงอายุ"
                          onChange={handleChange}
                          value={formData.elderlycaregiveridentificationnumber}
                        />
                      </div>
                      <div className="flex flex-col md:flex-row md:space-x-4 mt-3">
                        <div className="w-full mb-4 md:mb-0">
                          <label htmlFor="firstName" className="relative">
                            ชื่อ
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idFirstname"
                            name="firstName"
                            placeholder="ชื่อ"
                            onChange={handleChange}
                            value={formData.firstName}
                          />
                          {errors.firstName && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.firstName}
                            </div>
                          )}
                        </div>
                        <div className="w-full">
                          <label htmlFor="lastName" className="relative">
                            นามสกุล
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idLastname"
                            name="lastName"
                            placeholder="นามสกุล"
                            onChange={handleChange}
                            value={formData.lastName}
                          />
                          {errors.lastName && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.lastName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="items-start w-full mt-3">
                          <label htmlFor="gender" className="relative">
                            เพศ
                            <span className="text-red-500 absolute">*</span>
                            <select
                              name="เพศ"
                              id="idgender"
                              value={formData.gender}
                              onChange={handleChange}
                              className="border-2 border-b-4 flex-1 text-left pb-3 pt-2  bg-gray-100 w-full"
                            >
                              <option value="">เพศ</option>
                              <option value="ชาย">ชาย</option>
                              <option value="หญิง">หญิง</option>
                            </select>
                            {errors.gender && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.gender}
                              </div>
                            )}
                          </label>
                        </div>
                        <div className="items-start w-full mt-3">
                          <label htmlFor="age" className="relative">
                            อายุ
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idAge"
                            name="age"
                            placeholder="อายุ"
                            value={formData.age}
                            onChange={handleChange}
                          />
                          {errors.age && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.age}
                            </div>
                          )}
                        </div>
                        <div className="items-start w-full">
                          <label htmlFor="birthDate" className="relative">
                            วัน/เดือน/ปีเกิด
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            type="date"
                            id="idDate"
                            name="birthDate"
                            placeholder="กรอกวันเกิดของคุณ"
                            value={formData.birthDate}
                            onChange={handleChange}
                          />
                          {errors.birthDate && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.birthDate}
                            </div>
                          )}
                        </div>
                        <div className="items-start w-full">
                          <label htmlFor="bloodGroup" className="relative">
                            หมู่เลือด
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idBloodGroup"
                            name="bloodGroup"
                            placeholder="หมู่เลือด"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                          />
                          {errors.bloodGroup && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.bloodGroup}
                            </div>
                          )}
                        </div>
                        <div className="items-start w-full">
                          <label
                            htmlFor="houseAddressNumber"
                            className="relative"
                          >
                            ที่อยู่บ้านเลขที่
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idHouseAddressNumber"
                            name="houseAddressNumber"
                            placeholder="ที่อยู่บ้านเลขที่"
                            value={formData.houseAddressNumber}
                            onChange={handleChange}
                          />
                          {errors.houseaddressnumber && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.houseaddressnumber}
                            </div>
                          )}
                        </div>
                        <div className="items-start w-full">
                          <label htmlFor="village" className="relative">
                            หมู่ที่
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idvillage"
                            name="village"
                            placeholder="หมู่ที่"
                            value={formData.village}
                            onChange={handleChange}
                          />
                          {errors.village && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.village}
                            </div>
                          )}
                        </div>
                        <div className="items-start w-full">
                          <label htmlFor="alley">ตรอก/ซอย</label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idAlley"
                            name="alley"
                            placeholder="ตรอก/ซอย"
                            value={formData.alley}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="items-start w-full">
                          <label htmlFor="road">ถนน</label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idRoad"
                            name="road"
                            placeholder="ถนน"
                            value={formData.road}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="items-start w-full">
                          <label
                            htmlFor="district"
                            className="relative"
                          >
                            ตำบล
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idDistrict"
                            name="district"
                            placeholder="ตำบล"
                            value={formData.district}
                            onChange={handleChange}
                          />
                          {errors.district && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.district}
                            </div>
                          )}
                        </div>
                        <div className="items-start w-full">
                          <label
                            htmlFor="canton"
                            className="relative"
                          >
                            อำเภอ
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="canton"
                            name="canton"
                            placeholder="อำเภอ"
                            value={formData.canton}
                            onChange={handleChange}
                          />
                          {errors.district && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.canton}
                            </div>
                          )}
                        </div>
                        <div className="items-start w-full">
                          <label
                            htmlFor="province"
                            className="relative"
                          >
                            จังหวัด
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idprovince"
                            name="province"
                            placeholder="จังหวัด"
                            value={formData.province}
                            onChange={handleChange}
                          />
                          {errors.province && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.province}
                            </div>
                          )}
                        </div>
                        <div className="items-start w-full">
                          <label
                            htmlFor="postcode"
                            className="relative"
                          >
                            รหัสไปรษณีย์
                            <span className="text-red-500 absolute">*</span>
                          </label>
                          <input
                            className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                            id="idPostcode"
                            name="postcode"
                            placeholder="รหัสไปรษณีย์"
                            value={formData.postcode}
                            onChange={handleChange}
                          />
                          {errors.postcode && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.postcode}
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                    <form className="grid grid-rows-1 grid-flow-col gap-4">
                      <div className="items-start w-full pt-4">
                        <label
                          htmlFor="phoneNumber"
                          className="relative"
                        >
                          โทรศัพท์
                          <span className="text-red-500 absolute">*</span>
                        </label>
                        <input
                          className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                          id="idphoneNumber"
                          name="phoneNumber"
                          placeholder="โทรศัพท์"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                        {errors.phoneNumber && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.phoneNumber}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div className="flex items-start justify-end w-full">
              <button
                className="border-2 flex-none rounded-lg bg-blue-500 text-white p-2 md:w-36 mt-6"
                type="submit"
                onClick={handleSubmit}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health_Station;
