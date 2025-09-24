import { canvases } from './http';

// list 조회
export const getCanvases = async () => {
  return canvases.get('');
};

// 저장, 수정 삭제
