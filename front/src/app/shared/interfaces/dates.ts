export interface Dates {
  data: [
    {
      id: number;
      time: string;
      created_at: string;
      updated_at: string;
      service_id: number;
      employee_id: number;
      user_id: number;
      user: {
        name: string;
      };
      employee: {
        name: string;
      };
      service: {
        name: string;
      };
    }
  ];
}
