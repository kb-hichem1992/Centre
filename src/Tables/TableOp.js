import React from "react";
import "./TableOp.css";
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
export default function TableOp({ data }) {
  const filter = {
    type: "CheckBox",
  };
  return (
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
        height={330}
      >
        <ColumnsDirective>
          <ColumnDirective field="NOM_OPERATEUR" headerText="Nom" />
          <ColumnDirective
            field="PRENOM_OPERATEUR"
            headerText="Prénom"
          />
          <ColumnDirective
            field="PRENOM_PERE"
            headerText="Prénom père"
            clipMode="EllipsisWithTooltip"
          />
          <ColumnDirective
            field="DATE_NAIS_OPERATEUR"
            headerText="Date de Naissance"
            type ='date'
            format = 'dd/MM/yyyy'
            clipMode="EllipsisWithTooltip"
            allowFiltering={false}
          />
          <ColumnDirective
            field="LIEU_NAIS_OPERATEUR"
            headerText="Lieu de Naissance"
            clipMode="EllipsisWithTooltip"
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Group, Resize]} />
      </GridComponent>
    </div>
  );
}
