export interface Date {
  data: {
    id: number;
    time: string;
    created_at: string;
    updated_at: string;
    service_id: number;
    employee_id: number;
    user_id: number;
    user: {
      name: string;
      email: string;
    };
  };
}
