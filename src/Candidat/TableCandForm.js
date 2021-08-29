import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Candidat.css";
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
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import Button from "../components/controls/Button";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Popup from "../components/Popup";
import PasseFrom from "../Formation/PasseForm";
import axios from "axios";
import BrevetForm from "../Formation/BrevetForm";
import { L10n } from "@syncfusion/ej2-base";
import { UserContext } from "../UserContext";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import TableFormation from "../Formation/TableFormation.js";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialog from "../components/controls/Dialog";
import GroupeForm from "../Formation/GroupeForm";

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
}));

export default function TableCandForm({
  setEtat,
  etat,
  numeroFormation,
  groupe,
}) {
  const [data, setdata] = useState([]);
  const [openModifier, setOpenModifier] = useState(false);
  const [openImprimer, setOpenImprimer] = useState(false);
  const [openFormation, setOpenFormation] = useState(false);
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openNumero, setOpenNumero] = useState(false);
  const numeroAgrement = userData[0].NUMERO_AGREMENT;

  useEffect(() => {
    fetch(
      `http://localhost:3001/api/get_candidat_form/${numeroFormation}/${numeroAgrement}/${groupe}`
    )
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [etat, numeroFormation, numeroAgrement, groupe]);

  const filter = {
    type: "CheckBox",
  };

  const TableRef3 = useRef(null);
  const classes = useStyles();
  const GroupSettingsModel = { columns: ["GROUPE"] };

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
  const contextMenuItems = ["Copy", "ExcelExport"];

  const updatePasse = (
    remarque,
    note,
    numeroCandidat,
    Num_permis,
    dateins,
    numeroFormation,
    GROUPE,
    numeroAgrement
  ) => {
    axios
      .put("http://localhost:3001/update_passe", {
        remarque: remarque,
        note: note,
        numeroCandidat: numeroCandidat,
        Num_permis: Num_permis,
        dateins: dateins,
        numeroFormation: numeroFormation,
        GROUPE: GROUPE,
        numeroAgrement: numeroAgrement,
      })
      .then(() => {
        setEtat(!etat);
      });
  };
  const insertBrevet = (
    NumeroBrevet,
    numeroCandidat,
    Date_ins,
    Num_permis,
    numeroFormation,
    numeroAgrement,
    GROUPE
  ) => {
    axios
      .put("http://localhost:3001/insert_brevet", {
        NumeroBrevet: NumeroBrevet,
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
  const deletePasse = (
    numeroCandidat,
    Date_ins,
    Num_permis,
    numeroFormation,
    groupe,
    numeroAgrement
  ) => {
    axios
      .post(`http://localhost:3001/delete_passe`, {
        numeroCandidat: numeroCandidat,
        Date_ins: Date_ins,
        Num_permis: Num_permis,
        numeroFormation: numeroFormation,
        groupe: groupe,
        numeroAgrement: numeroAgrement,
      })
      .then(() => {
        setEtat(!etat);
      });
  };
  function rowSelected() {
    try {
      const selectedrecords = TableRef3.current.getSelectedRecords();
      const obj = JSON.stringify(selectedrecords);
      const parsedobj = JSON.parse(obj);
      return parsedobj[0];
    } catch (error) {
      console.log(error);
    }
  }
  const Values = rowSelected();

  return (
    <Fragment>
      <div className={classes.container}>
        <Button
          text="قرار لجنة المداولة"
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
          text="شهادة"
          variant="outlined"
          size="small"
          color="primary"
          disabled={
            Values === undefined ||
            Values.NOTE < 10 ||
            userData[0].ADMIN !== "admin"
              ? true
              : false
          }
          startIcon={<LibraryBooksIcon />}
          className={classes.newButton}
          onClick={() => {
            setOpenImprimer(true);
          }}
        />
        <Button
          text="تكوين"
          variant="outlined"
          size="small"
          startIcon={<DeleteIcon />}
          className={classes.newButton}
          disabled={
            Values === undefined || Values.REMARQUE === "ناجح" ? true : false
          }
          onClick={() => {
            setOpenFormation(true);
          }}
        />
        <Button
          text="حذف"
          variant="outlined"
          size="small"
          color="secondary"
          startIcon={<EditOutlinedIcon />}
          className={classes.newButton}
          disabled={
            Values === undefined ||
            userData[0].ADMIN !== "admin" ||
            Values.REMARQUE === "ناجح" ||
            Values.NOTE > 0
              ? true
              : false
          }
          onClick={() => {
            setOpen(true);
          }}
        />
        <Button
          text="رقم الترتيب"
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<EditOutlinedIcon />}
          className={classes.newButton}
          disabled={Values === undefined || userData[0].ADMIN !== "admin"}
          onClick={() => {
            setOpenNumero(true);
          }}
        />
      </div>
      <div id="cont">
        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={{ pageSize: 100 }}
          allowFiltering={true}
          allowGrouping={true}
          filterSettings={filter}
          allowResizing={true}
          allowSorting={true}
          height={200}
          width="auto"
          ref={TableRef3}
          enableRtl={true}
          locale="ar-AE"
          groupSettings={GroupSettingsModel}
          contextMenuItems={contextMenuItems}
          allowExcelExport={true}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="GROUPE"
              headerText="الفوج"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective field="NUMERO" headerText="رقم" Width={50} />
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
              field="DATE_NAIS_CANDIDAT"
              headerText="تاريخ الميلاد "
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="LIEU_NAIS_CANDIDAT"
              headerText="مكان الميلاد "
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="ADRESSE_CANDIDAT"
              headerText=" العنوان "
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="CATEGORIE_PERMIS"
              headerText=" أصناف رخصة السياقة "
              clipMode="EllipsisWithTooltip"
              Width='100'
            />
            <ColumnDirective
              field="DATE_LIV_PERMIS"
              headerText="تاريخ إصدار رخصة السياقة"
              clipMode="EllipsisWithTooltip"
              Width="120"
            />
            <ColumnDirective
              field="REMARQUE"
              headerText="الملاحظة"
              clipMode="EllipsisWithTooltip"
              Width="100"
            />
            <ColumnDirective
              field="NOTE"
              headerText="العلامة"
              clipMode="EllipsisWithTooltip"
              Width="80"
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize, ExcelExport]} />
        </GridComponent>
      </div>
      <Popup
        title="تعديل"
        openPopup={openModifier}
        setOpenPopup={setOpenModifier}
      >
        <PasseFrom
          onClick={updatePasse}
          Close={setOpenModifier}
          values={Values}
        />
      </Popup>
      <Popup
        title="الشهادة"
        openPopup={openImprimer}
        setOpenPopup={setOpenImprimer}
      >
        <BrevetForm
          onClick={insertBrevet}
          Close={setOpenImprimer}
          values={Values}
          data={data}
        />
      </Popup>
      <Popup
        title="الترتيب"
        openPopup={openNumero}
        setOpenPopup={setOpenNumero}
      >
        <GroupeForm
          close={setOpenNumero}
          values={Values}
          data={data}
          etat={etat}
          setEtat={setEtat}
        />
      </Popup>
      <Popup
        title="تحديد التكوين"
        openPopup={openFormation}
        setOpenPopup={setOpenFormation}
      >
        <TableFormation
          key="TableFormation"
          Close={setOpenFormation}
          rowSelected={rowSelected}
          valeur={Values}
        />
      </Popup>
      <AlertDialog
        title="تحذير"
        message="هل انت متأكد ؟"
        open={open}
        setOpen={setOpen}
        method={() => {
          deletePasse(
            Values.NUM_INS,
            Values.DATE_INS,
            Values.NUM_PERMIS,
            Values.NUMERO_FORMATION,
            Values.GROUPE,
            Values.NUMERO_AGREMENT
          );
        }}
      />
    </Fragment>
  );
}
