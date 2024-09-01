import React from 'react'

export default function certificateSlug( {
    params,
    searchParams,
}: {
    params: { certificate: string};
    searchParams: {
        verified: String;
    }
}) {
  return (
    <div>{params.certificate} {searchParams.verified}</div>
  )
}
