import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@syncfusion/ej2-react-grids";
import Popup from "../components/Popup.js";
import Button from "../components/controls/Button";
import PageHeader from "../PageHeader";
import BrevetForm from "../Formation/BrevetForm.js";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import axios from "axios";
import { L10n } from "@syncfusion/ej2-base";
//import { UserContext } from "../UserContext.js";
import PrintIcon from "@material-ui/icons/Print";
import AlertDialog from "../components/controls/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import BrevetDateForm from "./BrevetDateForm.js";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useLocalStorage } from "../useLocalStorage";

require("es6-promise").polyfill();
require("isomorphic-fetch");
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButton-text": {
      fontSize: "100px",
    },
    "& .MuiAlert-message": {
      fontSize: "20px",
    },
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
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

export default function AppBrevet({ id }) {
  const [data, setdata] = useState([]);
  const [openModifier, setOpenModifier] = useState(false);
  const [etat, setEtat] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openDateBrevet, setopenDateBrevet] = useState(false);
  const [Values, setValues] = useState();
  const [admin, setAdmin] = useLocalStorage("typeUser", "");

  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id, etat]);

  const filter = {
    type: "CheckBox",
  };

  const insertBrevet = (
    NumeroBrevet,
    LivBrevet,
    ExpBrevet,
    numeroCandidat,
    Date_ins,
    Num_permis,
    numeroFormation,
    numeroAgrement,
    GROUPE
  ) => {
    axios
      .put(process.env.REACT_APP_API_URL + "/insert_brevet", {
        NumeroBrevet: NumeroBrevet,
        LivBrevet: LivBrevet,
        ExpBrevet: ExpBrevet,
        numeroCandidat: numeroCandidat,
        Date_ins: Date_ins,
        Num_permis: Num_permis,
        numeroFormation: numeroFormation,
        numeroAgrement: numeroAgrement,
        GROUPE: GROUPE,
      })
      .then(() => {
        setEtat(!etat);
      });
  };

  const setPrinted = (
    numeroCandidat,
    Num_permis,
    dateins,
    numeroFormation,
    GROUPE,
    numeroAgrement
  ) => {
    axios
      .put(process.env.REACT_APP_API_URL + "/Printed", {
        numeroCandidat: numeroCandidat,
        Num_permis: Num_permis,
        dateins: dateins,
        numeroFormation: numeroFormation,
        GROUPE: GROUPE,
        numeroAgrement: numeroAgrement,
      })
      .then(() => {
        console.log("");
      });
  };

  const contextMenuItems = ["Copy", "ExcelExport"];
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

  const classes = useStyles();

  const TableRef2 = useRef(null);

  async function rowSelected() {
    try {
      const selectedrecords = await TableRef2.current.getSelectedRecords();
      const obj = JSON.stringify(selectedrecords);
      const parsedobj = JSON.parse(obj);
      setValues(parsedobj[0]);
    } catch (error) {
      console.log(error);
    }
  }
  //  const Values = rowSelected();
  //  const { userData } = useContext(UserContext);
  const handleClick = () => {
    setOpenSnack(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const showPdf = (e) => {
    e.preventDefault();
    if (Values.PRINT === 1) {
      setOpen(true);
    } else {
      setPrinted(
        Values.NUM_INS,
        Values.NUM_PERMIS,
        Values.DATE_INS,
        Values.NUMERO_FORMATION,
        Values.GROUPE,
        Values.NUMERO_AGREMENT
      );
      handleClick();
      window.open(
        process.env.REACT_APP_API_URL +
          "/report/DIPLOME/" +
          Values.NUM_INS +
          "/" +
          Values.NUMERO_FORMATION +
          "/" +
          Values.DATE_INS +
          "/" +
          Values.NUMERO_AGREMENT +
          "/" +
          Values.GROUPE +
          ""
      );
    }
  };

  return (
    <Fragment>
      <PageHeader
        title="الشهادات"
        subTitle="قائمة الشهادات المستخرجة"
        icon={<LibraryBooksIcon />}
      />
      <div className={classes.container}>
        <form onSubmit={showPdf}>
          <Button
            type="submit"
            text="طباعة"
            variant="outlined"
            size="small"
            startIcon={<PrintIcon />}
            className={classes.newButton}
            disabled={
              Values === undefined || admin !== "admin" ? true : false
            }
          />
        </form>
        <Button
          text="تاريخ الصلاحية"
          variant="outlined"
          size="small"
          startIcon={<EditOutlinedIcon />}
          className={classes.newButton}
          disabled={Values === undefined || admin !== "admin" ? true : false}
          onClick={() => {
            setopenDateBrevet(true);
          }}
        />
      </div>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <GridComponent
            dataSource={data}
            allowPaging={true}
            pageSettings={{ pageSize: 100 }}
            allowFiltering={true}
            allowGrouping={true}
            filterSettings={filter}
            allowResizing={true}
            allowSorting={true}
            height={180}
            ref={TableRef2}
            enableRtl={true}
            locale="ar-AE"
            contextMenuItems={contextMenuItems}
            allowExcelExport={true}
            rowSelected={rowSelected}
            rowDeselected={() => {
              setValues(undefined);
            }}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="BREVET"
                headerText="رقم الشهادة"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="DATE_EMISSION"
                headerText="تاريخ التسليم"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="NOM_CANDIDAT"
                headerText="اللقب"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="PRENOM_CANDIDAT"
                headerText="الإسم"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="LIV_BREVET"
                headerText="تاريخ بداية الصلاحية"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="EXP_BREVET"
                headerText="تاريخ نهاية الصلاحية"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="TYPE_FORMATION"
                headerText="نوع الدورة"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="NUMERO_FORMATION"
                headerText="رقم الدورة"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="GROUPE"
                headerText=" الفوج"
                clipMode="EllipsisWithTooltip"
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
                ExcelExport,
              ]}
            />
          </GridComponent>
        </Paper>
      </div>
      <Popup
        title="تعديل"
        openPopup={openModifier}
        setOpenPopup={setOpenModifier}
      >
        <BrevetForm
          onClick={insertBrevet}
          Close={setOpenModifier}
          values={Values}
          data={data}
        />
      </Popup>
      <Popup
        title="تاريخ الصلاحية"
        openPopup={openDateBrevet}
        setOpenPopup={setopenDateBrevet}
      >
        <BrevetDateForm
          setEtat={setEtat}
          etat={etat}
          Close={setopenDateBrevet}
          values={Values}
        />
      </Popup>
      <AlertDialog
        title="تنبيه"
        message="هذه الشهادة قد طبعت من قبل. هل تود طباعتها من جديد؟"
        open={open}
        setOpen={setOpen}
        method={() => {
          window.open(
            process.env.REACT_APP_API_URL +
              "/report/DIPLOME/" +
              Values.NUM_INS +
              "/" +
              Values.NUMERO_FORMATION +
              "/" +
              Values.DATE_INS +
              "/" +
              Values.NUMERO_AGREMENT +
              "/" +
              Values.GROUPE +
              ""
          );
        }}
      />
      <div className={classes.root}>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="info">
            طبعت لأول مرة
          </Alert>
        </Snackbar>
      </div>
    </Fragment>
  );
}
