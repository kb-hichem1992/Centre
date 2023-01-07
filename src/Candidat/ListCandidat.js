import React, { useState, useEffect, useRef, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Candidat.css";
import { Paper } from "@material-ui/core";
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
  ContextMenu,
  ExcelExport,
  PdfExport,
  SortSettingsModel,
} from "@syncfusion/ej2-react-grids";
import { L10n } from "@syncfusion/ej2-base";
import Axios from "axios";
import Popup from "../components/Popup.js";
import Button from "../components/controls/Button";
import AddIcon from "@material-ui/icons/Add";
import CandidatInfo from "./CandidatInfo";
import { useLocalStorage } from "../useLocalStorage";
import DatePicker from "../components/controls/DatePicker";
import axios from "axios";

require("es6-promise").polyfill();
require("isomorphic-fetch");

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(2),
    height: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    width: "auto",
  },
  formControl: {
    display: "flex",
    margin: theme.spacing(1),
    minWidth: 170,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  Button: {
    marginInline: theme.spacing(1),
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
  div: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
}));

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
      Excelexport: "تصدير Excel",
      Copy: "نسخ",
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

export default function ListCandidat({
  selectedValue,
  etat,
  setEtat,
  setOpenPopup,
}) {
  const [data, setdata] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [admin] = useLocalStorage("typeUser", "");
  const [numeroAgrement] = useLocalStorage("user", 0);
  const [dateRecrutement, setDateRecrutement] = useState(null);
  const [DateFinRecrutement, setDateFinRectrutement] = useState(null);
  const [candidatValue, setcandidatValue] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/get_candidat_notAffected")
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [etat]);

  function convert(date) {
    if (date === null) {
      return null;
    } else {
      const current_datetime = new Date(date);
      const m = current_datetime.getMonth() + 1;
      if (m > 9) {
        return (
          current_datetime.getFullYear() +
          "-" +
          m +
          "-" +
          current_datetime.getDate()
        );
      } else {
        return (
          current_datetime.getFullYear() +
          "-" +
          0 +
          m +
          "-" +
          current_datetime.getDate()
        );
      }
    }
  }

  const filter = {
    type: "Menu",
  };
  const SortSettingsModel = {
    columns: [{ field: "DATE_INS", direction: "Descending " }],
  };
  const classes = useStyles();

  const TableRef2 = useRef(null);

  async function rowSelected() {
    try {
      const selectedrecords = await TableRef2.current.getSelectedRecords();
      const obj = JSON.stringify(selectedrecords);
      const parsedobj = JSON.parse(obj);
      setcandidatValue(parsedobj[0]);
    } catch (error) {
      console.log(error);
    }
  }
  const contextMenuItems = ["Copy", "ExcelExport"];

  const ContextMenuItemModel = [
    { text: "معلومات إضافية", target: ".e-content", id: "Details" },
  ];

  const contextMenuClick = (MenuEventArgs) => {
    if (
      TableRef2 &&
      MenuEventArgs.item.id === "Details" &&
      candidatValue !== undefined
    ) {
      setOpenDetail(true);
    }
  };

  const Add_travail = () => {
    let relation = "";

    if (DateFinRecrutement === null) {
      relation = "منتسب";
    } else {
      relation = "";
    }

    let dteRecrut = new Date(dateRecrutement);
    let dtefinRecrut = new Date(DateFinRecrutement);

    if (DateFinRecrutement !== null && dteRecrut >= dtefinRecrut) {
      alert("تاريخ نهاية العمل خاطئ");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/Add_travail`, {
          numeroEnregistrement: selectedValue.NUMERO_ENREGISTREMENT,
          NUM_INS: candidatValue.NUM_INS,
          DATE_INS: candidatValue.DATE_INS,
          NUM_PERMIS: candidatValue.NUM_PERMIS,
          DATE_RECRUTEMENT: convert(dateRecrutement),
          DATE_FIN: convert(DateFinRecrutement),
          ETAT: relation,
        })
        .then((response) => {
          if (response.data.message) {
            alert(response.data.message);
          } else {
            alert("terminé");
          }
        });
    }
  };

  return (
    <Fragment>
      <div className={classes.div}>
        <div className={classes.div}>
          <DatePicker
            label="تاريخ بداية العمل"
            value={dateRecrutement}
            onChange={setDateRecrutement}
          />
          <DatePicker
            label="تاريخ نهاية العمل"
            value={DateFinRecrutement}
            onChange={setDateFinRectrutement}
            disabled={dateRecrutement === null ? true : false}
          />
        </div>
        <div className={classes.div}>
          <Button
            text="إضافة"
            variant="outlined"
            size="large"
            startIcon={<AddIcon />}
            className={classes.newButton}
            disabled={
              candidatValue === undefined ||
              admin !== "admin" ||
              dateRecrutement === null
                ? true
                : false
            }
            onClick={() => {
              Add_travail();
            }}
          />
        </div>
      </div>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <GridComponent
            dataSource={data}
            enableRtl={true}
            allowPaging={true}
            pageSettings={{ pageSize: 5 }}
            allowFiltering={true}
            allowGrouping={true}
            filterSettings={filter}
            allowResizing={true}
            allowSorting={true}
            height={180}
            ref={TableRef2}
            contextMenuItems={[...ContextMenuItemModel, ...contextMenuItems]}
            contextMenuClick={contextMenuClick}
            allowExcelExport={true}
            allowPdfExport={true}
            sortSettings={SortSettingsModel}
            locale="ar-AE"
            rowSelected={rowSelected}
            rowDeselected={() => {
              setcandidatValue(undefined);
            }}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="NUM_INS"
                headerText="رقم التسجيل"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="NOM_CANDIDAT"
                headerText="اللقب"
                clipMode="EllipsisWithTooltip"
              />

              <ColumnDirective
                field="PRENOM_CANDIDAT"
                headerText="الاسم"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="PRENOM_PERE"
                headerText="إسم الأب"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="DATE_NAIS_CANDIDAT"
                headerText="تاريخ الميلاد"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
            </ColumnsDirective>
            <Inject
              services={[
                Page,
                Sort,
                Filter,
                Group,
                Resize,
                ContextMenu,
                PdfExport,
                ExcelExport,
              ]}
            />
          </GridComponent>
        </Paper>
      </div>

      <Popup
        title="بيانات المترشح"
        openPopup={openDetail}
        setOpenPopup={setOpenDetail}
      >
        <CandidatInfo
          key="CandidatInfo"
          Close={setOpenDetail}
          rowSelected={rowSelected}
          values={candidatValue}
        />
      </Popup>
    </Fragment>
  );
}
