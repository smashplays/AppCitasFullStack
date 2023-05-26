export interface Days {
  data: [
    {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
      employee_id: number;
      employee: {
        id: number;
        name: string;
      };
      hours: [
        {
          id: number;
          name: string;
        }
      ];
    }
  ];
}
