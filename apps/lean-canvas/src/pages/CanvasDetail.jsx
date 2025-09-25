import { useParams } from 'react-router-dom';
import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { useEffect, useState } from 'react';
import { getCanvasById, updateCanvas, updateTitle } from '../api/canvas';

export default function CanvasDetail() {
  const { id } = useParams();

  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasById(id);
      setCanvas(data);
    };
    fetchCanvas();
  }, [id]);

  const handleTitleChange = async title => {
    try {
      await updateTitle(id, title);
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleCanvasChange = async updatedCanvas => {
    try {
      await updateCanvas(id, updatedCanvas);
      setCanvas(updatedCanvas);
    } catch (error) {
      alert('Canvas 업데이트 실패', error.message);
    }
  };

  return (
    <div>
      <CanvasTitle value={canvas?.title} onChange={handleTitleChange} />
      {canvas && <LeanCanvas canvas={canvas} onCanvasChange={handleCanvasChange} />}
    </div>
  );
}
