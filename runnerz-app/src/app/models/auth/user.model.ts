export interface User {
  jwt?: string;
  roles: Role[];
  username: string;
}

interface Role {
  id?: number;
  name: string;
  authority?: string;
}
