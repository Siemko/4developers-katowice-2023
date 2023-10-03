import React, { useEffect } from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export default async function Detail({ userId }: { userId: string | null }) {
 const userDetail = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) => res.json())
        .then((data) => data);

  return (
    <div>
      <p>Detail of {userDetail?.name}</p>{" "}
      <pre>
        <code>{JSON.stringify(userDetail, undefined, 2)}</code>
      </pre>
    </div>
  );
}
