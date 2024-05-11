interface Application {
  _id: string;
  jid: {
    title: string;
    company: string;
    link: string;
    image: string;
    address: string;
    salary: string;
  };
  accepted: boolean;
  status: "applied" | "rejected";
  appliedDate: string;
}

interface AppListProps {
  limit?: number | null;
  appStatus: string;
}

export type { Application, AppListProps };
