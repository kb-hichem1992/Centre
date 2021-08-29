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

export default function Opérateur(props) {
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
  }, [data]);

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

  function rowSelected() {
    try {
      if (TableRef !== null) {
        const selectedrecords = TableRef.current.getSelectedRecords();
        const obj = JSON.stringify(selectedrecords);
        const parsedobj = JSON.parse(obj);
        return parsedobj[0];
      }
    } catch (error) {
      console.log(error);
    }
  }

  const values = rowSelected();

  return (
    <Fragment>
      <div id="cont">
        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={{ pageSize: 5 }}
          allowFiltering={true}
          allowGrouping={true}
          filterSettings={filter}
          allowResizing={true}
          allowSorting={true}
          height={100}
          ref={TableRef}
          enableRtl={true}
          locale="ar-AE"
        >
          <ColumnsDirective>
            <ColumnDirective field="NOM_OP" headerText="إسم المتعامل" />
            <ColumnDirective field="SIEGE_OP" headerText="عنوان المقر" />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize]} />
        </GridComponent>
      </div>
      <div className={classes.container}>
      
        <Button
          text="إختر"
          variant="outlined"
          size="small"
          className={classes.newButton}
          onClick={() => {
            if (values !== undefined) {
              props.setOp(values.NOM_OP);
              props.Close(false);
            } else {
              alert("يرجى إختيار المنعامل");
            }
          }}
        />
      </div>
    </Fragment>
  );
}
