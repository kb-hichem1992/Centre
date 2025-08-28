import React, { Fragment, useEffect, useRef, useState } from "react";

import "../Candidat/Candidat.css";
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  ContextMenu,
  Page,
  Inject,
  Filter,
  Group,
  Resize,
  Sort,
  ExcelExport,
  PdfExport,
  ColumnMenu,
  Edit,
} from "@syncfusion/ej2-react-grids";
import { L10n } from "@syncfusion/ej2-base";
import PageHeader from "../PageHeader";
import SearchIcon from "@material-ui/icons/Search";
import { useLocalStorage } from "../Utils/useLocalStorage";
import axios from "../Utils/setupAxios";

export default function SearchTable() {
  const [data, setdata] = useState([]);
  const [numeroAgrement] = useLocalStorage("user", 0);
  const [side] = useLocalStorage("side");

  useEffect(() => {     
    axios.get(`/api/Passing_List/${numeroAgrement}`)
      .then((response) => setdata(response.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setdata([]);
      });
    }, [numeroAgrement]);



  const groupOptions = { showGroupedColumn: true };
  const filterSettings = { type: "Menu" };

  const TableRef3 = useRef(null);
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
        StartsWith: "يبدأ بي",
        EndsWith: "ينتهي بي",
        Contains: "يحتوي على",
        Equal: "يساوي",
        NotEqual: "لا يساوي",
        LessThan: "أقل من",
        LessThanOrEqual: "أقل أو يساوي",
        GreaterThan: "أكبر من",
        GreaterThanOrEqual: "أكبر أو يساوي",
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
  return (
    <Fragment>
      <PageHeader
        title="قائمة البحث "
        subTitle="قائمة المترشحين الذين إجتازوا أو سجلوا في الدورات"
        icon={<SearchIcon />}
      />

      <div id="cont">
        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={{ pageSize: 13 }}
          allowFiltering={true}
          allowGrouping={true}
          allowResizing={true}
          allowSorting={true}
          height="auto"
          ref={TableRef3}
          enableRtl={true}
          locale="ar-AE"
          contextMenuItems={contextMenuItems}
          allowExcelExport={true}
          groupSettings={groupOptions}
          filterSettings={filterSettings}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="NUMERO_AGREMENT"
              headerText="رقم المركز"
              clipMode="EllipsisWithTooltip"
              visible={side === "مركز" ? false : true}
            />
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
              headerText="الإسم"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="DATE_NAIS_CANDIDAT"
              headerText=" تاريخ الميلاد"
              type="date"
              format="dd/MM/yyyy"
              clipMode="EllipsisWithTooltip"
              allowFiltering={false}
            />
            <ColumnDirective
              field="NUMERO_FORMATION"
              headerText=" رقم الدورة"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="GROUPE"
              headerText=" الفوج"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="TYPE_FORMATION"
              headerText=" التخصص"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="REMARQUE"
              headerText="الملاحظة"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="NOTE"
              headerText="العلامة"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="BREVET"
              headerText="رقم الشهادة"
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
              ColumnMenu,
              PdfExport,
              Group,
              Edit,
            ]}
          />
        </GridComponent>
      </div>
    </Fragment>
  );
}
