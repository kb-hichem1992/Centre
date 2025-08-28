import { makeStyles } from "@material-ui/core";
import { L10n } from "@syncfusion/ej2-base";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Resize,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { useEffect, useRef, useState } from "react";
import Button from "../components/controls/Button";
import "./Opérateur.css";

import DeleteIcon from "@material-ui/icons/Delete";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useLocalStorage } from "../Utils/useLocalStorage";

import axios from "axios";
import Popup from "../components/Popup";
import TravailDateForm from "./travailDateForm";

export default function ListTravailleur(props) {
  const [admin] = useLocalStorage("typeUser", "");
  const [Values, setValues] = useState();
  const [openDateForm, setopenDateForm] = useState(false);
  const [state, setstate] = useState(false);
  const NUMERO_ENREGISTREMENT = props.selectedValue.NUMERO_ENREGISTREMENT;

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
    fetch(process.env.REACT_APP_API_URL + props.api + NUMERO_ENREGISTREMENT)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [NUMERO_ENREGISTREMENT, state]);

  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      display: "flex",
      justifyContent: "flex-end",
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

  const selectCandidat = () => {
    props.setnum_peris(Values.NUM_PERMIS);
    props.setOpenPopup(false);
  };
  const delete_travail = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/delete_travail`, {
        numeroEnregistrement: Values.NUMERO_ENREGISTREMENT,
        NUM_INS: Values.NUM_INS,
        DATE_INS: Values.DATE_INS,
        NUM_PERMIS: Values.NUM_PERMIS,
        DATE_RECRUTEMENT: Values.DATE_RECRUT,
      })
      .then(() => {
        setstate(!state);
        alert("تم الحذف");
      });
  };
  return (
    <>
      <div className={classes.container}>
        {props.api === "/api/get_candidat_foreach_operateur_noVehcule/" ? (
          <Button
            text="تأكيد"
            variant="outlined"
            size="small"
            startIcon={<EditOutlinedIcon />}
            className={classes.newButton}
            disabled={Values === undefined ? true : false}
            onClick={selectCandidat}
          />
        ) : (
          <div>
            <Button
              text="تعديل"
              variant="outlined"
              size="small"
              startIcon={<EditOutlinedIcon />}
              className={classes.newButton}
              disabled={
                Values === undefined || admin !== "admin" ? true : false
              }
              onClick={() => {
                setopenDateForm(true);
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
                Values === undefined || admin !== "admin" ? true : false
              }
              onClick={delete_travail}
            />
          </div>
        )}
      </div>
      <div style={{ width: "auto" }}>
        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={{ pageSize: 10 }}
          allowFiltering={true}
          allowGrouping={true}
          filterSettings={filter}
          allowResizing={true}
          allowSorting={true}
          height={300}
          ref={TableRef}
          enableRtl={true}
          locale="ar-AE"
          rowSelected={rowSelected}
          rowDeselected={() => {
            setValues(undefined);
          }}
        >
          <ColumnsDirective>
            <ColumnDirective field="NUM_INS" headerText="رقم التسجيل " />
            <ColumnDirective field="NUM_PERMIS" headerText="رخصة السياقة" />
            <ColumnDirective field="NOM_CANDIDAT" headerText="اللفب" />
            <ColumnDirective field="PRENOM_CANDIDAT" headerText="الإسم" />
            <ColumnDirective
              field="DATE_NAIS_CANDIDAT"
              headerText="تاريخ الميلاد"
            />
            <ColumnDirective field="DATE_RECRUT" headerText="بداية التوظيف" />
            <ColumnDirective field="DATE_FIN" headerText="نهابة التوظيف" />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize]} />
        </GridComponent>
      </div>
      <Popup
        title=" تعديل تاريخ الإنتساب"
        openPopup={openDateForm}
        setOpenPopup={setopenDateForm}
      >
        <TravailDateForm
          setOpenPopup={setopenDateForm}
          selectedValue={Values}
          state={state}
          setstate={setstate}
        />
      </Popup>
    </>
  );
}
