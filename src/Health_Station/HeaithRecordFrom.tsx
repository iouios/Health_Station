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
import Radio from '@mui/material/Radio';


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
  selectedValue: string;
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

interface InputItem {
  id: number;
  label: string;
  value: string;
}

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
const HeaithRecordFrom: React.FC = () => {
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
    selectedValue: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showAdditionalDiv, setShowAdditionalDiv] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [inputs, setInputs] = useState<InputItem[]>([]);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "typePhysicalDisability") {
      setShowAdditionalDiv(value === "มีความพิการ");
    }
  };
  const addInputs = () => {
    const newId = inputs.length + 1;
    setInputs((prevInputs) => [
      ...prevInputs,
      { id: newId, label: "โรงพยาบาล", value: "" },
      { id: newId + 1, label: "โรงรถ", value: "" },
    ]);
  };

  const handleInputChange = (id: number, value: string) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
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

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
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
                <div className="text-2xl">แบบบันทึกข้อมูลสุขภาพ</div>
              </div>
              <div className="items-start w-full mt-3 p-2">
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
              <div className="items-start w-full p-2">
                <label htmlFor="typePhysicalDisability" className="relative">
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
                {showAdditionalDiv && (
                  <div className="mt-4 pb-4">
                    <Accordion className="bg-blue-500">
                      <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography>ข้อมูลความพิการ</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className="md:p-4">
                            <form className="" onSubmit={handleSubmit}>
                              <div className="items-start w-full">
                                <label
                                  htmlFor="typePhysicalDisability"
                                  className="relative"
                                >
                                  กลุ่มภาวะผู้สูงอายุ
                                  <span className="text-red-500 absolute">
                                    *
                                  </span>
                                </label>
                                <select
                                  name="typePhysicalDisability"
                                  id="idType_of_Physical_Disability"
                                  onChange={handleChange}
                                  value={formData.typePhysicalDisability}
                                  className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                >
                                  <option value="">กลุ่มภาวะผู้สูงอายุ</option>
                                  <option value="กลุ่มผู้สูงอายุติดเตียง  ADL 0-4 คะแนน">
                                    กลุ่มผู้สูงอายุติดเตียง ADL 0-4 คะแนน
                                  </option>
                                  <option value="กลุ่มผู้สูงอายุติดบ้าน   ADL 5-11 คะแนน">
                                    กลุ่มผู้สูงอายุติดบ้าน ADL 5-11 คะแนน
                                  </option>
                                  <option value="กลุ่มผู้สูงอายุติดบ้าน   ADL  12 คะแนน">
                                    กลุ่มผู้สูงอายุติดบ้าน ADL 12 คะแนน
                                  </option>
                                </select>
                                {errors.typePhysicalDisability && (
                                  <div className="text-red-500 text-sm mt-1">
                                    {errors.typePhysicalDisability}
                                  </div>
                                )}
                              </div>
                              <div className="items-start w-full mt-4">
                                <label
                                  htmlFor="typePhysicalDisability"
                                  className="relative"
                                >
                                  ประเภทของความพิการ
                                  <span className="text-red-500 absolute">
                                    *
                                  </span>
                                </label>
                                <select
                                  name="typePhysicalDisability"
                                  id="idType_of_Physical_Disability"
                                  onChange={handleChange}
                                  value={formData.typePhysicalDisability}
                                  className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                >
                                  <option value="">ประเภทของความพิการ</option>
                                  <option value="ทางการเคลื่อนไหว">
                                    ทางการเคลื่อนไหว
                                  </option>
                                  <option value="ทางการมองเห็น">
                                    ทางการมองเห็น
                                  </option>
                                  <option value="ทางการได้ยินและสื่อความหมาย">
                                    ทางการได้ยินและสื่อความหมาย
                                  </option>
                                  <option value="ทางจิตใจและพฤติกรรม">
                                    ทางจิตใจและพฤติกรรม
                                  </option>
                                  <option value="ทางสติปัญญา">
                                    ทางสติปัญญา
                                  </option>
                                  <option value="ทางการเรียนรู้">
                                    ทางการเรียนรู้
                                  </option>
                                  <option value="ทางออทิสติค">
                                    ทางออทิสติค
                                  </option>
                                  <option value="พิการมากกว่า 1 ประเภท">
                                    พิการมากกว่า 1 ประเภท
                                  </option>
                                </select>
                                {errors.typePhysicalDisability && (
                                  <div className="text-red-500 text-sm mt-1">
                                    {errors.typePhysicalDisability}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col md:flex-row md:space-x-4 mt-3">
                                <div className="w-full md:mb-0 ">
                                  <label
                                    htmlFor="firstName"
                                    className="relative"
                                  >
                                    สาเหตุของความพิการ
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <input
                                    className="border-2 border-b-4 flex-1 text-left p-2 bg-gray-100 w-full"
                                    id="idFirstname"
                                    name="firstName"
                                    placeholder="สาเหตุของความพิการ"
                                    onChange={handleChange}
                                    value={formData.firstName}
                                  />
                                  {errors.firstName && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.firstName}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="typePhysicalDisability"
                                    className="relative"
                                  >
                                    การสนับสนุนทางการเงิน
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <select
                                    name="typePhysicalDisability"
                                    id="idType_of_Physical_Disability"
                                    onChange={handleChange}
                                    value={formData.typePhysicalDisability}
                                    className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                  >
                                    <option value="">
                                      การสนับสนุนทางการเงิน
                                    </option>
                                    <option value="ต่ำกว่าประถมศึกษา">
                                      ต่ำกว่าประถมศึกษา
                                    </option>
                                    <option value="มัธยมศึกษา">
                                      มัธยมศึกษา
                                    </option>
                                    <option value="ประกาศนียบัตรวิชาชีพ ปวช/ปวส/ปวท">
                                      ประกาศนียบัตรวิชาชีพ ปวช/ปวส/ปวท
                                    </option>
                                    <option value="อนุปริญญา">อนุปริญญา</option>
                                    <option value="ปริญญาตรีหรือเทียบเท่า">
                                      ปริญญาตรีหรือเทียบเท่า
                                    </option>
                                    <option value="ปริญญาโท">ปริญญาโท</option>
                                    <option value="ประถมศึกษา">
                                      ประถมศึกษา
                                    </option>
                                    <option value="ปริญญาเอก">ปริญญาเอก</option>
                                  </select>
                                  {errors.typePhysicalDisability && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.typePhysicalDisability}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="typePhysicalDisability"
                                    className="relative"
                                  >
                                    สิทธิการรักษาพยาบาล
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <select
                                    name="typePhysicalDisability"
                                    id="idType_of_Physical_Disability"
                                    onChange={handleChange}
                                    value={formData.typePhysicalDisability}
                                    className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                  >
                                    <option value="">
                                      สิทธิการรักษาพยาบาล
                                    </option>
                                    <option value="ต้องการช่วยเหลือ">
                                      ต้องการช่วยเหลือ
                                    </option>
                                    <option value="ช่วยเหลือตัวเองได้">
                                      ช่วยเหลือตัวเองได้
                                    </option>
                                  </select>
                                  {errors.typePhysicalDisability && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.typePhysicalDisability}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-3">
                                  <label htmlFor="age" className="relative">
                                    อุปกรณ์ช่วยเหลือ
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
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
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="typePhysicalDisability"
                                    className="relative"
                                  >
                                    ความสามารถในการทำกิจวัตรประจำวัน
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <select
                                    name="typePhysicalDisability"
                                    id="idType_of_Physical_Disability"
                                    onChange={handleChange}
                                    value={formData.typePhysicalDisability}
                                    className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                  >
                                    <option value="">
                                      ประเภทความบกพร่องทางร่างกาย
                                    </option>
                                    <option value="มีความพิการ">
                                      มีความพิการ
                                    </option>
                                    <option value="สุขภาวะปกติ">
                                      สุขภาวะปกติ
                                    </option>
                                  </select>
                                  {errors.typePhysicalDisability && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.typePhysicalDisability}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="typePhysicalDisability"
                                    className="relative"
                                  >
                                    การศึกษาและการฝึกอบรม
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <select
                                    name="typePhysicalDisability"
                                    id="idType_of_Physical_Disability"
                                    onChange={handleChange}
                                    value={formData.typePhysicalDisability}
                                    className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                  >
                                    <option value="">
                                      ประเภทความบกพร่องทางร่างกาย
                                    </option>
                                    <option value="มีความพิการ">
                                      มีความพิการ
                                    </option>
                                    <option value="สุขภาวะปกติ">
                                      สุขภาวะปกติ
                                    </option>
                                  </select>
                                  {errors.typePhysicalDisability && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.typePhysicalDisability}
                                    </div>
                                  )}
                                </div>
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="houseAddressNumber"
                                    className="relative"
                                  >
                                    อาชีพและการทำงาน
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
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
                                <div className="items-start w-full mt-4">
                                  <label
                                    htmlFor="typePhysicalDisability"
                                    className="relative"
                                  >
                                    ความต้องการการช่วยเหลือ
                                    <span className="text-red-500 absolute">
                                      *
                                    </span>
                                  </label>
                                  <select
                                    name="typePhysicalDisability"
                                    id="idType_of_Physical_Disability"
                                    onChange={handleChange}
                                    value={formData.typePhysicalDisability}
                                    className="w-full p-2 border-gray-200 bg-gray-100 border-2 border-b-4"
                                  >
                                    <option value="">
                                      ประเภทความบกพร่องทางร่างกาย
                                    </option>
                                    <option value="มีความพิการ">
                                      มีความพิการ
                                    </option>
                                    <option value="สุขภาวะปกติ">
                                      สุขภาวะปกติ
                                    </option>
                                  </select>
                                  {errors.typePhysicalDisability && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.typePhysicalDisability}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </form>
                          </div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )}
              </div>
            </div>
            <Accordion className="bg-blue-500 m-2">
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>ข้อมูลสุขภาพพื้นฐาน</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="md:p-4">
                    <form className="" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="w-full md:mb-0">
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
                        <div className="">
                          <div className="w-full md:mb-0">
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
                        </div>
                      </div>
                      <div>
                        <div>iouios</div>
                      </div>
                    </form>
                    <div>
                      <Radio
                        checked={selectedValue === "iouios"}
                        onChange={handleChange}
                        value="iouios"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "iouios" }}
                      />
                      <Radio
                        checked={selectedValue === "iouioZ"}
                        onChange={handleChange}
                        value="iouioZ"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "iouioZ" }}
                      />
                    </div>
                    <div className="">
                      <button
                        onClick={addInputs}
                        className="pt-4 pb-4 text-blue-400 rounded"
                      >
                        + เพิ่มประวัติการผ่าตัด
                      </button>
                      <div className=" grid grid-cols-2 gap-4">
                        {inputs.map((input) => (
                          <div key={input.id} className="w-full">
                            <label
                              htmlFor={`searchInput-${input.id}`}
                              className="block mb-2"
                            >
                              {input.label}
                            </label>
                            <input
                              className="border-2 border-b-4 text-left p-2 bg-gray-100 w-full"
                              id={`searchInput-${input.id}`}
                              name={`searchInput-${input.id}`}
                              placeholder=""
                              value={input.value}
                              onChange={(e) =>
                                handleInputChange(input.id, e.target.value)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
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

export default HeaithRecordFrom;
