import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM0YTYyOTk3LTg3NGUtNDRhZi04NjQxLTUxNjgxN2RlYWRiZSIsImlhdCI6MTcxMTQ3MDU2OSwic3ViIjoiZGV2ZWxvcGVyLzZkYzZhMGI1LTE0ZmYtMTNjYy0yMDc3LTkwNjZiZDhiNmFlZiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExMC4yMjQuNzEuMTU0Il0sInR5cGUiOiJjbGllbnQifV19.gMrA-d1PMQABh5oLzVIqoksCbvK-Xbak_39fN29Qtc5hzDw0gITj2NdblEIiQ5adI41SvIe3lt_mzoDDVzV6QA';

export const cocServerApi = createApi({
  reducerPath: 'cocServerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.clashofclans.com/v1',
    prepareHeaders: (headers) => {
      // const token = process.env.BEARER_TOKEN;
      if (TOKEN){
        headers.set('Authorization', `Bearer ${TOKEN}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getClanDetails: builder.query({ query: (clan_tag) => `/clans/${clan_tag}` }),
    getPlayerDetails: builder.query( {query: (player_tag) => `/players/${player_tag}`}),
  }),
});

export const {
  useGetClanDetailsQuery,
  useGetPlayerDetailsQuery
} = cocServerApi;