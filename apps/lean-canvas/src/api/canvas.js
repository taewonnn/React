import { canvases } from './http';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

// list 조회
export function getCanvases(params) {
  const paylod = {Object.assign({
    _sort: 'lastModified',
    _order: 'desc',
  }
  )
  }
  return canvases.get('/', { params: paylod });
}

// 생성
export function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0, 4) + '새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD'),
    caegory: '신규',
  };

  return canvases.post('/', newCanvas);
}
