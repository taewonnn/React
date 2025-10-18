import { useLocation, useParams, useSearchParams } from 'react-router-dom';

export default function CanvasDetail() {
  const { id } = useParams();

  // params -> searchParams
  const [searchParams] = useSearchParams();
  console.log('searchParams: ', searchParams.get('keyword'));

  // hash -> location
  const location = useLocation();
  console.log('location: ', location);

  return (
    <div>
      CanvasDetail
      <p>id: {id}번 게시글</p>
      <p>keyword:{searchParams.get('keyword')}</p>
      <p>hash: {location.hash}</p>
    </div>
  );
}
