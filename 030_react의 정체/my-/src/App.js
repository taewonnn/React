function One(props) {
  console.log('// one 시작');
  console.log(props);
  console.log('// one 끝');
  return (
    <div>
      {props.children}
    </div>
  )
}

function Two(props) {
  console.log('// two 시작');
  console.log(props);
  console.log('// two 끝');
  return (
    <div>
      {props.children}
    </div>
  )
}


function Three(props) {
  console.log('// three 시작');
  console.log(props);
  console.log('// three 끝');
  return (
    <div>
      hello
    </div>
  )
}

function Four(props) {
  console.log('// three 시작');
  console.log(props);
  console.log('// three 끝');
  return (
    <div>
      hello
    </div>
  )
}


function Five() {
  return (
  <div>
    <p>hello</p>
    <Six/>
    </div>
  )
}

function Six() {
  return <div>hello</div>
}


function App() {
  return (
    <div>
      <h1>app - h1 app</h1>
      <p>app - p</p>
      <One>
        <h2>app안에 One - h2 app</h2>
        <p>app안에 One - p</p>
        <Two>
          <p>app안에 One안에 Two - p</p>
        </Two>
        <Three/>
        <Four></Four>
        <Five/>
      </One>
    </div>
  );
}
export default App;
