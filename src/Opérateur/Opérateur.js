import React, { Fragment, useEffect, useRef, useState } from "react";
import "./Opérateur.css";
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Inject,
  Filter,
  Group,
  Resize,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { makeStyles } from "@material-ui/core";
import Button from "../components/controls/Button";
import { L10n } from "@syncfusion/ej2-base";
import PageHeader from "../PageHeader";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { useLocalStorage } from "../useLocalStorage";
import Popup from "../components/Popup";
import ListTravailleur from "./ListTravailleur";
import OperateurForm from "./Operateur_form.js";
import axios from "axios";
import AlertDialog from "../components/controls/Dialog";
import CadidatList from "../Candidat/CadidatList";
import PopupFull from "../components/PopupFullScreen";
import VehiculeForm from "../Vehicule/vehiculeForm";
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";
import GroupIcon from "@mui/icons-material/Group";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function Operateur(props) {
  const [admin] = useLocalStorage("typeUser", "");
  const [Values, setValues] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [openVehForm, setopenVehForm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openCandList, setOpenCandList] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [etat, setEtat] = useState(false);
  L10n.load({
    "ar-AE": {
      grid: {
        EmptyDataSourceError:
          "يجب أن يكون مصدر البيانات فارغة في التحميل الأولي منذ يتم إنشاء الأعمدة من مصدر البيانات في أوتوجينيراتد عمود الشبكة",
        EmptyRecord: "لا سجلات لعرضها",
        SelectAll: "أختر الكل",
        FilterButton: "بحث ",
        ClearButton: "مسح ",
        Search: "بحث ",
        GroupDropArea: "اسحب رأس العمود هنا لتجميع العمود الخاص به ",
      },

      pager: {
        currentPageInfo: "{0} من {1} صفحة",
        firstPageTooltip: "انتقل إلى الصفحة الأولى",
        lastPageTooltip: "انتقل إلى الصفحة الأخيرة",
        nextPageTooltip: "انتقل إلى الصفحة التالية",
        nextPagerTooltip: "الذهاب إلى بيجر المقبل",
        previousPageTooltip: "انتقل إلى الصفحة السابقة",
        previousPagerTooltip: "الذهاب إلى بيجر السابقة",
        totalItemsInfo: "({0} العناصر)",
      },
    },
  });
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/getOp")
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [etat]);

  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      display: "flex",
      justifyContent: "space-between",
    },
  }));

  const TableRef = useRef(null);

  const classes = useStyles();

  const filter = {
    type: "CheckBox",
  };

  async function rowSelected() {
    try {
      const selectedrecords = await TableRef.current.getSelectedRecords();
      const obj = JSON.stringify(selectedrecords);
      const parsedobj = JSON.parse(obj);
      setValues(parsedobj[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const initialvalues = {
    NOM_OP: "",
    SIEGE_OP: "",
    PROPRIETAIRE: "",
    WILAYA: "",
    NUMERO_ENREGISTREMENT: "",
    DATE_ENREGISTREMENT: new Date(),
  };

  const delete_operateur = (numeroEnregistrement) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/delete_operateur`, {
        numeroEnregistrement: numeroEnregistrement,
      })
      .then(() => {
        setEtat(!etat);
      });
  };
  return (
    <Fragment>
      <PageHeader
        title=" المتعاملين"
        subTitle="قائمة المتعاملين"
        icon={<GroupIcon />}
      />
      <div className={classes.container}>
        <div>
          <Button
            text="إضافة"
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenAdd(true);
            }}
          />
          <Button
            text="تعديل"
            variant="outlined"
            size="small"
            startIcon={<EditOutlinedIcon />}
            className={classes.newButton}
            disabled={Values === undefined || admin !== "admin" ? true : false}
            onClick={() => {
              setOpenUpdate(true);
            }}
          />
          <Button
            text="حذف"
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<DeleteIcon />}
            className={classes.newButton}
            disabled={Values === undefined || admin !== "admin" ? true : false}
            onClick={() => {
              setOpenAlert(true);
            }}
          />
        </div>
        <div>
          <Button
            text="إضافة عامل"
            variant="outlined"
            size="small"
            startIcon={<SupervisedUserCircleIcon />}
            className={classes.newButton}
            disabled={Values === undefined || admin !== "admin" ? true : false}
            onClick={() => {
              setOpenCandList(true);
            }}
          />
          <Button
            text="إضافة عربة"
            variant="outlined"
            size="small"
            startIcon={<LocalShippingIcon />}
            className={classes.newButton}
            disabled={Values === undefined || admin !== "admin" ? true : false}
            onClick={() => {
              setopenVehForm(true);
            }}
          />
          <Button
            text="قائمة العمال"
            variant="outlined"
            size="small"
            startIcon={<PersonOutlineSharpIcon />}
            className={classes.newButton}
            disabled={Values === undefined || admin !== "admin" ? true : false}
            onClick={() => {
              setOpenList(true);
            }}
          />
        </div>
      </div>
      <div id="cont">
        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={{ pageSize: 10 }}
          allowFiltering={true}
          allowGrouping={true}
          filterSettings={filter}
          allowResizing={true}
          allowSorting={true}
          height={200}
          ref={TableRef}
          enableRtl={true}
          locale="ar-AE"
          rowSelected={rowSelected}
          rowDeselected={() => {
            setValues(undefined);
          }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="NUMERO_ENREGISTREMENT"
              headerText=" رقم القيد"
            />
            <ColumnDirective
              field="DATE_ENREGISTREMENT"
              headerText=" تاريخ القيد "
            />
            <ColumnDirective field="NOM_OP" headerText="إسم المتعامل" />
            <ColumnDirective field="PROPRIETAIRE" headerText=" المسير  " />
            <ColumnDirective field="SIEGE_OP" headerText="عنوان المقر" />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize]} />
        </GridComponent>
      </div>
      <Popup
        title="قائمة المترشحين"
        openPopup={openCandList}
        setOpenPopup={setOpenCandList}
      >
        <CadidatList
          setOpenPopup={setOpenCandList}
          etat={etat}
          setEtat={setEtat}
          selectedValue={Values}
        />
      </Popup>
      <Popup
        title=" إضافة المتعامل"
        openPopup={openAdd}
        setOpenPopup={setOpenAdd}
      >
        <OperateurForm
          type="Add"
          Values={initialvalues}
          setEtat={setEtat}
          etat={etat}
          Close={setOpenAdd}
        />
      </Popup>
      <Popup
        title=" تعديل المتعامل"
        openPopup={openUpdate}
        setOpenPopup={setOpenUpdate}
      >
        <OperateurForm
          type="update"
          Values={Values}
          setEtat={setEtat}
          etat={etat}
          Close={setOpenUpdate}
        />
      </Popup>
      <Popup
        title="  إضافة عربة"
        openPopup={openVehForm}
        setOpenPopup={setopenVehForm}
      >
        <VehiculeForm
          type="update"
          Values={Values}
          setEtat={setEtat}
          etat={etat}
          Close={setOpenUpdate}
        />
      </Popup>
      <PopupFull
        title=" قائمة العمال "
        openPopup={openList}
        setOpenPopup={setOpenList}
      >
        <ListTravailleur
          api={"/api/get_candidat_foreach_operateur/"}
          selectedValue={Values || ""}
          type="show"
        />
      </PopupFull>
      <AlertDialog
        title="تأكيد"
        message=" هل تريد حذف هذا المتعامل ؟"
        open={openAlert}
        setOpen={setOpenAlert}
        method={() => {
          delete_operateur(Values.NUMERO_ENREGISTREMENT);
          setOpenAlert(false);
        }}
      />
    </Fragment>
  );
}
