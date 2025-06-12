import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import FilterPanel from '../components/common/FilterPanel';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import StarRating from '../components/common/StarRating';
import { MOCK_CLASSES, LOCATION_OPTIONS, CLASS_TYPE_OPTIONS, SKILL_LEVEL_OPTIONS } from '../constants'; // Adjust path
import { ClassItem, FilterGroup } from '../types'; // Adjust path

const filterGroupsConfig: FilterGroup[] = [
  { id: 'location', name: 'شهر', options: LOCATION_OPTIONS, type: 'select' }, // Using general location for classes too
  { id: 'classType', name: 'نوع کلاس', options: CLASS_TYPE_OPTIONS, type: 'select' },
  { id: 'skillLevel', name: 'سطح مهارت', options: SKILL_LEVEL_OPTIONS, type: 'select' },
];

const ClassesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [classes, setClasses] = useState<ClassItem[]>(MOCK_CLASSES);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>(MOCK_CLASSES);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
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
    let tempClasses = MOCK_CLASSES;

    if (currentFilters.searchTerm) {
      tempClasses = tempClasses.filter(cls => 
        cls.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()) ||
        cls.instructorName.toLowerCase().includes(currentFilters.searchTerm.toLowerCase())
      );
    }
    if (currentFilters.location && currentFilters.location !== LOCATION_OPTIONS[0].value) { // Assuming city is part of location string
      tempClasses = tempClasses.filter(cls => cls.location.includes(currentFilters.location));
    }
    if (currentFilters.classType && currentFilters.classType !== CLASS_TYPE_OPTIONS[0].value) {
      tempClasses = tempClasses.filter(cls => cls.classType === currentFilters.classType);
    }
    if (currentFilters.skillLevel && currentFilters.skillLevel !== SKILL_LEVEL_OPTIONS[0].value) {
      tempClasses = tempClasses.filter(cls => cls.skillLevel === currentFilters.skillLevel);
    }
    
    setFilteredClasses(tempClasses);
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

    const classId = searchParams.get('id');
    if (classId) {
        if(!selectedClass || selectedClass.id !== classId) {
            const cls = MOCK_CLASSES.find(c => c.id === classId);
            if (cls) {
                setSelectedClass(cls);
                setIsModalOpen(true);
            }
        }
    } else if (isModalOpen) {
        setIsModalOpen(false);
        setSelectedClass(null);
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

  const openClassDetails = (cls: ClassItem) => {
    setSelectedClass(cls);
    setIsModalOpen(true);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('id', cls.id);
    setSearchParams(newSearchParams, { replace: true });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('id');
    newSearchParams.delete('action');
    setSearchParams(newSearchParams, { replace: true });
  };
  
  const handleRegistration = (cls: ClassItem) => {
    alert(`درخواست ثبت‌نام در کلاس "${cls.name}" ارسال شد. (شبیه‌سازی شده)`);
    closeModal();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-vazir font-bold text-dark mb-8 text-center">کلاس‌های ورزشی و تناسب اندام</h1>
      
      <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="جستجوی کلاس (نام، مربی)..." />
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
          {filteredClasses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((cls) => (
                <Card 
                  key={cls.id} 
                  item={cls} 
                  type="class" 
                  onDetailsClick={openClassDetails}
                  onActionClick={() => handleRegistration(cls)}
                  actionText="ثبت نام در کلاس"
                />
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
              <img src="https://picsum.photos/seed/empty_class/300/200" alt="موردی یافت نشد" className="mx-auto mb-4 rounded-lg" />
              <p className="text-xl text-gray-600">متاسفانه، هیچ کلاسی با فیلترهای انتخابی شما یافت نشد.</p>
              <Button onClick={handleResetFilters} variant="primary" className="mt-4">
                پاک کردن فیلترها و نمایش همه
              </Button>
            </div>
          )}
        </div>
      </div>

      {selectedClass && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedClass.name} size="lg">
          <div className="space-y-4">
            <img src={selectedClass.image || 'https://picsum.photos/seed/class_detail/600/300'} alt={selectedClass.name} className="w-full h-64 object-cover rounded-lg shadow-md mb-4" />
            
            <p><strong className="font-semibold text-dark">نوع کلاس:</strong> {selectedClass.classType}</p>
            <p><strong className="font-semibold text-dark">مربی:</strong> {selectedClass.instructorName}</p>
            <p><strong className="font-semibold text-dark">مکان:</strong> {selectedClass.location}</p>
            <p><strong className="font-semibold text-dark">سطح:</strong> {selectedClass.skillLevel}</p>
            <p><strong className="font-semibold text-dark">برنامه کلاسی:</strong> {selectedClass.schedule}</p>
            <p><strong className="font-semibold text-dark">هزینه:</strong> {selectedClass.price.toLocaleString('fa-IR')} تومان</p>
            
            <StarRating rating={selectedClass.rating} size="md" showValue className="my-3" />
            
            <h4 className="font-semibold text-dark mt-3 mb-1">توضیحات کلاس:</h4>
            <p className="text-gray-700 leading-relaxed text-sm">{selectedClass.description}</p>

            {selectedClass.reviews && selectedClass.reviews.length > 0 && (
                <div>
                    <h4 className="font-semibold text-dark mt-4 mb-2 text-md">نظرات شرکت‌کنندگان ({selectedClass.reviews.length})</h4>
                    <div className="space-y-3 max-h-32 overflow-y-auto pr-2">
                        {selectedClass.reviews.map(review => (
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

            <Button onClick={() => handleRegistration(selectedClass)} fullWidth size="lg" className="mt-6">
              ثبت نام در این کلاس
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ClassesPage;