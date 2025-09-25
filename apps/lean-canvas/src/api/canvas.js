import { canvases } from './http';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

// list 조회
export function getCanvases(params) {
  const paylod = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params
  );

  return canvases.get('/', { params: paylod });
}

// 생성
export function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0, 4) + '새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    caegory: '신규',
  };

  return canvases.post('/', newCanvas);
}

// 삭제
// async/await 사용하여 비동기 처리 -> return 값이 없음
export async function deleteCanvas(id) {
  await canvases.delete(`/${id}`);
}

export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data;
}

export async function updateTitle(id, title) {
  /**
   * post - 새로운 자원 생성
   * put - 기존 자원 전체 업데이트
   * patch - 기존 자원 부분 업데이트
   */
  await canvases.patch(`/${id}`, { title });
}

// 업데이트
export async function updateCanvas(id, canvas) {
  await canvases.put(`/${id}`, canvas);
}
