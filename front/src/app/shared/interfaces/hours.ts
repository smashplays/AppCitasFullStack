export interface Hours {
  data: [
    {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
      day_id: number;
      day: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        employee_id: number;
      };
    }
  ];
}
