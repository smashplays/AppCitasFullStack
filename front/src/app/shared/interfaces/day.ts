export interface Day {
  data: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    employee_id: number;
    hours: [
      {
        id: number;
        name: string;
      }
    ];
  };
}
