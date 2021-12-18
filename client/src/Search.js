import React from "react";
import styled from "styled-components";

const Search = () => {
  return <Wrapper>Search</Wrapper>;
};
const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background: lightgrey;
  top: 500px;
  height: calc(100vh - 160px);
  padding: var(--padding-page) 18px;
`;

export default Search;
