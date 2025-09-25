import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { createCanvas, deleteCanvas, getCanvases } from '../api/canvas';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Button from '../components/Button';
import useApiRequest from '../hooks/useApiRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [isLoadingCreate, setIsLoadingCreate] = useState(false); // 등록 버튼 로딩 상태

  // async function fetchData(params) {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     await new Promise(resolver => setTimeout(resolver, 1000)); // 1초 딜레이
  //     const res = await getCanvases(params);
  //     setData(res.data);
  //   } catch (err) {
  //     setError(err.message);
  //     setIsLoading(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   // 빈 문자열이면 모든 데이터를 가져오고, 값이 있으면 해당 제목으로 필터링
  //   fetchData(searchText ? { title_like: searchText } : {});
  // }, [searchText]);

  // custom hook 적용
  // const { isLoading, error, execute: fetchData } = useApiRequest(getCanvases);

  // 1. data 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', searchText],
    queryFn: () => getCanvases({ title_like: searchText }),
    initialData: [],
  });

  // useEffect(() => {
  //   fetchData(
  //     { title_like: searchText },
  //     {
  //       onSuccess: res => {
  //         setData(res.data);
  //       },
  //       onError: err => {
  //         alert(err.message);
  //       },
  //     }
  //   );
  // }, [searchText, fetchData]);

  const handleDeleteItem = async id => {
    if (confirm('정말 삭제하시겠습니까?') === false) {
      return;
    }
    deleteCanvasMutation(id);
  };

  // const { isLoading: isLoadingCreate, execute: createNewCanvas } = useApiRequest(createCanvas);
  // 2. 등록
  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => {
      alert(err.message);
    },
  });

  const queryClient = useQueryClient();

  /** 등록 버튼 */
  const handleCreateCanvas = async () => {
    createNewCanvas();
  };

  // 3. 삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => {
      alert(err.message);
    },
  });

  return (
    <>
      <div className='mb-6 flex flex-col sm:flex-row items-center justify-between'>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {/* 뷰 토글 UI */}
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className='mb-6 flex justify-end'>
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}
      {/* 캔버스 리스트 UI */}
      {!isLoading && !error && (
        <CanvasList data={data} isGridView={isGridView} searchText={searchText} onDelete={handleDeleteItem} />
      )}
    </>
  );
}

export default Home;
