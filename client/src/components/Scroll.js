import styled from 'styled-components';

export default styled.div`
  max-height: ${ props => props.height || '300px' } !important;
  overflow-y: scroll;
`
