declare module 'formula-pmt' {
   function pmt(rate: number, nper: number, pv: number): number;
   export = pmt;
 }