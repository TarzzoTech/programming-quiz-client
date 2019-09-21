export interface Dashboard {
    [key: string]: DashboardItem[];
}

export interface DashboardItem {
    Id: string;
    Email: string;
    Score: string;
    Name: string;
    CreatedDate: Date;
}
