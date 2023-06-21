import { createGlobalStyle, css } from 'styled-components';

export const GlobalCalendarStyles = createGlobalStyle<{ theme: any }>`
  ${({ theme }) => css`
    .rbc-calendar {
      color: ${theme.colors.neutral700};
    }

    .rbc-time-view .rbc-today {
      background-color: ${theme.colors.neutral100};
    }

    .rbc-time-view .rbc-time-header-content .rbc-today,
    .rbc-month-view .rbc-today {
      background-color: ${theme.colors.secondary200};
    }

    .rbc-day-bg.rbc-off-range-bg {
      background-color: ${theme.colors.neutral150};
      opacity: 0.8;
    }

    .rbc-toolbar button {
      color: ${theme.colors.buttonNeutral0};
      background-color: ${theme.colors.primary600};
      border: none;

      :focus {
        color: ${theme.colors.buttonNeutral0};
        background-color: ${theme.colors.primary600};
      }

      :active,
      :hover,
      :active:hover,
      :active:focus {
        color: ${theme.colors.buttonNeutral0};
        background-color: ${theme.colors.primary500};
      }
    }

    .rbc-toolbar button.rbc-active,
    .rbc-toolbar button.rbc-active:hover,
    .rbc-toolbar button.rbc-active:focus {
      color: ${theme.colors.buttonNeutral0};
      background-color: ${theme.colors.primary500};
    }

    .rbc-timeslot-group {
      border-bottom: none;
    }

    .rbc-show-more {
      background-color: unset;
    }

    .rbc-event.unpublished {
      background-color: ${theme.colors.neutral300};
      opacity: 0.8;
    }

    * {
      border-color: ${theme.colors.neutral300} !important;
    }
  `};
`;
