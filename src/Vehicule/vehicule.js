import { makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
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
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import Button from "../components/controls/Button";
import AlertDialog from "../components/controls/Dialog";
import PageHeader from "../PageHeader";
import { useLocalStorage } from "../useLocalStorage";

export default function Vehicule(props) {
  const [admin] = useLocalStorage("typeUser", "");
  const [Values, setValues] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
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
    fetch(process.env.REACT_APP_API_URL + "/api/get_veh_Mar")
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

  const delete_vehicule = () => {
    const MATRECULE = Values.MATRECULE;
    axios
      .delete(`${process.env.REACT_APP_API_URL}/delete_vehicule/${MATRECULE}`)
      .then(() => {
        setEtat(!etat);
      });
  };
  return (
    <Fragment>
      <PageHeader
        title=" العربات"
        subTitle="قائمة العربات"
        icon={<LocalShippingIcon />}
      />
      <div className={classes.container}>
        <div>
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
            <ColumnDirective field="MATRECULE" headerText="الترقيم " />
            <ColumnDirective field="MARQUE" headerText=" العلامة" />
            <ColumnDirective
              field="NUMERO_ENREGISTREMENT"
              headerText=" رقم القيد"
            />
            <ColumnDirective field="NOM_OP" headerText="  المتعامل " />
            <ColumnDirective field="PROPRIETAIRE" headerText=" المسير  " />
            <ColumnDirective field="PTC" headerText="ptc " />
            <ColumnDirective field="PTAC" headerText="ptac " />
            <ColumnDirective field="CU" headerText="cu" />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize]} />
        </GridComponent>
      </div>

      <AlertDialog
        title="تأكيد"
        message=" هل تريد حذف هذا المتعامل ؟"
        open={openAlert}
        setOpen={setOpenAlert}
        method={() => {
          delete_vehicule();
          setOpenAlert(false);
        }}
      />
    </Fragment>
  );
}
