import { UI } from 'shared';
import { Patient } from 'domains';

export const App = () => {
  return (
    <UI.Layout>
      <UI.Header>
        <UI.Logo />
      </UI.Header>
      <UI.Content>
        <Patient.UI.List />
      </UI.Content>
    </UI.Layout>
  );
};
