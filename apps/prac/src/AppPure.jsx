import './App.css';
import PullUpImpure from './PullUpImpure';
import PullUpPure from './PullUpPure';

export default function AppPure() {
  return (
    <div>
      <PullUpImpure />
      <br />
      <PullUpImpure />
      <br />
      <PullUpImpure />
      <br />
      <PullUpImpure />

      <br />
      <PullUpPure counter={10} />
      <PullUpPure counter={10} />
      <PullUpPure counter={10} />
    </div>
  );
}
