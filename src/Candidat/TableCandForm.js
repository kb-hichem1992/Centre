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
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import TableFormation from "../Formation/TableFormation.js";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialog from "../components/controls/Dialog";
import GroupeForm from "../Formation/GroupeForm";
import { useLocalStorage } from "../useLocalStorage";

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
  const [open, setOpen] = useState(false);
  const [openNumero, setOpenNumero] = useState(false);
  const [Values, setValues] = useState();
  const [numeroAgrement] = useLocalStorage("user",0);
  const [admin] = useLocalStorage("typeUser","");



  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/get_candidat_form/${numeroFormation}/${numeroAgrement}/${groupe}` )
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
          "?????? ???? ???????? ???????? ???????????????? ?????????? ???? ?????????????? ???????????? ?????? ?????? ?????????? ?????????????? ???? ???????? ???????????????? ???? ???????????????????????? ???????? ????????????",
        EmptyRecord: "???? ?????????? ????????????",
        SelectAll: "???????? ????????",
        FilterButton: "?????? ",
        ClearButton: "?????? ",
        Search: "?????? ",
        GroupDropArea: "???????? ?????? ???????????? ?????? ???????????? ???????????? ?????????? ???? ",
      },

      pager: {
        currentPageInfo: "{0} ???? {1} ????????",
        firstPageTooltip: "?????????? ?????? ???????????? ????????????",
        lastPageTooltip: "?????????? ?????? ???????????? ??????????????",
        nextPageTooltip: "?????????? ?????? ???????????? ??????????????",
        nextPagerTooltip: "???????????? ?????? ???????? ????????????",
        previousPageTooltip: "?????????? ?????? ???????????? ??????????????",
        previousPagerTooltip: "???????????? ?????? ???????? ??????????????",
        totalItemsInfo: "({0} ??????????????)",
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
    numeroAgrement,
  ) => {
    axios
      .put(process.env.REACT_APP_API_URL + "/update_passe", {
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
      .put(process.env.REACT_APP_API_URL + "/insert_brevet", {
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
      .post(`${process.env.REACT_APP_API_URL}/delete_passe`, {
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
  async function rowSelected() {
    try {
      const selectedrecords = await TableRef3.current.getSelectedRecords();
      const obj = JSON.stringify(selectedrecords);
      const parsedobj = JSON.parse(obj);
      setValues(parsedobj[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <div className={classes.container}>
        <Button
          text="???????? ???????? ????????????????"
          variant="outlined"
          size="small"
          startIcon={<EditOutlinedIcon />}
          className={classes.newButton}
          disabled={
            Values === undefined || admin !== "admin" ? true : false
          }
          onClick={() => {
            setOpenModifier(true);
          }}
        />
        <Button
          text="??????????"
          variant="outlined"
          size="small"
          color="primary"
          disabled={
            Values === undefined ||
            Values.NOTE < 10 ||
            admin !== "admin"
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
          text="??????????"
          variant="outlined"
          size="small"
          startIcon={<DeleteIcon />}
          className={classes.newButton}
          disabled={
            Values === undefined || Values.REMARQUE === "????????" ? true : false
          }
          onClick={() => {
            setOpenFormation(true);
          }}
        />
        <Button
          text="??????"
          variant="outlined"
          size="small"
          color="secondary"
          startIcon={<EditOutlinedIcon />}
          className={classes.newButton}
          disabled={
            Values === undefined ||
            admin !== "admin" ||
            Values.REMARQUE === "????????" ||
            Values.NOTE > 0
              ? true
              : false
          }
          onClick={() => {
            setOpen(true);
          }}
        />
        <Button
          text="?????? ??????????????"
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<EditOutlinedIcon />}
          className={classes.newButton}
          disabled={Values === undefined || admin !== "admin"}
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
          rowSelected={rowSelected}
          rowDeselected={() => {
            setValues(undefined);
          }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="GROUPE"
              headerText="??????????"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective field="NUMERO" headerText="??????" Width={50} />
            <ColumnDirective
              field="NOM_CANDIDAT"
              headerText="??????????"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="PRENOM_CANDIDAT"
              headerText="??????????"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="DATE_NAIS_CANDIDAT"
              headerText="?????????? ?????????????? "
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="LIEU_NAIS_CANDIDAT"
              headerText="???????? ?????????????? "
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="ADRESSE_CANDIDAT"
              headerText=" ?????????????? "
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="CATEGORIE_PERMIS"
              headerText=" ?????????? ???????? ?????????????? "
              clipMode="EllipsisWithTooltip"
              Width="100"
            />
            <ColumnDirective
              field="DATE_LIV_PERMIS"
              headerText="?????????? ?????????? ???????? ??????????????"
              clipMode="EllipsisWithTooltip"
              Width="120"
            />
            <ColumnDirective
              field="REMARQUE"
              headerText="????????????????"
              clipMode="EllipsisWithTooltip"
              Width="100"
            />
            <ColumnDirective
              field="NOTE"
              headerText="??????????????"
              clipMode="EllipsisWithTooltip"
              Width="80"
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize, ExcelExport]} />
        </GridComponent>
      </div>
      <Popup
        title="??????????"
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
        title="??????????????"
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
        title="??????????????"
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
        title="?????????? ??????????????"
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
        title="??????????"
        message="???? ?????? ?????????? ??"
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
