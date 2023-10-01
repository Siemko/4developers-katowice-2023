import React from "react";

export default function List() {
  const [userList, setUserList] = React.useState<
    Array<{ id: string; name: string }>
  >([]);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
      });
  }, []);

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
