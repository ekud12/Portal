export enum httpRoutes {
  /** Login Endpoints */
  LOGIN = 'token',

  /** Config/Core Module Server Endpoints */
  CONFIG_API_LABELS = 'api/config?propertiesType=labels',
  CONFIG_API_PROPERTIES = 'api/config?propertiesType=properties',

  /** Zakaut Module Server Endpoints */
  ZAKAUT_API = 'api/zakaut',

  /** Invoices Module Server Endpoints */
  INVOICES_API = 'api/invoices',

  INVOICES_GET_ALL_INVOICES = 'api/invoices/GetAllInvoices',
  INVOICES_GET_ALL_ROWS = 'api/invoices/GetAllInvoiceRows',
  INVOICES_GET_ALL_TREATMENTS = 'api/invoices/GetInvoiceTreatments',
  INVOICES_CREATE_NEW_INVOICE = 'api/invoices/CreateNewInvoice',
  INVOICES_CREATE_NEW_INVOICE_ROW = 'api/invoices/CreateNewInvoiceRow',
  INVOICES_DELETE_INVOICE_ROW = 'api/invoices/DeleteInvoiceRow',
  INVOICES_GET_MAGNETIC_CARD_SWIPES_FOR_SAPAK = 'api/invoices/GetCardSwipesForSapak',
  INVOICES_GET_OBLIGATIONS_BY_CUSTOMER_ID = 'api/invoices/GetObligationsForCustomer',

  /** Files Handling endpoints */
  FILES_API = 'api/files',
  FILES_UPLOAD_SUMMARY = 'api/files/UploadSummary',

  /** Treatments FOR SAPAK Server Endpoints */
  TREATMENTS_API = 'api/treatments',
  TREATMENTS_FOR_SAPAK_EP = 'api/treatments/GetTreatmentsForSapak',

  /** FalconX Module Server Endpoints */
  FALCONX_API = 'api/falconx'
}
