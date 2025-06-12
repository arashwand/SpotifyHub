import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import FilterPanel from '../components/common/FilterPanel';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import StarRating from '../components/common/StarRating';
import { MOCK_VENUES, LOCATION_OPTIONS, SPORT_TYPE_OPTIONS } from '../constants'; // Adjust path
import { Venue, FilterGroup, Amenity } from '../types'; // Adjust path

const filterGroupsConfig: FilterGroup[] = [
  { id: 'city', name: 'شهر', options: LOCATION_OPTIONS, type: 'select' },
  { id: 'sportType', name: 'نوع ورزش', options: SPORT_TYPE_OPTIONS, type: 'select' },
  // Add more filters like date, time, amenities (checkbox) later
];

const VenuesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [venues, setVenues] = useState<Venue[]>(MOCK_VENUES);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>(MOCK_VENUES);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    // Sync URL with filters
    const newSearchParams = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value) newSearchParams.set(key, value);
    });
    // Only update searchParams if they've actually changed to avoid loop
    if (searchParams.toString() !== newSearchParams.toString()) {
        setSearchParams(newSearchParams, { replace: true });
    }
    

    // Check for ID in URL to open modal
    const venueId = searchParams.get('id');
    if (venueId) {
        if (!selectedVenue || selectedVenue.id !== venueId) { // Open modal only if not already open for this ID
            const venue = MOCK_VENUES.find(v => v.id === venueId);
            if (venue) {
                setSelectedVenue(venue);
                setIsModalOpen(true);
            }
        }
    } else if (isModalOpen) { // Close modal if ID is removed from URL
        setIsModalOpen(false);
        setSelectedVenue(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilters, searchParams]); // searchParams itself is a dependency


  const handleFilterChange = (groupId: string, value: string) => {
    setCurrentFilters(prev => ({ ...prev, [groupId]: value }));
  };
  
  const handleSearch = (searchTerm: string) => {
    setCurrentFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleResetFilters = () => {
    setCurrentFilters({searchTerm: ''}); // Keep search term if needed or clear all
    setSearchParams({}, {replace: true}); // Clear URL params
  };

  const openVenueDetails = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
    // Update URL to reflect selected venue without page reload
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('id', venue.id);
    setSearchParams(newSearchParams, { replace: true });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVenue(null);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('id');
    newSearchParams.delete('action'); // If an action was also in URL
    setSearchParams(newSearchParams, { replace: true });
  };
  
  const handleBooking = (venue: Venue) => {
    alert(`درخواست رزرو برای "${venue.name}" ارسال شد. (شبیه‌سازی شده)`);
    closeModal();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-vazir font-bold text-dark mb-8 text-center">رزرو اماکن ورزشی</h1>
      
      <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="جستجوی مکان ورزشی (نام، محله)..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <FilterPanel 
            filterGroups={filterGroupsConfig} 
            currentFilters={currentFilters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </div>
        <div className="md:col-span-3">
          {filteredVenues.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <Card 
                  key={venue.id} 
                  item={venue} 
                  type="venue" 
                  onDetailsClick={openVenueDetails}
                  onActionClick={() => handleBooking(venue)}
                  actionText="رزرو سریع"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <img src="https://picsum.photos/seed/empty/300/200" alt="موردی یافت نشد" className="mx-auto mb-4 rounded-lg" />
              <p className="text-xl text-gray-600">متاسفانه، هیچ مکان ورزشی با فیلترهای انتخابی شما یافت نشد.</p>
              <Button onClick={handleResetFilters} variant="primary" className="mt-4">
                پاک کردن فیلترها و نمایش همه
              </Button>
            </div>
          )}
        </div>
      </div>

      {selectedVenue && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedVenue.name} size="xl">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                <div>
                    <img src={selectedVenue.images[0] || 'https://picsum.photos/seed/venue_detail/600/400'} alt={selectedVenue.name} className="w-full h-auto object-cover rounded-lg shadow-md mb-4" />
                    {selectedVenue.images.length > 1 && (
                        <div className="grid grid-cols-3 gap-2">
                            {selectedVenue.images.slice(1,4).map((img, idx) => (
                                <img key={idx} src={img} alt={`${selectedVenue.name} ${idx+2}`} className="w-full h-24 object-cover rounded-md shadow-sm" />
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <p className="text-light-text mb-2"><strong className="text-dark font-semibold">نوع ورزش:</strong> {selectedVenue.sportType}</p>
                    <p className="text-light-text mb-2"><strong className="text-dark font-semibold">موقعیت:</strong> {selectedVenue.location}, {selectedVenue.city}</p>
                    <p className="text-light-text mb-4"><strong className="text-dark font-semibold">قیمت:</strong> {selectedVenue.pricePerHour.toLocaleString('fa-IR')} تومان / ساعت</p>
                    
                    <h4 className="font-semibold text-dark mt-4 mb-2">زمان‌های موجود:</h4>
                    <ul className="list-disc list-inside text-light-text text-sm space-y-1 mb-4">
                        {selectedVenue.availableTimeSlots.map(slot => <li key={slot}>{slot}</li>)}
                    </ul>
                    
                    <h4 className="font-semibold text-dark mt-4 mb-2">امکانات:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedVenue.amenities.map(amenity => (
                            <span key={amenity.id} className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                                {amenity.icon && <span className="mr-1 rtl:ml-1 rtl:mr-0 w-4 h-4">{amenity.icon}</span>}
                                {amenity.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            <StarRating rating={selectedVenue.rating} size="md" showValue className="my-3 justify-center" />
            
            <p className="text-gray-700 leading-relaxed text-sm">{selectedVenue.description}</p>

            {selectedVenue.reviews && selectedVenue.reviews.length > 0 && (
                <div>
                    <h4 className="font-semibold text-dark mt-6 mb-3 text-lg">نظرات کاربران ({selectedVenue.reviews.length})</h4>
                    <div className="space-y-4 max-h-40 overflow-y-auto pr-2">
                        {selectedVenue.reviews.map(review => (
                            <div key={review.id} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-medium-dark text-sm">{review.userName}</span>
                                    <StarRating rating={review.rating} size="sm" />
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{review.date}</p>
                                <p className="text-sm text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
             {selectedVenue.mapLink && (
              <a href={selectedVenue.mapLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm block my-4">
                مشاهده در نقشه
              </a>
            )}

            <Button onClick={() => handleBooking(selectedVenue)} fullWidth size="lg" className="mt-6">
              رزرو این مکان ورزشی
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VenuesPage;