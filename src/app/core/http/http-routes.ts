export enum httpRoutes {
  /** Login Endpoints */
  LOGIN = 'token',

  /** Config/Core Module Server Endpoints */
  CONFIG_API = 'api/config',

  /** Zakaut Module Server Endpoints */
  ZAKAUT_API = 'api/zakaut',

  /** Invoices Module Server Endpoints */
  INVOICES_API = 'api/invoices',
  INVOICES_GET_ALL_INVOICES = 'api/invoices/GetAllInvoices',
  INVOICES_GET_ALL_ROWS = 'api/invoices/GetInvoiceRows',
  INVOICES_GET_ALL_TREATMENTS = 'api/invoices/GetInvoiceTreatments',

  /** Treatments FOR SAPAK Server Endpoints */
  TREATMENTS_API = 'api/treatments',
  TREATMENTS_FOR_SAPAK_EP = 'api/treatments/GetTreatmentsForSapak',

  /** FalconX Module Server Endpoints */
  FALCONX_API = 'api/falconx'
}
