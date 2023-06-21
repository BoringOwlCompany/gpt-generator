export * from 'react-big-calendar';

declare module 'react-big-calendar' {
  export interface CalendarProps {
    allDayMaxRows?: number;
  }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: any;
    spaces: any;
  }
}
