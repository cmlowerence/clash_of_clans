import React from 'react'
import { useGetClanDetailsQuery } from '../../redux/services/coc_server';
// import { useGetPlayerDetailsQuery } from '../../redux/services/coc_server';

function Navbar() {
  const clan_tag = '#2PCYURQLG';
  const {data: clanData, isFetching: isFetchingClanData, error: clanDataError} = useGetClanDetailsQuery(clan_tag);

  console.log(clanData);
  return (
    <div className="w-full flex text-lg">
      <h2 className='text-3xl bg-blue-300 '>Navbar</h2> 
    </div>
  )
}

export default Navbar
