
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import FilterPanel from '../components/common/FilterPanel';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import StarRating from '../components/common/StarRating';
import { MOCK_COACHES, LOCATION_OPTIONS, COACH_SPECIALTY_OPTIONS } from '../mockData.tsx'; 
import { Coach, FilterGroup } from '../types'; 

const filterGroupsConfig: FilterGroup[] = [
  { id: 'location', name: 'شهر', options: LOCATION_OPTIONS, type: 'select' },
  { id: 'specialty', name: 'تخصص', options: COACH_SPECIALTY_OPTIONS, type: 'select' },
];

const CoachesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [coaches, setCoaches] = useState<Coach[]>(MOCK_COACHES);
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>(MOCK_COACHES);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
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
    let tempCoaches = MOCK_COACHES;

    if (currentFilters.searchTerm) {
      tempCoaches = tempCoaches.filter(coach => 
        coach.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase())
      );
    }
    if (currentFilters.location && currentFilters.location !== LOCATION_OPTIONS[0].value) {
      tempCoaches = tempCoaches.filter(coach => coach.location === currentFilters.location);
    }
    if (currentFilters.specialty && currentFilters.specialty !== COACH_SPECIALTY_OPTIONS[0].value) {
      tempCoaches = tempCoaches.filter(coach => coach.specialties.map(s => String(s)).includes(currentFilters.specialty));
    }
    
    setFilteredCoaches(tempCoaches);
  }, [currentFilters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value) newSearchParams.set(key, value);
    });
    if (searchParams.toString() !== newSearchParams.toString()) {
        setSearchParams(newSearchParams, { replace: true });
    }

    const coachId = searchParams.get('id');
    if (coachId) {
        if(!selectedCoach || selectedCoach.id !== coachId) {
            const coach = MOCK_COACHES.find(c => c.id === coachId);
            if (coach) {
                setSelectedCoach(coach);
                setIsModalOpen(true);
            }
        }
    } else if (isModalOpen) {
        setIsModalOpen(false);
        setSelectedCoach(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilters, searchParams]);


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

  const openCoachDetails = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsModalOpen(true);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('id', coach.id);
    setSearchParams(newSearchParams, { replace: true });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoach(null);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('id');
    newSearchParams.delete('action');
    setSearchParams(newSearchParams, { replace: true });
  };
  
  const handleContactCoach = (coach: Coach) => {
    alert(`درخواست ارتباط با مربی "${coach.name}" ارسال شد. (شبیه‌سازی شده)`);
    closeModal();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-vazir font-bold text-dark mb-8 text-center">مربیان و ترینرها</h1>
      
      <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="جستجوی مربی (نام)..." />
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
          {filteredCoaches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoaches.map((coach) => (
                <Card 
                  key={coach.id} 
                  item={coach} 
                  type="coach" 
                  onDetailsClick={openCoachDetails}
                  onActionClick={() => handleContactCoach(coach)}
                  actionText="ارتباط / رزرو جلسه"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <img src="https://picsum.photos/seed/empty_coach/300/200" alt="موردی یافت نشد" className="mx-auto mb-4 rounded-lg" />
              <p className="text-xl text-gray-600">متاسفانه، هیچ مربی با فیلترهای انتخابی شما یافت نشد.</p>
              <Button onClick={handleResetFilters} variant="primary" className="mt-4">
                پاک کردن فیلترها و نمایش همه
              </Button>
            </div>
          )}
        </div>
      </div>

      {selectedCoach && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedCoach.name} size="lg">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img src={selectedCoach.photoUrl || 'https://picsum.photos/seed/coach_detail/200/200'} alt={selectedCoach.name} className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full shadow-md" />
                <div className="text-center sm:text-right flex-grow">
                    <p><strong className="font-semibold text-dark">تخصص‌ها:</strong> {selectedCoach.specialties.join('، ')}</p>
                    <p><strong className="font-semibold text-dark">موقعیت:</strong> {selectedCoach.location}</p>
                    <p><strong className="font-semibold text-dark">سابقه:</strong> {selectedCoach.experienceYears} سال</p>
                    <StarRating rating={selectedCoach.rating} size="md" showValue className="my-2 justify-center sm:justify-start" />
                </div>
            </div>
            
            <h4 className="font-semibold text-dark mt-3 mb-1">درباره مربی:</h4>
            <p className="text-gray-700 leading-relaxed text-sm">{selectedCoach.bio}</p>
            
            <h4 className="font-semibold text-dark mt-3 mb-1">مدارک و گواهینامه‌ها:</h4>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {selectedCoach.qualifications.map((q, idx) => <li key={idx}>{q}</li>)}
            </ul>

            {selectedCoach.reviews && selectedCoach.reviews.length > 0 && (
                <div>
                    <h4 className="font-semibold text-dark mt-4 mb-2 text-md">نظرات شاگردان ({selectedCoach.reviews.length})</h4>
                    <div className="space-y-3 max-h-32 overflow-y-auto pr-2">
                        {selectedCoach.reviews.map(review => (
                            <div key={review.id} className="bg-gray-50 p-2.5 rounded-md border border-gray-200">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="font-semibold text-medium-dark text-xs">{review.userName}</span>
                                    <StarRating rating={review.rating} size="sm" />
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{review.date}</p>
                                <p className="text-xs text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedCoach.contactInfo && 
                <p className="mt-3"><strong className="font-semibold text-dark">اطلاعات تماس:</strong> {selectedCoach.contactInfo}</p>
            }
            <Button onClick={() => handleContactCoach(selectedCoach)} fullWidth size="lg" className="mt-6">
              ارتباط با {selectedCoach.name}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CoachesPage;
