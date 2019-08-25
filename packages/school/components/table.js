import styled from '@emotion/styled';

export const Container = styled.div`
  display: grid;
  overflow: auto;
  height: 500px;
  width: 100%;
  max-width: 48rem;
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export const Wrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
`;

export const LittleCol = styled.div`
  width: 100px;
  min-width: 100px;
`;

export const ItemHeader = styled.div`
  height: 50px;
  min-height: 50px;
  position: sticky;
  position: -webkit-sticky;
  background: white;
  top: 0;
`;

export const ColFixedLeft = styled.div`
  position: sticky;
  left: 0;
  z-index: 9998;
  background: white;
  width: 250px;
  min-width: 250px;
`;

export const Item = styled.div`
  height: 50px;
  padding: 0.4rem;
`;
