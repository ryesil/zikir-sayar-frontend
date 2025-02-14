export class Zikir {
    id?: number | null;
    name: string;
    svgContent!: string;
    amount!: number;
    date!: Date;
    cycle!: number | null;
    description?: string;
    goal!: number | null;

    constructor(props: Partial<Zikir> = {}) {
      this.id = props.id ?? null; 
      this.svgContent = props.svgContent ?? ''; 
      this.amount = props.amount ?? 0; 
      this.date = props.date ?? new Date(); 
      this.cycle = props.cycle ?? null;
      this.description = props.description ?? '';
      this.name = props.name ?? '';
      this.goal = props.goal ?? null;
  }
}


export interface ZikirDTO {
  id: number;
  amount: number;
}