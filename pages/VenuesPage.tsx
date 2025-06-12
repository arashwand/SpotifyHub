
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import FilterPanel from '../components/common/FilterPanel';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import StarRating from '../components/common/StarRating';
import Calendar, { DailyAvailabilityStatus } from '../components/common/Calendar'; // Import Calendar & type
import { MOCK_VENUES, LOCATION_OPTIONS, SPORT_TYPE_OPTIONS, PERSIAN_DAYS_OF_WEEK, MOCK_HOLIDAYS } from '../constants'; // Adjust path
import { Venue, FilterGroup, Amenity, BookingSlot } from '../types'; // Adjust path

const filterGroupsConfig: FilterGroup[] = [
  { id: 'city', name: 'شهر', options: LOCATION_OPTIONS, type: 'select' },
  { id: 'sportType', name: 'نوع ورزش', options: SPORT_TYPE_OPTIONS, type: 'select' },
];

const VenuesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [venues, setVenues] = useState<Venue[]>(MOCK_VENUES);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>(MOCK_VENUES);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [recurrenceType, setRecurrenceType] = useState<'once' | 'weekly' | 'monthly'>('once');
  const [numberOfSessions, setNumberOfSessions] = useState<number>(1);
  const [calculatedBookingSlots, setCalculatedBookingSlots] = useState<BookingSlot[]>([]);

  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>(() => {
    const initialFilters: Record<string, string> = {};
    filterGroupsConfig.forEach(group => {
      initialFilters[group.id] = searchParams.get(group.id) || '';
    });
    initialFilters['searchTerm'] = searchParams.get('q') || '';
    return initialFilters;
  });

  const applyFilters = useCallback(() => {
    let tempVenues = MOCK_VENUES;

    if (currentFilters.searchTerm) {
      tempVenues = tempVenues.filter(venue => 
        venue.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()) ||
        venue.location.toLowerCase().includes(currentFilters.searchTerm.toLowerCase())
      );
    }
    if (currentFilters.city) {
      tempVenues = tempVenues.filter(venue => venue.city === currentFilters.city);
    }
    if (currentFilters.sportType) {
      tempVenues = tempVenues.filter(venue => venue.sportType === currentFilters.sportType);
    }
    
    setFilteredVenues(tempVenues);
  }, [currentFilters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value && key !== 'id' && key !== 'action') newSearchParams.set(key, value);
    });
     if (searchParams.get('id')) newSearchParams.set('id', searchParams.get('id')!);
     if (searchParams.get('action')) newSearchParams.set('action', searchParams.get('action')!);

    if (searchParams.toString() !== newSearchParams.toString()) {
        setSearchParams(newSearchParams, { replace: true });
    }
    
    const venueId = searchParams.get('id');
    if (venueId) {
        if (!selectedVenue || selectedVenue.id !== venueId) {
            const venue = MOCK_VENUES.find(v => v.id === venueId);
            if (venue) {
                openVenueDetails(venue, searchParams.get('action') === 'book');
            }
        }
    } else if (isModalOpen) {
        closeModalInternal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilters]);

  useEffect(() => {
    if (selectedDate && selectedTimeSlot && selectedVenue) {
      const slots: BookingSlot[] = [];
      let currentDate = new Date(selectedDate);
      for (let i = 0; i < (recurrenceType === 'once' ? 1 : numberOfSessions); i++) {
        slots.push({ date: new Date(currentDate), timeSlot: selectedTimeSlot });
        if (recurrenceType === 'weekly') {
          currentDate.setDate(currentDate.getDate() + 7);
        } else if (recurrenceType === 'monthly') {
          // Naive month increment, doesn't handle end of month perfectly but ok for mock
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      }
      setCalculatedBookingSlots(slots);
    } else {
      setCalculatedBookingSlots([]);
    }
  }, [selectedDate, selectedTimeSlot, recurrenceType, numberOfSessions, selectedVenue]);


  const handleFilterChange = (groupId: string, value: string) => {
    setCurrentFilters(prev => ({ ...prev, [groupId]: value }));
  };
  
  const handleSearch = (searchTerm: string) => {
    setCurrentFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleResetFilters = () => {
    setCurrentFilters({searchTerm: ''}); 
    setSearchParams({}, {replace: true}); 
  };
  
  const resetBookingState = () => {
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setRecurrenceType('once');
    setNumberOfSessions(1);
    setCalculatedBookingSlots([]);
    setCurrentCalendarMonth(new Date());
  };

  const openVenueDetails = (venue: Venue, attemptBook: boolean = false) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
    resetBookingState(); 
    
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('id', venue.id);
    if(attemptBook) newSearchParams.set('action', 'book'); else newSearchParams.delete('action');
    setSearchParams(newSearchParams, { replace: true });
  };
  
  const closeModalInternal = () => {
    setIsModalOpen(false);
    setSelectedVenue(null);
    resetBookingState();
  };

  const closeModal = () => {
    closeModalInternal();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('id');
    newSearchParams.delete('action');
    setSearchParams(newSearchParams, { replace: true });
  };
  
  const handleBooking = (venue: Venue) => {
    if (!selectedDate || !selectedTimeSlot) {
      alert("لطفاً تاریخ و سانس مورد نظر را انتخاب کنید.");
      return;
    }
    
    const bookingSummary = calculatedBookingSlots.map(slot => 
      `${slot.date.toLocaleDateString('fa-IR')} ساعت ${slot.timeSlot}`
    ).join('\n');

    alert(`درخواست رزرو برای "${venue.name}" با مشخصات زیر ارسال شد:\n${bookingSummary}\nمجموع هزینه: ${(calculatedBookingSlots.length * venue.pricePerHour).toLocaleString('fa-IR')} تومان\n(شبیه‌سازی شده)`);
    closeModal();
  };

  const getDayName = (date: Date): string => {
    return PERSIAN_DAYS_OF_WEEK[date.getDay()];
  };

  const availableTimeSlotsForSelectedDate = selectedDate && selectedVenue ? selectedVenue.availableTimeSlots[getDayName(selectedDate)] || [] : [];

  const getDailyAvailabilityStatusForVenue = useCallback((date: Date): DailyAvailabilityStatus => {
    if (!selectedVenue) return 'unavailable';

    date.setHours(0,0,0,0); // Normalize date
    const today = new Date();
    today.setHours(0,0,0,0);

    if (date.getTime() < today.getTime()) return 'past';

    const holidayDatesSet = new Set(MOCK_HOLIDAYS.map(h => {
        const [hYear, hMonth, hDay] = h.split('/').map(Number);
        const holidayDate = new Date(hYear, hMonth - 1, hDay);
        holidayDate.setHours(0,0,0,0);
        return holidayDate.getTime();
    }));
    if (holidayDatesSet.has(date.getTime())) return 'holiday';
    
    const dayName = getDayName(date);
    const slotsForDay = selectedVenue.availableTimeSlots[dayName] || [];
    const numberOfSlots = slotsForDay.length;

    // This is a mock logic. A real app would check actual bookings against total capacity.
    // For this mock, we use total number of defined slots for a day of week as capacity indicator.
    // Assuming max capacity ~ 5-6 slots per day type based on MOCK_VENUES structure.
    if (numberOfSlots === 0) return 'full'; // Or 'unavailable' if it means venue is closed that day
    if (numberOfSlots <= 1) return 'high'; // Very busy
    if (numberOfSlots <= 3) return 'medium'; // Moderately busy
    return 'low'; // Many slots
  }, [selectedVenue]);


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-vazir font-bold text-dark mb-8 text-center">رزرو اماکن ورزشی</h1>
      
      <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="جستجوی مکان ورزشی (نام، محله)..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <FilterPanel 
            filterGroups={filterGroupsConfig} 
            currentFilters={currentFilters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </aside>
        <main className="md:col-span-3">
          {filteredVenues.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <Card 
                  key={venue.id} 
                  item={venue} 
                  type="venue" 
                  onDetailsClick={() => openVenueDetails(venue)}
                  onActionClick={() => openVenueDetails(venue, true)} 
                  actionText="رزرو / مشاهده سانس‌ها"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <img src="https://picsum.photos/seed/empty/300/200" alt="موردی یافت نشد" className="mx-auto mb-4 rounded-lg" />
              <p className="text-xl text-gray-600">متاسفانه، هیچ مکان ورزشی با فیلترهای انتخابی شما یافت نشد.</p>
              <Button onClick={handleResetFilters} variant="primary" className="mt-4">
                پاک کردن فیلترها و نمایش همه
              </Button>
            </div>
          )}
        </main>
      </div>

      {selectedVenue && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={`رزرو ${selectedVenue.name}`} size="xl">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-4">
                    <h4 className="font-semibold text-dark text-lg">۱. تاریخ را انتخاب کنید:</h4>
                    <Calendar 
                        currentMonthDate={currentCalendarMonth}
                        onMonthChange={setCurrentCalendarMonth}
                        selectedDate={selectedDate}
                        onDateSelect={(date) => { setSelectedDate(date); setSelectedTimeSlot(null); }}
                        getDailyAvailabilityStatus={getDailyAvailabilityStatusForVenue}
                    />
                    {selectedDate && (
                        <div className="mt-4">
                            <h4 className="font-semibold text-dark text-md mb-2">
                                سانس‌های موجود برای {selectedDate.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}:
                            </h4>
                            {availableTimeSlotsForSelectedDate.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {availableTimeSlotsForSelectedDate.map(slot => (
                                        <Button
                                            key={slot}
                                            variant={selectedTimeSlot === slot ? 'primary' : 'light'}
                                            onClick={() => setSelectedTimeSlot(slot)}
                                            size="sm"
                                        >
                                            {slot}
                                        </Button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">متاسفانه در این تاریخ سانس خالی وجود ندارد.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-dark text-lg">۲. تکرار و تعداد جلسات (اختیاری):</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="recurrenceType" className="block text-sm font-medium text-gray-700 mb-1">نوع تکرار:</label>
                            <select 
                                id="recurrenceType"
                                value={recurrenceType}
                                onChange={(e) => setRecurrenceType(e.target.value as 'once' | 'weekly' | 'monthly')}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                                disabled={!selectedTimeSlot}
                            >
                                <option value="once">یکبار</option>
                                <option value="weekly">هفتگی</option>
                                <option value="monthly">ماهانه</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="numberOfSessions" className="block text-sm font-medium text-gray-700 mb-1">تعداد جلسات:</label>
                            <input 
                                type="number"
                                id="numberOfSessions"
                                value={numberOfSessions}
                                onChange={(e) => setNumberOfSessions(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                min="1"
                                max="10" 
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                                disabled={recurrenceType === 'once' || !selectedTimeSlot}
                            />
                        </div>
                    </div>

                    {calculatedBookingSlots.length > 0 && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md border">
                            <h4 className="font-semibold text-dark text-md mb-2">خلاصه رزرو:</h4>
                            <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                                {calculatedBookingSlots.map((slot, index) => (
                                    <li key={index}>
                                        {slot.date.toLocaleDateString('fa-IR', { weekday: 'short', day: 'numeric', month: 'short' })}، ساعت {slot.timeSlot}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-sm font-semibold mt-2">
                                مجموع هزینه: {(calculatedBookingSlots.length * selectedVenue.pricePerHour).toLocaleString('fa-IR')} تومان
                            </p>
                        </div>
                    )}
                    
                     <div className="mt-4 border-t pt-4">
                        <p className="text-sm text-light-text"><strong className="text-dark font-semibold">نوع ورزش:</strong> {selectedVenue.sportType}</p>
                        <p className="text-sm text-light-text"><strong className="text-dark font-semibold">موقعیت:</strong> {selectedVenue.location}, {selectedVenue.city}</p>
                        <p className="text-sm text-light-text"><strong className="text-dark font-semibold">قیمت هر سانس:</strong> {selectedVenue.pricePerHour.toLocaleString('fa-IR')} تومان</p>
                        <StarRating rating={selectedVenue.rating} size="sm" showValue className="my-2" />
                    </div>
                </div>
            </div>
            
            <div className="pt-4 border-t">
                 <h4 className="font-semibold text-dark text-md mb-2">امکانات:</h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 mb-4">
                        {selectedVenue.amenities.map(amenity => (
                            <span key={amenity.id} className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                                {amenity.icon && React.isValidElement(amenity.icon) ? React.cloneElement(amenity.icon as React.ReactElement, { className: "w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" }): null}
                                {amenity.name}
                            </span>
                        ))}
                    </div>
                 <p className="text-gray-700 leading-relaxed text-sm mb-4">{selectedVenue.description}</p>
            </div>

            <Button onClick={() => handleBooking(selectedVenue)} fullWidth size="lg" className="mt-6" disabled={!selectedTimeSlot || calculatedBookingSlots.length === 0}>
              تایید و رزرو نهایی
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VenuesPage;
