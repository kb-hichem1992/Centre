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

export default function ListTravailleur() {
  const [admin] = useLocalStorage("typeUser", "");
  const [Values, setValues] = useState();

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
    fetch("http://localhost:3001/api/getOp")
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, []);

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

  return (
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
          <ColumnDirective field="NUM_INS" headerText="رقم التسجيل " />
          <ColumnDirective field="NUM_PERMIS" headerText="رخصة السياقة" />
          <ColumnDirective field="NOM_CANDIDAT" headerText="اللفب" />
          <ColumnDirective field="PRENOM_CANDIDAT" headerText="الإسم" />
          <ColumnDirective
            field="DATE_NAIS_CANDIDAT"
            headerText="تاريخ الميلاد"
          />
          <ColumnDirective
            field="LIEU_NAIS_CANDIDAT"
            headerText="مكان الميلاد"
          />
          <ColumnDirective field="DATE_RECRUT" headerText="بداية التوظيف" />
          <ColumnDirective field="DATE_FIN" headerText="نهابة التوظيف" />
          <ColumnDirective field="ETAT" headerText="الحالة المهنية " />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Group, Resize]} />
      </GridComponent>
    </div>
  );
}
