import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/common/Card';
import FilterPanel from '../components/common/FilterPanel';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import { MOCK_ARTICLES, ARTICLE_CATEGORY_OPTIONS } from '../constants'; // Adjust path
import { Article, FilterGroup } from '../types'; // Adjust path

const filterGroupsConfig: FilterGroup[] = [
  { id: 'category', name: 'دسته‌بندی مقاله', options: ARTICLE_CATEGORY_OPTIONS, type: 'select' },
  // Add author or tag filters later
];

const BlogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
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
    let tempArticles = MOCK_ARTICLES;

    if (currentFilters.searchTerm) {
      tempArticles = tempArticles.filter(article => 
        article.title.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(currentFilters.searchTerm.toLowerCase())))
      );
    }
    if (currentFilters.category && currentFilters.category !== ARTICLE_CATEGORY_OPTIONS[0].value) {
      tempArticles = tempArticles.filter(article => article.category === currentFilters.category);
    }
    
    setFilteredArticles(tempArticles);
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

    const articleId = searchParams.get('id');
    if (articleId) {
        if (!selectedArticle || selectedArticle.id !== articleId) {
            const article = MOCK_ARTICLES.find(a => a.id === articleId);
            if (article) {
                setSelectedArticle(article);
                setIsModalOpen(true);
            }
        }
    } else if (isModalOpen) {
        setIsModalOpen(false);
        setSelectedArticle(null);
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

  const openArticleDetails = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('id', article.id);
    setSearchParams(newSearchParams, { replace: true });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('id');
    setSearchParams(newSearchParams, { replace: true });
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-vazir font-bold text-dark mb-8 text-center">مجله ورزشی اسپورتيفای هاب</h1>
      
      <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="جستجوی مقاله (عنوان، تگ)..." />
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
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> {/* Blog often uses 2-col layout */}
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id} 
                  item={article} 
                  type="article" 
                  onDetailsClick={openArticleDetails}
                />
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
              <img src="https://picsum.photos/seed/empty_blog/300/200" alt="موردی یافت نشد" className="mx-auto mb-4 rounded-lg" />
              <p className="text-xl text-gray-600">متاسفانه، هیچ مقاله‌ای با فیلترهای انتخابی شما یافت نشد.</p>
              <Button onClick={handleResetFilters} variant="primary" className="mt-4">
                پاک کردن فیلترها و نمایش همه
              </Button>
            </div>
          )}
        </div>
      </div>

      {selectedArticle && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedArticle.title} size="xl">
          <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            <img src={selectedArticle.imageUrl || 'https://picsum.photos/seed/article_detail/800/400'} alt={selectedArticle.title} className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md mb-4" />
            
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span>نویسنده: {selectedArticle.author}</span>
              <span>تاریخ انتشار: {selectedArticle.date}</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">دسته بندی: {selectedArticle.category}</p>
            
            <h3 className="font-semibold text-dark mt-3 mb-1 text-lg">خلاصه:</h3>
            <p className="text-gray-700 leading-relaxed italic mb-4">{selectedArticle.summary}</p>
            
            <h3 className="font-semibold text-dark mt-3 mb-1 text-lg">متن کامل مقاله:</h3>
            {/* In a real app, render HTML content safely or parse Markdown */}
            <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedArticle.content.replace(/\n/g, '<br />') }}>
            </div>

            {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-dark mb-2">برچسب‌ها:</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedArticle.tags.map(tag => (
                            <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
            )}
            <Button onClick={closeModal} variant="light" className="mt-8 w-full sm:w-auto">
              بستن مقاله
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogPage;