
import React from 'react';
import { PERSIAN_MONTH_NAMES, PERSIAN_DAYS_OF_WEEK, MOCK_HOLIDAYS } from '../../constants'; // For display and holidays

export type DailyAvailabilityStatus = 'low' | 'medium' | 'high' | 'full' | 'holiday' | 'past' | 'unavailable';

interface CalendarProps {
  currentMonthDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (newMonthDate: Date) => void;
  selectedDate?: Date | null;
  getDailyAvailabilityStatus?: (date: Date) => DailyAvailabilityStatus;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonthDate,
  onDateSelect,
  onMonthChange,
  selectedDate,
  getDailyAvailabilityStatus,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)

  // Convert MOCK_HOLIDAYS strings to Date objects for easier comparison
  const holidayDates = MOCK_HOLIDAYS.map(h => {
    const [hYear, hMonth, hDay] = h.split('/').map(Number);
    const date = new Date(hYear, hMonth - 1, hDay);
    date.setHours(0,0,0,0);
    return date.getTime(); // Compare by time value
  });


  const handlePrevMonth = () => {
    onMonthChange(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(year, month, day);
    newSelectedDate.setHours(0,0,0,0);
    onDateSelect(newSelectedDate);
  };

  const renderHeader = () => {
    const monthName = PERSIAN_MONTH_NAMES[month];
    const persianYear = new Intl.DateTimeFormat('fa-IR-u-nu-latn', { year: 'numeric' }).format(currentMonthDate);

    return (
      <div className="flex justify-between items-center py-2 px-1">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="ماه قبل">&lt;</button>
        <div className="font-semibold text-lg text-dark">{monthName} {persianYear}</div>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="ماه بعد">&gt;</button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    return (
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 py-2 border-b mb-1">
        {PERSIAN_DAYS_OF_WEEK.map(day => <div key={day}>{day.substring(0, 3)}</div>)} 
      </div>
    );
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push(<div key={`empty-start-${i}`} className="p-1"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDateObj = new Date(year, month, day);
      currentDateObj.setHours(0,0,0,0);
      const currentDateTimestamp = currentDateObj.getTime();

      const isSelected = selectedDate && currentDateTimestamp === selectedDate.getTime();
      const isToday = currentDateTimestamp === today.getTime();
      const isPast = currentDateTimestamp < today.getTime();
      const isHoliday = holidayDates.includes(currentDateTimestamp);

      let dayStatus: DailyAvailabilityStatus = 'unavailable'; // Default for future non-holiday days
      let isDisabled = false;
      let cellClasses = 'p-2 w-full text-center rounded-md text-sm transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1';

      if (isPast) {
        dayStatus = 'past';
        isDisabled = true;
        cellClasses += ' text-gray-400 cursor-not-allowed bg-gray-100';
      } else if (isHoliday) {
        dayStatus = 'holiday';
        isDisabled = true;
        cellClasses += ' text-gray-500 cursor-not-allowed bg-gray-200 line-through';
      } else if (getDailyAvailabilityStatus) {
         dayStatus = getDailyAvailabilityStatus(currentDateObj);
      }
      
      if (!isDisabled) {
        switch (dayStatus) {
            case 'low': // Many slots available
                cellClasses += ' bg-green-100 hover:bg-green-200 text-green-800';
                break;
            case 'medium': // Some slots available
                cellClasses += ' bg-green-300 hover:bg-green-400 text-green-900';
                break;
            case 'high': // Few slots available (busy)
                cellClasses += ' bg-green-500 hover:bg-green-600 text-white';
                break;
            case 'full': // No slots available
                cellClasses += ' bg-red-200 hover:bg-red-300 text-red-700';
                break;
            case 'unavailable': // Default for future days if no specific status
                 cellClasses += ' bg-gray-50 hover:bg-gray-100 text-dark'; // A neutral, available look
                 break;
            default: // Includes 'past' and 'holiday' already handled or any other unexpected
                 cellClasses += ' text-dark'; // Default, should be covered
                 break;
        }
      }


      if (isSelected) {
        cellClasses += ' ring-2 ring-offset-1 ring-accent font-semibold';
      }
      if (isToday && !isSelected) {
        cellClasses += ' border border-accent text-accent';
      }
      
      cells.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateClick(day)}
          disabled={isDisabled}
          className={cellClasses}
          aria-label={`انتخاب روز ${day} ${PERSIAN_MONTH_NAMES[month]}`}
        >
          {new Intl.DateTimeFormat('fa-IR-u-nu-latn', { day: 'numeric' }).format(currentDateObj)}
           {isSelected && <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full"></span>}
        </button>
      );
    }
    const totalCells = startDayOfWeek + daysInMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
        cells.push(<div key={`empty-end-${i}`} className="p-1"></div>);
    }

    return <div className="grid grid-cols-7 gap-1">{cells}</div>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 w-full max-w-xs sm:max-w-sm mx-auto">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
