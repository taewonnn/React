import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';

export default function About() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['canvases'],
    queryFn: () => axios.get('http://localhost:8000/canvases').then(res => res.data),
    initialData: [],
  });

  console.log('data: ', data);

  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: newCanvas => axios.post('http://localhost:8000/canvases', newCanvas),
    onSuccess: () => {
      queryClient.invalidateQueries(['canvases']);
    },
  });

  const handleCreate = () => {
    createNewCanvas({ title: 'new canvas' });
  };

  return (
    <div>
      <h2 className='text-3xl'>useQUery</h2>
      {isLoading && <Loading />}
      {error && <Error message={error.message} />}
      {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}

      <h2>useMutation</h2>
      <Button onClick={handleCreate} loading={isLoadingCreate}>
        등록하기
      </Button>
    </div>
  );
}
