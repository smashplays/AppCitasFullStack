export interface User {
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
    dates: [
      {
        id: number;
      }
    ];
  };
}
