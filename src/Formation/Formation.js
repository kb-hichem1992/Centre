import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Formation.css";
import Form from "./FormationForm.js";
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
import Popup from "../components/Popup";
import Button from "../components/controls/Button";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import PageHeader from "../PageHeader.js";
import { Paper } from "@material-ui/core";
import TableCandForm from "../Candidat/TableCandForm";
import LaptopChromebookIcon from "@material-ui/icons/LaptopChromebook";
import { L10n } from "@syncfusion/ej2-base";
import { UserContext } from "../UserContext";
import AlertDialog from "../components/controls/Dialog";

require("es6-promise").polyfill();
require("isomorphic-fetch");

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

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    display: "inline-flex",
    margin: theme.spacing(2),
    minWidth: 170,
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function AppFor({ id }) {
  const { userData } = useContext(UserContext);
  const [data, setdata] = useState([]);
  const [openAjouter, setOpenAjouter] = useState(false);
  const [openModifier, setOpenModifier] = useState(false);
  const [etat, setEtat] = useState(false);
  const [open, setopen] = useState(false);
  const [Values, setValues] = useState();
  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id, etat]);

  const updateFormation = (
    numeroFormation,
    numeroAgrement,
    groupe,
    Type,
    Debut,
    Fin
  ) => {
    axios
      .put(process.env.REACT_APP_API_URL + "/update_formation", {
        Type: Type,
        Debut: Debut,
        Fin: Fin,
        numeroFormation: numeroFormation,
        numeroAgrement: numeroAgrement,
        groupe: groupe,
      })
      .then(() => {
        setEtat(!etat);
      });
  };
  const deleteFormation = (numeroFormation, numeroAgrement, groupe) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/delete_formation/${numeroFormation}/${numeroAgrement}/${groupe}`,
        {}
      )
      .then(() => {
        setEtat(!etat);
      });
  };

  const classes = useStyles();

  const filter = {
    type: "CheckBox",
  };

  const initialvalues = {
    NUMERO_FORMATION: "",
    NUMERO_AGREMENT: userData[0].NUMERO_AGREMENT,
    GROUPE: "",
    TYPE_FORMATION: "",
    DEBUT: new Date(),
    FIN: new Date(),
  };

  const TableRef = useRef(null);

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
  const addFormation = (
    numeroFormation,
    numeroAgrement,
    groupe,
    Type,
    Debut,
    Fin
  ) => {
    axios
      .post(process.env.REACT_APP_API_URL + `/Add_formation`, {
        numeroFormation: numeroFormation,
        numeroAgrement: numeroAgrement,
        groupe: groupe,
        Type: Type,
        Debut: Debut,
        Fin: Fin,
      })
      .then(() => {
        setEtat(!etat);
      });
  };

  //  const Values = rowSelected();

  return (
    <Fragment>
      <PageHeader
        title="الدورات التكوينية"
        subTitle="قائمة الدورات"
        icon={<LaptopChromebookIcon />}
      />
      <div className={classes.container}>
        <Button
          text="إضافة"
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          className={classes.newButton}
          onClick={() => {
            setOpenAjouter(true);
          }}
        />
        <Button
          text="تعديل"
          variant="outlined"
          size="small"
          startIcon={<EditOutlinedIcon />}
          className={classes.newButton}
          disabled={
            Values === undefined || userData[0].ADMIN !== "admin" ? true : false
          }
          onClick={() => {
            setOpenModifier(true);
          }}
        />
        <Button
          text="حذف"
          variant="outlined"
          size="small"
          color="secondary"
          startIcon={<DeleteIcon />}
          className={classes.newButton}
          disabled={
            Values === undefined || userData[0].ADMIN !== "admin" ? true : false
          }
          onClick={() => {
            setopen(true);
          }}
        />
      </div>
      <div className={classes.container}>
        <div id="cont">
          <GridComponent
            dataSource={data}
            allowPaging={true}
            pageSettings={{ pageSize: 50 }}
            allowFiltering={true}
            allowGrouping={true}
            filterSettings={filter}
            allowResizing={true}
            allowSorting={true}
            height={180}
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
                field="NUMERO_FORMATION"
                headerText="رقم الدورة"
              />
              <ColumnDirective field="GROUPE" headerText="الفوج" />
              <ColumnDirective
                field="TYPE_FORMATION"
                headerText="نوع التكوين"
              />
              <ColumnDirective
                field="DEBUT"
                headerText="تاريخ البداية"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="FIN"
                headerText="تاريخ النهاية"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize]} />
          </GridComponent>
        </div>
      </div>
      <PageHeader
        title="الدورات التكوينية"
        subTitle="ٌقائمة المترشحين لكل فوج "
        icon={<LaptopChromebookIcon />}
      />
      <Paper>
        <TableCandForm
          setEtat={setEtat}
          etat={etat}
          numeroFormation={Values === undefined ? 0 : Values.NUMERO_FORMATION}
          groupe={Values === undefined ? 0 : Values.GROUPE}
        />
      </Paper>

      <Popup
        title="إضافة"
        openPopup={openAjouter}
        setOpenPopup={setOpenAjouter}
      >
        <Form
          onClick={addFormation}
          Close={setOpenAjouter}
          values={initialvalues}
          etat={etat}
          setEtat={setEtat}
        />
      </Popup>

      <Popup
        title="تعديل"
        openPopup={openModifier}
        setOpenPopup={setOpenModifier}
      >
        <Form
          onClick={updateFormation}
          Close={setOpenModifier}
          values={Values}
        />
      </Popup>
      <AlertDialog
        title="تأكيد"
        message=" هل تريد حذف هذا الفوج ؟"
        open={open}
        setOpen={setopen}
        method={() => {
          deleteFormation(
            Values.NUMERO_FORMATION,
            userData[0].NUMERO_AGREMENT,
            Values.GROUPE
          );
          setopen(false);
        }}
      />
    </Fragment>
  );
}
export default AppFor;
