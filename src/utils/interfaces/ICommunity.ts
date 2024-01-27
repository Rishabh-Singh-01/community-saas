interface IMeta {
  total: number;
  pages: number;
  page: number;
}

interface IData {
  id: string;
  name: string;
  slug: string;
  owner: string;
  created_at: Date;
  updated_at: Date;
}

interface IDataWithOwner {
  id: string;
  name: string;
  slug: string;
  owner: {
    id: string;
    name: string;
  };
  created_at: Date;
  updated_at: Date;
}

interface IDataWithMember {
  id: string;
  community: string;
  user: {
    id: string;
    name: string;
  };
  role: {
    id: string;
    name: string;
  };
  created_at: Date;
}

export interface ICommunityGetAllCommunities {
  status: boolean;
  content: {
    meta: IMeta;
    data: IData[];
  };
}

export interface ICommunityCreate {
  status: boolean;
  content: {
    data: IData;
  };
}

export interface ICommunityGetAll {
  status: boolean;
  content: {
    meta: IMeta;
    data: IDataWithOwner[];
  };
}

export interface ICommunityGetAllMembers {
  status: boolean;
  content: {
    meta: IMeta;
    data: IDataWithMember[];
  };
}
