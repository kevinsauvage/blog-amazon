import apiCalls from '@/lib/api/index';

import useQueries from './useQueries';

// Mock the API functions used in the code
jest.mock('@/lib/api/index', () => ({
  fetchSorts: jest.fn(),
  getCategories: jest.fn(),
  getPosts: jest.fn(),
}));

describe('useQueries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct data when categorySlug is present', async () => {
    const context = {
      params: {
        categorySlug: 'category1',
      },
      searchParams: {
        page: 1,
        q: 'search',
        sorting: 'sorting',
      },
    };

    const mockPosts = [{ id: 1, title: 'Post 1' }];
    const mockSorts = [{ id: 1, name: 'Sort 1' }];
    const mockCategories = [{ id: 1, name: 'Category 1' }];

    apiCalls.getPosts.mockResolvedValueOnce({
      posts: mockPosts,
      totalPages: 1,
      totalPosts: 1,
    });

    apiCalls.fetchSorts.mockResolvedValueOnce(mockSorts);
    apiCalls.getCategories.mockResolvedValueOnce(mockCategories);

    const result = await useQueries(context);

    expect(apiCalls.getPosts).toHaveBeenCalledWith({
      categories: ['category1'],
      extraParams: 'sorting',
      page: 1,
      perPage: 12,
      query: 'search',
    });

    expect(apiCalls.fetchSorts).toHaveBeenCalledWith({ slug: 'search' });
    expect(apiCalls.getCategories).toHaveBeenCalledWith({ slug: 'category1' });

    expect(result).toEqual({
      categoriesResponse: mockCategories,
      page: 1,
      posts: mockPosts,
      q: 'search',
      sortsResponse: mockSorts,
      totalPages: 1,
      totalPosts: 1,
    });
  });

  it('should return the correct data when categorySlug is not present', async () => {
    const context = {
      params: {},
      searchParams: {
        categories: 'category1,category2',
        page: 2,
        q: 'search',
        sorting: 'sorting',
      },
    };

    const mockPosts = [{ id: 1, title: 'Post 1' }];
    const mockSorts = [{ id: 1, name: 'Sort 1' }];
    const mockCategories = [{ id: 1, name: 'Category 1' }];

    apiCalls.getPosts.mockResolvedValueOnce({
      posts: mockPosts,
      totalPages: 1,
      totalPosts: 1,
    });

    apiCalls.fetchSorts.mockResolvedValueOnce(mockSorts);
    apiCalls.getCategories.mockResolvedValueOnce(mockCategories);

    const result = await useQueries(context);

    expect(apiCalls.getPosts).toHaveBeenCalledWith({
      categories: ['category1', 'category2'],
      extraParams: 'sorting',
      page: 2,
      perPage: 12,
      query: 'search',
    });

    expect(apiCalls.fetchSorts).toHaveBeenCalledWith({ slug: 'search' });
    expect(apiCalls.getCategories).toHaveBeenCalledWith();

    expect(result).toEqual({
      categoriesResponse: mockCategories,
      page: 2,
      posts: mockPosts,
      q: 'search',
      sortsResponse: mockSorts,
      totalPages: 1,
      totalPosts: 1,
    });
  });
});
