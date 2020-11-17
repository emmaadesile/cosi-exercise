import styled from 'styled-components';
import PageRoutes from './pages';

const StyledWrapper = styled.div`
  min-height: 90vh;
  margin: 0 auto;
  max-width: 20%;
  display: grid;
  place-items: center;

  @media (max-width: 420px) {
    max-width: 90%;
  }

  @media (min-width: 768px) {
    max-width: 50%;
  }

  @media (min-width: 1024px) {
    max-width: 30%;
  }

  @media (min-width: 1280px) {
    max-width: 25%;
  }
`;

function App() {
  return (
    <StyledWrapper>
      <PageRoutes />
    </StyledWrapper>
  );
}

export default App;
