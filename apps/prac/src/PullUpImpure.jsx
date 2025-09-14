let counter = 10;

export default function PullUpImpure() {
  console.log('PullUpImpure counter', counter);
  counter = counter + 1;
  return <>pull up impure :{counter}</>;
}
