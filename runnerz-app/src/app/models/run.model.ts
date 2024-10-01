export interface Run {
  id: number;
  title: string;
  startedOn: Date;
  completedOn: Date;
  miles: number;
  location: 'INDOOR' | 'OUTDOOR';
}
