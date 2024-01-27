interface IData {
  id: string;
  community: string;
  user: string;
  role: string;
  created_at: Date;
}

export interface IMemberCreate {
  status: boolean;
  content: {
    data: IData;
  };
}
