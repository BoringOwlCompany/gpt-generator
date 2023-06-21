export * from 'react-big-calendar';

declare module 'react-big-calendar' {
  export interface CalendarProps {
    allDayMaxRows?: number;
  }
}
