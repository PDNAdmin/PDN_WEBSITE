/** Client logos for the logo strip (docs/09 `client`). Real, approved clients only. */
export type Client = {
  name: string;
  /** /img/clients/<slug>.svg (or .png), monochrome-friendly */
  logo: string;
  url?: string;
  showInStrip: boolean;
  order: number;
};

export const clients: Client[] = [];

export const stripClients = clients.filter((c) => c.showInStrip).sort((a, b) => a.order - b.order);
