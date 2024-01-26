interface IMeta {
  total: number;
  pages: number;
  page: number;
}

interface IData {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IRoleGetAll {
  status: boolean;
  content: {
    meta: IMeta;
    data: IData[];
  };
}

export interface IRoleCreate {
  status: boolean;
  content: {
    data: IData;
  };
}
