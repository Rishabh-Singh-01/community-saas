interface IMeta {
  access_token: string;
}

interface IData {
  id: string;
  name: string;
  created_at: Date;
}

export interface IUserCreate {
  status: boolean;
  content: {
    data: IData;
    meta: IMeta;
  };
}
