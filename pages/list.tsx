import React from "react";

export default async function List() {
  const userList = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => data);

  return (
    <div>
      <ul>
        {userList.map((user) => {
          return (
            <li key={user.id}>
              <a href={`/detail?userId=${user.id}`}>{user.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
