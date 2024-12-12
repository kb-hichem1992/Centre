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
import axios from "axios";
import {
  Fragment,
  useEffect,
  useRef,
  useState
} from "react";
import Button from "../components/controls/Button";
import AlertDialog from "../components/controls/Dialog";
import { useLocalStorage } from "../useLocalStorage";
import "./Formation.css";

export default function TableFormation(props) {
  const [data, setdata] = useState([]);
  const [passdata, setpassdata] = useState([]);
  const { NUM_INS, DATE_INS, NUM_PERMIS } = props.valeur;
  const [Values, setValues] = useState();
  const [numeroAgrement] = useLocalStorage("user");
  const [open, setOpen] = useState(false);




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
  function convert(date) {
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

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/get_form/" + numeroAgrement)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [numeroAgrement]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/get_passe")
      .then((response) => response.json())
      .then((json) => setpassdata(json));
  }, []);

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

  //  const values = rowSelected();

  const AffecteFormation = (
    numeroCandidat,
    Date_ins,
    Num_permis,
    numeroFormation,
    numeroAgrement,
    groupe
  ) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/Add_passe", {
        numeroCandidat: numeroCandidat,
        Date_ins: Date_ins,
        Num_permis: Num_permis,
        numeroFormation: numeroFormation,
        numeroAgrement: numeroAgrement,
        groupe: groupe,
      })
      .then(() => {
        alert("تمت العملية بنجاح");
        props.Close(false);
      });
  };

  function dejaInscrit(
    Num_permis,
    numeroCandidat,
    Date_ins,
    numeroFormation,
    numeroAgrement,
    groupe
  ) {
    return passdata.some(function (el) {
      if (
        el.NUM_PERMIS === Num_permis &&
        el.NUM_INS === numeroCandidat &&
        convert(el.DATE_INS) === convert(Date_ins) &&
        el.NUMERO_FORMATION === Number(numeroFormation) &&
        el.NUMERO_AGREMENT === numeroAgrement
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

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

  return (
    <Fragment>
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
          height={250}
          ref={TableRef}
          enableRtl={true}
          locale="ar-AE"
          rowSelected={rowSelected}
          rowDeselected={() => {
            setValues(undefined);
          }}
        >
          <ColumnsDirective>
            <ColumnDirective field="NUMERO_FORMATION" headerText="رقم الدورة" />
            <ColumnDirective field="GROUPE" headerText="رقم الفوج" />
            <ColumnDirective field="TYPE_GROUPE" headerText="نوع الفوج" />
            <ColumnDirective field="TYPE_FORMATION" headerText="الفوج " />
            <ColumnDirective
              field="DEBUT"
              headerText="تاريخ البداية"
              type="date"
              format="dd/MM/yyyy"
              allowFiltering={false}
            />
            <ColumnDirective
              field="FIN"
              headerText="تاريخ النهاية"
              type="date"
              format="dd/MM/yyyy"
              allowFiltering={false}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize]} />
        </GridComponent>
        <div className={classes.container}>
          <Button
            text="تسجيل"
            variant="outlined"
            size="small"
            className={classes.newButton}
            disabled={Values === undefined ? true : false}
            onClick={() => {
              if (
                dejaInscrit(
                  NUM_PERMIS,
                  NUM_INS,
                  DATE_INS,
                  Values.NUMERO_FORMATION,
                  numeroAgrement,
                  Values.GROUPE
                ) === true
              ) {
                alert("مسجل من قبل");
              } else {
                setOpen(true);
              }
            }}
          />
        </div>
      </div>
      <AlertDialog
        title="تأكيد"
        message="هل أنت متأكد من القيام بهذه العملية ؟"
        open={open}
        setOpen={setOpen}
        method={() => {
          AffecteFormation(
            NUM_INS,
            convert(DATE_INS),
            NUM_PERMIS,
            Values.NUMERO_FORMATION,
            numeroAgrement,
            Values.GROUPE
          );
          setOpen(false);
          props.Close(false);
        }}
      />
    </Fragment>
  );
}
