import { GridOptions } from 'ag-grid-community';

export const AG_GRID_LOCALE_ES = {
  // Set Filter
  selectAll: '(Seleccionar Todos)',
  selectAllSearchResults: '(Seleccionar Todos los Resultados)',
  searchOoo: 'Buscar...',
  blanks: '(Vacios)',
  noMatches: 'Sin coincidencias',

  // Number Filter & Text Filter
  filterOoo: 'Filtrar...',
  equals: 'Igual a',
  notEqual: 'No es Igual a',
  empty: 'Elija uno',
  blank: 'Vacío',
  notBlank: 'No vacío',

  // Number Filter
  lessThan: 'Menor que',
  greaterThan: 'Mayor que',
  lessThanOrEqual: 'Menor o igual a',
  greaterThanOrEqual: 'Mayor o igual a',
  inRange: 'En rango',
  inRangeStart: 'Hasta',
  inRangeEnd: 'Desde',

  // Text Filter
  contains: 'Contiene',
  notContains: 'No Contiene',
  startsWith: 'Empieza con',
  endsWith: 'Termina con',

  // Date Filter
  dateFormatOoo: 'yyyy-mm-dd',

  // Filter Conditions
  andCondition: 'Y',
  orCondition: 'O',

  // Filter Buttons
  applyFilter: 'Aceptar',
  resetFilter: 'Resetear',
  clearFilter: 'Limpiar',
  cancelFilter: 'Cancelar',

  // Filter Titles
  textFilter: 'Filtro de texto',
  numberFilter: 'Filtro Numerico',
  dateFilter: 'Filtro de Fecha',
  setFilter: 'Aplicar Filtro',

  // Side Bar
  columns: 'Columnas',
  filters: 'Filtros',

  // columns tool panel
  pivotMode: 'Modo Pivot',
  groups: 'Grupos de Filas',
  rowGroupColumnsEmptyMessage: 'Arrastre aqui para generar grupos de filas',
  values: 'Valores',
  valueColumnsEmptyMessage: 'Arrastre aqui para agregar',
  pivots: 'Etiquetas de Columna',
  pivotColumnsEmptyMessage: 'Arrastre aqui para asignar etiquetas de columna',

  // Header of the Default Group Column
  group: 'Grupo',

  // Other
  loadingOoo: 'Cargando...',
  noRowsToShow: 'Sin datos para mostrar',
  enabled: 'Habilitado',

  // Menu
  pinColumn: 'Bloquear Columna',
  pinLeft: 'Bloquear a izquierda',
  pinRight: 'Bloquear a derecha',
  noPin: 'Sin bloqueo',
  valueAggregation: 'Agregar por valor',
  autosizeThiscolumn: 'Autoajustar esta columna',
  autosizeAllColumns: 'Autoajustar todas las columnas',
  groupBy: 'Agrupar por',
  ungroupBy: 'Des-agrupar por',
  resetColumns: 'Resetear columnas',
  expandAll: 'Expandir todo',
  collapseAll: 'Cerrar todo',
  copy: 'Copiar',
  ctrlC: 'Ctrl+C',
  copyWithHeaders: 'Copiar con cabeceras',
  paste: 'Pegar',
  ctrlV: 'Ctrl+V',
  export: 'exportar',
  csvExport: 'Exportar a CSV',
  excelExport: 'Exportar a Excel (.xlsx)',
  excelXmlExport: 'Exportar a Excel (.xml)',

  // Enterprise Menu Aggregation and Status Bar
  sum: 'Sum',
  min: 'Min',
  max: 'Max',
  none: 'Ninguno',
  count: 'Contar',
  avg: 'Promedio',
  filteredRows: 'Filtrado',
  selectedRows: 'Seleccionado',
  totalRows: 'Total de Filas',
  totalAndFilteredRows: 'Filas',
  more: 'Más',
  to: 'a',
  of: 'de',
  page: 'Página',
  nextPage: 'Proxima Página',
  lastPage: 'Última Página',
  firstPage: 'Primera Página',
  previousPage: 'Anterior Página',

  // Enterprise Menu (Charts)
  pivotChartAndPivotMode: 'Pivot Chart & Pivot Mode',
  pivotChart: 'Pivot Chart',
  chartRange: 'Chart Range',

  columnChart: 'Column',
  groupedColumn: 'Grouped',
  stackedColumn: 'Stacked',
  normalizedColumn: '100% Stacked',

  barChart: 'Bar',
  groupedBar: 'Grouped',
  stackedBar: 'Stacked',
  normalizedBar: '100% Stacked',

  pieChart: 'Pie',
  pie: 'Pie',
  doughnut: 'Doughnut',

  line: 'Line',

  xyChart: 'X Y (Scatter)',
  scatter: 'Scatter',
  bubble: 'Bubble',

  areaChart: 'Area',
  area: 'Area',
  stackedArea: 'Stacked',
  normalizedArea: '100% Stacked',

  histogramChart: 'Histogram',

  // Charts
  pivotChartTitle: 'Pivot Chart',
  rangeChartTitle: 'Range Chart',
  settings: 'Settings',
  data: 'Data',
  format: 'Format',
  categories: 'Categories',
  defaultCategory: '(None)',
  series: 'Series',
  xyValues: 'X Y Values',
  paired: 'Paired Mode',
  axis: 'Axis',
  navigator: 'Navigator',
  color: 'Color',
  thickness: 'Thickness',
  xType: 'X Type',
  automatic: 'Automatic',
  category: 'Category',
  number: 'Number',
  time: 'Time',
  xRotation: 'X Rotation',
  yRotation: 'Y Rotation',
  ticks: 'Ticks',
  width: 'Width',
  height: 'Height',
  length: 'Length',
  padding: 'Padding',
  spacing: 'Spacing',
  chart: 'Chart',
  title: 'Title',
  titlePlaceholder: 'Chart title - double click to edit',
  background: 'Background',
  font: 'Font',
  top: 'Top',
  right: 'Right',
  bottom: 'Bottom',
  left: 'Left',
  labels: 'Labels',
  size: 'Size',
  minSize: 'Minimum Size',
  maxSize: 'Maximum Size',
  legend: 'Legend',
  position: 'Position',
  markerSize: 'Marker Size',
  markerStroke: 'Marker Stroke',
  markerPadding: 'Marker Padding',
  itemSpacing: 'Item Spacing',
  itemPaddingX: 'Item Padding X',
  itemPaddingY: 'Item Padding Y',
  layoutHorizontalSpacing: 'Horizontal Spacing',
  layoutVerticalSpacing: 'Vertical Spacing',
  strokeWidth: 'Stroke Width',
  offset: 'Offset',
  offsets: 'Offsets',
  tooltips: 'Tooltips',
  callout: 'Callout',
  markers: 'Markers',
  shadow: 'Shadow',
  blur: 'Blur',
  xOffset: 'X Offset',
  yOffset: 'Y Offset',
  lineWidth: 'Line Width',
  normal: 'Normal',
  bold: 'Bold',
  italic: 'Italic',
  boldItalic: 'Bold Italic',
  predefined: 'Predefined',
  fillOpacity: 'Fill Opacity',
  strokeOpacity: 'Line Opacity',
  histogramBinCount: 'Bin count',
  columnGroup: 'Column',
  barGroup: 'Bar',
  pieGroup: 'Pie',
  lineGroup: 'Line',
  scatterGroup: 'X Y (Scatter)',
  areaGroup: 'Area',
  histogramGroup: 'Histogram',
  groupedColumnTooltip: 'Grouped',
  stackedColumnTooltip: 'Stacked',
  normalizedColumnTooltip: '100% Stacked',
  groupedBarTooltip: 'Grouped',
  stackedBarTooltip: 'Stacked',
  normalizedBarTooltip: '100% Stacked',
  pieTooltip: 'Pie',
  doughnutTooltip: 'Doughnut',
  lineTooltip: 'Line',
  groupedAreaTooltip: 'Area',
  stackedAreaTooltip: 'Stacked',
  normalizedAreaTooltip: '100% Stacked',
  scatterTooltip: 'Scatter',
  bubbleTooltip: 'Bubble',
  histogramTooltip: 'Histogram',
  noDataToChart: 'No data available to be charted.',
  pivotChartRequiresPivotMode: 'Pivot Chart requires Pivot Mode enabled.',
};

export const defaultGridOptions: GridOptions = {
  pagination: true,
  suppressHorizontalScroll: true,
  paginationPageSize: 10,
  rowHeight: 28,
  headerHeight: 42,
  rowSelection: 'single',
  domLayout: 'autoHeight',
  localeText: AG_GRID_LOCALE_ES,
  defaultColDef: {
    resizable: true,
    filter: true,
    sortable: true,
    flex: 1,
    cellClass: 'text-center'
  },
  rowDragManaged: true,
  animateRows: true,
  enableCellTextSelection: true,
  suppressRowClickSelection: true,
  stopEditingWhenCellsLoseFocus: true,
};