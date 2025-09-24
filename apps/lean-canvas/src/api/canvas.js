import { canvases } from './http';

// list 조회
export const getCanvases = async params => {
  // title이 있으면 부분 일치 검색을 위해 title_like 사용
  if (params?.title) {
    const searchParams = { title_like: params.title };
    return canvases.get('/', { params: searchParams });
  }
  return canvases.get('/', { params: params });
};

// 저장, 수정 삭제
