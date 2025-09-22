import { useParams } from 'react-router-dom';

export default function CanvasDetail() {
  const { id } = useParams();
  return (
    <div>
      CanvasDetail
      <p>{id}번 게시글</p>
    </div>
  );
}
