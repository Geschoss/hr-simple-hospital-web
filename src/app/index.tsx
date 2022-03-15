import { UI } from 'shared';
import { Page } from 'pages';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const App = () => {
  return (
    <UI.Layout>
      <UI.Header>
        <UI.Logo />
      </UI.Header>
      <UI.Content>
        <Page.Patients />
        {/* {isMatch('/patient') && <Page.Patient />} */}
      </UI.Content>
    </UI.Layout>
  );
};
