export interface LastInquiryApiResponse {
  inquiryId: number;
  inquiryDateTime: string;
  identityNumber: string;
  basicServices: BasicServices;
}

interface BasicServices {
  creditReportSummaryId: number;
  creditScoreId: number;
  creditReportId: number;
  creditReportEventsId: number;
  creditReportQualityId: number;
  ownDataChecksReportId: number;
}
