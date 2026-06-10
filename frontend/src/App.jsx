/*import Dashboard from "./pages/Dashboard";

function App() {
  return <Dashboard />;
}

export default App;

import Reports from "./pages/Reports";

function App() {
  return <Reports />;
}

export default App;
*/

import Reports from "./pages/Reports";
import VarianceReport from "./pages/VarianceReport";

function App() {
  return (
    <>
      <Reports />
      <hr />
      <VarianceReport />
    </>
  );
}

export default App;