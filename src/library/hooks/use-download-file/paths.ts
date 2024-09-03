class DocumentsPaths {
  private static namespace = 'documents';

  private static agreementsPath = 'company-to-student-agreement';

  private static invoicesPath = 'invoices';

  private static annualOverviewPath = 'annual-overview';

  public static invoices(id: string): string {
    return `${DocumentsPaths.namespace}/${DocumentsPaths.invoicesPath}/${id}`;
  }

  public static agreements(id: string): string {
    return `${DocumentsPaths.namespace}/${DocumentsPaths.agreementsPath}/${id}`;
  }

  public static annualOverview(id: string): string {
    return `${DocumentsPaths.namespace}/${DocumentsPaths.annualOverviewPath}/${id}`;
  }
}

export { DocumentsPaths };
