import React from 'react';
import styled from 'styled-components';
import TechCard from './techCard';
import SearchInput from '@/components/searchInput';

const HLine = styled.div`
  border-bottom: 1px solid var(--gray-3);
  height: 3.2rem;
`;

export default function index() {
  return (
    <>
      <ul className='px-[20rem]'>
        <SearchInput />
        <TechCard />
        <HLine />
      </ul>
    </>
  );
}